import React from 'react';
import { FileText, Users, Shield, AlertTriangle, CheckCircle, Scale } from 'lucide-react';

export default function TermsOfService() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-600 to-gray-800 rounded-3xl p-8 text-white shadow-2xl mb-8 text-center">
        <Scale className="h-12 w-12 mx-auto mb-4" />
        <h1 className="text-3xl font-bold mb-2">Kullanım Şartları</h1>
        <p className="text-gray-300">Son güncelleme: 15 Temmuz 2024</p>
      </div>

      {/* Content */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-green-200/50 p-8 space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <FileText className="h-6 w-6 mr-3 text-blue-600" />
            Genel Şartlar
          </h2>
          <div className="space-y-4 text-gray-700">
            <p>
              TarımVerse platformunu kullanarak aşağıdaki şartları kabul etmiş sayılırsınız:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>18 yaşından büyük olduğunuzu beyan edersiniz</li>
              <li>Doğru ve güncel bilgiler sağlayacağınızı taahhüt edersiniz</li>
              <li>Platformu yasal amaçlar için kullanacağınızı kabul edersiniz</li>
              <li>Diğer kullanıcılara saygılı davranacağınızı beyan edersiniz</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <Users className="h-6 w-6 mr-3 text-green-600" />
            Kullanıcı Sorumlulukları
          </h2>
          <div className="space-y-4 text-gray-700">
            <p>Platform kullanıcısı olarak:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Hesap güvenliğinizden sorumlusunuz</li>
              <li>Paylaştığınız içeriklerden sorumlusunuz</li>
              <li>Telif hakkı ihlali yapmayacağınızı kabul edersiniz</li>
              <li>Spam ve zararlı içerik paylaşmayacağınızı taahhüt edersiniz</li>
              <li>Diğer kullanıcıların haklarına saygı göstereceksiniz</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <AlertTriangle className="h-6 w-6 mr-3 text-orange-600" />
            Yasaklı Faaliyetler
          </h2>
          <div className="space-y-4 text-gray-700">
            <p>Aşağıdaki faaliyetler kesinlikle yasaktır:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Yanıltıcı veya sahte bilgi paylaşımı</li>
              <li>Nefret söylemi ve ayrımcılık</li>
              <li>Ticari spam ve reklam</li>
              <li>Sistem güvenliğini tehdit etme</li>
              <li>Başkalarının hesaplarını ele geçirme</li>
              <li>Telif hakkı ihlali</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <Shield className="h-6 w-6 mr-3 text-purple-600" />
            Fikri Mülkiyet
          </h2>
          <div className="space-y-4 text-gray-700">
            <p>
              TarımVerse platformu ve içeriği fikri mülkiyet hakları ile korunmaktadır:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Platform tasarımı ve kodları TarımVerse'e aittir</li>
              <li>Kullanıcı içerikleri sahiplerine aittir</li>
              <li>Marka ve logolar tescilli markalarımızdır</li>
              <li>İzinsiz kopyalama ve dağıtım yasaktır</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <CheckCircle className="h-6 w-6 mr-3 text-green-600" />
            Hizmet Garantileri
          </h2>
          <div className="space-y-4 text-gray-700">
            <p>TarımVerse olarak taahhütlerimiz:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>%99.9 uptime garantisi</li>
              <li>7/24 teknik destek</li>
              <li>Veri güvenliği ve gizlilik</li>
              <li>Sürekli platform geliştirme</li>
              <li>Topluluk kurallarının uygulanması</li>
            </ul>
          </div>
        </section>

        <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
          <h3 className="font-bold text-blue-900 mb-2">Değişiklikler</h3>
          <p className="text-blue-800 text-sm">
            Bu kullanım şartları zaman zaman güncellenebilir. Önemli değişiklikler 
            e-posta ile bildirilecektir. Güncel versiyonu web sitemizden takip edebilirsiniz.
          </p>
        </div>

        <div className="bg-green-50 rounded-2xl p-6 border border-green-200">
          <h3 className="font-bold text-green-900 mb-2">İletişim</h3>
          <p className="text-green-800 text-sm">
            Kullanım şartları hakkında sorularınız için: 
            <a href="mailto:legal@tarimverse.com" className="font-medium underline ml-1">
              legal@tarimverse.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}