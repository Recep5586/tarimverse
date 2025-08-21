import React, { useState, useEffect } from 'react';
import { Trophy, Star, Target, Users, Award, TrendingUp } from 'lucide-react';

interface Challenge {
  id: string;
  title: string;
  description: string;
  points: number;
  progress: number;
  maxProgress: number;
  completed: boolean;
  category: 'daily' | 'weekly' | 'monthly';
}

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedDate?: string;
}

interface LeaderboardEntry {
  id: string;
  name: string;
  points: number;
  level: number;
  avatar: string;
  rank: number;
}

const CommunityGamification: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'challenges' | 'badges' | 'leaderboard'>('challenges');
  const [userLevel, setUserLevel] = useState(12);
  const [userXP, setUserXP] = useState(2450);
  const [nextLevelXP] = useState(2800);

  const [challenges] = useState<Challenge[]>([
    {
      id: '1',
      title: 'Günlük Paylaşım',
      description: 'Bugün bir gönderi paylaş',
      points: 50,
      progress: 1,
      maxProgress: 1,
      completed: true,
      category: 'daily'
    },
    {
      id: '2',
      title: 'Haftalık Uzman',
      description: 'Bu hafta 5 yararlı yorum yap',
      points: 200,
      progress: 3,
      maxProgress: 5,
      completed: false,
      category: 'weekly'
    },
    {
      id: '3',
      title: 'Topluluk Lideri',
      description: 'Bu ay 10 kişiye yardım et',
      points: 500,
      progress: 7,
      maxProgress: 10,
      completed: false,
      category: 'monthly'
    }
  ]);

  const [badges] = useState<Badge[]>([
    {
      id: '1',
      name: 'İlk Adım',
      description: 'İlk gönderini paylaştın',
      icon: '🌱',
      earned: true,
      earnedDate: '2024-01-15'
    },
    {
      id: '2',
      name: 'Yardımsever',
      description: '50 kişiye yardım ettin',
      icon: '🤝',
      earned: true,
      earnedDate: '2024-02-20'
    },
    {
      id: '3',
      name: 'Uzman Çiftçi',
      description: '100 başarılı hasat yaptın',
      icon: '🏆',
      earned: false
    }
  ]);

  const [leaderboard] = useState<LeaderboardEntry[]>([
    {
      id: '1',
      name: 'Ahmet Yılmaz',
      points: 5420,
      level: 18,
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      rank: 1
    },
    {
      id: '2',
      name: 'Fatma Demir',
      points: 4890,
      level: 16,
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      rank: 2
    },
    {
      id: '3',
      name: 'Mehmet Kaya',
      points: 4320,
      level: 15,
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      rank: 3
    }
  ]);

  const getProgressPercentage = () => {
    return ((userXP % 350) / 350) * 100;
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'daily': return 'bg-green-100 text-green-800';
      case 'weekly': return 'bg-blue-100 text-blue-800';
      case 'monthly': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return 'text-yellow-600';
      case 2: return 'text-gray-500';
      case 3: return 'text-amber-600';
      default: return 'text-gray-700';
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* User Progress Header */}
      <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-xl p-6 text-white mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Topluluk Oyunlaştırma</h1>
            <p className="opacity-90">Seviye {userLevel} • {userXP} XP</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{userXP}</div>
            <div className="text-sm opacity-90">Toplam Puan</div>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-2">
            <span>Seviye {userLevel}</span>
            <span>Seviye {userLevel + 1}</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-3">
            <div 
              className="bg-white rounded-full h-3 transition-all duration-300"
              style={{ width: `${getProgressPercentage()}%` }}
            ></div>
          </div>
          <div className="text-center text-sm mt-2 opacity-90">
            {nextLevelXP - userXP} XP kaldı
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 bg-gray-100 rounded-lg p-1 mb-6">
        {[
          { id: 'challenges', label: 'Meydan Okumalar', icon: Target },
          { id: 'badges', label: 'Rozetler', icon: Award },
          { id: 'leaderboard', label: 'Lider Tablosu', icon: Trophy }
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id as any)}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-md transition-all ${
              activeTab === id
                ? 'bg-white text-green-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="font-medium">{label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === 'challenges' && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Aktif Meydan Okumalar</h2>
          {challenges.map((challenge) => (
            <div key={challenge.id} className="bg-white rounded-lg border p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-semibold text-gray-800">{challenge.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(challenge.category)}`}>
                      {challenge.category === 'daily' ? 'Günlük' : 
                       challenge.category === 'weekly' ? 'Haftalık' : 'Aylık'}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-3">{challenge.description}</p>
                  
                  <div className="flex items-center space-x-4">
                    <div className="flex-1">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>İlerleme</span>
                        <span>{challenge.progress}/{challenge.maxProgress}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${
                            challenge.completed ? 'bg-green-500' : 'bg-blue-500'
                          }`}
                          style={{ width: `${(challenge.progress / challenge.maxProgress) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1 text-yellow-600">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="font-semibold">{challenge.points}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {challenge.completed && (
                  <div className="ml-4">
                    <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      Tamamlandı
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'badges' && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Rozet Koleksiyonu</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {badges.map((badge) => (
              <div key={badge.id} className={`bg-white rounded-lg border p-6 text-center transition-all ${
                badge.earned ? 'hover:shadow-md' : 'opacity-60'
              }`}>
                <div className="text-4xl mb-3">{badge.icon}</div>
                <h3 className="font-semibold text-gray-800 mb-2">{badge.name}</h3>
                <p className="text-gray-600 text-sm mb-3">{badge.description}</p>
                
                {badge.earned ? (
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    Kazanıldı • {badge.earnedDate}
                  </div>
                ) : (
                  <div className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                    Henüz Kazanılmadı
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'leaderboard' && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Bu Ayın Liderleri</h2>
          <div className="bg-white rounded-lg border overflow-hidden">
            {leaderboard.map((user, index) => (
              <div key={user.id} className={`flex items-center p-4 ${
                index !== leaderboard.length - 1 ? 'border-b' : ''
              } hover:bg-gray-50 transition-colors`}>
                <div className={`text-2xl font-bold w-12 text-center ${getRankColor(user.rank)}`}>
                  {user.rank === 1 ? '🥇' : user.rank === 2 ? '🥈' : user.rank === 3 ? '🥉' : user.rank}
                </div>
                
                <img 
                  src={user.avatar} 
                  alt={user.name}
                  className="w-12 h-12 rounded-full mx-4"
                />
                
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">{user.name}</h3>
                  <p className="text-gray-600 text-sm">Seviye {user.level}</p>
                </div>
                
                <div className="text-right">
                  <div className="flex items-center space-x-1 text-yellow-600">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="font-bold">{user.points.toLocaleString()}</span>
                  </div>
                  <div className="text-gray-500 text-sm">puan</div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center py-4">
            <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
              Tam Lider Tablosunu Gör
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityGamification;