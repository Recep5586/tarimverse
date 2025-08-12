import React, { useState, useEffect } from 'react';
import { Trophy, Star, Award, Target, Users, TrendingUp, Crown, Medal, Gift, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../../store/authStore';

interface UserLevel {
  level: number;
  title: string;
  xp: number;
  nextLevelXp: number;
  benefits: string[];
}

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  earned: boolean;
  earnedAt?: string;
  progress?: number;
  maxProgress?: number;
}

interface Leaderboard {
  rank: number;
  user: {
    name: string;
    avatar: string;
    level: number;
  };
  points: number;
  badges: number;
  streak: number;
}

export default function CommunityGamification() {
  const [userLevel, setUserLevel] = useState<UserLevel | null>(null);
  const [badges, setBadges] = useState<Badge[]>([]);
  const [leaderboard, setLeaderboard] = useState<Leaderboard[]>([]);
  const [activeTab, setActiveTab] = useState('overview');
  const { user } = useAuthStore();

  useEffect(() => {
    // Mock user level
    setUserLevel({
      level: 12,
      title: 'Deneyimli Çiftçi',
      xp: 2450,
      nextLevelXp: 3000,
      benefits: [
        'Özel rozetler',
        'Öncelikli destek',
        'Beta özellikler',
        'Uzman danışmanlık indirimi'
      ]
    });

    // Mock badges
    setBadges([
      {
        id: '1',
        name: 'İlk Tohum',
        description: 'İlk gönderinizi paylaştınız',
        icon: '🌱',
        rarity: 'common',
        earned: true,
        earnedAt: '2024-06-15T10:00:00Z'
      },
      {
        id: '2',
        name: 'Sosyal Kelebek',
        description: '50 kişiyi takip ettiniz',
        icon: '🦋',
        rarity: 'rare',
        earned: true,
        earnedAt: '2024-06-20T14:30:00Z'
      },
      {
        id: '3',
        name: 'Viral İçerik',
        description: 'Bir gönderiniz 1000 beğeni alsın',
        icon: '🔥',
        rarity: 'epic',
        earned: false,
        progress: 567,
        maxProgress: 1000
      },
      {
        id: '4',
        name: 'Bahçe Efsanesi',
        description: '100 farklı ürün yetiştirin',
        icon: '👑',
        rarity: 'legendary',
        earned: false,
        progress: 23,
        maxProgress: 100
      }
    ]);

    // Mock leaderboard
    setLeaderboard([
      {
        rank: 1,
        user: { name: 'Ahmet Karaca', avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1', level: 25 },
        points: 15420,
        badges: 47,
        streak: 89
      },
      {
        rank: 2,
        user: { name: 'Fatma Öztürk', avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1', level: 23 },
        points: 14890,
        badges: 42,
        streak: 76
      },
      {
        rank: 3,
        user: { name: 'Mehmet Demir', avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1', level: 21 },
        points: 13650,
        badges: 38,
        streak: 65
      }
    ]);
  }, []);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'from-gray-400 to-gray-600';
      case 'rare': return 'from-blue-400 to-indigo-600';
      case 'epic': return 'from-purple-400 to-pink-600';
      case 'legendary': return 'from-yellow-400 to-orange-600';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  const getRarityText = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'Yaygın';
      case 'rare': return 'Nadir';
      case 'epic': return 'Epik';
      case 'legendary': return 'Efsanevi';
      default: return rarity;
    }
  };

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-green-200/50 p-12">
          <Trophy className="h-16 w-16 text-green-400 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Topluluk Oyunlaştırması</h2>
          <p className="text-gray-600 mb-6">Rozetlerinizi ve seviyenizi görmek için giriş yapmalısınız.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-8 text-white shadow-2xl mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2 flex items-center">
              <Trophy className="h-8 w-8 mr-3" />
              Topluluk Oyunlaştırması
            </h1>
            <p className="text-purple-100">Seviye atla, rozet kazan, lider ol!</p>
          </div>
          {userLevel && (
            <div className="text-right">
              <div className="text-2xl font-bold">Seviye {userLevel.level}</div>
              <div className="text-purple-200 text-sm">{userLevel.title}</div>
            </div>
          )}
        </div>
      </div>

      {/* User Progress */}
      {userLevel && (
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-green-200/50 p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">İlerlemeniz</h2>
            <div className="flex items-center space-x-2">
              <Zap className="h-5 w-5 text-yellow-500" />
              <span className="font-bold text-gray-900">{userLevel.xp} XP</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-purple-900">Seviye {userLevel.level}</h3>
                  <span className="text-purple-700 font-medium">{userLevel.title}</span>
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-purple-700">İlerleme</span>
                    <span className="text-purple-900 font-medium">
                      {userLevel.xp} / {userLevel.nextLevelXp} XP
                    </span>
                  </div>
                  <div className="w-full bg-purple-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-pink-600 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${(userLevel.xp / userLevel.nextLevelXp) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <p className="text-purple-700 text-sm">
                  Bir sonraki seviyeye {userLevel.nextLevelXp - userLevel.xp} XP kaldı!
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6 border border-yellow-200">
              <h3 className="font-bold text-yellow-900 mb-4">Seviye Avantajları</h3>
              <ul className="space-y-2">
                {userLevel.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center space-x-2 text-sm text-yellow-800">
                    <Star className="h-4 w-4 text-yellow-600 flex-shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-green-200/50 p-2 mb-8">
        <div className="flex space-x-2">
          {[
            { id: 'overview', label: 'Genel Bakış', icon: Trophy },
            { id: 'badges', label: 'Rozetler', icon: Award },
            { id: 'leaderboard', label: 'Lider Tablosu', icon: TrendingUp },
            { id: 'challenges', label: 'Günlük Görevler', icon: Target }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-2xl transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg'
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
      {activeTab === 'badges' && (
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-green-200/50 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Rozet Koleksiyonum</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {badges.map((badge, index) => (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`rounded-3xl p-6 border-2 transition-all duration-300 ${
                  badge.earned
                    ? 'bg-gradient-to-br from-white to-gray-50 border-green-300 shadow-xl'
                    : 'bg-gray-50 border-gray-200 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`bg-gradient-to-r ${getRarityColor(badge.rarity)} p-4 rounded-2xl shadow-lg text-4xl`}>
                    {badge.icon}
                  </div>
                  <div className="text-right">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${getRarityColor(badge.rarity)}`}>
                      {getRarityText(badge.rarity)}
                    </span>
                    {badge.earned && (
                      <div className="mt-2 text-green-600 text-xs font-medium">Kazanıldı ✓</div>
                    )}
                  </div>
                </div>

                <h3 className="font-bold text-gray-900 mb-2">{badge.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{badge.description}</p>

                {!badge.earned && badge.progress !== undefined && (
                  <div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-gray-600">İlerleme:</span>
                      <span className="font-medium text-gray-900">
                        {badge.progress}/{badge.maxProgress}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`bg-gradient-to-r ${getRarityColor(badge.rarity)} h-2 rounded-full transition-all duration-500`}
                        style={{ width: `${(badge.progress! / badge.maxProgress!) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'leaderboard' && (
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-green-200/50 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Bu Ay Lider Tablosu</h2>
          
          <div className="space-y-4">
            {leaderboard.map((leader, index) => (
              <motion.div
                key={leader.rank}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-center justify-between p-6 rounded-2xl border-2 transition-all duration-300 ${
                  leader.rank <= 3
                    ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-300'
                    : 'bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg ${
                    leader.rank === 1 ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white' :
                    leader.rank === 2 ? 'bg-gradient-to-r from-gray-400 to-gray-600 text-white' :
                    leader.rank === 3 ? 'bg-gradient-to-r from-orange-400 to-red-500 text-white' :
                    'bg-gray-200 text-gray-700'
                  }`}>
                    {leader.rank <= 3 ? (
                      leader.rank === 1 ? '🥇' : leader.rank === 2 ? '🥈' : '🥉'
                    ) : (
                      leader.rank
                    )}
                  </div>
                  
                  <img
                    src={leader.user.avatar}
                    alt={leader.user.name}
                    className="h-12 w-12 rounded-2xl border-2 border-green-300"
                  />
                  
                  <div>
                    <h3 className="font-bold text-gray-900">{leader.user.name}</h3>
                    <p className="text-sm text-gray-600">Seviye {leader.user.level}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900">{leader.points.toLocaleString()}</div>
                    <div className="text-xs text-gray-600">Puan</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900">{leader.badges}</div>
                    <div className="text-xs text-gray-600">Rozet</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900">{leader.streak}</div>
                    <div className="text-xs text-gray-600">Seri</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'challenges' && (
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-green-200/50 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Günlük Görevler</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: 'Günlük Paylaşım',
                description: 'Bugün bir gönderi paylaş',
                progress: 1,
                maxProgress: 1,
                reward: '50 XP',
                completed: true
              },
              {
                title: 'Sosyal Etkileşim',
                description: '5 gönderiyi beğen',
                progress: 3,
                maxProgress: 5,
                reward: '25 XP',
                completed: false
              },
              {
                title: 'Bilgi Paylaşımı',
                description: '2 yoruma yanıt ver',
                progress: 0,
                maxProgress: 2,
                reward: '30 XP',
                completed: false
              },
              {
                title: 'Keşif',
                description: 'Yeni bir kullanıcıyı takip et',
                progress: 0,
                maxProgress: 1,
                reward: '20 XP',
                completed: false
              }
            ].map((challenge, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
                  challenge.completed
                    ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200'
                    : 'bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{challenge.title}</h3>
                    <p className="text-gray-600 text-sm">{challenge.description}</p>
                  </div>
                  {challenge.completed && (
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  )}
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-600">İlerleme:</span>
                      <span className="font-medium text-gray-900">
                        {challenge.progress}/{challenge.maxProgress}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-500 ${
                          challenge.completed 
                            ? 'bg-gradient-to-r from-green-400 to-emerald-500' 
                            : 'bg-gradient-to-r from-blue-400 to-indigo-500'
                        }`}
                        style={{ width: `${(challenge.progress / challenge.maxProgress) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Ödül: {challenge.reward}</span>
                    {challenge.completed && (
                      <span className="text-green-600 text-sm font-medium">Tamamlandı! 🎉</span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}