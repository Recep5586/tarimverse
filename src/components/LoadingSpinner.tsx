import React from 'react';
import { Leaf } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  message?: string;
}

export default function LoadingSpinner({ size = 'md', message }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="relative">
        <div className={`${sizeClasses[size]} animate-spin`}>
          <Leaf className="w-full h-full text-green-500" />
        </div>
        <div className="absolute inset-0 animate-ping">
          <Leaf className={`${sizeClasses[size]} text-green-300 opacity-75`} />
        </div>
      </div>
      {message && (
        <p className="mt-4 text-green-600 font-medium text-center">{message}</p>
      )}
    </div>
  );
}