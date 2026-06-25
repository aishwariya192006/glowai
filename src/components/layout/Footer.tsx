import { motion } from 'framer-motion';
import { Sparkles, Instagram, Facebook, Linkedin, Mail, Phone, MapPin, Heart, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const footerLinks = {
  discover: [
    { label: 'Find Salons', href: '/discover' },
    { label: 'AI Features', href: '/ai-features' },
    { label: 'Student Deals', href: '/student-deals' },
    { label: 'Trending Services', href: '/discover?tab=trending' },
    { label: 'Beauty Blog', href: '/blog' },
  ],
  salonOwners: [
    { label: 'List Your Salon', href: '/for-salons' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Success Stories', href: '/success-stories' },
    { label: 'Partner Resources', href: '/partner-resources' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Careers', href: '/careers' },
    { label: 'Leadership', href: '/leadership' },
    { label: 'Women Initiative', href: '/women-owned' },
    { label: 'Contact', href: '/contact' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Cookie Policy', href: '/cookies' },
  ],
};

const stats = [
  { label: 'Salons', value: '500+' },
  { label: 'Customers', value: '50K+' },
  { label: 'Cities', value: '10+' },
];

export function Footer() {
  return (
    <footer className="relative mt-20 bg-gradient-to-br from-gray-50 to-rose-50 dark:from-gray-900 dark:to-gray-800 pt-20 pb-8 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-rose-200 dark:bg-rose-950/30 rounded-full blur-[100px] opacity-40" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-200 dark:bg-pink-950/30 rounded-full blur-[100px] opacity-40" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <motion.div
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.5 }}
                className="w-10 h-10 rounded-2xl bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center shadow-lg shadow-rose-500/30"
              >
                <Sparkles className="w-5 h-5 text-white" />
              </motion.div>
              <span className="text-xl font-bold bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">
                GlowAI
              </span>
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Chennai's AI-powered beauty marketplace. Discover the best salons and personalized beauty recommendations.
            </p>
            <div className="flex gap-4 mb-4">
              {[
                { Icon: Instagram, href: 'https://instagram.com/glowai', label: 'Instagram' },
                { Icon: Facebook, href: 'https://facebook.com/glowai', label: 'Facebook' },
                { Icon: Linkedin, href: 'https://linkedin.com/company/glowai', label: 'LinkedIn' },
              ].map(({ Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-rose-100 dark:hover:bg-rose-950/50 hover:text-rose-500 transition-colors"
                  title={label}
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
              <motion.a
                href="https://x.com/glowai"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-rose-100 dark:hover:bg-rose-950/50 hover:text-rose-500 transition-colors"
                title="X (Twitter)"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </motion.a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Discover</h4>
            <ul className="space-y-2">
              {footerLinks.discover.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-rose-500 dark:hover:text-rose-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Salon Owners</h4>
            <ul className="space-y-2">
              {footerLinks.salonOwners.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-rose-500 dark:hover:text-rose-400 transition-colors inline-flex items-center gap-1"
                  >
                    {link.label}
                    {link.label === 'List Your Salon' && <ExternalLink className="w-3 h-3" />}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-rose-500 dark:hover:text-rose-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Mail className="w-4 h-4" />
                hello@glowai.com
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Phone className="w-4 h-4" />
                +91 98765 43210
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                T. Nagar, Chennai, Tamil Nadu 600017
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-gray-200/50 dark:border-gray-700/50">
          <div className="flex items-center gap-6 mb-4 md:mb-0">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <p className="text-xl font-bold bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">
                  {stat.value}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-rose-500 fill-current" /> in Chennai © 2024 GlowAI
          </p>
        </div>
      </div>
    </footer>
  );
}
