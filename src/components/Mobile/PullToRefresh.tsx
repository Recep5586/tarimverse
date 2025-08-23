import React, { useState, useRef, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';

interface PullToRefreshProps {
  children: React.ReactNode;
  onRefresh: () => Promise<void>;
  threshold?: number;
}

export default function PullToRefresh({ 
  children, 
  onRefresh, 
  threshold = 80 
}: PullToRefreshProps) {
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [startY, setStartY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (window.scrollY === 0) {
      setStartY(e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (window.scrollY === 0 && startY > 0) {
      const currentY = e.touches[0].clientY;
      const distance = Math.max(0, currentY - startY);
      setPullDistance(Math.min(distance, threshold * 1.5));
    }
  };

  const handleTouchEnd = async () => {
    if (pullDistance >= threshold && !isRefreshing) {
      setIsRefreshing(true);
      try {
        await onRefresh();
      } finally {
        setIsRefreshing(false);
      }
    }
    setPullDistance(0);
    setStartY(0);
  };

  const refreshProgress = Math.min(pullDistance / threshold, 1);

  return (
    <div
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative"
    >
      {/* Pull to refresh indicator */}
      {(pullDistance > 0 || isRefreshing) && (
        <div 
          className="absolute top-0 left-0 right-0 flex items-center justify-center bg-green-50 border-b border-green-200 transition-all duration-200 z-10"
          style={{ 
            height: `${Math.max(pullDistance * 0.5, isRefreshing ? 60 : 0)}px`,
            transform: `translateY(${pullDistance > 0 ? 0 : -60}px)`
          }}
        >
          <div className="flex items-center space-x-2 text-green-600">
            <RefreshCw 
              className={`h-5 w-5 ${isRefreshing ? 'animate-spin' : ''}`}
              style={{ 
                transform: `rotate(${refreshProgress * 360}deg)` 
              }}
            />
            <span className="text-sm font-medium">
              {isRefreshing ? 'Yenileniyor...' : 
               pullDistance >= threshold ? 'Bırakın' : 'Çekin'}
            </span>
          </div>
        </div>
      )}
      
      <div 
        style={{ 
          transform: `translateY(${pullDistance * 0.3}px)`,
          transition: pullDistance === 0 ? 'transform 0.2s ease-out' : 'none'
        }}
      >
        {children}
      </div>
    </div>
  );
}