export type UserRole = 'admin' | 'seller' | 'customer';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  full_name: string;
  phone?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  seller_id: string;
  title: string;
  description: string;
  price: number;
  discount_price?: number;
  images: string[];
  category: string;
  subcategory?: string;
  stock: number;
  sku: string;
  brand?: string;
  rating: number;
  review_count: number;
  variants?: ProductVariant[];
  created_at: string;
  updated_at: string;
}

export interface ProductVariant {
  id: string;
  product_id: string;
  color?: string;
  size?: string;
  stock: number;
  sku: string;
  price_adjustment?: number;
}

export interface CartItem {
  id: string;
  user_id: string;
  product_id: string;
  variant_id?: string;
  quantity: number;
  product?: Product;
}

export interface WishlistItem {
  id: string;
  user_id: string;
  product_id: string;
  product?: Product;
  created_at: string;
}

export interface Order {
  id: string;
  customer_id: string;
  seller_id: string;
  status: OrderStatus;
  total_amount: number;
  commission_amount: number;
  shipping_address: Address;
  payment_method: string;
  payment_status: 'pending' | 'completed' | 'failed' | 'refunded';
  items: OrderItem[];
  created_at: string;
  updated_at: string;
}

export type OrderStatus = 
  | 'pending'
  | 'confirmed'
  | 'packed'
  | 'shipped'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled'
  | 'returned';

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  variant_id?: string;
  quantity: number;
  price: number;
  product?: Product;
}

export interface Address {
  id?: string;
  user_id?: string;
  full_name: string;
  phone: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  is_default?: boolean;
}

export interface Review {
  id: string;
  product_id: string;
  user_id: string;
  order_id: string;
  rating: number;
  title: string;
  comment: string;
  images?: string[];
  verified_purchase: boolean;
  helpful_count: number;
  created_at: string;
}

export interface ChatMessage {
  id: string;
  conversation_id: string;
  sender_id: string;
  message: string;
  image_url?: string;
  read: boolean;
  created_at: string;
}

export interface Conversation {
  id: string;
  customer_id: string;
  seller_id: string;
  last_message?: string;
  last_message_at?: string;
  unread_count: number;
}
