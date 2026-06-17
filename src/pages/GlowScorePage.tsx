import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Droplets,
  Moon,
  Sun,
  Activity,
  Heart,
  Check,
  Target,
} from 'lucide-react';
import { useState } from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Button, GlassCard, Progress, CircularProgress } from '../components/ui';
import { useToast } from '../context/ToastContext';

const questions = [
  {
    id: 'skin_type',
    question: 'What is your skin type?',
    icon: Sun,
    options: [
      { value: 'normal', label: 'Normal', emoji: '😊' },
      { value: 'dry', label: 'Dry', emoji: '🏜️' },
      { value: 'oily', label: 'Oily', emoji: '💧' },
      { value: 'combination', label: 'Combination', emoji: '⚖️' },
      { value: 'sensitive', label: 'Sensitive', emoji: '🌸' },
    ],
  },
  {
    id: 'hair_type',
    question: 'What is your hair type?',
    icon: Activity,
    options: [
      { value: 'straight', label: 'Straight', emoji: '〰️' },
      { value: 'wavy', label: 'Wavy', emoji: '🌊' },
      { value: 'curly', label: 'Curly', emoji: '🌀' },
      { value: 'coily', label: 'Coily', emoji: '💫' },
    ],
  },
  {
    id: 'beauty_goals',
    question: 'What are your primary beauty goals?',
    icon: Target,
    multiSelect: true,
    options: [
      { value: 'glow', label: 'Healthy Glow', emoji: '✨' },
      { value: 'anti-aging', label: 'Anti-Aging', emoji: '⏰' },
      { value: 'clear-skin', label: 'Clear Skin', emoji: '💫' },
      { value: 'hair-growth', label: 'Hair Growth', emoji: '🌿' },
      { value: 'hydration', label: 'Hydration', emoji: '💧' },
      { value: 'confidence', label: 'Confidence Boost', emoji: '💪' },
    ],
  },
  {
    id: 'water_intake',
    question: 'How much water do you drink daily?',
    icon: Droplets,
    options: [
      { value: 'less-2', label: 'Less than 2 glasses', emoji: '🥤' },
      { value: '2-4', label: '2-4 glasses', emoji: '🥛' },
      { value: '4-6', label: '4-6 glasses', emoji: '💧' },
      { value: '8-plus', label: '8+ glasses', emoji: '🏆' },
    ],
  },
  {
    id: 'sleep',
    question: 'How many hours do you sleep on average?',
    icon: Moon,
    options: [
      { value: 'less-5', label: 'Less than 5 hours', emoji: '😫' },
      { value: '5-6', label: '5-6 hours', emoji: '😴' },
      { value: '7-8', label: '7-8 hours', emoji: '😊' },
      { value: '8-plus', label: '8+ hours', emoji: '🌟' },
    ],
  },
  {
    id: 'lifestyle',
    question: 'How would you describe your lifestyle?',
    icon: Heart,
    multiSelect: true,
    options: [
      { value: 'stressful', label: 'Stressful', emoji: '😰' },
      { value: 'active', label: 'Active', emoji: '🏃' },
      { value: 'sedentary', label: 'Sedentary', emoji: '🪑' },
      { value: 'balanced', label: 'Balanced', emoji: '⚖️' },
      { value: 'busy', label: 'Very Busy', emoji: '📅' },
    ],
  },
];

export function GlowScorePage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [isCalculating, setIsCalculating] = useState(false);
  const [results, setResults] = useState<null | {
    overall: number;
    skin: number;
    hair: number;
    confidence: number;
    recommendations: string[];
  }>(null);
  const { showToast } = useToast();

  const handleAnswer = (questionId: string, value: string, multiSelect?: boolean) => {
    if (multiSelect) {
      const current = (answers[questionId] as string[]) || [];
      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      setAnswers((prev) => ({ ...prev, [questionId]: updated }));
    } else {
      setAnswers((prev) => ({ ...prev, [questionId]: value }));
    }
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      calculateScore();
    }
  };

  const calculateScore = async () => {
    setIsCalculating(true);

    await new Promise((resolve) => setTimeout(resolve, 3000));

    const skinScore = calculateSkinScore();
    const hairScore = calculateHairScore();
    const confidenceScore = calculateConfidenceScore();
    const overall = Math.round((skinScore + hairScore + confidenceScore) / 3);

    setResults({
      overall,
      skin: skinScore,
      hair: hairScore,
      confidence: confidenceScore,
      recommendations: generateRecommendations(),
    });
    setIsCalculating(false);
    showToast('Your Glow Score is ready!', 'success');
  };

  const calculateSkinScore = () => {
    const water = answers.water_intake as string;
    const sleep = answers.sleep as string;
    let score = 60;
    if (water === '8-plus') score += 15;
    else if (water === '4-6') score += 10;
    else if (water === '2-4') score += 5;
    if (sleep === '8-plus' || sleep === '7-8') score += 15;
    else if (sleep === '5-6') score += 5;
    if ((answers.beauty_goals as string[])?.includes('clear-skin')) score += 10;
    return Math.min(100, score);
  };

  const calculateHairScore = () => {
    const goals = answers.beauty_goals as string[];
    const lifestyle = answers.lifestyle as string[];
    let score = 70;
    if (goals?.includes('hair-growth')) score += 10;
    if (lifestyle?.includes('balanced')) score += 10;
    if (lifestyle?.includes('active')) score += 5;
    return Math.min(100, score);
  };

  const calculateConfidenceScore = () => {
    const goals = answers.beauty_goals as string[];
    const lifestyle = answers.lifestyle as string[];
    let score = 65;
    if (goals?.includes('confidence')) score += 15;
    if (!lifestyle?.includes('stressful')) score += 10;
    if (goals?.includes('glow')) score += 10;
    return Math.min(100, score);
  };

  const generateRecommendations = () => {
    const recs = [
      'Stay hydrated - aim for 8 glasses of water daily for better skin',
      'Get 7-8 hours of quality sleep for natural glow',
      'Use products suitable for your skin type',
      'Consider a weekly hair spa treatment',
    ];
    if (answers.skin_type === 'oily') recs.push('Use oil-free moisturizers and gentle cleansers');
    if (answers.skin_type === 'dry') recs.push('Incorporate hydrating serums and facial oils');
    if ((answers.beauty_goals as string[])?.includes('anti-aging')) {
      recs.push('Consider retinol treatments for anti-aging');
    }
    return recs.slice(0, 4);
  };

  const isCurrentAnswered = () => {
    const currentQuestion = questions[currentStep];
    const answer = answers[currentQuestion.id];
    if (currentQuestion.multiSelect) {
      return (answer as string[])?.length > 0;
    }
    return !!answer;
  };

  const progress = ((currentStep + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-rose-200 dark:bg-rose-950/30 rounded-full blur-[150px] opacity-40" />
        <div className="absolute top-40 -left-40 w-80 h-80 bg-pink-200 dark:bg-pink-950/30 rounded-full blur-[120px] opacity-40" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-amber-100 dark:bg-amber-950/20 rounded-full blur-[100px] opacity-30" />
      </div>

      <section className="relative pt-24 pb-20 px-4">
        <div className="max-w-3xl mx-auto">
          {!results ? (
            <>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-8"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-rose-100 to-pink-100 dark:from-rose-950/50 dark:to-pink-950/50 mb-4">
                  <Sparkles className="w-4 h-4 text-rose-500" />
                  <span className="text-sm font-medium text-rose-600 dark:text-rose-300">
                    AI-Powered Analysis
                  </span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  Discover Your Glow Score
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Answer a few questions to get personalized beauty insights
                </p>
              </motion.div>

              <div className="mb-8">
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-2">
                  <span>Question {currentStep + 1} of {questions.length}</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} />
              </div>

              <AnimatePresence mode="wait">
                {isCalculating ? (
                  <motion.div
                    key="calculating"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="text-center py-16"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                      className="w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-rose-400 to-pink-500 flex items-center justify-center shadow-2xl shadow-rose-500/30"
                    >
                      <Sparkles className="w-12 h-12 text-white" />
                    </motion.div>
                    <motion.h2
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-2"
                    >
                      Analyzing Your Beauty Profile
                    </motion.h2>
                    <p className="text-gray-500 dark:text-gray-400">
                      Our AI is calculating your personalized scores...
                    </p>
                    <div className="flex items-center justify-center gap-2 mt-4">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          animate={{ scale: [1, 1.3, 1] }}
                          transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
                          className="w-3 h-3 rounded-full bg-rose-500"
                        />
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <GlassCard className="p-8">
                      {(() => {
                        const q = questions[currentStep];
                        const Icon = q.icon;
                        return (
                          <>
                            <div className="flex items-center gap-3 mb-6">
                              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-100 to-pink-100 dark:from-rose-950/50 dark:to-pink-950/50 flex items-center justify-center">
                                <Icon className="w-6 h-6 text-rose-500" />
                              </div>
                              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                {q.question}
                              </h2>
                            </div>

                            <div className={`grid ${q.multiSelect ? 'grid-cols-2 md:grid-cols-3' : 'grid-cols-2'} gap-3`}>
                              {q.options.map((opt) => {
                                const isSelected = q.multiSelect
                                  ? (answers[q.id] as string[])?.includes(opt.value)
                                  : answers[q.id] === opt.value;
                                return (
                                  <motion.button
                                    key={opt.value}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => handleAnswer(q.id, opt.value, q.multiSelect)}
                                    className={`p-4 rounded-2xl text-center transition-all border-2 ${
                                      isSelected
                                        ? 'bg-rose-50 dark:bg-rose-950/30 border-rose-500'
                                        : 'bg-gray-50 dark:bg-gray-800/50 border-transparent hover:border-gray-200 dark:hover:border-gray-700'
                                    }`}
                                  >
                                    <span className="text-3xl mb-2 block">{opt.emoji}</span>
                                    <span
                                      className={`text-sm font-medium ${
                                        isSelected
                                          ? 'text-rose-600 dark:text-rose-300'
                                          : 'text-gray-700 dark:text-gray-300'
                                      }`}
                                    >
                                      {opt.label}
                                    </span>
                                    {isSelected && (
                                      <div className="mt-2 flex justify-center">
                                        <div className="w-5 h-5 rounded-full bg-rose-500 flex items-center justify-center">
                                          <Check className="w-3 h-3 text-white" />
                                        </div>
                                      </div>
                                    )}
                                  </motion.button>
                                );
                              })}
                            </div>
                          </>
                        );
                      })()}

                      <div className="flex items-center justify-between mt-8">
                        <Button
                          variant="ghost"
                          onClick={() => setCurrentStep((prev) => prev - 1)}
                          disabled={currentStep === 0}
                          icon={<ArrowLeft className="w-4 h-4" />}
                        >
                          Back
                        </Button>
                        <Button
                          variant="primary"
                          onClick={handleNext}
                          disabled={!isCurrentAnswered()}
                          icon={
                            currentStep < questions.length - 1 ? (
                              <ArrowRight className="w-4 h-4" />
                            ) : (
                              <Sparkles className="w-4 h-4" />
                            )
                          }
                        >
                          {currentStep < questions.length - 1 ? 'Next' : 'Calculate Score'}
                        </Button>
                      </div>
                    </GlassCard>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <GlassCard className="p-8 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 0.2 }}
                  className="w-32 h-32 mx-auto relative"
                >
                  <CircularProgress value={results.overall} size="lg" variant="primary" />
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center shadow-lg"
                  >
                    <Sparkles className="w-6 h-6 text-white" />
                  </motion.div>
                </motion.div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-6 mb-2">
                  Your Glow Score
                </h2>
                <p className="text-gray-500 dark:text-gray-400">
                  Based on your beauty profile and lifestyle
                </p>
              </GlassCard>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { label: 'Skin Score', value: results.skin, color: 'from-emerald-400 to-teal-500' },
                  { label: 'Hair Score', value: results.hair, color: 'from-amber-400 to-orange-500' },
                  { label: 'Confidence', value: results.confidence, color: 'from-rose-400 to-pink-500' },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * (i + 1) }}
                  >
                    <GlassCard className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                          {item.label}
                        </span>
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">
                          {item.value}
                        </span>
                      </div>
                      <div className="h-3 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${item.value}%` }}
                          transition={{ duration: 1, delay: 0.5 }}
                          className={`h-full bg-gradient-to-r ${item.color} rounded-full`}
                        />
                      </div>
                    </GlassCard>
                  </motion.div>
                ))}
              </div>

              <GlassCard className="p-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-rose-500" />
                  AI Recommendations
                </h3>
                <ul className="space-y-3">
                  {results.recommendations.map((rec, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400"
                    >
                      <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-emerald-500" />
                      </div>
                      {rec}
                    </motion.li>
                  ))}
                </ul>
              </GlassCard>

              <div className="text-center">
                <Button
                  variant="primary"
                  onClick={() => {
                    setResults(null);
                    setCurrentStep(0);
                    setAnswers({});
                  }}
                >
                  Retake Quiz
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
