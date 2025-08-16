import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './store/authStore';
import { usePostStore } from './store/postStore';
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import CreatePost from './components/CreatePost';
import Post from './components/Post';
import FloatingElements from './components/FloatingElements';
import MobileNavigation from './components/Mobile/MobileNavigation';
import PWAInstallPrompt from './components/PWA/PWAInstallPrompt';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import MetaTags from './components/SEO/MetaTags';
import LoadingSpinner from './components/LoadingSpinner';

// Page Components
import MarketPlace from './components/Market/MarketPlace';
import PlantingCalendar from './components/PlantingCalendar/PlantingCalendar';
import GardenPlanner from './components/PlantingCalendar/GardenPlanner';
import AutomationDashboard from './components/Automation/AutomationDashboard';
import WeatherWidget from './components/Weather/WeatherWidget';
import CommunityHub from './components/Community/CommunityHub';
import LearningCenter from './components/Learning/LearningCenter';
import FarmAnalytics from './components/Analytics/FarmAnalytics';
import UserProfile from './components/Profile/UserProfile';
import UserSettings from './components/Settings/UserSettings';
import NotificationCenter from './components/Notifications/NotificationCenter';
import HelpCenter from './components/Help/HelpCenter';
import AboutPage from './components/About/AboutPage';
import PrivacyPolicy from './components/Legal/PrivacyPolicy';
import TermsOfService from './components/Legal/TermsOfService';

// Innovation Components
import AIDiseaseDiagnosis from './components/Innovation/AIDiseaseDiagnosis';
import BlockchainCertificates from './components/Innovation/BlockchainCertificates';
import CarbonTracking from './components/Innovation/CarbonTracking';
import MarketPredictions from './components/Innovation/MarketPredictions';
import PestAlerts from './components/Innovation/PestAlerts';
import SmartIrrigation from './components/Innovation/SmartIrrigation';
import SustainabilityTracker from './components/Innovation/SustainabilityTracker';
import VirtualConsultation from './components/Innovation/VirtualConsultation';
import YieldPrediction from './components/Innovation/YieldPrediction';
import CommunityGamification from './components/Innovation/CommunityGamification';

function App() {
  const { initialize, loading: authLoading } = useAuthStore();
  const { fetchPosts, posts, loading: postsLoading } = usePostStore();
  const [currentSeason, setCurrentSeason] = useState('spring');

  useEffect(() => {
    initialize();
    fetchPosts();
    
    // Determine current season
    const month = new Date().getMonth() + 1;
    if (month >= 3 && month <= 5) setCurrentSeason('spring');
    else if (month >= 6 && month <= 8) setCurrentSeason('summer');
    else if (month >= 9 && month <= 11) setCurrentSeason('autumn');
    else setCurrentSeason('winter');
  }, []);

  const HomePage = () => (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 relative overflow-hidden">
      <FloatingElements season={currentSeason} />
      
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3 space-y-8">
              <CreatePost 
                currentUser={{ 
                  name: 'Kullanıcı',
                  avatar_url: 'https://images.pexels.com/photos/1139743/pexels-photo-1139743.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'
                }} 
                season={currentSeason} 
              />
              
              {postsLoading ? (
                <LoadingSpinner message="Gönderiler yükleniyor..." />
              ) : (
                <div className="space-y-8">
                  {posts.map((post) => (
                    <Post key={post.id} post={post} season={currentSeason} />
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Sidebar season={currentSeason} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center">
        <LoadingSpinner size="lg" message="TarımVerse yükleniyor..." />
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
          <MetaTags />
          <Header season={currentSeason} />
          
          <main className="pb-20 lg:pb-8">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/market" element={<MarketPlace />} />
              <Route path="/community" element={<CommunityHub />} />
              <Route path="/learning" element={<LearningCenter />} />
              <Route path="/planting-calendar" element={<PlantingCalendar />} />
              <Route path="/garden-planner" element={<GardenPlanner />} />
              <Route path="/automation" element={<AutomationDashboard />} />
              <Route path="/weather" element={<WeatherWidget />} />
              <Route path="/analytics" element={<FarmAnalytics />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/settings" element={<UserSettings />} />
              <Route path="/notifications" element={<NotificationCenter />} />
              <Route path="/help" element={<HelpCenter />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />
              
              {/* Innovation Routes */}
              <Route path="/ai-diagnosis" element={<AIDiseaseDiagnosis />} />
              <Route path="/blockchain-certificates" element={<BlockchainCertificates />} />
              <Route path="/carbon-tracking" element={<CarbonTracking />} />
              <Route path="/market-predictions" element={<MarketPredictions />} />
              <Route path="/pest-alerts" element={<PestAlerts />} />
              <Route path="/smart-irrigation" element={<SmartIrrigation />} />
              <Route path="/sustainability" element={<SustainabilityTracker />} />
              <Route path="/virtual-consultation" element={<VirtualConsultation />} />
              <Route path="/yield-prediction" element={<YieldPrediction />} />
              <Route path="/gamification" element={<CommunityGamification />} />
            </Routes>
          </main>

          <Footer />
          <MobileNavigation />
          <PWAInstallPrompt />
          
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#10b981',
                color: '#fff',
                borderRadius: '16px',
                padding: '16px',
                fontSize: '14px',
                fontWeight: '500'
              },
              success: {
                iconTheme: {
                  primary: '#fff',
                  secondary: '#10b981'
                }
              },
              error: {
                style: {
                  background: '#ef4444'
                },
                iconTheme: {
                  primary: '#fff',
                  secondary: '#ef4444'
                }
              }
            }}
          />
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;