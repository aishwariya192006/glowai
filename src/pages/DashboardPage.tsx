import { motion } from 'framer-motion';
import {
  Calendar,
  Heart,
  Sparkles,
  TrendingUp,
  Award,
  Settings,
  ChevronRight,
  Clock,
  MapPin,
  Star,
  BarChart3,
  Users,
  DollarSign,
  ShoppingBag,
  ArrowUp,
  ArrowDown,
  User,
  LogOut,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Button, GlassCard, Badge, Rating, CircularProgress, Progress } from '../components/ui';
import { api } from '../lib/api';
import { useApp } from '../context/AppContext';
import type { Booking, Salon, Service, Review } from '../types';

interface DashboardBooking extends Booking {
  salons?: Salon;
  services?: Service;
}

interface GlowScoreData {
  overall: number;
  hair: number;
  skin: number;
  confidence: number;
  trend: 'up' | 'down' | 'stable';
  trendValue: number;
}

export function DashboardPage() {
  const navigate = useNavigate();
  const { user, setUser, isAuthenticated } = useApp();
  const [bookings, setBookings] = useState<DashboardBooking[]>([]);
  const [savedSalons, setSavedSalons] = useState<Salon[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [glowScore, setGlowScore] = useState<GlowScoreData>({
    overall: 72,
    hair: 75,
    skin: 68,
    confidence: 70,
    trend: 'up',
    trendValue: 5,
  });

  useEffect(() => {
    if (!isAuthenticated) {
      const demoUser = {
        id: 'demo-user',
        email: 'demo@glowai.com',
        name: 'Demo User',
        phone: '+91 98765 43210',
        role: 'customer' as const,
        glow_score: 72,
        hair_score: 75,
        skin_score: 68,
        confidence_score: 70,
        confidence_score: 70,
        beauty_concerns: [],
        preferred_styles: [],
        skin_type: 'Oily',
        hair_type: 'Wavy',
        is_student: false,
        location: 'Chennai, TN',
        college: '',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      setUser(demoUser);
    } else {
      loadDashboardData();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (user) {
      setGlowScore({
        overall: user.glow_score || 72,
        hair: user.hair_score || 75,
        skin: user.skin_score || 68,
        confidence: user.confidence_score || 70,
        trend: Math.random() > 0.5 ? 'up' : Math.random() > 0.5 ? 'down' : 'stable',
        trendValue: Math.floor(Math.random() * 10) + 1,
      });
    }
  }, [user]);

  const loadDashboardData = async () => {
    setLoading(true);

    try {
      const bookingsData = await api.getBookings({
        user_id: user?.id,
        limit: 10,
      });
      setBookings(bookingsData);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'bookings', label: 'Bookings', icon: Calendar },
    { id: 'saved', label: 'Saved', icon: Heart },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'beauty_preferences', label: 'Beauty Settings', icon: Sparkles },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-rose-200 dark:bg-rose-950/30 rounded-full blur-[150px] opacity-40" />
        <div className="absolute top-40 -left-40 w-80 h-80 bg-pink-200 dark:bg-pink-950/30 rounded-full blur-[120px] opacity-40" />
      </div>

      <section className="relative pt-24 pb-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-6">
            <aside className="lg:w-64 flex-shrink-0">
              <GlassCard className="p-4 sticky top-24">
                <div className="flex flex-col md:flex-row lg:flex-col gap-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                        activeTab === tab.id
                          ? 'bg-rose-500 text-white'
                          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                    >
                      <tab.icon className="w-5 h-5" />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  ))}
                </div>
              </GlassCard>
            </aside>

            <div className="flex-1">
              {activeTab === 'overview' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div className="flex flex-col md:flex-row gap-6 items-start">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                        {user?.name?.charAt(0) || 'G'}
                      </div>
                      <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                          Welcome back, {user?.name?.split(' ')[0] || 'Glow User'}!
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                          {user?.email || 'demo@glowai.com'}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Link to="/discover">
                        <Button variant="primary" icon={<Calendar className="w-4 h-4" />}>
                          Book Appointment
                        </Button>
                      </Link>
                      <Link to="/ai-features">
                        <Button variant="outline" icon={<Sparkles className="w-4 h-4" />}>
                          AI Features
                        </Button>
                      </Link>
                    </div>
                  </div>

                  <GlassCard className="p-6">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                      <div className="text-center">
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                          Your Glow Score
                        </p>
                        <div className="relative">
                          <CircularProgress
                            value={glowScore.overall}
                            size="lg"
                            label="Score"
                            variant="primary"
                          />
                          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-1">
                            {glowScore.trend === 'up' && (
                              <span className="text-emerald-500 text-xs flex items-center">
                                <ArrowUp className="w-3 h-3" /> +{glowScore.trendValue}%
                              </span>
                            )}
                            {glowScore.trend === 'down' && (
                              <span className="text-red-500 text-xs flex items-center">
                                <ArrowDown className="w-3 h-3" /> -{glowScore.trendValue}%
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex-1 space-y-4">
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              Hair Score
                            </span>
                            <span className="text-sm font-bold text-gray-900 dark:text-white">
                              {glowScore.hair}%
                            </span>
                          </div>
                          <Progress value={glowScore.hair} variant="success" />
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              Skin Score
                            </span>
                            <span className="text-sm font-bold text-gray-900 dark:text-white">
                              {glowScore.skin}%
                            </span>
                          </div>
                          <Progress value={glowScore.skin} variant="warning" />
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              Confidence Score
                            </span>
                            <span className="text-sm font-bold text-gray-900 dark:text-white">
                              {glowScore.confidence}%
                            </span>
                          </div>
                          <Progress value={glowScore.confidence} variant="success" />
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-rose-50 to-pink-50 dark:from-rose-950/30 dark:to-pink-950/30">
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="w-5 h-5 text-rose-500" />
                        <span className="font-semibold text-gray-900 dark:text-white">
                          AI Beauty Advisor
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Based on your scores, we recommend focusing on skincare routines this month.
                        Your hair is looking great! Consider a hydrating facial treatment.
                      </p>
                    </div>
                  </GlassCard>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { label: 'Total Bookings', value: '12', icon: Calendar, change: '+3 this month' },
                      { label: 'Saved Salons', value: '8', icon: Heart, change: '2 women-owned' },
                      { label: 'Money Saved', value: '₹4,500', icon: DollarSign, change: 'via student deals' },
                      { label: 'AI Recommendations', value: '15', icon: TrendingUp, change: '5 accepted' },
                    ].map((stat, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <GlassCard className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="w-10 h-10 rounded-xl bg-rose-100 dark:bg-rose-950/50 flex items-center justify-center">
                              <stat.icon className="w-5 h-5 text-rose-500" />
                            </div>
                            <div className="text-right">
                              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                {stat.value}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                {stat.change}
                              </p>
                            </div>
                          </div>
                        </GlassCard>
                      </motion.div>
                    ))}
                  </div>

                  <GlassCard className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        Upcoming Appointments
                      </h3>
                      <Link
                        to="/discover"
                        className="text-sm text-rose-500 hover:text-rose-600 transition-colors"
                      >
                        View all
                      </Link>
                    </div>

                    {loading ? (
                      <div className="space-y-3">
                        {[1, 2].map((i) => (
                          <div key={i} className="animate-pulse flex gap-4 p-4">
                            <div className="w-16 h-16 rounded-xl bg-gray-200 dark:bg-gray-700" />
                            <div className="flex-1 space-y-2">
                              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
                              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : bookings.filter((b) => b.status === 'confirmed').length === 0 ? (
                      <div className="text-center py-8">
                        <Calendar className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                        <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
                          No upcoming appointments
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                          Ready to glow? Book your next appointment!
                        </p>
                        <Link to="/discover">
                          <Button variant="primary" size="sm">
                            Find a Salon
                          </Button>
                        </Link>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {bookings
                          .filter((b) => b.status === 'confirmed')
                          .slice(0, 3)
                          .map((booking) => (
                            <motion.div
                              key={booking.id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            >
                              <div className="w-16 h-16 rounded-xl overflow-hidden">
                                <img
                                  src={
                                    booking.salons?.gallery_urls?.[0] ||
                                    'https://images.pexels.com/photos/3997992/pexels-photo-3997992.jpeg'
                                  }
                                  alt={booking.salons?.name || 'Salon'}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium text-gray-900 dark:text-white">
                                  {booking.salons?.name || 'Premium Salon'}
                                </h4>
                                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                                  <span className="flex items-center gap-1">
                                    <Calendar className="w-3.5 h-3.5" />
                                    {new Date(booking.booking_date).toLocaleDateString()}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Clock className="w-3.5 h-3.5" />
                                    {booking.booking_time}
                                  </span>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="font-semibold text-rose-500">
                                  ₹{booking.total_price?.toLocaleString() || '999'}
                                </p>
                                <Badge variant="success">Confirmed</Badge>
                              </div>
                            </motion.div>
                          ))}
                      </div>
                    )}
                  </GlassCard>
                </motion.div>
              )}

              {activeTab === 'bookings' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <GlassCard className="p-6">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                      All Bookings
                    </h3>
                    {loading ? (
                      <div className="animate-pulse space-y-4">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="h-20 bg-gray-200 dark:bg-gray-700 rounded-xl" />
                        ))}
                      </div>
                    ) : bookings.length === 0 ? (
                      <div className="text-center py-12">
                        <ShoppingBag className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                        <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          No bookings yet
                        </h4>
                        <Link to="/discover">
                          <Button variant="primary" className="mt-4">
                            Book Your First Appointment
                          </Button>
                        </Link>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {bookings.map((booking) => (
                          <div
                            key={booking.id}
                            className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-rose-200 dark:hover:border-rose-700 transition-colors"
                          >
                            <div className="w-20 h-20 rounded-xl overflow-hidden">
                              <img
                                src={
                                  booking.salons?.gallery_urls?.[0] ||
                                  'https://images.pexels.com/photos/3997992/pexels-photo-3997992.jpeg'
                                }
                                alt={booking.salons?.name || 'Salon'}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900 dark:text-white">
                                {booking.salons?.name || 'Premium Salon'}
                              </h4>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                {booking.services?.name || 'Premium Service'}
                              </p>
                              <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  {new Date(booking.booking_date).toLocaleDateString()}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {booking.booking_time}
                                </span>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-gray-900 dark:text-white">
                                ₹{booking.total_price?.toLocaleString() || '999'}
                              </p>
                              <Badge
                                variant={
                                  booking.status === 'confirmed'
                                    ? 'success'
                                    : booking.status === 'completed'
                                      ? 'info'
                                      : 'warning'
                                }
                              >
                                {booking.status}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </GlassCard>
                </motion.div>
              )}

              {activeTab === 'saved' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <GlassCard className="p-6">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                      Saved Salons
                    </h3>
                    <div className="text-center py-12">
                      <Heart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                      <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        No saved salons yet
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                        Save salons you love to book later
                      </p>
                      <Link to="/discover">
                        <Button variant="primary">Discover Salons</Button>
                      </Link>
                    </div>
                  </GlassCard>
                </motion.div>
              )}

              {activeTab === 'profile' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <GlassCard className="p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        User Profile
                      </h3>
                      <Button
                        variant="outline"
                        size="sm"
                        icon={<LogOut className="w-4 h-4" />}
                        onClick={() => {
                          setUser(null);
                          navigate('/');
                        }}
                      >
                        Logout
                      </Button>
                    </div>

                    <div className="flex flex-col md:flex-row gap-8 mb-8">
                      <div className="flex flex-col items-center gap-4">
                        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center text-white text-5xl font-bold shadow-xl overflow-hidden border-4 border-white dark:border-gray-800">
                          {user?.avatar_url ? (
                            <img src={user.avatar_url} alt={user.name} className="w-full h-full object-cover" />
                          ) : (
                            user?.name?.charAt(0) || 'G'
                          )}
                        </div>
                        <Button variant="outline" size="sm">Change Photo</Button>
                      </div>

                      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Full Name
                          </label>
                          <input 
                            type="text" 
                            defaultValue={user?.name || ''} 
                            className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 border border-transparent focus:border-rose-400 focus:bg-white dark:focus:bg-gray-900 focus:ring-2 focus:ring-rose-400/20 outline-none transition-all text-gray-900 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Email Address
                          </label>
                          <input 
                            type="email" 
                            defaultValue={user?.email || ''} 
                            disabled
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Phone Number
                          </label>
                          <input 
                            type="tel" 
                            defaultValue={user?.phone || ''} 
                            className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 border border-transparent focus:border-rose-400 focus:bg-white dark:focus:bg-gray-900 focus:ring-2 focus:ring-rose-400/20 outline-none transition-all text-gray-900 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Location
                          </label>
                          <input 
                            type="text" 
                            defaultValue={user?.location || ''} 
                            placeholder="e.g. Chennai, TN"
                            className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 border border-transparent focus:border-rose-400 focus:bg-white dark:focus:bg-gray-900 focus:ring-2 focus:ring-rose-400/20 outline-none transition-all text-gray-900 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            College/Organization
                          </label>
                          <input 
                            type="text" 
                            defaultValue={user?.college || ''} 
                            placeholder="e.g. SRM University"
                            className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 border border-transparent focus:border-rose-400 focus:bg-white dark:focus:bg-gray-900 focus:ring-2 focus:ring-rose-400/20 outline-none transition-all text-gray-900 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Account Created
                          </label>
                          <input 
                            type="text" 
                            defaultValue={new Date(user?.created_at || Date.now()).toLocaleDateString()} 
                            disabled
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4 mb-10">
                      <Button variant="primary">Save Changes</Button>
                    </div>

                    <div className="pt-8 border-t border-gray-200 dark:border-gray-700">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Change Password</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Current Password
                          </label>
                          <input 
                            type="password" 
                            placeholder="••••••••"
                            className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 border border-transparent focus:border-rose-400 focus:bg-white dark:focus:bg-gray-900 focus:ring-2 focus:ring-rose-400/20 outline-none transition-all text-gray-900 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            New Password
                          </label>
                          <input 
                            type="password" 
                            placeholder="••••••••"
                            className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 border border-transparent focus:border-rose-400 focus:bg-white dark:focus:bg-gray-900 focus:ring-2 focus:ring-rose-400/20 outline-none transition-all text-gray-900 dark:text-white"
                          />
                        </div>
                      </div>
                      <Button variant="outline" onClick={() => alert('Password change mock triggered!')}>
                        Update Password
                      </Button>
                    </div>
                  </GlassCard>
                </motion.div>
              )}

              {activeTab === 'beauty_preferences' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <GlassCard className="p-6">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-6">
                      Beauty Preferences
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Skin Type
                        </label>
                        <select 
                          className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 border-0 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-rose-400/20"
                          defaultValue={user?.skin_type || 'Normal'}
                        >
                          <option value="Normal">Normal</option>
                          <option value="Dry">Dry</option>
                          <option value="Oily">Oily</option>
                          <option value="Combination">Combination</option>
                          <option value="Sensitive">Sensitive</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Hair Type
                        </label>
                        <select 
                          className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 border-0 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-rose-400/20"
                          defaultValue={user?.hair_type || 'Straight'}
                        >
                          <option value="Straight">Straight</option>
                          <option value="Wavy">Wavy</option>
                          <option value="Curly">Curly</option>
                          <option value="Coily">Coily</option>
                        </select>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Beauty Concerns
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {[
                            'Acne',
                            'Dryness',
                            'Aging',
                            'Hair Fall',
                            'Dullness',
                            'Frizzy Hair',
                            'Pigmentation',
                          ].map((concern) => {
                            const isSelected = user?.beauty_concerns?.includes(concern) || ['Acne', 'Dryness'].includes(concern);
                            return (
                              <button
                                key={concern}
                                className={`px-4 py-2 rounded-full text-sm transition-all ${
                                  isSelected
                                    ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20'
                                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                                }`}
                              >
                                {concern}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Student Status
                        </label>
                        <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-100 dark:bg-gray-800">
                          <input
                            type="checkbox"
                            id="student"
                            defaultChecked={user?.is_student}
                            className="w-5 h-5 rounded accent-rose-500 cursor-pointer"
                          />
                          <label htmlFor="student" className="text-gray-700 dark:text-gray-300 cursor-pointer select-none">
                            I'm a student (eligible for special deals!)
                          </label>
                        </div>
                      </div>
                    </div>
                    <Button variant="primary" className="mt-8">
                      Save Beauty Profile
                    </Button>
                  </GlassCard>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
