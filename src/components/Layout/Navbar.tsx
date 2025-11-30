import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, User, Search } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useCartStore } from '../../store/cartStore';
import { useState } from 'react';

export default function Navbar() {
  const { user, signOut } = useAuthStore();
  const { items } = useCartStore();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-8">
            <Link to="/" className="text-2xl font-bold text-blue-600">
              MarketPlace
            </Link>
            
            <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-4 py-2 w-96">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent ml-2 outline-none w-full"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            {user ? (
              <>
                {user.role === 'customer' && (
                  <>
                    <Link to="/wishlist" className="relative">
                      <Heart className="w-6 h-6 text-gray-700 hover:text-red-500" />
                    </Link>
                    <Link to="/cart" className="relative">
                      <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-blue-600" />
                      {items.length > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {items.length}
                        </span>
                      )}
                    </Link>
                  </>
                )}
                
                <div className="relative group">
                  <button className="flex items-center gap-2">
                    <User className="w-6 h-6 text-gray-700" />
                    <span className="hidden md:block">{user.full_name}</span>
                  </button>
                  
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 hidden group-hover:block">
                    <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">
                      Profile
                    </Link>
                    {user.role === 'seller' && (
                      <Link to="/seller/dashboard" className="block px-4 py-2 hover:bg-gray-100">
                        Seller Dashboard
                      </Link>
                    )}
                    {user.role === 'admin' && (
                      <Link to="/admin/dashboard" className="block px-4 py-2 hover:bg-gray-100">
                        Admin Dashboard
                      </Link>
                    )}
                    <Link to="/orders" className="block px-4 py-2 hover:bg-gray-100">
                      Orders
                    </Link>
                    <button
                      onClick={() => signOut()}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex gap-4">
                <Link to="/login" className="text-gray-700 hover:text-blue-600">
                  Login
                </Link>
                <Link to="/signup" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
