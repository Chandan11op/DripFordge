import { create } from 'zustand';
import { CartItem } from '../types';
import { supabase } from '../lib/supabase';

interface CartState {
  items: CartItem[];
  loading: boolean;
  fetchCart: (userId: string) => Promise<void>;
  addToCart: (userId: string, productId: string, quantity: number, variantId?: string) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  clearCart: (userId: string) => Promise<void>;
  getTotal: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  loading: false,
  
  fetchCart: async (userId) => {
    set({ loading: true });
    const { data } = await supabase
      .from('cart_items')
      .select('*, product:products(*)')
      .eq('user_id', userId);
    
    set({ items: data || [], loading: false });
  },
  
  addToCart: async (userId, productId, quantity, variantId) => {
    const { data } = await supabase
      .from('cart_items')
      .insert({ user_id: userId, product_id: productId, quantity, variant_id: variantId })
      .select('*, product:products(*)')
      .single();
    
    if (data) {
      set({ items: [...get().items, data] });
    }
  },
  
  updateQuantity: async (itemId, quantity) => {
    await supabase
      .from('cart_items')
      .update({ quantity })
      .eq('id', itemId);
    
    set({
      items: get().items.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      ),
    });
  },
  
  removeItem: async (itemId) => {
    await supabase.from('cart_items').delete().eq('id', itemId);
    set({ items: get().items.filter(item => item.id !== itemId) });
  },
  
  clearCart: async (userId) => {
    await supabase.from('cart_items').delete().eq('user_id', userId);
    set({ items: [] });
  },
  
  getTotal: () => {
    return get().items.reduce((total, item) => {
      const price = item.product?.discount_price || item.product?.price || 0;
      return total + price * item.quantity;
    }, 0);
  },
}));
