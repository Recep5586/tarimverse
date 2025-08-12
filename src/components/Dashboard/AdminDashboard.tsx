import React, { useState, useEffect } from 'react';
import { Users, MessageCircle, ShoppingBag, TrendingUp, AlertTriangle, CheckCircle, Settings, BarChart3, Globe, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../../store/authStore';

interface AdminStats {
  totalUsers: number;
  activeUsers: number;
  totalPosts: number;
  totalMarketItems: number;
  totalRevenue: number;
  supportTickets: number;
  systemHealth: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const { user } = useAuthStore();

  useEffect(() => {
    // Mock admin stats
    setStats({
      totalUsers: 12450,
      activeUsers: 3420,
      totalPosts: 45670,
      totalMarketItems: 2340,
      totalRevenue: 125000,
      supportTickets: 23,
      systemHealth: 98
    });
  }, []);

  // Check if user is admin (in real app, this would be a proper role check)
  const isAdmin = user?.email === 'admin@tarimverse.com';

  if (!user || !isAdmin) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-green-200/50 p-12">
          <Shield className="h-16 w-16 text-red-400 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Erişim Reddedildi</h2>
          <p className="text-gray-600">Bu sayfaya erişim yetkiniz bulunmamaktadır.</p>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-green-200/50 p-12 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Yönetici verileri yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-3xl p-8 text-white shadow-2xl mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2 flex items-center">
              <Settings className="h-8 w-8 mr-3" />
              Yönetici Paneli
            </h1>
            <p className="text-gray-300">TarımVerse platform yönetimi</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-green-400">{stats.systemHealth}%</div>
            <div className="text-gray-400 text-sm">Sistem Sağlığı</div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          {
            title: 'Toplam Kullanıcı',
            value: stats.totalUsers.toLocaleString(),
            icon: Users,
            color: 'from-blue-400 to-indigo-500',
            change: '+12%'
          },
          {
            title: 'Aktif Kullanıcı',
            value: stats.activeUsers.toLocaleString(),
            icon: TrendingUp,
            color: 'from-green-400 to-emerald-500',
            change: '+8%'
          },
          {
            title: 'Toplam Gönderi',
            value: stats.totalPosts.toLocaleString(),
            icon: MessageCircle,
            color: 'from-purple-400 to-pink-500',
            change: '+15%'
          },
          {
            title: 'Pazar Ürünleri',
            value: stats.totalMarketItems.toLocaleString(),
            icon: ShoppingBag,
            color: 'from-orange-400 to-red-500',
            change: '+23%'
          }
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-gradient-to-r ${stat.color} rounded-2xl p-6 text-white shadow-lg`}
          >
            <div className="flex items-center justify-between mb-4">
              <stat.icon className="h-8 w-8 text-white/80" />
              <span className="text-sm font-medium bg-white/20 px-2 py-1 rounded-full">
                {stat.change}
              </span>
            </div>
            <div>
              <p className="text-white/80 text-sm font-medium">{stat.title}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-green-200/50 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Hızlı İşlemler</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: 'Kullanıcı Yönetimi',
              description: 'Kullanıcıları görüntüle ve yönet',
              icon: Users,
              color: 'from-blue-400 to-indigo-500'
            },
            {
              title: 'İçerik Moderasyonu',
              description: 'Gönderileri ve yorumları incele',
              icon: MessageCircle,
              color: 'from-purple-400 to-pink-500'
            },
            {
              title: 'Sistem Ayarları',
              description: 'Platform ayarlarını düzenle',
              icon: Settings,
              color: 'from-gray-400 to-gray-600'
            },
            {
              title: 'Analitik Raporlar',
              description: 'Detaylı platform analitiği',
              icon: BarChart3,
              color: 'from-green-400 to-emerald-500'
            },
            {
              title: 'Güvenlik Merkezi',
              description: 'Güvenlik logları ve uyarılar',
              icon: Shield,
              color: 'from-red-400 to-pink-500'
            },
            {
              title: 'Global Ayarlar',
              description: 'Platform geneli konfigürasyon',
              icon: Globe,
              color: 'from-cyan-400 to-blue-500'
            }
          ].map((action, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-gradient-to-r ${action.color} rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-left`}
            >
              <action.icon className="h-8 w-8 mb-4" />
              <h3 className="font-bold text-lg mb-2">{action.title}</h3>
              <p className="text-white/90 text-sm">{action.description}</p>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}