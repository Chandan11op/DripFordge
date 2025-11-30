import { create } from 'zustand';
import { WishlistItem } from '../types';
import { supabase } from '../lib/supabase';

interface WishlistState {
  items: WishlistItem[];
  loading: boolean;
  fetchWishlist: (userId: string) => Promise<void>;
  addToWishlist: (userId: string, productId: string) => Promise<void>;
  removeFromWishlist: (itemId: string) => Promise<void>;
  isInWishlist: (productId: string) => boolean;
}

export const useWishlistStore = create<WishlistState>((set, get) => ({
  items: [],
  loading: false,
  
  fetchWishlist: async (userId) => {
    set({ loading: true });
    const { data } = await supabase
      .from('wishlist')
      .select('*, product:products(*)')
      .eq('user_id', userId);
    
    set({ items: data || [], loading: false });
  },
  
  addToWishlist: async (userId, productId) => {
    const { data } = await supabase
      .from('wishlist')
      .insert({ user_id: userId, product_id: productId })
      .select('*, product:products(*)')
      .single();
    
    if (data) {
      set({ items: [...get().items, data] });
    }
  },
  
  removeFromWishlist: async (itemId) => {
    await supabase.from('wishlist').delete().eq('id', itemId);
    set({ items: get().items.filter(item => item.id !== itemId) });
  },
  
  isInWishlist: (productId) => {
    return get().items.some(item => item.product_id === productId);
  },
}));
