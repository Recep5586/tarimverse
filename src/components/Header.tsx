import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X, Settings, LogOut, Bell, MessageCircle, Sprout, Leaf, Sun, Snowflake, ShoppingBag, Cloud, Bot, Shield, Globe, Video, Users, BookOpen, BarChart3, User } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import AuthModal from './Auth/AuthModal';

interface HeaderProps {
  season?: string;
}

export default function Header({ season = 'spring' }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [notifications] = useState(3);

  const { user, signOut } = useAuthStore();
  const location = useLocation();

  const getSeasonIcon = () => {
    switch (season) {
      case 'spring': return Leaf;
      case 'summer': return Sun;
      case 'autumn': return Leaf;
      case 'winter': return Snowflake;
      default: return Sprout;
    }
  };

  const getSeasonColors = () => {
    switch (season) {
      case 'spring': return 'from-green-500 to-emerald-600';
      case 'summer': return 'from-yellow-500 to-orange-500';
      case 'autumn': return 'from-orange-500 to-red-500';
      case 'winter': return 'from-blue-500 to-indigo-600';
      default: return 'from-green-500 to-emerald-600';
    }
  };

  const SeasonIcon = getSeasonIcon();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Arama:', searchQuery);
    }
  };

  const handleAuthClick = (mode: 'signin' | 'signup') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const navigationItems = [
    { path: '/', label: 'Ana Bahçe', icon: 'home' },
    { path: '/market', label: 'Yerel Pazar', icon: 'market' },
    { path: '/community', label: 'Topluluk', icon: 'community' },
    { path: '/learning', label: 'Öğrenme', icon: 'learning' },
    { path: '/planting-calendar', label: 'Ekim Takvimi', icon: 'calendar' },
    { path: '/garden-planner', label: 'Bahçe Planlayıcısı', icon: 'planner' },
    { path: '/analytics', label: 'Analitik', icon: 'analytics' },
    { path: '/automation', label: 'Akıllı Tarım', icon: 'automation' },
    { path: '/weather', label: 'Hava Durumu', icon: 'weather' },
    { path: '/ai-diagnosis', label: 'AI Teşhis', icon: 'ai' },
    { path: '/market-predictions', label: 'Pazar Analizi', icon: 'predictions' },
    { path: '/sustainability', label: 'Sürdürülebilirlik', icon: 'sustainability' },
  ];

  return (
    <>
      <header className="bg-white/90 backdrop-blur-md shadow-lg border-b border-green-200/30 sticky top-0 z-50 safe-area-pt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-4">
              <div className={`bg-gradient-to-br ${getSeasonColors()} p-2 lg:p-3 rounded-xl lg:rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-300`}>
                <SeasonIcon className="h-6 w-6 lg:h-8 lg:w-8 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  TarımVerse
                </h1>
                <p className="text-sm text-green-600 -mt-1 font-medium">Doğanın Dijital Evreni</p>
              </div>
            </Link>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-2 sm:mx-4 lg:mx-8">
              <form onSubmit={handleSearch} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                <Search className="absolute left-3 lg:left-6 top-1/2 transform -translate-y-1/2 h-4 w-4 lg:h-5 lg:w-5 text-green-500 z-10" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Ara... 🌿"
                  className="w-full pl-10 lg:pl-14 pr-3 lg:pr-6 py-3 lg:py-4 bg-white/70 backdrop-blur-sm border-2 border-green-200/50 rounded-2xl lg:rounded-3xl focus:outline-none focus:ring-4 focus:ring-green-500/20 focus:border-green-400 focus:bg-white transition-all duration-300 text-gray-700 placeholder-green-500/70 relative z-10 text-sm lg:text-base"
                />
              </form>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-3">
              {/* Navigation Links */}
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-2xl transition-all duration-300 ${
                    location.pathname === item.path
                      ? 'bg-green-100/50 text-green-700'
                      : 'hover:bg-green-100/50 text-gray-600 hover:text-green-700'
                  }`}
                >
                  {item.icon === 'home' && <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>}
                  {item.icon === 'market' && <ShoppingBag className="w-5 h-5" />}
                  {item.icon === 'calendar' && <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>}
                  {item.icon === 'planner' && <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>}
                  {item.icon === 'automation' && <Bot className="w-5 h-5" />}
                  {item.icon === 'weather' && <Cloud className="w-5 h-5" />}
                  {item.icon === 'ai' && <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>}
                  {item.icon === 'predictions' && <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>}
                  {item.icon === 'sustainability' && <Leaf className="w-5 h-5" />}
                  {item.icon === 'certificates' && <Shield className="w-5 h-5" />}
                  {item.icon === 'carbon' && <Globe className="w-5 h-5" />}
                  {item.icon === 'consultation' && <Video className="w-5 h-5" />}
                  <span className="font-medium text-sm">{item.label}</span>
                </Link>
              ))}

              {user ? (
                <>
                  {/* Notifications */}
                  <Link to="/notifications" className="relative p-4 rounded-2xl hover:bg-green-100/50 transition-all duration-300 group">
                    <Bell className="w-6 h-6 text-green-600 group-hover:text-green-700 transition-colors" />
                    {notifications > 0 && (
                      <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center animate-pulse shadow-lg">
                        {notifications}
                      </span>
                    )}
                  </Link>

                  {/* Messages */}
                  <button className="p-4 rounded-2xl hover:bg-green-100/50 transition-all duration-300 group">
                    <MessageCircle className="w-6 h-6 text-green-600 group-hover:text-green-700 transition-colors" />
                  </button>

                  {/* User Profile */}
                  <div className="relative ml-4">
                    <button
                      onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                      className="flex items-center space-x-2 lg:space-x-3 p-2 lg:p-3 rounded-xl lg:rounded-2xl hover:bg-green-100/50 transition-all duration-300 group"
                    >
                      <div className="relative">
                        <img
                          src={user.avatar_url || 'https://images.pexels.com/photos/1139743/pexels-photo-1139743.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'}
                          alt={user.name}
                          className="h-8 w-8 lg:h-12 lg:w-12 rounded-xl lg:rounded-2xl border-2 lg:border-3 border-green-300 group-hover:border-green-400 transition-colors shadow-lg"
                        />
                        <div className="absolute -bottom-0.5 -right-0.5 lg:-bottom-1 lg:-right-1 w-3 h-3 lg:w-4 lg:h-4 bg-green-500 rounded-full border-2 border-white"></div>
                      </div>
                      <span className="hidden xl:block text-sm font-semibold text-gray-700 group-hover:text-green-700 transition-colors">
                        {user.name}
                      </span>
                    </button>

                    {/* Profile Dropdown */}
                    {isProfileMenuOpen && (
                      <div className="absolute right-0 mt-3 w-56 bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-green-200/50 py-3 animate-slide-up">
                        <Link to="/profile" className="flex items-center space-x-3 w-full px-5 py-3 text-sm text-gray-700 hover:bg-green-100/50 transition-colors rounded-xl mx-2">
                          <User className="h-5 w-5 text-green-600" />
                          <span>Profilim</span>
                        </Link>
                        <Link to="/settings" className="flex items-center space-x-3 w-full px-5 py-3 text-sm text-gray-700 hover:bg-green-100/50 transition-colors rounded-xl mx-2">
                          <Settings className="h-5 w-5 text-green-600" />
                          <span>Ayarlar</span>
                        </Link>
                        <button 
                          onClick={signOut}
                          className="flex items-center space-x-3 w-full px-5 py-3 text-sm text-gray-700 hover:bg-red-100/50 transition-colors rounded-xl mx-2"
                        >
                          <LogOut className="h-5 w-5 text-red-500" />
                          <span>Çıkış Yap</span>
                        </button>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleAuthClick('signin')}
                    className="px-4 lg:px-6 py-2 lg:py-3 text-green-600 font-semibold hover:bg-green-100/50 rounded-xl lg:rounded-2xl transition-all duration-300 text-sm lg:text-base"
                  >
                    Giriş Yap
                  </button>
                  <button
                    onClick={() => handleAuthClick('signup')}
                    className="px-4 lg:px-6 py-2 lg:py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl lg:rounded-2xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm lg:text-base"
                  >
                    Kayıt Ol
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-xl hover:bg-green-100/50 transition-colors touch-target"
            >
              {isMenuOpen ? <X className="h-6 w-6 text-green-600" /> : <Menu className="h-6 w-6 text-green-600" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden border-t border-green-200/50 py-2 animate-slide-up max-h-[70vh] overflow-y-auto">
              <div className="flex flex-col space-y-2">
                {navigationItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-3 p-3 rounded-xl transition-colors touch-target ${
                      location.pathname === item.path
                        ? 'bg-green-100/50 text-green-700'
                        : 'hover:bg-green-100/50 text-gray-700'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.icon === 'home' && <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>}
                    {item.icon === 'market' && <ShoppingBag className="w-6 h-6" />}
                    {item.icon === 'community' && <Users className="w-6 h-6" />}
                    {item.icon === 'learning' && <BookOpen className="w-6 h-6" />}
                    {item.icon === 'calendar' && <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2z" /></svg>}
                    {item.icon === 'planner' && <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>}
                    {item.icon === 'analytics' && <BarChart3 className="w-6 h-6" />}
                    {item.icon === 'automation' && <Bot className="w-6 h-6" />}
                    {item.icon === 'weather' && <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg>}
                    {item.icon === 'ai' && <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>}
                    {item.icon === 'predictions' && <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>}
                    {item.icon === 'sustainability' && <Leaf className="w-6 h-6" />}
                    <span className="font-medium text-sm lg:text-base">{item.label}</span>
                  </Link>
                ))}

                {!user && (
                  <div className="flex flex-col space-y-2 pt-2 border-t border-green-200/50">
                    <button
                      onClick={() => handleAuthClick('signin')}
                      className="p-3 text-green-600 font-semibold hover:bg-green-100/50 rounded-xl transition-colors text-left touch-target"
                    >
                      Giriş Yap
                    </button>
                    <button
                      onClick={() => handleAuthClick('signup')}
                      className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl transition-all duration-300 touch-target"
                    >
                      Kayıt Ol
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)}
        initialMode={authMode}
      />
    </>
  );
}