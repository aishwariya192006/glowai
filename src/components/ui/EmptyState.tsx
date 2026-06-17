import { motion } from 'framer-motion';
import {
  Search,
  Calendar,
  Heart,
  ShoppingBag,
  Star,
  Users,
  Building2,
  TrendingUp,
  Sparkles,
  Gift,
} from 'lucide-react';
import type { ReactNode } from 'react';
import { Button } from './Button';

interface EmptyStateProps {
  icon: typeof Search;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick?: () => void;
    href?: string;
  };
  illustration?: ReactNode;
}

export function EmptyState({ icon: Icon, title, description, action, illustration }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-12 px-4"
    >
      <div className="relative inline-block mb-6">
        {illustration || (
          <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-rose-100 to-pink-100 dark:from-rose-950/50 dark:to-pink-950/50 flex items-center justify-center">
            <Icon className="w-10 h-10 text-rose-400 dark:text-rose-500" />
          </div>
        )}
        <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-xl bg-pink-500 opacity-20 blur-lg" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
      <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-6">{description}</p>
      {action && (
        <Button variant="primary" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </motion.div>
  );
}

export function NoSearchResults() {
  return (
    <EmptyState
      icon={Search}
      title="No results found"
      description="Try adjusting your search or filters to find what you're looking for."
    />
  );
}

export function NoBookings() {
  return (
    <EmptyState
      icon={Calendar}
      title="No bookings yet"
      description="Ready to glow? Book your first appointment at a premier salon!"
      action={{ label: 'Find a Salon', href: '/discover' }}
    />
  );
}

export function NoSavedSalons() {
  return (
    <EmptyState
      icon={Heart}
      title="No saved salons"
      description="Save your favorite salons to quickly book appointments later."
      action={{ label: 'Discover Salons', href: '/discover' }}
    />
  );
}

export function NoServices() {
  return (
    <EmptyState
      icon={ShoppingBag}
      title="No services available"
      description="This salon hasn't added any services yet. Check back soon!"
    />
  );
}

export function NoReviews() {
  return (
    <EmptyState
      icon={Star}
      title="No reviews yet"
      description="Be the first to share your experience and help others decide."
      action={{ label: 'Write a Review' }}
    />
  );
}

export function NoUsers() {
  return (
    <EmptyState
      icon={Users}
      title="No users found"
      description="User data will appear here once they start signing up."
    />
  );
}

export function NoSalons() {
  return (
    <EmptyState
      icon={Building2}
      title="No salons registered"
      description="Invite salons to join your platform and grow your marketplace."
      action={{ label: 'Invite Salons' }}
    />
  );
}

export function NoTrends() {
  return (
    <EmptyState
      icon={TrendingUp}
      title="No trend data"
      description="Beauty trends will appear here as users book and review services."
    />
  );
}

export function NoDeals() {
  return (
    <EmptyState
      icon={Gift}
      title="No deals available"
      description="Check back soon for exclusive student beauty deals!"
    />
  );
}

export function ComingSoon({ feature }: { feature: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-16 px-4"
    >
      <div className="relative inline-block mb-6">
        <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-950/50 dark:to-orange-950/50 flex items-center justify-center">
          <Sparkles className="w-12 h-12 text-amber-500 dark:text-amber-400" />
        </div>
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center"
        >
          <span className="text-white text-xs">✨</span>
        </motion.div>
      </div>
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
        {feature} Coming Soon
      </h3>
      <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-6">
        We're working hard to bring you this exciting feature. Stay tuned for updates!
      </p>
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300">
        <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
        In Development
      </div>
    </motion.div>
  );
}
