import { create } from 'zustand';
import { supabase, User } from '../lib/supabase';
import toast from 'react-hot-toast';

interface AuthState {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<void>;
  initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  loading: true,

  initialize: async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        const { data: profile } = await supabase
          .from('users')
          .select('*')
          .eq('id', session.user.id)
          .single();
        
        if (profile) {
          set({ user: profile, loading: false });
        }
      } else {
        set({ loading: false });
      }
    } catch (error) {
      console.error('Auth initialization error:', error);
      set({ loading: false });
    }
  },

  signIn: async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        const { data: profile } = await supabase
          .from('users')
          .select('*')
          .eq('id', data.user.id)
          .single();

        if (profile) {
          set({ user: profile });
          toast.success('Başarıyla giriş yaptınız! 🌱');
        }
      }
    } catch (error: any) {
      toast.error(error.message || 'Giriş yapılırken hata oluştu');
      throw error;
    }
  },

  signUp: async (email: string, password: string, name: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        const { error: profileError } = await supabase
          .from('users')
          .insert([
            {
              id: data.user.id,
              email: data.user.email,
              name,
              verified: false,
              followers_count: 0,
              following_count: 0,
            },
          ]);

        if (profileError) throw profileError;

        toast.success('Hesabınız oluşturuldu! Giriş yapabilirsiniz. 🌱');
      }
    } catch (error: any) {
      toast.error(error.message || 'Kayıt olurken hata oluştu');
      throw error;
    }
  },

  signOut: async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      set({ user: null });
      toast.success('Başarıyla çıkış yaptınız');
    } catch (error: any) {
      toast.error(error.message || 'Çıkış yapılırken hata oluştu');
    }
  },

  updateProfile: async (updates: Partial<User>) => {
    const { user } = get();
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', user.id)
        .select()
        .single();

      if (error) throw error;

      set({ user: data });
      toast.success('Profil güncellendi! 🌱');
    } catch (error: any) {
      toast.error(error.message || 'Profil güncellenirken hata oluştu');
      throw error;
    }
  },
}));