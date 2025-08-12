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
import AutomationDashboard from './components/Automation/AutomationDashboard';
import BlockchainCertificates from './components/Innovation/BlockchainCertificates';
import CarbonTracking from './components/Innovation/CarbonTracking';
import VirtualConsultation from './components/Innovation/VirtualConsultation';
import AIDiseaseDiagnosis from './components/Innovation/AIDiseaseDiagnosis';
import YieldPrediction from './components/Innovation/YieldPrediction';
import SmartIrrigation from './components/Innovation/SmartIrrigation';
import PestAlerts from './components/Innovation/PestAlerts';
import MarketPredictions from './components/Innovation/MarketPredictions';
import CommunityGamification from './components/Innovation/CommunityGamification';
import SustainabilityTracker from './components/Innovation/SustainabilityTracker';
import PWAInstallPrompt from './components/PWA/PWAInstallPrompt';
import AboutPage from './components/About/AboutPage';
import PrivacyPolicy from './components/Legal/PrivacyPolicy';
import TermsOfService from './components/Legal/TermsOfService';

// Data
import { currentUser } from './data/samplePosts';
import CommunityHub from './components/Community/CommunityHub';
import FarmAnalytics from './components/Analytics/FarmAnalytics';
import LearningCenter from './components/Learning/LearningCenter';
import UserSettings from './components/Settings/UserSettings';
import UserProfile from './components/Profile/UserProfile';
import NotificationCenter from './components/Notifications/NotificationCenter';
import Footer from './components/Footer';
import HelpCenter from './components/Help/HelpCenter';
import MobileNavigation from './components/Mobile/MobileNavigation';
import MetaTags from './components/SEO/MetaTags';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

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

      <ErrorBoundary>
        <div className="min-h-screen">
          <MetaTags />
          <Header />
          
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/market" element={<MarketPlace />} />
            <Route path="/planting-calendar" element={<PlantingCalendar />} />
            <Route path="/garden-planner" element={<GardenPlanner />} />
            <Route path="/automation" element={<AutomationDashboard />} />
            <Route path="/blockchain-certificates" element={<BlockchainCertificates />} />
            <Route path="/carbon-tracking" element={<CarbonTracking />} />
            <Route path="/virtual-consultation" element={<VirtualConsultation />} />
            <Route path="/ai-diagnosis" element={<AIDiseaseDiagnosis />} />
            <Route path="/yield-prediction" element={<YieldPrediction />} />
            <Route path="/smart-irrigation" element={<SmartIrrigation />} />
            <Route path="/pest-alerts" element={<PestAlerts />} />
            <Route path="/market-predictions" element={<MarketPredictions />} />
            <Route path="/gamification" element={<CommunityGamification />} />
            <Route path="/sustainability" element={<SustainabilityTracker />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/community" element={<CommunityHub />} />
            <Route path="/analytics" element={<FarmAnalytics />} />
            <Route path="/learning" element={<LearningCenter />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/settings" element={<UserSettings />} />
            <Route path="/notifications" element={<NotificationCenter />} />
            <Route path="/help" element={<HelpCenter />} />
            <Route path="/weather" element={
              <div className="max-w-4xl mx-auto px-4 py-8">
                <WeatherWidget />
              </div>
            } />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
    </Router>
  );
}

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
        <Footer />
        <MobileNavigation />
      </ErrorBoundary>
      
      <PWAInstallPrompt />
export default App;