import { useEffect, useState } from 'react';
import { Users, Package, DollarSign, ShoppingBag } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalSellers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    commissionEarned: 0,
  });

  useEffect(() => {
    fetchAdminStats();
  }, []);

  const fetchAdminStats = async () => {
    const { data: users } = await supabase.from('users').select('role');
    const { data: products } = await supabase.from('products').select('id');
    const { data: orders } = await supabase.from('orders').select('total_amount, commission_amount');

    const totalRevenue = orders?.reduce((sum, o) => sum + o.total_amount, 0) || 0;
    const commissionEarned = orders?.reduce((sum, o) => sum + o.commission_amount, 0) || 0;

    setStats({
      totalUsers: users?.length || 0,
      totalSellers: users?.filter(u => u.role === 'seller').length || 0,
      totalProducts: products?.length || 0,
      totalOrders: orders?.length || 0,
      totalRevenue,
      commissionEarned,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">Total Users</span>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
          <p className="text-3xl font-bold">{stats.totalUsers}</p>
          <p className="text-sm text-gray-600 mt-2">Sellers: {stats.totalSellers}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">Total Products</span>
            <Package className="w-8 h-8 text-green-600" />
          </div>
          <p className="text-3xl font-bold">{stats.totalProducts}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">Total Orders</span>
            <ShoppingBag className="w-8 h-8 text-purple-600" />
          </div>
          <p className="text-3xl font-bold">{stats.totalOrders}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">Platform Revenue</span>
            <DollarSign className="w-8 h-8 text-orange-600" />
          </div>
          <p className="text-3xl font-bold">${stats.totalRevenue.toFixed(2)}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">Commission Earned</span>
            <DollarSign className="w-8 h-8 text-green-600" />
          </div>
          <p className="text-3xl font-bold">${stats.commissionEarned.toFixed(2)}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <button className="w-full text-left px-4 py-3 bg-blue-50 hover:bg-blue-100 rounded-lg">
              Manage Users
            </button>
            <button className="w-full text-left px-4 py-3 bg-green-50 hover:bg-green-100 rounded-lg">
              Review Products
            </button>
            <button className="w-full text-left px-4 py-3 bg-purple-50 hover:bg-purple-100 rounded-lg">
              Manage Orders
            </button>
            <button className="w-full text-left px-4 py-3 bg-orange-50 hover:bg-orange-100 rounded-lg">
              Commission Settings
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
          <div className="space-y-3 text-sm text-gray-600">
            <p>• New seller registration pending approval</p>
            <p>• 5 products awaiting moderation</p>
            <p>• 2 dispute cases need attention</p>
            <p>• Monthly report ready for review</p>
          </div>
        </div>
      </div>
    </div>
  );
}
