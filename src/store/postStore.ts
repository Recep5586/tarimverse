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
      // Check if Supabase is properly configured
      if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
        console.warn('Supabase not configured, using mock data');
        // Use mock data when Supabase is not configured
        const mockPosts = [
          {
            id: '1',
            user_id: 'mock-user',
            content: 'Bu yıl buğday hasadımız gerçekten harika oldu! Hektarda 6 ton verim aldık. 🌾',
            category: 'mahsul',
            image_url: 'https://images.pexels.com/photos/326082/pexels-photo-326082.jpeg?auto=compress&cs=tinysrgb&w=800',
            likes_count: 42,
            comments_count: 8,
            shares_count: 12,
            created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
            updated_at: new Date().toISOString(),
            user: {
              id: 'mock-user',
              name: 'Ahmet Karaca',
              email: 'ahmet@example.com',
              avatar_url: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
              location: 'Konya',
              verified: true,
              followers_count: 2340,
              following_count: 156,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            },
            is_liked: false,
            hashtags: ['#buğday', '#hasat', '#organiktarım']
          },
          {
            id: '2',
            user_id: 'mock-user-2',
            content: 'Seramdaki domates üretiminde yeni teknikler deniyorum. Dikey tarım sistemi kurduk ve alan verimliliği %40 arttı! 🍅',
            category: 'teknoloji',
            image_url: null,
            likes_count: 67,
            comments_count: 15,
            shares_count: 23,
            created_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
            updated_at: new Date().toISOString(),
            user: {
              id: 'mock-user-2',
              name: 'Fatma Öztürk',
              email: 'fatma@example.com',
              avatar_url: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
              location: 'Antalya',
              verified: true,
              followers_count: 1890,
              following_count: 234,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            },
            is_liked: true,
            hashtags: ['#seracılık', '#domates', '#teknoloji']
          }
        ];
        
        set({ posts: mockPosts, loading: false });
        return;
      }

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
      console.error('Fetch posts error:', error);
      toast.error('Gönderiler yüklenirken hata oluştu');
      
      // Fallback to mock data on error
      const mockPosts = [
        {
          id: '1',
          user_id: 'mock-user',
          content: 'Bu yıl buğday hasadımız gerçekten harika oldu! Hektarda 6 ton verim aldık. 🌾',
          category: 'mahsul',
          image_url: 'https://images.pexels.com/photos/326082/pexels-photo-326082.jpeg?auto=compress&cs=tinysrgb&w=800',
          likes_count: 42,
          comments_count: 8,
          shares_count: 12,
          created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          updated_at: new Date().toISOString(),
          user: {
            id: 'mock-user',
            name: 'Ahmet Karaca',
            email: 'ahmet@example.com',
            avatar_url: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
            location: 'Konya',
            verified: true,
            followers_count: 2340,
            following_count: 156,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          },
          is_liked: false,
          hashtags: ['#buğday', '#hasat', '#organiktarım']
        }
      ];
      
      set({ posts: mockPosts });
    } finally {
      set({ loading: false });
    }
  },

  createPost: async (content: string, category: string, imageFile?: File) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error('Gönderi paylaşmak için giriş yapmalısınız');
        return;
      }

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
      console.error('Create post error:', error);
      toast.error('Gönderi paylaşılırken hata oluştu');
    }
  },

  likePost: async (postId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error('Beğenmek için giriş yapmalısınız');
        return;
      }

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
      console.error('Like error:', error);
      toast.error('Beğeni işlemi başarısız');
    }
  },

  addComment: async (postId: string, content: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error('Yorum yapmak için giriş yapmalısınız');
        return;
      }

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
      await supabase.rpc('increment_comments_count', { post_id: postId });

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
      console.error('Comment error:', error);
      toast.error('Yorum eklenirken hata oluştu');
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
      console.error('Fetch comments error:', error);
      toast.error('Yorumlar yüklenirken hata oluştu');
    }
  },

  sharePost: async (postId: string) => {
    try {
      await supabase.rpc('increment_shares_count', { post_id: postId });

      // Update local state
      const { posts } = get();
      const updatedPosts = posts.map(p =>
        p.id === postId ? { ...p, shares_count: (p.shares_count || 0) + 1 } : p
      );
      set({ posts: updatedPosts });

      toast.success('Gönderi paylaşıldı! 📤');
    } catch (error: any) {
      console.error('Share error:', error);
      toast.error('Paylaşım başarısız');
    }
  },
}));