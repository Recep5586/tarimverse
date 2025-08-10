import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Only create Supabase client if both URL and key are properly configured
export const supabase = supabaseUrl && supabaseAnonKey && 
  supabaseUrl !== 'https://your-project.supabase.co' && 
  supabaseAnonKey !== 'your-anon-key-here' 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Helper function to check if Supabase is properly configured
export const isSupabaseConfigured = () => {
  return supabase !== null;
};

// Database types
export interface User {
  id: string;
  email: string;
  name: string;
  avatar_url?: string;
  location?: string;
  bio?: string;
  verified: boolean;
  followers_count: number;
  following_count: number;
  created_at: string;
  updated_at: string;
}

export interface Post {
  id: string;
  user_id: string;
  content: string;
  category: string;
  image_url?: string;
  location?: string;
  likes_count: number;
  comments_count: number;
  shares_count: number;
  created_at: string;
  updated_at: string;
  user?: User;
  is_liked?: boolean;
  hashtags?: string[];
}

export interface Comment {
  id: string;
  post_id: string;
  user_id: string;
  content: string;
  likes_count: number;
  created_at: string;
  user?: User;
  is_liked?: boolean;
}

export interface Like {
  id: string;
  user_id: string;
  post_id?: string;
  comment_id?: string;
  created_at: string;
}

export interface Follow {
  id: string;
  follower_id: string;
  following_id: string;
  created_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  type: 'like' | 'comment' | 'follow' | 'mention';
  title: string;
  message: string;
  read: boolean;
  data?: any;
  created_at: string;
}

export interface WeatherData {
  id: string;
  location: string;
  temperature: number;
  condition: string;
  humidity: number;
  wind_speed: number;
  forecast: any;
  created_at: string;
}

export interface MarketItem {
  id: string;
  user_id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  location: string;
  images: string[];
  status: 'active' | 'sold' | 'inactive';
  created_at: string;
  user?: User;
}

export interface ExpertAdvice {
  id: string;
  expert_id: string;
  category: string;
  title: string;
  content: string;
  tags: string[];
  likes_count: number;
  created_at: string;
  expert?: User;
}

// Planting Calendar Types
export interface Crop {
  id: string;
  name: string;
  scientific_name?: string;
  category: string;
  planting_season: string[];
  growing_days: number;
  soil_type: string[];
  water_needs: string;
  sun_requirements: string;
  companion_plants?: string[];
  avoid_plants?: string[];
  planting_depth_cm?: number;
  spacing_cm?: number;
  temperature_min?: number;
  temperature_max?: number;
  description?: string;
  tips?: string;
  image_url?: string;
  created_at: string;
}

export interface PlantingCalendar {
  id: string;
  crop_id: string;
  region: string;
  planting_month: number;
  harvest_month: number;
  is_indoor: boolean;
  notes?: string;
  created_at: string;
  crop?: Crop;
}

export interface UserGarden {
  id: string;
  user_id: string;
  name: string;
  location: string;
  region: string;
  size_sqm?: number;
  soil_type?: string;
  sun_exposure?: string;
  water_source?: string;
  garden_type: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface PlantingSchedule {
  id: string;
  user_id: string;
  garden_id: string;
  crop_id: string;
  planned_planting_date: string;
  actual_planting_date?: string;
  expected_harvest_date: string;
  actual_harvest_date?: string;
  quantity?: string;
  area_used_sqm?: number;
  status: 'planned' | 'planted' | 'growing' | 'harvested' | 'failed';
  notes?: string;
  created_at: string;
  updated_at: string;
  crop?: Crop;
  garden?: UserGarden;
}

export interface HarvestReminder {
  id: string;
  user_id: string;
  schedule_id: string;
  reminder_type: 'planting' | 'watering' | 'fertilizing' | 'harvest' | 'pruning';
  reminder_date: string;
  title: string;
  message: string;
  is_sent: boolean;
  is_completed: boolean;
  created_at: string;
  schedule?: PlantingSchedule;
}