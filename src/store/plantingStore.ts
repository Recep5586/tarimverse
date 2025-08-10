import { create } from 'zustand';
import { supabase, Crop, PlantingCalendar, UserGarden, PlantingSchedule, HarvestReminder, isSupabaseConfigured } from '../lib/supabase';
import toast from 'react-hot-toast';

interface PlantingState {
  crops: Crop[];
  plantingCalendar: PlantingCalendar[];
  userGardens: UserGarden[];
  plantingSchedules: PlantingSchedule[];
  harvestReminders: HarvestReminder[];
  loading: boolean;
  
  // Crops
  fetchCrops: () => Promise<void>;
  
  // Planting Calendar
  fetchPlantingCalendar: (region?: string) => Promise<void>;
  getPlantingRecommendations: (region: string, month: number) => PlantingCalendar[];
  
  // User Gardens
  fetchUserGardens: () => Promise<void>;
  createGarden: (garden: Omit<UserGarden, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => Promise<void>;
  updateGarden: (gardenId: string, updates: Partial<UserGarden>) => Promise<void>;
  deleteGarden: (gardenId: string) => Promise<void>;
  
  // Planting Schedules
  fetchPlantingSchedules: () => Promise<void>;
  createPlantingSchedule: (schedule: Omit<PlantingSchedule, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => Promise<void>;
  updatePlantingSchedule: (scheduleId: string, updates: Partial<PlantingSchedule>) => Promise<void>;
  
  // Harvest Reminders
  fetchHarvestReminders: () => Promise<void>;
  createReminder: (reminder: Omit<HarvestReminder, 'id' | 'user_id' | 'created_at'>) => Promise<void>;
  markReminderCompleted: (reminderId: string) => Promise<void>;
}

// Mock data for when Supabase is not configured
const getMockCrops = (): Crop[] => [
  {
    id: '1',
    name: 'Domates',
    scientific_name: 'Solanum lycopersicum',
    category: 'Sebze',
    planting_season: ['spring', 'summer'],
    growing_days: 80,
    soil_type: ['humuslu', 'killi'],
    water_needs: 'orta',
    sun_requirements: 'güneş',
    planting_depth_cm: 1,
    spacing_cm: 50,
    temperature_min: 15,
    temperature_max: 30,
    description: 'En popüler sebzelerden biri. Vitamin C açısından zengin.',
    tips: 'Düzenli sulama yapın, destek çubukları kullanın.',
    image_url: 'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg',
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Salatalık',
    scientific_name: 'Cucumis sativus',
    category: 'Sebze',
    planting_season: ['spring', 'summer'],
    growing_days: 60,
    soil_type: ['humuslu', 'kumlu'],
    water_needs: 'çok',
    sun_requirements: 'güneş',
    planting_depth_cm: 2,
    spacing_cm: 30,
    temperature_min: 18,
    temperature_max: 35,
    description: 'Serinletici ve sulu sebze. Salatalarda vazgeçilmez.',
    tips: 'Bol su isteyen bir bitki. Tırmanma desteği verin.',
    image_url: 'https://images.pexels.com/photos/2329440/pexels-photo-2329440.jpeg',
    created_at: new Date().toISOString()
  }
];

const getMockPlantingCalendar = (): PlantingCalendar[] => [
  {
    id: '1',
    crop_id: '1',
    region: 'Akdeniz',
    planting_month: 3,
    harvest_month: 6,
    is_indoor: false,
    notes: 'Açık alan ekimi',
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    crop_id: '2',
    region: 'Akdeniz',
    planting_month: 4,
    harvest_month: 6,
    is_indoor: false,
    notes: 'Açık alan ekimi',
    created_at: new Date().toISOString()
  }
];

export const usePlantingStore = create<PlantingState>((set, get) => ({
  crops: [],
  plantingCalendar: [],
  userGardens: [],
  plantingSchedules: [],
  harvestReminders: [],
  loading: false,

  fetchCrops: async () => {
    set({ loading: true });
    
    if (!isSupabaseConfigured()) {
      console.info('Supabase not configured, using mock crop data');
      set({ crops: getMockCrops(), loading: false });
      return;
    }

    try {
      const { data, error } = await supabase!
        .from('crops')
        .select('*')
        .order('name');

      if (error) throw error;
      set({ crops: data || [] });
    } catch (error: any) {
      console.warn('Failed to fetch crops from Supabase, using mock data:', error.message);
      set({ crops: getMockCrops() });
    } finally {
      set({ loading: false });
    }
  },

  fetchPlantingCalendar: async (region?: string) => {
    if (!isSupabaseConfigured()) {
      console.info('Supabase not configured, using mock calendar data');
      set({ plantingCalendar: getMockPlantingCalendar() });
      return;
    }

    try {
      let query = supabase!
        .from('planting_calendar')
        .select(`
          *,
          crop:crops(*)
        `)
        .order('planting_month');

      if (region) {
        query = query.eq('region', region);
      }

      const { data, error } = await query;
      if (error) throw error;
      
      set({ plantingCalendar: data || [] });
    } catch (error: any) {
      console.warn('Failed to fetch planting calendar:', error.message);
      set({ plantingCalendar: getMockPlantingCalendar() });
    }
  },

  getPlantingRecommendations: (region: string, month: number) => {
    const { plantingCalendar } = get();
    return plantingCalendar.filter(
      item => item.region === region && item.planting_month === month
    );
  },

  fetchUserGardens: async () => {
    if (!isSupabaseConfigured()) {
      set({ userGardens: [] });
      return;
    }

    try {
      const { data: { user } } = await supabase!.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase!
        .from('user_gardens')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      set({ userGardens: data || [] });
    } catch (error: any) {
      console.error('Fetch user gardens error:', error);
      toast.error('Bahçeler yüklenirken hata oluştu');
    }
  },

  createGarden: async (garden) => {
    if (!isSupabaseConfigured()) {
      toast.error('Supabase yapılandırılmamış - bahçe oluşturulamıyor');
      return;
    }

    try {
      const { data: { user } } = await supabase!.auth.getUser();
      if (!user) {
        toast.error('Bahçe oluşturmak için giriş yapmalısınız');
        return;
      }

      const { data, error } = await supabase!
        .from('user_gardens')
        .insert([{ ...garden, user_id: user.id }])
        .select()
        .single();

      if (error) throw error;

      const { userGardens } = get();
      set({ userGardens: [data, ...userGardens] });
      toast.success('Bahçe başarıyla oluşturuldu! 🌱');
    } catch (error: any) {
      console.error('Create garden error:', error);
      toast.error('Bahçe oluşturulurken hata oluştu');
    }
  },

  updateGarden: async (gardenId, updates) => {
    if (!isSupabaseConfigured()) {
      toast.error('Supabase yapılandırılmamış');
      return;
    }

    try {
      const { data, error } = await supabase!
        .from('user_gardens')
        .update(updates)
        .eq('id', gardenId)
        .select()
        .single();

      if (error) throw error;

      const { userGardens } = get();
      const updatedGardens = userGardens.map(garden =>
        garden.id === gardenId ? data : garden
      );
      set({ userGardens: updatedGardens });
      toast.success('Bahçe güncellendi! ✅');
    } catch (error: any) {
      console.error('Update garden error:', error);
      toast.error('Bahçe güncellenirken hata oluştu');
    }
  },

  deleteGarden: async (gardenId) => {
    if (!isSupabaseConfigured()) {
      toast.error('Supabase yapılandırılmamış');
      return;
    }

    try {
      const { error } = await supabase!
        .from('user_gardens')
        .delete()
        .eq('id', gardenId);

      if (error) throw error;

      const { userGardens } = get();
      const filteredGardens = userGardens.filter(garden => garden.id !== gardenId);
      set({ userGardens: filteredGardens });
      toast.success('Bahçe silindi');
    } catch (error: any) {
      console.error('Delete garden error:', error);
      toast.error('Bahçe silinirken hata oluştu');
    }
  },

  fetchPlantingSchedules: async () => {
    if (!isSupabaseConfigured()) {
      set({ plantingSchedules: [] });
      return;
    }

    try {
      const { data: { user } } = await supabase!.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase!
        .from('planting_schedules')
        .select(`
          *,
          crop:crops(*),
          garden:user_gardens(*)
        `)
        .eq('user_id', user.id)
        .order('planned_planting_date');

      if (error) throw error;
      set({ plantingSchedules: data || [] });
    } catch (error: any) {
      console.error('Fetch planting schedules error:', error);
      toast.error('Ekim programları yüklenirken hata oluştu');
    }
  },

  createPlantingSchedule: async (schedule) => {
    if (!isSupabaseConfigured()) {
      toast.error('Supabase yapılandırılmamış');
      return;
    }

    try {
      const { data: { user } } = await supabase!.auth.getUser();
      if (!user) {
        toast.error('Ekim programı oluşturmak için giriş yapmalısınız');
        return;
      }

      const { data, error } = await supabase!
        .from('planting_schedules')
        .insert([{ ...schedule, user_id: user.id }])
        .select(`
          *,
          crop:crops(*),
          garden:user_gardens(*)
        `)
        .single();

      if (error) throw error;

      const { plantingSchedules } = get();
      set({ plantingSchedules: [data, ...plantingSchedules] });
      toast.success('Ekim programı oluşturuldu! 📅');
    } catch (error: any) {
      console.error('Create planting schedule error:', error);
      toast.error('Ekim programı oluşturulurken hata oluştu');
    }
  },

  updatePlantingSchedule: async (scheduleId, updates) => {
    if (!isSupabaseConfigured()) {
      toast.error('Supabase yapılandırılmamış');
      return;
    }

    try {
      const { data, error } = await supabase!
        .from('planting_schedules')
        .update(updates)
        .eq('id', scheduleId)
        .select(`
          *,
          crop:crops(*),
          garden:user_gardens(*)
        `)
        .single();

      if (error) throw error;

      const { plantingSchedules } = get();
      const updatedSchedules = plantingSchedules.map(schedule =>
        schedule.id === scheduleId ? data : schedule
      );
      set({ plantingSchedules: updatedSchedules });
      toast.success('Ekim programı güncellendi! ✅');
    } catch (error: any) {
      console.error('Update planting schedule error:', error);
      toast.error('Ekim programı güncellenirken hata oluştu');
    }
  },

  fetchHarvestReminders: async () => {
    if (!isSupabaseConfigured()) {
      set({ harvestReminders: [] });
      return;
    }

    try {
      const { data: { user } } = await supabase!.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase!
        .from('harvest_reminders')
        .select(`
          *,
          schedule:planting_schedules(
            *,
            crop:crops(*),
            garden:user_gardens(*)
          )
        `)
        .eq('user_id', user.id)
        .order('reminder_date');

      if (error) throw error;
      set({ harvestReminders: data || [] });
    } catch (error: any) {
      console.error('Fetch harvest reminders error:', error);
      toast.error('Hatırlatıcılar yüklenirken hata oluştu');
    }
  },

  createReminder: async (reminder) => {
    if (!isSupabaseConfigured()) {
      toast.error('Supabase yapılandırılmamış');
      return;
    }

    try {
      const { data: { user } } = await supabase!.auth.getUser();
      if (!user) {
        toast.error('Hatırlatıcı oluşturmak için giriş yapmalısınız');
        return;
      }

      const { data, error } = await supabase!
        .from('harvest_reminders')
        .insert([{ ...reminder, user_id: user.id }])
        .select(`
          *,
          schedule:planting_schedules(
            *,
            crop:crops(*),
            garden:user_gardens(*)
          )
        `)
        .single();

      if (error) throw error;

      const { harvestReminders } = get();
      set({ harvestReminders: [data, ...harvestReminders] });
      toast.success('Hatırlatıcı oluşturuldu! 🔔');
    } catch (error: any) {
      console.error('Create reminder error:', error);
      toast.error('Hatırlatıcı oluşturulurken hata oluştu');
    }
  },

  markReminderCompleted: async (reminderId) => {
    if (!isSupabaseConfigured()) {
      toast.error('Supabase yapılandırılmamış');
      return;
    }

    try {
      const { data, error } = await supabase!
        .from('harvest_reminders')
        .update({ is_completed: true })
        .eq('id', reminderId)
        .select()
        .single();

      if (error) throw error;

      const { harvestReminders } = get();
      const updatedReminders = harvestReminders.map(reminder =>
        reminder.id === reminderId ? { ...reminder, is_completed: true } : reminder
      );
      set({ harvestReminders: updatedReminders });
      toast.success('Hatırlatıcı tamamlandı! ✅');
    } catch (error: any) {
      console.error('Mark reminder completed error:', error);
      toast.error('Hatırlatıcı güncellenirken hata oluştu');
    }
  },
}));