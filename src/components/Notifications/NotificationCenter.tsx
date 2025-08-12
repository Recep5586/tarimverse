import React, { useState, useEffect } from 'react';
import { Bell, Heart, MessageCircle, UserPlus, Award, X, Check, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '../../store/authStore';
import { formatDistanceToNow } from 'date-fns';
import { tr } from 'date-fns/locale';

interface Notification {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'achievement' | 'reminder';
  title: string;
  message: string;
  read: boolean;
  created_at: string;
  user?: {
    name: string;
    avatar_url?: string;
  };
}

export default function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const { user } = useAuthStore();

  useEffect(() => {
    // Mock notifications
    setNotifications([
      {
        id: '1',
        type: 'like',
        title: 'Gönderiniz beğenildi',
        message: 'Ahmet Karaca domates hasadı gönderinizi beğendi',
        read: false,
        created_at: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
        user: {
          name: 'Ahmet Karaca',
          avatar_url: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'
        }
      },
      {
        id: '2',
        type: 'comment',
        title: 'Yeni yorum',
        message: 'Fatma Öztürk gönderinize yorum yaptı: "Harika görünüyor!"',
        read: false,
        created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        user: {
          name: 'Fatma Öztürk',
          avatar_url: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'
        }
      },
      {
        id: '3',
        type: 'follow',
        title: 'Yeni takipçi',
        message: 'Mehmet Demir sizi takip etmeye başladı',
        read: true,
        created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        user: {
          name: 'Mehmet Demir',
          avatar_url: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'
        }
      },
      {
        id: '4',
        type: 'achievement',
        title: 'Yeni başarı kazandınız!',
        message: '"İlk Hasat" başarısını kazandınız',
        read: true,
        created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: '5',
        type: 'reminder',
        title: 'Hasat zamanı yaklaşıyor',
        message: 'Domates ekiminizin hasat zamanı 3 gün sonra',
        read: false,
        created_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString()
      }
    ]);
  }, []);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'like': return Heart;
      case 'comment': return MessageCircle;
      case 'follow': return UserPlus;
      case 'achievement': return Award;
      case 'reminder': return Bell;
      default: return Bell;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'like': return 'text-red-500 bg-red-100';
      case 'comment': return 'text-blue-500 bg-blue-100';
      case 'follow': return 'text-green-500 bg-green-100';
      case 'achievement': return 'text-yellow-500 bg-yellow-100';
      case 'reminder': return 'text-purple-500 bg-purple-100';
      default: return 'text-gray-500 bg-gray-100';
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const filteredNotifications = filter === 'unread' 
    ? notifications.filter(n => !n.read)
    : notifications;

  const unreadCount = notifications.filter(n => !n.read).length;

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-green-200/50 p-12">
          <Bell className="h-16 w-16 text-green-400 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Bildirimler</h2>
          <p className="text-gray-600">Bildirimlerinizi görüntülemek için giriş yapmalısınız.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-green-200/50 p-8 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Bell className="h-8 w-8 text-green-600" />
              {unreadCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Bildirimler</h1>
              <p className="text-green-600">
                {unreadCount > 0 ? `${unreadCount} okunmamış bildirim` : 'Tüm bildirimler okundu'}
              </p>
            </div>
          </div>

          <div className="flex space-x-3">
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="flex items-center space-x-2 bg-green-100 text-green-700 px-4 py-2 rounded-2xl hover:bg-green-200 transition-colors"
              >
                <Check className="h-4 w-4" />
                <span>Tümünü Okundu İşaretle</span>
              </button>
            )}
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex space-x-2">
          {[
            { id: 'all', label: 'Tümü', count: notifications.length },
            { id: 'unread', label: 'Okunmamış', count: unreadCount }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as 'all' | 'unread')}
              className={`flex items-center space-x-2 px-6 py-3 rounded-2xl transition-all duration-300 ${
                filter === tab.id
                  ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg'
                  : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              <span className="font-medium">{tab.label}</span>
              <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                filter === tab.id ? 'bg-white/20' : 'bg-gray-200 text-gray-600'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        <AnimatePresence>
          {filteredNotifications.length === 0 ? (
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-green-200/50 p-12 text-center">
              <Bell className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {filter === 'unread' ? 'Okunmamış bildirim yok' : 'Henüz bildirim yok'}
              </h3>
              <p className="text-gray-600">
                {filter === 'unread' 
                  ? 'Tüm bildirimlerinizi okudunuz!' 
                  : 'Yeni bildirimler burada görünecek'
                }
              </p>
            </div>
          ) : (
            filteredNotifications.map((notification, index) => {
              const IconComponent = getNotificationIcon(notification.type);
              return (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 ${
                    !notification.read ? 'ring-2 ring-green-200' : ''
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-xl ${getNotificationColor(notification.type)}`}>
                      <IconComponent className="h-6 w-6" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className={`font-bold ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                            {notification.title}
                          </h3>
                          <p className={`text-sm mt-1 ${!notification.read ? 'text-gray-700' : 'text-gray-600'}`}>
                            {notification.message}
                          </p>
                          
                          {notification.user && (
                            <div className="flex items-center space-x-2 mt-3">
                              <img
                                src={notification.user.avatar_url || 'https://images.pexels.com/photos/1139743/pexels-photo-1139743.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'}
                                alt={notification.user.name}
                                className="h-6 w-6 rounded-full border border-gray-300"
                              />
                              <span className="text-xs text-gray-500">{notification.user.name}</span>
                            </div>
                          )}
                          
                          <p className="text-xs text-gray-500 mt-2">
                            {formatDistanceToNow(new Date(notification.created_at), { addSuffix: true, locale: tr })}
                          </p>
                        </div>

                        <div className="flex items-center space-x-2">
                          {!notification.read && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="p-2 text-green-600 hover:bg-green-100 rounded-xl transition-colors"
                              title="Okundu işaretle"
                            >
                              <Check className="h-4 w-4" />
                            </button>
                          )}
                          <button
                            onClick={() => deleteNotification(notification.id)}
                            className="p-2 text-red-600 hover:bg-red-100 rounded-xl transition-colors"
                            title="Sil"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}