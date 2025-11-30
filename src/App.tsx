import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import HomePage from './pages/HomePage';
import LoginForm from './components/Auth/LoginForm';
import SignupForm from './components/Auth/SignupForm';
import CartPage from './pages/CartPage';
import ProductList from './components/Products/ProductList';
import SellerDashboard from './pages/SellerDashboard';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  const { checkAuth, loading, user } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/products" element={<ProductList />} />
            
            {user?.role === 'customer' && (
              <>
                <Route path="/cart" element={<CartPage />} />
                <Route path="/wishlist" element={<div>Wishlist Page</div>} />
                <Route path="/orders" element={<div>Orders Page</div>} />
              </>
            )}
            
            {user?.role === 'seller' && (
              <>
                <Route path="/seller/dashboard" element={<SellerDashboard />} />
                <Route path="/seller/products" element={<div>Seller Products</div>} />
                <Route path="/seller/orders" element={<div>Seller Orders</div>} />
              </>
            )}
            
            {user?.role === 'admin' && (
              <>
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
              </>
            )}
            
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
