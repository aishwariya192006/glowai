import { motion } from 'framer-motion';
import {
  Building2,
  TrendingUp,
  Users,
  Calendar,
  Sparkles,
  Check,
  ArrowRight,
  Phone,
  Mail,
  Star,
} from 'lucide-react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Button, GlassCard } from '../components/ui';
import { useState } from 'react';
import { Input } from '../components/ui/Input';
import { Modal } from '../components/ui/Modal';

const benefits = [
  {
    icon: TrendingUp,
    title: 'Increase Revenue',
    description: 'Our platform drives 3x more bookings than traditional marketing.',
  },
  {
    icon: Users,
    title: 'Reach New Customers',
    description: 'Connect with 50,000+ beauty seekers in Chennai actively looking for salons.',
  },
  {
    icon: Sparkles,
    title: 'AI-Powered Insights',
    description: "Get actionable insights about your customers and services with our AI tools.",
  },
  {
    icon: Calendar,
    title: 'Smart Booking',
    description: 'Reduce no-shows and manage appointments effortlessly with our smart calendar.',
  },
];

const pricingPlans = [
  {
    name: 'Starter',
    price: 'Free',
    period: 'forever',
    features: [
      'Basic listing',
      '5 service slots',
      'Customer reviews',
      'Booking notifications',
    ],
    highlighted: false,
  },
  {
    name: 'Professional',
    price: '₹999',
    period: '/month',
    features: [
      'Featured listing',
      'Unlimited services',
      'AI recommendations',
      'Analytics dashboard',
      'Priority support',
      'Women-owned badge',
    ],
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: '₹2,999',
    period: '/month',
    features: [
      'Everything in Professional',
      'Multiple locations',
      'API access',
      'Custom integrations',
      'Dedicated account manager',
      'Marketing support',
    ],
    highlighted: false,
  },
];

export function ForSalonsPage() {
  const [showContact, setShowContact] = useState(false);
  const [salonName, setSalonName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const stats = [
    { value: '500+', label: 'Partner Salons' },
    { value: '50K+', label: 'Monthly Users' },
    { value: '₹1Cr+', label: 'Revenue Generated' },
    { value: '4.8', label: 'Average Rating' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-rose-200 dark:bg-rose-950/30 rounded-full blur-[150px] opacity-40" />
        <div className="absolute top-40 -left-40 w-80 h-80 bg-pink-200 dark:bg-pink-950/30 rounded-full blur-[120px] opacity-40" />
      </div>

      <section className="relative pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-rose-100 to-pink-100 dark:from-rose-950/50 dark:to-pink-950/50 mb-4">
              <Building2 className="w-4 h-4 text-rose-500" />
              <span className="text-sm font-medium text-rose-600 dark:text-rose-300">
                For Salon Owners
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Grow Your Salon Business
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Join Chennai's fastest growing beauty marketplace. Get more customers, increase
              bookings, and let AI help you grow.
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-8 mb-16">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <p className="text-3xl font-bold text-rose-500">{stat.value}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <GlassCard className="p-8 bg-gradient-to-r from-rose-50 to-pink-50 dark:from-rose-950/30 dark:to-pink-950/30 mb-16">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center shadow-xl">
                  <Sparkles className="w-10 h-10 text-white" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Women-Owned Salon? Get Featured!
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    We're committed to supporting women entrepreneurs. Get a special badge
                    highlighting your women-owned business, and priority placement in
                    recommendations.
                  </p>
                </div>
                <Button variant="primary" icon={<ArrowRight className="w-4 h-4" />}>
                  Get Featured
                </Button>
              </div>
            </GlassCard>
          </motion.div>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
            Why Partner with GlowAI?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {benefits.map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <GlassCard className="p-6 h-full">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center mb-4">
                    <benefit.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{benefit.description}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
            Simple, Transparent Pricing
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {pricingPlans.map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <GlassCard
                  className={`p-6 h-full relative ${
                    plan.highlighted
                      ? 'ring-2 ring-rose-500 dark:ring-rose-400 bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-950/30'
                      : ''
                  }`}
                >
                  {plan.highlighted && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-rose-500 text-white px-4 py-1 rounded-full text-xs font-bold">
                      Most Popular
                    </div>
                  )}
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white text-center mb-2">
                    {plan.name}
                  </h3>
                  <div className="text-center mb-6">
                    <span className="text-4xl font-bold text-rose-500">{plan.price}</span>
                    <span className="text-gray-500 dark:text-gray-400">{plan.period}</span>
                  </div>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant={plan.highlighted ? 'primary' : 'outline'}
                    className="w-full"
                    onClick={() => setShowContact(true)}
                  >
                    Get Started
                  </Button>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <GlassCard className="p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Ready to Grow Your Business?
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-xl mx-auto">
                Join hundreds of successful salon partners who have transformed their business with
                GlowAI.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="primary"
                  size="lg"
                  icon={<ArrowRight className="w-5 h-5" />}
                  onClick={() => setShowContact(true)}
                >
                  List Your Salon
                </Button>
                <Button variant="outline" size="lg" icon={<Phone className="w-5 h-5" />}>
                  Schedule a Call
                </Button>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </section>

      <Modal isOpen={showContact} onClose={() => setShowContact(false)} title="List Your Salon" size="md">
        <div className="p-6">
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Fill in your details and we'll get back to you within 24 hours.
          </p>
          <div className="space-y-4">
            <Input
              label="Salon Name"
              value={salonName}
              onChange={(e) => setSalonName(e.target.value)}
              placeholder="Enter your salon name"
            />
            <Input
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
            />
            <Input
              label="Phone Number"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 XXXXX XXXXX"
            />
            <Button variant="primary" className="w-full">
              Submit Application
            </Button>
          </div>
        </div>
      </Modal>

      <Footer />
    </div>
  );
}
