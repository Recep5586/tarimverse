import React, { useState } from 'react';
import { TrendingUp, Calendar, Users, BookOpen, Award, Settings, ChevronRight, Sun, Cloud, CloudRain, Wind, Thermometer, Droplets, Leaf, Sprout, TreePine, Flower, BarChart3, Bug } from 'lucide-react';

interface SidebarProps {
  season: string;
}

export default function Sidebar({ season }: SidebarProps) {
  const [activeWeatherTab, setActiveWeatherTab] = useState('today');

  const menuItems = [
    { icon: TrendingUp, label: 'Popüler Konular', count: 12, color: 'text-red-500', gradient: 'from-red-400 to-pink-500' },
    { icon: Users, label: 'Topluluk', count: 8, color: 'text-purple-500', gradient: 'from-purple-400 to-pink-500' },
    { icon: BookOpen, label: 'Öğrenme Merkezi', count: 15, color: 'text-blue-500', gradient: 'from-blue-400 to-indigo-500' },
    { icon: Calendar, label: 'Bahçe Etkinlikleri', count: 3, color: 'text-blue-500', gradient: 'from-blue-400 to-indigo-500' },
    { icon: Award, label: 'Hasat Başarıları', count: 5, color: 'text-yellow-500', gradient: 'from-yellow-400 to-orange-500' },
    { icon: BarChart3, label: 'Analitik', color: 'text-indigo-500', gradient: 'from-indigo-400 to-purple-500' }
  ];

  const trendingTopics = [
    { tag: '#organikbahçe', posts: 1240, icon: Leaf },
    { tag: '#seracılık', posts: 856, icon: Sprout },
    { tag: '#çiftlikdostları', posts: 743, icon: TreePine },
    { tag: '#yerelürün', posts: 621, icon: Flower },
    { tag: '#akıllıtarım', posts: 534, icon: Leaf },
    { tag: '#doğaltakvim', posts: 412, icon: Sprout }
  ];

  const upcomingEvents = [
    { title: 'Organik Bahçe Festivali', date: '15 Aralık', location: 'Ankara', type: 'festival' },
    { title: 'Çiftlik Dostları Buluşması', date: '22 Aralık', location: 'İstanbul', type: 'meetup' },
    { title: 'Akıllı Tarım Zirvesi', date: '5 Ocak', location: 'İzmir', type: 'conference' }
  ];

  const weatherData = {
    today: {
      temp: 22,
      condition: 'Güneşli',
      icon: Sun,
      humidity: 45,
      wind: 12,
      details: 'Bahçe işleri için mükemmel'
    },
    tomorrow: {
      temp: 18,
      condition: 'Bulutlu',
      icon: Cloud,
      humidity: 60,
      wind: 8,
      details: 'Sulama için ideal'
    },
    week: {
      temp: 15,
      condition: 'Yağmurlu',
      icon: CloudRain,
      humidity: 80,
      wind: 15,
      details: 'Doğal sulama zamanı'
    }
  };

  const currentWeather = weatherData[activeWeatherTab as keyof typeof weatherData];
  const WeatherIcon = currentWeather.icon;

  const getSeasonGradient = () => {
    switch (season) {
      case 'spring': return 'from-green-500 via-emerald-500 to-teal-500';
      case 'summer': return 'from-yellow-500 via-orange-500 to-red-500';
      case 'autumn': return 'from-orange-500 via-red-500 to-pink-500';
      case 'winter': return 'from-blue-500 via-indigo-500 to-purple-500';
      default: return 'from-green-500 via-emerald-500 to-teal-500';
    }
  };

  return (
    <div className="w-full lg:w-80 space-y-6 lg:space-y-8 px-4 lg:px-0">
      {/* Navigation Menu */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl lg:rounded-3xl shadow-xl border border-green-200/50 p-4 lg:p-8 relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50/30 to-emerald-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <h2 className="text-lg lg:text-xl font-bold text-gray-900 mb-4 lg:mb-8 flex items-center relative z-10">
          <div className={`w-2 h-8 bg-gradient-to-b ${getSeasonGradient()} rounded-full mr-4 shadow-lg`}></div>
          Bahçe Menüsü
        </h2>
        <nav className="space-y-2 lg:space-y-3 relative z-10">
          {menuItems.map((item, index) => (
            <a
              key={index}
              href="#"
              className="flex items-center justify-between p-3 lg:p-4 rounded-xl lg:rounded-2xl hover:bg-green-100/50 transition-all duration-300 group/item transform hover:scale-105 touch-target"
            >
              <div className="flex items-center space-x-3 lg:space-x-4">
                <div className={`p-1.5 lg:p-2 rounded-lg lg:rounded-xl bg-gradient-to-r ${item.gradient} shadow-lg`}>
                  <item.icon className="h-4 w-4 lg:h-5 lg:w-5 text-white" />
                </div>
                <span className="text-gray-700 font-semibold group-hover/item:text-gray-900 text-sm lg:text-base">{item.label}</span>
              </div>
              <div className="flex items-center space-x-2 lg:space-x-3">
                {item.count && (
                  <span className={`bg-gradient-to-r ${item.gradient} text-white text-xs font-bold px-2 lg:px-3 py-1 lg:py-2 rounded-full shadow-lg`}>
                    {item.count}
                  </span>
                )}
                <ChevronRight className="h-4 w-4 text-gray-400 group-hover/item:text-gray-600 transition-colors" />
              </div>
            </a>
          ))}
        </nav>
      </div>

      {/* Trending Topics */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl lg:rounded-3xl shadow-xl border border-green-200/50 p-4 lg:p-8 relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-red-50/30 to-pink-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <h2 className="text-lg lg:text-xl font-bold text-gray-900 mb-4 lg:mb-8 flex items-center relative z-10">
          <div className="w-2 h-8 bg-gradient-to-b from-red-500 to-pink-600 rounded-full mr-4 shadow-lg"></div>
          Trend Konular
        </h2>
        <div className="space-y-3 lg:space-y-4 relative z-10">
          {trendingTopics.map((topic, index) => {
            const TopicIcon = topic.icon;
            return (
              <a
                key={index}
                href="#"
                className="block group/topic"
              >
                <div className="flex items-center justify-between p-3 lg:p-4 rounded-xl lg:rounded-2xl hover:bg-red-100/50 transition-all duration-300 transform hover:scale-105 touch-target">
                  <div className="flex items-center space-x-3 lg:space-x-4">
                    <div className="p-1.5 lg:p-2 rounded-lg lg:rounded-xl bg-gradient-to-r from-red-400 to-pink-500 shadow-lg">
                      <TopicIcon className="h-3 w-3 lg:h-4 lg:w-4 text-white" />
                    </div>
                    <div>
                      <span className="text-green-600 hover:text-green-700 font-bold text-xs lg:text-sm group-hover/topic:underline">
                        {topic.tag}
                      </span>
                      <p className="text-xs text-gray-500 mt-1 font-medium">{topic.posts} paylaşım</p>
                    </div>
                  </div>
                  <TrendingUp className="h-4 w-4 lg:h-5 lg:w-5 text-red-500 group-hover/topic:scale-110 transition-transform" />
                </div>
              </a>
            );
          })}
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl lg:rounded-3xl shadow-xl border border-green-200/50 p-4 lg:p-8 relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-indigo-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <h2 className="text-lg lg:text-xl font-bold text-gray-900 mb-4 lg:mb-8 flex items-center relative z-10">
          <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full mr-4 shadow-lg"></div>
          Yaklaşan Etkinlikler
        </h2>
        <div className="space-y-3 lg:space-y-5 relative z-10">
          {upcomingEvents.map((event, index) => (
            <div key={index} className="p-4 lg:p-5 bg-gradient-to-r from-blue-100/50 to-indigo-100/50 rounded-xl lg:rounded-2xl border border-blue-200/50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <h3 className="font-bold text-blue-900 text-xs lg:text-sm mb-2 lg:mb-3">{event.title}</h3>
              <div className="flex items-center justify-between text-xs text-blue-700">
                <span className="flex items-center font-medium">
                  <Calendar className="h-3 w-3 lg:h-4 lg:w-4 mr-1 lg:mr-2" />
                  {event.date}
                </span>
                <span className="font-medium">{event.location}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Weather Widget */}
      <div className={`bg-gradient-to-br ${getSeasonGradient()} rounded-2xl lg:rounded-3xl p-4 lg:p-8 text-white shadow-2xl relative overflow-hidden`}>
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
        <h3 className="text-lg lg:text-xl font-bold mb-4 lg:mb-6 flex items-center relative z-10">
          <Thermometer className="h-5 w-5 lg:h-6 lg:w-6 mr-2 lg:mr-3" />
          Doğa Takvimi
        </h3>
        
        {/* Weather Tabs */}
        <div className="flex space-x-1 lg:space-x-2 mb-4 lg:mb-6 relative z-10">
          {[
            { key: 'today', label: 'Bugün' },
            { key: 'tomorrow', label: 'Yarın' },
            { key: 'week', label: 'Hafta' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveWeatherTab(tab.key)}
              className={`px-3 lg:px-4 py-2 rounded-xl lg:rounded-2xl text-xs lg:text-sm font-bold transition-all duration-300 touch-target ${
                activeWeatherTab === tab.key
                  ? 'bg-white text-gray-700 shadow-lg'
                  : 'bg-white/20 hover:bg-white/30'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between mb-4 lg:mb-6 relative z-10">
          <div>
            <p className="text-2xl lg:text-4xl font-bold">{currentWeather.temp}°C</p>
            <p className="text-white/80 text-xs lg:text-sm font-medium">Ankara</p>
          </div>
          <div className="text-right">
            <WeatherIcon className="h-12 w-12 lg:h-16 lg:w-16 mb-2 lg:mb-3 mx-auto drop-shadow-lg" />
            <p className="text-xs lg:text-sm font-bold">{currentWeather.condition}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 lg:gap-4 mb-4 lg:mb-6 relative z-10">
          <div className="bg-white/20 backdrop-blur-sm rounded-xl lg:rounded-2xl p-3 lg:p-4 shadow-lg">
            <div className="flex items-center space-x-1 lg:space-x-2 mb-1 lg:mb-2">
              <Droplets className="h-4 w-4 lg:h-5 lg:w-5" />
              <span className="text-xs lg:text-sm font-medium">Nem</span>
            </div>
            <p className="text-lg lg:text-2xl font-bold">{currentWeather.humidity}%</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl lg:rounded-2xl p-3 lg:p-4 shadow-lg">
            <div className="flex items-center space-x-1 lg:space-x-2 mb-1 lg:mb-2">
              <Wind className="h-4 w-4 lg:h-5 lg:w-5" />
              <span className="text-xs lg:text-sm font-medium">Rüzgar</span>
            </div>
            <p className="text-lg lg:text-2xl font-bold">{currentWeather.wind} km/h</p>
          </div>
        </div>

        <div className="pt-4 lg:pt-6 border-t border-white/30 relative z-10">
          <p className="text-xs lg:text-sm text-white/90 flex items-center font-medium">
            <Sun className="h-3 w-3 lg:h-4 lg:w-4 mr-1 lg:mr-2" />
            {currentWeather.details}
          </p>
        </div>
      </div>

      {/* Platform Stats */}
      <div className={`bg-gradient-to-br ${getSeasonGradient()} rounded-2xl lg:rounded-3xl p-4 lg:p-8 text-white shadow-2xl relative overflow-hidden`}>
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
        <h3 className="text-lg lg:text-xl font-bold mb-4 lg:mb-6 relative z-10">TarımVerse İstatistikleri</h3>
        <div className="space-y-3 lg:space-y-4 relative z-10">
          <div className="flex justify-between items-center">
            <span className="text-white/90 text-xs lg:text-sm font-medium">Aktif Çiftçiler</span>
            <span className="font-bold text-base lg:text-lg">12,450</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-white/90 text-xs lg:text-sm font-medium">Günlük Paylaşım</span>
            <span className="font-bold text-base lg:text-lg">1,234</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-white/90 text-xs lg:text-sm font-medium">Çözülen Sorular</span>
            <span className="font-bold text-base lg:text-lg">8,765</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-white/90 text-xs lg:text-sm font-medium">Yeşil Başarılar</span>
            <span className="font-bold text-base lg:text-lg">3,421</span>
          </div>
        </div>
      </div>
    </div>
  );
}