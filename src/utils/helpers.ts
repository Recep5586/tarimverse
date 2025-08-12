import { TURKISH_MONTHS, SEASONS } from './constants';

// Date Utilities
export const formatDate = (date: string | Date, format: 'short' | 'long' = 'short') => {
  const d = new Date(date);
  
  if (format === 'long') {
    return d.toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
  
  return d.toLocaleDateString('tr-TR');
};

export const getRelativeTime = (date: string | Date) => {
  const now = new Date();
  const targetDate = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - targetDate.getTime()) / 1000);

  if (diffInSeconds < 60) return 'Az önce';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} dakika önce`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} saat önce`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} gün önce`;
  
  return formatDate(date);
};

// Season Utilities
export const getCurrentSeason = () => {
  const month = new Date().getMonth() + 1;
  
  if (SEASONS.spring.months.includes(month)) return 'spring';
  if (SEASONS.summer.months.includes(month)) return 'summer';
  if (SEASONS.autumn.months.includes(month)) return 'autumn';
  return 'winter';
};

export const getSeasonName = (season: string) => {
  switch (season) {
    case 'spring': return 'İlkbahar';
    case 'summer': return 'Yaz';
    case 'autumn': return 'Sonbahar';
    case 'winter': return 'Kış';
    default: return season;
  }
};

// Text Utilities
export const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

export const extractHashtags = (text: string) => {
  const hashtagRegex = /#[\w\u00c0-\u024f\u1e00-\u1eff]+/gi;
  return text.match(hashtagRegex) || [];
};

export const highlightHashtags = (text: string) => {
  return text.replace(/#([\w\u00c0-\u024f\u1e00-\u1eff]+)/gi, '<span class="text-green-600 font-semibold">#$1</span>');
};

// Number Utilities
export const formatNumber = (num: number) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

export const formatCurrency = (amount: number, currency: string = 'TRY') => {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: currency
  }).format(amount);
};

// Validation Utilities
export const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string) => {
  return password.length >= 6;
};

export const validatePhoneNumber = (phone: string) => {
  const phoneRegex = /^(\+90|0)?[5][0-9]{9}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

// File Utilities
export const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const isValidImageType = (file: File) => {
  const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  return validTypes.includes(file.type);
};

// Color Utilities
export const getRandomColor = () => {
  const colors = [
    'from-red-400 to-pink-500',
    'from-blue-400 to-indigo-500',
    'from-green-400 to-emerald-500',
    'from-yellow-400 to-orange-500',
    'from-purple-400 to-pink-500',
    'from-cyan-400 to-blue-500'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

// Local Storage Utilities
export const setLocalStorage = (key: string, value: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

export const getLocalStorage = (key: string, defaultValue: any = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return defaultValue;
  }
};

export const removeLocalStorage = (key: string) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing from localStorage:', error);
  }
};

// URL Utilities
export const generateSlug = (text: string) => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

export const isValidUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Array Utilities
export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const groupBy = <T>(array: T[], key: keyof T) => {
  return array.reduce((groups, item) => {
    const group = item[key] as string;
    groups[group] = groups[group] || [];
    groups[group].push(item);
    return groups;
  }, {} as Record<string, T[]>);
};

// Performance Utilities
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Error Handling
export const handleError = (error: any, context?: string) => {
  console.error(`Error${context ? ` in ${context}` : ''}:`, error);
  
  // In production, you might want to send errors to a logging service
  if (import.meta.env.PROD) {
    // Send to error tracking service
  }
};

// Device Detection
export const isMobile = () => {
  return window.innerWidth < 768;
};

export const isTablet = () => {
  return window.innerWidth >= 768 && window.innerWidth < 1024;
};

export const isDesktop = () => {
  return window.innerWidth >= 1024;
};