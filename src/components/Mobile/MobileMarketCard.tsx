import React from 'react';
import { MapPin, Heart, MessageCircle, Star } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { tr } from 'date-fns/locale';

interface MobileMarketCardProps {
  item: any;
}

export default function MobileMarketCard({ item }: MobileMarketCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      {item.images && item.images.length > 0 && (
        <div className="relative h-40">
          <img
            src={item.images[0]}
            alt={item.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 left-3">
            <span className="px-2 py-1 bg-green-500 text-white rounded-lg text-xs font-bold">
              {item.category}
            </span>
          </div>
          <button className="absolute top-3 right-3 p-2 bg-white/90 rounded-full hover:bg-white transition-colors touch-target">
            <Heart className="h-4 w-4 text-gray-600" />
          </button>
        </div>
      )}

      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-bold text-gray-900 text-sm line-clamp-2 flex-1">
            {item.title}
          </h3>
          <span className="text-lg font-bold text-green-600 ml-2">
            ₺{item.price}
          </span>
        </div>

        <p className="text-gray-600 text-xs mb-3 line-clamp-2">
          {item.description}
        </p>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-1 text-xs text-gray-500">
            <MapPin className="h-3 w-3" />
            <span>{item.location}</span>
          </div>
          <span className="text-xs text-gray-500">
            {formatDistanceToNow(new Date(item.created_at), { addSuffix: true, locale: tr })}
          </span>
        </div>

        {item.user && (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <img
                src={item.user.avatar_url || 'https://images.pexels.com/photos/1139743/pexels-photo-1139743.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'}
                alt={item.user.name}
                className="h-6 w-6 rounded-full border border-gray-300"
              />
              <span className="text-xs font-medium text-gray-700">
                {item.user.name}
              </span>
            </div>
            <button className="flex items-center space-x-1 text-green-600 hover:text-green-700 transition-colors touch-target">
              <MessageCircle className="h-3 w-3" />
              <span className="text-xs font-medium">İletişim</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}