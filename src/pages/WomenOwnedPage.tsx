import { motion } from 'framer-motion';
import {
  Users,
  Heart,
  Star,
  MapPin,
  BadgeCheck,
  MessageCircle,
  Quote,
  ArrowRight,
  Trophy,
  Sparkles,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Button, GlassCard, Badge, Rating, SalonCardSkeleton } from '../components/ui';
import { api } from '../lib/api';
import type { Salon } from '../types';

const successStories = [
  {
    name: 'Meena Krishnan',
    salon: 'Luxe Glow Studio',
    story: "Starting Luxe Glow Studio from my home in T. Nagar was a leap of faith. Today, we've served over 3000 customers and won 5 awards. GlowAI helped us reach quality-conscious customers who appreciate our organic approach.",
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    since: '2019',
    employees: 25,
    rating: 4.9,
  },
  {
    name: 'Sarah Devi',
    salon: 'Radiance Beauty Lounge',
    story: "As a single mother, building Radiance Beauty Lounge was challenging. The platform's support and visibility helped me grow from a small team to 40+ employees. We now train aspiring beauticians too!",
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop',
    since: '2018',
    employees: 40,
    rating: 4.8,
  },
  {
    name: 'Divya Priya',
    salon: 'Bloom Beauty Bar',
    story: "Sustainability is at the heart of everything we do at Bloom. GlowAI connected us with eco-conscious customers who share our values. We've grown 200% since joining the platform.",
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&h=150&fit=crop',
    since: '2020',
    employees: 15,
    rating: 4.8,
  },
];

export function WomenOwnedPage() {
  const [salons, setSalons] = useState<Salon[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeStory, setActiveStory] = useState(0);

  useEffect(() => {
    loadSalons();
  }, []);

  const loadSalons = async () => {
    try {
      const data = await api.getSalons({ is_women_owned: true, sort: 'rating' });
      setSalons(data);
    } catch (error) {
      console.error('Failed to load women-owned salons:', error);
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    { value: '200+', label: 'Women-Owned Salons' },
    { value: '85%', label: 'Customer Retention' },
    { value: '5000+', label: 'Jobs Created' },
    { value: '₹50Cr+', label: 'Revenue Generated' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-200 dark:bg-purple-950/30 rounded-full blur-[150px] opacity-30" />
        <div className="absolute top-40 -left-40 w-80 h-80 bg-rose-200 dark:bg-rose-950/30 rounded-full blur-[120px] opacity-40" />
      </div>

      <section className="relative pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-950/50 dark:to-pink-950/50 mb-4">
              <Users className="w-4 h-4 text-purple-500" />
              <span className="text-sm font-medium text-purple-600 dark:text-purple-300">Women Entrepreneurs</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Women-Owned Salons
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Discover and support inspiring women entrepreneurs building beauty empires across Chennai
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <GlassCard className="p-6 text-center bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30">
                  <p className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                    {stat.value}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{stat.label}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-16"
          >
            <GlassCard className="p-8 bg-gradient-to-r from-purple-100/50 to-pink-100/50 dark:from-purple-950/30 dark:to-pink-950/30">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-xl">
                  <Trophy className="w-10 h-10 text-white" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Empowering Women in Beauty
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    GlowAI is committed to supporting women-owned salons with special visibility, badges,
                    and priority placement in recommendations. When you book with them, you support
                    women entrepreneurs and their families.
                  </p>
                </div>
                <Link to="/for-salons">
                  <Button variant="primary" icon={<ArrowRight className="w-4 h-4" />}>
                    List Your Salon
                  </Button>
                </Link>
              </div>
            </GlassCard>
          </motion.div>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
            Success Stories
          </h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-16"
          >
            <GlassCard className="p-8">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/2">
                  <div className="flex items-center gap-4 mb-4">
                    <motion.img
                      key={activeStory}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      src={successStories[activeStory].image}
                      alt={successStories[activeStory].name}
                      className="w-16 h-16 rounded-full object-cover ring-4 ring-purple-200 dark:ring-purple-800"
                    />
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white">
                        {successStories[activeStory].name}
                      </h3>
                      <p className="text-sm text-gray-500">{successStories[activeStory].salon}</p>
                    </div>
                  </div>
                  <motion.div
                    key={`story-${activeStory}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="relative"
                  >
                    <Quote className="absolute -top-2 -left-2 w-8 h-8 text-purple-200 dark:text-purple-800" />
                    <p className="text-gray-600 dark:text-gray-300 pl-6 italic">
                      "{successStories[activeStory].story}"
                    </p>
                  </motion.div>
                  <div className="flex gap-4 mt-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-4 h-4" /> Est. {successStories[activeStory].since}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" /> {successStories[activeStory].employees} employees
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="w-4 h-4" /> {successStories[activeStory].rating}
                    </span>
                  </div>
                </div>
                <div className="md:w-1/2 flex flex-col gap-2">
                  {successStories.map((story, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveStory(i)}
                      className={`p-4 rounded-xl text-left transition-all ${
                        activeStory === i
                          ? 'bg-purple-100 dark:bg-purple-950/50 border-2 border-purple-300 dark:border-purple-700'
                          : 'bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <img src={story.image} alt={story.name} className="w-10 h-10 rounded-full object-cover" />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white text-sm">{story.name}</p>
                          <p className="text-xs text-gray-500">{story.salon}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </GlassCard>
          </motion.div>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
            Featured Women-Owned Salons
          </h2>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array(6).fill(0).map((_, i) => <SalonCardSkeleton key={i} />)}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {salons.map((salon, i) => (
                <motion.div
                  key={salon.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link to={`/salon/${salon.id}`}>
                    <GlassCard hover className="overflow-hidden">
                      <div className="aspect-video relative overflow-hidden">
                        {salon.gallery_urls[0] ? (
                          <img src={salon.gallery_urls[0]} alt={salon.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                            <span className="text-6xl">✨</span>
                          </div>
                        )}
                        <div className="absolute top-4 left-4">
                          <Badge variant="primary" icon={<Users className="w-3 h-3" />}>Women-Owned</Badge>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{salon.name}</h3>
                        <div className="flex items-center gap-1 text-sm text-gray-500 mb-3">
                          <MapPin className="w-4 h-4" />
                          {salon.area}, {salon.city}
                        </div>
                        <Rating rating={salon.rating} count={salon.review_count} />
                        <div className="flex items-center gap-2 mt-4">
                          {salon.is_verified && (
                            <Badge variant="success" icon={<BadgeCheck className="w-3 h-3" />}>Verified</Badge>
                          )}
                          {salon.trust_score > 85 && (
                            <Badge variant="info">Trusted</Badge>
                          )}
                        </div>
                      </div>
                    </GlassCard>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
