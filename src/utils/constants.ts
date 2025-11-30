export const COMMISSION_RATE = 0.10; // 10% commission

export const ORDER_STATUSES = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  PACKED: 'packed',
  SHIPPED: 'shipped',
  OUT_FOR_DELIVERY: 'out_for_delivery',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
  RETURNED: 'returned',
} as const;

export const PAYMENT_METHODS = {
  CARD: 'card',
  UPI: 'upi',
  WALLET: 'wallet',
  COD: 'cod',
} as const;

export const CATEGORIES = [
  'Electronics',
  'Fashion',
  'Home & Living',
  'Books',
  'Sports & Outdoors',
  'Beauty & Personal Care',
  'Toys & Games',
  'Automotive',
  'Grocery',
  'Health & Wellness',
] as const;

export const NOTIFICATION_TYPES = {
  ORDER_PLACED: 'order_placed',
  ORDER_CONFIRMED: 'order_confirmed',
  ORDER_SHIPPED: 'order_shipped',
  ORDER_DELIVERED: 'order_delivered',
  PAYMENT_SUCCESS: 'payment_success',
  LOW_STOCK: 'low_stock',
  NEW_MESSAGE: 'new_message',
  WITHDRAWAL_PROCESSED: 'withdrawal_processed',
  PRICE_DROP: 'price_drop',
} as const;
