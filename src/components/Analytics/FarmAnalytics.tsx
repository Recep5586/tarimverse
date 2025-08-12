import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, TrendingDown, DollarSign, Droplets, Thermometer, Leaf, Calendar, Target, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../../store/authStore';

interface AnalyticsData {
  period: string;
  yield: number;
  revenue: number;
  waterUsage: number;
  carbonFootprint: number;
  efficiency: number;
}

interface CropPerformance {
  crop: string;
  yield: number;
  revenue: number;
  efficiency: number;
  trend: 'up' | 'down' | 'stable';
}

export default function FarmAnalytics() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData[]>([]);
  const [cropPerformance, setCropPerformance] = useState<CropPerformance[]>([]);
  const { user } = useAuthStore();

  useEffect(() => {
    // Mock analytics data
    setAnalyticsData([
      { period: 'Ocak', yield: 450, revenue: 12500, waterUsage: 2300, carbonFootprint: 1.2, efficiency: 85 },
      { period: 'Şubat', yield: 520, revenue: 14200, waterUsage: 2100, carbonFootprint: 1.1, efficiency: 88 },
      { period: 'Mart', yield: 680, revenue: 18900, waterUsage: 2500, carbonFootprint: 1.3, efficiency: 92 },
      { period: 'Nisan', yield: 750, revenue: 21000, waterUsage: 2800, carbonFootprint: 1.4, efficiency: 89 },
      { period: 'Mayıs', yield: 890, revenue: 24500, waterUsage: 3200, carbonFootprint: 1.6, efficiency: 94 },
      { period: 'Haziran', yield: 1200, revenue: 32000, waterUsage: 3800, carbonFootprint: 1.8, efficiency: 96 }
    ]);

    setCropPerformance([
      { crop: 'Domates', yield: 1200, revenue: 18000, efficiency: 96, trend: 'up' },
      { crop: 'Salatalık', yield: 800, revenue: 12000, efficiency: 88, trend: 'up' },
      { crop: 'Biber', yield: 450, revenue: 9500, efficiency: 82, trend: 'stable' },
      { crop: 'Patlıcan', yield: 320, revenue: 7200, efficiency: 79, trend: 'down' },
      { crop: 'Marul', yield: 180, revenue: 2800, efficiency: 91, trend: 'up' }
    ]);
  }, []);

  const currentMonth = analyticsData[analyticsData.length - 1];
  const previousMonth = analyticsData[analyticsData.length - 2];

  const calculateChange = (current: number, previous: number) => {
    if (!previous) return 0;
    return ((current - previous) / previous) * 100;
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return TrendingUp;
      case 'down': return TrendingDown;
      default: return Target;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-green-200/50 p-12">
          <BarChart3 className="h-16 w-16 text-green-400 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Çiftlik Analitiği</h2>
          <p className="text-gray-600 mb-6">Analitik verilerinizi görüntülemek için giriş yapmalısınız.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 text-white shadow-2xl mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2 flex items-center">
              <BarChart3 className="h-8 w-8 mr-3" />
              Çiftlik Analitiği
            </h1>
            <p className="text-blue-100">Performansınızı izleyin ve optimize edin</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{currentMonth?.efficiency || 0}%</div>
            <div className="text-blue-200 text-sm">Verimlilik Skoru</div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          {
            title: 'Toplam Verim',
            value: `${currentMonth?.yield || 0} kg`,
            change: calculateChange(currentMonth?.yield || 0, previousMonth?.yield || 0),
            icon: Leaf,
            color: 'from-green-400 to-emerald-500'
          },
          {
            title: 'Gelir',
            value: `₺${(currentMonth?.revenue || 0).toLocaleString()}`,
            change: calculateChange(currentMonth?.revenue || 0, previousMonth?.revenue || 0),
            icon: DollarSign,
            color: 'from-blue-400 to-indigo-500'
          },
          {
            title: 'Su Kullanımı',
            value: `${currentMonth?.waterUsage || 0} L`,
            change: calculateChange(currentMonth?.waterUsage || 0, previousMonth?.waterUsage || 0),
            icon: Droplets,
            color: 'from-cyan-400 to-blue-500'
          },
          {
            title: 'Karbon Ayak İzi',
            value: `${currentMonth?.carbonFootprint || 0} ton`,
            change: calculateChange(currentMonth?.carbonFootprint || 0, previousMonth?.carbonFootprint || 0),
            icon: Thermometer,
            color: 'from-purple-400 to-pink-500'
          }
        ].map((metric, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-gradient-to-r ${metric.color} rounded-2xl p-6 text-white shadow-lg`}
          >
            <div className="flex items-center justify-between mb-4">
              <metric.icon className="h-8 w-8 text-white/80" />
              <div className={`flex items-center space-x-1 text-sm ${
                metric.change > 0 ? 'text-green-200' : metric.change < 0 ? 'text-red-200' : 'text-white/80'
              }`}>
                {metric.change > 0 ? <TrendingUp className="h-4 w-4" /> : 
                 metric.change < 0 ? <TrendingDown className="h-4 w-4" /> : null}
                <span>{metric.change > 0 ? '+' : ''}{metric.change.toFixed(1)}%</span>
              </div>
            </div>
            <div>
              <p className="text-white/80 text-sm font-medium">{metric.title}</p>
              <p className="text-2xl font-bold">{metric.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Yield Trend Chart */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-green-200/50 p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Verim Trendi</h3>
          <div className="space-y-4">
            {analyticsData.map((data, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-gray-600 font-medium">{data.period}</span>
                <div className="flex items-center space-x-3">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(data.yield / 1200) * 100}%` }}
                    ></div>
                  </div>
                  <span className="font-bold text-gray-900 w-16 text-right">{data.yield} kg</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Revenue Chart */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-green-200/50 p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Gelir Analizi</h3>
          <div className="space-y-4">
            {analyticsData.map((data, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-gray-600 font-medium">{data.period}</span>
                <div className="flex items-center space-x-3">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-400 to-indigo-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(data.revenue / 32000) * 100}%` }}
                    ></div>
                  </div>
                  <span className="font-bold text-gray-900 w-20 text-right">₺{data.revenue.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Crop Performance */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-green-200/50 p-8">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Ürün Performansı</h3>
        
        <div className="space-y-4">
          {cropPerformance.map((crop, index) => {
            const TrendIcon = getTrendIcon(crop.trend);
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center">
                    <Leaf className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{crop.crop}</h4>
                    <p className="text-sm text-gray-600">Verim: {crop.yield} kg</p>
                  </div>
                </div>

                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Gelir</p>
                    <p className="font-bold text-gray-900">₺{crop.revenue.toLocaleString()}</p>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Verimlilik</p>
                    <p className="font-bold text-gray-900">{crop.efficiency}%</p>
                  </div>

                  <div className={`flex items-center space-x-1 ${getTrendColor(crop.trend)}`}>
                    <TrendIcon className="h-5 w-5" />
                    <span className="font-medium text-sm">
                      {crop.trend === 'up' ? 'Yükseliş' : 
                       crop.trend === 'down' ? 'Düşüş' : 'Stabil'}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}