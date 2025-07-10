import React, { useState, useEffect } from 'react';
import { Bot, Zap, Settings, TrendingUp, AlertTriangle, CheckCircle, Plus, Play, Pause, Edit, Trash2, Brain, Cpu, Wifi, Battery, Signal, Camera, Droplets, Thermometer, Leaf, Award, Target, Users, Globe, Lightbulb, Rocket, Shield, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAutomationStore } from '../../store/automationStore';
import { useAuthStore } from '../../store/authStore';

export default function AutomationDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const { user } = useAuthStore();
  const { 
    automationRules, 
    iotDevices, 
    aiRecommendations, 
    loading,
    fetchAutomationRules,
    fetchIoTDevices,
    fetchAIRecommendations 
  } = useAutomationStore();

  useEffect(() => {
    if (user) {
      fetchAutomationRules();
      fetchIoTDevices();
      fetchAIRecommendations();
    }
  }, [user]);

  const tabs = [
    { id: 'overview', label: 'Genel Bakış', icon: TrendingUp },
    { id: 'automation', label: 'Otomasyon Kuralları', icon: Bot },
    { id: 'iot', label: 'IoT Cihazları', icon: Wifi },
    { id: 'ai', label: 'AI Önerileri', icon: Brain },
    { id: 'analytics', label: 'Analitik', icon: Target },
    { id: 'innovations', label: 'Yenilikler', icon: Rocket }
  ];

  const automationStats = {
    activeRules: automationRules.filter(rule => rule.is_active).length,
    totalDevices: iotDevices.length,
    onlineDevices: iotDevices.filter(device => device.is_online).length,
    pendingRecommendations: aiRecommendations.filter(rec => !rec.is_implemented).length
  };

  const innovations = [
    {
      id: 'blockchain-certificates',
      title: 'Blockchain Sertifikaları',
      description: 'Ürünleriniz için değiştirilemez dijital sertifikalar',
      icon: Shield,
      status: 'active',
      benefits: ['Güvenilir sertifikasyon', 'Uluslararası geçerlilik', 'Sahtecilik önleme']
    },
    {
      id: 'ai-disease-detection',
      title: 'AI Hastalık Tespiti',
      description: 'Yapay zeka ile bitki hastalıklarını erken tespit',
      icon: Camera,
      status: 'beta',
      benefits: ['%95 doğruluk oranı', 'Erken müdahale', 'Verim kaybı önleme']
    },
    {
      id: 'carbon-tracking',
      title: 'Karbon İzleme',
      description: 'Tarımsal faaliyetlerinizin karbon ayak izini takip edin',
      icon: Globe,
      status: 'active',
      benefits: ['Çevre dostu tarım', 'Karbon kredisi', 'Sürdürülebilirlik']
    },
    {
      id: 'yield-prediction',
      title: 'Verim Tahmini',
      description: 'Makine öğrenmesi ile hasat verimini önceden tahmin',
      icon: Target,
      status: 'active',
      benefits: ['Planlama kolaylığı', 'Pazar stratejisi', 'Risk yönetimi']
    },
    {
      id: 'virtual-consultation',
      title: 'Sanal Danışmanlık',
      description: 'Uzman tarım mühendisleri ile video görüşme',
      icon: Users,
      status: 'active',
      benefits: ['Uzman desteği', '7/24 erişim', 'Hızlı çözüm']
    },
    {
      id: 'smart-irrigation',
      title: 'Akıllı Sulama',
      description: 'Sensör verilerine dayalı otomatik sulama sistemi',
      icon: Droplets,
      status: 'active',
      benefits: ['%40 su tasarrufu', 'Otomatik kontrol', 'Optimal büyüme']
    }
  ];

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-green-200/50 p-12">
          <Bot className="h-16 w-16 text-green-400 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Otomasyon Merkezi</h2>
          <p className="text-gray-600 mb-6">Akıllı tarım özelliklerini kullanmak için giriş yapmalısınız.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white shadow-2xl mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2 flex items-center">
              <Bot className="h-8 w-8 mr-3" />
              Akıllı Tarım Merkezi
            </h1>
            <p className="text-blue-100">Tarımınızı geleceğe taşıyan teknolojiler</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{automationStats.activeRules}</div>
            <div className="text-blue-200 text-sm">Aktif Kural</div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-green-200/50 p-2 mb-8">
        <div className="flex space-x-2 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-2xl transition-all duration-300 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                  : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              <tab.icon className="h-5 w-5" />
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'overview' && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Aktif Kurallar', value: automationStats.activeRules, icon: Bot, color: 'from-green-400 to-emerald-500' },
                { label: 'IoT Cihazları', value: automationStats.totalDevices, icon: Wifi, color: 'from-blue-400 to-indigo-500' },
                { label: 'Çevrimiçi Cihaz', value: automationStats.onlineDevices, icon: Signal, color: 'from-purple-400 to-pink-500' },
                { label: 'AI Önerileri', value: automationStats.pendingRecommendations, icon: Brain, color: 'from-orange-400 to-red-500' }
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
                      <p className="text-white/80 text-sm font-medium">{stat.label}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                    </div>
                    <stat.icon className="h-8 w-8 text-white/80" />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-green-200/50 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Hızlı İşlemler</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { title: 'Yeni Kural Oluştur', description: 'Otomasyon kuralı ekle', icon: Plus, action: () => setActiveTab('automation') },
                  { title: 'Cihaz Bağla', description: 'IoT cihazı ekle', icon: Wifi, action: () => setActiveTab('iot') },
                  { title: 'AI Analizi', description: 'Yapay zeka önerilerini gör', icon: Brain, action: () => setActiveTab('ai') }
                ].map((action, index) => (
                  <button
                    key={index}
                    onClick={action.action}
                    className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl hover:from-blue-50 hover:to-purple-50 transition-all duration-300 text-left group"
                  >
                    <action.icon className="h-8 w-8 text-blue-600 mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="font-bold text-gray-900 mb-2">{action.title}</h3>
                    <p className="text-gray-600 text-sm">{action.description}</p>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'innovations' && (
          <motion.div
            key="innovations"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-green-200/50 p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                    <Rocket className="h-6 w-6 mr-3 text-purple-600" />
                    Yenilikçi Özellikler
                  </h2>
                  <p className="text-gray-600 mt-2">Tarımda teknolojinin gücünü keşfedin</p>
                </div>
                <div className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-4 py-2 rounded-2xl">
                  <span className="text-sm font-bold">🚀 Gelecek Burada!</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {innovations.map((innovation, index) => (
                  <motion.div
                    key={innovation.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 border border-gray-200 hover:shadow-xl transition-all duration-300 group"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-2xl ${
                        innovation.status === 'active' ? 'bg-green-100' :
                        innovation.status === 'beta' ? 'bg-orange-100' : 'bg-gray-100'
                      }`}>
                        <innovation.icon className={`h-6 w-6 ${
                          innovation.status === 'active' ? 'text-green-600' :
                          innovation.status === 'beta' ? 'text-orange-600' : 'text-gray-600'
                        }`} />
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        innovation.status === 'active' ? 'bg-green-100 text-green-800' :
                        innovation.status === 'beta' ? 'bg-orange-100 text-orange-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {innovation.status === 'active' ? 'Aktif' :
                         innovation.status === 'beta' ? 'Beta' : 'Yakında'}
                      </span>
                    </div>

                    <h3 className="font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                      {innovation.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">{innovation.description}</p>

                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-800 text-sm">Faydalar:</h4>
                      <ul className="space-y-1">
                        {innovation.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-center text-xs text-gray-600">
                            <CheckCircle className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button className="w-full mt-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white py-2 rounded-xl hover:from-purple-600 hover:to-pink-700 transition-all duration-300 text-sm font-medium">
                      {innovation.status === 'active' ? 'Kullan' : 'Daha Fazla Bilgi'}
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Future Technologies */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <Lightbulb className="h-6 w-6 mr-3" />
                Gelecek Teknolojileri
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { title: 'Drone Tarımı', description: 'Otonom drone ile ekim ve ilaçlama', icon: '🚁' },
                  { title: 'Nano Sensörler', description: 'Bitki içi gerçek zamanlı izleme', icon: '🔬' },
                  { title: 'Genetik Optimizasyon', description: 'AI destekli tohum geliştirme', icon: '🧬' },
                  { title: 'Hologram Danışman', description: '3D uzman danışmanlık sistemi', icon: '👨‍🔬' }
                ].map((tech, index) => (
                  <div key={index} className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center">
                    <div className="text-3xl mb-2">{tech.icon}</div>
                    <h4 className="font-bold mb-2">{tech.title}</h4>
                    <p className="text-indigo-100 text-sm">{tech.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'automation' && (
          <motion.div
            key="automation"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-green-200/50 p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Otomasyon Kuralları</h2>
                <button className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-2xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300">
                  <Plus className="h-5 w-5" />
                  <span>Yeni Kural</span>
                </button>
              </div>

              {automationRules.length === 0 ? (
                <div className="text-center py-12">
                  <Bot className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Henüz otomasyon kuralı yok</h3>
                  <p className="text-gray-600">İlk otomasyon kuralınızı oluşturun!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {automationRules.map((rule, index) => (
                    <motion.div
                      key={rule.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl border border-gray-200"
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`p-3 rounded-xl ${rule.is_active ? 'bg-green-100' : 'bg-gray-200'}`}>
                          <Bot className={`h-6 w-6 ${rule.is_active ? 'text-green-600' : 'text-gray-500'}`} />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900">{rule.name}</h3>
                          <p className="text-sm text-gray-600">{rule.description}</p>
                          <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                            <span>Tetikleyici: {rule.trigger_type}</span>
                            <span>Aksiyon: {rule.action_type}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className={`p-2 rounded-xl transition-colors ${
                          rule.is_active ? 'text-green-600 hover:bg-green-100' : 'text-gray-500 hover:bg-gray-200'
                        }`}>
                          {rule.is_active ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                        </button>
                        <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-xl transition-colors">
                          <Edit className="h-5 w-5" />
                        </button>
                        <button className="p-2 text-red-600 hover:bg-red-100 rounded-xl transition-colors">
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}

        {activeTab === 'iot' && (
          <motion.div
            key="iot"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-green-200/50 p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">IoT Cihazları</h2>
                <button className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-2xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-300">
                  <Plus className="h-5 w-5" />
                  <span>Cihaz Ekle</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {iotDevices.map((device, index) => (
                  <motion.div
                    key={device.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-xl ${device.is_online ? 'bg-green-100' : 'bg-red-100'}`}>
                          {device.device_type === 'soil_sensor' && <Thermometer className={`h-5 w-5 ${device.is_online ? 'text-green-600' : 'text-red-600'}`} />}
                          {device.device_type === 'camera' && <Camera className={`h-5 w-5 ${device.is_online ? 'text-green-600' : 'text-red-600'}`} />}
                          {device.device_type === 'irrigation_controller' && <Droplets className={`h-5 w-5 ${device.is_online ? 'text-green-600' : 'text-red-600'}`} />}
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900">{device.device_name}</h3>
                          <p className="text-sm text-gray-600">{device.device_type}</p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                        device.is_online ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {device.is_online ? 'Çevrimiçi' : 'Çevrimdışı'}
                      </span>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Batarya</span>
                        <div className="flex items-center space-x-2">
                          <Battery className="h-4 w-4 text-gray-500" />
                          <span className="text-sm font-medium">{device.battery_level || 0}%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Sinyal</span>
                        <div className="flex items-center space-x-2">
                          <Signal className="h-4 w-4 text-gray-500" />
                          <span className="text-sm font-medium">{device.signal_strength || 0}%</span>
                        </div>
                      </div>
                    </div>

                    <button className="w-full mt-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 text-sm font-medium">
                      Detayları Gör
                    </button>
                  </motion.div>
                ))}
              </div>

              {iotDevices.length === 0 && (
                <div className="text-center py-12">
                  <Wifi className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Henüz IoT cihazı yok</h3>
                  <p className="text-gray-600">İlk akıllı cihazınızı bağlayın!</p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {activeTab === 'ai' && (
          <motion.div
            key="ai"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-green-200/50 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Brain className="h-6 w-6 mr-3 text-purple-600" />
                AI Önerileri
              </h2>

              <div className="space-y-6">
                {aiRecommendations.map((recommendation, index) => (
                  <motion.div
                    key={recommendation.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-xl ${
                          recommendation.priority === 'urgent' ? 'bg-red-100' :
                          recommendation.priority === 'high' ? 'bg-orange-100' :
                          recommendation.priority === 'medium' ? 'bg-yellow-100' : 'bg-green-100'
                        }`}>
                          <Brain className={`h-5 w-5 ${
                            recommendation.priority === 'urgent' ? 'text-red-600' :
                            recommendation.priority === 'high' ? 'text-orange-600' :
                            recommendation.priority === 'medium' ? 'text-yellow-600' : 'text-green-600'
                          }`} />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900">{recommendation.title}</h3>
                          <p className="text-sm text-gray-600">{recommendation.recommendation_type}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          recommendation.priority === 'urgent' ? 'bg-red-100 text-red-800' :
                          recommendation.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                          recommendation.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {recommendation.priority === 'urgent' ? 'Acil' :
                           recommendation.priority === 'high' ? 'Yüksek' :
                           recommendation.priority === 'medium' ? 'Orta' : 'Düşük'}
                        </span>
                        {recommendation.confidence_score && (
                          <span className="text-xs text-gray-500">
                            %{Math.round(recommendation.confidence_score * 100)} güven
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4">{recommendation.description}</p>

                    {recommendation.action_steps && recommendation.action_steps.length > 0 && (
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-800 mb-2">Önerilen Adımlar:</h4>
                        <ul className="space-y-1">
                          {recommendation.action_steps.map((step: string, idx: number) => (
                            <li key={idx} className="flex items-center text-sm text-gray-600">
                              <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                              {step}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        {recommendation.expected_outcome && `Beklenen sonuç: ${recommendation.expected_outcome}`}
                      </span>
                      <div className="flex space-x-2">
                        <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl hover:from-purple-600 hover:to-pink-700 transition-all duration-300 text-sm font-medium">
                          Uygula
                        </button>
                        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors text-sm font-medium">
                          Daha Sonra
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {aiRecommendations.length === 0 && (
                <div className="text-center py-12">
                  <Brain className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Henüz AI önerisi yok</h3>
                  <p className="text-gray-600">Yapay zeka analizleriniz hazırlanıyor...</p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {activeTab === 'analytics' && (
          <motion.div
            key="analytics"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-green-200/50 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Target className="h-6 w-6 mr-3 text-green-600" />
                Analitik Dashboard
              </h2>

              {/* Performance Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {[
                  { title: 'Verim Artışı', value: '+23%', description: 'Son 3 aya göre', color: 'text-green-600' },
                  { title: 'Su Tasarrufu', value: '40%', description: 'Akıllı sulama ile', color: 'text-blue-600' },
                  { title: 'Karbon Azaltımı', value: '-15%', description: 'Çevre dostu tarım', color: 'text-purple-600' }
                ].map((metric, index) => (
                  <div key={index} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 text-center">
                    <div className={`text-3xl font-bold ${metric.color} mb-2`}>{metric.value}</div>
                    <div className="font-semibold text-gray-900 mb-1">{metric.title}</div>
                    <div className="text-sm text-gray-600">{metric.description}</div>
                  </div>
                ))}
              </div>

              {/* Charts Placeholder */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
                  <h3 className="font-bold text-gray-900 mb-4">Verim Trendi</h3>
                  <div className="h-48 flex items-center justify-center text-gray-500">
                    <TrendingUp className="h-16 w-16" />
                  </div>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
                  <h3 className="font-bold text-gray-900 mb-4">Kaynak Kullanımı</h3>
                  <div className="h-48 flex items-center justify-center text-gray-500">
                    <Target className="h-16 w-16" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}