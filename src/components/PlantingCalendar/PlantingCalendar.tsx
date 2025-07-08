import React, { useState, useEffect } from 'react';
import { Calendar, Plus, Search, Filter, Leaf, Clock, MapPin, Thermometer, Droplets, Sun } from 'lucide-react';
import { usePlantingStore } from '../../store/plantingStore';
import { useAuthStore } from '../../store/authStore';
import { motion } from 'framer-motion';
import { format, addDays } from 'date-fns';
import { tr } from 'date-fns/locale';

export default function PlantingCalendar() {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedRegion, setSelectedRegion] = useState('Akdeniz');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const { 
    crops, 
    plantingCalendar, 
    loading, 
    fetchCrops, 
    fetchPlantingCalendar, 
    getPlantingRecommendations 
  } = usePlantingStore();
  
  const { user } = useAuthStore();

  useEffect(() => {
    fetchCrops();
    fetchPlantingCalendar();
  }, []);

  const months = [
    'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
    'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
  ];

  const regions = ['Akdeniz', 'Ege', 'Marmara', 'Karadeniz', 'İç Anadolu', 'Doğu Anadolu', 'Güneydoğu Anadolu'];

  const currentRecommendations = getPlantingRecommendations(selectedRegion, selectedMonth);
  
  const filteredCrops = crops.filter(crop =>
    crop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    crop.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getSeasonColor = (season: string) => {
    switch (season) {
      case 'spring': return 'from-green-400 to-emerald-500';
      case 'summer': return 'from-yellow-400 to-orange-500';
      case 'autumn': return 'from-orange-400 to-red-500';
      case 'winter': return 'from-blue-400 to-indigo-500';
      default: return 'from-green-400 to-emerald-500';
    }
  };

  const getWaterNeedsColor = (needs: string) => {
    switch (needs) {
      case 'az': return 'text-yellow-600 bg-yellow-100';
      case 'orta': return 'text-blue-600 bg-blue-100';
      case 'çok': return 'text-indigo-600 bg-indigo-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getSunRequirementsIcon = (requirements: string) => {
    switch (requirements) {
      case 'güneş': return <Sun className="h-4 w-4 text-yellow-500" />;
      case 'yarı-gölge': return <Sun className="h-4 w-4 text-orange-500" />;
      case 'gölge': return <Sun className="h-4 w-4 text-gray-500" />;
      default: return <Sun className="h-4 w-4 text-yellow-500" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-green-200/50 p-8 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent flex items-center">
              <Calendar className="h-8 w-8 mr-3 text-green-600" />
              Ekim Takvimi
            </h1>
            <p className="text-green-600 mt-2">Bölgenize uygun ekim zamanlarını keşfedin</p>
          </div>
          
          {user && (
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-2xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Plus className="h-5 w-5" />
              <span className="font-semibold">Bahçe Planla</span>
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Ürün ara..."
              className="w-full pl-12 pr-4 py-3 bg-white/70 border-2 border-green-200/50 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-500/20 focus:border-green-400 transition-all duration-300"
            />
          </div>

          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(Number(e.target.value))}
            className="px-4 py-3 bg-white/70 border-2 border-green-200/50 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-500/20 focus:border-green-400 transition-all duration-300"
          >
            {months.map((month, index) => (
              <option key={index} value={index + 1}>{month}</option>
            ))}
          </select>

          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="px-4 py-3 bg-white/70 border-2 border-green-200/50 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-500/20 focus:border-green-400 transition-all duration-300"
          >
            {regions.map(region => (
              <option key={region} value={region}>{region}</option>
            ))}
          </select>

          <div className="flex items-center space-x-2 px-4 py-3 bg-green-100/50 rounded-2xl">
            <MapPin className="h-5 w-5 text-green-600" />
            <span className="text-green-700 font-medium">{selectedRegion}</span>
          </div>
        </div>
      </div>

      {/* Current Month Recommendations */}
      {currentRecommendations.length > 0 && (
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl p-8 text-white shadow-2xl mb-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <Leaf className="h-6 w-6 mr-3" />
            {months[selectedMonth - 1]} Ayı Ekim Önerileri
          </h2>
          <p className="text-green-100 mb-6">{selectedRegion} bölgesi için bu ay ekilebilecek ürünler</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentRecommendations.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/20 backdrop-blur-sm rounded-2xl p-4"
              >
                <h3 className="font-bold text-lg mb-2">{item.crop?.name}</h3>
                <div className="flex items-center space-x-2 text-sm text-green-100 mb-2">
                  <Clock className="h-4 w-4" />
                  <span>Hasat: {months[item.harvest_month - 1]}</span>
                </div>
                {item.notes && (
                  <p className="text-sm text-green-100">{item.notes}</p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Crops Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="bg-white/80 rounded-3xl p-6 animate-pulse">
              <div className="bg-gray-300 h-48 rounded-2xl mb-4"></div>
              <div className="bg-gray-300 h-4 rounded mb-2"></div>
              <div className="bg-gray-300 h-4 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCrops.map((crop, index) => (
            <motion.div
              key={crop.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-green-200/50 overflow-hidden group hover:shadow-2xl transition-all duration-500"
            >
              {crop.image_url && (
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={crop.image_url}
                    alt={crop.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-green-500 text-white rounded-full text-xs font-bold">
                      {crop.category}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    {getSunRequirementsIcon(crop.sun_requirements)}
                  </div>
                </div>
              )}

              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                      {crop.name}
                    </h3>
                    {crop.scientific_name && (
                      <p className="text-sm text-gray-500 italic">{crop.scientific_name}</p>
                    )}
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium text-green-600">{crop.growing_days} gün</span>
                  </div>
                </div>

                {crop.description && (
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {crop.description}
                  </p>
                )}

                <div className="space-y-3 mb-4">
                  {/* Planting Seasons */}
                  <div className="flex items-center space-x-2">
                    <Leaf className="h-4 w-4 text-green-600" />
                    <div className="flex space-x-1">
                      {crop.planting_season.map(season => (
                        <span
                          key={season}
                          className={`px-2 py-1 rounded-lg text-xs font-medium text-white bg-gradient-to-r ${getSeasonColor(season)}`}
                        >
                          {season === 'spring' ? 'İlkbahar' :
                           season === 'summer' ? 'Yaz' :
                           season === 'autumn' ? 'Sonbahar' : 'Kış'}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Water Needs */}
                  <div className="flex items-center space-x-2">
                    <Droplets className="h-4 w-4 text-blue-600" />
                    <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getWaterNeedsColor(crop.water_needs)}`}>
                      {crop.water_needs === 'az' ? 'Az Su' :
                       crop.water_needs === 'orta' ? 'Orta Su' : 'Çok Su'}
                    </span>
                  </div>

                  {/* Temperature Range */}
                  {crop.temperature_min && crop.temperature_max && (
                    <div className="flex items-center space-x-2">
                      <Thermometer className="h-4 w-4 text-red-600" />
                      <span className="text-sm text-gray-600">
                        {crop.temperature_min}°C - {crop.temperature_max}°C
                      </span>
                    </div>
                  )}
                </div>

                {crop.tips && (
                  <div className="bg-green-50 rounded-2xl p-3 border border-green-200">
                    <p className="text-sm text-green-700">
                      <strong>İpucu:</strong> {crop.tips}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {filteredCrops.length === 0 && !loading && (
        <div className="text-center py-12">
          <div className="text-green-400 mb-4">
            <Search className="h-16 w-16 mx-auto" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Ürün bulunamadı</h3>
          <p className="text-gray-600">Arama kriterlerinizi değiştirmeyi deneyin</p>
        </div>
      )}
    </div>
  );
}