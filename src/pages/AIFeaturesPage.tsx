import { motion } from 'framer-motion';
import {
  Sparkles,
  Wand2,
  Calendar,
  TrendingUp,
  Heart,
  ChevronRight,
  Gift,
  Star,
  PartyPopper,
  GraduationCap,
  Briefcase,
  HeartHandshake,
  Crown,
  ArrowRight,
  X,
  Check,
} from 'lucide-react';
import { useState } from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Button, GlassCard, Badge, Modal, Input, CircularProgress, Progress } from '../components/ui';

const aiFeatures = [
  {
    id: 'matchmaker',
    title: 'AI Salon Matchmaker',
    description: 'Get personalized salon recommendations based on your beauty profile, preferences, and history.',
    icon: Heart,
    color: 'from-rose-500 to-pink-500',
    comingSoon: false,
  },
  {
    id: 'glow-score',
    title: 'Glow Score Tracker',
    description: 'Track your beauty journey with our comprehensive Glow Score system measuring hair, skin, and confidence.',
    icon: TrendingUp,
    color: 'from-amber-500 to-orange-500',
    comingSoon: false,
  },
  {
    id: 'occasion',
    title: 'Occasion Planner',
    description: 'Plan the perfect look for weddings, interviews, parties, and festivals with AI-curated schedules.',
    icon: Calendar,
    color: 'from-emerald-500 to-teal-500',
    comingSoon: false,
  },
  {
    id: 'advisor',
    title: 'AI Beauty Advisor',
    description: 'Get personalized beauty advice and routine recommendations from our AI beauty expert.',
    icon: Wand2,
    color: 'from-blue-500 to-indigo-500',
    comingSoon: false,
  },
  {
    id: 'routine',
    title: 'Beauty Routine Generator',
    description: 'Generate customized daily, weekly, and monthly beauty routines tailored to your needs.',
    icon: Sparkles,
    color: 'from-purple-500 to-indigo-500',
    comingSoon: true,
  },
  {
    id: 'review',
    title: 'AI Review Summarizer',
    description: 'Get AI-generated summaries of salon reviews to quickly understand customer experiences.',
    icon: Star,
    color: 'from-cyan-500 to-blue-500',
    comingSoon: true,
  },
];

const occasions = [
  { id: 'wedding', name: 'Wedding', icon: HeartHandshake, color: 'from-rose-500 to-pink-500' },
  { id: 'interview', name: 'Interview', icon: Briefcase, color: 'from-blue-500 to-indigo-500' },
  { id: 'party', name: 'Party', icon: PartyPopper, color: 'from-purple-500 to-pink-500' },
  { id: 'festival', name: 'Festival', icon: Gift, color: 'from-amber-500 to-orange-500' },
  { id: 'college', name: 'College Event', icon: GraduationCap, color: 'from-emerald-500 to-teal-500' },
  { id: 'date', name: 'Date Night', icon: Heart, color: 'from-red-500 to-rose-500' },
];

export function AIFeaturesPage() {
  const [showOccasionPlanner, setShowOccasionPlanner] = useState(false);
  const [showGlowScore, setShowGlowScore] = useState(false);
  const [showMatchmaker, setShowMatchmaker] = useState(false);
  const [selectedOccasion, setSelectedOccasion] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [occasionResult, setOccasionResult] = useState<null | {
    timeline: { time: string; task: string; salon: string }[];
    budget: { min: number; max: number };
    tips: string[];
  }>(null);

  const handleOccasionPlan = (occasion: string) => {
    setSelectedOccasion(occasion);
    setIsAnalyzing(true);
    setOccasionResult(null);

    setTimeout(() => {
      setOccasionResult({
        timeline: [
          { time: '2 weeks before', task: 'Trial makeup session', salon: 'Luxe Glow Studio' },
          { time: '1 week before', task: 'Facial treatment', salon: 'Radiance Beauty Lounge' },
          { time: '3 days before', task: 'Hair spa & treatment', salon: 'Luxe Glow Studio' },
          { time: '1 day before', task: 'Manicure & Pedicure', salon: 'Bloom Beauty Bar' },
          { time: 'Day of event', task: 'Final makeup & styling', salon: 'Luxe Glow Studio' },
        ],
        budget: { min: 12000, max: 25000 },
        tips: [
          'Book your trial session at least 2 weeks in advance',
          'Stay hydrated for glowing skin',
          'Avoid trying new products right before the event',
          'Bring reference photos for your desired look',
        ],
      });
      setIsAnalyzing(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-rose-200 dark:bg-rose-950/30 rounded-full blur-[150px] opacity-40" />
        <div className="absolute top-40 -left-40 w-80 h-80 bg-pink-200 dark:bg-pink-950/30 rounded-full blur-[120px] opacity-40" />
      </div>

      <section className="relative pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-rose-100 to-pink-100 dark:from-rose-950/50 dark:to-pink-950/50 mb-4">
              <Sparkles className="w-4 h-4 text-rose-500" />
              <span className="text-sm font-medium text-rose-600 dark:text-rose-300">
                Powered by AI
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              AI Beauty Features
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Experience the future of beauty with our AI-powered tools designed for your
              personalized journey
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aiFeatures.map((feature, i) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <GlassCard
                  hover={!feature.comingSoon}
                  onClick={() => {
                    if (feature.id === 'occasion') setShowOccasionPlanner(true);
                    else if (feature.id === 'glow-score') setShowGlowScore(true);
                    else if (feature.id === 'matchmaker') setShowMatchmaker(true);
                  }}
                  className={`p-6 h-full ${feature.comingSoon ? 'opacity-60' : ''}`}
                >
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg mb-4`}
                  >
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {feature.title}
                    </h3>
                    {feature.comingSoon && (
                      <Badge variant="warning" className="text-xs">Coming Soon</Badge>
                    )}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{feature.description}</p>
                  {!feature.comingSoon && (
                    <button
                      onClick={() => {
                        if (feature.id === 'occasion') setShowOccasionPlanner(true);
                        else if (feature.id === 'glow-score') setShowGlowScore(true);
                        else if (feature.id === 'matchmaker') setShowMatchmaker(true);
                      }}
                      className="inline-flex items-center gap-1 text-rose-500 hover:text-rose-600 font-medium transition-colors"
                    >
                      Try Now <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </GlassCard>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-16"
          >
            <GlassCard className="p-8 bg-gradient-to-r from-rose-50 to-pink-50 dark:from-rose-950/30 dark:to-pink-950/30">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center shadow-xl shadow-rose-500/30">
                  <Sparkles className="w-10 h-10 text-white" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Personalized AI Recommendations
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Our AI learns from your preferences, bookings, and feedback to provide
                    increasingly accurate recommendations tailored just for you.
                  </p>
                </div>
                <Button variant="primary" icon={<ArrowRight className="w-4 h-4" />}>
                  Start Analysis
                </Button>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </section>

      <Modal isOpen={showOccasionPlanner} onClose={() => {
        setShowOccasionPlanner(false);
        setSelectedOccasion(null);
        setOccasionResult(null);
      }} title="AI Occasion Planner" size="lg">
        {!selectedOccasion ? (
          <div className="p-6">
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Select your occasion and let our AI create the perfect beauty plan for you.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {occasions.map((occasion) => (
                <motion.button
                  key={occasion.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleOccasionPlan(occasion.name)}
                  className={`p-6 rounded-2xl bg-gradient-to-br ${occasion.color} text-white text-center hover:shadow-lg transition-shadow`}
                >
                  <occasion.icon className="w-8 h-8 mx-auto mb-2" />
                  <span className="font-semibold">{occasion.name}</span>
                </motion.button>
              ))}
            </div>
          </div>
        ) : (
          <div className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <Badge variant="primary">{selectedOccasion}</Badge>
            </div>

            {isAnalyzing ? (
              <div className="text-center py-12">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-16 h-16 mx-auto rounded-full border-4 border-gray-200 border-t-rose-500 mb-4"
                />
                <p className="text-gray-600 dark:text-gray-400">
                  AI is analyzing the best beauty plan for your {selectedOccasion.toLowerCase()}...
                </p>
              </div>
            ) : occasionResult ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Beauty Timeline</h3>
                <div className="space-y-3 mb-6">
                  {occasionResult.timeline.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50"
                    >
                      <div className="w-8 h-8 rounded-lg bg-rose-100 dark:bg-rose-950/50 flex items-center justify-center text-rose-500 font-bold text-sm flex-shrink-0">
                        {i + 1}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 dark:text-white">{item.task}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {item.time} at {item.salon}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 mb-6">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Estimated Budget</p>
                  <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                    ₹{occasionResult.budget.min.toLocaleString()} - ₹{occasionResult.budget.max.toLocaleString()}
                  </p>
                </div>

                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Pro Tips</h4>
                <ul className="space-y-2">
                  {occasionResult.tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      {tip}
                    </li>
                  ))}
                </ul>

                <Button variant="primary" className="w-full mt-6">
                  Book Now
                </Button>
              </motion.div>
            ) : null}
          </div>
        )}
      </Modal>

      <Modal isOpen={showGlowScore} onClose={() => setShowGlowScore(false)} title="Your Glow Score" size="lg">
        <div className="p-6">
          <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
            <div className="text-center">
              <CircularProgress value={72} size="lg" label="Overall" variant="primary" />
              <div className="flex items-center justify-center gap-1 mt-2">
                <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                <span className="text-emerald-500 text-sm font-medium">+5% this month</span>
              </div>
            </div>
            <div className="flex-1 space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Hair Score</span>
                  <span className="text-sm font-bold text-gray-900 dark:text-white">75%</span>
                </div>
                <Progress value={75} variant="success" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Skin Score</span>
                  <span className="text-sm font-bold text-gray-900 dark:text-white">68%</span>
                </div>
                <Progress value={68} variant="warning" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Confidence Score</span>
                  <span className="text-sm font-bold text-gray-900 dark:text-white">70%</span>
                </div>
                <Progress value={70} variant="success" />
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <span className="font-semibold text-gray-900 dark:text-white">AI Recommendations</span>
            </div>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                Focus on skincare hydration for healthier skin
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                Consider a deep conditioning treatment for your hair
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                Your confidence is improving! Keep up the great routine
              </li>
            </ul>
          </div>
        </div>
      </Modal>

      <Modal isOpen={showMatchmaker} onClose={() => setShowMatchmaker(false)} title="AI Salon Matchmaker" size="lg">
        <div className="p-6">
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Tell us about your preferences and we'll find the perfect salon for you.
          </p>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                What service are you looking for?
              </label>
              <div className="flex flex-wrap gap-2">
                {['Haircut', 'Hair Coloring', 'Facial', 'Bridal Makeup', 'Spa', 'Nail Art'].map((service) => (
                  <button
                    key={service}
                    className="px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-rose-100 dark:hover:bg-rose-950/50 transition-colors"
                  >
                    {service}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Budget Range
              </label>
              <div className="flex gap-2">
                {['₹ Budget', '₹₹ Moderate', '₹₹₹ Premium'].map((budget) => (
                  <button
                    key={budget}
                    className="flex-1 px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-rose-100 dark:hover:bg-rose-950/50 transition-colors text-center"
                  >
                    {budget}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Location Preference
              </label>
              <Input placeholder="Enter your area or pincode" />
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
              <input type="checkbox" className="w-5 h-5 rounded accent-rose-500" />
              <label className="text-gray-700 dark:text-gray-300">
                Prefer women-owned salons
              </label>
            </div>

            <Button variant="primary" className="w-full" icon={<Sparkles className="w-4 h-4" />}>
              Find My Perfect Salon
            </Button>
          </div>
        </div>
      </Modal>

      <Footer />
    </div>
  );
}
