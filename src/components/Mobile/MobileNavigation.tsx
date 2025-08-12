import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, ShoppingBag, Users, User, Plus, Bell } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

export default function MobileNavigation() {
  const location = useLocation();
  const { user } = useAuthStore();

  const navItems = [
    { path: '/', label: 'Ana Sayfa', icon: Home },
    { path: '/market', label: 'Pazar', icon: ShoppingBag },
    { path: '/community', label: 'Topluluk', icon: Users },
    { path: '/notifications', label: 'Bildirim', icon: Bell },
    { path: '/profile', label: 'Profil', icon: User }
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-green-200/50 px-4 py-3 z-50 shadow-2xl">
      <div className="flex justify-around items-center">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center py-2 px-3 rounded-2xl transition-all duration-300 ${
                isActive 
                  ? 'text-green-600 bg-green-100/50 transform scale-110' 
                  : 'text-gray-600 hover:text-green-600'
              }`}
            >
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center mb-1 transition-all duration-300 ${
                isActive ? 'bg-green-500 text-white shadow-lg' : ''
              }`}>
                <item.icon className="w-5 h-5" />
              </div>
              <span className="text-xs font-medium">{item.label}</span>
              {isActive && (
                <div className="absolute -top-1 w-1 h-1 bg-green-500 rounded-full"></div>
              )}
            </Link>
          );
        })}
      </div>

      {/* Floating Action Button */}
      {user && (
        <Link
          to="/"
          className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-green-500 to-emerald-600 text-white p-4 rounded-full shadow-2xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 hover:scale-110"
        >
          <Plus className="w-6 h-6" />
        </Link>
      )}
    </div>
  );
}