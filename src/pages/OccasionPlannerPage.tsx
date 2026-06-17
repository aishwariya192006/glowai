import { motion } from 'framer-motion';
import {
  HeartHandshake,
  PartyPopper,
  Gift,
  GraduationCap,
  Briefcase,
  Sparkles,
  Calendar,
  ArrowRight,
  Check,
  Clock,
  Users,
  BadgeCheck,
} from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Button, GlassCard, Badge, Progress, Input } from '../components/ui';
import { useToast } from '../context/ToastContext';

const occasions = [
  { id: 'wedding', name: 'Wedding', icon: HeartHandshake, color: 'from-rose-500 to-pink-500', emoji: '💒' },
  { id: 'college', name: 'College Function', icon: GraduationCap, color: 'from-emerald-500 to-teal-500', emoji: '🎓' },
  { id: 'festival', name: 'Festival', icon: Gift, color: 'from-amber-500 to-orange-500', emoji: '🪔' },
  { id: 'party', name: 'Party', icon: PartyPopper, color: 'from-purple-500 to-indigo-500', emoji: '🎉' },
  { id: 'interview', name: 'Job Interview', icon: Briefcase, color: 'from-blue-500 to-cyan-500', emoji: '💼' },
];

const occasionPlans: Record<string, { services: string[]; timeline: { time: string; task: string }[]; tips: string[] }> = {
  wedding: {
    services: ['Bridal Makeup', 'Hair Spa', 'Facial', 'Mehandi', 'Nail Art'],
    timeline: [
      { time: '30 days before', task: 'Start bridal skincare routine' },
      { time: '14 days before', task: 'Trial makeup session' },
      { time: '7 days before', task: 'Hair spa treatment' },
      { time: '3 days before', task: 'Facial treatment' },
      { time: 'Day of', task: 'Bridal makeup & styling' },
    ],
    tips: ['Book trials with 2-3 makeup artists', 'Stay hydrated', 'Have a backup hairstyle idea'],
  },
  college: {
    services: ['Haircut', 'Light Makeup', 'Facial', 'Hair Styling'],
    timeline: [
      { time: '3 days before', task: 'Haircut if needed' },
      { time: '1 day before', task: 'Express facial' },
      { time: 'Day of', task: 'Light styling & finishing' },
    ],
    tips: ['Keep it youthful and fresh', 'Don\'t overdo - stay natural', 'Student discounts available!'],
  },
  festival: {
    services: ['Hair Oiling', 'Facial', 'Mehandi', 'Nail Art', 'Spa'],
    timeline: [
      { time: '5 days before', task: 'Deep conditioning hair spa' },
      { time: '3 days before', task: 'Festive facial' },
      { time: '2 days before', task: 'Mehandi session' },
      { time: 'Day of', task: 'Festive styling & dressing' },
    ],
    tips: ['Match looks with traditional attire', 'Use natural products for sensitive skin', 'Book early during festival season'],
  },
  party: {
    services: ['Party Makeup', 'Hair Styling', 'Manicure', 'Express Facial'],
    timeline: [
      { time: 'Day of', task: 'Quick facial cleanup' },
      { time: '3 hours before', task: 'Hair styling session' },
      { time: '1 hour before', task: 'Party makeup' },
    ],
    tips: ['Go bold with makeup', 'Try trendy hairstyles', 'Book same-day appointments early'],
  },
  interview: {
    services: ['Haircut', 'Face Cleanup', 'Grooming'],
    timeline: [
      { time: '3 days before', task: 'Professional haircut' },
      { time: '1 day before', task: 'Face cleanup' },
      { time: 'Morning of', task: 'Style and groom' },
    ],
    tips: ['Keep it professional', 'Avoid experimenting', 'Confidence is key'],
  },
};

export function OccasionPlannerPage() {
  const [step, setStep] = useState(1);
  const [selectedOccasion, setSelectedOccasion] = useState<string | null>(null);
  const [date, setDate] = useState('');
  const [budget, setBudget] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<null | typeof occasionPlans.wedding & { budget: number; salons: string[] }>(null);
  const { showToast } = useToast();

  const handleGenerate = async () => {
    if (!selectedOccasion) return;
    setIsGenerating(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const plan = occasionPlans[selectedOccasion];
    setResult({
      ...plan,
      budget: parseInt(budget) || 5000,
      salons: ['Luxe Glow Studio', 'Radiance Beauty Lounge', 'Bloom Beauty Bar'],
    });
    setIsGenerating(false);
    setStep(3);
    showToast('Occasion plan ready!', 'success');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-rose-200 dark:bg-rose-950/30 rounded-full blur-[150px] opacity-40" />
        <div className="absolute top-40 -left-40 w-80 h-80 bg-pink-200 dark:bg-pink-950/30 rounded-full blur-[120px] opacity-40" />
      </div>

      <section className="relative pt-24 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-rose-100 to-pink-100 dark:from-rose-950/50 dark:to-pink-950/50 mb-4">
              <Sparkles className="w-4 h-4 text-rose-500" />
              <span className="text-sm font-medium text-rose-600 dark:text-rose-300">AI Occasion Planner</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Plan Your Occasion Look
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Get personalized beauty plans for any special occasion
            </p>
          </motion.div>

          {!result ? (
            <>
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <GlassCard className="p-8">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                      Select Your Occasion
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {occasions.map((occasion) => (
                        <motion.button
                          key={occasion.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setSelectedOccasion(occasion.id)}
                          className={`p-6 rounded-2xl text-center border-2 transition-all ${
                            selectedOccasion === occasion.id
                              ? `bg-gradient-to-br ${occasion.color} text-white border-transparent`
                              : 'bg-gray-50 dark:bg-gray-800/50 border-transparent hover:border-gray-200 dark:hover:border-gray-700'
                          }`}
                        >
                          <span className="text-4xl mb-2 block">{occasion.emoji}</span>
                          <span className={`font-semibold ${selectedOccasion === occasion.id ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                            {occasion.name}
                          </span>
                        </motion.button>
                      ))}
                    </div>
                    <div className="mt-6 flex justify-end">
                      <Button
                        variant="primary"
                        onClick={() => setStep(2)}
                        disabled={!selectedOccasion}
                        icon={<ArrowRight className="w-4 h-4" />}
                      >
                        Continue
                      </Button>
                    </div>
                  </GlassCard>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <GlassCard className="p-8">
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Occasion Date
                        </label>
                        <Input
                          type="date"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          min={new Date().toISOString().split('T')[0]}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Beauty Budget (Optional)
                        </label>
                        <div className="grid grid-cols-4 gap-2">
                          {['3000', '5000', '10000', '20000'].map((amt) => (
                            <button
                              key={amt}
                              onClick={() => setBudget(amt)}
                              className={`py-3 rounded-xl font-medium transition-all ${
                                budget === amt
                                  ? 'bg-rose-500 text-white'
                                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                              }`}
                            >
                              ₹{parseInt(amt).toLocaleString()}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between mt-6">
                      <Button variant="ghost" onClick={() => setStep(1)}>Back</Button>
                      <Button
                        variant="primary"
                        onClick={handleGenerate}
                        disabled={!date}
                        loading={isGenerating}
                        icon={<Sparkles className="w-4 h-4" />}
                      >
                        Generate Plan
                      </Button>
                    </div>
                  </GlassCard>
                </motion.div>
              )}
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <GlassCard className="p-8 text-center bg-gradient-to-r from-rose-50 to-pink-50 dark:from-rose-950/30 dark:to-pink-950/30">
                <span className="text-6xl mb-4 block">
                  {occasions.find(o => o.id === selectedOccasion)?.emoji}
                </span>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {occasions.find(o => o.id === selectedOccasion)?.name} Beauty Plan
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  {new Date(date).toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' })}
                </p>
              </GlassCard>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <GlassCard className="p-4 text-center">
                  <Calendar className="w-6 h-6 mx-auto text-rose-500 mb-2" />
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {result.timeline.length}
                  </p>
                  <p className="text-xs text-gray-500">Tasks</p>
                </GlassCard>
                <GlassCard className="p-4 text-center">
                  <Clock className="w-6 h-6 mx-auto text-rose-500 mb-2" />
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {Math.ceil(Math.abs(new Date(date).getTime() - Date.now()) / (1000 * 60 * 60 * 24))}
                  </p>
                  <p className="text-xs text-gray-500">Days to Go</p>
                </GlassCard>
                <GlassCard className="p-4 text-center">
                  <Users className="w-6 h-6 mx-auto text-rose-500 mb-2" />
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {result.salons.length}
                  </p>
                  <p className="text-xs text-gray-500">Salons</p>
                </GlassCard>
              </div>

              <GlassCard className="p-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-rose-500" />
                  Beauty Timeline
                </h3>
                <div className="space-y-3">
                  {result.timeline.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800"
                    >
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center text-white font-bold">
                        {i + 1}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{item.task}</p>
                        <p className="text-sm text-gray-500">{item.time}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </GlassCard>

              <GlassCard className="p-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Recommended Services</h3>
                <div className="flex flex-wrap gap-2">
                  {result.services.map((service, i) => (
                    <Badge key={i} variant="primary" className="text-sm" icon={<BadgeCheck className="w-3 h-3" />}>
                      {service}
                    </Badge>
                  ))}
                </div>
              </GlassCard>

              <GlassCard className="p-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-rose-500" />
                  Pro Tips
                </h3>
                <ul className="space-y-2">
                  {result.tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </GlassCard>

              <div className="flex gap-4">
                <Link to="/discover" className="flex-1">
                  <Button variant="primary" className="w-full">Find Salons</Button>
                </Link>
                <Button variant="outline" onClick={() => { setResult(null); setStep(1); setSelectedOccasion(null); setDate(''); setBudget(''); }}>
                  New Plan
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
