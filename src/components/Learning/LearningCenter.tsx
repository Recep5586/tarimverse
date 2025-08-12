import React, { useState, useEffect } from 'react';
import { BookOpen, Play, Award, Clock, Star, User, Search, Filter, CheckCircle, PlayCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../../store/authStore';

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  instructorAvatar: string;
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  rating: number;
  students: number;
  category: string;
  thumbnail: string;
  lessons: number;
  completed: boolean;
  progress: number;
}

interface Article {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  authorAvatar: string;
  readTime: string;
  category: string;
  publishedAt: string;
  likes: number;
  thumbnail: string;
}

export default function LearningCenter() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [activeTab, setActiveTab] = useState('courses');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const { user } = useAuthStore();

  useEffect(() => {
    // Mock courses data
    setCourses([
      {
        id: '1',
        title: 'Organik Tarıma Giriş',
        description: 'Organik tarımın temellerini öğrenin ve sürdürülebilir tarım tekniklerini keşfedin.',
        instructor: 'Dr. Mehmet Özkan',
        instructorAvatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
        duration: '4 saat',
        level: 'beginner',
        rating: 4.8,
        students: 1250,
        category: 'Organik Tarım',
        thumbnail: 'https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg?auto=compress&cs=tinysrgb&w=800',
        lessons: 12,
        completed: false,
        progress: 0
      },
      {
        id: '2',
        title: 'Akıllı Sulama Sistemleri',
        description: 'Modern sulama teknolojileri ve su tasarrufu yöntemlerini öğrenin.',
        instructor: 'Mühendis Fatma Kaya',
        instructorAvatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
        duration: '3 saat',
        level: 'intermediate',
        rating: 4.9,
        students: 890,
        category: 'Teknoloji',
        thumbnail: 'https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg?auto=compress&cs=tinysrgb&w=800',
        lessons: 8,
        completed: true,
        progress: 100
      },
      {
        id: '3',
        title: 'Bitki Hastalıkları ve Mücadele',
        description: 'Bitki hastalıklarını tanıyın ve etkili mücadele yöntemlerini uygulayın.',
        instructor: 'Prof. Dr. Ayşe Demir',
        instructorAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
        duration: '6 saat',
        level: 'advanced',
        rating: 4.7,
        students: 567,
        category: 'Hastalık Yönetimi',
        thumbnail: 'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&cs=tinysrgb&w=800',
        lessons: 15,
        completed: false,
        progress: 45
      }
    ]);

    // Mock articles data
    setArticles([
      {
        id: '1',
        title: 'Toprak Sağlığını Artırmanın 10 Yolu',
        excerpt: 'Sağlıklı toprak, verimli tarımın temelidir. Bu makalede toprak sağlığını artırmak için pratik yöntemler...',
        author: 'Ahmet Karaca',
        authorAvatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
        readTime: '8 dk',
        category: 'Toprak Bilimi',
        publishedAt: '2024-06-15',
        likes: 234,
        thumbnail: 'https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg?auto=compress&cs=tinysrgb&w=800'
      },
      {
        id: '2',
        title: 'İklim Değişikliği ve Tarım',
        excerpt: 'İklim değişikliğinin tarım üzerindeki etkileri ve adaptasyon stratejileri hakkında bilmeniz gerekenler...',
        author: 'Fatma Öztürk',
        authorAvatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
        readTime: '12 dk',
        category: 'İklim',
        publishedAt: '2024-06-10',
        likes: 189,
        thumbnail: 'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&cs=tinysrgb&w=800'
      }
    ]);
  }, []);

  const categories = ['Tümü', 'Organik Tarım', 'Teknoloji', 'Hastalık Yönetimi', 'Toprak Bilimi', 'İklim'];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || selectedCategory === 'Tümü' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || selectedCategory === 'Tümü' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getLevelText = (level: string) => {
    switch (level) {
      case 'beginner': return 'Başlangıç';
      case 'intermediate': return 'Orta';
      case 'advanced': return 'İleri';
      default: return level;
    }
  };

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-green-200/50 p-12">
          <BookOpen className="h-16 w-16 text-green-400 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Öğrenme Merkezi</h2>
          <p className="text-gray-600 mb-6">Eğitim içeriklerine erişmek için giriş yapmalısınız.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 text-white shadow-2xl mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2 flex items-center">
              <BookOpen className="h-8 w-8 mr-3" />
              Öğrenme Merkezi
            </h1>
            <p className="text-indigo-100">Tarım bilginizi geliştirin ve uzmanlaşın</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{courses.filter(c => c.completed).length}</div>
            <div className="text-indigo-200 text-sm">Tamamlanan Kurs</div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-green-200/50 p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Kurs veya makale ara..."
              className="w-full pl-12 pr-4 py-3 bg-white/70 border-2 border-green-200/50 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-500/20 focus:border-green-400 transition-all duration-300"
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-3 bg-white/70 border-2 border-green-200/50 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-500/20 focus:border-green-400 transition-all duration-300"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          <div className="flex space-x-2">
            {[
              { id: 'courses', label: 'Kurslar', icon: Play },
              { id: 'articles', label: 'Makaleler', icon: BookOpen }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-2xl transition-all duration-300 flex-1 justify-center ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                    : 'hover:bg-gray-100 text-gray-600'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      {activeTab === 'courses' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-green-200/50 overflow-hidden group hover:shadow-2xl transition-all duration-500"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${getLevelColor(course.level)}`}>
                    {getLevelText(course.level)}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <div className="bg-black/50 text-white px-2 py-1 rounded-lg text-xs font-medium">
                    {course.lessons} ders
                  </div>
                </div>
                {course.completed && (
                  <div className="absolute bottom-4 right-4">
                    <CheckCircle className="h-6 w-6 text-green-500 bg-white rounded-full" />
                  </div>
                )}
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                  {course.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>

                <div className="flex items-center space-x-2 mb-4">
                  <img
                    src={course.instructorAvatar}
                    alt={course.instructor}
                    className="h-8 w-8 rounded-full border border-gray-300"
                  />
                  <span className="text-sm font-medium text-gray-700">{course.instructor}</span>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span>{course.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <User className="h-4 w-4" />
                      <span>{course.students}</span>
                    </div>
                  </div>
                </div>

                {course.progress > 0 && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-600">İlerleme</span>
                      <span className="font-medium text-gray-900">{course.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                <button className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 rounded-2xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 font-medium flex items-center justify-center space-x-2">
                  <PlayCircle className="h-5 w-5" />
                  <span>{course.completed ? 'Tekrar İzle' : course.progress > 0 ? 'Devam Et' : 'Başla'}</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {activeTab === 'articles' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredArticles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-green-200/50 overflow-hidden group hover:shadow-2xl transition-all duration-500"
            >
              <div className="flex">
                <div className="flex-1 p-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs font-bold">
                      {article.category}
                    </span>
                    <span className="text-xs text-gray-500">{article.readTime} okuma</span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{article.excerpt}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <img
                        src={article.authorAvatar}
                        alt={article.author}
                        className="h-8 w-8 rounded-full border border-gray-300"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-700">{article.author}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(article.publishedAt).toLocaleDateString('tr-TR')}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-1 text-red-500">
                      <Star className="h-4 w-4" />
                      <span className="text-sm font-medium">{article.likes}</span>
                    </div>
                  </div>
                </div>

                <div className="w-32 h-full">
                  <img
                    src={article.thumbnail}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}