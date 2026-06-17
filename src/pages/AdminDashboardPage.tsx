import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  DollarSign,
  Users,
  Calendar,
  TrendingUp,
  Building2,
  Settings,
  BarChart3,
  PieChart,
  ArrowUp,
  ArrowDown,
  MoreVertical,
  Eye,
  CheckCircle,
  Clock,
  Sparkles,
  MapPin,
  Star,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Button, GlassCard, Badge, Progress } from '../components/ui';
import { api } from '../lib/api';
import type { Salon, User, Booking, Review } from '../types';

export function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({
    totalUsers: 1247,
    totalSalons: 500,
    totalBookings: 3420,
    revenue: 4285000,
    growth: 12.5,
  });
  const [salons, setSalons] = useState<Salon[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAdminData();
  }, []);

  const loadAdminData = async () => {
    try {
      const [salonsData, bookingsData, usersData] = await Promise.all([
        api.getSalons({ limit: 10 }),
        api.getBookings({ limit: 20 }),
        api.getUsers({ limit: 20 }),
      ]);
      setSalons(salonsData);
      setBookings(bookingsData);
      setUsers(usersData);
    } catch (error) {
      console.error('Failed to load admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'overview', label: 'Analytics', icon: BarChart3 },
    { id: 'salons', label: 'Salons', icon: Building2 },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'bookings', label: 'Bookings', icon: Calendar },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const recentActivity = [
    { type: 'booking', message: 'New booking at Luxe Glow Studio', time: '2 mins ago' },
    { type: 'salon', message: 'New salon registration: Bloom Beauty Bar', time: '15 mins ago' },
    { type: 'user', message: '150 new user signups today', time: '1 hour ago' },
    { type: 'review', message: 'New 5-star review for Radiance Beauty Lounge', time: '2 hours ago' },
  ];

  const topSalons = [
    { name: 'Luxe Glow Studio', bookings: 245, revenue: 1250000, rating: 4.9 },
    { name: 'Divine Looks Studio', bookings: 198, revenue: 980000, rating: 4.9 },
    { name: 'Radiance Beauty Lounge', bookings: 167, revenue: 750000, rating: 4.8 },
    { name: 'Style Sanctuary', bookings: 145, revenue: 520000, rating: 4.7 },
    { name: 'Bloom Beauty Bar', bookings: 134, revenue: 480000, rating: 4.8 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800">
      <Header />

      <div className="pt-24 pb-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <LayoutDashboard className="w-6 h-6 text-rose-500" />
                Admin Dashboard
              </h1>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Manage and monitor your platform
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="success" className="animate-pulse">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                System Online
              </Badge>
              <Button variant="outline" size="sm" icon={<Sparkles className="w-4 h-4" />}>
                AI Insights
              </Button>
            </div>
          </div>

          <div className="flex gap-2 mb-6 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-rose-500 text-white'
                    : 'bg-white/70 dark:bg-gray-800/70 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>

          {activeTab === 'overview' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    label: 'Total Revenue',
                    value: `₹ ${(stats.revenue / 100000).toFixed(1)}L`,
                    change: '+12.5%',
                    trend: 'up',
                    icon: DollarSign,
                    color: 'from-emerald-500 to-teal-500',
                  },
                  {
                    label: 'Total Users',
                    value: stats.totalUsers.toLocaleString(),
                    change: '+8.3%',
                    trend: 'up',
                    icon: Users,
                    color: 'from-blue-500 to-indigo-500',
                  },
                  {
                    label: 'Total Bookings',
                    value: stats.totalBookings.toLocaleString(),
                    change: '+15.2%',
                    trend: 'up',
                    icon: Calendar,
                    color: 'from-rose-500 to-pink-500',
                  },
                  {
                    label: 'Active Salons',
                    value: stats.totalSalons.toString(),
                    change: '+5.1%',
                    trend: 'up',
                    icon: Building2,
                    color: 'from-amber-500 to-orange-500',
                  },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <GlassCard className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div
                          className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}
                        >
                          <stat.icon className="w-6 h-6 text-white" />
                        </div>
                        <span
                          className={`text-xs font-semibold flex items-center gap-0.5 ${
                            stat.trend === 'up' ? 'text-emerald-500' : 'text-red-500'
                          }`}
                        >
                          {stat.trend === 'up' ? (
                            <ArrowUp className="w-3 h-3" />
                          ) : (
                            <ArrowDown className="w-3 h-3" />
                          )}
                          {stat.change}
                        </span>
                      </div>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {stat.value}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</p>
                    </GlassCard>
                  </motion.div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <GlassCard className="p-6 lg:col-span-2">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      Top Performing Salons
                    </h3>
                    <Button variant="ghost" size="sm">
                      View All
                    </Button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-left text-gray-500 dark:text-gray-400">
                          <th className="pb-3 font-medium">Salon</th>
                          <th className="pb-3 font-medium text-center">Bookings</th>
                          <th className="pb-3 font-medium text-right">Revenue</th>
                          <th className="pb-3 font-medium text-center">Rating</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {topSalons.map((salon, i) => (
                          <tr key={i} className="text-gray-700 dark:text-gray-300">
                            <td className="py-3">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-rose-100 to-pink-100 dark:from-rose-950 dark:to-pink-950 flex items-center justify-center font-bold text-rose-500">
                                  {i + 1}
                                </div>
                                {salon.name}
                              </div>
                            </td>
                            <td className="py-3 text-center">{salon.bookings}</td>
                            <td className="py-3 text-right font-medium">
                              ₹ {(salon.revenue / 100000).toFixed(1)}L
                            </td>
                            <td className="py-3 text-center">
                              <span className="inline-flex items-center gap-1">
                                <Star className="w-4 h-4 text-amber-400 fill-current" />
                                {salon.rating}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </GlassCard>

                <GlassCard className="p-6">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                    Recent Activity
                  </h3>
                  <div className="space-y-3">
                    {recentActivity.map((activity, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50"
                      >
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                            activity.type === 'booking'
                              ? 'bg-blue-100 dark:bg-blue-950/50'
                              : activity.type === 'salon'
                                ? 'bg-emerald-100 dark:bg-emerald-950/50'
                                : activity.type === 'user'
                                  ? 'bg-rose-100 dark:bg-rose-950/50'
                                  : 'bg-amber-100 dark:bg-amber-950/50'
                          }`}
                        >
                          {activity.type === 'booking' && <Calendar className="w-4 h-4 text-blue-500" />}
                          {activity.type === 'salon' && <Building2 className="w-4 h-4 text-emerald-500" />}
                          {activity.type === 'user' && <Users className="w-4 h-4 text-rose-500" />}
                          {activity.type === 'review' && <Star className="w-4 h-4 text-amber-500" />}
                        </div>
                        <div>
                          <p className="text-sm text-gray-700 dark:text-gray-300">
                            {activity.message}
                          </p>
                          <p className="text-xs text-gray-400">{activity.time}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </GlassCard>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <GlassCard className="p-6">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                    User Growth Trend
                  </h3>
                  <div className="flex items-end justify-between h-40 px-4">
                    {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((_, i) => (
                      <div
                        key={i}
                        className="flex flex-col items-center gap-2"
                      >
                        <div
                          className="w-12 rounded-t-lg bg-gradient-to-t from-rose-500 to-pink-400"
                          style={{ height: `${Math.floor(Math.random() * 100) + 20}px` }}
                        />
                        <span className="text-xs text-gray-500">{i + 1}</span>
                      </div>
                    ))}
                  </div>
                </GlassCard>

                <GlassCard className="p-6">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                    Booking Categories
                  </h3>
                  <div className="space-y-3">
                    {[
                      { name: 'Hair Care', percentage: 35, color: 'bg-rose-500' },
                      { name: 'Skin Care', percentage: 28, color: 'bg-emerald-500' },
                      { name: 'Bridal', percentage: 20, color: 'bg-amber-500' },
                      { name: 'Nail Art', percentage: 10, color: 'bg-blue-500' },
                      { name: 'Spa & Wellness', percentage: 7, color: 'bg-purple-500' },
                    ].map((cat, i) => (
                      <div key={i}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600 dark:text-gray-400">{cat.name}</span>
                          <span className="font-medium text-gray-900 dark:text-white">
                            {cat.percentage}%
                          </span>
                        </div>
                        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${cat.color} rounded-full transition-all duration-500`}
                            style={{ width: `${cat.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </div>
            </motion.div>
          )}

          {activeTab === 'salons' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <GlassCard className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Salon Management
                  </h3>
                  <Button variant="primary" size="sm">
                    Add New Salon
                  </Button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
                        <th className="pb-3 font-medium">Salon</th>
                        <th className="pb-3 font-medium">Location</th>
                        <th className="pb-3 font-medium text-center">Rating</th>
                        <th className="pb-3 font-medium text-center">Trust Score</th>
                        <th className="pb-3 font-medium text-center">Status</th>
                        <th className="pb-3 font-medium text-center">Women-Owned</th>
                        <th className="pb-3 font-medium text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {salons.map((salon) => (
                        <tr key={salon.id} className="text-gray-700 dark:text-gray-300">
                          <td className="py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl overflow-hidden">
                                <img
                                  src={salon.gallery_urls?.[0] || 'https://images.pexels.com/photos/3997992/pexels-photo-3997992.jpeg'}
                                  alt={salon.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <span className="font-medium">{salon.name}</span>
                            </div>
                          </td>
                          <td className="py-4">{salon.area}</td>
                          <td className="py-4 text-center">
                            <span className="inline-flex items-center gap-1">
                              <Star className="w-4 h-4 text-amber-400 fill-current" />
                              {salon.rating}
                            </span>
                          </td>
                          <td className="py-4 text-center">{salon.trust_score}</td>
                          <td className="py-4 text-center">
                            <Badge variant={salon.is_verified ? 'success' : 'warning'}>
                              {salon.is_verified ? 'Verified' : 'Pending'}
                            </Badge>
                          </td>
                          <td className="py-4 text-center">
                            {salon.is_women_owned && (
                              <Badge variant="primary" className="text-xs">
                                Women-Owned
                              </Badge>
                            )}
                          </td>
                          <td className="py-4 text-right">
                            <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                              <MoreVertical className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </GlassCard>
            </motion.div>
          )}

          {activeTab === 'bookings' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <GlassCard className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Booking Management
                  </h3>
                  <div className="flex gap-2">
                    <select className="px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 border-0 text-sm">
                      <option>All Status</option>
                      <option>Confirmed</option>
                      <option>Pending</option>
                      <option>Completed</option>
                      <option>Cancelled</option>
                    </select>
                  </div>
                </div>
                <div className="text-center py-12">
                  <Calendar className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500 dark:text-gray-400">
                    {bookings.length} bookings found
                  </p>
                </div>
              </GlassCard>
            </motion.div>
          )}

          {activeTab === 'users' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <GlassCard className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-gray-900 dark:text-white">User Management</h3>
                  <Button variant="primary" size="sm">
                    Export Users
                  </Button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
                        <th className="pb-3 font-medium">User</th>
                        <th className="pb-3 font-medium">Email</th>
                        <th className="pb-3 font-medium text-center">Glow Score</th>
                        <th className="pb-3 font-medium text-center">Bookings</th>
                        <th className="pb-3 font-medium text-center">Student</th>
                        <th className="pb-3 font-medium text-right">Joined</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {users.slice(0, 10).map((user, i) => (
                        <tr key={user.id} className="text-gray-700 dark:text-gray-300">
                          <td className="py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center text-white text-sm font-bold">
                                {user.name?.charAt(0) || 'U'}
                              </div>
                              <span className="font-medium">{user.name || `User ${i + 1}`}</span>
                            </div>
                          </td>
                          <td className="py-4 text-sm">{user.email}</td>
                          <td className="py-4 text-center">{user.glow_score || 'N/A'}</td>
                          <td className="py-4 text-center">{Math.floor(Math.random() * 10)}</td>
                          <td className="py-4 text-center">
                            {user.is_student && (
                              <Badge variant="success" className="text-xs">Student</Badge>
                            )}
                          </td>
                          <td className="py-4 text-right text-sm text-gray-500">
                            {new Date(user.created_at).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </GlassCard>
            </motion.div>
          )}

          {activeTab === 'settings' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <GlassCard className="p-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-6">
                  Platform Settings
                </h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-3">
                      AI Features
                    </h4>
                    <div className="space-y-2">
                      {[
                        'AI Salon Matchmaker',
                        'Glow Score System',
                        'Occasion Planner',
                        'AI Review Summarizer',
                        'Beauty Advisor',
                      ].map((feature) => (
                        <label key={feature} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                          <input type="checkbox" defaultChecked className="w-5 h-5 rounded accent-rose-500" />
                          <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <Button variant="primary">Save Settings</Button>
                </div>
              </GlassCard>
            </motion.div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
