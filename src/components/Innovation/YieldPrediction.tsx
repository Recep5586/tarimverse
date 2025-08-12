import React, { useState, useEffect } from 'react';
import { TrendingUp, Target, Calendar, Leaf, BarChart3, Award, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../../store/authStore';
import { usePlantingStore } from '../../store/plantingStore';

interface YieldPrediction {
  id: string;
  crop: string;
  garden: string;
  plantingDate: string;
  expectedHarvestDate: string;
  predictedYield: number;
  predictedQuality: 'A' | 'B' | 'C' | 'D';
  confidence: number;
  factors: string[];
  recommendations: string[];
}

export default function YieldPrediction() {
  const [predictions, setPredictions] = useState<YieldPrediction[]>([]);
  const [selectedPrediction, setSelectedPrediction] = useState<YieldPrediction | null>(null);
  const { user } = useAuthStore();
  const { plantingSchedules } = usePlantingStore();

  useEffect(() => {
    // Mock yield predictions
    setPredictions([
      {
        id: '1',
        crop: 'Domates',
        garden: 'Ana Bahçe',
        plantingDate: '2024-03-15',
        expectedHarvestDate: '2024-06-15',
        predictedYield: 45.5,
        predictedQuality: 'A',
        confidence: 0.89,
        factors: [
          'Optimal toprak nemi',
          'İdeal sıcaklık aralığı',
          'Düzenli gübreleme',
          'Hastalık yok'
        ],
        recommendations: [
          'Sulama sıklığını artırın',
          'Haftalık gübreleme yapın',
          'Hastalık kontrolü yapın'
        ]
      },
      {
        id: '2',
        crop: 'Salatalık',
        garden: 'Sera',
        plantingDate: '2024-04-01',
        expectedHarvestDate: '2024-06-01',
        predictedYield: 32.8,
        predictedQuality: 'B',
        confidence: 0.76,
        factors: [
          'Sera koşulları iyi',
          'Su miktarı yeterli',
          'Sıcaklık dalgalanması var'
        ],
        recommendations: [
          'Sıcaklık kontrolünü iyileştirin',
          'Havalandırmayı artırın',
          'Destek sistemini güçlendirin'
        ]
      }
    ]);
  }, []);

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case 'A': return 'from-green-400 to-emerald-500';
      case 'B': return 'from-blue-400 to-indigo-500';
      case 'C': return 'from-yellow-400 to-orange-500';
      case 'D': return 'from-red-400 to-pink-500';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'text-green-600';
    if (confidence >= 0.6) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-green-200/50 p-12">
          <TrendingUp className="h-16 w-16 text-green-400 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Verim Tahmini</h2>
          <p className="text-gray-600 mb-6">Verim tahminlerini görüntülemek için giriş yapmalısınız.</p>
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
              <TrendingUp className="h-8 w-8 mr-3" />
              Verim Tahmini
            </h1>
            <p className="text-green-100">AI destekli hasat verim tahminleri</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{predictions.length}</div>
            <div className="text-green-200 text-sm">Aktif Tahmin</div>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          {
            title: 'Toplam Beklenen Verim',
            value: `${predictions.reduce((sum, p) => sum + p.predictedYield, 0).toFixed(1)} kg`,
            icon: Target,
            color: 'from-green-400 to-emerald-500'
          },
          {
            title: 'Ortalama Kalite',
            value: 'A Sınıfı',
            icon: Award,
            color: 'from-blue-400 to-indigo-500'
          },
          {
            title: 'Güven Oranı',
            value: `%${Math.round(predictions.reduce((sum, p) => sum + p.confidence, 0) / predictions.length * 100)}`,
            icon: BarChart3,
            color: 'from-purple-400 to-pink-500'
          },
          {
            title: 'Aktif Ekim',
            value: predictions.length,
            icon: Leaf,
            color: 'from-orange-400 to-red-500'
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

      {/* Predictions List */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-green-200/50 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Verim Tahminleri</h2>
        
        {predictions.length === 0 ? (
          <div className="text-center py-12">
            <TrendingUp className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Henüz verim tahmini yok</h3>
            <p className="text-gray-600">Ekim programlarınız için AI tahminleri oluşturulacak</p>
          </div>
        ) : (
          <div className="space-y-6">
            {predictions.map((prediction, index) => (
              <motion.div
                key={prediction.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedPrediction(prediction)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="bg-gradient-to-r from-green-400 to-emerald-500 p-3 rounded-2xl">
                      <Leaf className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{prediction.crop}</h3>
                      <p className="text-gray-600">{prediction.garden}</p>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                        <span>Ekim: {new Date(prediction.plantingDate).toLocaleDateString('tr-TR')}</span>
                        <span>Hasat: {new Date(prediction.expectedHarvestDate).toLocaleDateString('tr-TR')}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className={`bg-gradient-to-r ${getQualityColor(prediction.predictedQuality)} text-white px-3 py-1 rounded-full text-sm font-bold`}>
                        {prediction.predictedQuality} Kalite
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{prediction.predictedYield} kg</div>
                    <div className={`text-sm font-medium ${getConfidenceColor(prediction.confidence)}`}>
                      %{Math.round(prediction.confidence * 100)} güven
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Etkileyen Faktörler:</h4>
                      <ul className="space-y-1">
                        {prediction.factors.slice(0, 3).map((factor, idx) => (
                          <li key={idx} className="flex items-center text-sm text-gray-600">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                            {factor}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Öneriler:</h4>
                      <ul className="space-y-1">
                        {prediction.recommendations.slice(0, 2).map((rec, idx) => (
                          <li key={idx} className="flex items-center text-sm text-gray-600">
                            <Target className="h-3 w-3 text-blue-500 mr-2 flex-shrink-0" />
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Prediction Detail Modal */}
      {selectedPrediction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedPrediction(null)}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative bg-white rounded-3xl shadow-2xl border border-gray-200 p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Detaylı Verim Analizi</h2>
              <button
                onClick={() => setSelectedPrediction(null)}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
                  <h3 className="text-xl font-bold text-green-900 mb-4">{selectedPrediction.crop}</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-green-700">Beklenen Verim:</span>
                      <span className="font-bold text-green-900">{selectedPrediction.predictedYield} kg</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-700">Kalite Sınıfı:</span>
                      <span className={`font-bold px-2 py-1 rounded-lg text-white bg-gradient-to-r ${getQualityColor(selectedPrediction.predictedQuality)}`}>
                        {selectedPrediction.predictedQuality}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-700">Güven Oranı:</span>
                      <span className={`font-bold ${getConfidenceColor(selectedPrediction.confidence)}`}>
                        %{Math.round(selectedPrediction.confidence * 100)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
                  <h3 className="text-lg font-bold text-blue-900 mb-4">Etkileyen Faktörler</h3>
                  <ul className="space-y-2">
                    {selectedPrediction.factors.map((factor, index) => (
                      <li key={index} className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-blue-800">{factor}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-200">
                  <h3 className="text-lg font-bold text-orange-900 mb-4">Öneriler</h3>
                  <ul className="space-y-2">
                    {selectedPrediction.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-center space-x-3">
                        <Target className="h-4 w-4 text-orange-600 flex-shrink-0" />
                        <span className="text-orange-800">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
                  <h3 className="text-lg font-bold text-purple-900 mb-4">Zaman Çizelgesi</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-5 w-5 text-purple-600" />
                      <div>
                        <p className="font-medium text-purple-900">Ekim Tarihi</p>
                        <p className="text-sm text-purple-700">
                          {new Date(selectedPrediction.plantingDate).toLocaleDateString('tr-TR')}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Award className="h-5 w-5 text-purple-600" />
                      <div>
                        <p className="font-medium text-purple-900">Beklenen Hasat</p>
                        <p className="text-sm text-purple-700">
                          {new Date(selectedPrediction.expectedHarvestDate).toLocaleDateString('tr-TR')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}