import React from 'react';
import { User, Zap } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { motion } from 'framer-motion';

export default function DemoLogin() {
  const { signIn } = useAuthStore();

  const demoUsers = [
    {
      email: 'ahmet@example.com',
      password: 'demo123',
      name: 'Ahmet Karaca',
      role: 'Çiftçi',
      description: 'Organik tarım uzmanı'
    },
    {
      email: 'fatma@example.com',
      password: 'demo123',
      name: 'Fatma Öztürk',
      role: 'Sera Uzmanı',
      description: 'Teknoloji ve sera tarımı'
    }
  ];

  const handleDemoLogin = async (email: string, password: string) => {
    try {
      await signIn(email, password);
    } catch (error) {
      console.error('Demo login error:', error);
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-green-200/50 p-6 mb-8">
      <div className="flex items-center space-x-3 mb-4">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-2 rounded-xl">
          <Zap className="h-5 w-5 text-white" />
        </div>
        <h3 className="text-lg font-bold text-gray-900">Demo Hesapları</h3>
      </div>
      
      <p className="text-gray-600 text-sm mb-4">
        Hızlıca test etmek için demo hesaplarından birini kullanabilirsiniz:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {demoUsers.map((user, index) => (
          <motion.button
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => handleDemoLogin(user.email, user.password)}
            className="flex items-center space-x-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200 hover:from-green-100 hover:to-emerald-100 transition-all duration-300 text-left"
          >
            <User className="h-8 w-8 text-green-600" />
            <div>
              <h4 className="font-bold text-gray-900">{user.name}</h4>
              <p className="text-sm text-green-600">{user.role}</p>
              <p className="text-xs text-gray-500">{user.description}</p>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}