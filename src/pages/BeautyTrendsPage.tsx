import { motion } from 'framer-motion';
import {
  TrendingUp,
  Sparkles,
  Scissors,
  Palette,
  Flower2,
  Star,
  ChevronRight,
  ArrowUp,
  ArrowDown,
  BarChart3,
} from 'lucide-react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { GlassCard, Badge } from '../components/ui';

const trendingServices = [
  { name: 'AI Hair Analysis', growth: 340, bookings: 1250, trend: 'up' },
  { name: 'Glass Skin Treatment', growth: 185, bookings: 890, trend: 'up' },
  { name: 'Keratin Treatments', growth: 120, bookings: 2100, trend: 'up' },
  { name: 'Bridal HD Makeup', growth: 95, bookings: 450, trend: 'up' },
  { name: 'Organic Facials', growth: 45, bookings: 1800, trend: 'up' },
  { name: 'Nail Art Premium', growth: 30, bookings: 1200, trend: 'stable' },
];

const hairTrends = [
  { name: 'Curtain Bangs', style: 'Soft face-framing bangs', popularity: 92, image: 'https://images.unsplash.com/photo-1605980776566-0486c3ac7617?auto=format&fit=crop&q=80&w=800' },
  { name: 'Hair Botox', style: 'Deep repair treatment', popularity: 85, image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=800' },
  { name: 'Balayage', style: 'Natural highlights', popularity: 78, image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&q=80&w=800' },
];

const makeupTrends = [
  { name: 'Glass Skin', style: 'Dewy, luminous finish', popularity: 88, image: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&q=80&w=800' },
  { name: 'No-Makeup Makeup', style: 'Natural, effortless beauty', popularity: 82, image: 'https://images.unsplash.com/photo-1512496015851-a1c8d4f0516b?auto=format&fit=crop&q=80&w=800' },
  { name: 'Blush Draping', style: 'Sculpted cheekbones', popularity: 75, image: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&q=80&w=800' },
];

const seasonalInsights = [
  { season: 'Summer 2026', trend: 'Heat-proof styles', description: 'Stay cool with protective hairstyles and lightweight skincare' },
  { season: 'Monsoon 2026', trend: 'Frizz control', description: 'Humidity-proof treatments and waterproof makeup trending' },
  { season: 'Winter 2026', trend: 'Glow up season', description: 'Deep hydration and rich moisturizing treatments' },
];

const categoryInsights = [
  { category: 'Hair Care', percentage: 35, color: 'bg-rose-500', icon: Scissors },
  { category: 'Skin Care', percentage: 28, color: 'bg-emerald-500', icon: Flower2 },
  { category: 'Bridal', percentage: 18, color: 'bg-amber-500', icon: Sparkles },
  { category: 'Makeup', percentage: 12, color: 'bg-purple-500', icon: Palette },
  { category: 'Wellness', percentage: 7, color: 'bg-teal-500', icon: TrendingUp },
];

export function BeautyTrendsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-rose-200 dark:bg-rose-950/30 rounded-full blur-[150px] opacity-40" />
        <div className="absolute top-40 -left-40 w-80 h-80 bg-amber-100 dark:bg-amber-950/20 rounded-full blur-[120px] opacity-30" />
      </div>

      <section className="relative pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-rose-100 to-amber-100 dark:from-rose-950/50 dark:to-amber-950/50 mb-4">
              <TrendingUp className="w-4 h-4 text-rose-500" />
              <span className="text-sm font-medium text-rose-600 dark:text-rose-300">Beauty Analytics</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Beauty Trends Dashboard
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Discover what's trending in Chennai's beauty scene with real-time insights
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
            <GlassCard className="p-6 lg:col-span-2">
              <h2 className="font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-rose-500" />
                Trending Services
              </h2>
              <div className="space-y-3">
                {trendingServices.map((service, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-rose-100 to-pink-100 dark:from-rose-950/50 dark:to-pink-950/50 flex items-center justify-center text-rose-500 font-bold text-sm">
                        {i + 1}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{service.name}</p>
                        <p className="text-xs text-gray-500">{service.bookings.toLocaleString()} bookings</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`flex items-center gap-1 text-sm font-medium ${
                        service.trend === 'up' ? 'text-emerald-500' : 'text-gray-400'
                      }`}>
                        {service.trend === 'up' ? <ArrowUp className="w-3 h-3" /> : '—'}
                        {service.growth}%
                      </span>
                      <div className="w-20">
                        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min(service.growth / 4, 100)}%` }}
                            transition={{ delay: 0.5 + i * 0.05, duration: 0.5 }}
                            className="h-full bg-gradient-to-r from-rose-500 to-pink-500 rounded-full"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <h2 className="font-semibold text-gray-900 dark:text-white mb-4">Category Breakdown</h2>
              <div className="space-y-4">
                {categoryInsights.map((cat, i) => {
                  const Icon = cat.icon;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <Icon className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">{cat.category}</span>
                        </div>
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">{cat.percentage}%</span>
                      </div>
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${cat.percentage}%` }}
                          transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                          className={`h-full ${cat.color} rounded-full`}
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </GlassCard>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-rose-500" />
            Trending Hair Styles
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {hairTrends.map((trend, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <GlassCard className="overflow-hidden">
                  <div className="aspect-[4/3] relative">
                    <img src={trend.image} alt={trend.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <Badge variant="primary">
                        <TrendingUp className="w-3 h-3 mr-1" /> {trend.popularity}% Popular
                      </Badge>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 dark:text-white">{trend.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{trend.style}</p>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <Palette className="w-6 h-6 text-purple-500" />
            Trending Makeup Styles
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {makeupTrends.map((trend, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <GlassCard className="overflow-hidden">
                  <div className="aspect-[4/3] relative">
                    <img src={trend.image} alt={trend.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <Badge variant="info">
                        <Star className="w-3 h-3 mr-1 fill-current" /> {trend.popularity}% Popular
                      </Badge>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 dark:text-white">{trend.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{trend.style}</p>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          <GlassCard className="p-6">
            <h2 className="font-semibold text-gray-900 dark:text-white mb-4">Seasonal Insights</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {seasonalInsights.map((season, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-4 rounded-xl bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-950/30 dark:to-pink-950/30"
                >
                  <p className="text-xs text-gray-500 uppercase">{season.season}</p>
                  <p className="text-lg font-semibold text-rose-500 mb-2">{season.trend}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{season.description}</p>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </div>
      </section>

      <Footer />
    </div>
  );
}
