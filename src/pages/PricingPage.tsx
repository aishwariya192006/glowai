import { motion } from 'framer-motion';
import { Check, X, Sparkles, TrendingUp, Users, Calendar, Shield, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const pricingTiers = [
  {
    name: 'Starter',
    price: '₹999',
    period: '/month',
    description: 'Perfect for independent stylists and new salons getting started.',
    icon: Sparkles,
    color: 'from-blue-400 to-blue-600',
    features: [
      { name: 'Basic Salon Profile', included: true },
      { name: 'Up to 10 Services', included: true },
      { name: 'Standard Booking System', included: true },
      { name: 'Basic Analytics', included: true },
      { name: 'AI Face Analysis', included: false },
      { name: 'Priority Support', included: false },
    ],
    cta: 'Start Free Trial',
    popular: false,
  },
  {
    name: 'Professional',
    price: '₹2,499',
    period: '/month',
    description: 'Ideal for established salons looking to grow their client base.',
    icon: TrendingUp,
    color: 'from-rose-400 to-pink-600',
    features: [
      { name: 'Premium Salon Profile', included: true },
      { name: 'Unlimited Services', included: true },
      { name: 'Advanced Booking & Staff Management', included: true },
      { name: 'Detailed Analytics & Insights', included: true },
      { name: 'AI Face Analysis Integration', included: true },
      { name: 'Priority Support', included: false },
    ],
    cta: 'Get Started',
    popular: true,
  },
  {
    name: 'Elite',
    price: '₹4,999',
    period: '/month',
    description: 'For premium salons and multi-location franchises needing maximum visibility.',
    icon: Shield,
    color: 'from-purple-400 to-indigo-600',
    features: [
      { name: 'Featured Placement in Search', included: true },
      { name: 'Unlimited Services & Staff', included: true },
      { name: 'Custom App Integration', included: true },
      { name: 'Predictive Revenue Analytics', included: true },
      { name: 'Advanced AI Recommendations', included: true },
      { name: '24/7 Priority Support', included: true },
    ],
    cta: 'Contact Sales',
    popular: false,
  },
];

const faqs = [
  {
    question: 'Is there a setup fee?',
    answer: 'No, there are no hidden setup fees. You only pay the monthly subscription cost for your chosen tier.',
  },
  {
    question: 'Can I change my plan later?',
    answer: 'Absolutely! You can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle.',
  },
  {
    question: 'Do you charge a commission on bookings?',
    answer: 'We charge a nominal flat convenience fee to the customer per booking. Salons keep 100% of their service revenue.',
  },
  {
    question: 'How does the free trial work?',
    answer: 'New salons get a 14-day free trial on the Starter or Professional plans to test drive all the features before committing.',
  },
];

export function PricingPage() {
  return (
    <div className="pt-32 pb-20 px-4 min-h-screen relative overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-rose-200/40 dark:bg-rose-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-pink-200/40 dark:bg-pink-900/20 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-100 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 font-medium mb-6"
          >
            <Zap className="w-4 h-4" />
            Simple, Transparent Pricing
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-white tracking-tight"
          >
            Grow your salon with <br />
            <span className="bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">
              GlowAI
            </span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Choose the perfect plan to attract more clients, streamline your operations, and boost your revenue.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-24">
          {pricingTiers.map((tier, index) => {
            const Icon = tier.icon;
            return (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className={`relative rounded-3xl p-8 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-2 transition-all duration-300 hover:shadow-2xl ${
                  tier.popular 
                    ? 'border-rose-400 shadow-xl shadow-rose-500/10' 
                    : 'border-white/20 dark:border-gray-800 hover:border-rose-200 dark:hover:border-rose-900/50'
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-sm font-semibold rounded-full shadow-lg">
                    Most Popular
                  </div>
                )}
                
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${tier.color} flex items-center justify-center mb-6 shadow-lg`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{tier.name}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm h-10 mb-6">{tier.description}</p>
                
                <div className="mb-8">
                  <span className="text-4xl font-extrabold text-gray-900 dark:text-white">{tier.price}</span>
                  <span className="text-gray-500 dark:text-gray-400 font-medium">{tier.period}</span>
                </div>

                <ul className="space-y-4 mb-8">
                  {tier.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start gap-3">
                      {feature.included ? (
                        <div className="p-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 shrink-0">
                          <Check className="w-3 h-3" />
                        </div>
                      ) : (
                        <div className="p-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 shrink-0">
                          <X className="w-3 h-3" />
                        </div>
                      )}
                      <span className={`text-sm ${feature.included ? 'text-gray-700 dark:text-gray-300' : 'text-gray-400 dark:text-gray-500 line-through'}`}>
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/for-salons"
                  className={`block w-full py-4 text-center rounded-2xl font-semibold transition-all ${
                    tier.popular
                      ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg hover:shadow-xl hover:shadow-rose-500/25 hover:-translate-y-0.5'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {tier.cta}
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto bg-white/50 dark:bg-gray-900/50 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/20 dark:border-gray-800">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 dark:text-gray-400">Everything you need to know about our pricing and billing.</p>
          </div>
          <div className="space-y-8">
            {faqs.map((faq, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-4"
              >
                <div className="shrink-0 w-8 h-8 rounded-full bg-rose-100 dark:bg-rose-900/30 text-rose-500 flex items-center justify-center font-bold">
                  Q
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{faq.question}</h4>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{faq.answer}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
