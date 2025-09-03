import React from 'react';
import { Database, RefreshCw, Trash2, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import localDB from '../../lib/localDatabase';
import toast from 'react-hot-toast';

export default function DemoData() {
  const handleResetData = () => {
    if (window.confirm('Tüm demo verileri sıfırlanacak. Emin misiniz?')) {
      localStorage.clear();
      localDB.init();
      window.location.reload();
      toast.success('Demo verileri sıfırlandı!');
    }
  };

  const handleExportData = () => {
    const data = {
      users: JSON.parse(localStorage.getItem('tarimverse_users') || '[]'),
      posts: JSON.parse(localStorage.getItem('tarimverse_posts') || '[]'),
      marketItems: JSON.parse(localStorage.getItem('tarimverse_market_items') || '[]'),
      comments: JSON.parse(localStorage.getItem('tarimverse_comments') || '[]')
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tarimverse-data-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    toast.success('Veriler indirildi!');
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-green-200/50 p-6">
      <div className="flex items-center space-x-3 mb-4">
        <Database className="h-6 w-6 text-blue-600" />
        <h3 className="text-lg font-bold text-gray-900">Demo Veri Yönetimi</h3>
      </div>
      
      <p className="text-gray-600 text-sm mb-6">
        Bu proje yerel veri depolama kullanır. Verileriniz tarayıcınızda saklanır.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={() => localDB.init()}
          className="flex items-center space-x-2 bg-green-100 text-green-700 px-4 py-3 rounded-xl hover:bg-green-200 transition-colors"
        >
          <RefreshCw className="h-4 w-4" />
          <span className="text-sm font-medium">Verileri Yenile</span>
        </button>

        <button
          onClick={handleExportData}
          className="flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-3 rounded-xl hover:bg-blue-200 transition-colors"
        >
          <Download className="h-4 w-4" />
          <span className="text-sm font-medium">Verileri İndir</span>
        </button>

        <button
          onClick={handleResetData}
          className="flex items-center space-x-2 bg-red-100 text-red-700 px-4 py-3 rounded-xl hover:bg-red-200 transition-colors"
        >
          <Trash2 className="h-4 w-4" />
          <span className="text-sm font-medium">Sıfırla</span>
        </button>
      </div>
    </div>
  );
}