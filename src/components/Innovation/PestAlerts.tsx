import React, { useState, useEffect } from 'react';
import { Bug, AlertTriangle, Camera, MapPin, Calendar, CheckCircle, X, Plus, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '../../store/authStore';
import { formatDistanceToNow } from 'date-fns';
import { tr } from 'date-fns/locale';

interface PestAlert {
  id: string;
  pestName: string;
  pestType: 'insect' | 'disease' | 'weed' | 'rodent' | 'bird';
  severity: 'low' | 'medium' | 'high' | 'critical';
  affectedArea: number;
  detectionMethod: 'visual' | 'trap' | 'sensor' | 'ai_camera';
  imageUrls: string[];
  symptomsDescription: string;
  treatmentApplied?: string;
  treatmentEffectiveness?: number;
  isResolved: boolean;
  resolvedAt?: string;
  createdAt: string;
  location: string;
}

export default function PestAlerts() {
  const [alerts, setAlerts] = useState<PestAlert[]>([]);
  const [showCreateAlert, setShowCreateAlert] = useState(false);
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const { user } = useAuthStore();

  useEffect(() => {
    // Mock pest alerts
    setAlerts([
      {
        id: '1',
        pestName: 'Yaprak Biti',
        pestType: 'insect',
        severity: 'high',
        affectedArea: 15.5,
        detectionMethod: 'visual',
        imageUrls: ['https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg'],
        symptomsDescription: 'Yaprakların altında küçük yeşil böcekler görülüyor. Yapraklar sararıyor ve büzülüyor.',
        treatmentApplied: 'Sabunlu su spreyi uygulandı',
        treatmentEffectiveness: 75,
        isResolved: false,
        createdAt: '2024-07-10T08:30:00Z',
        location: 'Ana Bahçe - Domates Alanı'
      },
      {
        id: '2',
        pestName: 'Külleme Hastalığı',
        pestType: 'disease',
        severity: 'medium',
        affectedArea: 8.2,
        detectionMethod: 'ai_camera',
        imageUrls: ['https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg'],
        symptomsDescription: 'Yapraklarda beyaz toz görünümü. Özellikle alt yapraklarda yoğun.',
        treatmentApplied: 'Fungisit uygulaması yapıldı',
        treatmentEffectiveness: 90,
        isResolved: true,
        resolvedAt: '2024-07-12T16:00:00Z',
        createdAt: '2024-07-08T14:15:00Z',
        location: 'Sera - Salatalık'
      },
      {
        id: '3',
        pestName: 'Yabani Ot',
        pestType: 'weed',
        severity: 'low',
        affectedArea: 3.1,
        detectionMethod: 'visual',
        imageUrls: [],
        symptomsDescription: 'Bitki aralarında yabani otlar çıkmaya başladı.',
        isResolved: false,
        createdAt: '2024-07-12T10:00:00Z',
        location: 'Arka Bahçe'
      }
    ]);
  }, []);

  const getPestTypeIcon = (type: string) => {
    switch (type) {
      case 'insect': return '🐛';
      case 'disease': return '🦠';
      case 'weed': return '🌿';
      case 'rodent': return '🐭';
      case 'bird': return '🐦';
      default: return '🐛';
    }
  };

  const getPestTypeName = (type: string) => {
    switch (type) {
      case 'insect': return 'Böcek';
      case 'disease': return 'Hastalık';
      case 'weed': return 'Yabani Ot';
      case 'rodent': return 'Kemirgen';
      case 'bird': return 'Kuş';
      default: return type;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'from-green-400 to-emerald-500';
      case 'medium': return 'from-yellow-400 to-orange-500';
      case 'high': return 'from-orange-400 to-red-500';
      case 'critical': return 'from-red-500 to-pink-600';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  const getSeverityText = (severity: string) => {
    switch (severity) {
      case 'low': return 'Düşük';
      case 'medium': return 'Orta';
      case 'high': return 'Yüksek';
      case 'critical': return 'Kritik';
      default: return severity;
    }
  };

  const getDetectionMethodName = (method: string) => {
    switch (method) {
      case 'visual': return 'Görsel Tespit';
      case 'trap': return 'Tuzak';
      case 'sensor': return 'Sensör';
      case 'ai_camera': return 'AI Kamera';
      default: return method;
    }
  };

  const filteredAlerts = alerts.filter(alert => {
    const matchesSeverity = selectedSeverity === 'all' || alert.severity === selectedSeverity;
    const matchesType = selectedType === 'all' || alert.pestType === selectedType;
    return matchesSeverity && matchesType;
  });

  const activeAlerts = alerts.filter(alert => !alert.isResolved).length;
  const resolvedAlerts = alerts.filter(alert => alert.isResolved).length;
  const totalAffectedArea = alerts.reduce((sum, alert) => sum + alert.affectedArea, 0);

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-green-200/50 p-12">
          <Bug className="h-16 w-16 text-green-400 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Zararlı Uyarıları</h2>
          <p className="text-gray-600 mb-6">Zararlı takibi için giriş yapmalısınız.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-pink-600 rounded-3xl p-8 text-white shadow-2xl mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2 flex items-center">
              <Bug className="h-8 w-8 mr-3" />
              Zararlı Uyarı Sistemi
            </h1>
            <p className="text-red-100">Erken tespit, etkili korunma</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{activeAlerts}</div>
            <div className="text-red-200 text-sm">Aktif Uyarı</div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          {
            title: 'Aktif Uyarılar',
            value: activeAlerts,
            icon: AlertTriangle,
            color: 'from-red-400 to-pink-500'
          },
          {
            title: 'Çözülen Sorunlar',
            value: resolvedAlerts,
            icon: CheckCircle,
            color: 'from-green-400 to-emerald-500'
          },
          {
            title: 'Etkilenen Alan',
            value: `${totalAffectedArea.toFixed(1)} m²`,
            icon: MapPin,
            color: 'from-orange-400 to-red-500'
          },
          {
            title: 'Ortalama Çözüm Süresi',
            value: '2.5 gün',
            icon: Calendar,
            color: 'from-blue-400 to-indigo-500'
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

      {/* Filters */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-green-200/50 p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Zararlı Uyarıları</h2>
          <button
            onClick={() => setShowCreateAlert(true)}
            className="flex items-center space-x-2 bg-gradient-to-r from-red-500 to-pink-600 text-white px-6 py-3 rounded-2xl hover:from-red-600 hover:to-pink-700 transition-all duration-300"
          >
            <Plus className="h-5 w-5" />
            <span>Uyarı Ekle</span>
          </button>
        </div>

        <div className="flex flex-wrap gap-4">
          <select
            value={selectedSeverity}
            onChange={(e) => setSelectedSeverity(e.target.value)}
            className="px-4 py-2 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="all">Tüm Seviyeler</option>
            <option value="low">Düşük</option>
            <option value="medium">Orta</option>
            <option value="high">Yüksek</option>
            <option value="critical">Kritik</option>
          </select>

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-4 py-2 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="all">Tüm Türler</option>
            <option value="insect">Böcek</option>
            <option value="disease">Hastalık</option>
            <option value="weed">Yabani Ot</option>
            <option value="rodent">Kemirgen</option>
            <option value="bird">Kuş</option>
          </select>
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-6">
        {filteredAlerts.map((alert, index) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200 p-8 ${
              !alert.isResolved ? 'ring-2 ring-red-200' : ''
            }`}
          >
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className={`bg-gradient-to-r ${getSeverityColor(alert.severity)} p-4 rounded-2xl text-white`}>
                  <div className="text-2xl">{getPestTypeIcon(alert.pestType)}</div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{alert.pestName}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                    <span className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>{alert.location}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDistanceToNow(new Date(alert.createdAt), { addSuffix: true, locale: tr })}</span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <span className={`px-4 py-2 rounded-full text-sm font-bold text-white bg-gradient-to-r ${getSeverityColor(alert.severity)}`}>
                  {getSeverityText(alert.severity)}
                </span>
                {alert.isResolved && (
                  <CheckCircle className="h-6 w-6 text-green-500" />
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Belirtiler:</h4>
                  <p className="text-gray-700 bg-gray-50 p-4 rounded-xl">{alert.symptomsDescription}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                    <h5 className="font-semibold text-blue-900 mb-1">Tür</h5>
                    <p className="text-blue-800">{getPestTypeName(alert.pestType)}</p>
                  </div>
                  <div className="bg-orange-50 rounded-xl p-4 border border-orange-200">
                    <h5 className="font-semibold text-orange-900 mb-1">Etkilenen Alan</h5>
                    <p className="text-orange-800">{alert.affectedArea} m²</p>
                  </div>
                  <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
                    <h5 className="font-semibold text-purple-900 mb-1">Tespit Yöntemi</h5>
                    <p className="text-purple-800">{getDetectionMethodName(alert.detectionMethod)}</p>
                  </div>
                  {alert.treatmentEffectiveness && (
                    <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                      <h5 className="font-semibold text-green-900 mb-1">Tedavi Başarısı</h5>
                      <p className="text-green-800">%{alert.treatmentEffectiveness}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                {alert.imageUrls.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Fotoğraflar:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {alert.imageUrls.map((url, idx) => (
                        <img
                          key={idx}
                          src={url}
                          alt={`${alert.pestName} ${idx + 1}`}
                          className="w-full h-24 object-cover rounded-xl border border-gray-200"
                        />
                      ))}
                    </div>
                  </div>
                )}

                {alert.treatmentApplied && (
                  <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                    <h4 className="font-semibold text-green-900 mb-2">Uygulanan Tedavi:</h4>
                    <p className="text-green-800">{alert.treatmentApplied}</p>
                  </div>
                )}

                <div className="flex space-x-3">
                  {!alert.isResolved ? (
                    <>
                      <button className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 font-medium">
                        Tedavi Uygula
                      </button>
                      <button className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 font-medium">
                        Uzman Danış
                      </button>
                    </>
                  ) : (
                    <div className="flex-1 bg-green-100 text-green-800 py-3 rounded-xl text-center font-medium">
                      ✅ Çözüldü - {alert.resolvedAt && formatDistanceToNow(new Date(alert.resolvedAt), { addSuffix: true, locale: tr })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredAlerts.length === 0 && (
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-green-200/50 p-12 text-center">
          <Bug className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {alerts.length === 0 ? 'Henüz zararlı uyarısı yok' : 'Filtreye uygun uyarı bulunamadı'}
          </h3>
          <p className="text-gray-600">
            {alerts.length === 0 
              ? 'Bahçenizde zararlı tespit edildiğinde buradan takip edebilirsiniz'
              : 'Filtre ayarlarınızı değiştirmeyi deneyin'
            }
          </p>
        </div>
      )}
    </div>
  );
}