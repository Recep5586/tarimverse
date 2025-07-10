import React, { useState, useEffect } from 'react';
import { Shield, Award, Download, Share, Eye, CheckCircle, Clock, Globe, QrCode } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../../store/authStore';

interface Certificate {
  id: string;
  certificate_type: 'organic' | 'sustainable' | 'carbon_neutral' | 'quality_grade' | 'yield_record';
  certificate_data: any;
  blockchain_hash: string;
  verification_url?: string;
  issuer_name: string;
  issued_at: string;
  expires_at?: string;
  is_verified: boolean;
  verification_count: number;
}

export default function BlockchainCertificates() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const { user } = useAuthStore();

  useEffect(() => {
    // Mock certificates for demo
    setCertificates([
      {
        id: '1',
        certificate_type: 'organic',
        certificate_data: {
          product: 'Organik Domates',
          quantity: '500 kg',
          harvest_date: '2024-06-15',
          certification_body: 'Organik Tarım Derneği'
        },
        blockchain_hash: '0x1a2b3c4d5e6f7890abcdef1234567890',
        verification_url: 'https://blockchain-verify.com/cert/1a2b3c4d',
        issuer_name: 'TarımVerse Sertifikasyon',
        issued_at: '2024-06-20T10:00:00Z',
        expires_at: '2025-06-20T10:00:00Z',
        is_verified: true,
        verification_count: 15
      },
      {
        id: '2',
        certificate_type: 'carbon_neutral',
        certificate_data: {
          carbon_offset: '2.5 ton CO2',
          period: '2024 Q2',
          activities: ['Kompost üretimi', 'Ağaç dikimi', 'Yenilenebilir enerji']
        },
        blockchain_hash: '0x9876543210fedcba0987654321',
        verification_url: 'https://blockchain-verify.com/cert/9876543210',
        issuer_name: 'Karbon Sıfır Sertifikasyon',
        issued_at: '2024-07-01T14:30:00Z',
        is_verified: true,
        verification_count: 8
      }
    ]);
  }, []);

  const getCertificateIcon = (type: string) => {
    switch (type) {
      case 'organic': return '🌱';
      case 'sustainable': return '♻️';
      case 'carbon_neutral': return '🌍';
      case 'quality_grade': return '⭐';
      case 'yield_record': return '🏆';
      default: return '📜';
    }
  };

  const getCertificateTitle = (type: string) => {
    switch (type) {
      case 'organic': return 'Organik Sertifikası';
      case 'sustainable': return 'Sürdürülebilir Tarım';
      case 'carbon_neutral': return 'Karbon Nötr';
      case 'quality_grade': return 'Kalite Sertifikası';
      case 'yield_record': return 'Verim Rekoru';
      default: return 'Sertifika';
    }
  };

  const getCertificateColor = (type: string) => {
    switch (type) {
      case 'organic': return 'from-green-400 to-emerald-500';
      case 'sustainable': return 'from-blue-400 to-cyan-500';
      case 'carbon_neutral': return 'from-purple-400 to-indigo-500';
      case 'quality_grade': return 'from-yellow-400 to-orange-500';
      case 'yield_record': return 'from-red-400 to-pink-500';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-green-200/50 p-12">
          <Shield className="h-16 w-16 text-green-400 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Blockchain Sertifikaları</h2>
          <p className="text-gray-600 mb-6">Dijital sertifikalarınızı görüntülemek için giriş yapmalısınız.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl p-8 text-white shadow-2xl mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2 flex items-center">
              <Shield className="h-8 w-8 mr-3" />
              Blockchain Sertifikaları
            </h1>
            <p className="text-purple-100">Değiştirilemez dijital sertifikalarınız</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{certificates.length}</div>
            <div className="text-purple-200 text-sm">Aktif Sertifika</div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-green-200/50 p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Blockchain Sertifikasyon Avantajları</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: Shield,
              title: 'Güvenilir Doğrulama',
              description: 'Blockchain teknolojisi ile sahtecilik imkansız',
              color: 'from-green-400 to-emerald-500'
            },
            {
              icon: Globe,
              title: 'Uluslararası Geçerlilik',
              description: 'Dünya çapında kabul gören dijital sertifikalar',
              color: 'from-blue-400 to-indigo-500'
            },
            {
              icon: QrCode,
              title: 'Anında Doğrulama',
              description: 'QR kod ile saniyeler içinde doğrulama',
              color: 'from-purple-400 to-pink-500'
            }
          ].map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-gradient-to-r ${benefit.color} rounded-2xl p-6 text-white`}
            >
              <benefit.icon className="h-8 w-8 mb-4" />
              <h3 className="font-bold text-lg mb-2">{benefit.title}</h3>
              <p className="text-white/90 text-sm">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Certificates Grid */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-green-200/50 p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Sertifikalarım</h2>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-6 py-3 rounded-2xl hover:from-purple-600 hover:to-indigo-700 transition-all duration-300"
          >
            <Award className="h-5 w-5" />
            <span>Yeni Sertifika</span>
          </button>
        </div>

        {certificates.length === 0 ? (
          <div className="text-center py-12">
            <Shield className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Henüz sertifika yok</h3>
            <p className="text-gray-600">İlk blockchain sertifikanızı oluşturun!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((certificate, index) => (
              <motion.div
                key={certificate.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-white to-gray-50 rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer"
                onClick={() => setSelectedCertificate(certificate)}
              >
                {/* Certificate Header */}
                <div className={`bg-gradient-to-r ${getCertificateColor(certificate.certificate_type)} p-6 text-white`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-3xl">{getCertificateIcon(certificate.certificate_type)}</div>
                    {certificate.is_verified && (
                      <CheckCircle className="h-6 w-6 text-white" />
                    )}
                  </div>
                  <h3 className="font-bold text-lg">{getCertificateTitle(certificate.certificate_type)}</h3>
                  <p className="text-white/90 text-sm">{certificate.issuer_name}</p>
                </div>

                {/* Certificate Body */}
                <div className="p-6">
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Blockchain Hash:</span>
                      <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                        {certificate.blockchain_hash.slice(0, 10)}...
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Doğrulama:</span>
                      <span className="text-green-600 font-medium">{certificate.verification_count} kez</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Veriliş:</span>
                      <span className="text-gray-900">
                        {new Date(certificate.issued_at).toLocaleDateString('tr-TR')}
                      </span>
                    </div>
                    {certificate.expires_at && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Geçerlilik:</span>
                        <span className="text-orange-600">
                          {new Date(certificate.expires_at).toLocaleDateString('tr-TR')}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex space-x-2">
                    <button className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 text-sm font-medium flex items-center justify-center space-x-1">
                      <Eye className="h-4 w-4" />
                      <span>Görüntüle</span>
                    </button>
                    <button className="p-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors">
                      <Share className="h-4 w-4 text-gray-600" />
                    </button>
                    <button className="p-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors">
                      <Download className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Certificate Detail Modal */}
      {selectedCertificate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedCertificate(null)}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative bg-white rounded-3xl shadow-2xl border border-gray-200 p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Sertifika Detayları</h2>
              <button
                onClick={() => setSelectedCertificate(null)}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
              >
                ✕
              </button>
            </div>

            <div className={`bg-gradient-to-r ${getCertificateColor(selectedCertificate.certificate_type)} rounded-2xl p-6 text-white mb-6`}>
              <div className="flex items-center space-x-4 mb-4">
                <div className="text-4xl">{getCertificateIcon(selectedCertificate.certificate_type)}</div>
                <div>
                  <h3 className="text-2xl font-bold">{getCertificateTitle(selectedCertificate.certificate_type)}</h3>
                  <p className="text-white/90">{selectedCertificate.issuer_name}</p>
                </div>
              </div>
              
              <div className="bg-white/20 rounded-xl p-4">
                <h4 className="font-semibold mb-2">Blockchain Hash:</h4>
                <p className="font-mono text-sm break-all">{selectedCertificate.blockchain_hash}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Sertifika Verileri:</h4>
                <div className="bg-gray-50 rounded-xl p-4">
                  <pre className="text-sm text-gray-700 whitespace-pre-wrap">
                    {JSON.stringify(selectedCertificate.certificate_data, null, 2)}
                  </pre>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Veriliş Tarihi:</h4>
                  <p className="text-gray-700">
                    {new Date(selectedCertificate.issued_at).toLocaleString('tr-TR')}
                  </p>
                </div>
                {selectedCertificate.expires_at && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Geçerlilik Tarihi:</h4>
                    <p className="text-gray-700">
                      {new Date(selectedCertificate.expires_at).toLocaleString('tr-TR')}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-4 pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-sm text-gray-700">
                    {selectedCertificate.verification_count} kez doğrulandı
                  </span>
                </div>
                {selectedCertificate.verification_url && (
                  <a
                    href={selectedCertificate.verification_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    Blockchain'de Doğrula →
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}