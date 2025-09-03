import React, { useState, useRef } from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
}

export default function LazyImage({ src, alt, className = '', placeholder }: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [setRef, entry] = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '50px'
  });

  const shouldLoad = entry?.isIntersecting;

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setIsError(true);
  };

  return (
    <div ref={setRef} className={`relative overflow-hidden ${className}`}>
      {!shouldLoad && (
        <div className="w-full h-full bg-gray-200 animate-pulse rounded-lg flex items-center justify-center">
          <span className="text-gray-400 text-sm">Yükleniyor...</span>
        </div>
      )}
      
      {shouldLoad && !isError && (
        <>
          {!isLoaded && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg"></div>
          )}
          <img
            src={src}
            alt={alt}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={handleLoad}
            onError={handleError}
            loading="lazy"
          />
        </>
      )}
      
      {isError && (
        <div className="w-full h-full bg-gray-100 flex items-center justify-center rounded-lg">
          <span className="text-gray-400 text-sm">Resim yüklenemedi</span>
        </div>
      )}
    </div>
  );
}