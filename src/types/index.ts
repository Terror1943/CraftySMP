export type ProductCategory = 
  | 'all'
  | 'custom-weapons'
  | 'legendary-weapons'
  | 'kits-inr'
  | 'kits-coins'
  | 'coins'
  | 'special-items'
  | 'ranks';

export type Currency = 'INR' | 'COINS';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  currency: Currency;
  image: string;
  originalImageUrl?: string;
  description: string;
  lore?: string;
  stats?: {
    attack?: string;
    speed?: string;
    ability?: string;
    tier?: string;
  };
  kitContents?: string[];
  isFeatured?: boolean;
  badge?: string;
  commandTemplate?: string;
}

export interface Rank {
  id: string;
  name: string;
  priceReq: string;
  condition: string;
  rewards: string[];
  image?: string;
  originalImageUrl?: string;
  color: string;
  accentClass: string;
  hasImageUpload?: boolean;
  isCustomEvidence?: boolean;
}

export interface ServerStatus {
  online: boolean;
  playersOnline: number;
  playersMax: number;
  version: string;
  motd: string;
  hostname: string;
  lastUpdated: string;
  loading: boolean;
  error: string | null;
  isUnavailable: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface DeliveryOrder {
  id: string;
  orderNumber: string;
  userId?: string;
  minecraftUsername: string;
  items: CartItem[];
  totalInr: number;
  totalCoins: number;
  paymentMethod: string;
  paymentStatus: 'pending' | 'completed' | 'test_mode' | 'failed';
  deliveryStatus: 'queued' | 'delivering' | 'delivered' | 'failed';
  createdAt: string;
  commandsExecuted: string[];
  retryCount: number;
  notes?: string;
}

export interface RankApplication {
  id: string;
  userId?: string;
  rankId: string;
  rankName: string;
  minecraftUsername: string;
  discordTag: string;
  evidenceUrl: string;
  notes: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  adminNotes?: string;
}

export interface UserAccount {
  id: string;
  username: string;
  minecraftUsername: string;
  discordTag: string;
  coinsBalance: number;
  role: 'player' | 'admin';
  orders: DeliveryOrder[];
  rankApplications: RankApplication[];
}
