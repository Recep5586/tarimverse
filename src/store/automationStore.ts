import { create } from 'zustand';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import toast from 'react-hot-toast';

interface AutomationRule {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  trigger_type: 'weather' | 'sensor' | 'time' | 'growth_stage' | 'market_price';
  trigger_conditions: any;
  action_type: 'irrigation' | 'notification' | 'fertilization' | 'pest_control' | 'harvest_alert';
  action_parameters: any;
  is_active: boolean;
  last_triggered?: string;
  created_at: string;
  updated_at: string;
}

interface IoTDevice {
  id: string;
  user_id: string;
  garden_id?: string;
  device_name: string;
  device_type: 'soil_sensor' | 'weather_station' | 'camera' | 'irrigation_controller' | 'ph_sensor' | 'moisture_sensor';
  device_id: string;
  battery_level?: number;
  signal_strength?: number;
  firmware_version?: string;
  last_seen?: string;
  is_online: boolean;
  configuration: any;
  created_at: string;
  updated_at: string;
}

interface AIRecommendation {
  id: string;
  user_id: string;
  garden_id?: string;
  recommendation_type: 'planting' | 'watering' | 'fertilizing' | 'pest_control' | 'harvesting' | 'soil_improvement';
  title: string;
  description: string;
  confidence_score?: number;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  data_sources: any;
  action_steps: string[];
  expected_outcome?: string;
  is_implemented: boolean;
  feedback_rating?: number;
  expires_at?: string;
  created_at: string;
}

interface SensorData {
  id: string;
  device_id: string;
  sensor_type: string;
  value: number;
  unit: string;
  quality_score?: number;
  metadata: any;
  recorded_at: string;
  created_at: string;
}

interface AutomationState {
  automationRules: AutomationRule[];
  iotDevices: IoTDevice[];
  aiRecommendations: AIRecommendation[];
  sensorData: SensorData[];
  loading: boolean;
  
  // Automation Rules
  fetchAutomationRules: () => Promise<void>;
  createAutomationRule: (rule: Omit<AutomationRule, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => Promise<void>;
  updateAutomationRule: (ruleId: string, updates: Partial<AutomationRule>) => Promise<void>;
  deleteAutomationRule: (ruleId: string) => Promise<void>;
  toggleAutomationRule: (ruleId: string) => Promise<void>;
  
  // IoT Devices
  fetchIoTDevices: () => Promise<void>;
  addIoTDevice: (device: Omit<IoTDevice, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => Promise<void>;
  updateIoTDevice: (deviceId: string, updates: Partial<IoTDevice>) => Promise<void>;
  removeIoTDevice: (deviceId: string) => Promise<void>;
  
  // AI Recommendations
  fetchAIRecommendations: () => Promise<void>;
  implementRecommendation: (recommendationId: string) => Promise<void>;
  rateRecommendation: (recommendationId: string, rating: number) => Promise<void>;
  
  // Sensor Data
  fetchSensorData: (deviceId?: string) => Promise<void>;
  addSensorReading: (data: Omit<SensorData, 'id' | 'created_at'>) => Promise<void>;
}

// Mock data for when Supabase is not configured
const getMockAutomationRules = (): AutomationRule[] => [
  {
    id: '1',
    user_id: 'mock-user',
    name: 'Otomatik Sulama',
    description: 'Toprak nemi %30\'un altına düştüğünde sulama yap',
    trigger_type: 'sensor',
    trigger_conditions: { sensor_type: 'moisture', threshold: 30, operator: 'less_than' },
    action_type: 'irrigation',
    action_parameters: { duration: 15, zone: 'main_garden' },
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '2',
    user_id: 'mock-user',
    name: 'Hava Durumu Uyarısı',
    description: 'Yağmur öncesi bildirim gönder',
    trigger_type: 'weather',
    trigger_conditions: { condition: 'rain', probability: 70 },
    action_type: 'notification',
    action_parameters: { message: 'Yağmur geliyor, hazırlık yapın!' },
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

const getMockIoTDevices = (): IoTDevice[] => [
  {
    id: '1',
    user_id: 'mock-user',
    device_name: 'Bahçe Nem Sensörü',
    device_type: 'soil_sensor',
    device_id: 'SOIL_001',
    battery_level: 85,
    signal_strength: 92,
    firmware_version: '1.2.3',
    is_online: true,
    configuration: { measurement_interval: 300 },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '2',
    user_id: 'mock-user',
    device_name: 'Akıllı Kamera',
    device_type: 'camera',
    device_id: 'CAM_001',
    battery_level: 67,
    signal_strength: 78,
    firmware_version: '2.1.0',
    is_online: true,
    configuration: { resolution: '1080p', night_vision: true },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

const getMockAIRecommendations = (): AIRecommendation[] => [
  {
    id: '1',
    user_id: 'mock-user',
    recommendation_type: 'watering',
    title: 'Sulama Zamanını Optimize Edin',
    description: 'Hava durumu verilerine göre sulama zamanınızı sabah 06:00\'ya alın. Bu %15 daha verimli olacak.',
    confidence_score: 0.92,
    priority: 'high',
    data_sources: { weather: true, soil_moisture: true },
    action_steps: [
      'Sulama zamanını sabah 06:00\'ya ayarlayın',
      'Su miktarını %10 azaltın',
      'Haftalık sulama programını güncelleyin'
    ],
    expected_outcome: '%15 su tasarrufu ve daha sağlıklı bitki büyümesi',
    is_implemented: false,
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    user_id: 'mock-user',
    recommendation_type: 'pest_control',
    title: 'Erken Pest Tespiti',
    description: 'Kamera görüntülerinde yaprak biti belirtileri tespit edildi. Hemen müdahale edin.',
    confidence_score: 0.87,
    priority: 'urgent',
    data_sources: { camera: true, ai_analysis: true },
    action_steps: [
      'Etkilenen yaprakları kontrol edin',
      'Organik pestisit uygulayın',
      'Günlük takip yapın'
    ],
    expected_outcome: 'Pest yayılımının önlenmesi',
    is_implemented: false,
    created_at: new Date().toISOString()
  }
];

export const useAutomationStore = create<AutomationState>((set, get) => ({
  automationRules: [],
  iotDevices: [],
  aiRecommendations: [],
  sensorData: [],
  loading: false,

  fetchAutomationRules: async () => {
    set({ loading: true });
    
    if (!isSupabaseConfigured()) {
      console.info('Supabase not configured, using mock automation rules');
      set({ automationRules: getMockAutomationRules(), loading: false });
      return;
    }

    try {
      const { data: { user } } = await supabase!.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase!
        .from('automation_rules')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      set({ automationRules: data || [] });
    } catch (error: any) {
      console.warn('Failed to fetch automation rules:', error.message);
      set({ automationRules: getMockAutomationRules() });
    } finally {
      set({ loading: false });
    }
  },

  createAutomationRule: async (rule) => {
    if (!isSupabaseConfigured()) {
      toast.error('Supabase yapılandırılmamış');
      return;
    }

    try {
      const { data: { user } } = await supabase!.auth.getUser();
      if (!user) {
        toast.error('Otomasyon kuralı oluşturmak için giriş yapmalısınız');
        return;
      }

      const { data, error } = await supabase!
        .from('automation_rules')
        .insert([{ ...rule, user_id: user.id }])
        .select()
        .single();

      if (error) throw error;

      const { automationRules } = get();
      set({ automationRules: [data, ...automationRules] });
      toast.success('Otomasyon kuralı oluşturuldu! 🤖');
    } catch (error: any) {
      console.error('Create automation rule error:', error);
      toast.error('Otomasyon kuralı oluşturulurken hata oluştu');
    }
  },

  updateAutomationRule: async (ruleId, updates) => {
    if (!isSupabaseConfigured()) {
      toast.error('Supabase yapılandırılmamış');
      return;
    }

    try {
      const { data, error } = await supabase!
        .from('automation_rules')
        .update(updates)
        .eq('id', ruleId)
        .select()
        .single();

      if (error) throw error;

      const { automationRules } = get();
      const updatedRules = automationRules.map(rule =>
        rule.id === ruleId ? data : rule
      );
      set({ automationRules: updatedRules });
      toast.success('Otomasyon kuralı güncellendi! ✅');
    } catch (error: any) {
      console.error('Update automation rule error:', error);
      toast.error('Otomasyon kuralı güncellenirken hata oluştu');
    }
  },

  deleteAutomationRule: async (ruleId) => {
    if (!isSupabaseConfigured()) {
      toast.error('Supabase yapılandırılmamış');
      return;
    }

    try {
      const { error } = await supabase!
        .from('automation_rules')
        .delete()
        .eq('id', ruleId);

      if (error) throw error;

      const { automationRules } = get();
      const filteredRules = automationRules.filter(rule => rule.id !== ruleId);
      set({ automationRules: filteredRules });
      toast.success('Otomasyon kuralı silindi');
    } catch (error: any) {
      console.error('Delete automation rule error:', error);
      toast.error('Otomasyon kuralı silinirken hata oluştu');
    }
  },

  toggleAutomationRule: async (ruleId) => {
    const { automationRules, updateAutomationRule } = get();
    const rule = automationRules.find(r => r.id === ruleId);
    if (rule) {
      await updateAutomationRule(ruleId, { is_active: !rule.is_active });
    }
  },

  fetchIoTDevices: async () => {
    if (!isSupabaseConfigured()) {
      console.info('Supabase not configured, using mock IoT devices');
      set({ iotDevices: getMockIoTDevices() });
      return;
    }

    try {
      const { data: { user } } = await supabase!.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase!
        .from('iot_devices')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      set({ iotDevices: data || [] });
    } catch (error: any) {
      console.warn('Failed to fetch IoT devices:', error.message);
      set({ iotDevices: getMockIoTDevices() });
    }
  },

  addIoTDevice: async (device) => {
    if (!isSupabaseConfigured()) {
      toast.error('Supabase yapılandırılmamış');
      return;
    }

    try {
      const { data: { user } } = await supabase!.auth.getUser();
      if (!user) {
        toast.error('IoT cihazı eklemek için giriş yapmalısınız');
        return;
      }

      const { data, error } = await supabase!
        .from('iot_devices')
        .insert([{ ...device, user_id: user.id }])
        .select()
        .single();

      if (error) throw error;

      const { iotDevices } = get();
      set({ iotDevices: [data, ...iotDevices] });
      toast.success('IoT cihazı eklendi! 📡');
    } catch (error: any) {
      console.error('Add IoT device error:', error);
      toast.error('IoT cihazı eklenirken hata oluştu');
    }
  },

  updateIoTDevice: async (deviceId, updates) => {
    if (!isSupabaseConfigured()) {
      toast.error('Supabase yapılandırılmamış');
      return;
    }

    try {
      const { data, error } = await supabase!
        .from('iot_devices')
        .update(updates)
        .eq('id', deviceId)
        .select()
        .single();

      if (error) throw error;

      const { iotDevices } = get();
      const updatedDevices = iotDevices.map(device =>
        device.id === deviceId ? data : device
      );
      set({ iotDevices: updatedDevices });
      toast.success('IoT cihazı güncellendi! ✅');
    } catch (error: any) {
      console.error('Update IoT device error:', error);
      toast.error('IoT cihazı güncellenirken hata oluştu');
    }
  },

  removeIoTDevice: async (deviceId) => {
    if (!isSupabaseConfigured()) {
      toast.error('Supabase yapılandırılmamış');
      return;
    }

    try {
      const { error } = await supabase!
        .from('iot_devices')
        .delete()
        .eq('id', deviceId);

      if (error) throw error;

      const { iotDevices } = get();
      const filteredDevices = iotDevices.filter(device => device.id !== deviceId);
      set({ iotDevices: filteredDevices });
      toast.success('IoT cihazı kaldırıldı');
    } catch (error: any) {
      console.error('Remove IoT device error:', error);
      toast.error('IoT cihazı kaldırılırken hata oluştu');
    }
  },

  fetchAIRecommendations: async () => {
    if (!isSupabaseConfigured()) {
      console.info('Supabase not configured, using mock AI recommendations');
      set({ aiRecommendations: getMockAIRecommendations() });
      return;
    }

    try {
      const { data: { user } } = await supabase!.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase!
        .from('ai_recommendations')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      set({ aiRecommendations: data || [] });
    } catch (error: any) {
      console.warn('Failed to fetch AI recommendations:', error.message);
      set({ aiRecommendations: getMockAIRecommendations() });
    }
  },

  implementRecommendation: async (recommendationId) => {
    if (!isSupabaseConfigured()) {
      // For mock data, just update local state
      const { aiRecommendations } = get();
      const updatedRecommendations = aiRecommendations.map(rec =>
        rec.id === recommendationId ? { ...rec, is_implemented: true } : rec
      );
      set({ aiRecommendations: updatedRecommendations });
      toast.success('Öneri uygulandı! ✅');
      return;
    }

    try {
      const { data, error } = await supabase!
        .from('ai_recommendations')
        .update({ is_implemented: true })
        .eq('id', recommendationId)
        .select()
        .single();

      if (error) throw error;

      const { aiRecommendations } = get();
      const updatedRecommendations = aiRecommendations.map(rec =>
        rec.id === recommendationId ? data : rec
      );
      set({ aiRecommendations: updatedRecommendations });
      toast.success('Öneri uygulandı! ✅');
    } catch (error: any) {
      console.error('Implement recommendation error:', error);
      toast.error('Öneri uygulanırken hata oluştu');
    }
  },

  rateRecommendation: async (recommendationId, rating) => {
    if (!isSupabaseConfigured()) {
      toast.error('Supabase yapılandırılmamış');
      return;
    }

    try {
      const { data, error } = await supabase!
        .from('ai_recommendations')
        .update({ feedback_rating: rating })
        .eq('id', recommendationId)
        .select()
        .single();

      if (error) throw error;

      const { aiRecommendations } = get();
      const updatedRecommendations = aiRecommendations.map(rec =>
        rec.id === recommendationId ? data : rec
      );
      set({ aiRecommendations: updatedRecommendations });
      toast.success('Geri bildirim kaydedildi! ⭐');
    } catch (error: any) {
      console.error('Rate recommendation error:', error);
      toast.error('Geri bildirim kaydedilirken hata oluştu');
    }
  },

  fetchSensorData: async (deviceId?: string) => {
    if (!isSupabaseConfigured()) {
      set({ sensorData: [] });
      return;
    }

    try {
      let query = supabase!
        .from('sensor_data')
        .select('*')
        .order('recorded_at', { ascending: false })
        .limit(100);

      if (deviceId) {
        query = query.eq('device_id', deviceId);
      }

      const { data, error } = await query;
      if (error) throw error;
      
      set({ sensorData: data || [] });
    } catch (error: any) {
      console.error('Fetch sensor data error:', error);
      toast.error('Sensör verileri yüklenirken hata oluştu');
    }
  },

  addSensorReading: async (data) => {
    if (!isSupabaseConfigured()) {
      toast.error('Supabase yapılandırılmamış');
      return;
    }

    try {
      const { data: newReading, error } = await supabase!
        .from('sensor_data')
        .insert([data])
        .select()
        .single();

      if (error) throw error;

      const { sensorData } = get();
      set({ sensorData: [newReading, ...sensorData.slice(0, 99)] });
    } catch (error: any) {
      console.error('Add sensor reading error:', error);
      toast.error('Sensör verisi eklenirken hata oluştu');
    }
  },
}));