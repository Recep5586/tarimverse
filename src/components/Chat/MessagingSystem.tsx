import React, { useState, useEffect } from 'react';
import { MessageCircle, Send, Search, Phone, Video, MoreVertical, Paperclip, Smile } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '../../store/authStore';
import { formatDistanceToNow } from 'date-fns';
import { tr } from 'date-fns/locale';

interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  message_type: 'text' | 'image' | 'file' | 'voice';
  file_url?: string;
  read: boolean;
  created_at: string;
  sender?: {
    name: string;
    avatar_url?: string;
  };
}

interface Conversation {
  id: string;
  participant: {
    id: string;
    name: string;
    avatar_url?: string;
    online: boolean;
  };
  lastMessage: Message;
  unreadCount: number;
}

export default function MessagingSystem() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const { user } = useAuthStore();

  useEffect(() => {
    // Mock conversations
    setConversations([
      {
        id: '1',
        participant: {
          id: 'user1',
          name: 'Ahmet Karaca',
          avatar_url: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
          online: true
        },
        lastMessage: {
          id: 'msg1',
          sender_id: 'user1',
          receiver_id: 'current_user',
          content: 'Domates ekimi hakkında sorularım var',
          message_type: 'text',
          read: false,
          created_at: new Date(Date.now() - 30 * 60 * 1000).toISOString()
        },
        unreadCount: 2
      },
      {
        id: '2',
        participant: {
          id: 'user2',
          name: 'Fatma Öztürk',
          avatar_url: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
          online: false
        },
        lastMessage: {
          id: 'msg2',
          sender_id: 'current_user',
          receiver_id: 'user2',
          content: 'Sera kurulumu için teşekkürler!',
          message_type: 'text',
          read: true,
          created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
        },
        unreadCount: 0
      }
    ]);
  }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedConversation) return;

    const message: Message = {
      id: Date.now().toString(),
      sender_id: 'current_user',
      receiver_id: selectedConversation,
      content: newMessage,
      message_type: 'text',
      read: false,
      created_at: new Date().toISOString(),
      sender: {
        name: user?.name || 'Sen',
        avatar_url: user?.avatar_url
      }
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-green-200/50 p-12">
          <MessageCircle className="h-16 w-16 text-green-400 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Mesajlaşma</h2>
          <p className="text-gray-600">Mesajlaşma özelliğini kullanmak için giriş yapmalısınız.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-green-200/50 overflow-hidden" style={{ height: '600px' }}>
        <div className="flex h-full">
          {/* Conversations List */}
          <div className="w-1/3 border-r border-gray-200 flex flex-col">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Mesajlar</h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Kişi ara..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-100 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {conversations.map((conversation) => (
                <button
                  key={conversation.id}
                  onClick={() => setSelectedConversation(conversation.id)}
                  className={`w-full p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors text-left ${
                    selectedConversation === conversation.id ? 'bg-green-50' : ''
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <img
                        src={conversation.participant.avatar_url || 'https://images.pexels.com/photos/1139743/pexels-photo-1139743.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'}
                        alt={conversation.participant.name}
                        className="h-12 w-12 rounded-full border-2 border-gray-300"
                      />
                      {conversation.participant.online && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-gray-900 truncate">{conversation.participant.name}</h3>
                        {conversation.unreadCount > 0 && (
                          <span className="bg-green-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                            {conversation.unreadCount}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 truncate">{conversation.lastMessage.content}</p>
                      <p className="text-xs text-gray-500">
                        {formatDistanceToNow(new Date(conversation.lastMessage.created_at), { addSuffix: true, locale: tr })}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {selectedConversation ? (
              <>
                {/* Chat Header */}
                <div className="p-6 border-b border-gray-200 bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img
                        src="https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1"
                        alt="User"
                        className="h-10 w-10 rounded-full"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-900">Ahmet Karaca</h3>
                        <p className="text-sm text-green-600">Çevrimiçi</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="p-2 text-gray-600 hover:bg-gray-200 rounded-xl">
                        <Phone className="h-5 w-5" />
                      </button>
                      <button className="p-2 text-gray-600 hover:bg-gray-200 rounded-xl">
                        <Video className="h-5 w-5" />
                      </button>
                      <button className="p-2 text-gray-600 hover:bg-gray-200 rounded-xl">
                        <MoreVertical className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {/* Sample messages */}
                  <div className="flex space-x-3">
                    <img
                      src="https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1"
                      alt="Sender"
                      className="h-8 w-8 rounded-full"
                    />
                    <div className="bg-gray-100 rounded-2xl px-4 py-2 max-w-xs">
                      <p className="text-gray-900">Merhaba! Domates ekimi hakkında sorularım var.</p>
                      <p className="text-xs text-gray-500 mt-1">10:30</p>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <div className="bg-green-500 text-white rounded-2xl px-4 py-2 max-w-xs">
                      <p>Merhaba! Tabii ki, nasıl yardımcı olabilirim?</p>
                      <p className="text-xs text-green-100 mt-1">10:32</p>
                    </div>
                  </div>
                </div>

                {/* Message Input */}
                <div className="p-6 border-t border-gray-200">
                  <form onSubmit={handleSendMessage} className="flex items-center space-x-3">
                    <button type="button" className="p-2 text-gray-600 hover:bg-gray-100 rounded-xl">
                      <Paperclip className="h-5 w-5" />
                    </button>
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Mesajınızı yazın..."
                        className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 pr-12"
                      />
                      <button type="button" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800">
                        <Smile className="h-5 w-5" />
                      </button>
                    </div>
                    <button
                      type="submit"
                      disabled={!newMessage.trim()}
                      className="bg-green-500 text-white p-3 rounded-xl hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <Send className="h-5 w-5" />
                    </button>
                  </form>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <MessageCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Mesajlaşma</h3>
                  <p className="text-gray-600">Bir konuşma seçin veya yeni sohbet başlatın</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}