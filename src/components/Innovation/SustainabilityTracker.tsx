import React, { useState, useEffect } from 'react';
import { Leaf, Recycle, Droplets, Zap, Award, TrendingUp, Target, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../../store/authStore';

interface SustainabilityMetric {
  id: string;
  category: 'water' | 'energy' | 'waste' | 'carbon' | 'biodiversity';
  title: string;
  currentValue: number;
  targetValue: number;
  unit: string;
  trend: 'improving' | 'declining' | 'stable';
  lastUpdated: string;
}

interface SustainabilityGoal {
  id: string;
  title: string;
  description: string;
  category: string;
  targetDate: string;
  progress: number;
  maxProgress: number;
  reward: string;
  completed: boolean;
}

export default function SustainabilityTracker() {
  const [metrics, setMetrics] = useState<SustainabilityMetric[]>([]);
  const [goals, setGoals] = useState<SustainabilityGoal[]>([]);
  const [sustainabilityScore, setSustainabilityScore] = useState(0);
  const { user } = useAuthStore();

  useEffect(() => {
    // Mock sustainability metrics
    setMetrics([
      {
        id: '1',
        category: 'water',
        title: 'Su Tasarrufu',
        currentValue: 40,
        targetValue: 50,
        unit: '%',
        trend: 'improving',
        lastUpdated: '2024-07-15T10:00:00Z'
      },
      {
        id: '2',
        category: 'carbon',
        title: 'Karbon Azaltımı',
        currentValue: 2.5,
        targetValue: 5.0,
        unit: 'ton CO₂',
        trend: 'improving',
        lastUpdated: '2024-07-15T10:00:00Z'
      },
      {
        id: '3',
        category: 'waste',
        title: 'Atık Azaltımı',
        currentValue: 75,
        targetValue: 90,
        unit: '%',
        trend: 'stable',
        lastUpdated: '2024-07-15T10:00:00Z'
      },
      {
        id: '4',
        category: 'energy',
        title: 'Yenilenebilir Enerji',
        currentValue: 30,
        targetValue: 60,
        unit: '%',
        trend: 'improving',
        lastUpdated: '2024-07-15T10:00:00Z'
      },
      {
        id: '5',
        category: 'biodiversity',
        title: 'Biyoçeşitlilik İndeksi',
        currentValue: 8.2,
        targetValue: 10.0,
        unit: 'puan',
        trend: 'improving',
        lastUpdated: '2024-07-15T10:00:00Z'
      }
    ]);

    // Mock sustainability goals
    setGoals([
      {
        id: '1',
        title: 'Su Tasarrufu Hedefi',
        description: 'Su kullanımını %50 azaltın',
        category: 'Su Yönetimi',
        targetDate: '2024-12-31',
        progress: 40,
        maxProgress: 50,
        reward: 'Su Koruyucusu Rozeti',
        completed: false
      },
      {
        id: '2',
        title: 'Sıfır Atık Bahçe',
        description: 'Bahçe atıklarının %100\'ünü geri dönüştürün',
        category: 'Atık Yönetimi',
        targetDate: '2024-10-31',
        progress: 75,
        maxProgress: 100,
        reward: 'Çevre Dostu Sertifikası',
        completed: false
      },
      {
        id: '3',
        title: 'Organik Dönüşüm',
        description: 'Bahçenizi tamamen organik hale getirin',
        category: 'Organik Tarım',
        targetDate: '2025-06-30',
        progress: 100,
        maxProgress: 100,
        reward: 'Organik Uzman Rozeti',
        completed: true
      }
    ]);

    // Calculate sustainability score
    const totalScore = metrics.reduce((sum, metric) => {
      const progress = (metric.currentValue / metric.targetValue) * 100;
      return sum + Math.min(progress, 100);
    }, 0);
    setSustainabilityScore(Math.round(totalScore / metrics.length));
  }, []);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'water': return Droplets;
      case 'energy': return Zap;
      case 'waste': return Recycle;
      case 'carbon': return Globe;
      case 'biodiversity': return Leaf;
      default: return Target;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'water': return 'from-blue-400 to-cyan-500';
      case 'energy': return 'from-yellow-400 to-orange-500';
      case 'waste': return 'from-green-400 to-emerald-500';
      case 'carbon': return 'from-purple-400 to-indigo-500';
      case 'biodiversity': return 'from-pink-400 to-rose-500';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving': return TrendingUp;
      case 'declining': return TrendingUp; // Will be styled differently
      default: return Target;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'improving': return 'text-green-600';
      case 'declining': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-green-200/50 p-12">
          <Leaf className="h-16 w-16 text-green-400 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Sürdürülebilirlik Takibi</h2>
          <p className="text-gray-600 mb-6">Sürdürülebilirlik metriklerinizi görmek için giriş yapmalısınız.</p>
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
              <Leaf className="h-8 w-8 mr-3" />
              Sürdürülebilirlik Takibi
            </h1>
            <p className="text-green-100">Çevre dostu tarım için ilerlemenizi izleyin</p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold">{sustainabilityScore}</div>
            <div className="text-green-200 text-sm">Sürdürülebilirlik Skoru</div>
          </div>
        </div>
      </div>

      {/* Sustainability Score Circle */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-green-200/50 p-8 mb-8">
        <div className="flex items-center justify-center">
          <div className="relative w-48 h-48">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                className="text-gray-200"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={`${2 * Math.PI * 40}`}
                strokeDashoffset={`${2 * Math.PI * 40 * (1 - sustainabilityScore / 100)}`}
                className="text-green-500 transition-all duration-1000"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-900">{sustainabilityScore}</div>
                <div className="text-green-600 font-medium">Sürdürülebilirlik</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {sustainabilityScore >= 80 ? 'Mükemmel! 🌟' :
             sustainabilityScore >= 60 ? 'İyi gidiyorsunuz! 👍' :
             sustainabilityScore >= 40 ? 'Gelişim gösteriyorsunuz 📈' :
             'Daha fazla çaba gerekli 💪'}
          </h3>
          <p className="text-gray-600">
            Sürdürülebilirlik skorunuz son 30 günlük performansınıza dayanmaktadır
          </p>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {metrics.map((metric, index) => {
          const IconComponent = getCategoryIcon(metric.category);
          const TrendIcon = getTrendIcon(metric.trend);
          const progress = (metric.currentValue / metric.targetValue) * 100;

          return (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`bg-gradient-to-r ${getCategoryColor(metric.category)} p-3 rounded-xl`}>
                  <IconComponent className="h-6 w-6 text-white" />
                </div>
                <div className={`flex items-center space-x-1 ${getTrendColor(metric.trend)}`}>
                  <TrendIcon className="h-4 w-4" />
                  <span className="text-sm font-medium">
                    {metric.trend === 'improving' ? 'İyileşiyor' :
                     metric.trend === 'declining' ? 'Kötüleşiyor' : 'Stabil'}
                  </span>
                </div>
              </div>

              <h3 className="font-bold text-gray-900 mb-2">{metric.title}</h3>
              
              <div className="flex items-end space-x-2 mb-3">
                <span className="text-2xl font-bold text-gray-900">{metric.currentValue}</span>
                <span className="text-gray-600">/ {metric.targetValue} {metric.unit}</span>
              </div>

              <div className="mb-3">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`bg-gradient-to-r ${getCategoryColor(metric.category)} h-2 rounded-full transition-all duration-500`}
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  ></div>
                </div>
              </div>

              <p className="text-xs text-gray-500">
                Son güncelleme: {new Date(metric.lastUpdated).toLocaleDateString('tr-TR')}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Sustainability Goals */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-green-200/50 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Sürdürülebilirlik Hedefleri</h2>
        
        <div className="space-y-6">
          {goals.map((goal, index) => (
            <motion.div
              key={goal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
                goal.completed
                  ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200'
                  : 'bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{goal.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">{goal.description}</p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span>Kategori: {goal.category}</span>
                    <span>Hedef: {new Date(goal.targetDate).toLocaleDateString('tr-TR')}</span>
                  </div>
                </div>
                {goal.completed && (
                  <Award className="h-8 w-8 text-green-500" />
                )}
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-600">İlerleme:</span>
                    <span className="font-medium text-gray-900">
                      {goal.progress}/{goal.maxProgress} {goal.progress === goal.maxProgress ? '✅' : ''}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full transition-all duration-500 ${
                        goal.completed 
                          ? 'bg-gradient-to-r from-green-400 to-emerald-500' 
                          : 'bg-gradient-to-r from-blue-400 to-indigo-500'
                      }`}
                      style={{ width: `${(goal.progress / goal.maxProgress) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Ödül: {goal.reward}</span>
                  {goal.completed && (
                    <span className="text-green-600 text-sm font-medium">Tamamlandı! 🎉</span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}