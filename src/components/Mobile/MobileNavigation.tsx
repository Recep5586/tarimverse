import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, ShoppingBag, Users, User, Plus, Bell, Calendar, Bot } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

export default function MobileNavigation() {
  const location = useLocation();
  const { user } = useAuthStore();

  const navItems = [
    { path: '/', label: 'Ana Sayfa', icon: Home },
    { path: '/market', label: 'Pazar', icon: ShoppingBag },
    { path: '/planting-calendar', label: 'Takvim', icon: Calendar },
    { path: '/automation', label: 'Akıllı', icon: Bot },
    { path: '/profile', label: 'Profil', icon: User }
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-green-200/50 px-2 py-2 z-50 shadow-2xl safe-area-pb">
      <div className="flex justify-around items-center relative">
        {navItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          const isCenter = index === 2; // Calendar is center
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`mobile-nav-item ${isActive ? 'active' : ''} ${
                isCenter ? 'relative' : ''
              }`}
              style={{ 
                zIndex: isCenter ? 10 : 1,
                transform: isCenter && isActive ? 'translateY(-8px)' : 'none'
              }}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-1 transition-all duration-300 ${
                isActive 
                  ? 'bg-green-500 text-white shadow-lg transform scale-110' 
                  : 'bg-transparent text-gray-600'
              }`}>
                <item.icon className="w-5 h-5" />
              </div>
              <span className={`text-xs font-medium transition-colors ${
                isActive ? 'text-green-600' : 'text-gray-600'
              }`}>
                {item.label}
              </span>
              {isActive && (
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-green-500 rounded-full"></div>
              )}
            </Link>
          );
        })}
      </div>

      {/* Floating Action Button */}
      {user && (
        <Link
          to="/"
          className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-green-500 to-emerald-600 text-white p-4 rounded-full shadow-2xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 hover:scale-110 touch-target"
          style={{ zIndex: 20 }}
        >
          <Plus className="w-6 h-6" />
        </Link>
      )}
    </div>
  );
}