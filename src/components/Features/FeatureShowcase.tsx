import React from 'react';
import { Bot, Camera, Globe, TrendingUp, Shield, Video, Droplets, Award } from 'lucide-react';
import { motion } from 'framer-motion';

export default function FeatureShowcase() {
  const innovations = [
    {
      title: 'AI Hastalık Teşhisi',
      description: '%95 doğrulukla bitki hastalıklarını tespit edin',
      icon: Camera,
      color: 'from-purple-400 to-pink-500',
      status: 'Aktif'
    },
    {
      title: 'Blockchain Sertifikaları',
      description: 'Değiştirilemez dijital sertifikalar',
      icon: Shield,
      color: 'from-blue-400 to-indigo-500',
      status: 'Aktif'
    },
    {
      title: 'Karbon İzleme',
      description: 'Çevre dostu tarım için karbon ayak izi takibi',
      icon: Globe,
      color: 'from-green-400 to-emerald-500',
      status: 'Aktif'
    },
    {
      title: 'Verim Tahmini',
      description: 'AI ile hasat verimini önceden tahmin edin',
      icon: TrendingUp,
      color: 'from-orange-400 to-red-500',
      status: 'Aktif'
    },
    {
      title: 'Sanal Danışmanlık',
      description: 'Uzman tarım mühendisleri ile video görüşme',
      icon: Video,
      color: 'from-cyan-400 to-blue-500',
      status: 'Aktif'
    },
    {
      title: 'Akıllı Sulama',
      description: 'IoT sensörleri ile otomatik sulama kontrolü',
      icon: Droplets,
      color: 'from-teal-400 to-cyan-500',
      status: 'Aktif'
    }
  ];

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-green-200/50 p-8 mb-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Yenilikçi Özellikler</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Tarımda teknolojinin gücünü keşfedin. Yapay zeka, IoT ve blockchain teknolojileri ile tarımınızı geleceğe taşıyın.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {innovations.map((innovation, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gradient-to-br from-white to-gray-50 rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`bg-gradient-to-r ${innovation.color} p-3 rounded-xl`}>
                <innovation.icon className="h-6 w-6 text-white" />
              </div>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-bold">
                {innovation.status}
              </span>
            </div>
            
            <h3 className="font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
              {innovation.title}
            </h3>
            <p className="text-gray-600 text-sm">{innovation.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}