import React, { useState, useEffect } from 'react';
import { Search, Filter, MapPin, TrendingUp, Plus, Heart, MessageCircle, Star } from 'lucide-react';
import { useMarketStore } from '../../store/marketStore';
import { useAuthStore } from '../../store/authStore';
import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import { tr } from 'date-fns/locale';

export default function MarketPlace() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const { items, loading, categories, fetchItems } = useMarketStore();
  const { user } = useAuthStore();

  useEffect(() => {
    fetchItems();
  }, []);

  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || item.category === selectedCategory;
    const matchesLocation = !selectedLocation || item.location.toLowerCase().includes(selectedLocation.toLowerCase());
    
    return matchesSearch && matchesCategory && matchesLocation;
  });

  return (
    <div className="max-w-7xl mx-auto px-0 lg:px-4 xl:px-6 2xl:px-8 py-4 lg:py-8">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl lg:rounded-3xl shadow-xl border border-green-200/50 p-4 lg:p-8 mb-6 lg:mb-8 mx-4 lg:mx-0">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Yerel Pazar
            </h1>
            <p className="text-green-600 mt-1 lg:mt-2 text-sm lg:text-base">Çiftçiden tüketiciye doğrudan alışveriş</p>
          </div>
          
          {user && (
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center space-x-1 lg:space-x-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 lg:px-6 py-2 lg:py-3 rounded-xl lg:rounded-2xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 mobile-button"
            >
              <Plus className="h-4 w-4 lg:h-5 lg:w-5" />
              <span className="font-semibold text-sm lg:text-base">Ürün Ekle</span>
            </button>
          )}
        </div>

        {/* Search and Filters */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 lg:gap-4">
          <div className="relative">
            <Search className="absolute left-3 lg:left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 lg:h-5 lg:w-5 text-green-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Ürün ara..."
              className="w-full pl-10 lg:pl-12 pr-3 lg:pr-4 py-3 bg-white/70 border-2 border-green-200/50 rounded-xl lg:rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-500/20 focus:border-green-400 transition-all duration-300 mobile-input"
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 lg:px-4 py-3 bg-white/70 border-2 border-green-200/50 rounded-xl lg:rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-500/20 focus:border-green-400 transition-all duration-300 mobile-input"
          >
            <option value="">Tüm Kategoriler</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          <div className="relative">
            <MapPin className="absolute left-3 lg:left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 lg:h-5 lg:w-5 text-green-500" />
            <input
              type="text"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              placeholder="Konum filtrele..."
              className="w-full pl-10 lg:pl-12 pr-3 lg:pr-4 py-3 bg-white/70 border-2 border-green-200/50 rounded-xl lg:rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-500/20 focus:border-green-400 transition-all duration-300 mobile-input"
            />
          </div>
        </div>
      </div>

      {/* Market Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6 mb-6 lg:mb-8 px-4 lg:px-0">
        {[
          { label: 'Aktif Ürün', value: items.length, icon: TrendingUp, color: 'from-green-400 to-emerald-500' },
          { label: 'Satıcı', value: new Set(items.map(item => item.user_id)).size, icon: Star, color: 'from-blue-400 to-indigo-500' },
          { label: 'Kategori', value: categories.length, icon: Filter, color: 'from-purple-400 to-pink-500' },
          { label: 'Şehir', value: new Set(items.map(item => item.location)).size, icon: MapPin, color: 'from-orange-400 to-red-500' }
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-gradient-to-r ${stat.color} rounded-xl lg:rounded-2xl p-4 lg:p-6 text-white shadow-lg`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-xs lg:text-sm font-medium">{stat.label}</p>
                <p className="text-lg lg:text-2xl font-bold">{stat.value}</p>
              </div>
              <stat.icon className="h-6 w-6 lg:h-8 lg:w-8 text-white/80" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6 px-4 lg:px-0">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="bg-white/80 rounded-2xl lg:rounded-3xl p-4 lg:p-6 animate-pulse">
              <div className="bg-gray-300 h-40 lg:h-48 rounded-xl lg:rounded-2xl mb-4"></div>
              <div className="bg-gray-300 h-4 rounded mb-2"></div>
              <div className="bg-gray-300 h-4 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6 px-4 lg:px-0">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl lg:rounded-3xl shadow-xl border border-green-200/50 overflow-hidden group hover:shadow-2xl transition-all duration-500"
            >
              {item.images && item.images.length > 0 && (
                <div className="relative h-40 lg:h-48 overflow-hidden">
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className={`px-2 lg:px-3 py-1 rounded-full text-xs font-bold text-white ${
                      item.category === 'Sebze' ? 'bg-green-500' :
                      item.category === 'Meyve' ? 'bg-red-500' :
                      item.category === 'Tahıl' ? 'bg-yellow-500' :
                      'bg-blue-500'
                    }`}>
                      {item.category}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <button className="p-1.5 lg:p-2 bg-white/90 rounded-full hover:bg-white transition-colors touch-target">
                      <Heart className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>
                </div>
              )}

              <div className="p-4 lg:p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg lg:text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors line-clamp-2 flex-1">
                    {item.title}
                  </h3>
                  <span className="text-lg lg:text-2xl font-bold text-green-600 ml-2">
                    ₺{item.price}
                  </span>
                </div>

                <p className="text-gray-600 text-xs lg:text-sm mb-3 lg:mb-4 line-clamp-2">
                  {item.description}
                </p>

                <div className="flex items-center justify-between mb-3 lg:mb-4">
                  <div className="flex items-center space-x-1 lg:space-x-2 text-xs lg:text-sm text-gray-500">
                    <MapPin className="h-3 w-3 lg:h-4 lg:w-4" />
                    <span>{item.location}</span>
                  </div>
                  <span className="text-xs text-gray-500">
                    {formatDistanceToNow(new Date(item.created_at), { addSuffix: true, locale: tr })}
                  </span>
                </div>

                {item.user && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 lg:space-x-3">
                      <img
                        src={item.user.avatar_url || 'https://images.pexels.com/photos/1139743/pexels-photo-1139743.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'}
                        alt={item.user.name}
                        className="h-6 w-6 lg:h-8 lg:w-8 rounded-full border-2 border-green-300"
                      />
                      <span className="text-xs lg:text-sm font-semibold text-gray-700">
                        {item.user.name}
                      </span>
                    </div>
                    <button className="flex items-center space-x-1 text-green-600 hover:text-green-700 transition-colors touch-target">
                      <MessageCircle className="h-3 w-3 lg:h-4 lg:w-4" />
                      <span className="text-xs lg:text-sm font-medium">İletişim</span>
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {filteredItems.length === 0 && !loading && (
        <div className="text-center py-8 lg:py-12 px-4">
          <div className="text-green-400 mb-4">
            <Search className="h-12 w-12 lg:h-16 lg:w-16 mx-auto" />
          </div>
          <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-2">Ürün bulunamadı</h3>
          <p className="text-gray-600 text-sm lg:text-base">Arama kriterlerinizi değiştirmeyi deneyin</p>
        </div>
      )}
    </div>
  );
}