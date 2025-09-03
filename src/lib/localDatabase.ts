import { User, Post, Comment, MarketItem } from './supabase';

// Local storage keys
const STORAGE_KEYS = {
  users: 'tarimverse_users',
  posts: 'tarimverse_posts',
  comments: 'tarimverse_comments',
  marketItems: 'tarimverse_market_items',
  currentUser: 'tarimverse_current_user',
  likes: 'tarimverse_likes',
  follows: 'tarimverse_follows'
};

// Helper functions for localStorage
const getFromStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading from localStorage:`, error);
    return defaultValue;
  }
};

const saveToStorage = <T>(key: string, data: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving to localStorage:`, error);
  }
};

// Generate unique ID
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Initialize with sample data if empty
const initializeSampleData = () => {
  const users = getFromStorage<User[]>(STORAGE_KEYS.users, []);
  const posts = getFromStorage<Post[]>(STORAGE_KEYS.posts, []);
  
  if (users.length === 0) {
    const sampleUsers: User[] = [
      {
        id: 'user1',
        email: 'ahmet@example.com',
        name: 'Ahmet Karaca',
        avatar_url: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
        location: 'Konya',
        bio: 'Organik tarım uzmanı, 15 yıllık deneyim',
        verified: true,
        followers_count: 2340,
        following_count: 156,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'user2',
        email: 'fatma@example.com',
        name: 'Fatma Öztürk',
        avatar_url: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
        location: 'Antalya',
        bio: 'Sera tarımı ve teknoloji uzmanı',
        verified: true,
        followers_count: 1890,
        following_count: 234,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ];
    saveToStorage(STORAGE_KEYS.users, sampleUsers);
  }

  if (posts.length === 0) {
    const samplePosts: Post[] = [
      {
        id: 'post1',
        user_id: 'user1',
        content: 'Bu yıl buğday hasadımız gerçekten harika oldu! Hektarda 6 ton verim aldık. 🌾',
        category: 'mahsul',
        image_url: 'https://images.pexels.com/photos/326082/pexels-photo-326082.jpeg?auto=compress&cs=tinysrgb&w=800',
        location: 'Konya',
        hashtags: ['#buğday', '#hasat', '#organiktarım'],
        likes_count: 42,
        comments_count: 8,
        shares_count: 12,
        created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'post2',
        user_id: 'user2',
        content: 'Seramdaki domates üretiminde yeni teknikler deniyorum. Dikey tarım sistemi kurduk ve alan verimliliği %40 arttı! 🍅',
        category: 'teknoloji',
        location: 'Antalya',
        hashtags: ['#seracılık', '#domates', '#teknoloji'],
        likes_count: 67,
        comments_count: 15,
        shares_count: 23,
        created_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date().toISOString()
      }
    ];
    saveToStorage(STORAGE_KEYS.posts, samplePosts);
  }
};

// Database operations
export const localDB = {
  // Initialize
  init: () => {
    initializeSampleData();
  },

  // Auth operations
  auth: {
    signUp: async (email: string, password: string, name: string): Promise<User> => {
      const users = getFromStorage<User[]>(STORAGE_KEYS.users, []);
      
      // Check if user already exists
      if (users.find(u => u.email === email)) {
        throw new Error('Bu e-posta adresi zaten kullanılıyor');
      }

      const newUser: User = {
        id: generateId(),
        email,
        name,
        verified: false,
        followers_count: 0,
        following_count: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      users.push(newUser);
      saveToStorage(STORAGE_KEYS.users, users);
      saveToStorage(STORAGE_KEYS.currentUser, newUser);
      
      return newUser;
    },

    signIn: async (email: string, password: string): Promise<User> => {
      const users = getFromStorage<User[]>(STORAGE_KEYS.users, []);
      const user = users.find(u => u.email === email);
      
      if (!user) {
        throw new Error('Kullanıcı bulunamadı');
      }

      saveToStorage(STORAGE_KEYS.currentUser, user);
      return user;
    },

    signOut: async (): Promise<void> => {
      localStorage.removeItem(STORAGE_KEYS.currentUser);
    },

    getCurrentUser: (): User | null => {
      return getFromStorage<User | null>(STORAGE_KEYS.currentUser, null);
    },

    updateProfile: async (userId: string, updates: Partial<User>): Promise<User> => {
      const users = getFromStorage<User[]>(STORAGE_KEYS.users, []);
      const userIndex = users.findIndex(u => u.id === userId);
      
      if (userIndex === -1) {
        throw new Error('Kullanıcı bulunamadı');
      }

      users[userIndex] = { ...users[userIndex], ...updates, updated_at: new Date().toISOString() };
      saveToStorage(STORAGE_KEYS.users, users);
      saveToStorage(STORAGE_KEYS.currentUser, users[userIndex]);
      
      return users[userIndex];
    }
  },

  // Posts operations
  posts: {
    getAll: async (): Promise<Post[]> => {
      const posts = getFromStorage<Post[]>(STORAGE_KEYS.posts, []);
      const users = getFromStorage<User[]>(STORAGE_KEYS.users, []);
      const likes = getFromStorage<any[]>(STORAGE_KEYS.likes, []);
      const currentUser = getFromStorage<User | null>(STORAGE_KEYS.currentUser, null);

      return posts.map(post => {
        const user = users.find(u => u.id === post.user_id);
        const isLiked = currentUser ? likes.some(like => 
          like.user_id === currentUser.id && like.post_id === post.id
        ) : false;

        return {
          ...post,
          user,
          is_liked: isLiked
        };
      }).sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    },

    create: async (content: string, category: string, imageFile?: File): Promise<Post> => {
      const currentUser = getFromStorage<User | null>(STORAGE_KEYS.currentUser, null);
      if (!currentUser) {
        throw new Error('Giriş yapmalısınız');
      }

      const posts = getFromStorage<Post[]>(STORAGE_KEYS.posts, []);
      const hashtags = content.match(/#\w+/g) || [];

      let imageUrl = null;
      if (imageFile) {
        // In a real app, you would upload to a service
        // For demo, we'll use a placeholder
        imageUrl = 'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&cs=tinysrgb&w=800';
      }

      const newPost: Post = {
        id: generateId(),
        user_id: currentUser.id,
        content,
        category,
        image_url: imageUrl,
        location: currentUser.location,
        hashtags,
        likes_count: 0,
        comments_count: 0,
        shares_count: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        user: currentUser,
        is_liked: false
      };

      posts.unshift(newPost);
      saveToStorage(STORAGE_KEYS.posts, posts);
      
      return newPost;
    },

    like: async (postId: string): Promise<void> => {
      const currentUser = getFromStorage<User | null>(STORAGE_KEYS.currentUser, null);
      if (!currentUser) {
        throw new Error('Giriş yapmalısınız');
      }

      const posts = getFromStorage<Post[]>(STORAGE_KEYS.posts, []);
      const likes = getFromStorage<any[]>(STORAGE_KEYS.likes, []);
      
      const postIndex = posts.findIndex(p => p.id === postId);
      if (postIndex === -1) return;

      const existingLike = likes.find(like => 
        like.user_id === currentUser.id && like.post_id === postId
      );

      if (existingLike) {
        // Unlike
        const likeIndex = likes.findIndex(like => 
          like.user_id === currentUser.id && like.post_id === postId
        );
        likes.splice(likeIndex, 1);
        posts[postIndex].likes_count = Math.max(0, posts[postIndex].likes_count - 1);
      } else {
        // Like
        likes.push({
          id: generateId(),
          user_id: currentUser.id,
          post_id: postId,
          created_at: new Date().toISOString()
        });
        posts[postIndex].likes_count += 1;
      }

      saveToStorage(STORAGE_KEYS.likes, likes);
      saveToStorage(STORAGE_KEYS.posts, posts);
    },

    addComment: async (postId: string, content: string): Promise<Comment> => {
      const currentUser = getFromStorage<User | null>(STORAGE_KEYS.currentUser, null);
      if (!currentUser) {
        throw new Error('Giriş yapmalısınız');
      }

      const posts = getFromStorage<Post[]>(STORAGE_KEYS.posts, []);
      const comments = getFromStorage<Comment[]>(STORAGE_KEYS.comments, []);
      
      const postIndex = posts.findIndex(p => p.id === postId);
      if (postIndex === -1) {
        throw new Error('Gönderi bulunamadı');
      }

      const newComment: Comment = {
        id: generateId(),
        post_id: postId,
        user_id: currentUser.id,
        content,
        likes_count: 0,
        created_at: new Date().toISOString(),
        user: currentUser,
        is_liked: false
      };

      comments.push(newComment);
      posts[postIndex].comments_count += 1;

      saveToStorage(STORAGE_KEYS.comments, comments);
      saveToStorage(STORAGE_KEYS.posts, posts);
      
      return newComment;
    },

    getComments: async (postId: string): Promise<Comment[]> => {
      const comments = getFromStorage<Comment[]>(STORAGE_KEYS.comments, []);
      const users = getFromStorage<User[]>(STORAGE_KEYS.users, []);
      
      return comments
        .filter(comment => comment.post_id === postId)
        .map(comment => ({
          ...comment,
          user: users.find(u => u.id === comment.user_id)
        }))
        .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
    },

    share: async (postId: string): Promise<void> => {
      const posts = getFromStorage<Post[]>(STORAGE_KEYS.posts, []);
      const postIndex = posts.findIndex(p => p.id === postId);
      
      if (postIndex !== -1) {
        posts[postIndex].shares_count = (posts[postIndex].shares_count || 0) + 1;
        saveToStorage(STORAGE_KEYS.posts, posts);
      }
    }
  },

  // Market operations
  market: {
    getAll: async (): Promise<MarketItem[]> => {
      const items = getFromStorage<MarketItem[]>(STORAGE_KEYS.marketItems, []);
      const users = getFromStorage<User[]>(STORAGE_KEYS.users, []);

      // Initialize with sample data if empty
      if (items.length === 0) {
        const sampleItems: MarketItem[] = [
          {
            id: 'item1',
            user_id: 'user1',
            title: 'Organik Domates',
            description: 'Kendi bahçemizde yetiştirdiğimiz organik domatesler. Pestisit kullanılmamıştır.',
            price: 15.50,
            category: 'Sebze',
            location: 'Konya',
            images: ['https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&cs=tinysrgb&w=800'],
            status: 'active',
            created_at: new Date().toISOString()
          },
          {
            id: 'item2',
            user_id: 'user2',
            title: 'Taze Salatalık',
            description: 'Sera yetiştiriciliği ile üretilen taze salatalıklar.',
            price: 8.75,
            category: 'Sebze',
            location: 'Antalya',
            images: ['https://images.pexels.com/photos/2329440/pexels-photo-2329440.jpeg?auto=compress&cs=tinysrgb&w=800'],
            status: 'active',
            created_at: new Date().toISOString()
          }
        ];
        saveToStorage(STORAGE_KEYS.marketItems, sampleItems);
        return sampleItems.map(item => ({
          ...item,
          user: users.find(u => u.id === item.user_id)
        }));
      }

      return items.map(item => ({
        ...item,
        user: users.find(u => u.id === item.user_id)
      }));
    },

    create: async (item: Omit<MarketItem, 'id' | 'user_id' | 'created_at' | 'user'>): Promise<MarketItem> => {
      const currentUser = getFromStorage<User | null>(STORAGE_KEYS.currentUser, null);
      if (!currentUser) {
        throw new Error('Giriş yapmalısınız');
      }

      const items = getFromStorage<MarketItem[]>(STORAGE_KEYS.marketItems, []);
      
      const newItem: MarketItem = {
        ...item,
        id: generateId(),
        user_id: currentUser.id,
        created_at: new Date().toISOString(),
        user: currentUser
      };

      items.unshift(newItem);
      saveToStorage(STORAGE_KEYS.marketItems, items);
      
      return newItem;
    }
  }
};

// Initialize on import
localDB.init();

export default localDB;