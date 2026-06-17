import { motion } from 'framer-motion';
import {
  Briefcase,
  Calendar,
  Users,
  Sparkles,
  ArrowRight,
  Check,
  ChevronRight,
} from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Button, GlassCard, Badge, Input } from '../components/ui';
import { useToast } from '../context/ToastContext';

const jobRoles = [
  { role: 'Software Engineer', emoji: '💻', style: 'Clean, professional look' },
  { role: 'Marketing Manager', emoji: '📊', style: 'Creative yet polished' },
  { role: 'Finance Analyst', emoji: '📈', style: 'Conservative and neat' },
  { role: 'Designer', emoji: '🎨', style: 'Expressive and modern' },
  { role: 'Teacher', emoji: '📚', style: 'Approachable and well-groomed' },
  { role: 'Healthcare', emoji: '🏥', style: 'Clean and professional' },
];

export function InterviewPlannerPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    jobRole: '',
    interviewDate: '',
    gender: '',
    industry: '',
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<null | {
    grooming: { category: string; task: string; salon: string; price: number }[];
    hairstyles: { name: string; description: string; image: string }[];
    dress: { type: string; items: string[]; tips: string };
    timeline: string[];
  }>(null);
  const { showToast } = useToast();

  const handleGenerate = async () => {
    setIsGenerating(true);
    await new Promise((resolve) => setTimeout(resolve, 2500));

    const grooming = [
      { category: 'Hair', task: 'Professional haircut & styling', salon: 'Luxe Glow Studio', price: 1200 },
      { category: 'Face', task: 'Express facial / cleanup', salon: 'Radiance Beauty Lounge', price: 899 },
      { category: 'Grooming', task: 'Eyebrow shaping & grooming', salon: 'Bloom Beauty Bar', price: 400 },
    ];

    const hairstyles = [
      { name: 'Sleek Professional', description: 'Clean, polished look for corporate interviews', image: 'https://images.pexels.com/photos/1522334/pexels-photo-1522334.jpeg' },
      { name: 'Natural Confidence', description: 'Professional yet authentic styling', image: 'https://images.pexels.com/photos/3997992/pexels-photo-3997992.jpeg' },
    ];

    const dress = {
      type: 'Professional Business Wear',
      items: ['Tailored blazer', 'Pressed formal shirt', 'Matching pants/skirt', 'Polished shoes'],
      tips: 'Choose solid, subtle colors. Avoid distracting patterns. Ensure comfortable, well-fitted attire.',
    };

    const timeline = [
      '3 days before: Get haircut',
      '1 day before: Express facial & grooming',
      'Morning of: Clean, moisturize, style hair',
      '1 hour before: Final checks, confident posture',
    ];

    setResult({ grooming, hairstyles, dress, timeline });
    setIsGenerating(false);
    setStep(4);
    showToast('Interview grooming plan ready!', 'success');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-200 dark:bg-blue-950/30 rounded-full blur-[150px] opacity-40" />
        <div className="absolute top-40 -left-40 w-80 h-80 bg-indigo-200 dark:bg-indigo-950/30 rounded-full blur-[120px] opacity-40" />
      </div>

      <section className="relative pt-24 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-950/50 dark:to-indigo-950/50 mb-4">
              <Briefcase className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium text-blue-600 dark:text-blue-300">Interview Grooming</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              AI Interview Planner
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Look your best and land that job with personalized grooming recommendations
            </p>
          </motion.div>

          {!result ? (
            <>
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <GlassCard className="p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-950/50 dark:to-indigo-950/50 flex items-center justify-center">
                        <Briefcase className="w-6 h-6 text-blue-500" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Job Role</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Select your interview role</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {jobRoles.map((job) => (
                        <motion.button
                          key={job.role}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setFormData((p) => ({ ...p, jobRole: job.role }))}
                          className={`p-4 rounded-2xl text-center border-2 transition-all ${
                            formData.jobRole === job.role
                              ? 'bg-blue-50 dark:bg-blue-950/30 border-blue-500'
                              : 'bg-gray-50 dark:bg-gray-800/50 border-transparent hover:border-gray-200'
                          }`}
                        >
                          <span className="text-3xl mb-2 block">{job.emoji}</span>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">{job.role}</span>
                        </motion.button>
                      ))}
                    </div>

                    <div className="mt-6 flex justify-end">
                      <Button
                        variant="primary"
                        onClick={() => setStep(2)}
                        disabled={!formData.jobRole}
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
                        <Calendar className="w-6 h-6 text-emerald-500" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Interview Date</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Pick your interview date</p>
                      </div>
                    </div>

                    <Input
                      type="date"
                      value={formData.interviewDate}
                      onChange={(e) => setFormData((p) => ({ ...p, interviewDate: e.target.value }))}
                      min={new Date().toISOString().split('T')[0]}
                    />

                    <div className="mt-6">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                        Gender
                      </label>
                      <div className="flex gap-3">
                        {['Male', 'Female', 'Prefer not to say'].map((gender) => (
                          <button
                            key={gender}
                            onClick={() => setFormData((p) => ({ ...p, gender }))}
                            className={`px-6 py-3 rounded-xl font-medium transition-all ${
                              formData.gender === gender
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                            }`}
                          >
                            {gender}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-between mt-6">
                      <Button variant="ghost" onClick={() => setStep(1)}>Back</Button>
                      <Button
                        variant="primary"
                        onClick={handleGenerate}
                        disabled={!formData.interviewDate || !formData.gender}
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
              <GlassCard className="p-8 text-center bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring' }}
                  className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center shadow-xl shadow-blue-500/30 mb-4"
                >
                  <Briefcase className="w-8 h-8 text-white" />
                </motion.div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Interview Grooming Plan
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  For your {formData.jobRole} interview on {new Date(formData.interviewDate).toLocaleDateString()}
                </p>
              </GlassCard>

              <GlassCard className="p-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Grooming Services</h3>
                <div className="space-y-3">
                  {result.grooming.map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                      <div>
                        <Badge variant="info" className="mb-1">{item.category}</Badge>
                        <p className="font-medium text-gray-900 dark:text-white">{item.task}</p>
                        <p className="text-sm text-gray-500">{item.salon}</p>
                      </div>
                      <p className="font-bold text-blue-500">₹{item.price}</p>
                    </div>
                  ))}
                </div>
              </GlassCard>

              <GlassCard className="p-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Recommended Hairstyles</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {result.hairstyles.map((style, i) => (
                    <div key={i} className="rounded-2xl overflow-hidden bg-gray-50 dark:bg-gray-800/50">
                      <img src={style.image} alt={style.name} className="w-full h-40 object-cover" />
                      <div className="p-4">
                        <p className="font-medium text-gray-900 dark:text-white">{style.name}</p>
                        <p className="text-sm text-gray-500">{style.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>

              <GlassCard className="p-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                  {result.dress.type} Recommendations
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
                  {result.dress.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 p-3 rounded-xl bg-gray-50 dark:bg-gray-800">
                      <Check className="w-4 h-4 text-emerald-500" />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 bg-amber-50 dark:bg-amber-950/30 p-3 rounded-xl">
                  💡 {result.dress.tips}
                </p>
              </GlassCard>

              <GlassCard className="p-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Interview Day Timeline</h3>
                <div className="space-y-2">
                  {result.timeline.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm">
                      <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-950/50 flex items-center justify-center text-blue-500 font-bold text-xs">
                        {i + 1}
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">{item}</span>
                    </div>
                  ))}
                </div>
              </GlassCard>

              <div className="flex gap-4">
                <Link to="/discover" className="flex-1">
                  <Button variant="primary" className="w-full">Find Salons</Button>
                </Link>
                <Button variant="outline" onClick={() => { setResult(null); setStep(1); setFormData({ jobRole: '', interviewDate: '', gender: '', industry: '' }); }}>
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
