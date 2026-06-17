import { motion } from 'framer-motion';
import {
  TrendingUp,
  Calendar,
  Sparkles,
  ArrowUp,
  ArrowDown,
  Activity,
  Target,
  Award,
  LineChart,
} from 'lucide-react';
import { useState } from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Button, GlassCard, Badge, Progress, CircularProgress } from '../components/ui';

const journeyData = {
  overall: { current: 72, previous: 67, trend: 'up' },
  scores: [
    { name: 'Hair Score', current: 75, previous: 70, trend: 'up', color: 'from-amber-400 to-orange-500' },
    { name: 'Skin Score', current: 68, previous: 65, trend: 'up', color: 'from-emerald-400 to-teal-500' },
    { name: 'Confidence', current: 70, previous: 68, trend: 'up', color: 'from-rose-400 to-pink-500' },
  ],
  weeklyData: [
    { day: 'Mon', glow: 70, hair: 73, skin: 66 },
    { day: 'Tue', glow: 71, hair: 74, skin: 67 },
    { day: 'Wed', glow: 70, hair: 73, skin: 68 },
    { day: 'Thu', glow: 72, hair: 75, skin: 68 },
    { day: 'Fri', glow: 73, hair: 76, skin: 69 },
    { day: 'Sat', glow: 72, hair: 75, skin: 68 },
    { day: 'Sun', glow: 72, hair: 75, skin: 68 },
  ],
  monthlyMilestones: [
    { month: 'Jan', glow: 55 },
    { month: 'Feb', glow: 58 },
    { month: 'Mar', glow: 62 },
    { month: 'Apr', glow: 65 },
    { month: 'May', glow: 70 },
    { month: 'Jun', glow: 72 },
  ],
  achievements: [
    { name: 'First Booking', earned: true, date: 'Jan 2026' },
    { name: '10 Sessions Complete', earned: true, date: 'Mar 2026' },
    { name: 'Glow Score 70+', earned: true, date: 'May 2026' },
    { name: 'Premium Member', earned: false, date: null },
  ],
  recentActivity: [
    { type: 'treatment', name: 'Keratin Treatment', salon: 'Luxe Glow Studio', date: '2 days ago', scoreChange: +2 },
    { type: 'treatment', name: 'Express Facial', salon: 'Radiance Beauty Lounge', date: '5 days ago', scoreChange: +1 },
    { type: 'treatment', name: 'Hair Spa', salon: 'Bloom Beauty Bar', date: '1 week ago', scoreChange: +2 },
  ],
};

export function BeautyJourneyPage() {
  const [timeframe, setTimeframe] = useState<'daily' | 'weekly' | 'monthly'>('weekly');

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pb-24 md:pb-0">
      <Header />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-rose-200 dark:bg-rose-950/30 rounded-full blur-[150px] opacity-40" />
        <div className="absolute top-40 -left-40 w-80 h-80 bg-amber-200 dark:bg-amber-950/20 rounded-full blur-[120px] opacity-30" />
      </div>

      <section className="relative pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-950/50 dark:to-orange-950/50 mb-4">
              <Activity className="w-4 h-4 text-amber-500" />
              <span className="text-sm font-medium text-amber-600 dark:text-amber-300">Your Progress</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Beauty Journey Tracker
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Track your progress and watch your glow grow over time
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <GlassCard className="p-8 text-center lg:col-span-1">
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring' }}
              >
                <CircularProgress
                  value={journeyData.overall.current}
                  size="lg"
                  variant="primary"
                />
                <div className="mt-4">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-sm text-gray-500">Previous: {journeyData.overall.previous}</span>
                    <Badge variant="success" className="text-xs">
                      +{journeyData.overall.current - journeyData.overall.previous}
                    </Badge>
                  </div>
                </div>
              </motion.div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-4">
                Overall Glow Score
              </h2>
            </GlassCard>

            <GlassCard className="p-6 lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-semibold text-gray-900 dark:text-white">Score Breakdown</h2>
                <div className="flex gap-1 rounded-xl bg-gray-100 dark:bg-gray-800 p-1">
                  {['daily', 'weekly', 'monthly'].map((tf) => (
                    <button
                      key={tf}
                      onClick={() => setTimeframe(tf as typeof timeframe)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        timeframe === tf
                          ? 'bg-white dark:bg-gray-700 shadow-sm'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {tf.charAt(0).toUpperCase() + tf.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                {journeyData.scores.map((score, i) => (
                  <motion.div
                    key={score.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900 dark:text-white">{score.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-bold">{score.current}</span>
                        <Badge variant={score.trend === 'up' ? 'success' : 'error'} className="text-xs">
                          {score.trend === 'up' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                          {score.current - score.previous}
                        </Badge>
                      </div>
                    </div>
                    <div className="relative h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${score.current}%` }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        className={`h-full bg-gradient-to-r ${score.color} rounded-full`}
                      />
                      <div
                        className="absolute top-0 h-full w-0.5 bg-gray-400 opacity-50"
                        style={{ left: `${score.previous}%` }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <GlassCard className="p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-rose-500" />
                Weekly Progress
              </h3>
              <div className="flex items-end justify-between h-40 px-2">
                {journeyData.weeklyData.map((data, i) => (
                  <div key={data.day} className="flex flex-col items-center gap-2">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${data.glow * 1.5}px` }}
                      transition={{ delay: 0.3 + i * 0.05 }}
                      className="w-8 rounded-t-lg bg-gradient-to-t from-rose-400 to-pink-400"
                    />
                    <span className="text-xs text-gray-500">{data.day}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center gap-4 mt-4 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded bg-gradient-to-r from-rose-400 to-pink-400" />
                  Glow Score
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <LineChart className="w-5 h-5 text-amber-500" />
                6-Month Journey
              </h3>
              <div className="relative h-40">
                <svg viewBox="0 0 300 100" className="w-full h-full">
                  <defs>
                    <linearGradient id="glowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#fb7185" />
                      <stop offset="100%" stopColor="#ec4899" />
                    </linearGradient>
                  </defs>
                  <motion.path
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2 }}
                    d={`M 0 ${100 - journeyData.monthlyMilestones[0].glow}% ${journeyData.monthlyMilestones
                      .slice(1)
                      .map((m, i) => `L ${(i + 1) * 50} ${100 - m.glow}%`)
                      .join(' ')}`}
                    fill="none"
                    stroke="url(#glowGradient)"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  {journeyData.monthlyMilestones.map((m, i) => (
                    <motion.circle
                      key={m.month}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      cx={i * 50}
                      cy={100 - m.glow}
                      r="4"
                      fill="#ec4899"
                    />
                  ))}
                </svg>
                <div className="flex justify-between mt-2 text-xs text-gray-500">
                  {journeyData.monthlyMilestones.map((m) => (
                    <span key={m.month}>{m.month}</span>
                  ))}
                </div>
              </div>
            </GlassCard>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <GlassCard className="p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-500" />
                Achievements
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {journeyData.achievements.map((achievement, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className={`p-4 rounded-xl text-center ${
                      achievement.earned
                        ? 'bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30'
                        : 'bg-gray-50 dark:bg-gray-800/50 opacity-50'
                    }`}
                  >
                    <div className={`text-3xl mb-2 ${achievement.earned ? '' : 'grayscale'}`}>
                      {achievement.earned ? '🏆' : '🔒'}
                    </div>
                    <p className="font-medium text-gray-900 dark:text-white text-sm">{achievement.name}</p>
                    {achievement.earned && achievement.date && (
                      <p className="text-xs text-gray-500 mt-1">{achievement.date}</p>
                    )}
                  </motion.div>
                ))}
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-emerald-500" />
                Recent Activity
              </h3>
              <div className="space-y-3">
                {journeyData.recentActivity.map((activity, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-950/50 dark:to-teal-950/50 flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-emerald-500" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white text-sm">{activity.name}</p>
                      <p className="text-xs text-gray-500">{activity.salon} • {activity.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-emerald-500">+{activity.scoreChange}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </div>

          <GlassCard className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <Target className="w-5 h-5 text-rose-500" />
                Beauty Goals
              </h3>
              <Button variant="ghost" size="sm">Edit Goals</Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { goal: 'Achieve 80+ Glow Score', progress: 72, target: 80 },
                { goal: 'Monthly Treatment', progress: 3, target: 12 },
                { goal: 'Try 5 New Salons', progress: 3, target: 5 },
              ].map((goal, i) => (
                <div key={i} className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                  <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">{goal.goal}</p>
                  <Progress value={(goal.progress / goal.target) * 100} variant="primary" />
                  <p className="text-xs text-gray-500 mt-2">{goal.progress} / {goal.target}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </section>

      <Footer />
    </div>
  );
}
