import { motion } from 'framer-motion';
import { Sparkles, Home, Search, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button, GlassCard } from '../components/ui';

interface NotFoundPageProps {
  statusCode?: 404 | 500;
  title?: string;
  message?: string;
}

export function NotFoundPage({
  statusCode = 404,
  title = 'Page Not Found',
  message = "Oops! The page you're looking for doesn't exist or has been moved.",
}: NotFoundPageProps) {
  const illustrations = {
    404: '🌟',
    500: '💫',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-rose-200 dark:bg-rose-950/30 rounded-full blur-[150px] opacity-40" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-200 dark:bg-pink-950/30 rounded-full blur-[120px] opacity-40" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring' }}
        className="max-w-md w-full relative text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.2 }}
          className="mb-8"
        >
          <div className="relative inline-block">
            <span className="text-[120px] leading-none">{illustrations[statusCode]}</span>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute -top-4 -right-4"
            >
              <Sparkles className="w-8 h-8 text-rose-400" />
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="text-6xl font-bold bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent mb-4">
            {statusCode}
          </h1>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{title}</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">{message}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-3"
        >
          <Link to="/">
            <Button variant="primary" className="w-full" icon={<Home className="w-4 h-4" />}>
              Back to Home
            </Button>
          </Link>
          <Link to="/discover">
            <Button variant="outline" className="w-full" icon={<Search className="w-4 h-4" />}>
              Discover Salons
            </Button>
          </Link>
          <Link to="/contact">
            <Button variant="ghost" className="w-full" icon={<Mail className="w-4 h-4" />}>
              Contact Support
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8"
        >
          <GlassCard className="p-4 inline-flex items-center gap-2">
            <span className="text-2xl">✨</span>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Need help? We're here for you at{' '}
              <a href="mailto:support@glowai.com" className="text-rose-500">
                support@glowai.com
              </a>
            </span>
          </GlassCard>
        </motion.div>
      </motion.div>
    </div>
  );
}
