import React, { useState } from 'react';
import { Settings, Bell, Shield, Globe, Palette, Download, Trash2, User, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../../store/authStore';
import toast from 'react-hot-toast';
import DemoData from '../Demo/DemoData';

export default function UserSettings() {
  const [activeSection, setActiveSection] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const { user, updateProfile, signOut } = useAuthStore();

  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: user?.bio || '',
    location: user?.location || ''
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    harvestReminders: true,
    communityEvents: false,
    marketOpportunities: true,
    weatherAlerts: true
  });

  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'public',
    showLocation: true,
    showEmail: false,
    allowMessages: true,
    showActivity: true
  });

  const sections = [
    { id: 'profile', label: 'Profil Bilgileri', icon: User },
    { id: 'notifications', label: 'Bildirimler', icon: Bell },
    { id: 'privacy', label: 'Gizlilik', icon: Shield },
    { id: 'appearance', label: 'Görünüm', icon: Palette },
    { id: 'data', label: 'Veri Yönetimi', icon: Download },
    { id: 'account', label: 'Hesap', icon: Settings }
  ];

  const handleSaveProfile = async () => {
    try {
      await updateProfile(profileForm);
      toast.success('Profil güncellendi! 🌱');
    } catch (error) {
      toast.error('Profil güncellenirken hata oluştu');
    }
  };

  const handleExportData = () => {
    toast.success('Verileriniz e-posta adresinize gönderilecek');
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Hesabınızı kalıcı olarak silmek istediğinizden emin misiniz?')) {
      toast.error('Hesap silme işlemi için destek ekibiyle iletişime geçin');
    }
  };

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-green-200/50 p-12">
          <Settings className="h-16 w-16 text-green-400 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ayarlar</h2>
          <p className="text-gray-600">Ayarlarınızı yönetmek için giriş yapmalısınız.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-600 to-gray-800 rounded-3xl p-8 text-white shadow-2xl mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center">
          <Settings className="h-8 w-8 mr-3" />
          Hesap Ayarları
        </h1>
        <p className="text-gray-300">Hesabınızı ve tercihlerinizi yönetin</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-green-200/50 p-6">
            <nav className="space-y-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center space-x-3 p-4 rounded-2xl transition-all duration-300 ${
                    activeSection === section.id
                      ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg'
                      : 'hover:bg-gray-100 text-gray-600'
                  }`}
                >
                  <section.icon className="h-5 w-5" />
                  <span className="font-medium">{section.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-green-200/50 p-8">
            {activeSection === 'profile' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Profil Bilgileri</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Ad Soyad</label>
                    <input
                      type="text"
                      value={profileForm.name}
                      onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                      className="w-full px-4 py-3 bg-white/70 border-2 border-green-200/50 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-500/20 focus:border-green-400 transition-all duration-300"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">E-posta</label>
                    <input
                      type="email"
                      value={profileForm.email}
                      onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                      className="w-full px-4 py-3 bg-white/70 border-2 border-green-200/50 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-500/20 focus:border-green-400 transition-all duration-300"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Konum</label>
                    <input
                      type="text"
                      value={profileForm.location}
                      onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                      className="w-full px-4 py-3 bg-white/70 border-2 border-green-200/50 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-500/20 focus:border-green-400 transition-all duration-300"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Hakkımda</label>
                  <textarea
                    value={profileForm.bio}
                    onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 bg-white/70 border-2 border-green-200/50 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-500/20 focus:border-green-400 transition-all duration-300"
                    placeholder="Kendinizi tanıtın..."
                  />
                </div>

                <button
                  onClick={handleSaveProfile}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-3 rounded-2xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 font-medium"
                >
                  Değişiklikleri Kaydet
                </button>
              </motion.div>
            )}

            {activeSection === 'notifications' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Bildirim Tercihleri</h2>
                
                <div className="space-y-4">
                  {Object.entries(notificationSettings).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {key === 'emailNotifications' ? 'E-posta Bildirimleri' :
                           key === 'pushNotifications' ? 'Push Bildirimleri' :
                           key === 'harvestReminders' ? 'Hasat Hatırlatıcıları' :
                           key === 'communityEvents' ? 'Topluluk Etkinlikleri' :
                           key === 'marketOpportunities' ? 'Pazar Fırsatları' :
                           'Hava Durumu Uyarıları'}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {key === 'emailNotifications' ? 'E-posta ile bildirim alın' :
                           key === 'pushNotifications' ? 'Tarayıcı bildirimleri' :
                           key === 'harvestReminders' ? 'Hasat zamanı hatırlatmaları' :
                           key === 'communityEvents' ? 'Topluluk etkinlik duyuruları' :
                           key === 'marketOpportunities' ? 'Pazar fırsatları ve fiyat değişimleri' :
                           'Hava durumu uyarıları ve tahminleri'}
                        </p>
                      </div>
                      <button
                        onClick={() => setNotificationSettings(prev => ({ ...prev, [key]: !value }))}
                        className={`w-12 h-6 rounded-full transition-colors ${
                          value ? 'bg-green-500' : 'bg-gray-300'
                        }`}
                      >
                        <div className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform ${
                          value ? 'translate-x-6' : 'translate-x-1'
                        }`}></div>
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeSection === 'privacy' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Gizlilik Ayarları</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Profil Görünürlüğü</label>
                    <div className="space-y-2">
                      {[
                        { value: 'public', label: 'Herkese Açık', description: 'Profiliniz herkese görünür' },
                        { value: 'followers', label: 'Sadece Takipçiler', description: 'Sadece takipçileriniz görebilir' },
                        { value: 'private', label: 'Özel', description: 'Sadece siz görebilirsiniz' }
                      ].map((option) => (
                        <label key={option.value} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
                          <input
                            type="radio"
                            name="profileVisibility"
                            value={option.value}
                            checked={privacySettings.profileVisibility === option.value}
                            onChange={(e) => setPrivacySettings(prev => ({ ...prev, profileVisibility: e.target.value }))}
                            className="text-green-600"
                          />
                          <div>
                            <p className="font-medium text-gray-900">{option.label}</p>
                            <p className="text-sm text-gray-600">{option.description}</p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    {Object.entries(privacySettings).filter(([key]) => key !== 'profileVisibility').map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {key === 'showLocation' ? 'Konumu Göster' :
                             key === 'showEmail' ? 'E-posta Göster' :
                             key === 'allowMessages' ? 'Mesajlara İzin Ver' :
                             'Aktiviteyi Göster'}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {key === 'showLocation' ? 'Konumunuz profilinizde görünsün' :
                             key === 'showEmail' ? 'E-posta adresiniz herkese görünsün' :
                             key === 'allowMessages' ? 'Diğer kullanıcılar size mesaj gönderebilsin' :
                             'Son aktiviteleriniz profilinizde görünsün'}
                          </p>
                        </div>
                        <button
                          onClick={() => setPrivacySettings(prev => ({ ...prev, [key]: !value }))}
                          className={`w-12 h-6 rounded-full transition-colors ${
                            value ? 'bg-green-500' : 'bg-gray-300'
                          }`}
                        >
                          <div className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform ${
                            value ? 'translate-x-6' : 'translate-x-1'
                          }`}></div>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeSection === 'data' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Veri Yönetimi</h2>
                
                <div className="space-y-6">
                  <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
                    <h3 className="font-bold text-blue-900 mb-4">Verilerimi İndir</h3>
                    <p className="text-blue-700 text-sm mb-4">
                      Tüm verilerinizi JSON formatında indirin. Bu, gönderileriniz, yorumlarınız, bahçe planlarınız ve diğer tüm verilerinizi içerir.
                    </p>
                    <button
                      onClick={handleExportData}
                      className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-2xl hover:bg-blue-700 transition-colors"
                    >
                      <Download className="h-5 w-5" />
                      <span>Verilerimi İndir</span>
                    </button>
                  </div>

                  <div className="bg-red-50 rounded-2xl p-6 border border-red-200">
                    <h3 className="font-bold text-red-900 mb-4">Hesabı Sil</h3>
                    <p className="text-red-700 text-sm mb-4">
                      Hesabınızı kalıcı olarak silmek istiyorsanız, tüm verileriniz geri döndürülemez şekilde silinecektir.
                    </p>
                    <button
                      onClick={handleDeleteAccount}
                      className="flex items-center space-x-2 bg-red-600 text-white px-6 py-3 rounded-2xl hover:bg-red-700 transition-colors"
                    >
                      <Trash2 className="h-5 w-5" />
                      <span>Hesabı Sil</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {activeSection === 'data' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Veri Yönetimi</h2>
                <DemoData />
              </motion.div>
            )}

            {activeSection === 'account' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Hesap Güvenliği</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Mevcut Şifre</label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        className="w-full px-4 py-3 bg-white/70 border-2 border-green-200/50 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-500/20 focus:border-green-400 transition-all duration-300"
                        placeholder="Mevcut şifrenizi girin"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Yeni Şifre</label>
                    <input
                      type="password"
                      className="w-full px-4 py-3 bg-white/70 border-2 border-green-200/50 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-500/20 focus:border-green-400 transition-all duration-300"
                      placeholder="Yeni şifrenizi girin"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Yeni Şifre (Tekrar)</label>
                    <input
                      type="password"
                      className="w-full px-4 py-3 bg-white/70 border-2 border-green-200/50 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-500/20 focus:border-green-400 transition-all duration-300"
                      placeholder="Yeni şifrenizi tekrar girin"
                    />
                  </div>

                  <button className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-3 rounded-2xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 font-medium">
                    Şifreyi Güncelle
                  </button>

                  <div className="pt-6 border-t border-gray-200">
                    <button
                      onClick={signOut}
                      className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-8 py-3 rounded-2xl hover:from-red-600 hover:to-pink-700 transition-all duration-300 font-medium"
                    >
                      Çıkış Yap
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}