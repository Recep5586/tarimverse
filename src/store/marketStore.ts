import { create } from 'zustand';
import { supabase, MarketItem } from '../lib/supabase';
import toast from 'react-hot-toast';

interface MarketState {
  items: MarketItem[];
  loading: boolean;
  categories: string[];
  fetchItems: (category?: string, location?: string) => Promise<void>;
  createItem: (item: Omit<MarketItem, 'id' | 'user_id' | 'created_at' | 'user'>) => Promise<void>;
  updateItemStatus: (itemId: string, status: MarketItem['status']) => Promise<void>;
}

export const useMarketStore = create<MarketState>((set, get) => ({
  items: [],
  loading: false,
  categories: ['Sebze', 'Meyve', 'Tahıl', 'Hayvansal Ürün', 'Ekipman', 'Tohum', 'Gübre', 'Diğer'],

  fetchItems: async (category?: string, location?: string) => {
    set({ loading: true });
    try {
      let query = supabase
        .from('market_items')
        .select(`
          *,
          user:users(*)
        `)
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (category) {
        query = query.eq('category', category);
      }

      if (location) {
        query = query.ilike('location', `%${location}%`);
      }

      const { data, error } = await query;

      if (error) throw error;

      set({ items: data || [] });
    } catch (error: any) {
      toast.error('Pazar ürünleri yüklenirken hata oluştu');
      console.error('Fetch market items error:', error);
    } finally {
      set({ loading: false });
    }
  },

  createItem: async (item) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Giriş yapmalısınız');

      const { data, error } = await supabase
        .from('market_items')
        .insert([
          {
            ...item,
            user_id: user.id,
          },
        ])
        .select(`
          *,
          user:users(*)
        `)
        .single();

      if (error) throw error;

      const { items } = get();
      set({ items: [data, ...items] });

      toast.success('Ürün pazara eklendi! 🛒');
    } catch (error: any) {
      toast.error(error.message || 'Ürün eklenirken hata oluştu');
      throw error;
    }
  },

  updateItemStatus: async (itemId: string, status: MarketItem['status']) => {
    try {
      const { error } = await supabase
        .from('market_items')
        .update({ status })
        .eq('id', itemId);

      if (error) throw error;

      const { items } = get();
      const updatedItems = items.map(item =>
        item.id === itemId ? { ...item, status } : item
      );
      set({ items: updatedItems });

      toast.success('Ürün durumu güncellendi! ✅');
    } catch (error: any) {
      toast.error('Durum güncellenirken hata oluştu');
      console.error('Update item status error:', error);
    }
  },
}));