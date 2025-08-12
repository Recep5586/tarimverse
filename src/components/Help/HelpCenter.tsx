import React, { useState } from 'react';
import { Search, HelpCircle, Book, MessageCircle, Phone, Mail, ChevronRight, Star, ThumbsUp, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  helpful: number;
}

interface SupportTicket {
  id: string;
  subject: string;
  status: 'open' | 'in_progress' | 'resolved';
  priority: 'low' | 'medium' | 'high';
  created_at: string;
  last_update: string;
}

export default function HelpCenter() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('faq');

  const categories = [
    { id: 'all', label: 'Tümü' },
    { id: 'account', label: 'Hesap' },
    { id: 'planting', label: 'Ekim' },
    { id: 'market', label: 'Pazar' },
    { id: 'technical', label: 'Teknik' }
  ];

  const faqItems: FAQItem[] = [
    {
      id: '1',
      question: 'TarımVerse\'e nasıl kayıt olabilirim?',
      answer: 'Ana sayfadaki "Kayıt Ol" butonuna tıklayarak e-posta adresiniz ve şifrenizle hesap oluşturabilirsiniz. Kayıt işlemi tamamen ücretsizdir.',
      category: 'account',
      helpful: 45
    },
    {
      id: '2',
      question: 'Ekim takvimi nasıl kullanılır?',
      answer: 'Ekim Takvimi sayfasında bölgenizi seçerek o bölge için uygun ekim zamanlarını görebilirsiniz. Her ürün için detaylı bilgi ve ipuçları mevcuttur.',
      category: 'planting',
      helpful: 38
    },
    {
      id: '3',
      question: 'Pazarda ürün nasıl satarım?',
      answer: 'Yerel Pazar sayfasında "Ürün Ekle" butonuna tıklayarak ürününüzün fotoğrafını, açıklamasını ve fiyatını ekleyebilirsiniz.',
      category: 'market',
      helpful: 52
    },
    {
      id: '4',
      question: 'Akıllı tarım özelliklerini nasıl kullanabilirim?',
      answer: 'Akıllı Tarım bölümünde IoT sensörlerinizi bağlayabilir, otomasyon kuralları oluşturabilir ve AI önerilerini alabilirsiniz.',
      category: 'technical',
      helpful: 29
    },
    {
      id: '5',
      question: 'Hesabımı nasıl silebilirim?',
      answer: 'Ayarlar > Hesap bölümünden hesabınızı kalıcı olarak silebilirsiniz. Bu işlem geri alınamaz.',
      category: 'account',
      helpful: 15
    }
  ];

  const supportTickets: SupportTicket[] = [
    {
      id: 'T001',
      subject: 'Fotoğraf yükleme sorunu',
      status: 'in_progress',
      priority: 'medium',
      created_at: '2024-06-15T10:00:00Z',
      last_update: '2024-06-16T14:30:00Z'
    },
    {
      id: 'T002',
      subject: 'Pazar ürünü görünmüyor',
      status: 'resolved',
      priority: 'high',
      created_at: '2024-06-10T09:15:00Z',
      last_update: '2024-06-11T16:45:00Z'
    }
  ];

  const filteredFAQs = faqItems.filter(item => {
    const matchesSearch = item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-blue-100 text-blue-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'open': return 'Açık';
      case 'in_progress': return 'İşlemde';
      case 'resolved': return 'Çözüldü';
      default: return status;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 text-white shadow-2xl mb-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2 flex items-center justify-center">
            <HelpCircle className="h-8 w-8 mr-3" />
            Yardım Merkezi
          </h1>
          <p className="text-blue-100 mb-6">Size nasıl yardımcı olabiliriz?</p>
          
          {/* Search */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-300" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Sorunuzu arayın..."
              className="w-full pl-14 pr-6 py-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl focus:outline-none focus:ring-4 focus:ring-white/20 focus:border-white/50 text-white placeholder-blue-200 transition-all duration-300"
            />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          {
            title: 'Sık Sorulan Sorular',
            description: 'En çok merak edilen konular',
            icon: Book,
            action: () => setActiveTab('faq'),
            color: 'from-green-400 to-emerald-500'
          },
          {
            title: 'Canlı Destek',
            description: '7/24 anlık yardım',
            icon: MessageCircle,
            action: () => setActiveTab('chat'),
            color: 'from-blue-400 to-indigo-500'
          },
          {
            title: 'Telefon Desteği',
            description: 'Doğrudan görüşme',
            icon: Phone,
            action: () => window.open('tel:+902125550123'),
            color: 'from-purple-400 to-pink-500'
          }
        ].map((action, index) => (
          <motion.button
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={action.action}
            className={`bg-gradient-to-r ${action.color} rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-left`}
          >
            <action.icon className="h-8 w-8 mb-4" />
            <h3 className="font-bold text-lg mb-2">{action.title}</h3>
            <p className="text-white/90 text-sm">{action.description}</p>
          </motion.button>
        ))}
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-green-200/50 p-2 mb-8">
        <div className="flex space-x-2">
          {[
            { id: 'faq', label: 'Sık Sorulan Sorular', icon: HelpCircle },
            { id: 'tickets', label: 'Destek Talepleri', icon: MessageCircle },
            { id: 'contact', label: 'İletişim', icon: Mail }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-2xl transition-all duration-300 flex-1 justify-center ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg'
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
      {activeTab === 'faq' && (
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-green-200/50 p-8">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-2xl transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* FAQ List */}
          <div className="space-y-4">
            {filteredFAQs.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border border-gray-200 rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                  className="w-full flex items-center justify-between p-6 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
                >
                  <h3 className="font-semibold text-gray-900">{faq.question}</h3>
                  <ChevronRight className={`h-5 w-5 text-gray-500 transition-transform ${
                    expandedFAQ === faq.id ? 'rotate-90' : ''
                  }`} />
                </button>
                
                {expandedFAQ === faq.id && (
                  <div className="p-6 bg-white border-t border-gray-200">
                    <p className="text-gray-700 mb-4">{faq.answer}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <button className="flex items-center space-x-1 hover:text-green-600 transition-colors">
                          <ThumbsUp className="h-4 w-4" />
                          <span>Faydalı ({faq.helpful})</span>
                        </button>
                      </div>
                      <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
                        {faq.category}
                      </span>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {filteredFAQs.length === 0 && (
            <div className="text-center py-12">
              <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Sonuç bulunamadı</h3>
              <p className="text-gray-600">Arama teriminizi değiştirmeyi deneyin</p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'tickets' && (
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-green-200/50 p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Destek Talepleri</h2>
            <button className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-2xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-300">
              Yeni Talep Oluştur
            </button>
          </div>

          <div className="space-y-4">
            {supportTickets.map((ticket, index) => (
              <motion.div
                key={ticket.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-6 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors"
              >
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{ticket.subject}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>#{ticket.id}</span>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{new Date(ticket.created_at).toLocaleDateString('tr-TR')}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    ticket.priority === 'high' ? 'bg-red-100 text-red-800' :
                    ticket.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {ticket.priority === 'high' ? 'Yüksek' :
                     ticket.priority === 'medium' ? 'Orta' : 'Düşük'}
                  </span>
                  
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(ticket.status)}`}>
                    {getStatusText(ticket.status)}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {supportTickets.length === 0 && (
            <div className="text-center py-12">
              <MessageCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Henüz destek talebi yok</h3>
              <p className="text-gray-600">Sorunlarınız için destek talebi oluşturabilirsiniz</p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'contact' && (
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-green-200/50 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">İletişim Bilgileri</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-2xl">
                <div className="bg-blue-500 p-3 rounded-xl">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">E-posta</h3>
                  <p className="text-gray-600">destek@tarimverse.com</p>
                  <p className="text-sm text-gray-500">24 saat içinde yanıt</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-2xl">
                <div className="bg-green-500 p-3 rounded-xl">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Telefon</h3>
                  <p className="text-gray-600">+90 (212) 555-0123</p>
                  <p className="text-sm text-gray-500">Pazartesi-Cuma 09:00-18:00</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-purple-50 rounded-2xl">
                <div className="bg-purple-500 p-3 rounded-xl">
                  <MessageCircle className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Canlı Destek</h3>
                  <p className="text-gray-600">Anlık mesajlaşma</p>
                  <p className="text-sm text-gray-500">7/24 aktif</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6">
              <h3 className="font-bold text-gray-900 mb-4">Bize Mesaj Gönderin</h3>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Konu"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                  placeholder="Mesajınız"
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 font-medium"
                >
                  Mesaj Gönder
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}