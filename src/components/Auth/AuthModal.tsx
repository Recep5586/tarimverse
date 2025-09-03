import React, { useState } from 'react';
import { X, Mail, Lock, User, Leaf } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { motion, AnimatePresence } from 'framer-motion';
import DemoLogin from '../Demo/DemoLogin';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'signin' | 'signup';
}

export default function AuthModal({ isOpen, onClose, initialMode = 'signin' }: AuthModalProps) {
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { signIn, signUp } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === 'signin') {
        await signIn(email, password);
      } else {
        await signUp(email, password, name);
      }
      onClose();
      resetForm();
    } catch (error) {
      console.error('Auth error:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setName('');
  };

  const switchMode = () => {
    setMode(mode === 'signin' ? 'signup' : 'signin');
    resetForm();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl border border-green-200/50 p-8 w-full max-w-md"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 hover:bg-green-100/50 rounded-2xl transition-colors"
            >
              <X className="h-6 w-6 text-gray-500" />
            </button>

            <div className="text-center mb-8">
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-4 rounded-2xl w-16 h-16 mx-auto mb-4 shadow-xl">
                <Leaf className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {mode === 'signin' ? 'Bahçene Dön' : 'Bahçeye Katıl'}
              </h2>
              <p className="text-green-600">
                {mode === 'signin' 
                  ? 'Tarım topluluğuna tekrar hoş geldin!' 
                  : 'Türkiye\'nin en büyük tarım topluluğuna katıl!'
                }
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {mode === 'signup' && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Ad Soyad
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-500" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full pl-12 pr-4 py-4 bg-white/70 border-2 border-green-200/50 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-500/20 focus:border-green-400 transition-all duration-300"
                      placeholder="Adınız ve soyadınız"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  E-posta
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-4 bg-white/70 border-2 border-green-200/50 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-500/20 focus:border-green-400 transition-all duration-300"
                    placeholder="ornek@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Şifre
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-500" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    className="w-full pl-12 pr-4 py-4 bg-white/70 border-2 border-green-200/50 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-500/20 focus:border-green-400 transition-all duration-300"
                    placeholder="En az 6 karakter"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-2xl font-semibold hover:from-green-600 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    <span>İşleniyor...</span>
                  </div>
                ) : (
                  mode === 'signin' ? 'Giriş Yap' : 'Hesap Oluştur'
                )}
              </button>
            </form>

            <div className="mt-8 text-center">
              <DemoLogin />
              <p className="text-gray-600">
                {mode === 'signin' ? 'Hesabın yok mu?' : 'Zaten hesabın var mı?'}
                <button
                  onClick={switchMode}
                  className="ml-2 text-green-600 font-semibold hover:text-green-700 transition-colors"
                >
                  {mode === 'signin' ? 'Kayıt Ol' : 'Giriş Yap'}
                </button>
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}