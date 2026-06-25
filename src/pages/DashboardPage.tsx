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
import { Button, GlassCard, Badge, Progress } from '../components/ui';
import { LogoutModal } from '../components/ui/LogoutModal';
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
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [glowScore, setGlowScore] = useState<GlowScoreData>({
    overall: 72,
    hair: 75,
    skin: 68,
    confidence: 70,
    trend: 'up',
    trendValue: 5,
  });
  const [aiRecommendation, setAiRecommendation] = useState<string>("Analyzing your beauty profile with AI...");
  const [matchPercentage, setMatchPercentage] = useState<number | null>(null);
  const [recommendedServices, setRecommendedServices] = useState<string[]>([]);
  const [featuredSalons, setFeaturedSalons] = useState<Salon[]>([]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      loadDashboardData();
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (user) {
      // Use actual scores from the database (fallback to defaults if a field is missing)
      setGlowScore({
        overall: user.glow_score || 83,
        hair: user.hair_score || 75,
        skin: user.skin_score || 68,
        confidence: user.confidence_score || 70,
        trend: 'up',
        trendValue: 4,
      });

      // Fetch AI Recommendation from Python Machine Learning API
      const fetchRecommendation = async () => {
        try {
          const res = await fetch('http://localhost:5000/api/recommend', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              age: 25, // Fallback if not in DB
              gender: 'Female',
              skinType: user.beauty_concerns?.includes('Acne') ? 'Oily' : 'Normal',
              hairType: 'Straight',
              budget: 1500,
              concern: user.beauty_concerns?.[0] || 'Acne'
            }),
          });
          const data = await res.json();
          if (data.success) {
            setAiRecommendation(`Based on your profile, we highly recommend focusing on ${data.primaryService}.`);
            setMatchPercentage(data.matchPercentage);
            setRecommendedServices(data.recommendedServices);
          }
        } catch (error) {
          console.error("Failed to fetch AI recommendation:", error);
          setAiRecommendation("Our AI model is currently offline. Please try again later.");
        }
      };

      fetchRecommendation();
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

      // Fetch featured salons from Supabase instead of hardcoded banner
      const salonsData = await api.getSalons({ limit: 3 });
      setFeaturedSalons(salonsData);
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

                  {/* Featured Salons replacing the hardcoded banner */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    {featuredSalons.map((salon, index) => (
                      <Link to={`/salon/${salon.id}`} key={salon.id}>
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="group rounded-[2rem] overflow-hidden bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                        >
                          <div className="relative h-48 overflow-hidden">
                            <img 
                              src={salon.gallery_urls?.[0] || salon.logo_url || 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80'} 
                              alt={salon.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 text-sm font-bold text-gray-900">
                              <Star className="w-4 h-4 text-amber-400 fill-current" />
                              {salon.rating}
                            </div>
                          </div>
                          <div className="p-5">
                            <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1 truncate">{salon.name}</h3>
                            <p className="text-gray-500 dark:text-gray-400 text-sm flex items-center gap-1 mb-4 truncate">
                              <MapPin className="w-4 h-4" /> {salon.address}, {salon.city}
                            </p>
                            <div className="flex items-center justify-between">
                              <Badge variant="primary">{salon.price_range || 'Moderate'}</Badge>
                              <span className="text-rose-500 font-medium text-sm group-hover:underline">View Details →</span>
                            </div>
                          </div>
                        </motion.div>
                      </Link>
                    ))}
                  </div>
                  
                  <GlassCard className="p-6">

                    <div className="p-4 rounded-xl bg-gradient-to-r from-rose-50 to-pink-50 dark:from-rose-950/30 dark:to-pink-950/30">
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-5 h-5 text-rose-500" />
                          <span className="font-semibold text-gray-900 dark:text-white">
                            AI Beauty Advisor
                          </span>
                        </div>
                        {matchPercentage && (
                          <span className="px-2 py-1 bg-rose-500 text-white text-xs font-bold rounded-full">
                            {matchPercentage}% Match
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        {aiRecommendation}
                      </p>
                      {recommendedServices.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {recommendedServices.map((service, i) => (
                            <span key={i} className="px-3 py-1 bg-white dark:bg-gray-800 text-rose-600 dark:text-rose-400 text-xs font-medium rounded-full border border-rose-200 dark:border-rose-900/50 shadow-sm">
                              {service}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </GlassCard>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { label: 'Total Bookings', value: bookings.length.toString(), icon: Calendar, change: 'Lifetime' },
                      { label: 'Saved Salons', value: '0', icon: Heart, change: 'Coming soon' },
                      { label: 'Total Spent', value: `₹${bookings.reduce((sum, b) => sum + (b.total_price || 0), 0).toLocaleString()}`, icon: DollarSign, change: 'Across all bookings' },
                      { label: 'Beauty Concerns', value: (user?.beauty_concerns?.length || 0).toString(), icon: TrendingUp, change: 'Tracked' },
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
                        onClick={() => setShowLogoutModal(true)}
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

      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onLogout={() => {
          setShowLogoutModal(false);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          sessionStorage.clear();
          setUser(null);
          navigate('/');
        }}
      />
    </div>
  );
}
