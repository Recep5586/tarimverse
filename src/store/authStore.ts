import { create } from 'zustand';
import { User } from '../lib/supabase';
import localDB from '../lib/localDatabase';
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
      const user = localDB.auth.getCurrentUser();
      set({ user, loading: false });
    } catch (error) {
      console.error('Auth initialization error:', error);
      set({ loading: false });
    }
  },

  signIn: async (email: string, password: string) => {
    try {
      const user = await localDB.auth.signIn(email, password);
      set({ user });
      toast.success('Başarıyla giriş yaptınız! 🌱');
    } catch (error: any) {
      toast.error(error.message || 'Giriş yapılırken hata oluştu');
      throw error;
    }
  },

  signUp: async (email: string, password: string, name: string) => {
    try {
      const user = await localDB.auth.signUp(email, password, name);
      set({ user });
      toast.success('Hesabınız oluşturuldu! Hoş geldiniz! 🌱');
    } catch (error: any) {
      toast.error(error.message || 'Kayıt olurken hata oluştu');
      throw error;
    }
  },

  signOut: async () => {
    try {
      await localDB.auth.signOut();
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
      const updatedUser = await localDB.auth.updateProfile(user.id, updates);
      set({ user: updatedUser });
      toast.success('Profil güncellendi! 🌱');
    } catch (error: any) {
      toast.error(error.message || 'Profil güncellenirken hata oluştu');
      throw error;
    }
  },
}));