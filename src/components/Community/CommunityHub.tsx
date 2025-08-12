import React, { useState, useEffect } from 'react';
import { Users, Trophy, Target, Calendar, Award, TrendingUp, MessageCircle, Heart, Share, Plus, Crown, Medal, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../../store/authStore';
import { formatDistanceToNow } from 'date-fns';
import { tr } from 'date-fns/locale';

interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'yield' | 'sustainability' | 'innovation' | 'education';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  participants: number;
  maxParticipants: number;
  prize: string;
  endDate: string;
  status: 'active' | 'upcoming' | 'completed';
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  category: string;
  difficulty: 'bronze' | 'silver' | 'gold' | 'platinum';
  earned: boolean;
  earnedAt?: string;
  progress?: number;
  maxProgress?: number;
}

export default function CommunityHub() {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [activeTab, setActiveTab] = useState('challenges');
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const { user } = useAuthStore();

  useEffect(() => {
    // Mock challenges data
    setChallenges([
      {
        id: '1',
        title: 'En Verimli Domates Hasadı',
        description: 'Bu sezon en yüksek domates verimini kim alacak? Metrekare başına en fazla hasat yapan kazanır!',
        type: 'yield',
        difficulty: 'intermediate',
        participants: 156,
        maxParticipants: 200,
        prize: '5000 TL + Organik Gübre Seti',
        endDate: '2024-08-15',
        status: 'active'
      },
      {
        id: '2',
        title: 'Sıfır Atık Bahçe Meydan Okuması',
        description: 'Bahçenizde sıfır atık hedefine ulaşın. Kompost, geri dönüşüm ve sürdürülebilir tarım teknikleri kullanın.',
        type: 'sustainability',
        difficulty: 'advanced',
        participants: 89,
        maxParticipants: 100,
        prize: 'Sürdürülebilirlik Sertifikası + 3000 TL',
        endDate: '2024-09-30',
        status: 'active'
      },
      {
        id: '3',
        title: 'Akıllı Tarım İnovasyonu',
        description: 'IoT sensörleri ve AI kullanarak en yaratıcı tarım çözümünü geliştirin.',
        type: 'innovation',
        difficulty: 'advanced',
        participants: 34,
        maxParticipants: 50,
        prize: 'Teknoloji Paketi + 10000 TL',
        endDate: '2024-07-30',
        status: 'upcoming'
      }
    ]);

    // Mock achievements data
    setAchievements([
      {
        id: '1',
        name: 'İlk Adım',
        description: 'İlk gönderinizi paylaştınız',
        category: 'Başlangıç',
        difficulty: 'bronze',
        earned: true,
        earnedAt: '2024-06-15T10:00:00Z'
      },
      {
        id: '2',
        name: 'Sosyal Kelebek',
        description: '10 kişiyi takip edin',
        category: 'Sosyal',
        difficulty: 'bronze',
        earned: true,
        earnedAt: '2024-06-20T14:30:00Z'
      },
      {
        id: '3',
        name: 'Popüler İçerik',
        description: 'Bir gönderiniz 100 beğeni alsın',
        category: 'İçerik',
        difficulty: 'silver',
        earned: false,
        progress: 67,
        maxProgress: 100
      },
      {
        id: '4',
        name: 'Bahçe Ustası',
        description: '5 farklı ürün yetiştirin',
        category: 'Tarım',
        difficulty: 'gold',
        earned: false,
        progress: 2,
        maxProgress: 5
      },
      {
        id: '5',
        name: 'Çevre Kahramanı',
        description: 'Karbon ayak izinizi %50 azaltın',
        category: 'Sürdürülebilirlik',
        difficulty: 'platinum',
        earned: false,
        progress: 23,
        maxProgress: 50
      }
    ]);
  }, []);

  const getChallengeTypeColor = (type: string) => {
    switch (type) {
      case 'yield': return 'from-green-400 to-emerald-500';
      case 'sustainability': return 'from-blue-400 to-cyan-500';
      case 'innovation': return 'from-purple-400 to-pink-500';
      case 'education': return 'from-orange-400 to-red-500';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAchievementColor = (difficulty: string) => {
    switch (difficulty) {
      case 'bronze': return 'from-orange-400 to-orange-600';
      case 'silver': return 'from-gray-400 to-gray-600';
      case 'gold': return 'from-yellow-400 to-yellow-600';
      case 'platinum': return 'from-purple-400 to-purple-600';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  const getAchievementIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'bronze': return Medal;
      case 'silver': return Medal;
      case 'gold': return Trophy;
      case 'platinum': return Crown;
      default: return Star;
    }
  };

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-green-200/50 p-12">
          <Users className="h-16 w-16 text-green-400 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Topluluk Merkezi</h2>
          <p className="text-gray-600 mb-6">Topluluk etkinliklerine katılmak için giriş yapmalısınız.</p>
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
              <Users className="h-8 w-8 mr-3" />
              Topluluk Merkezi
            </h1>
            <p className="text-purple-100">Meydan okumalar, başarılar ve topluluk etkinlikleri</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{challenges.filter(c => c.status === 'active').length}</div>
            <div className="text-purple-200 text-sm">Aktif Meydan Okuma</div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-green-200/50 p-2 mb-8">
        <div className="flex space-x-2">
          {[
            { id: 'challenges', label: 'Meydan Okumalar', icon: Target, count: challenges.length },
            { id: 'achievements', label: 'Başarılar', icon: Award, count: achievements.filter(a => a.earned).length },
            { id: 'leaderboard', label: 'Lider Tablosu', icon: TrendingUp, count: 0 },
            { id: 'events', label: 'Etkinlikler', icon: Calendar, count: 3 }
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
              {tab.count > 0 && (
                <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                  activeTab === tab.id ? 'bg-white/20' : 'bg-gray-200 text-gray-600'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {activeTab === 'challenges' && (
        <div className="space-y-6">
          {challenges.map((challenge, index) => (
            <motion.div
              key={challenge.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-green-200/50 p-8 hover:shadow-2xl transition-all duration-500"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className={`bg-gradient-to-r ${getChallengeTypeColor(challenge.type)} p-4 rounded-2xl shadow-lg`}>
                    <Target className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{challenge.title}</h3>
                    <p className="text-gray-600 max-w-2xl">{challenge.description}</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <span className={`px-4 py-2 rounded-full text-sm font-bold ${
                    challenge.status === 'active' ? 'bg-green-100 text-green-800' :
                    challenge.status === 'upcoming' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {challenge.status === 'active' ? 'Aktif' :
                     challenge.status === 'upcoming' ? 'Yakında' : 'Tamamlandı'}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-4 border border-blue-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <Users className="h-5 w-5 text-blue-600" />
                    <span className="text-sm font-medium text-blue-700">Katılımcı</span>
                  </div>
                  <p className="text-2xl font-bold text-blue-900">{challenge.participants}/{challenge.maxParticipants}</p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-4 border border-purple-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <Trophy className="h-5 w-5 text-purple-600" />
                    <span className="text-sm font-medium text-purple-700">Ödül</span>
                  </div>
                  <p className="text-sm font-bold text-purple-900">{challenge.prize}</p>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-4 border border-orange-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <Calendar className="h-5 w-5 text-orange-600" />
                    <span className="text-sm font-medium text-orange-700">Bitiş</span>
                  </div>
                  <p className="text-sm font-bold text-orange-900">
                    {new Date(challenge.endDate).toLocaleDateString('tr-TR')}
                  </p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4 border border-green-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <Target className="h-5 w-5 text-green-600" />
                    <span className="text-sm font-medium text-green-700">Seviye</span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${getDifficultyColor(challenge.difficulty)}`}>
                    {challenge.difficulty === 'beginner' ? 'Başlangıç' :
                     challenge.difficulty === 'intermediate' ? 'Orta' : 'İleri'}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="w-full bg-gray-200 rounded-full h-2 mr-4">
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-pink-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(challenge.participants / challenge.maxParticipants) * 100}%` }}
                  ></div>
                </div>
                <button
                  onClick={() => setSelectedChallenge(challenge)}
                  className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-3 rounded-2xl hover:from-purple-600 hover:to-pink-700 transition-all duration-300 font-medium whitespace-nowrap"
                >
                  {challenge.status === 'active' ? 'Katıl' : 'Detaylar'}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {activeTab === 'achievements' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement, index) => {
            const IconComponent = getAchievementIcon(achievement.difficulty);
            return (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`rounded-3xl p-6 border-2 transition-all duration-300 ${
                  achievement.earned
                    ? 'bg-gradient-to-br from-white to-gray-50 border-green-300 shadow-xl'
                    : 'bg-gray-50 border-gray-200 opacity-70'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`bg-gradient-to-r ${getAchievementColor(achievement.difficulty)} p-3 rounded-2xl shadow-lg`}>
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  {achievement.earned && (
                    <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-bold">
                      Kazanıldı
                    </div>
                  )}
                </div>

                <h3 className="font-bold text-gray-900 mb-2">{achievement.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{achievement.description}</p>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Kategori:</span>
                    <span className="font-medium text-gray-900">{achievement.category}</span>
                  </div>
                  
                  {!achievement.earned && achievement.progress !== undefined && (
                    <div>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-600">İlerleme:</span>
                        <span className="font-medium text-gray-900">
                          {achievement.progress}/{achievement.maxProgress}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`bg-gradient-to-r ${getAchievementColor(achievement.difficulty)} h-2 rounded-full transition-all duration-500`}
                          style={{ width: `${(achievement.progress! / achievement.maxProgress!) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  {achievement.earned && achievement.earnedAt && (
                    <div className="text-xs text-green-600 font-medium">
                      {formatDistanceToNow(new Date(achievement.earnedAt), { addSuffix: true, locale: tr })} kazanıldı
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {activeTab === 'leaderboard' && (
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-green-200/50 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Bu Ay En Aktif Çiftçiler</h2>
          
          <div className="space-y-4">
            {[
              { rank: 1, name: 'Ahmet Karaca', location: 'Konya', points: 2450, avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1' },
              { rank: 2, name: 'Fatma Öztürk', location: 'Antalya', points: 2340, avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1' },
              { rank: 3, name: 'Mehmet Demir', location: 'İzmir', points: 2180, avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1' },
              { rank: 4, name: 'Ayşe Yılmaz', location: 'Bursa', points: 1950, avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1' },
              { rank: 5, name: 'Osman Kaya', location: 'Samsun', points: 1820, avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1' }
            ].map((leader, index) => (
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
                    src={leader.avatar}
                    alt={leader.name}
                    className="h-12 w-12 rounded-2xl border-2 border-green-300"
                  />
                  
                  <div>
                    <h3 className="font-bold text-gray-900">{leader.name}</h3>
                    <p className="text-sm text-gray-600">{leader.location}</p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">{leader.points}</div>
                  <div className="text-sm text-gray-600">puan</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'events' && (
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-green-200/50 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Yaklaşan Etkinlikler</h2>
          
          <div className="space-y-6">
            {[
              {
                title: 'Organik Tarım Festivali',
                description: 'Türkiye\'nin en büyük organik tarım festivali',
                date: '2024-08-15',
                location: 'Ankara',
                participants: 1200,
                type: 'festival'
              },
              {
                title: 'Akıllı Tarım Zirvesi',
                description: 'Teknoloji ve tarımın buluştuğu zirve',
                date: '2024-09-10',
                location: 'İstanbul',
                participants: 800,
                type: 'conference'
              },
              {
                title: 'Çiftçi Pazarı Buluşması',
                description: 'Yerel üreticiler ve tüketiciler bir arada',
                date: '2024-07-28',
                location: 'İzmir',
                participants: 450,
                type: 'market'
              }
            ].map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                    <p className="text-gray-600 mb-4">{event.description}</p>
                    <div className="flex items-center space-x-6 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(event.date).toLocaleDateString('tr-TR')}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4" />
                        <span>{event.participants} katılımcı</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Target className="h-4 w-4" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </div>
                  
                  <button className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-2xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 font-medium">
                    Katıl
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}