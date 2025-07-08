import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './store/authStore';
import { usePostStore } from './store/postStore';

// Components
import Header from './components/Header';
import CreatePost from './components/CreatePost';
import Post from './components/Post';
import Sidebar from './components/Sidebar';
import FloatingElements from './components/FloatingElements';
import AuthModal from './components/Auth/AuthModal';
import MarketPlace from './components/Market/MarketPlace';
import WeatherWidget from './components/Weather/WeatherWidget';
import PlantingCalendar from './components/PlantingCalendar/PlantingCalendar';
import GardenPlanner from './components/PlantingCalendar/GardenPlanner';

// Data
import { currentUser } from './data/samplePosts';

function HomePage() {
  const { user } = useAuthStore();
  const { posts, loading, fetchPosts } = usePostStore();
  const [currentSeason, setCurrentSeason] = useState('spring');
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    // Set season based on current month
    const month = new Date().getMonth();
    if (month >= 2 && month <= 4) setCurrentSeason('spring');
    else if (month >= 5 && month <= 7) setCurrentSeason('summer');
    else if (month >= 8 && month <= 10) setCurrentSeason('autumn');
    else setCurrentSeason('winter');

    // Fetch posts
    fetchPosts();
  }, []);

  return (
    <div className={`min-h-screen transition-all duration-1000 ${
      currentSeason === 'spring' ? 'bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50' :
      currentSeason === 'summer' ? 'bg-gradient-to-br from-yellow-50 via-green-50 to-blue-50' :
      currentSeason === 'autumn' ? 'bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50' :
      'bg-gradient-to-br from-blue-50 via-slate-50 to-gray-50'
    } relative overflow-hidden`}>
      
      <FloatingElements season={currentSeason} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <div className="flex gap-8">
          {/* Main Content */}
          <div className="flex-1 max-w-2xl">
            {user ? (
              <CreatePost currentUser={user} season={currentSeason} />
            ) : (
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-green-200/50 p-8 mb-8 text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">TarımVerse'e Hoş Geldin! 🌱</h3>
                <p className="text-gray-600 mb-6">
                  Türkiye'nin en büyük tarım topluluğuna katıl, deneyimlerini paylaş ve öğren!
                </p>
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-2xl font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Hemen Başla
                </button>
              </div>
            )}
            
            <div className="space-y-8">
              {loading ? (
                <div className="space-y-8">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="bg-white/80 rounded-3xl p-8 animate-pulse">
                      <div className="flex items-center space-x-4 mb-6">
                        <div className="bg-gray-300 h-16 w-16 rounded-2xl"></div>
                        <div className="flex-1">
                          <div className="bg-gray-300 h-4 rounded mb-2"></div>
                          <div className="bg-gray-300 h-3 rounded w-2/3"></div>
                        </div>
                      </div>
                      <div className="bg-gray-300 h-32 rounded-2xl mb-4"></div>
                      <div className="bg-gray-300 h-4 rounded"></div>
                    </div>
                  ))}
                </div>
              ) : posts.length === 0 ? (
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-green-200/50 p-12 text-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-100/20 to-emerald-100/20"></div>
                  <div className="relative z-10">
                    <div className="text-green-400 mb-6">
                      <svg className="h-20 w-20 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-green-800 mb-3">Henüz tohum ekilmemiş</h3>
                    <p className="text-green-600">İlk paylaşımınızla bu topluluğu yeşertmeye başlayın! 🌱</p>
                  </div>
                </div>
              ) : (
                posts.map(post => (
                  <Post
                    key={post.id}
                    post={post}
                    season={currentSeason}
                  />
                ))
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="hidden lg:block">
            <div className="space-y-8">
              <Sidebar season={currentSeason} />
              <WeatherWidget compact />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-green-200/50 px-4 py-3 z-50">
        <div className="flex justify-around">
          {[
            { icon: 'home', label: 'Bahçe', active: true },
            { icon: 'market', label: 'Pazar', active: false },
            { icon: 'weather', label: 'Hava', active: false },
            { icon: 'user', label: 'Profil', active: false }
          ].map((item, index) => (
            <button key={index} className={`flex flex-col items-center py-2 px-3 rounded-2xl transition-all duration-300 ${
              item.active ? 'text-green-600 bg-green-100/50' : 'text-gray-600'
            }`}>
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center mb-1 ${
                item.active ? 'bg-green-500 text-white shadow-lg' : ''
              }`}>
                {item.icon === 'home' && <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>}
                {item.icon === 'market' && <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>}
                {item.icon === 'weather' && <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg>}
                {item.icon === 'user' && <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>}
              </div>
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </div>
  );
}

function App() {
  const { initialize, loading } = useAuthStore();

  useEffect(() => {
    initialize();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 bg-green-200 rounded-full opacity-20 animate-float"></div>
          <div className="absolute top-40 right-32 w-24 h-24 bg-emerald-300 rounded-full opacity-30 animate-float-delayed"></div>
          <div className="absolute bottom-32 left-1/3 w-40 h-40 bg-teal-200 rounded-full opacity-25 animate-float-slow"></div>
        </div>
        
        <div className="text-center z-10">
          <div className="relative mb-8">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-green-400 to-emerald-600 rounded-3xl flex items-center justify-center shadow-2xl animate-pulse-gentle">
              <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-bounce"></div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4">
            TarımVerse
          </h1>
          <p className="text-green-700 font-medium mb-6">Doğanın dijital buluşma noktası</p>
          <div className="flex items-center justify-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-emerald-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="w-3 h-3 bg-teal-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen">
        <Header />
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/market" element={<MarketPlace />} />
          <Route path="/planting-calendar" element={<PlantingCalendar />} />
          <Route path="/garden-planner" element={<GardenPlanner />} />
          <Route path="/weather" element={
            <div className="max-w-4xl mx-auto px-4 py-8">
              <WeatherWidget />
            </div>
          } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(34, 197, 94, 0.2)',
              borderRadius: '16px',
              color: '#374151',
            },
          }}
        />
      </div>
    </Router>
  );
}

export default App;