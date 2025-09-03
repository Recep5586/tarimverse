import React, { useState } from 'react';
import { Leaf, Users, ShoppingBag, Calendar, Bot, Award, ArrowRight, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../../store/authStore';
import AuthModal from '../Auth/AuthModal';
import FeatureShowcase from '../Features/FeatureShowcase';

export default function WelcomeScreen() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signup');
  const { user } = useAuthStore();

  const features = [
    {
      icon: Users,
      title: 'Güçlü Topluluk',
      description: '12,000+ çiftçi ve tarım severin buluşma noktası',
      color: 'from-blue-400 to-indigo-500'
    },
    {
      icon: ShoppingBag,
      title: 'Yerel Pazar',
      description: 'Çiftçiden tüketiciye doğrudan alışveriş',
      color: 'from-green-400 to-emerald-500'
    },
    {
      icon: Calendar,
      title: 'Ekim Takvimi',
      description: 'Bölgenize uygun ekim zamanları',
      color: 'from-purple-400 to-pink-500'
    },
    {
      icon: Bot,
      title: 'Akıllı Tarım',
      description: 'AI ve IoT destekli tarım teknolojileri',
      color: 'from-orange-400 to-red-500'
    }
  ];

  if (user) return null;

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 rounded-3xl w-24 h-24 mx-auto mb-8 shadow-2xl">
              <Leaf className="h-12 w-12 text-white" />
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent mb-6">
              TarımVerse
            </h1>
            
            <p className="text-xl md:text-2xl text-green-600 font-medium mb-4">
              Doğanın Dijital Evreni
            </p>
            
            <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8">
              Türkiye'nin en büyük tarım topluluğu. Çiftçiler, bahçıvanlar ve tarım severlerin 
              bilgi paylaştığı, öğrendiği ve büyüdüğü platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  setAuthMode('signup');
                  setShowAuthModal(true);
                }}
                className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-2xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <span className="font-semibold">Hemen Başla</span>
                <ArrowRight className="h-5 w-5" />
              </button>
              
              <button
                onClick={() => {
                  setAuthMode('signin');
                  setShowAuthModal(true);
                }}
                className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm text-green-600 px-8 py-4 rounded-2xl hover:bg-white transition-all duration-300 shadow-lg border border-green-200"
              >
                <span className="font-semibold">Giriş Yap</span>
              </button>
            </div>
          </motion.div>

          <FeatureShowcase />

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300"
              >
                <div className={`bg-gradient-to-r ${feature.color} p-3 rounded-xl w-12 h-12 mb-4`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-green-200/50 p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Büyüyen Topluluk</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: 'Aktif Çiftçi', value: '12,450+' },
                { label: 'Günlük Paylaşım', value: '1,200+' },
                { label: 'Çözülen Soru', value: '8,750+' },
                { label: 'Başarılı Hasat', value: '3,400+' }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-green-600 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)}
        initialMode={authMode}
      />
    </>
  );
}