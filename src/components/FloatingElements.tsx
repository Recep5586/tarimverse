import React from 'react';

interface FloatingElementsProps {
  season: string;
}

export default function FloatingElements({ season }: FloatingElementsProps) {
  const getSeasonElements = () => {
    switch (season) {
      case 'spring':
        return (
          <>
            {/* Spring elements - flowers and leaves */}
            <div className="absolute top-20 left-10 animate-float">
              <svg className="w-8 h-8 text-pink-300 opacity-60" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <div className="absolute top-40 right-20 animate-float-delayed">
              <svg className="w-6 h-6 text-green-300 opacity-50" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z"/>
              </svg>
            </div>
          </>
        );
      case 'summer':
        return (
          <>
            {/* Summer elements - sun rays and butterflies */}
            <div className="absolute top-16 right-16 animate-spin-slow">
              <svg className="w-12 h-12 text-yellow-300 opacity-40" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12,8A4,4 0 0,0 8,12A4,4 0 0,0 12,16A4,4 0 0,0 16,12A4,4 0 0,0 12,8M12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6A6,6 0 0,1 18,12A6,6 0 0,1 12,18M20,8.69V4H15.31L12,0.69L8.69,4H4V8.69L0.69,12L4,15.31V20H8.69L12,23.31L15.31,20H20V15.31L23.31,12L20,8.69Z"/>
              </svg>
            </div>
          </>
        );
      case 'autumn':
        return (
          <>
            {/* Autumn elements - falling leaves */}
            <div className="absolute top-32 left-32 animate-fall">
              <svg className="w-6 h-6 text-orange-400 opacity-60" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z"/>
              </svg>
            </div>
            <div className="absolute top-60 right-40 animate-fall-delayed">
              <svg className="w-5 h-5 text-red-400 opacity-50" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z"/>
              </svg>
            </div>
          </>
        );
      case 'winter':
        return (
          <>
            {/* Winter elements - snowflakes */}
            <div className="absolute top-24 left-24 animate-float-slow">
              <svg className="w-8 h-8 text-blue-200 opacity-60" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12,11H16L12,7V11M12,16V20L16,16H12M8,16L12,20V16H8M12,13V7L8,11H12V13Z"/>
              </svg>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {getSeasonElements()}
      
      {/* Floating particles */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-green-300 rounded-full opacity-30 animate-float"></div>
      <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-emerald-400 rounded-full opacity-40 animate-float-delayed"></div>
      <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-teal-300 rounded-full opacity-20 animate-float-slow"></div>
    </div>
  );
}