import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Product } from '../../types';
import { useWishlistStore } from '../../store/wishlistStore';
import { useCartStore } from '../../store/cartStore';
import { useAuthStore } from '../../store/authStore';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { user } = useAuthStore();
  const { isInWishlist, addToWishlist, removeFromWishlist, items: wishlistItems } = useWishlistStore();
  const { addToCart } = useCartStore();
  
  const inWishlist = isInWishlist(product.id);
  const displayPrice = product.discount_price || product.price;
  const hasDiscount = product.discount_price && product.discount_price < product.price;

  const handleWishlistToggle = async () => {
    if (!user) return;
    
    if (inWishlist) {
      const item = wishlistItems.find(i => i.product_id === product.id);
      if (item) await removeFromWishlist(item.id);
    } else {
      await addToWishlist(user.id, product.id);
    }
  };

  const handleAddToCart = async () => {
    if (!user) return;
    await addToCart(user.id, product.id, 1);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
      <Link to={`/product/${product.id}`} className="block relative">
        <img
          src={product.images[0] || '/placeholder.jpg'}
          alt={product.title}
          className="w-full h-64 object-cover"
        />
        {hasDiscount && (
          <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold">
            {Math.round(((product.price - displayPrice) / product.price) * 100)}% OFF
          </span>
        )}
        {product.stock < 10 && product.stock > 0 && (
          <span className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-1 rounded text-sm">
            Only {product.stock} left
          </span>
        )}
      </Link>

      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 hover:text-blue-600">
            {product.title}
          </h3>
        </Link>

        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="ml-1 text-sm">{product.rating.toFixed(1)}</span>
          </div>
          <span className="text-gray-400 text-sm">({product.review_count})</span>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl font-bold text-gray-900">
            ${displayPrice.toFixed(2)}
          </span>
          {hasDiscount && (
            <span className="text-gray-400 line-through">
              ${product.price.toFixed(2)}
            </span>
          )}
        </div>

        {user?.role === 'customer' && (
          <div className="flex gap-2">
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-4 h-4" />
              {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>
            <button
              onClick={handleWishlistToggle}
              className={`p-2 rounded-lg border ${
                inWishlist
                  ? 'bg-red-50 border-red-500 text-red-500'
                  : 'border-gray-300 text-gray-600 hover:border-red-500 hover:text-red-500'
              }`}
            >
              <Heart className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
