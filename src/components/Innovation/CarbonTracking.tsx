import React, { useState, useEffect } from 'react';
import { Globe, Leaf, TrendingDown, TrendingUp, Award, Target, BarChart3, Calendar, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../../store/authStore';

interface CarbonActivity {
  id: string;
  activity_type: 'planting' | 'fertilizing' | 'irrigation' | 'harvesting' | 'transportation' | 'composting';
  carbon_impact: number; // positive for sequestration, negative for emissions
  calculation_method: string;
  activity_details: any;
  verification_status: 'pending' | 'verified' | 'disputed';
  activity_date: string;
  created_at: string;
}

export default function CarbonTracking() {
  const [activities, setActivities] = useState<CarbonActivity[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [showAddModal, setShowAddModal] = useState(false);
  const { user } = useAuthStore();

  useEffect(() => {
    // Mock carbon tracking data
    setActivities([
      {
        id: '1',
        activity_type: 'planting',
        carbon_impact: 2.5, // 2.5 kg CO2 sequestered
        calculation_method: 'Tree planting carbon calculator',
        activity_details: {
          trees_planted: 10,
          tree_type: 'Meşe',
          area: '100 m²'
        },
        verification_status: 'verified',
        activity_date: '2024-06-15',
        created_at: '2024-06-15T10:00:00Z'
      },
      {
        id: '2',
        activity_type: 'composting',
        carbon_impact: 1.8,
        calculation_method: 'Organic waste composting',
        activity_details: {
          waste_amount: '50 kg',
          compost_type: 'Organik atık',
          duration: '3 ay'
        },
        verification_status: 'verified',
        activity_date: '2024-06-10',
        created_at: '2024-06-10T14:30:00Z'
      },
      {
        id: '3',
        activity_type: 'transportation',
        carbon_impact: -0.8, // 0.8 kg CO2 emitted
        calculation_method: 'Vehicle emissions calculator',
        activity_details: {
          distance: '50 km',
          vehicle_type: 'Traktör',
          fuel_consumption: '5 L'
        },
        verification_status: 'verified',
        activity_date: '2024-06-08',
        created_at: '2024-06-08T09:15:00Z'
      }
    ]);
  }, []);

  const totalCarbonImpact = activities.reduce((sum, activity) => sum + activity.carbon_impact, 0);
  const carbonSequestered = activities
    .filter(activity => activity.carbon_impact > 0)
    .reduce((sum, activity) => sum + activity.carbon_impact, 0);
  const carbonEmitted = Math.abs(activities
    .filter(activity => activity.carbon_impact < 0)
    .reduce((sum, activity) => sum + activity.carbon_impact, 0));

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'planting': return '🌱';
      case 'fertilizing': return '🌿';
      case 'irrigation': return '💧';
      case 'harvesting': return '🌾';
      case 'transportation': return '🚜';
      case 'composting': return '♻️';
      default: return '📊';
    }
  };

  const getActivityTitle = (type: string) => {
    switch (type) {
      case 'planting': return 'Ekim/Dikim';
      case 'fertilizing': return 'Gübreleme';
      case 'irrigation': return 'Sulama';
      case 'harvesting': return 'Hasat';
      case 'transportation': return 'Ulaşım';
      case 'composting': return 'Kompost';
      default: return 'Aktivite';
    }
  };

  const getImpactColor = (impact: number) => {
    return impact > 0 ? 'text-green-600' : 'text-red-600';
  };

  const getImpactIcon = (impact: number) => {
    return impact > 0 ? TrendingDown : TrendingUp;
  };

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-green-200/50 p-12">
          <Globe className="h-16 w-16 text-green-400 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Karbon İzleme</h2>
          <p className="text-gray-600 mb-6">Karbon ayak izinizi takip etmek için giriş yapmalısınız.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl p-8 text-white shadow-2xl mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2 flex items-center">
              <Globe className="h-8 w-8 mr-3" />
              Karbon İzleme
            </h1>
            <p className="text-green-100">Çevre dostu tarım için karbon ayak izinizi takip edin</p>
          </div>
          <div className="text-right">
            <div className={`text-2xl font-bold ${totalCarbonImpact >= 0 ? 'text-green-200' : 'text-red-200'}`}>
              {totalCarbonImpact >= 0 ? '+' : ''}{totalCarbonImpact.toFixed(1)} kg CO₂
            </div>
            <div className="text-green-200 text-sm">Net Karbon Etkisi</div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl p-6 text-white shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">Karbon Tutma</p>
              <p className="text-2xl font-bold">+{carbonSequestered.toFixed(1)} kg</p>
            </div>
            <TrendingDown className="h-8 w-8 text-green-200" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-r from-red-400 to-pink-500 rounded-2xl p-6 text-white shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-100 text-sm font-medium">Karbon Salımı</p>
              <p className="text-2xl font-bold">-{carbonEmitted.toFixed(1)} kg</p>
            </div>
            <TrendingUp className="h-8 w-8 text-red-200" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-blue-400 to-indigo-500 rounded-2xl p-6 text-white shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Karbon Kredisi</p>
              <p className="text-2xl font-bold">{Math.max(0, totalCarbonImpact * 10).toFixed(0)} Puan</p>
            </div>
            <Award className="h-8 w-8 text-blue-200" />
          </div>
        </motion.div>
      </div>

      {/* Carbon Goals */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-green-200/50 p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <Target className="h-6 w-6 mr-3 text-green-600" />
          Karbon Hedefleri
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
            <h3 className="font-bold text-green-800 mb-4">2024 Yılı Hedefi</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-green-700">Karbon Nötr Olma</span>
                  <span className="text-green-600 font-medium">75%</span>
                </div>
                <div className="w-full bg-green-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-green-700">10 kg CO₂ Tutma</span>
                  <span className="text-green-600 font-medium">{Math.min(100, (carbonSequestered / 10) * 100).toFixed(0)}%</span>
                </div>
                <div className="w-full bg-green-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: `${Math.min(100, (carbonSequestered / 10) * 100)}%` }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
            <h3 className="font-bold text-blue-800 mb-4">Önerilen Aksiyonlar</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-sm text-blue-700">
                <Leaf className="h-4 w-4 mr-2 text-blue-600" />
                Daha fazla ağaç dikin
              </li>
              <li className="flex items-center text-sm text-blue-700">
                <Leaf className="h-4 w-4 mr-2 text-blue-600" />
                Kompost üretimini artırın
              </li>
              <li className="flex items-center text-sm text-blue-700">
                <Leaf className="h-4 w-4 mr-2 text-blue-600" />
                Yakıt tüketimini azaltın
              </li>
              <li className="flex items-center text-sm text-blue-700">
                <Leaf className="h-4 w-4 mr-2 text-blue-600" />
                Yenilenebilir enerji kullanın
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Activities List */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-green-200/50 p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Karbon Aktiviteleri</h2>
          <div className="flex space-x-3">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-4 py-2 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="week">Bu Hafta</option>
              <option value="month">Bu Ay</option>
              <option value="year">Bu Yıl</option>
            </select>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-2 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300"
            >
              <Plus className="h-5 w-5" />
              <span>Aktivite Ekle</span>
            </button>
          </div>
        </div>

        {activities.length === 0 ? (
          <div className="text-center py-12">
            <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Henüz aktivite yok</h3>
            <p className="text-gray-600">İlk karbon aktivitenizi kaydedin!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {activities.map((activity, index) => {
              const ImpactIcon = getImpactIcon(activity.carbon_impact);
              return (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center space-x-4">
                    <div className="text-3xl">{getActivityIcon(activity.activity_type)}</div>
                    <div>
                      <h3 className="font-bold text-gray-900">{getActivityTitle(activity.activity_type)}</h3>
                      <p className="text-sm text-gray-600">{activity.calculation_method}</p>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                        <span>{new Date(activity.activity_date).toLocaleDateString('tr-TR')}</span>
                        <span className={`px-2 py-1 rounded-full ${
                          activity.verification_status === 'verified' ? 'bg-green-100 text-green-800' :
                          activity.verification_status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {activity.verification_status === 'verified' ? 'Doğrulandı' :
                           activity.verification_status === 'pending' ? 'Beklemede' : 'Tartışmalı'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <div className={`text-lg font-bold ${getImpactColor(activity.carbon_impact)}`}>
                        {activity.carbon_impact > 0 ? '+' : ''}{activity.carbon_impact.toFixed(1)} kg CO₂
                      </div>
                      <div className="text-xs text-gray-500">
                        {activity.carbon_impact > 0 ? 'Tutuldu' : 'Salındı'}
                      </div>
                    </div>
                    <ImpactIcon className={`h-6 w-6 ${getImpactColor(activity.carbon_impact)}`} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}