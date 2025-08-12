import React, { useState, useEffect } from 'react';
import { Droplets, Play, Pause, Settings, BarChart3, Calendar, Clock, Thermometer, Leaf, Plus, Edit, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../../store/authStore';

interface IrrigationZone {
  id: string;
  name: string;
  cropTypes: string[];
  soilType: string;
  irrigationMethod: 'drip' | 'sprinkler' | 'flood' | 'micro_spray';
  scheduleType: 'manual' | 'timer' | 'smart' | 'sensor_based';
  waterFlowRate: number;
  totalWaterUsed: number;
  efficiencyScore: number;
  lastIrrigation?: string;
  nextIrrigation?: string;
  isActive: boolean;
}

interface IrrigationSchedule {
  id: string;
  zoneId: string;
  startTime: string;
  duration: number;
  frequency: string;
  waterAmount: number;
  isActive: boolean;
}

export default function SmartIrrigation() {
  const [zones, setZones] = useState<IrrigationZone[]>([]);
  const [schedules, setSchedules] = useState<IrrigationSchedule[]>([]);
  const [showCreateZone, setShowCreateZone] = useState(false);
  const [selectedZone, setSelectedZone] = useState<IrrigationZone | null>(null);
  const { user } = useAuthStore();

  useEffect(() => {
    // Mock irrigation zones
    setZones([
      {
        id: '1',
        name: 'Ana Bahçe - Domates Alanı',
        cropTypes: ['Domates', 'Biber'],
        soilType: 'humuslu',
        irrigationMethod: 'drip',
        scheduleType: 'smart',
        waterFlowRate: 2.5,
        totalWaterUsed: 1250,
        efficiencyScore: 94,
        lastIrrigation: '2024-07-15T06:00:00Z',
        nextIrrigation: '2024-07-16T06:00:00Z',
        isActive: true
      },
      {
        id: '2',
        name: 'Sera - Salatalık',
        cropTypes: ['Salatalık', 'Marul'],
        soilType: 'kumlu',
        irrigationMethod: 'micro_spray',
        scheduleType: 'sensor_based',
        waterFlowRate: 1.8,
        totalWaterUsed: 890,
        efficiencyScore: 87,
        lastIrrigation: '2024-07-15T07:30:00Z',
        nextIrrigation: '2024-07-15T19:30:00Z',
        isActive: true
      },
      {
        id: '3',
        name: 'Arka Bahçe - Sebzeler',
        cropTypes: ['Havuç', 'Soğan', 'Fasulye'],
        soilType: 'killi',
        irrigationMethod: 'sprinkler',
        scheduleType: 'timer',
        waterFlowRate: 3.2,
        totalWaterUsed: 2100,
        efficiencyScore: 78,
        lastIrrigation: '2024-07-14T18:00:00Z',
        nextIrrigation: '2024-07-16T18:00:00Z',
        isActive: false
      }
    ]);

    // Mock schedules
    setSchedules([
      {
        id: '1',
        zoneId: '1',
        startTime: '06:00',
        duration: 15,
        frequency: 'daily',
        waterAmount: 25,
        isActive: true
      },
      {
        id: '2',
        zoneId: '2',
        startTime: '07:30',
        duration: 10,
        frequency: 'twice_daily',
        waterAmount: 18,
        isActive: true
      }
    ]);
  }, []);

  const getMethodIcon = (method: string) => {
    switch (method) {
      case 'drip': return '💧';
      case 'sprinkler': return '🌧️';
      case 'flood': return '🌊';
      case 'micro_spray': return '💦';
      default: return '💧';
    }
  };

  const getMethodName = (method: string) => {
    switch (method) {
      case 'drip': return 'Damla Sulama';
      case 'sprinkler': return 'Yağmurlama';
      case 'flood': return 'Sel Sulama';
      case 'micro_spray': return 'Mikro Sprey';
      default: return method;
    }
  };

  const getScheduleTypeName = (type: string) => {
    switch (type) {
      case 'manual': return 'Manuel';
      case 'timer': return 'Zamanlayıcı';
      case 'smart': return 'Akıllı';
      case 'sensor_based': return 'Sensör Bazlı';
      default: return type;
    }
  };

  const getEfficiencyColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  const totalWaterUsed = zones.reduce((sum, zone) => sum + zone.totalWaterUsed, 0);
  const averageEfficiency = zones.reduce((sum, zone) => sum + zone.efficiencyScore, 0) / zones.length;
  const activeZones = zones.filter(zone => zone.isActive).length;

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-green-200/50 p-12">
          <Droplets className="h-16 w-16 text-green-400 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Akıllı Sulama</h2>
          <p className="text-gray-600 mb-6">Sulama sistemlerinizi yönetmek için giriş yapmalısınız.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl p-8 text-white shadow-2xl mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2 flex items-center">
              <Droplets className="h-8 w-8 mr-3" />
              Akıllı Sulama Sistemi
            </h1>
            <p className="text-blue-100">Su tasarrufu ile optimal büyüme</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{totalWaterUsed.toLocaleString()} L</div>
            <div className="text-blue-200 text-sm">Toplam Su Kullanımı</div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          {
            title: 'Aktif Bölge',
            value: activeZones,
            icon: Leaf,
            color: 'from-green-400 to-emerald-500'
          },
          {
            title: 'Ortalama Verimlilik',
            value: `%${Math.round(averageEfficiency)}`,
            icon: BarChart3,
            color: 'from-blue-400 to-indigo-500'
          },
          {
            title: 'Günlük Su Kullanımı',
            value: `${Math.round(totalWaterUsed / 30)} L`,
            icon: Droplets,
            color: 'from-cyan-400 to-blue-500'
          },
          {
            title: 'Su Tasarrufu',
            value: '%40',
            icon: Thermometer,
            color: 'from-purple-400 to-pink-500'
          }
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-gradient-to-r ${stat.color} rounded-2xl p-6 text-white shadow-lg`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm font-medium">{stat.title}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
              <stat.icon className="h-8 w-8 text-white/80" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Irrigation Zones */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-green-200/50 p-8 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Sulama Bölgeleri</h2>
          <button
            onClick={() => setShowCreateZone(true)}
            className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-6 py-3 rounded-2xl hover:from-blue-600 hover:to-cyan-700 transition-all duration-300"
          >
            <Plus className="h-5 w-5" />
            <span>Bölge Ekle</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {zones.map((zone, index) => (
            <motion.div
              key={zone.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gradient-to-br from-white to-gray-50 rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{zone.name}</h3>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <span className="text-2xl">{getMethodIcon(zone.irrigationMethod)}</span>
                    <span>{getMethodName(zone.irrigationMethod)}</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setSelectedZone(zone)}
                    className="p-2 text-blue-600 hover:bg-blue-100 rounded-xl transition-colors"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button className={`p-2 rounded-xl transition-colors ${
                    zone.isActive 
                      ? 'text-green-600 hover:bg-green-100' 
                      : 'text-gray-500 hover:bg-gray-100'
                  }`}>
                    {zone.isActive ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Verimlilik:</span>
                  <span className={`font-bold ${getEfficiencyColor(zone.efficiencyScore)}`}>
                    %{zone.efficiencyScore}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Su Kullanımı:</span>
                  <span className="font-medium text-gray-900">{zone.totalWaterUsed} L</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Akış Hızı:</span>
                  <span className="font-medium text-gray-900">{zone.waterFlowRate} L/dk</span>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <h4 className="font-semibold text-gray-800 text-sm">Ürünler:</h4>
                <div className="flex flex-wrap gap-1">
                  {zone.cropTypes.map((crop, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-green-100 text-green-800 rounded-lg text-xs font-medium"
                    >
                      {crop}
                    </span>
                  ))}
                </div>
              </div>

              {zone.nextIrrigation && (
                <div className="bg-blue-50 rounded-xl p-3 border border-blue-200">
                  <div className="flex items-center space-x-2 text-sm text-blue-700">
                    <Clock className="h-4 w-4" />
                    <span>Sonraki sulama: {new Date(zone.nextIrrigation).toLocaleString('tr-TR')}</span>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {zones.length === 0 && (
          <div className="text-center py-12">
            <Droplets className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Henüz sulama bölgesi yok</h3>
            <p className="text-gray-600">İlk sulama bölgenizi oluşturun!</p>
          </div>
        )}
      </div>

      {/* Water Usage Analytics */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-green-200/50 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Su Kullanım Analizi</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-800">Haftalık Kullanım</h3>
            {[
              { day: 'Pazartesi', usage: 45, efficiency: 92 },
              { day: 'Salı', usage: 38, efficiency: 89 },
              { day: 'Çarşamba', usage: 52, efficiency: 94 },
              { day: 'Perşembe', usage: 41, efficiency: 87 },
              { day: 'Cuma', usage: 47, efficiency: 91 },
              { day: 'Cumartesi', usage: 35, efficiency: 96 },
              { day: 'Pazar', usage: 29, efficiency: 88 }
            ].map((data, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <span className="font-medium text-gray-700">{data.day}</span>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-400 to-cyan-500 h-2 rounded-full"
                        style={{ width: `${(data.usage / 60) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{data.usage}L</span>
                  </div>
                  <span className={`text-sm font-bold ${getEfficiencyColor(data.efficiency)}`}>
                    %{data.efficiency}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-200">
              <h3 className="font-bold text-blue-900 mb-4">Su Tasarrufu İpuçları</h3>
              <ul className="space-y-2">
                {[
                  'Sabah erken saatlerde sulama yapın',
                  'Toprak nemini düzenli kontrol edin',
                  'Mulch kullanarak buharlaşmayı azaltın',
                  'Damla sulama sistemini tercih edin'
                ].map((tip, index) => (
                  <li key={index} className="flex items-center space-x-2 text-sm text-blue-800">
                    <Droplets className="h-4 w-4 text-blue-600 flex-shrink-0" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
              <h3 className="font-bold text-green-900 mb-4">Bu Ay Başarılar</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-green-700 text-sm">Su tasarrufu:</span>
                  <span className="font-bold text-green-900">%40</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-green-700 text-sm">Verim artışı:</span>
                  <span className="font-bold text-green-900">%25</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-green-700 text-sm">Maliyet azalımı:</span>
                  <span className="font-bold text-green-900">%30</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}