import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, Share, MoreHorizontal, MapPin, Bookmark, Flag, Copy, Leaf, Sprout, TreePine, Flower } from 'lucide-react';
import { usePostStore } from '../store/postStore';
import { useAuthStore } from '../store/authStore';
import { formatDistanceToNow } from 'date-fns';
import { tr } from 'date-fns/locale';
import { motion } from 'framer-motion';

interface PostProps {
  post: any;
  season: string;
}

export default function Post({ post, season }: PostProps) {
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const { likePost, addComment, fetchComments, comments, sharePost } = usePostStore();
  const { user } = useAuthStore();

  useEffect(() => {
    if (showComments) {
      fetchComments(post.id);
    }
  }, [showComments, post.id]);

  const getCategoryConfig = (category: string) => {
    const configs: Record<string, any> = {
      'genel': { 
        name: 'Genel Bahçe', 
        icon: Leaf,
        gradient: 'from-green-400 to-emerald-500',
        bgColor: 'bg-green-100/50',
        textColor: 'text-green-700'
      },
      'mahsul': { 
        name: 'Hasat Zamanı', 
        icon: Sprout,
        gradient: 'from-yellow-400 to-orange-500',
        bgColor: 'bg-yellow-100/50',
        textColor: 'text-yellow-700'
      },
      'hayvancilik': { 
        name: 'Çiftlik Dostları', 
        icon: TreePine,
        gradient: 'from-blue-400 to-indigo-500',
        bgColor: 'bg-blue-100/50',
        textColor: 'text-blue-700'
      },
      'teknoloji': { 
        name: 'Akıllı Tarım', 
        icon: Flower,
        gradient: 'from-purple-400 to-pink-500',
        bgColor: 'bg-purple-100/50',
        textColor: 'text-purple-700'
      },
      'pazar': { 
        name: 'Yerel Pazar', 
        icon: Leaf,
        gradient: 'from-emerald-400 to-teal-500',
        bgColor: 'bg-emerald-100/50',
        textColor: 'text-emerald-700'
      },
      'hava-durumu': { 
        name: 'Doğa Takvimi', 
        icon: Sprout,
        gradient: 'from-orange-400 to-red-500',
        bgColor: 'bg-orange-100/50',
        textColor: 'text-orange-700'
      }
    };
    return configs[category] || configs['genel'];
  };

  const categoryConfig = getCategoryConfig(post.category);
  const CategoryIcon = categoryConfig.icon;

  const handleLike = () => {
    if (user) {
      likePost(post.id);
    }
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim() && user) {
      addComment(post.id, commentText);
      setCommentText('');
    }
  };

  const handleShare = () => {
    sharePost(post.id);
    if (navigator.share) {
      navigator.share({
        title: `${post.user?.name} - TarımVerse`,
        text: post.content,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 backdrop-blur-sm rounded-2xl lg:rounded-3xl shadow-xl border border-green-200/50 mb-6 lg:mb-8 overflow-hidden group hover:shadow-2xl transition-all duration-500 relative mx-4 lg:mx-0"
    >
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50/20 via-emerald-50/10 to-teal-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Post Header */}
      <div className="p-4 lg:p-8 relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 lg:space-x-5">
            <div className="relative">
              <img
                src={post.user?.avatar_url || 'https://images.pexels.com/photos/1139743/pexels-photo-1139743.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'}
                alt={post.user?.name || 'User'}
                className="h-12 w-12 lg:h-16 lg:w-16 rounded-xl lg:rounded-2xl border-2 lg:border-3 border-green-300 shadow-lg"
              />
              <div className="absolute -bottom-0.5 -right-0.5 lg:-bottom-1 lg:-right-1 w-3 h-3 lg:w-5 lg:h-5 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <h3 className="font-bold text-lg lg:text-xl text-gray-900 hover:text-green-600 cursor-pointer transition-colors">
                {post.user?.name || 'Anonim Kullanıcı'}
              </h3>
              <div className="flex items-center space-x-2 lg:space-x-3 text-xs lg:text-sm text-gray-600 mt-1">
                <span className="font-medium">
                  {formatDistanceToNow(new Date(post.created_at), { addSuffix: true, locale: tr })}
                </span>
                {post.user?.location && (
                  <>
                    <span>•</span>
                    <div className="flex items-center space-x-1 hidden sm:flex">
                      <MapPin className="h-4 w-4 text-green-500" />
                      <span>{post.user.location}</span>
                    </div>
                  </>
                )}
                <span>•</span>
                <div className={`flex items-center space-x-1 lg:space-x-2 px-2 lg:px-4 py-1 lg:py-2 rounded-xl lg:rounded-2xl ${categoryConfig.bgColor}`}>
                  <CategoryIcon className={`h-4 w-4 ${categoryConfig.textColor}`} />
                  <span className={`text-xs lg:text-sm font-semibold ${categoryConfig.textColor} hidden sm:inline`}>
                    {categoryConfig.name}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <button
              onClick={() => setShowMoreMenu(!showMoreMenu)}
              className="p-2 lg:p-3 hover:bg-green-100/50 rounded-xl lg:rounded-2xl transition-colors touch-target"
            >
              <MoreHorizontal className="h-5 w-5 lg:h-6 lg:w-6 text-gray-500" />
            </button>
            
            {showMoreMenu && (
              <div className="absolute right-0 mt-2 w-48 lg:w-56 bg-white/90 backdrop-blur-md rounded-xl lg:rounded-2xl shadow-2xl border border-green-200/50 py-2 lg:py-3 z-20 animate-slide-up">
                <button
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className="flex items-center space-x-2 lg:space-x-3 w-full px-3 lg:px-5 py-2 lg:py-3 text-xs lg:text-sm text-gray-700 hover:bg-green-100/50 transition-colors rounded-lg lg:rounded-xl mx-1 lg:mx-2 touch-target"
                >
                  <Bookmark className={`h-4 w-4 lg:h-5 lg:w-5 ${isBookmarked ? 'fill-current text-green-600' : 'text-gray-500'}`} />
                  <span>{isBookmarked ? 'Kaydetmekten Çıkar' : 'Bahçeme Kaydet'}</span>
                </button>
                <button className="flex items-center space-x-2 lg:space-x-3 w-full px-3 lg:px-5 py-2 lg:py-3 text-xs lg:text-sm text-gray-700 hover:bg-green-100/50 transition-colors rounded-lg lg:rounded-xl mx-1 lg:mx-2 touch-target">
                  <Copy className="h-4 w-4 lg:h-5 lg:w-5 text-gray-500" />
                  <span>Linki Kopyala</span>
                </button>
                <button className="flex items-center space-x-2 lg:space-x-3 w-full px-3 lg:px-5 py-2 lg:py-3 text-xs lg:text-sm text-red-600 hover:bg-red-100/50 transition-colors rounded-lg lg:rounded-xl mx-1 lg:mx-2 touch-target">
                  <Flag className="h-4 w-4 lg:h-5 lg:w-5" />
                  <span>Şikayet Et</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Post Content */}
      <div className="px-4 lg:px-8 pb-4 lg:pb-6 relative z-10">
        <p className="text-gray-900 whitespace-pre-wrap leading-relaxed text-sm lg:text-lg">{post.content}</p>
      </div>

      {/* Post Image */}
      {post.image_url && (
        <div className="px-4 lg:px-8 pb-4 lg:pb-6 relative z-10">
          <div className="relative group cursor-pointer" onClick={() => window.open(post.image_url, '_blank')}>
            <img
              src={post.image_url}
              alt="Post content"
              className="w-full h-48 lg:h-96 object-cover rounded-xl lg:rounded-2xl border-2 border-green-200/50 shadow-lg group-hover:shadow-xl transition-all duration-300"
            />
            <div className="absolute inset-0 bg-black/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </div>
      )}

      {/* Post Stats */}
      <div className="px-4 lg:px-8 py-3 lg:py-4 border-t border-green-200/30 relative z-10">
        <div className="flex items-center justify-between text-xs lg:text-sm text-gray-600">
          <div className="flex items-center space-x-4 lg:space-x-6">
            <span className="hover:text-green-600 cursor-pointer transition-colors font-medium">
              {post.likes_count} beğeni
            </span>
            <span className="hover:text-green-600 cursor-pointer transition-colors font-medium">
              {post.comments_count} yorum
            </span>
          </div>
          <span className="font-medium">{post.shares_count || 0} paylaşım</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-4 lg:px-8 py-4 lg:py-5 border-t border-green-200/30 relative z-10">
        <div className="flex items-center justify-around">
          <button
            onClick={handleLike}
            className={`flex items-center space-x-2 lg:space-x-3 px-4 lg:px-8 py-3 lg:py-4 rounded-xl lg:rounded-2xl transition-all duration-300 transform hover:scale-105 touch-target ${
              post.is_liked
                ? 'text-red-600 bg-red-100/50 shadow-lg'
                : 'text-gray-600 hover:bg-green-100/50'
            }`}
          >
            <Heart className={`h-5 w-5 lg:h-6 lg:w-6 ${post.is_liked ? 'fill-current animate-pulse' : ''}`} />
            <span className="font-semibold text-sm lg:text-base">Beğen</span>
          </button>
          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center space-x-2 lg:space-x-3 px-4 lg:px-8 py-3 lg:py-4 rounded-xl lg:rounded-2xl text-gray-600 hover:bg-green-100/50 transition-all duration-300 transform hover:scale-105 touch-target"
          >
            <MessageCircle className="h-5 w-5 lg:h-6 lg:w-6" />
            <span className="font-semibold text-sm lg:text-base">Yorum</span>
          </button>
          <button
            onClick={handleShare}
            className="flex items-center space-x-2 lg:space-x-3 px-4 lg:px-8 py-3 lg:py-4 rounded-xl lg:rounded-2xl text-gray-600 hover:bg-green-100/50 transition-all duration-300 transform hover:scale-105 touch-target"
          >
            <Share className="h-5 w-5 lg:h-6 lg:w-6" />
            <span className="font-semibold text-sm lg:text-base">Paylaş</span>
          </button>
        </div>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="border-t border-green-200/30 bg-green-50/30 backdrop-blur-sm animate-slide-up relative z-10">
          <div className="p-4 lg:p-8">
            {/* Comment Input */}
            {user && (
              <form onSubmit={handleSubmitComment} className="flex space-x-3 lg:space-x-4 mb-6 lg:mb-8">
                <img
                  src={user.avatar_url || 'https://images.pexels.com/photos/1139743/pexels-photo-1139743.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'}
                  alt="Your avatar"
                  className="h-10 w-10 lg:h-12 lg:w-12 rounded-xl lg:rounded-2xl border-2 border-green-300 shadow-lg"
                />
                <div className="flex-1">
                  <input
                    type="text"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Düşüncelerini paylaş... 🌿"
                    className="w-full px-4 lg:px-6 py-3 lg:py-4 bg-white/70 backdrop-blur-sm border-2 border-green-200/50 rounded-xl lg:rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-500/20 focus:border-green-400 transition-all duration-300 placeholder-green-500/70 mobile-input"
                  />
                </div>
              </form>
            )}

            {/* Comments List */}
            <div className="space-y-4 lg:space-y-6">
              {comments.map((comment) => (
                <div key={comment.id} className="flex space-x-3 lg:space-x-4">
                  <img
                    src={comment.user?.avatar_url || 'https://images.pexels.com/photos/1139743/pexels-photo-1139743.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'}
                    alt={comment.user?.name || 'User'}
                    className="h-8 w-8 lg:h-12 lg:w-12 rounded-xl lg:rounded-2xl border-2 border-green-300 shadow-lg"
                  />
                  <div className="flex-1">
                    <div className="bg-white/70 backdrop-blur-sm rounded-xl lg:rounded-2xl px-4 lg:px-6 py-3 lg:py-4 border border-green-200/50 shadow-lg">
                      <div className="font-bold text-xs lg:text-sm text-gray-900 mb-1 lg:mb-2">{comment.user?.name || 'Anonim'}</div>
                      <div className="text-xs lg:text-sm text-gray-700 leading-relaxed">{comment.content}</div>
                    </div>
                    <div className="flex items-center space-x-4 lg:space-x-6 mt-2 lg:mt-3 text-xs text-gray-500">
                      <span className="font-medium">
                        {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true, locale: tr })}
                      </span>
                      <button className="hover:text-red-600 transition-colors font-medium touch-target">
                        Beğen ({comment.likes_count})
                      </button>
                      <button className="hover:text-green-600 transition-colors font-medium touch-target">
                        Yanıtla
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}