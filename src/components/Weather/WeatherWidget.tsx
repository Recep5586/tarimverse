import React, { useEffect } from 'react';
import { Sun, Cloud, CloudRain, Wind, Droplets, Thermometer, Calendar } from 'lucide-react';
import { useWeatherStore } from '../../store/weatherStore';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';

interface WeatherWidgetProps {
  location?: string;
  compact?: boolean;
}

export default function WeatherWidget({ location = 'Ankara', compact = false }: WeatherWidgetProps) {
  const { currentWeather, forecast, loading, fetchWeather, fetchForecast } = useWeatherStore();

  useEffect(() => {
    fetchWeather(location);
    if (!compact) {
      fetchForecast(location);
    }
  }, [location]);

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'güneşli':
        return Sun;
      case 'bulutlu':
        return Cloud;
      case 'yağmurlu':
        return CloudRain;
      default:
        return Sun;
    }
  };

  const getWeatherGradient = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'güneşli':
        return 'from-yellow-400 to-orange-500';
      case 'bulutlu':
        return 'from-gray-400 to-blue-500';
      case 'yağmurlu':
        return 'from-blue-500 to-indigo-600';
      default:
        return 'from-green-400 to-emerald-500';
    }
  };

  if (loading || !currentWeather) {
    return (
      <div className={`bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-green-200/50 p-6 animate-pulse ${
        compact ? 'h-32' : 'h-64'
      }`}>
        <div className="bg-gray-300 h-4 rounded mb-4"></div>
        <div className="bg-gray-300 h-8 rounded mb-2"></div>
        <div className="bg-gray-300 h-4 rounded w-2/3"></div>
      </div>
    );
  }

  const WeatherIcon = getWeatherIcon(currentWeather.condition);

  if (compact) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`bg-gradient-to-br ${getWeatherGradient(currentWeather.condition)} rounded-2xl p-4 text-white shadow-lg`}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold">{currentWeather.temperature}°C</p>
            <p className="text-white/80 text-sm">{currentWeather.location}</p>
          </div>
          <div className="text-right">
            <WeatherIcon className="h-8 w-8 mb-1" />
            <p className="text-xs font-medium">{currentWeather.condition}</p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Current Weather */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`bg-gradient-to-br ${getWeatherGradient(currentWeather.condition)} rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden`}
      >
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold mb-2 flex items-center">
                <Thermometer className="h-6 w-6 mr-2" />
                Hava Durumu
              </h3>
              <p className="text-white/80">{currentWeather.location}</p>
            </div>
            <WeatherIcon className="h-16 w-16 drop-shadow-lg" />
          </div>

          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <p className="text-4xl font-bold mb-2">{currentWeather.temperature}°C</p>
              <p className="text-white/90 font-medium">{currentWeather.condition}</p>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Droplets className="h-5 w-5" />
                <span className="text-sm">Nem: {currentWeather.humidity}%</span>
              </div>
              <div className="flex items-center space-x-2">
                <Wind className="h-5 w-5" />
                <span className="text-sm">Rüzgar: {currentWeather.wind_speed} km/h</span>
              </div>
            </div>
          </div>

          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
            <p className="text-sm text-white/90 flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              Tarım için {currentWeather.temperature > 20 ? 'ideal' : currentWeather.temperature > 10 ? 'uygun' : 'soğuk'} hava
            </p>
          </div>
        </div>
      </motion.div>

      {/* 7-Day Forecast */}
      {forecast.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-green-200/50 p-6"
        >
          <h4 className="text-lg font-bold text-gray-900 mb-4">7 Günlük Tahmin</h4>
          <div className="space-y-3">
            {forecast.slice(0, 7).map((day, index) => {
              const DayIcon = getWeatherIcon(day.condition);
              return (
                <div key={day.id} className="flex items-center justify-between p-3 rounded-2xl hover:bg-green-100/50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <DayIcon className="h-6 w-6 text-green-600" />
                    <div>
                      <p className="font-semibold text-gray-900">
                        {index === 0 ? 'Bugün' : format(new Date(day.created_at), 'EEEE', { locale: tr })}
                      </p>
                      <p className="text-sm text-gray-600">{day.condition}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">{day.temperature}°C</p>
                    <p className="text-xs text-gray-500">%{day.humidity}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}
    </div>
  );
}