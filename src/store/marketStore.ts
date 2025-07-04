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
      // Check if Supabase is properly configured
      if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
        console.warn('Supabase not configured, using mock data');
        // Use mock data when Supabase is not configured
        const mockItems = [
          {
            id: '1',
            user_id: 'mock-user',
            title: 'Organik Domates',
            description: 'Kendi bahçemizde yetiştirdiğimiz organik domatesler. Pestisit kullanılmamıştır.',
            price: 15.50,
            category: 'Sebze',
            location: 'Antalya',
            images: ['https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&cs=tinysrgb&w=800'],
            status: 'active' as const,
            created_at: new Date().toISOString(),
            user: {
              id: 'mock-user',
              name: 'Fatma Öztürk',
              email: 'fatma@example.com',
              avatar_url: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
              location: 'Antalya',
              verified: true,
              followers_count: 1890,
              following_count: 234,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            }
          },
          {
            id: '2',
            user_id: 'mock-user-2',
            title: 'Taze Buğday',
            description: 'Bu yıl hasadımızdan kaliteli buğday. Toptan ve perakende satış yapılır.',
            price: 8.75,
            category: 'Tahıl',
            location: 'Konya',
            images: ['https://images.pexels.com/photos/326082/pexels-photo-326082.jpeg?auto=compress&cs=tinysrgb&w=800'],
            status: 'active' as const,
            created_at: new Date().toISOString(),
            user: {
              id: 'mock-user-2',
              name: 'Ahmet Karaca',
              email: 'ahmet@example.com',
              avatar_url: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
              location: 'Konya',
              verified: true,
              followers_count: 2340,
              following_count: 156,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            }
          }
        ];
        
        set({ items: mockItems, loading: false });
        return;
      }

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
      console.error('Fetch market items error:', error);
      toast.error('Pazar ürünleri yüklenirken hata oluştu');
      
      // Fallback to mock data on error
      const mockItems = [
        {
          id: '1',
          user_id: 'mock-user',
          title: 'Organik Domates',
          description: 'Kendi bahçemizde yetiştirdiğimiz organik domatesler.',
          price: 15.50,
          category: 'Sebze',
          location: 'Antalya',
          images: ['https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&cs=tinysrgb&w=800'],
          status: 'active' as const,
          created_at: new Date().toISOString(),
          user: {
            id: 'mock-user',
            name: 'Fatma Öztürk',
            email: 'fatma@example.com',
            avatar_url: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
            location: 'Antalya',
            verified: true,
            followers_count: 1890,
            following_count: 234,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
        }
      ];
      
      set({ items: mockItems });
    } finally {
      set({ loading: false });
    }
  },

  createItem: async (item) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error('Ürün eklemek için giriş yapmalısınız');
        return;
      }

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
      console.error('Create item error:', error);
      toast.error('Ürün eklenirken hata oluştu');
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
      console.error('Update item status error:', error);
      toast.error('Durum güncellenirken hata oluştu');
    }
  },
}));