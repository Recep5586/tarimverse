import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, DollarSign, BarChart3, Calendar, Target, AlertCircle, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../../store/authStore';

interface MarketPrediction {
  id: string;
  cropName: string;
  region: string;
  currentPrice: number;
  predictedPrice: number;
  priceTrend: 'rising' | 'falling' | 'stable';
  confidenceLevel: number;
  predictionPeriod: '1_week' | '1_month' | '3_months' | '6_months';
  factors: string[];
  demandForecast: string;
  supplyForecast: string;
  validUntil: string;
}

export default function MarketPredictions() {
  const [predictions, setPredictions] = useState<MarketPrediction[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState<string>('1_month');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const { user } = useAuthStore();

  useEffect(() => {
    // Mock market predictions
    setPredictions([
      {
        id: '1',
        cropName: 'Domates',
        region: 'Akdeniz',
        currentPrice: 12.50,
        predictedPrice: 15.20,
        priceTrend: 'rising',
        confidenceLevel: 0.87,
        predictionPeriod: '1_month',
        factors: ['Mevsimsel talep artışı', 'Hava koşulları', 'İhracat talebi'],
        demandForecast: 'Yüksek talep bekleniyor',
        supplyForecast: 'Arz normal seviyede',
        validUntil: '2024-08-15T00:00:00Z'
      },
      {
        id: '2',
        cropName: 'Salatalık',
        region: 'Marmara',
        currentPrice: 8.75,
        predictedPrice: 7.90,
        priceTrend: 'falling',
        confidenceLevel: 0.78,
        predictionPeriod: '1_week',
        factors: ['Aşırı arz', 'İthalat rekabeti', 'Sezon sonu'],
        demandForecast: 'Talep azalıyor',
        supplyForecast: 'Arz fazlası var',
        validUntil: '2024-07-22T00:00:00Z'
      },
      {
        id: '3',
        cropName: 'Biber',
        region: 'Ege',
        currentPrice: 18.30,
        predictedPrice: 18.50,
        priceTrend: 'stable',
        confidenceLevel: 0.92,
        predictionPeriod: '3_months',
        factors: ['Stabil talep', 'Normal hava koşulları', 'Dengeli arz'],
        demandForecast: 'Talep stabil',
        supplyForecast: 'Arz dengeli',
        validUntil: '2024-10-15T00:00:00Z'
      },
      {
        id: '4',
        cropName: 'Patlıcan',
        region: 'Akdeniz',
        currentPrice: 14.20,
        predictedPrice: 19.80,
        priceTrend: 'rising',
        confidenceLevel: 0.83,
        predictionPeriod: '1_month',
        factors: ['Düşük hasat', 'Yüksek talep', 'İhracat fırsatları'],
        demandForecast: 'Çok yüksek talep',
        supplyForecast: 'Arz kıtlığı bekleniyor',
        validUntil: '2024-08-20T00:00:00Z'
      }
    ]);
  }, []);

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'rising': return TrendingUp;
      case 'falling': return TrendingDown;
      default: return Target;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'rising': return 'text-green-600';
      case 'falling': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getTrendText = (trend: string) => {
    switch (trend) {
      case 'rising': return 'Yükseliş';
      case 'falling': return 'Düşüş';
      default: return 'Stabil';
    }
  };

  const getPeriodText = (period: string) => {
    switch (period) {
      case '1_week': return '1 Hafta';
      case '1_month': return '1 Ay';
      case '3_months': return '3 Ay';
      case '6_months': return '6 Ay';
      default: return period;
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'text-green-600';
    if (confidence >= 0.6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const filteredPredictions = predictions.filter(prediction => {
    const matchesPeriod = selectedPeriod === 'all' || prediction.predictionPeriod === selectedPeriod;
    const matchesRegion = selectedRegion === 'all' || prediction.region === selectedRegion;
    return matchesPeriod && matchesRegion;
  });

  const regions = ['all', ...Array.from(new Set(predictions.map(p => p.region)))];

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-green-200/50 p-12">
          <BarChart3 className="h-16 w-16 text-green-400 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Pazar Tahminleri</h2>
          <p className="text-gray-600 mb-6">Pazar analizlerini görüntülemek için giriş yapmalısınız.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-3xl p-8 text-white shadow-2xl mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2 flex items-center">
              <BarChart3 className="h-8 w-8 mr-3" />
              Pazar Tahminleri
            </h1>
            <p className="text-green-100">AI destekli fiyat tahminleri ve pazar analizi</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{predictions.length}</div>
            <div className="text-green-200 text-sm">Aktif Tahmin</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-green-200/50 p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="all">Tüm Dönemler</option>
            <option value="1_week">1 Hafta</option>
            <option value="1_month">1 Ay</option>
            <option value="3_months">3 Ay</option>
            <option value="6_months">6 Ay</option>
          </select>

          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="all">Tüm Bölgeler</option>
            {regions.filter(r => r !== 'all').map(region => (
              <option key={region} value={region}>{region}</option>
            ))}
          </select>

          <div className="flex items-center space-x-2 px-4 py-3 bg-green-100 rounded-xl">
            <DollarSign className="h-5 w-5 text-green-600" />
            <span className="text-green-700 font-medium">Fiyat Analizi</span>
          </div>
        </div>
      </div>

      {/* Predictions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPredictions.map((prediction, index) => {
          const TrendIcon = getTrendIcon(prediction.priceTrend);
          const priceChange = prediction.predictedPrice - prediction.currentPrice;
          const priceChangePercent = (priceChange / prediction.currentPrice) * 100;

          return (
            <motion.div
              key={prediction.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-green-200/50 p-8 hover:shadow-2xl transition-all duration-500"
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{prediction.cropName}</h3>
                  <p className="text-gray-600">{prediction.region} Bölgesi</p>
                  <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    {getPeriodText(prediction.predictionPeriod)}
                  </span>
                </div>
                <div className={`flex items-center space-x-2 ${getTrendColor(prediction.priceTrend)}`}>
                  <TrendIcon className="h-6 w-6" />
                  <span className="font-bold">{getTrendText(prediction.priceTrend)}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-1">Mevcut Fiyat</p>
                  <p className="text-2xl font-bold text-gray-900">₺{prediction.currentPrice}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-1">Tahmini Fiyat</p>
                  <p className={`text-2xl font-bold ${getTrendColor(prediction.priceTrend)}`}>
                    ₺{prediction.predictedPrice}
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-2xl p-4 mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Fiyat Değişimi:</span>
                  <span className={`font-bold ${priceChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {priceChange >= 0 ? '+' : ''}₺{priceChange.toFixed(2)} ({priceChangePercent >= 0 ? '+' : ''}{priceChangePercent.toFixed(1)}%)
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Güven Oranı:</span>
                  <span className={`font-bold ${getConfidenceColor(prediction.confidenceLevel)}`}>
                    %{Math.round(prediction.confidenceLevel * 100)}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Etkileyen Faktörler:</h4>
                  <ul className="space-y-1">
                    {prediction.factors.map((factor, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-600">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                        {factor}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-green-50 rounded-xl p-3 border border-green-200">
                    <h5 className="font-semibold text-green-900 text-sm mb-1">Talep</h5>
                    <p className="text-green-800 text-sm">{prediction.demandForecast}</p>
                  </div>
                  <div className="bg-blue-50 rounded-xl p-3 border border-blue-200">
                    <h5 className="font-semibold text-blue-900 text-sm mb-1">Arz</h5>
                    <p className="text-blue-800 text-sm">{prediction.supplyForecast}</p>
                  </div>
                </div>

                <div className="text-xs text-gray-500 text-center pt-2 border-t border-gray-200">
                  Geçerlilik: {new Date(prediction.validUntil).toLocaleDateString('tr-TR')} tarihine kadar
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {filteredPredictions.length === 0 && (
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-green-200/50 p-12 text-center">
          <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">Tahmin bulunamadı</h3>
          <p className="text-gray-600">Seçilen kriterlere uygun pazar tahmini bulunmuyor</p>
        </div>
      )}
    </div>
  );
}