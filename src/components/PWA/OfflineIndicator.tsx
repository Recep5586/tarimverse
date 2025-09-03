import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function OfflineIndicator() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showIndicator, setShowIndicator] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowIndicator(true);
      setTimeout(() => setShowIndicator(false), 3000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowIndicator(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <AnimatePresence>
      {showIndicator && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className={`fixed top-4 left-4 right-4 md:left-auto md:right-4 md:w-80 z-50 ${
            isOnline 
              ? 'bg-green-500' 
              : 'bg-red-500'
          } text-white rounded-2xl shadow-2xl p-4`}
        >
          <div className="flex items-center space-x-3">
            {isOnline ? (
              <Wifi className="h-6 w-6" />
            ) : (
              <WifiOff className="h-6 w-6" />
            )}
            <div>
              <p className="font-semibold">
                {isOnline ? 'Bağlantı Yeniden Kuruldu' : 'İnternet Bağlantısı Yok'}
              </p>
              <p className="text-sm opacity-90">
                {isOnline 
                  ? 'Tüm özellikler kullanılabilir' 
                  : 'Çevrimdışı modda çalışıyorsunuz'
                }
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}