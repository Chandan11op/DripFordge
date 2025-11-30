import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Package, DollarSign, TrendingUp } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { supabase } from '../lib/supabase';
import { Product, Order } from '../types';

export default function SellerDashboard() {
  const { user } = useAuthStore();
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
  });

  useEffect(() => {
    if (user) {
      fetchSellerData();
    }
  }, [user]);

  const fetchSellerData = async () => {
    const { data: productsData } = await supabase
      .from('products')
      .select('*')
      .eq('seller_id', user?.id);

    const { data: ordersData } = await supabase
      .from('orders')
      .select('*')
      .eq('seller_id', user?.id)
      .order('created_at', { ascending: false })
      .limit(10);

    setProducts(productsData || []);
    setOrders(ordersData || []);

    const totalRevenue = ordersData?.reduce((sum, order) => 
      sum + (order.total_amount - order.commission_amount), 0
    ) || 0;

    const pendingOrders = ordersData?.filter(o => 
      ['pending', 'confirmed'].includes(o.status)
    ).length || 0;

    setStats({
      totalProducts: productsData?.length || 0,
      totalOrders: ordersData?.length || 0,
      totalRevenue,
      pendingOrders,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Seller Dashboard</h1>
        <Link
          to="/seller/products/new"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Product
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">Total Products</span>
            <Package className="w-8 h-8 text-blue-600" />
          </div>
          <p className="text-3xl font-bold">{stats.totalProducts}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">Total Orders</span>
            <TrendingUp className="w-8 h-8 text-green-600" />
          </div>
          <p className="text-3xl font-bold">{stats.totalOrders}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">Revenue</span>
            <DollarSign className="w-8 h-8 text-purple-600" />
          </div>
          <p className="text-3xl font-bold">${stats.totalRevenue.toFixed(2)}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">Pending Orders</span>
            <Package className="w-8 h-8 text-orange-600" />
          </div>
          <p className="text-3xl font-bold">{stats.pendingOrders}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Recent Products</h2>
          <div className="space-y-4">
            {products.slice(0, 5).map((product) => (
              <div key={product.id} className="flex items-center gap-4 border-b pb-4">
                <img
                  src={product.images[0] || '/placeholder.jpg'}
                  alt={product.title}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{product.title}</h3>
                  <p className="text-gray-600">${product.price.toFixed(2)}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Stock: {product.stock}</p>
                  <Link
                    to={`/seller/products/${product.id}/edit`}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <Link
            to="/seller/products"
            className="block text-center text-blue-600 hover:underline mt-4"
          >
            View All Products
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Recent Orders</h2>
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="border-b pb-4">
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">Order #{order.id.slice(0, 8)}</span>
                  <span className={`px-2 py-1 rounded text-sm ${
                    order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                    order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {order.status}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>${order.total_amount.toFixed(2)}</span>
                  <span>{new Date(order.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
          <Link
            to="/seller/orders"
            className="block text-center text-blue-600 hover:underline mt-4"
          >
            View All Orders
          </Link>
        </div>
      </div>
    </div>
  );
}
