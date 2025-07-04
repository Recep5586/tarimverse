import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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