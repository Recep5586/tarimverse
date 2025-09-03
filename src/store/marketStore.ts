import { create } from 'zustand';
import { MarketItem } from '../lib/supabase';
import localDB from '../lib/localDatabase';
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
      let items = await localDB.market.getAll();
      
      // Apply filters
      if (category) {
        items = items.filter(item => item.category === category);
      }
      
      if (location) {
        items = items.filter(item => 
          item.location.toLowerCase().includes(location.toLowerCase())
        );
      }

      set({ items });
    } catch (error: any) {
      console.error('Fetch market items error:', error);
      toast.error('Pazar ürünleri yüklenirken hata oluştu');
    } finally {
      set({ loading: false });
    }
  },

  createItem: async (item) => {
    try {
      const newItem = await localDB.market.create(item);
      const { items } = get();
      set({ items: [newItem, ...items] });
      toast.success('Ürün pazara eklendi! 🛒');
    } catch (error: any) {
      console.error('Create item error:', error);
      toast.error(error.message || 'Ürün eklenirken hata oluştu');
    }
  },

  updateItemStatus: async (itemId: string, status: MarketItem['status']) => {
    try {
      // In a real app, this would update the database
      const { items } = get();
      const updatedItems = items.map(item =>
        item.id === itemId ? { ...item, status } : item
      );
      set({ items: updatedItems });
      toast.success('Ürün durumu güncellendi! ✅');
    } catch (error: any) {
      console.error('Update item status error:', error);
      toast.error('Durum güncellenirken hata oluştu');
    }
  },
}));