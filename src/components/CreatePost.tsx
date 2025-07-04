import React, { useState } from 'react';
import { Camera, MapPin, Tag, Send, X, Smile, Leaf, Sprout, TreePine, Flower, Upload } from 'lucide-react';
import { usePostStore } from '../store/postStore';
import { useAuthStore } from '../store/authStore';

interface CreatePostProps {
  currentUser: {
    name: string;
    avatar_url?: string;
  };
  season: string;
}

export default function CreatePost({ currentUser, season }: CreatePostProps) {
  const [content, setContent] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('genel');
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { createPost } = usePostStore();
  const { user } = useAuthStore();

  const categories = [
    { 
      id: 'genel', 
      name: 'Genel Bahçe', 
      icon: Leaf,
      color: 'from-green-400 to-emerald-500',
      bgColor: 'bg-green-100/50',
      textColor: 'text-green-700'
    },
    { 
      id: 'mahsul', 
      name: 'Hasat Zamanı', 
      icon: Sprout,
      color: 'from-yellow-400 to-orange-500',
      bgColor: 'bg-yellow-100/50',
      textColor: 'text-yellow-700'
    },
    { 
      id: 'hayvancilik', 
      name: 'Çiftlik Dostları', 
      icon: TreePine,
      color: 'from-blue-400 to-indigo-500',
      bgColor: 'bg-blue-100/50',
      textColor: 'text-blue-700'
    },
    { 
      id: 'teknoloji', 
      name: 'Akıllı Tarım', 
      icon: Flower,
      color: 'from-purple-400 to-pink-500',
      bgColor: 'bg-purple-100/50',
      textColor: 'text-purple-700'
    },
    { 
      id: 'pazar', 
      name: 'Yerel Pazar', 
      icon: Leaf,
      color: 'from-emerald-400 to-teal-500',
      bgColor: 'bg-emerald-100/50',
      textColor: 'text-emerald-700'
    },
    { 
      id: 'hava-durumu', 
      name: 'Doğa Takvimi', 
      icon: Sprout,
      color: 'from-orange-400 to-red-500',
      bgColor: 'bg-orange-100/50',
      textColor: 'text-orange-700'
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || !user) return;

    setIsSubmitting(true);
    
    try {
      await createPost(content, selectedCategory, selectedImage || undefined);
      setContent('');
      setSelectedCategory('genel');
      setSelectedImage(null);
      setImagePreview(null);
      setIsExpanded(false);
    } catch (error) {
      console.error('Create post error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-green-200/50 p-8 mb-8 relative overflow-hidden group hover:shadow-2xl transition-all duration-500">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50/30 via-emerald-50/20 to-teal-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="flex items-start space-x-6 relative z-10">
        <div className="relative">
          <img
            src={currentUser.avatar_url || 'https://images.pexels.com/photos/1139743/pexels-photo-1139743.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'}
            alt={currentUser.name}
            className="h-16 w-16 rounded-2xl border-3 border-green-300 shadow-lg"
          />
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
        </div>
        
        <div className="flex-1">
          <form onSubmit={handleSubmit}>
            <div className="relative">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                onFocus={() => setIsExpanded(true)}
                placeholder="Bugün bahçende neler oluyor? Deneyimlerini paylaş... 🌱"
                className="w-full p-6 border-2 border-green-200/50 rounded-2xl resize-none focus:outline-none focus:ring-4 focus:ring-green-500/20 focus:border-green-400 transition-all duration-300 text-gray-700 placeholder-green-500/70 bg-white/70 backdrop-blur-sm"
                rows={isExpanded ? 5 : 3}
                maxLength={500}
              />
              
              {/* Character count */}
              <div className="absolute bottom-3 right-3 text-xs text-green-500/70">
                {content.length}/500
              </div>
            </div>
            
            {/* Selected Image Preview */}
            {imagePreview && (
              <div className="mt-6 relative inline-block group">
                <img
                  src={imagePreview}
                  alt="Selected"
                  className="h-40 w-60 object-cover rounded-2xl border-2 border-green-300 shadow-lg"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors shadow-lg"
                >
                  <X className="h-4 w-4" />
                </button>
                <div className="absolute inset-0 bg-black/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            )}
            
            {isExpanded && (
              <div className="mt-6 space-y-6 animate-slide-up">
                {/* Categories */}
                <div>
                  <label className="block text-lg font-semibold text-gray-700 mb-4 flex items-center">
                    <Leaf className="h-5 w-5 mr-2 text-green-600" />
                    Hangi bahçe köşesinde?
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {categories.map((category) => {
                      const IconComponent = category.icon;
                      return (
                        <button
                          key={category.id}
                          type="button"
                          onClick={() => setSelectedCategory(category.id)}
                          className={`relative p-4 rounded-2xl text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                            selectedCategory === category.id
                              ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                              : `${category.bgColor} ${category.textColor} hover:shadow-md`
                          }`}
                        >
                          <div className="flex items-center space-x-2">
                            <IconComponent className="h-4 w-4" />
                            <span>{category.name}</span>
                          </div>
                          {selectedCategory === category.id && (
                            <div className="absolute inset-0 bg-white/20 rounded-2xl"></div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-lg font-semibold text-gray-700 mb-4 flex items-center">
                    <Camera className="h-5 w-5 mr-2 text-green-600" />
                    Fotoğraf ekle
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageSelect}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="flex items-center justify-center w-full p-6 border-2 border-dashed border-green-300 rounded-2xl hover:border-green-400 hover:bg-green-50/50 transition-all duration-300 cursor-pointer group"
                    >
                      <div className="text-center">
                        <Upload className="h-8 w-8 text-green-500 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                        <p className="text-green-600 font-medium">Fotoğraf yükle</p>
                        <p className="text-green-500 text-sm">veya sürükle bırak</p>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-green-200/50">
                  <div className="flex items-center space-x-3">
                    {[
                      { icon: MapPin, label: 'Konum', color: 'text-blue-600' },
                      { icon: Tag, label: 'Etiket', color: 'text-purple-600' },
                      { icon: Smile, label: 'Emoji', color: 'text-yellow-600' }
                    ].map((item, index) => (
                      <button
                        key={index}
                        type="button"
                        className={`flex items-center space-x-2 px-4 py-3 ${item.color} hover:bg-gray-100/50 rounded-2xl transition-all duration-300 hover:scale-105`}
                      >
                        <item.icon className="h-5 w-5" />
                        <span className="text-sm font-medium">{item.label}</span>
                      </button>
                    ))}
                  </div>
                  
                  <button
                    type="submit"
                    disabled={!content.trim() || isSubmitting}
                    className="flex items-center space-x-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-2xl hover:from-green-600 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                        <span className="font-medium">Bahçeye ekiliyor<span className="loading-dots"></span></span>
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        <span className="font-medium">Bahçeye Ekle</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}