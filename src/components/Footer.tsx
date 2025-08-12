import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube, Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    platform: [
      { label: 'Ana Sayfa', path: '/' },
      { label: 'Hakkımızda', path: '/about' },
      { label: 'Topluluk', path: '/community' },
      { label: 'Yardım', path: '/help' }
    ],
    features: [
      { label: 'Yerel Pazar', path: '/market' },
      { label: 'Ekim Takvimi', path: '/planting-calendar' },
      { label: 'Akıllı Tarım', path: '/automation' },
      { label: 'Öğrenme Merkezi', path: '/learning' }
    ],
    support: [
      { label: 'Yardım Merkezi', path: '/help' },
      { label: 'İletişim', path: '/contact' },
      { label: 'Gizlilik Politikası', path: '/privacy' },
      { label: 'Kullanım Şartları', path: '/terms' }
    ]
  };

  return (
    <footer className="bg-gradient-to-br from-green-900 via-emerald-800 to-teal-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-green-400 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-emerald-400 rounded-full"></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-teal-400 rounded-full"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-4 mb-6">
              <div className="bg-gradient-to-br from-green-400 to-emerald-500 p-3 rounded-2xl shadow-xl">
                <Leaf className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">TarımVerse</h3>
                <p className="text-green-200">Doğanın Dijital Evreni</p>
              </div>
            </div>
            
            <p className="text-green-100 mb-6 leading-relaxed">
              Türkiye'nin en büyük tarım topluluğu. Çiftçiler, bahçıvanlar ve tarım severlerin 
              bilgi paylaştığı, öğrendiği ve büyüdüğü platform.
            </p>

            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-green-200">
                <Mail className="h-5 w-5" />
                <span>info@tarimverse.com</span>
              </div>
              <div className="flex items-center space-x-3 text-green-200">
                <Phone className="h-5 w-5" />
                <span>+90 (212) 555-0123</span>
              </div>
              <div className="flex items-center space-x-3 text-green-200">
                <MapPin className="h-5 w-5" />
                <span>İstanbul, Türkiye</span>
              </div>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="text-lg font-bold mb-6">Platform</h4>
            <ul className="space-y-3">
              {footerLinks.platform.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path}
                    className="text-green-200 hover:text-white transition-colors duration-300 hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Features Links */}
          <div>
            <h4 className="text-lg font-bold mb-6">Özellikler</h4>
            <ul className="space-y-3">
              {footerLinks.features.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path}
                    className="text-green-200 hover:text-white transition-colors duration-300 hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-lg font-bold mb-6">Destek</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path}
                    className="text-green-200 hover:text-white transition-colors duration-300 hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Media & Newsletter */}
        <div className="border-t border-green-700/50 pt-8 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
            {/* Social Media */}
            <div className="flex items-center space-x-6">
              <span className="text-green-200 font-medium">Bizi takip edin:</span>
              <div className="flex space-x-4">
                {[
                  { icon: Facebook, href: '#', color: 'hover:text-blue-400' },
                  { icon: Twitter, href: '#', color: 'hover:text-sky-400' },
                  { icon: Instagram, href: '#', color: 'hover:text-pink-400' },
                  { icon: Youtube, href: '#', color: 'hover:text-red-400' }
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className={`p-3 bg-white/10 rounded-2xl ${social.color} transition-all duration-300 hover:bg-white/20 hover:scale-110`}
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="flex items-center space-x-4">
              <span className="text-green-200 font-medium">Bülten:</span>
              <div className="flex">
                <input
                  type="email"
                  placeholder="E-posta adresiniz"
                  className="px-4 py-2 bg-white/10 border border-white/20 rounded-l-2xl focus:outline-none focus:ring-2 focus:ring-green-400 text-white placeholder-green-200"
                />
                <button className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-2 rounded-r-2xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 font-medium">
                  Abone Ol
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-green-700/50 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-green-200">
              <span>© {currentYear} TarımVerse. Tüm hakları saklıdır.</span>
              <Heart className="h-4 w-4 text-red-400" />
              <span>Türkiye'de yapıldı</span>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-green-200">
              <Link to="/privacy" className="hover:text-white transition-colors">Gizlilik</Link>
              <Link to="/terms" className="hover:text-white transition-colors">Şartlar</Link>
              <Link to="/cookies" className="hover:text-white transition-colors">Çerezler</Link>
              <Link to="/sitemap" className="hover:text-white transition-colors">Site Haritası</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}