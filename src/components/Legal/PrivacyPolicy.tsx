import React from 'react';
import { Shield, Eye, Lock, Globe, Users, Database } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 text-white shadow-2xl mb-8 text-center">
        <Shield className="h-12 w-12 mx-auto mb-4" />
        <h1 className="text-3xl font-bold mb-2">Gizlilik Politikası</h1>
        <p className="text-blue-100">Son güncelleme: 15 Temmuz 2024</p>
      </div>

      {/* Content */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-green-200/50 p-8 space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <Eye className="h-6 w-6 mr-3 text-blue-600" />
            Topladığımız Bilgiler
          </h2>
          <div className="space-y-4 text-gray-700">
            <p>TarımVerse olarak, size daha iyi hizmet verebilmek için aşağıdaki bilgileri topluyoruz:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Hesap bilgileri (ad, e-posta, profil fotoğrafı)</li>
              <li>Paylaştığınız içerikler (gönderiler, yorumlar, fotoğraflar)</li>
              <li>Kullanım verileri (sayfa görüntülemeleri, tıklamalar)</li>
              <li>Cihaz bilgileri (IP adresi, tarayıcı türü)</li>
              <li>Konum bilgileri (isteğe bağlı)</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <Database className="h-6 w-6 mr-3 text-green-600" />
            Bilgilerin Kullanımı
          </h2>
          <div className="space-y-4 text-gray-700">
            <p>Topladığımız bilgileri şu amaçlarla kullanırız:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Platform hizmetlerini sağlamak ve geliştirmek</li>
              <li>Kişiselleştirilmiş içerik ve öneriler sunmak</li>
              <li>Güvenlik ve dolandırıcılık önleme</li>
              <li>Müşteri desteği sağlamak</li>
              <li>Yasal yükümlülükleri yerine getirmek</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <Lock className="h-6 w-6 mr-3 text-purple-600" />
            Bilgi Güvenliği
          </h2>
          <div className="space-y-4 text-gray-700">
            <p>Verilerinizin güvenliği bizim için önceliktir:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>SSL şifreleme ile güvenli veri iletimi</li>
              <li>Düzenli güvenlik denetimleri</li>
              <li>Erişim kontrolü ve yetkilendirme</li>
              <li>Veri yedekleme ve kurtarma sistemleri</li>
              <li>GDPR ve KVKK uyumluluğu</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <Users className="h-6 w-6 mr-3 text-orange-600" />
            Bilgi Paylaşımı
          </h2>
          <div className="space-y-4 text-gray-700">
            <p>Kişisel bilgilerinizi üçüncü taraflarla paylaşmayız. İstisnalar:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Yasal zorunluluklar</li>
              <li>Güvenlik tehditleri</li>
              <li>Hizmet sağlayıcıları (şifrelenmiş)</li>
              <li>Açık rızanız ile</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <Globe className="h-6 w-6 mr-3 text-teal-600" />
            Haklarınız
          </h2>
          <div className="space-y-4 text-gray-700">
            <p>KVKK kapsamında sahip olduğunuz haklar:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
              <li>İşlenen verileriniz hakkında bilgi talep etme</li>
              <li>Verilerin düzeltilmesini isteme</li>
              <li>Verilerin silinmesini talep etme</li>
              <li>İşleme faaliyetine itiraz etme</li>
            </ul>
          </div>
        </section>

        <div className="bg-green-50 rounded-2xl p-6 border border-green-200">
          <h3 className="font-bold text-green-900 mb-2">İletişim</h3>
          <p className="text-green-800 text-sm">
            Gizlilik politikamız hakkında sorularınız için: 
            <a href="mailto:privacy@tarimverse.com" className="font-medium underline ml-1">
              privacy@tarimverse.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}