import { create } from 'zustand';
import { supabase, Post, Comment } from '../lib/supabase';
import toast from 'react-hot-toast';

interface PostState {
  posts: Post[];
  loading: boolean;
  selectedPost: Post | null;
  comments: Comment[];
  fetchPosts: () => Promise<void>;
  createPost: (content: string, category: string, imageFile?: File) => Promise<void>;
  likePost: (postId: string) => Promise<void>;
  addComment: (postId: string, content: string) => Promise<void>;
  fetchComments: (postId: string) => Promise<void>;
  sharePost: (postId: string) => Promise<void>;
}

export const usePostStore = create<PostState>((set, get) => ({
  posts: [],
  loading: false,
  selectedPost: null,
  comments: [],

  fetchPosts: async () => {
    set({ loading: true });
    try {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          user:users(*)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Check which posts are liked by current user
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: likes } = await supabase
          .from('likes')
          .select('post_id')
          .eq('user_id', user.id);

        const likedPostIds = new Set(likes?.map(like => like.post_id) || []);
        
        const postsWithLikes = data?.map(post => ({
          ...post,
          is_liked: likedPostIds.has(post.id)
        })) || [];

        set({ posts: postsWithLikes });
      } else {
        set({ posts: data || [] });
      }
    } catch (error: any) {
      toast.error('Gönderiler yüklenirken hata oluştu');
      console.error('Fetch posts error:', error);
    } finally {
      set({ loading: false });
    }
  },

  createPost: async (content: string, category: string, imageFile?: File) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Giriş yapmalısınız');

      let imageUrl = null;

      // Upload image if provided
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${user.id}/${Date.now()}.${fileExt}`;
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('post-images')
          .upload(fileName, imageFile);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('post-images')
          .getPublicUrl(fileName);

        imageUrl = publicUrl;
      }

      // Extract hashtags
      const hashtags = content.match(/#\w+/g) || [];

      const { data, error } = await supabase
        .from('posts')
        .insert([
          {
            user_id: user.id,
            content,
            category,
            image_url: imageUrl,
            hashtags,
            likes_count: 0,
            comments_count: 0,
            shares_count: 0,
          },
        ])
        .select(`
          *,
          user:users(*)
        `)
        .single();

      if (error) throw error;

      // Add to local state
      const { posts } = get();
      set({ posts: [data, ...posts] });

      toast.success('Gönderi paylaşıldı! 🌱');
    } catch (error: any) {
      toast.error(error.message || 'Gönderi paylaşılırken hata oluştu');
      throw error;
    }
  },

  likePost: async (postId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Giriş yapmalısınız');

      const { posts } = get();
      const post = posts.find(p => p.id === postId);
      if (!post) return;

      if (post.is_liked) {
        // Unlike
        await supabase
          .from('likes')
          .delete()
          .eq('user_id', user.id)
          .eq('post_id', postId);

        await supabase
          .from('posts')
          .update({ likes_count: Math.max(0, post.likes_count - 1) })
          .eq('id', postId);

        // Update local state
        const updatedPosts = posts.map(p =>
          p.id === postId
            ? { ...p, is_liked: false, likes_count: Math.max(0, p.likes_count - 1) }
            : p
        );
        set({ posts: updatedPosts });
      } else {
        // Like
        await supabase
          .from('likes')
          .insert([{ user_id: user.id, post_id: postId }]);

        await supabase
          .from('posts')
          .update({ likes_count: post.likes_count + 1 })
          .eq('id', postId);

        // Update local state
        const updatedPosts = posts.map(p =>
          p.id === postId
            ? { ...p, is_liked: true, likes_count: p.likes_count + 1 }
            : p
        );
        set({ posts: updatedPosts });
      }
    } catch (error: any) {
      toast.error('Beğeni işlemi başarısız');
      console.error('Like error:', error);
    }
  },

  addComment: async (postId: string, content: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Giriş yapmalısınız');

      const { data, error } = await supabase
        .from('comments')
        .insert([
          {
            post_id: postId,
            user_id: user.id,
            content,
            likes_count: 0,
          },
        ])
        .select(`
          *,
          user:users(*)
        `)
        .single();

      if (error) throw error;

      // Update post comment count
      await supabase
        .from('posts')
        .update({ comments_count: supabase.sql`comments_count + 1` })
        .eq('id', postId);

      // Add to local comments
      const { comments } = get();
      set({ comments: [...comments, data] });

      // Update posts state
      const { posts } = get();
      const updatedPosts = posts.map(p =>
        p.id === postId ? { ...p, comments_count: p.comments_count + 1 } : p
      );
      set({ posts: updatedPosts });

      toast.success('Yorum eklendi! 💬');
    } catch (error: any) {
      toast.error('Yorum eklenirken hata oluştu');
      console.error('Comment error:', error);
    }
  },

  fetchComments: async (postId: string) => {
    try {
      const { data, error } = await supabase
        .from('comments')
        .select(`
          *,
          user:users(*)
        `)
        .eq('post_id', postId)
        .order('created_at', { ascending: true });

      if (error) throw error;

      set({ comments: data || [] });
    } catch (error: any) {
      toast.error('Yorumlar yüklenirken hata oluştu');
      console.error('Fetch comments error:', error);
    }
  },

  sharePost: async (postId: string) => {
    try {
      await supabase
        .from('posts')
        .update({ shares_count: supabase.sql`shares_count + 1` })
        .eq('id', postId);

      // Update local state
      const { posts } = get();
      const updatedPosts = posts.map(p =>
        p.id === postId ? { ...p, shares_count: p.shares_count + 1 } : p
      );
      set({ posts: updatedPosts });

      toast.success('Gönderi paylaşıldı! 📤');
    } catch (error: any) {
      toast.error('Paylaşım başarısız');
      console.error('Share error:', error);
    }
  },
}));