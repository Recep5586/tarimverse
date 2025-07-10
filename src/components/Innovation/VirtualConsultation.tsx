import React, { useState, useEffect } from 'react';
import { Video, Calendar, Clock, User, Star, MessageCircle, Phone, CheckCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../../store/authStore';

interface Consultation {
  id: string;
  expert_id: string;
  expert_name: string;
  expert_avatar: string;
  expert_rating: number;
  expert_specialization: string;
  consultation_type: 'general' | 'disease_diagnosis' | 'soil_analysis' | 'pest_control' | 'crop_planning';
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  scheduled_at: string;
  duration_minutes: number;
  price: number;
  meeting_url?: string;
  consultation_notes?: string;
  recommendations?: string[];
}

interface Expert {
  id: string;
  name: string;
  avatar: string;
  specialization: string;
  rating: number;
  reviews_count: number;
  experience_years: number;
  price_per_hour: number;
  available_times: string[];
  bio: string;
}

export default function VirtualConsultation() {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [experts, setExperts] = useState<Expert[]>([]);
  const [selectedExpert, setSelectedExpert] = useState<Expert | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [activeTab, setActiveTab] = useState('upcoming');
  const { user } = useAuthStore();

  useEffect(() => {
    // Mock consultations data
    setConsultations([
      {
        id: '1',
        expert_id: 'expert1',
        expert_name: 'Dr. Mehmet Özkan',
        expert_avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
        expert_rating: 4.8,
        expert_specialization: 'Bitki Hastalıkları',
        consultation_type: 'disease_diagnosis',
        status: 'scheduled',
        scheduled_at: '2024-07-15T14:00:00Z',
        duration_minutes: 30,
        price: 150,
        meeting_url: 'https://meet.tarimverse.com/room/abc123'
      },
      {
        id: '2',
        expert_id: 'expert2',
        expert_name: 'Prof. Dr. Ayşe Demir',
        expert_avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
        expert_rating: 4.9,
        expert_specialization: 'Toprak Bilimi',
        consultation_type: 'soil_analysis',
        status: 'completed',
        scheduled_at: '2024-07-10T10:00:00Z',
        duration_minutes: 45,
        price: 200,
        consultation_notes: 'Toprak analizi sonuçları değerlendirildi. pH seviyesi optimal.',
        recommendations: [
          'Organik gübre kullanımını artırın',
          'Toprak nemini düzenli kontrol edin',
          '3 ay sonra tekrar analiz yaptırın'
        ]
      }
    ]);

    // Mock experts data
    setExperts([
      {
        id: 'expert1',
        name: 'Dr. Mehmet Özkan',
        avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
        specialization: 'Bitki Hastalıkları',
        rating: 4.8,
        reviews_count: 127,
        experience_years: 15,
        price_per_hour: 300,
        available_times: ['09:00', '14:00', '16:00'],
        bio: '15 yıllık deneyime sahip bitki patolojisti. Organik tarım ve entegre mücadele konularında uzman.'
      },
      {
        id: 'expert2',
        name: 'Prof. Dr. Ayşe Demir',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
        specialization: 'Toprak Bilimi',
        rating: 4.9,
        reviews_count: 89,
        experience_years: 20,
        price_per_hour: 400,
        available_times: ['10:00', '13:00', '15:00'],
        bio: 'Toprak kimyası ve verimliliği konularında 20 yıllık akademik deneyim. Sürdürülebilir tarım uzmanı.'
      },
      {
        id: 'expert3',
        name: 'Mühendis Fatma Kaya',
        avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
        specialization: 'Zararlı Mücadelesi',
        rating: 4.7,
        reviews_count: 156,
        experience_years: 12,
        price_per_hour: 250,
        available_times: ['08:00', '11:00', '17:00'],
        bio: 'Entegre zararlı yönetimi ve biyolojik mücadele konularında uzman ziraat mühendisi.'
      }
    ]);
  }, []);

  const getConsultationTypeTitle = (type: string) => {
    switch (type) {
      case 'general': return 'Genel Danışmanlık';
      case 'disease_diagnosis': return 'Hastalık Teşhisi';
      case 'soil_analysis': return 'Toprak Analizi';
      case 'pest_control': return 'Zararlı Mücadelesi';
      case 'crop_planning': return 'Ekim Planlaması';
      default: return 'Danışmanlık';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'in_progress': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'scheduled': return 'Planlandı';
      case 'in_progress': return 'Devam Ediyor';
      case 'completed': return 'Tamamlandı';
      case 'cancelled': return 'İptal Edildi';
      default: return status;
    }
  };

  const upcomingConsultations = consultations.filter(c => c.status === 'scheduled' || c.status === 'in_progress');
  const pastConsultations = consultations.filter(c => c.status === 'completed' || c.status === 'cancelled');

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-green-200/50 p-12">
          <Video className="h-16 w-16 text-green-400 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Sanal Danışmanlık</h2>
          <p className="text-gray-600 mb-6">Uzman danışmanlık hizmetlerinden faydalanmak için giriş yapmalısınız.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 text-white shadow-2xl mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2 flex items-center">
              <Video className="h-8 w-8 mr-3" />
              Sanal Danışmanlık
            </h1>
            <p className="text-blue-100">Uzman tarım mühendisleri ile birebir görüşme</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{consultations.length}</div>
            <div className="text-blue-200 text-sm">Toplam Görüşme</div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-green-200/50 p-2 mb-8">
        <div className="flex space-x-2">
          {[
            { id: 'upcoming', label: 'Yaklaşan Görüşmeler', count: upcomingConsultations.length },
            { id: 'experts', label: 'Uzmanlar', count: experts.length },
            { id: 'past', label: 'Geçmiş Görüşmeler', count: pastConsultations.length }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-2xl transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg'
                  : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              <span className="font-medium">{tab.label}</span>
              <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                activeTab === tab.id ? 'bg-white/20' : 'bg-gray-200 text-gray-600'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {activeTab === 'upcoming' && (
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-green-200/50 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Yaklaşan Görüşmeler</h2>
          
          {upcomingConsultations.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Planlanmış görüşme yok</h3>
              <p className="text-gray-600 mb-6">Uzmanlarımızla görüşme planlayın!</p>
              <button
                onClick={() => setActiveTab('experts')}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-2xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-300"
              >
                Uzmanları Görüntüle
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {upcomingConsultations.map((consultation, index) => (
                <motion.div
                  key={consultation.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-4">
                      <img
                        src={consultation.expert_avatar}
                        alt={consultation.expert_name}
                        className="h-16 w-16 rounded-2xl border-2 border-blue-300"
                      />
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg">{consultation.expert_name}</h3>
                        <p className="text-blue-600 font-medium">{consultation.expert_specialization}</p>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(consultation.scheduled_at).toLocaleDateString('tr-TR')}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{new Date(consultation.scheduled_at).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <span>{consultation.expert_rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(consultation.status)}`}>
                        {getStatusText(consultation.status)}
                      </span>
                      <div className="mt-2 text-lg font-bold text-gray-900">₺{consultation.price}</div>
                      <div className="text-sm text-gray-600">{consultation.duration_minutes} dakika</div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-blue-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900">{getConsultationTypeTitle(consultation.consultation_type)}</h4>
                        {consultation.meeting_url && (
                          <p className="text-sm text-blue-600 mt-1">Görüşme linki hazır</p>
                        )}
                      </div>
                      <div className="flex space-x-3">
                        {consultation.meeting_url && (
                          <button className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300">
                            <Video className="h-4 w-4" />
                            <span>Katıl</span>
                          </button>
                        )}
                        <button className="flex items-center space-x-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-xl hover:bg-gray-200 transition-colors">
                          <MessageCircle className="h-4 w-4" />
                          <span>Mesaj</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'experts' && (
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-green-200/50 p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Uzman Danışmanlar</h2>
            <div className="text-sm text-gray-600">
              {experts.length} uzman mevcut
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {experts.map((expert, index) => (
              <motion.div
                key={expert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-white to-gray-50 rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 group"
              >
                <div className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <img
                      src={expert.avatar}
                      alt={expert.name}
                      className="h-16 w-16 rounded-2xl border-2 border-blue-300"
                    />
                    <div>
                      <h3 className="font-bold text-gray-900">{expert.name}</h3>
                      <p className="text-blue-600 font-medium text-sm">{expert.specialization}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span className="text-sm font-medium">{expert.rating}</span>
                        </div>
                        <span className="text-xs text-gray-500">({expert.reviews_count} değerlendirme)</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{expert.bio}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Deneyim:</span>
                      <span className="font-medium">{expert.experience_years} yıl</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Ücret:</span>
                      <span className="font-medium text-green-600">₺{expert.price_per_hour}/saat</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-800 mb-2">Müsait Saatler:</h4>
                    <div className="flex flex-wrap gap-2">
                      {expert.available_times.map((time, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-blue-100 text-blue-800 rounded-lg text-xs font-medium"
                        >
                          {time}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedExpert(expert);
                      setShowBookingModal(true);
                    }}
                    className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 font-medium"
                  >
                    Randevu Al
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'past' && (
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-green-200/50 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Geçmiş Görüşmeler</h2>
          
          {pastConsultations.length === 0 ? (
            <div className="text-center py-12">
              <CheckCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Henüz tamamlanmış görüşme yok</h3>
              <p className="text-gray-600">İlk danışmanlığınızı alın!</p>
            </div>
          ) : (
            <div className="space-y-6">
              {pastConsultations.map((consultation, index) => (
                <motion.div
                  key={consultation.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <img
                        src={consultation.expert_avatar}
                        alt={consultation.expert_name}
                        className="h-12 w-12 rounded-xl border-2 border-gray-300"
                      />
                      <div>
                        <h3 className="font-bold text-gray-900">{consultation.expert_name}</h3>
                        <p className="text-gray-600 text-sm">{consultation.expert_specialization}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(consultation.scheduled_at).toLocaleDateString('tr-TR')}
                        </p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(consultation.status)}`}>
                      {getStatusText(consultation.status)}
                    </span>
                  </div>

                  {consultation.consultation_notes && (
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Görüşme Notları:</h4>
                      <p className="text-gray-700 text-sm bg-white p-3 rounded-xl">
                        {consultation.consultation_notes}
                      </p>
                    </div>
                  )}

                  {consultation.recommendations && consultation.recommendations.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Öneriler:</h4>
                      <ul className="space-y-1">
                        {consultation.recommendations.map((recommendation, idx) => (
                          <li key={idx} className="flex items-center text-sm text-gray-700">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                            {recommendation}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}