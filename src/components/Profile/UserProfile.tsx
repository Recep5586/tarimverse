import React, { useState, useEffect } from 'react';
import { User, MapPin, Calendar, Award, Edit, Camera, Settings, Share, Heart, MessageCircle, Users, Leaf, TrendingUp, Star, Bell, Activity } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { usePostStore } from '../../store/postStore';
import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import { tr } from 'date-fns/locale';

export default function UserProfile() {
  const { user, updateProfile } = useAuthStore();
  const { posts } = usePostStore();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('posts');
  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    bio: user?.bio || '',
    location: user?.location || ''
  });

  const userPosts = posts.filter(post => post.user_id === user?.id);
  const userStats = {
    posts: userPosts.length,
    followers: user?.followers_count || 0,
    following: user?.following_count || 0,
    totalLikes: userPosts.reduce((sum, post) => sum + post.likes_count, 0)
  };

  const handleSaveProfile = async () => {
    if (user) {
      await updateProfile(profileForm);
      setIsEditing(false);
    }
  };

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-green-200/50 p-12">
          <User className="h-16 w-16 text-green-400 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Profil</h2>
          <p className="text-gray-600">Profilinizi görüntülemek için giriş yapmalısınız.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl p-8 text-white shadow-2xl mb-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
        
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <img
                  src={user.avatar_url || 'https://images.pexels.com/photos/1139743/pexels-photo-1139743.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1'}
                  alt={user.name}
                  className="h-32 w-32 rounded-3xl border-4 border-white shadow-2xl"
                />
                <button className="absolute bottom-2 right-2 bg-white text-green-600 p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors">
                  <Camera className="h-4 w-4" />
                </button>
              </div>
              
              <div>
                {isEditing ? (
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={profileForm.name}
                      onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                      className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl px-4 py-2 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                      placeholder="Adınız"
                    />
                    <input
                      type="text"
                      value={profileForm.location}
                      onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                      className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl px-4 py-2 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                      placeholder="Konum"
                    />
                    <textarea
                      value={profileForm.bio}
                      onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                      className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl px-4 py-2 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 resize-none"
                      rows={3}
                      placeholder="Hakkınızda"
                    />
                    <div className="flex space-x-2">
                      <button
                        onClick={handleSaveProfile}
                        className="bg-white text-green-600 px-4 py-2 rounded-xl font-medium hover:bg-gray-100 transition-colors"
                      >
                        Kaydet
                      </button>
                      <button
                        onClick={() => setIsEditing(false)}
                        className="bg-white/20 text-white px-4 py-2 rounded-xl font-medium hover:bg-white/30 transition-colors"
                      >
                        İptal
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
                    {user.location && (
                      <div className="flex items-center space-x-2 text-green-100 mb-2">
                        <MapPin className="h-5 w-5" />
                        <span>{user.location}</span>
                      </div>
                    )}
                    {user.bio && (
                      <p className="text-green-100 mb-4 max-w-md">{user.bio}</p>
                    )}
                    <div className="flex items-center space-x-2 text-green-100">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {formatDistanceToNow(new Date(user.created_at), { addSuffix: true, locale: tr })} katıldı
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-xl hover:bg-white/30 transition-colors"
              >
                <Edit className="h-5 w-5" />
              </button>
              <button className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-xl hover:bg-white/30 transition-colors">
                <Share className="h-5 w-5" />
              </button>
              <button className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-xl hover:bg-white/30 transition-colors">
                <Settings className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-6">
            {[
              { label: 'Gönderi', value: userStats.posts, icon: MessageCircle },
              { label: 'Takipçi', value: userStats.followers, icon: Users },
              { label: 'Takip', value: userStats.following, icon: User },
              { label: 'Beğeni', value: userStats.totalLikes, icon: Heart }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-1">
                  <stat.icon className="h-5 w-5" />
                  <span className="text-2xl font-bold">{stat.value}</span>
                </div>
                <span className="text-green-100 text-sm">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-green-200/50 p-2 mb-8">
        <div className="flex space-x-2">
          {[
            { id: 'posts', label: 'Gönderiler', icon: MessageCircle },
            { id: 'achievements', label: 'Başarılar', icon: Award },
            { id: 'gardens', label: 'Bahçelerim', icon: Leaf },
            { id: 'activity', label: 'Aktiviteler', icon: Activity },
            { id: 'settings', label: 'Ayarlar', icon: Settings }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-2xl transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg'
                  : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              <tab.icon className="h-5 w-5" />
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-green-200/50 p-8">
        {activeTab === 'posts' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Gönderilerim</h2>
            {userPosts.length === 0 ? (
              <div className="text-center py-12">
                <MessageCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Henüz gönderi yok</h3>
                <p className="text-gray-600">İlk gönderinizi paylaşın!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gradient-to-br from-white to-gray-50 rounded-2xl border border-gray-200 p-4 hover:shadow-lg transition-all duration-300"
                  >
                    {post.image_url && (
                      <img
                        src={post.image_url}
                        alt="Post"
                        className="w-full h-32 object-cover rounded-xl mb-3"
                      />
                    )}
                    <p className="text-gray-700 text-sm line-clamp-3 mb-3">{post.content}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{formatDistanceToNow(new Date(post.created_at), { addSuffix: true, locale: tr })}</span>
                      <div className="flex items-center space-x-3">
                        <span className="flex items-center space-x-1">
                          <Heart className="h-3 w-3" />
                          <span>{post.likes_count}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <MessageCircle className="h-3 w-3" />
                          <span>{post.comments_count}</span>
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'achievements' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Başarılarım</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: 'İlk Gönderi', description: 'İlk gönderinizi paylaştınız', icon: '🌱', earned: true },
                { title: 'Sosyal Kelebek', description: '10 kişiyi takip ettiniz', icon: '🦋', earned: true },
                { title: 'Popüler İçerik', description: '100 beğeni aldınız', icon: '⭐', earned: false },
                { title: 'Bahçe Ustası', description: '5 bahçe planı oluşturdunuz', icon: '🌿', earned: false }
              ].map((achievement, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
                    achievement.earned
                      ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200'
                      : 'bg-gray-50 border-gray-200 opacity-60'
                  }`}
                >
                  <div className="text-4xl mb-3">{achievement.icon}</div>
                  <h3 className="font-bold text-gray-900 mb-2">{achievement.title}</h3>
                  <p className="text-gray-600 text-sm">{achievement.description}</p>
                  {achievement.earned && (
                    <div className="mt-3 flex items-center space-x-2 text-green-600">
                      <Award className="h-4 w-4" />
                      <span className="text-sm font-medium">Kazanıldı</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'gardens' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Bahçelerim</h2>
            <div className="text-center py-12">
              <Leaf className="h-16 w-16 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Henüz bahçe yok</h3>
              <p className="text-gray-600 mb-6">İlk bahçenizi oluşturun ve ekim planlarınızı yapın!</p>
              <button className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-2xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300">
                Bahçe Oluştur
              </button>
            </div>
          </div>
        )}

        {activeTab === 'activity' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Son Aktiviteler</h2>
            <div className="space-y-4">
              {[
                { action: 'Yeni gönderi paylaştı', time: '2 saat önce', icon: MessageCircle },
                { action: 'Bir gönderiyi beğendi', time: '5 saat önce', icon: Heart },
                { action: 'Yeni takipçi kazandı', time: '1 gün önce', icon: Users },
                { action: 'Profil fotoğrafını güncelledi', time: '3 gün önce', icon: Camera }
              ].map((activity, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-2xl">
                  <div className="p-2 bg-green-100 rounded-xl">
                    <activity.icon className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-900 font-medium">{activity.action}</p>
                    <p className="text-gray-500 text-sm">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Hesap Ayarları</h2>
            
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-4">Bildirim Tercihleri</h3>
                <div className="space-y-3">
                  {[
                    { label: 'E-posta bildirimleri', enabled: true },
                    { label: 'Push bildirimleri', enabled: true },
                    { label: 'Hasat hatırlatıcıları', enabled: true },
                    { label: 'Topluluk etkinlikleri', enabled: false },
                    { label: 'Pazar fırsatları', enabled: true }
                  ].map((setting, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-gray-700">{setting.label}</span>
                      <button className={`w-12 h-6 rounded-full transition-colors ${
                        setting.enabled ? 'bg-green-500' : 'bg-gray-300'
                      }`}>
                        <div className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform ${
                          setting.enabled ? 'translate-x-6' : 'translate-x-1'
                        }`}></div>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl p-6 border border-red-200">
                <h3 className="font-bold text-red-900 mb-4">Hesap İşlemleri</h3>
                <div className="space-y-3">
                  <button className="w-full text-left p-3 text-red-600 hover:bg-red-100 rounded-xl transition-colors">
                    Hesabı Geçici Olarak Dondur
                  </button>
                  <button className="w-full text-left p-3 text-red-700 hover:bg-red-100 rounded-xl transition-colors">
                    Hesabı Kalıcı Olarak Sil
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}