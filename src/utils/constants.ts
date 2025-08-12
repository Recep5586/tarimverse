// App Constants
export const APP_NAME = 'TarımVerse';
export const APP_DESCRIPTION = 'Doğanın Dijital Evreni';
export const APP_VERSION = '1.0.0';

// API Endpoints
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

// Pagination
export const POSTS_PER_PAGE = 10;
export const COMMENTS_PER_PAGE = 20;
export const MARKET_ITEMS_PER_PAGE = 12;

// File Upload
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

// Turkish Regions
export const TURKISH_REGIONS = [
  'Akdeniz',
  'Ege', 
  'Marmara',
  'Karadeniz',
  'İç Anadolu',
  'Doğu Anadolu',
  'Güneydoğu Anadolu'
];

// Months in Turkish
export const TURKISH_MONTHS = [
  'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
  'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
];

// Seasons
export const SEASONS = {
  spring: { name: 'İlkbahar', months: [3, 4, 5] },
  summer: { name: 'Yaz', months: [6, 7, 8] },
  autumn: { name: 'Sonbahar', months: [9, 10, 11] },
  winter: { name: 'Kış', months: [12, 1, 2] }
};

// Post Categories
export const POST_CATEGORIES = [
  { id: 'genel', name: 'Genel Bahçe', color: 'green' },
  { id: 'mahsul', name: 'Hasat Zamanı', color: 'yellow' },
  { id: 'hayvancilik', name: 'Çiftlik Dostları', color: 'blue' },
  { id: 'teknoloji', name: 'Akıllı Tarım', color: 'purple' },
  { id: 'pazar', name: 'Yerel Pazar', color: 'emerald' },
  { id: 'hava-durumu', name: 'Doğa Takvimi', color: 'orange' }
];

// Market Categories
export const MARKET_CATEGORIES = [
  'Sebze',
  'Meyve', 
  'Tahıl',
  'Hayvansal Ürün',
  'Ekipman',
  'Tohum',
  'Gübre',
  'Diğer'
];

// Soil Types
export const SOIL_TYPES = [
  'humuslu',
  'killi',
  'kumlu',
  'tınlı',
  'karışık'
];

// Water Needs
export const WATER_NEEDS = [
  { id: 'az', name: 'Az Su', color: 'yellow' },
  { id: 'orta', name: 'Orta Su', color: 'blue' },
  { id: 'çok', name: 'Çok Su', color: 'indigo' }
];

// Sun Requirements
export const SUN_REQUIREMENTS = [
  { id: 'güneş', name: 'Tam Güneş', icon: '☀️' },
  { id: 'yarı-gölge', name: 'Yarı Gölge', icon: '⛅' },
  { id: 'gölge', name: 'Gölge', icon: '☁️' }
];

// Garden Types
export const GARDEN_TYPES = [
  'açık alan',
  'sera',
  'balkon',
  'çatı bahçesi',
  'kapalı alan'
];

// Automation Trigger Types
export const AUTOMATION_TRIGGERS = [
  { id: 'weather', name: 'Hava Durumu' },
  { id: 'sensor', name: 'Sensör Verisi' },
  { id: 'time', name: 'Zaman Bazlı' },
  { id: 'growth_stage', name: 'Büyüme Aşaması' },
  { id: 'market_price', name: 'Pazar Fiyatı' }
];

// Automation Action Types
export const AUTOMATION_ACTIONS = [
  { id: 'irrigation', name: 'Sulama' },
  { id: 'notification', name: 'Bildirim' },
  { id: 'fertilization', name: 'Gübreleme' },
  { id: 'pest_control', name: 'Zararlı Kontrolü' },
  { id: 'harvest_alert', name: 'Hasat Uyarısı' }
];

// IoT Device Types
export const IOT_DEVICE_TYPES = [
  { id: 'soil_sensor', name: 'Toprak Sensörü', icon: '🌱' },
  { id: 'weather_station', name: 'Hava İstasyonu', icon: '🌤️' },
  { id: 'camera', name: 'Kamera', icon: '📷' },
  { id: 'irrigation_controller', name: 'Sulama Kontrolcüsü', icon: '💧' },
  { id: 'ph_sensor', name: 'pH Sensörü', icon: '⚗️' },
  { id: 'moisture_sensor', name: 'Nem Sensörü', icon: '💦' }
];

// Achievement Categories
export const ACHIEVEMENT_CATEGORIES = [
  'planting',
  'harvesting', 
  'sustainability',
  'community',
  'innovation',
  'learning'
];

// Certificate Types
export const CERTIFICATE_TYPES = [
  { id: 'organic', name: 'Organik Sertifikası', icon: '🌱' },
  { id: 'sustainable', name: 'Sürdürülebilir Tarım', icon: '♻️' },
  { id: 'carbon_neutral', name: 'Karbon Nötr', icon: '🌍' },
  { id: 'quality_grade', name: 'Kalite Sertifikası', icon: '⭐' },
  { id: 'yield_record', name: 'Verim Rekoru', icon: '🏆' }
];

// Default Images
export const DEFAULT_IMAGES = {
  user: 'https://images.pexels.com/photos/1139743/pexels-photo-1139743.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
  crop: 'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&cs=tinysrgb&w=400',
  garden: 'https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg?auto=compress&cs=tinysrgb&w=800',
  market: 'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&cs=tinysrgb&w=600'
};

// Social Media Links
export const SOCIAL_LINKS = {
  facebook: 'https://facebook.com/tarimverse',
  twitter: 'https://twitter.com/tarimverse',
  instagram: 'https://instagram.com/tarimverse',
  youtube: 'https://youtube.com/tarimverse'
};

// Contact Information
export const CONTACT_INFO = {
  email: 'info@tarimverse.com',
  phone: '+90 (212) 555-0123',
  address: 'İstanbul, Türkiye',
  supportEmail: 'destek@tarimverse.com'
};