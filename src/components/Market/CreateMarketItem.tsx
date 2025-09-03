import React, { useState } from 'react';
import { X, Camera, MapPin, DollarSign, Package, FileText } from 'lucide-react';
import { useMarketStore } from '../../store/marketStore';
import { motion } from 'framer-motion';

interface CreateMarketItemProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateMarketItem({ isOpen, onClose }: CreateMarketItemProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: 'Sebze',
    location: '',
    images: [] as string[]
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { createItem, categories } = useMarketStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.price || !formData.location) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      await createItem({
        title: formData.title,
        description: formData.description,
        price: parseFloat(formData.price),
        category: formData.category,
        location: formData.location,
        images: formData.images,
        status: 'active'
      });
      
      setFormData({
        title: '',
        description: '',
        price: '',
        category: 'Sebze',
        location: '',
        images: []
      });
      onClose();
    } catch (error) {
      console.error('Create item error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl border border-green-200/50 p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Ürün Ekle</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <X className="h-6 w-6 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Ürün Adı *
            </label>
            <div className="relative">
              <Package className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-500" />
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                className="w-full pl-12 pr-4 py-3 bg-white/70 border-2 border-green-200/50 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-500/20 focus:border-green-400 transition-all duration-300"
                placeholder="Organik domates, taze salatalık..."
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Açıklama *
            </label>
            <div className="relative">
              <FileText className="absolute left-4 top-4 h-5 w-5 text-green-500" />
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                rows={4}
                className="w-full pl-12 pr-4 py-3 bg-white/70 border-2 border-green-200/50 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-500/20 focus:border-green-400 transition-all duration-300 resize-none"
                placeholder="Ürününüz hakkında detaylı bilgi verin..."
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Fiyat (₺) *
              </label>
              <div className="relative">
                <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-500" />
                <input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  required
                  className="w-full pl-12 pr-4 py-3 bg-white/70 border-2 border-green-200/50 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-500/20 focus:border-green-400 transition-all duration-300"
                  placeholder="15.50"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Kategori *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3 bg-white/70 border-2 border-green-200/50 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-500/20 focus:border-green-400 transition-all duration-300"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Konum *
            </label>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-500" />
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                required
                className="w-full pl-12 pr-4 py-3 bg-white/70 border-2 border-green-200/50 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-500/20 focus:border-green-400 transition-all duration-300"
                placeholder="İstanbul, Ankara, İzmir..."
              />
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-2xl hover:bg-gray-50 transition-colors"
            >
              İptal
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl hover:from-green-600 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              {isSubmitting ? 'Ekleniyor...' : 'Ürün Ekle'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}