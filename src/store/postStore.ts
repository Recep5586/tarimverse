import { create } from 'zustand';
import { Post, Comment } from '../lib/supabase';
import localDB from '../lib/localDatabase';
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
      const posts = await localDB.posts.getAll();
      set({ posts });
    } catch (error: any) {
      console.error('Fetch posts error:', error);
      toast.error('Gönderiler yüklenirken hata oluştu');
    } finally {
      set({ loading: false });
    }
  },

  createPost: async (content: string, category: string, imageFile?: File) => {
    try {
      const newPost = await localDB.posts.create(content, category, imageFile);
      const { posts } = get();
      set({ posts: [newPost, ...posts] });
      toast.success('Gönderi paylaşıldı! 🌱');
    } catch (error: any) {
      console.error('Create post error:', error);
      toast.error(error.message || 'Gönderi paylaşılırken hata oluştu');
    }
  },

  likePost: async (postId: string) => {
    try {
      await localDB.posts.like(postId);
      // Refresh posts to get updated like status
      const posts = await localDB.posts.getAll();
      set({ posts });
    } catch (error: any) {
      console.error('Like error:', error);
      toast.error(error.message || 'Beğeni işlemi başarısız');
    }
  },

  addComment: async (postId: string, content: string) => {
    try {
      const newComment = await localDB.posts.addComment(postId, content);
      const { comments } = get();
      set({ comments: [...comments, newComment] });
      
      // Update posts to reflect new comment count
      const posts = await localDB.posts.getAll();
      set({ posts });
      
      toast.success('Yorum eklendi! 💬');
    } catch (error: any) {
      console.error('Comment error:', error);
      toast.error(error.message || 'Yorum eklenirken hata oluştu');
    }
  },

  fetchComments: async (postId: string) => {
    try {
      const comments = await localDB.posts.getComments(postId);
      set({ comments });
    } catch (error: any) {
      console.error('Fetch comments error:', error);
      toast.error('Yorumlar yüklenirken hata oluştu');
    }
  },

  sharePost: async (postId: string) => {
    try {
      await localDB.posts.share(postId);
      
      // Update posts to reflect new share count
      const posts = await localDB.posts.getAll();
      set({ posts });
      
      toast.success('Gönderi paylaşıldı! 📤');
    } catch (error: any) {
      console.error('Share error:', error);
      toast.error('Paylaşım başarısız');
    }
  },
}));