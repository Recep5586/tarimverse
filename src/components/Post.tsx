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
      className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-green-200/50 mb-8 overflow-hidden group hover:shadow-2xl transition-all duration-500 relative"
    >
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50/20 via-emerald-50/10 to-teal-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Post Header */}
      <div className="p-8 relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-5">
            <div className="relative">
              <img
                src={post.user?.avatar_url || 'https://images.pexels.com/photos/1139743/pexels-photo-1139743.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'}
                alt={post.user?.name || 'User'}
                className="h-16 w-16 rounded-2xl border-3 border-green-300 shadow-lg"
              />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <h3 className="font-bold text-xl text-gray-900 hover:text-green-600 cursor-pointer transition-colors">
                {post.user?.name || 'Anonim Kullanıcı'}
              </h3>
              <div className="flex items-center space-x-3 text-sm text-gray-600 mt-1">
                <span className="font-medium">
                  {formatDistanceToNow(new Date(post.created_at), { addSuffix: true, locale: tr })}
                </span>
                {post.user?.location && (
                  <>
                    <span>•</span>
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4 text-green-500" />
                      <span>{post.user.location}</span>
                    </div>
                  </>
                )}
                <span>•</span>
                <div className={`flex items-center space-x-2 px-4 py-2 rounded-2xl ${categoryConfig.bgColor}`}>
                  <CategoryIcon className={`h-4 w-4 ${categoryConfig.textColor}`} />
                  <span className={`text-sm font-semibold ${categoryConfig.textColor}`}>
                    {categoryConfig.name}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <button
              onClick={() => setShowMoreMenu(!showMoreMenu)}
              className="p-3 hover:bg-green-100/50 rounded-2xl transition-colors"
            >
              <MoreHorizontal className="h-6 w-6 text-gray-500" />
            </button>
            
            {showMoreMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-green-200/50 py-3 z-20 animate-slide-up">
                <button
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className="flex items-center space-x-3 w-full px-5 py-3 text-sm text-gray-700 hover:bg-green-100/50 transition-colors rounded-xl mx-2"
                >
                  <Bookmark className={`h-5 w-5 ${isBookmarked ? 'fill-current text-green-600' : 'text-gray-500'}`} />
                  <span>{isBookmarked ? 'Kaydetmekten Çıkar' : 'Bahçeme Kaydet'}</span>
                </button>
                <button className="flex items-center space-x-3 w-full px-5 py-3 text-sm text-gray-700 hover:bg-green-100/50 transition-colors rounded-xl mx-2">
                  <Copy className="h-5 w-5 text-gray-500" />
                  <span>Linki Kopyala</span>
                </button>
                <button className="flex items-center space-x-3 w-full px-5 py-3 text-sm text-red-600 hover:bg-red-100/50 transition-colors rounded-xl mx-2">
                  <Flag className="h-5 w-5" />
                  <span>Şikayet Et</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Post Content */}
      <div className="px-8 pb-6 relative z-10">
        <p className="text-gray-900 whitespace-pre-wrap leading-relaxed text-lg">{post.content}</p>
      </div>

      {/* Post Image */}
      {post.image_url && (
        <div className="px-8 pb-6 relative z-10">
          <div className="relative group cursor-pointer" onClick={() => window.open(post.image_url, '_blank')}>
            <img
              src={post.image_url}
              alt="Post content"
              className="w-full h-96 object-cover rounded-2xl border-2 border-green-200/50 shadow-lg group-hover:shadow-xl transition-all duration-300"
            />
            <div className="absolute inset-0 bg-black/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </div>
      )}

      {/* Post Stats */}
      <div className="px-8 py-4 border-t border-green-200/30 relative z-10">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center space-x-6">
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
      <div className="px-8 py-5 border-t border-green-200/30 relative z-10">
        <div className="flex items-center justify-around">
          <button
            onClick={handleLike}
            className={`flex items-center space-x-3 px-8 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 ${
              post.is_liked
                ? 'text-red-600 bg-red-100/50 shadow-lg'
                : 'text-gray-600 hover:bg-green-100/50'
            }`}
          >
            <Heart className={`h-6 w-6 ${post.is_liked ? 'fill-current animate-pulse' : ''}`} />
            <span className="font-semibold">Beğen</span>
          </button>
          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center space-x-3 px-8 py-4 rounded-2xl text-gray-600 hover:bg-green-100/50 transition-all duration-300 transform hover:scale-105"
          >
            <MessageCircle className="h-6 w-6" />
            <span className="font-semibold">Yorum</span>
          </button>
          <button
            onClick={handleShare}
            className="flex items-center space-x-3 px-8 py-4 rounded-2xl text-gray-600 hover:bg-green-100/50 transition-all duration-300 transform hover:scale-105"
          >
            <Share className="h-6 w-6" />
            <span className="font-semibold">Paylaş</span>
          </button>
        </div>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="border-t border-green-200/30 bg-green-50/30 backdrop-blur-sm animate-slide-up relative z-10">
          <div className="p-8">
            {/* Comment Input */}
            {user && (
              <form onSubmit={handleSubmitComment} className="flex space-x-4 mb-8">
                <img
                  src={user.avatar_url || 'https://images.pexels.com/photos/1139743/pexels-photo-1139743.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'}
                  alt="Your avatar"
                  className="h-12 w-12 rounded-2xl border-2 border-green-300 shadow-lg"
                />
                <div className="flex-1">
                  <input
                    type="text"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Düşüncelerini paylaş... 🌿"
                    className="w-full px-6 py-4 bg-white/70 backdrop-blur-sm border-2 border-green-200/50 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-500/20 focus:border-green-400 transition-all duration-300 placeholder-green-500/70"
                  />
                </div>
              </form>
            )}

            {/* Comments List */}
            <div className="space-y-6">
              {comments.map((comment) => (
                <div key={comment.id} className="flex space-x-4">
                  <img
                    src={comment.user?.avatar_url || 'https://images.pexels.com/photos/1139743/pexels-photo-1139743.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'}
                    alt={comment.user?.name || 'User'}
                    className="h-12 w-12 rounded-2xl border-2 border-green-300 shadow-lg"
                  />
                  <div className="flex-1">
                    <div className="bg-white/70 backdrop-blur-sm rounded-2xl px-6 py-4 border border-green-200/50 shadow-lg">
                      <div className="font-bold text-sm text-gray-900 mb-2">{comment.user?.name || 'Anonim'}</div>
                      <div className="text-sm text-gray-700 leading-relaxed">{comment.content}</div>
                    </div>
                    <div className="flex items-center space-x-6 mt-3 text-xs text-gray-500">
                      <span className="font-medium">
                        {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true, locale: tr })}
                      </span>
                      <button className="hover:text-red-600 transition-colors font-medium">
                        Beğen ({comment.likes_count})
                      </button>
                      <button className="hover:text-green-600 transition-colors font-medium">
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