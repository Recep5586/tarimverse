import React, { useState } from 'react';
import { Search, Menu, Bell, Plus, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

export default function MobileHeader() {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user } = useAuthStore();

  return (
    <header className="lg:hidden bg-white/95 backdrop-blur-md shadow-lg border-b border-green-200/30 sticky top-0 z-50 safe-area-pt">
      <div className="px-4 py-3">
        {!showSearch ? (
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-2 rounded-xl shadow-lg">
                <span className="text-white font-bold text-lg">🌱</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-green-600">TarımVerse</h1>
              </div>
            </Link>

            {/* Actions */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowSearch(true)}
                className="p-2 text-gray-600 hover:bg-green-100 rounded-xl transition-colors touch-target"
              >
                <Search className="h-5 w-5" />
              </button>
              
              {user && (
                <>
                  <Link
                    to="/notifications"
                    className="relative p-2 text-gray-600 hover:bg-green-100 rounded-xl transition-colors touch-target"
                  >
                    <Bell className="h-5 w-5" />
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                      3
                    </span>
                  </Link>
                  
                  <Link
                    to="/profile"
                    className="p-1 rounded-xl"
                  >
                    <img
                      src={user.avatar_url || 'https://images.pexels.com/photos/1139743/pexels-photo-1139743.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'}
                      alt={user.name}
                      className="h-8 w-8 rounded-lg border-2 border-green-300"
                    />
                  </Link>
                </>
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center space-x-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Ara..."
                className="w-full pl-10 pr-4 py-3 bg-white border-2 border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 text-sm mobile-input"
                autoFocus
              />
            </div>
            <button
              onClick={() => setShowSearch(false)}
              className="px-4 py-3 text-gray-600 font-medium touch-target"
            >
              İptal
            </button>
          </div>
        )}
      </div>
    </header>
  );
}