import { motion } from 'framer-motion';
import {
  GraduationCap,
  Search,
  MapPin,
  Clock,
  BadgeCheck,
  ArrowRight,
  Star,
  Heart,
  Sparkles,
  Filter,
  DollarSign,
  SortAsc,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Button, GlassCard, Badge, Rating, Progress } from '../components/ui';
import { SalonCardSkeleton } from '../components/ui/Skeleton';
import { api } from '../lib/api';
import type { Salon, Service } from '../types';

interface ServiceWithSalon extends Service {
  salons?: Salon;
}

const budgetTiers = [
  { id: 'under-500', label: 'Under ₹500', min: 0, max: 500, emoji: '💸' },
  { id: 'under-1000', label: 'Under ₹1000', min: 0, max: 1000, emoji: '💵' },
  { id: 'under-2000', label: 'Under ₹2000', min: 0, max: 2000, emoji: '💰' },
  { id: 'all', label: 'All Deals', min: 0, max: 10000, emoji: '✨' },
];

const categories = [
  { id: 'all', label: 'All Services' },
  { id: 'Hair Care', label: 'Hair Care' },
  { id: 'Skin Care', label: 'Skin Care' },
  { id: 'Nail Art', label: 'Nail Art' },
  { id: 'Spa & Wellness', label: 'Spa' },
];

export function StudentDealsPage() {
  const [services, setServices] = useState<ServiceWithSalon[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBudget, setSelectedBudget] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [search, setSearch] = useState('');

  useEffect(() => {
    loadStudentDeals();
  }, [selectedBudget, selectedCategory]);

  const loadStudentDeals = async () => {
    setLoading(true);
    try {
      const budget = budgetTiers.find((b) => b.id === selectedBudget);
      const data = await api.getServices({
        is_student_deal: true,
        min_price: budget?.min,
        max_price: budget?.max,
        category: selectedCategory !== 'all' ? selectedCategory : undefined,
      });
      setServices(data);
    } catch (error) {
      console.error('Failed to load student deals:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredServices = services.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.salons?.name?.toLowerCase().includes(search.toLowerCase()) ||
    s.salons?.area?.toLowerCase().includes(search.toLowerCase())
  );

  const discountStats = [
    { label: 'Average Discount', value: '35%', color: 'text-emerald-500' },
    { label: 'Student Deals', value: `${services.length}+`, color: 'text-rose-500' },
    { label: 'Partner Salons', value: '500+', color: 'text-blue-500' },
    { label: 'Max Savings', value: '₹2,000', color: 'text-amber-500' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pb-24 md:pb-0">
      <Header />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-200 dark:bg-emerald-950/30 rounded-full blur-[150px] opacity-30" />
        <div className="absolute top-40 -left-40 w-80 h-80 bg-amber-200 dark:bg-amber-950/30 rounded-full blur-[120px] opacity-30" />
      </div>

      <section className="relative pt-24 pb-8 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-950/50 dark:to-teal-950/50 mb-4">
              <GraduationCap className="w-4 h-4 text-emerald-500" />
              <span className="text-sm font-medium text-emerald-600 dark:text-emerald-300">
                Student Exclusive
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Student Beauty Deals
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Show your student ID and save up to 40% on premium beauty services
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            {discountStats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <GlassCard className="py-4 text-center">
                  <p className={`text-3xl font-bold ${stat.color}`}>
                    {stat.value}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <GlassCard className="p-6 mb-8 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    How Student Deals Work
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-bold">1</span>
                      <span className="text-gray-600 dark:text-gray-400">Browse deals</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-bold">2</span>
                      <span className="text-gray-600 dark:text-gray-400">Book through us</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-bold">3</span>
                      <span className="text-gray-600 dark:text-gray-400">Show student ID</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-bold">4</span>
                      <span className="text-gray-600 dark:text-gray-400">Save money!</span>
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-6">
            <aside className="lg:w-64 flex-shrink-0">
              <GlassCard className="p-4 sticky top-24">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Filter className="w-4 h-4" /> Filters
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2 block">
                      Budget Range
                    </label>
                    <div className="space-y-2">
                      {budgetTiers.map((tier) => (
                        <button
                          key={tier.id}
                          onClick={() => setSelectedBudget(tier.id)}
                          className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-all ${
                            selectedBudget === tier.id
                              ? 'bg-emerald-500 text-white'
                              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
                          }`}
                        >
                          <span>{tier.emoji}</span>
                          <span>{tier.label}</span>
                          {selectedBudget === tier.id && (
                            <ArrowRight className="w-3 h-3 ml-auto" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2 block">
                      Category
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => setSelectedCategory(cat.id)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                            selectedCategory === cat.id
                              ? 'bg-rose-500 text-white'
                              : 'bg-gray-100 dark:bg-gray-800 text-gray-600'
                          }`}
                        >
                          {cat.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </GlassCard>
            </aside>

            <div className="flex-1">
              <div className="flex items-center justify-between mb-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search deals..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/70 dark:bg-gray-800/70 border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
                  />
                </div>
                <div className="text-sm text-gray-500 ml-4">
                  {filteredServices.length} deals found
                </div>
              </div>

              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Array(6).fill(0).map((_, i) => <SalonCardSkeleton key={i} />)}
                </div>
              ) : filteredServices.length === 0 ? (
                <GlassCard className="p-12 text-center">
                  <GraduationCap className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    No deals in this range
                  </h3>
                  <p className="text-gray-500 text-sm mb-4">
                    Try adjusting your budget or category filters
                  </p>
                  <Button variant="primary" onClick={() => { setSelectedBudget('all'); setSelectedCategory('all'); }}>
                    Show All Deals
                  </Button>
                </GlassCard>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredServices.map((service, i) => {
                    const discount = service.original_price
                      ? Math.round((1 - service.price / service.original_price) * 100)
                      : Math.round(Math.random() * 20 + 20);

                    return (
                      <motion.div
                        key={service.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.03 }}
                      >
                        <Link to={`/salon/${service.salons?.id}`}>
                          <GlassCard hover className="overflow-hidden">
                            <div className="p-4">
                              <div className="flex items-start justify-between mb-3">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <h3 className="font-bold text-gray-900 dark:text-white">
                                      {service.name}
                                    </h3>
                                  </div>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {service.salons?.name} | {service.salons?.area}
                                  </p>
                                </div>
                                <div className="bg-emerald-500 text-white px-2 py-1 rounded-lg text-xs font-bold">
                                  -{discount}%
                                </div>
                              </div>

                              <div className="flex items-center gap-3 mb-3">
                                <Badge variant="success" className="text-xs">
                                  <GraduationCap className="w-3 h-3 mr-1" />
                                  Student Deal
                                </Badge>
                                <span className="text-xs text-gray-500">
                                  {service.duration_minutes} mins
                                </span>
                              </div>

                              <div className="flex items-center justify-between">
                                <div>
                                  <span className="text-2xl font-bold text-emerald-600">
                                    ₹{service.price.toLocaleString()}
                                  </span>
                                  {service.original_price && (
                                    <span className="text-sm text-gray-400 line-through ml-2">
                                      ₹{service.original_price.toLocaleString()}
                                    </span>
                                  )}
                                </div>
                                <Button variant="primary" size="sm">
                                  Book
                                </Button>
                              </div>

                              <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800">
                                <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full"
                                    style={{ width: `${Math.min(100, service.price / 20)}%` }}
                                  />
                                </div>
                                <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                                  <span>Budget: ₹{service.price}</span>
                                  <span>Save ₹{(service.original_price || service.price * 1.3) - service.price}</span>
                                </div>
                              </div>
                            </div>
                          </GlassCard>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
