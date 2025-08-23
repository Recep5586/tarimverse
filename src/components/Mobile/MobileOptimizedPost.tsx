import React, { useState } from 'react';
import { Heart, MessageCircle, Share, MoreHorizontal, MapPin } from 'lucide-react';
import { usePostStore } from '../../store/postStore';
import { useAuthStore } from '../../store/authStore';
import { formatDistanceToNow } from 'date-fns';
import { tr } from 'date-fns/locale';
import { motion } from 'framer-motion';

interface MobileOptimizedPostProps {
  post: any;
  season: string;
}

export default function MobileOptimizedPost({ post, season }: MobileOptimizedPostProps) {
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const { likePost, addComment, sharePost } = usePostStore();
  const { user } = useAuthStore();

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
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-lg border border-gray-200 mb-4 overflow-hidden"
    >
      {/* Mobile Post Header */}
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img
              src={post.user?.avatar_url || 'https://images.pexels.com/photos/1139743/pexels-photo-1139743.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'}
              alt={post.user?.name || 'User'}
              className="h-10 w-10 rounded-xl border-2 border-green-300"
            />
            <div>
              <h3 className="font-bold text-gray-900 text-sm">
                {post.user?.name || 'Anonim Kullanıcı'}
              </h3>
              <div className="flex items-center space-x-2 text-xs text-gray-600">
                <span>{formatDistanceToNow(new Date(post.created_at), { addSuffix: true, locale: tr })}</span>
                {post.user?.location && (
                  <>
                    <span>•</span>
                    <MapPin className="h-3 w-3" />
                    <span>{post.user.location}</span>
                  </>
                )}
              </div>
            </div>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors touch-target">
            <MoreHorizontal className="h-5 w-5 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Mobile Post Content */}
      <div className="px-4 pb-3">
        <p className="text-gray-900 text-sm leading-relaxed">{post.content}</p>
      </div>

      {/* Mobile Post Image */}
      {post.image_url && (
        <div className="px-4 pb-3">
          <img
            src={post.image_url}
            alt="Post content"
            className="w-full h-48 object-cover rounded-xl border border-gray-200"
          />
        </div>
      )}

      {/* Mobile Stats */}
      <div className="px-4 py-2 border-t border-gray-100">
        <div className="flex items-center justify-between text-xs text-gray-600">
          <div className="flex items-center space-x-4">
            <span>{post.likes_count} beğeni</span>
            <span>{post.comments_count} yorum</span>
          </div>
          <span>{post.shares_count || 0} paylaşım</span>
        </div>
      </div>

      {/* Mobile Action Buttons */}
      <div className="px-4 py-3 border-t border-gray-100">
        <div className="flex items-center justify-around">
          <button
            onClick={handleLike}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 touch-target ${
              post.is_liked
                ? 'text-red-600 bg-red-50'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Heart className={`h-5 w-5 ${post.is_liked ? 'fill-current' : ''}`} />
            <span className="text-sm font-medium">Beğen</span>
          </button>
          
          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center space-x-2 px-4 py-2 rounded-xl text-gray-600 hover:bg-gray-50 transition-all duration-200 touch-target"
          >
            <MessageCircle className="h-5 w-5" />
            <span className="text-sm font-medium">Yorum</span>
          </button>
          
          <button
            onClick={handleShare}
            className="flex items-center space-x-2 px-4 py-2 rounded-xl text-gray-600 hover:bg-gray-50 transition-all duration-200 touch-target"
          >
            <Share className="h-5 w-5" />
            <span className="text-sm font-medium">Paylaş</span>
          </button>
        </div>
      </div>

      {/* Mobile Comments */}
      {showComments && (
        <div className="border-t border-gray-100 bg-gray-50">
          <div className="p-4">
            {user && (
              <form onSubmit={handleSubmitComment} className="flex space-x-3 mb-4">
                <img
                  src={user.avatar_url || 'https://images.pexels.com/photos/1139743/pexels-photo-1139743.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'}
                  alt="Your avatar"
                  className="h-8 w-8 rounded-xl border border-green-300"
                />
                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Yorum yaz..."
                  className="flex-1 px-3 py-2 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 text-sm mobile-input"
                />
              </form>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
}