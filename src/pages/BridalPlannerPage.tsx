import { motion } from 'framer-motion';
import {
  Heart,
  Calendar,
  DollarSign,
  Sparkles,
  ArrowRight,
  Check,
  Clock,
  Users,
  Gift,
} from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Button, GlassCard, Badge, Progress, Input } from '../components/ui';
import { useToast } from '../context/ToastContext';

const bridalPackages = [
  { name: 'Essential', budget: 25000, services: 5, days: 7 },
  { name: 'Premium', budget: 50000, services: 12, days: 15 },
  { name: 'Luxury', budget: 100000, services: 20, days: 30 },
];

const timelineTemplate = [
  { day: -30, task: 'Start skincare routine', category: 'skincare' },
  { day: -21, task: 'Trial makeup session', category: 'makeup' },
  { day: -14, task: 'Hair spa & deep conditioning', category: 'hair' },
  { day: -7, task: 'Final facial treatment', category: 'skincare' },
  { day: -5, task: 'Manicure & pedicure', category: 'grooming' },
  { day: -3, task: 'Hair color touch-up', category: 'hair' },
  { day: -1, task: 'Body spa & massage', category: 'wellness' },
  { day: 0, task: 'Wedding day makeup & styling', category: 'makeup' },
];

export function BridalPlannerPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    weddingDate: '',
    budget: '',
    skinType: '',
    hairType: '',
    brideName: '',
    email: '',
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [plan, setPlan] = useState<null | {
    timeline: { day: number; task: string; category: string; salon: string; price: number }[];
    totalBudget: number;
    breakdown: { category: string; amount: number }[];
    tips: string[];
  }>(null);
  const { showToast } = useToast();

  const handleGenerate = async () => {
    setIsGenerating(true);
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const weddingDate = new Date(formData.weddingDate);
    const daysUntilWedding = Math.max(30, Math.ceil((weddingDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)));

    const timeline = timelineTemplate.map((item) => ({
      ...item,
      salon: ['Luxe Glow Studio', 'Radiance Beauty Lounge', 'Divine Looks Studio'][Math.floor(Math.random() * 3)],
      price: Math.floor(Math.random() * 5000) + 2000,
    }));

    const breakdown = [
      { category: 'Bridal Makeup', amount: 35000 },
      { category: 'Hair & Styling', amount: 15000 },
      { category: 'Skincare', amount: 12000 },
      { category: 'Grooming', amount: 8000 },
      { category: 'Wellness', amount: 5000 },
    ];

    const budget = parseInt(formData.budget) || 50000;
    const totalBudget = breakdown.reduce((sum, item) => sum + item.amount, 0);

    setPlan({
      timeline,
      totalBudget: Math.min(totalBudget, budget),
      breakdown,
      tips: [
        'Start hydration at least 30 days before the wedding',
        'Book trial sessions with multiple makeup artists',
        'Create a mood board for your bridal look',
        'Keep emergency touch-up kit ready for the day',
      ],
    });
    setIsGenerating(false);
    setStep(4);
    showToast('Your bridal beauty plan is ready!', 'success');
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
              <Heart className="w-4 h-4 text-rose-500" />
              <span className="text-sm font-medium text-rose-600 dark:text-rose-300">Bridal Beauty</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              AI Bridal Planner
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Create your perfect bridal beauty timeline with AI-powered planning
            </p>
          </motion.div>

          {!plan ? (
            <>
              <div className="flex items-center justify-center gap-2 mb-8">
                {[1, 2, 3].map((s) => (
                  <div key={s} className="flex items-center gap-2">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                        step >= s
                          ? 'bg-rose-500 text-white'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                      }`}
                    >
                      {step > s ? <Check className="w-4 h-4" /> : s}
                    </div>
                    {s < 3 && <div className={`w-12 h-1 rounded ${step > s ? 'bg-rose-500' : 'bg-gray-200 dark:bg-gray-700'}`} />}
                  </div>
                ))}
              </div>

              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <GlassCard className="p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-100 to-pink-100 dark:from-rose-950/50 dark:to-pink-950/50 flex items-center justify-center">
                        <Heart className="w-6 h-6 text-rose-500" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Wedding Details</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Let's start with your special day</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Input
                        label="Bride's Name"
                        value={formData.brideName}
                        onChange={(e) => setFormData((p) => ({ ...p, brideName: e.target.value }))}
                        placeholder="Enter your name"
                      />
                      <Input
                        label="Wedding Date"
                        type="date"
                        value={formData.weddingDate}
                        onChange={(e) => setFormData((p) => ({ ...p, weddingDate: e.target.value }))}
                        min={new Date().toISOString().split('T')[0]}
                      />
                      <Input
                        label="Email for Plan"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                        placeholder="your@email.com"
                      />
                    </div>

                    <div className="mt-6 flex justify-end">
                      <Button
                        variant="primary"
                        onClick={() => setStep(2)}
                        disabled={!formData.weddingDate || !formData.brideName}
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
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-950/50 dark:to-teal-950/50 flex items-center justify-center">
                        <DollarSign className="w-6 h-6 text-emerald-500" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Beauty Budget</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Select your bridal beauty budget</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {bridalPackages.map((pkg) => (
                        <motion.button
                          key={pkg.name}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setFormData((p) => ({ ...p, budget: pkg.budget.toString() }))}
                          className={`p-6 rounded-2xl text-left border-2 transition-all ${
                            formData.budget === pkg.budget.toString()
                              ? 'bg-rose-50 dark:bg-rose-950/30 border-rose-500'
                              : 'bg-gray-50 dark:bg-gray-800/50 border-transparent hover:border-gray-200'
                          }`}
                        >
                          <h3 className="font-bold text-gray-900 dark:text-white mb-2">{pkg.name}</h3>
                          <p className="text-2xl font-bold text-rose-500 mb-2">
                            ₹{(pkg.budget / 1000).toFixed(0)}K
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {pkg.services} services | {pkg.days} days prep
                          </p>
                        </motion.button>
                      ))}
                    </div>

                    <div className="flex justify-between mt-6">
                      <Button variant="ghost" onClick={() => setStep(1)}>Back</Button>
                      <Button
                        variant="primary"
                        onClick={() => setStep(3)}
                        disabled={!formData.budget}
                        icon={<ArrowRight className="w-4 h-4" />}
                      >
                        Continue
                      </Button>
                    </div>
                  </GlassCard>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <GlassCard className="p-8 mb-6">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Your Profile</h2>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Skin Type</label>
                        <select
                          value={formData.skinType}
                          onChange={(e) => setFormData((p) => ({ ...p, skinType: e.target.value }))}
                          className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 border-0"
                        >
                          <option value="">Select</option>
                          <option value="normal">Normal</option>
                          <option value="dry">Dry</option>
                          <option value="oily">Oily</option>
                          <option value="combination">Combination</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Hair Type</label>
                        <select
                          value={formData.hairType}
                          onChange={(e) => setFormData((p) => ({ ...p, hairType: e.target.value }))}
                          className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 border-0"
                        >
                          <option value="">Select</option>
                          <option value="straight">Straight</option>
                          <option value="wavy">Wavy</option>
                          <option value="curly">Curly</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex justify-between mt-6">
                      <Button variant="ghost" onClick={() => setStep(2)}>Back</Button>
                      <Button
                        variant="primary"
                        onClick={handleGenerate}
                        disabled={!formData.skinType || !formData.hairType}
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
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring' }}
                  className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center shadow-xl shadow-rose-500/30 mb-4"
                >
                  <Heart className="w-8 h-8 text-white" />
                </motion.div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Bridal Beauty Plan Ready
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  For {formData.brideName}'s wedding on{' '}
                  {new Date(formData.weddingDate).toLocaleDateString('en-IN', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </p>
              </GlassCard>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { icon: Calendar, label: 'Days to Prep', value: `${Math.ceil((new Date(formData.weddingDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))}` },
                  { icon: DollarSign, label: 'Total Budget', value: `₹${(plan.totalBudget / 1000).toFixed(0)}K` },
                  { icon: Gift, label: 'Treatments', value: `${plan.timeline.length} sessions` },
                ].map((stat, i) => (
                  <GlassCard key={i} className="p-4 text-center">
                    <stat.icon className="w-6 h-6 mx-auto text-rose-500 mb-2" />
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</p>
                  </GlassCard>
                ))}
              </div>

              <GlassCard className="p-6 mb-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-rose-500" />
                  30-Day Beauty Timeline
                </h3>
                <div className="space-y-3">
                  {plan.timeline.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      <div className="w-12 text-center">
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {item.day === 0 ? 'Wedding' : item.day < 0 ? `D${item.day}` : `+${item.day}`}
                        </p>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 dark:text-white">{item.task}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{item.salon}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-rose-500">₹{item.price.toLocaleString()}</p>
                        <Badge variant="success" className="text-xs">{item.category}</Badge>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </GlassCard>

              <GlassCard className="p-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Budget Breakdown</h3>
                <div className="space-y-4">
                  {plan.breakdown.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">{item.category}</span>
                        <span className="text-sm font-semibold">₹{item.amount.toLocaleString()}</span>
                      </div>
                      <Progress value={(item.amount / plan.totalBudget) * 100} variant="primary" />
                    </motion.div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between">
                  <span className="font-semibold text-gray-900 dark:text-white">Total</span>
                  <span className="font-bold text-rose-500">₹{plan.totalBudget.toLocaleString()}</span>
                </div>
              </GlassCard>

              <GlassCard className="p-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-rose-500" />
                  Pro Tips
                </h3>
                <ul className="space-y-2">
                  {plan.tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </GlassCard>

              <div className="flex gap-4">
                <Link to="/discover" className="flex-1">
                  <Button variant="primary" className="w-full">Find Bridal Salons</Button>
                </Link>
                <Button variant="outline" onClick={() => { setPlan(null); setStep(1); setFormData({ weddingDate: '', budget: '', skinType: '', hairType: '', brideName: '', email: '' }); }}>
                  Create New Plan
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
