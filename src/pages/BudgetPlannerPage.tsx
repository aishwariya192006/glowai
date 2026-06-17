import { motion } from 'framer-motion';
import {
  DollarSign,
  Calendar,
  Users,
  Sparkles,
  ArrowRight,
  PieChart,
  TrendingUp,
  PiggyBank,
  Wallet,
  Gift,
} from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Button, GlassCard, Badge, Progress, Input } from '../components/ui';
import { useToast } from '../context/ToastContext';

const budgetRanges = [
  { id: '500', amount: 500, icon: '💸' },
  { id: '1000', amount: 1000, icon: '💵' },
  { id: '2000', amount: 2000, icon: '💎' },
  { id: '5000', amount: 5000, icon: '👑' },
  { id: '10000', amount: 10000, icon: '💎✨' },
];

const occasions = [
  { id: 'regular', name: 'Regular Service', image: '✂️' },
  { id: 'party', name: 'Party', image: '🎉' },
  { id: 'wedding', name: 'Wedding', image: '💒' },
  { id: 'festival', name: 'Festival', image: '🪔' },
  { id: 'interview', name: 'Interview', image: '💼' },
];

const genderOptions = [
  { id: 'male', label: 'Male', icon: '👨' },
  { id: 'female', label: 'Female', icon: '👩' },
  { id: 'other', label: 'Other', icon: '🧑' },
];

export function BudgetPlannerPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    budget: '',
    occasion: '',
    gender: '',
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<null | {
    services: { name: string; price: number; salon: string; priority: string }[];
    salons: { name: string; rating: number; match: number }[];
    savings: number;
    allocation: { category: string; percentage: number; amount: number }[];
    tips: string[];
    totalSpent: number;
    remainingBudget: number;
  }>(null);
  const { showToast } = useToast();

  const handleGenerate = async () => {
    setIsGenerating(true);
    await new Promise((resolve) => setTimeout(resolve, 2500));

    const budget = parseInt(formData.budget);
    const services = [
      { name: 'Haircut & Styling', price: 800, salon: 'Luxe Glow Studio', priority: 'high' },
      { name: 'Express Facial', price: 600, salon: 'Radiance Beauty Lounge', priority: 'medium' },
      { name: 'Hair Spa', price: 1200, salon: 'Bloom Beauty Bar', priority: 'medium' },
    ];

    const allocation = [
      { category: 'Hair Care', percentage: 45, amount: Math.round(budget * 0.45) },
      { category: 'Skin Care', percentage: 30, amount: Math.round(budget * 0.30) },
      { category: 'Grooming', percentage: 15, amount: Math.round(budget * 0.15) },
      { category: 'Emergency Buffer', percentage: 10, amount: Math.round(budget * 0.10) },
    ];

    const totalSpent = services.reduce((sum, s) => sum + s.price, 0);

    setResult({
      services,
      salons: [
        { name: 'Luxe Glow Studio', rating: 4.9, match: 95 },
        { name: 'Radiance Beauty Lounge', rating: 4.8, match: 88 },
        { name: 'Style Sanctuary', rating: 4.7, match: 82 },
      ],
      savings: Math.round(budget * 0.25),
      allocation,
      tips: [
        'Book weekday appointments for better rates',
        'Combo packages can save up to 20%',
        'Off-peak hours often have special discounts',
      ],
      totalSpent,
      remainingBudget: budget - totalSpent,
    });
    setIsGenerating(false);
    setStep(4);
    showToast('Budget plan generated!', 'success');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pb-24 md:pb-0">
      <Header />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-200 dark:bg-emerald-950/30 rounded-full blur-[150px] opacity-30" />
        <div className="absolute top-40 -left-40 w-80 h-80 bg-teal-200 dark:bg-teal-950/30 rounded-full blur-[120px] opacity-30" />
      </div>

      <section className="relative pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-950/50 dark:to-teal-950/50 mb-4">
              <PiggyBank className="w-4 h-4 text-emerald-500" />
              <span className="text-sm font-medium text-emerald-600 dark:text-emerald-300">Smart Budgeting</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Beauty Budget Planner
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Plan your beauty spending with AI-powered recommendations
            </p>
          </motion.div>

          {!result ? (
            <>
              <div className="flex items-center justify-center gap-2 mb-8">
                {[1, 2, 3].map((s) => (
                  <div key={s} className="flex items-center gap-2">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                        step >= s
                          ? 'bg-emerald-500 text-white'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                      }`}
                    >
                      {step > s ? '✓' : s}
                    </div>
                    {s < 3 && (
                      <div className={`w-12 h-1 rounded ${step > s ? 'bg-emerald-500' : 'bg-gray-200 dark:bg-gray-700'}`} />
                    )}
                  </div>
                ))}
              </div>

              {step === 1 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                  <GlassCard className="p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-950/50 dark:to-teal-950/50 flex items-center justify-center">
                        <DollarSign className="w-6 h-6 text-emerald-500" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Set Your Budget</h2>
                        <p className="text-sm text-gray-500">How much do you want to spend?</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-5 gap-2 mb-6">
                      {budgetRanges.map((range) => (
                        <motion.button
                          key={range.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setFormData((p) => ({ ...p, budget: range.amount.toString() }))}
                          className={`p-4 rounded-2xl text-center border-2 transition-all ${
                            formData.budget === range.amount.toString()
                              ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-500'
                              : 'bg-gray-50 dark:bg-gray-800/50 border-transparent hover:border-gray-200'
                          }`}
                        >
                          <span className="text-xl mb-1 block">{range.icon}</span>
                          <span className="text-xs font-medium text-gray-700 dark:text-gray-300">₹{range.amount}</span>
                        </motion.button>
                      ))}
                    </div>

                    <Input
                      label="Or enter custom amount"
                      type="number"
                      value={formData.budget}
                      onChange={(e) => setFormData((p) => ({ ...p, budget: e.target.value }))}
                      placeholder="Enter your budget"
                      icon={<DollarSign className="w-5 h-5" />}
                    />

                    <div className="flex justify-end mt-6">
                      <Button
                        variant="primary"
                        onClick={() => setStep(2)}
                        disabled={!formData.budget}
                        icon={<ArrowRight className="w-4 h-4" />}
                      >
                        Continue
                      </Button>
                    </div>
                  </GlassCard>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                  <GlassCard className="p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-950/50 dark:to-pink-950/50 flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-purple-500" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">What's the Occasion?</h2>
                        <p className="text-sm text-gray-500">Select your beauty goal</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-5 gap-3">
                      {occasions.map((occ) => (
                        <motion.button
                          key={occ.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setFormData((p) => ({ ...p, occasion: occ.id }))}
                          className={`p-6 rounded-2xl text-center border-2 transition-all ${
                            formData.occasion === occ.id
                              ? 'bg-purple-50 dark:bg-purple-950/30 border-purple-500'
                              : 'bg-gray-50 dark:bg-gray-800/50 border-transparent hover:border-gray-200'
                          }`}
                        >
                          <span className="text-3xl mb-2 block">{occ.image}</span>
                          <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{occ.name}</span>
                        </motion.button>
                      ))}
                    </div>

                    <div className="flex justify-between mt-6">
                      <Button variant="ghost" onClick={() => setStep(1)}>Back</Button>
                      <Button
                        variant="primary"
                        onClick={() => setStep(3)}
                        disabled={!formData.occasion}
                        icon={<ArrowRight className="w-4 h-4" />}
                      >
                        Continue
                      </Button>
                    </div>
                  </GlassCard>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                  <GlassCard className="p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-950/50 dark:to-cyan-950/50 flex items-center justify-center">
                        <Users className="w-6 h-6 text-blue-500" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Your Profile</h2>
                        <p className="text-sm text-gray-500">Help us personalize recommendations</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      {genderOptions.map((gender) => (
                        <motion.button
                          key={gender.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setFormData((p) => ({ ...p, gender: gender.id }))}
                          className={`p-6 rounded-2xl text-center border-2 transition-all ${
                            formData.gender === gender.id
                              ? 'bg-blue-50 dark:bg-blue-950/30 border-blue-500'
                              : 'bg-gray-50 dark:bg-gray-800/50 border-transparent hover:border-gray-200'
                          }`}
                        >
                          <span className="text-3xl mb-2 block">{gender.icon}</span>
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{gender.label}</span>
                        </motion.button>
                      ))}
                    </div>

                    <div className="flex justify-between mt-6">
                      <Button variant="ghost" onClick={() => setStep(2)}>Back</Button>
                      <Button
                        variant="primary"
                        onClick={handleGenerate}
                        disabled={!formData.gender}
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
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <GlassCard className="p-6 text-center bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-xl mb-4">
                  <Wallet className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Budget Plan Ready</h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Budget: ₹{formData.budget} | {occasions.find(o => o.id === formData.occasion)?.name}
                </p>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="p-4 rounded-xl bg-white/50 dark:bg-gray-800/50">
                    <p className="text-xs text-gray-500">Total Spent</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">₹{result.totalSpent}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/50 dark:bg-gray-800/50">
                    <p className="text-xs text-gray-500">Potential Savings</p>
                    <p className="text-2xl font-bold text-emerald-500">₹{result.savings}</p>
                  </div>
                </div>
              </GlassCard>

              <GlassCard className="p-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-emerald-500" />
                  Budget Allocation
                </h3>
                <div className="space-y-4">
                  {result.allocation.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.category}</span>
                        <span className="text-sm text-gray-500">₹{item.amount} ({item.percentage}%)</span>
                      </div>
                      <Progress value={item.percentage} variant="primary" />
                    </motion.div>
                  ))}
                </div>
              </GlassCard>

              <GlassCard className="p-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Recommended Services</h3>
                <div className="space-y-3">
                  {result.services.map((service, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{service.name}</p>
                        <p className="text-sm text-gray-500">{service.salon}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-emerald-500">₹{service.price}</p>
                        <Badge variant={service.priority === 'high' ? 'success' : 'info'} className="text-xs">
                          {service.priority}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>

              <GlassCard className="p-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Gift className="w-5 h-5 text-amber-500" />
                  Money-Saving Tips
                </h3>
                <ul className="space-y-2">
                  {result.tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <TrendingUp className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </GlassCard>

              <div className="flex gap-4">
                <Link to="/discover" className="flex-1">
                  <Button variant="primary" className="w-full">Find Services</Button>
                </Link>
                <Button
                  variant="outline"
                  onClick={() => {
                    setResult(null);
                    setStep(1);
                    setFormData({ budget: '', occasion: '', gender: '' });
                  }}
                >
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
