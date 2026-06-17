import { motion } from 'framer-motion';
import {
  Search,
  SlidersHorizontal,
  MapPin,
  Grid3X3,
  List,
  X,
  ChevronDown,
  Heart,
  BadgeCheck,
  Users,
  GraduationCap,
  DollarSign,
  Star,
} from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Button, GlassCard, Badge, Rating } from '../components/ui';
import { SalonCard } from '../components/features/SalonCard';
import { api } from '../lib/api';
import type { Salon, Category, Service } from '../types';

const locations = [
  { value: '', label: 'All Chennai' },
  { value: 'T. Nagar', label: 'T. Nagar' },
  { value: 'Adyar', label: 'Adyar' },
  { value: 'Anna Nagar', label: 'Anna Nagar' },
  { value: 'OMR', label: 'OMR' },
  { value: 'Mylapore', label: 'Mylapore' },
  { value: 'Besant Nagar', label: 'Besant Nagar' },
];

const priceRanges = [
  { value: '', label: 'All Budgets' },
  { value: 'budget', label: '₹ Budget-Friendly' },
  { value: 'moderate', label: '₹₹ Moderate' },
  { value: 'premium', label: '₹₹₹ Premium' },
];

const sortOptions = [
  { value: 'rating', label: 'Highest Rated' },
  { value: 'price_low', label: 'Price: Low to High' },
  { value: 'price_high', label: 'High to Low' },
  { value: 'popular', label: 'Most Popular' },
  { value: 'trust', label: 'Trust Score' },
];

const aiFilters = [
  { id: 'women_owned', label: 'Women-Owned', icon: Users, count: 200 },
  { id: 'student_deals', label: 'Student Deals', icon: GraduationCap, count: 150 },
  { id: 'verified', label: 'Verified', icon: BadgeCheck, count: 500 },
];

interface Filters {
  search: string;
  location: string;
  price: string;
  rating: number | null;
  womenOwned: boolean;
  studentDeals: boolean;
  verified: boolean;
  sort: string;
}

export function DiscoverPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [salons, setSalons] = useState<Salon[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const [filters, setFilters] = useState<Filters>({
    search: searchParams.get('search') || '',
    location: searchParams.get('location') || '',
    price: '',
    rating: null,
    womenOwned: false,
    studentDeals: false,
    verified: false,
    sort: 'rating',
  });

  useEffect(() => {
    // Load categories once on mount
    api.getCategories()
      .then(setCategories)
      .catch((err) => console.error('Failed to load categories', err));
  }, []);

  useEffect(() => {
    fetchSalons();
  }, [filters]);

  const fetchSalons = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getSalons({
        search: filters.search || undefined,
        area: filters.location || undefined,
        price_range: filters.price || undefined,
        min_rating: filters.rating ?? undefined,
        is_women_owned: filters.womenOwned || undefined,
        is_verified: filters.verified || undefined,
        sort: filters.sort,
      });
      setSalons(data);
    } catch (err: any) {
      console.error('Failed to fetch salons:', err);
      setError(err.message || 'An error occurred while fetching salons.');
    } finally {
      setLoading(false);
    }
  };

  const updateFilter = (key: keyof Filters, value: string | boolean | number | null) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      location: '',
      price: '',
      rating: null,
      womenOwned: false,
      studentDeals: false,
      verified: false,
      sort: 'rating',
    });
  };

  const activeFiltersCount = [
    filters.search,
    filters.location,
    filters.price,
    filters.rating,
    filters.womenOwned,
    filters.studentDeals,
    filters.verified,
  ].filter(Boolean).length;

  const FilterPanel = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Location
        </label>
        <select
          value={filters.location}
          onChange={(e) => updateFilter('location', e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-400/50"
        >
          {locations.map((loc) => (
            <option key={loc.value} value={loc.value}>
              {loc.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Price Range
        </label>
        <select
          value={filters.price}
          onChange={(e) => updateFilter('price', e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-400/50"
        >
          {priceRanges.map((pr) => (
            <option key={pr.value} value={pr.value}>
              {pr.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Minimum Rating
        </label>
        <div className="flex gap-2">
          {[4.5, 4.0, 3.5, 3.0].map((rating) => (
            <button
              key={rating}
              onClick={() => updateFilter('rating', filters.rating === rating ? null : rating)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                filters.rating === rating
                  ? 'bg-rose-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-rose-100 dark:hover:bg-rose-950/50'
              }`}
            >
              {rating}+
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          AI-Powered Filters
        </label>
        <div className="space-y-2">
          {aiFilters.map((filter) => (
            <button
              key={filter.id}
              onClick={() =>
                updateFilter(
                  filter.id as keyof Filters,
                  !filters[filter.id as keyof Filters]
                )
              }
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                filters[filter.id as keyof Filters]
                  ? 'bg-rose-100 dark:bg-rose-950/50 text-rose-600 dark:text-rose-300'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <filter.icon className="w-4 h-4" />
                {filter.label}
              </div>
              <span className="text-xs text-gray-400">{filter.count} salons</span>
            </button>
          ))}
        </div>
      </div>

      {activeFiltersCount > 0 && (
        <button
          onClick={clearFilters}
          className="w-full py-2 text-sm text-rose-500 hover:text-rose-600 transition-colors"
        >
          Clear all filters
        </button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />

      <div className="pt-24 pb-8 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Discover Salons
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Explore {salons.length} beauty destinations across Chennai
            </p>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-6">
            <aside className="hidden lg:block w-72 flex-shrink-0">
              <GlassCard className="p-6 sticky top-24">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4" />
                  Filters
                  {activeFiltersCount > 0 && (
                    <Badge variant="primary">{activeFiltersCount}</Badge>
                  )}
                </h3>
                <FilterPanel />
              </GlassCard>
            </aside>

            <div className="flex-1">
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={filters.search}
                    onChange={(e) => updateFilter('search', e.target.value)}
                    placeholder="Search salons, services, or areas..."
                    className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white/80 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-400/50"
                  />
                </div>

                <div className="flex gap-2">
                  <select
                    value={filters.sort}
                    onChange={(e) => updateFilter('sort', e.target.value)}
                    className="px-4 py-3 rounded-2xl bg-white/80 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-rose-400/50"
                  >
                    {sortOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>

                  <div className="flex gap-1 p-1 rounded-2xl bg-gray-100 dark:bg-gray-800">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2.5 rounded-xl transition-colors ${
                        viewMode === 'grid'
                          ? 'bg-white dark:bg-gray-700 shadow-sm'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <Grid3X3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2.5 rounded-xl transition-colors ${
                        viewMode === 'list'
                          ? 'bg-white dark:bg-gray-700 shadow-sm'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>

                  <button
                    onClick={() => setShowMobileFilters(true)}
                    className="lg:hidden p-3 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                  >
                    <SlidersHorizontal className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                  </button>
                </div>
              </div>

              {activeFiltersCount > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {filters.search && (
                    <Badge className="flex items-center gap-1">
                      Search: {filters.search}
                      <button onClick={() => updateFilter('search', '')}>
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  )}
                  {filters.location && (
                    <Badge className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {filters.location}
                      <button onClick={() => updateFilter('location', '')}>
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  )}
                  {filters.price && (
                    <Badge className="flex items-center gap-1">
                      <DollarSign className="w-3 h-3" />
                      {priceRanges.find((p) => p.value === filters.price)?.label}
                      <button onClick={() => updateFilter('price', '')}>
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  )}
                  {filters.rating && (
                    <Badge className="flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      {filters.rating}+ rating
                      <button onClick={() => updateFilter('rating', null)}>
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  )}
                </div>
              )}

              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {Array(6)
                    .fill(0)
                    .map((_, i) => (
                      <div key={i} className="animate-pulse">
                        <div className="aspect-[4/3] bg-gray-200 dark:bg-gray-700 rounded-3xl mb-4" />
                        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-lg w-3/4 mb-2" />
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-lg w-1/2" />
                      </div>
                    ))}
                </div>
              ) : error ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 mx-auto rounded-3xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-4">
                    <X className="w-8 h-8 text-red-500 dark:text-red-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Failed to load salons
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-6">{error}</p>
                  <Button onClick={() => fetchSalons()}>Try Again</Button>
                </div>
              ) : salons.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 mx-auto rounded-3xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                    <Search className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    No salons found
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">Try adjusting your filters</p>
                </div>
              ) : (
                <div
                  className={
                    viewMode === 'grid'
                      ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
                      : 'space-y-4'
                  }
                >
                  {salons.map((salon, i) => (
                    <SalonCard key={salon.id} salon={salon} index={i} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {showMobileFilters && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm lg:hidden"
          onClick={() => setShowMobileFilters(false)}
        >
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            className="absolute left-0 top-0 bottom-0 w-80 bg-white dark:bg-gray-900 shadow-2xl p-6 overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-gray-900 dark:text-white">Filters</h3>
              <button onClick={() => setShowMobileFilters(false)}>
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>
            <FilterPanel />
          </motion.div>
        </motion.div>
      )}

      <Footer />
    </div>
  );
}
