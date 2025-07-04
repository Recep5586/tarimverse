export interface User {
  name: string;
  avatar: string;
  location?: string;
  verified?: boolean;
  followers?: number;
}

export interface PostData {
  id: string;
  user: User;
  content: string;
  category: string;
  image?: string;
  timestamp: string;
  likes: number;
  comments: number;
  shares?: number;
  isLiked: boolean;
  hashtags?: string[];
}

export const samplePosts: PostData[] = [
  {
    id: '1',
    user: {
      name: 'Ahmet Karaca',
      avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
      location: 'Konya',
      verified: true,
      followers: 2340
    },
    content: 'Bu yıl buğday hasadımız gerçekten harika oldu! Hektarda 6 ton verim aldık. Doğru zamanda yapılan gübreleme ve sulama işlemlerinin etkisi çok büyük. Aynı bölgedeki arkadaşlara tavsiyem: toprak analizi yaptırmayı unutmayın! 🌾\n\nDetaylı bilgi için mesaj atabilirsiniz. Deneyimlerimizi paylaşalım.',
    category: 'mahsul',
    image: 'https://images.pexels.com/photos/326082/pexels-photo-326082.jpeg?auto=compress&cs=tinysrgb&w=800',
    timestamp: '2 saat önce',
    likes: 42,
    comments: 8,
    shares: 12,
    isLiked: false,
    hashtags: ['#buğday', '#hasat', '#organiktarım', '#konya']
  },
  {
    id: '2',
    user: {
      name: 'Fatma Öztürk',
      avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
      location: 'Antalya',
      verified: true,
      followers: 1890
    },
    content: 'Seramdaki domates üretiminde yeni teknikler deniyorum. Dikey tarım sistemi kurduk ve alan verimliliği %40 arttı! 🍅\n\nTeknoloji tarımda gerçekten devrim yaratıyor. Merak eden arkadaşlar için detaylı bilgi paylaşabilirim. Özellikle su tasarrufu konusunda inanılmaz sonuçlar aldık.\n\nGelecek hafta sera turları düzenliyoruz, katılmak isteyenler mesaj atabilir.',
    category: 'teknoloji',
    timestamp: '4 saat önce',
    likes: 67,
    comments: 15,
    shares: 23,
    isLiked: true,
    hashtags: ['#seracılık', '#domates', '#teknoloji', '#dikeytarım']
  },
  {
    id: '3',
    user: {
      name: 'Mehmet Demir',
      avatar: 'https://images.pexels.com/photos/1139743/pexels-photo-1139743.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
      location: 'Erzurum',
      followers: 1234
    },
    content: 'Hayvancılık sektöründe kalite çok önemli. Holstein ırkı ineklerimizden günlük ortalama 25 litre süt alıyoruz. 🐄\n\nBeslenme programı ve bakım koşulları mükemmel olmalı. Süt fiyatları da şükür istikrarlı seyrediyor. Bu yıl yem maliyetleri biraz arttı ama genel olarak karlı bir dönem geçiriyoruz.\n\nHayvancılık yapan arkadaşlarla deneyim paylaşımı yapmak istiyorum.',
    category: 'hayvancilik',
    image: 'https://images.pexels.com/photos/422218/pexels-photo-422218.jpeg?auto=compress&cs=tinysrgb&w=800',
    timestamp: '1 gün önce',
    likes: 35,
    comments: 12,
    shares: 8,
    isLiked: false,
    hashtags: ['#hayvancılık', '#süt', '#holstein', '#beslenme']
  },
  {
    id: '4',
    user: {
      name: 'Ayşe Yılmaz',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
      location: 'İzmir',
      verified: true,
      followers: 3456
    },
    content: 'Organik zeytinyağı üretimimiz için sertifikasyon sürecini tamamladık! 🫒✨\n\nDoğal tarım yöntemleriyle hem çevreyi koruyoruz hem de kaliteli ürün üretiyoruz. Pazar değeri de çok daha yüksek tabii ki. Organik sertifikasyon süreci 3 yıl sürdü ama sonuç harika oldu.\n\nİhracat için de görüşmeler başladı. Türk zeytinyağının dünyada tanınması için elimizden geleni yapıyoruz.',
    category: 'pazar',
    timestamp: '2 gün önce',
    likes: 89,
    comments: 23,
    shares: 34,
    isLiked: true,
    hashtags: ['#organik', '#zeytinyağı', '#sertifikasyon', '#ihracat']
  },
  {
    id: '5',
    user: {
      name: 'Osman Kaya',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
      location: 'Samsun',
      followers: 987
    },
    content: 'Bu hafta hava koşulları çok değişken olacak. Meteoroloji uyarısına göre ani yağış olasılığı var. ⛈️🌧️\n\nHasat zamanı yaklaşan arkadaşların dikkatli olması gerekiyor. Makinelerinizi hazır tutun! Özellikle fındık hasadı yapacak arkadaşlar için kritik bir dönem.\n\nBölgesel hava durumu takibi yapıyorum, güncel bilgileri paylaşmaya devam edeceğim.',
    category: 'hava-durumu',
    timestamp: '3 gün önce',
    likes: 56,
    comments: 19,
    shares: 15,
    isLiked: false,
    hashtags: ['#havadurumu', '#hasat', '#fındık', '#meteoroloji']
  },
  {
    id: '6',
    user: {
      name: 'Zeynep Çelik',
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
      location: 'Bursa',
      verified: true,
      followers: 2100
    },
    content: 'Arıcılık sektöründe bu yıl rekor bal üretimi gerçekleştirdik! 🍯🐝\n\nKovanlarımızdan toplam 2.5 ton bal aldık. Çiçek çeşitliliğinin artması ve doğru bakım teknikleri sayesinde hem kalite hem de miktar açısından mükemmel sonuçlar elde ettik.\n\nDoğal bal üretiminde sürdürülebilirlik çok önemli. Arı sağlığını korumak için kimyasal kullanmıyoruz.',
    category: 'genel',
    image: 'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg?auto=compress&cs=tinysrgb&w=800',
    timestamp: '4 gün önce',
    likes: 73,
    comments: 16,
    shares: 21,
    isLiked: true,
    hashtags: ['#arıcılık', '#bal', '#doğal', '#sürdürülebilir']
  }
];

export const currentUser: User = {
  name: 'Sen',
  avatar: 'https://images.pexels.com/photos/1139743/pexels-photo-1139743.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
  location: 'Türkiye',
  followers: 156
};