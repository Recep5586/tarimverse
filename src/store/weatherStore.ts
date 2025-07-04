import { create } from 'zustand';
import { supabase, WeatherData } from '../lib/supabase';
import toast from 'react-hot-toast';

interface WeatherState {
  currentWeather: WeatherData | null;
  forecast: WeatherData[];
  loading: boolean;
  fetchWeather: (location: string) => Promise<void>;
  fetchForecast: (location: string) => Promise<void>;
}

export const useWeatherStore = create<WeatherState>((set, get) => ({
  currentWeather: null,
  forecast: [],
  loading: false,

  fetchWeather: async (location: string) => {
    set({ loading: true });
    try {
      // In a real app, you would call a weather API
      // For demo purposes, we'll use mock data
      const mockWeather: WeatherData = {
        id: '1',
        location,
        temperature: Math.floor(Math.random() * 30) + 5,
        condition: ['Güneşli', 'Bulutlu', 'Yağmurlu', 'Karlı'][Math.floor(Math.random() * 4)],
        humidity: Math.floor(Math.random() * 50) + 30,
        wind_speed: Math.floor(Math.random() * 20) + 5,
        forecast: {},
        created_at: new Date().toISOString(),
      };

      set({ currentWeather: mockWeather });
    } catch (error: any) {
      console.error('Weather fetch error:', error);
      toast.error('Hava durumu alınırken hata oluştu');
    } finally {
      set({ loading: false });
    }
  },

  fetchForecast: async (location: string) => {
    try {
      // Mock 7-day forecast
      const forecast: WeatherData[] = Array.from({ length: 7 }, (_, i) => ({
        id: `forecast-${i}`,
        location,
        temperature: Math.floor(Math.random() * 25) + 10,
        condition: ['Güneşli', 'Bulutlu', 'Yağmurlu'][Math.floor(Math.random() * 3)],
        humidity: Math.floor(Math.random() * 40) + 40,
        wind_speed: Math.floor(Math.random() * 15) + 5,
        forecast: {},
        created_at: new Date(Date.now() + i * 24 * 60 * 60 * 1000).toISOString(),
      }));

      set({ forecast });
    } catch (error: any) {
      console.error('Forecast fetch error:', error);
      toast.error('Hava durumu tahmini alınırken hata oluştu');
    }
  },
}));