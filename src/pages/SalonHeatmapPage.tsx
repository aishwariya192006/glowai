import { motion } from 'framer-motion';
import {
  MapPin,
  Star,
  Users,
  GraduationCap,
  TrendingUp,
  BadgeCheck,
  Heart,
  Filter,
  ZoomIn,
  ZoomOut,
  Locate,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { GlassCard, Badge, Rating } from '../components/ui';
import { api } from '../lib/api';
import type { Salon } from '../types';

const chennaiAreas = [
  { name: 'T. Nagar', x: 25, y: 35, count: 12 },
  { name: 'Adyar', x: 15, y: 55, count: 8 },
  { name: 'Anna Nagar', x: 40, y: 20, count: 10 },
  { name: 'OMR', x: 60, y: 65, count: 15 },
  { name: 'Mylapore', x: 35, y: 45, count: 7 },
  { name: 'Besant Nagar', x: 22, y: 52, count: 5 },
  { name: 'Nungambakkam', x: 30, y: 30, count: 9 },
  { name: 'Velachery', x: 45, y: 70, count: 11 },
  { name: 'Guindy', x: 38, y: 55, count: 6 },
  { name: 'Porur', x: 20, y: 25, count: 4 },
];

const filterOptions = [
  { id: 'all', label: 'All Salons', icon: MapPin, color: 'bg-gray-500' },
  { id: 'top-rated', label: 'Top Rated', icon: Star, color: 'bg-amber-500' },
  { id: 'student-friendly', label: 'Student Friendly', icon: GraduationCap, color: 'bg-emerald-500' },
  { id: 'women-owned', label: 'Women-Owned', icon: Users, color: 'bg-pink-500' },
  { id: 'trending', label: 'Trending', icon: TrendingUp, color: 'bg-purple-500' },
];

export function SalonHeatmapPage() {
  const [salons, setSalons] = useState<Salon[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [hoveredArea, setHoveredArea] = useState<string | null>(null);

  useEffect(() => {
    loadSalons();
  }, [activeFilter]);

  const loadSalons = async () => {
    setLoading(true);
    try {
      const params: Record<string, string | number | boolean> = { limit: 50 };

      if (activeFilter === 'top-rated') {
        params.min_rating = 4.5;
      } else if (activeFilter === 'women-owned') {
        params.is_women_owned = true;
      } else if (activeFilter === 'trending') {
        params.min_review_count = 100;
      }

      const data = await api.getSalons(params);
      setSalons(data);
    } catch (error) {
      console.error('Failed to load heatmap salons:', error);
    } finally {
      setLoading(false);
    }
  };

  const getAreaSalons = (areaName: string) => {
    return salons.filter(s => s.area === areaName);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pb-24 md:pb-0">
      <Header />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-200 dark:bg-blue-950/30 rounded-full blur-[150px] opacity-30" />
        <div className="absolute top-40 -left-40 w-80 h-80 bg-teal-200 dark:bg-teal-950/30 rounded-full blur-[120px] opacity-30" />
      </div>

      <section className="relative pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-950/50 dark:to-cyan-950/50 mb-4">
              <MapPin className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium text-blue-600 dark:text-blue-300">Explore Chennai</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Salon Heatmap
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Discover the best beauty destinations across Chennai
            </p>
          </motion.div>

          <div className="flex items-center gap-2 flex-wrap justify-center mb-8">
            {filterOptions.map((filter) => (
              <motion.button
                key={filter.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveFilter(filter.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  activeFilter === filter.id
                    ? `${filter.color} text-white`
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700'
                }`}
              >
                <filter.icon className="w-4 h-4" />
                {filter.label}
              </motion.button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <GlassCard className="p-6 lg:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-gray-900 dark:text-white">Chennai Map</h2>
                <div className="flex gap-2">
                  <button className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 transition-colors">
                    <ZoomIn className="w-4 h-4" />
                  </button>
                  <button className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 transition-colors">
                    <ZoomOut className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="relative aspect-square bg-gradient-to-br from-blue-50 to-teal-50 dark:from-blue-950/20 dark:to-teal-950/20 rounded-2xl overflow-hidden">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <defs>
                    <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                      <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(0,0,0,0.05)" />
                    </pattern>
                  </defs>
                  <rect width="100" height="100" fill="url(#grid)" />

                  {chennaiAreas.map((area) => (
                    <motion.g
                      key={area.name}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: Math.random() * 0.5 }}
                      onMouseEnter={() => setHoveredArea(area.name)}
                      onMouseLeave={() => setHoveredArea(null)}
                      onClick={() => setSelectedArea(area.name)}
                      className="cursor-pointer"
                    >
                      <motion.circle
                        cx={area.x}
                        cy={area.y}
                        r={Math.min(area.count / 2 + 4, 10)}
                        fill={hoveredArea === area.name || selectedArea === area.name ? '#ec4899' : '#fb7185'}
                        fillOpacity={0.2}
                        stroke="#f43f5e"
                        strokeWidth="1"
                        whileHover={{ scale: 1.2 }}
                      />
                      <circle
                        cx={area.x}
                        cy={area.y}
                        r="3"
                        fill="#f43f5e"
                      />
                      <text
                        x={area.x}
                        y={area.y + 12}
                        textAnchor="middle"
                        fill="#374151"
                        fontSize="4"
                        fontWeight="500"
                      >
                        {area.name}
                      </text>
                      <text
                        x={area.x}
                        y={area.y - 6}
                        textAnchor="middle"
                        fill="#ec4899"
                        fontSize="5"
                        fontWeight="bold"
                      >
                        {area.count}
                      </text>
                    </motion.g>
                  ))}

                  <path
                    d="M 0 50 Q 30 30 50 50 T 100 50"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="3"
                    strker="rgba(59, 130, 246, 0.3)"
                  />
                  <text x="10" y="85" fontSize="4" fill="#6b7280">Chennai Metro Line</text>
                </svg>

                <div className="absolute bottom-4 left-4 flex items-center gap-3">
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <div className="w-3 h-3 rounded-full bg-rose-400" />
                    <span>Low</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <div className="w-4 h-4 rounded-full bg-rose-500" />
                    <span>Medium</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <div className="w-5 h-5 rounded-full bg-rose-600" />
                    <span>High</span>
                  </div>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <h2 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Locate className="w-5 h-5 text-rose-500" />
                {selectedArea ? `Salons in ${selectedArea}` : 'Select an area'}
              </h2>

              {selectedArea ? (
                <div className="space-y-3">
                  {chennaiAreas
                    .find(a => a.name === selectedArea)
                    ?.count && (
                      <p className="text-sm text-gray-500 mb-4">
                        {chennaiAreas.find(a => a.name === selectedArea)?.count} salons available
                      </p>
                    )}

                  <div className="space-y-3 max-h-80 overflow-y-auto">
                    {salons
                      .filter(s => s.area === selectedArea)
                      .slice(0, 5)
                      .map((salon, i) => (
                        <Link key={salon.id} to={`/salon/${salon.id}`}>
                          <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="font-medium text-gray-900 dark:text-white text-sm">
                                {salon.name}
                              </h3>
                              <div className="flex items-center gap-1">
                                <Star className="w-3 h-3 text-amber-400 fill-current" />
                                <span className="text-xs">{salon.rating}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {salon.is_verified && (
                                <Badge variant="success" className="text-xs">Verified</Badge>
                              )}
                              {salon.is_women_owned && (
                                <Badge variant="primary" className="text-xs">Women-Owned</Badge>
                              )}
                              <Badge variant="info" className="text-xs">
                                Trust: {salon.trust_score}
                              </Badge>
                            </div>
                          </motion.div>
                        </Link>
                      ))}
                  </div>

                  <Link to={`/discover?area=${encodeURIComponent(selectedArea)}`}>
                    <button className="w-full mt-3 py-2 text-sm text-rose-500 hover:text-rose-600 font-medium">
                      View all salons in {selectedArea} →
                    </button>
                  </Link>
                </div>
              ) : (
                <div className="text-center py-8">
                  <MapPin className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                  <p className="text-sm text-gray-500">
                    Click on an area to explore salons
                  </p>
                </div>
              )}
            </GlassCard>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                title: 'Most Popular',
                subtitle: 'T. Nagar',
                count: 12,
                icon: TrendingUp,
                color: 'from-purple-500 to-indigo-500',
              },
              {
                title: 'Women-Owned',
                subtitle: 'Adyar',
                count: 8,
                icon: Users,
                color: 'from-pink-500 to-rose-500',
              },
              {
                title: 'Student Deals',
                subtitle: 'OMR',
                count: 15,
                icon: GraduationCap,
                color: 'from-emerald-500 to-teal-500',
              },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
              >
                <GlassCard className="p-4 cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setSelectedArea(stat.subtitle)}>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                      <stat.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">{stat.title}</p>
                      <p className="font-bold text-gray-900 dark:text-white">{stat.subtitle}</p>
                      <p className="text-xs text-gray-400">{stat.count} salons</p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
