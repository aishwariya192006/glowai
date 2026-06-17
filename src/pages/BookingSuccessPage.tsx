import { motion } from 'framer-motion';
import { Check, Calendar, MapPin, Clock, Download, Share2, Home, ArrowRight } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { Button, GlassCard } from '../components/ui';

export function BookingSuccessPage() {
  const [searchParams] = useSearchParams();
  const salonName = searchParams.get('salon') || 'Luxe Glow Studio';
  const date = searchParams.get('date') || new Date().toISOString().split('T')[0];
  const time = searchParams.get('time') || '10:00';
  const service = searchParams.get('service') || 'Premium Service';
  const total = searchParams.get('total') || '1999';

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-200 dark:bg-emerald-950/30 rounded-full blur-[150px] opacity-30" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-rose-200 dark:bg-rose-950/30 rounded-full blur-[120px] opacity-40" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring' }}
        className="max-w-md w-full relative"
      >
        <GlassCard className="p-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-2xl shadow-emerald-500/30 mb-6"
          >
            <Check className="w-12 h-12 text-white" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Booking Confirmed!
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Your appointment has been successfully booked
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-left p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 mb-6 space-y-3"
          >
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-rose-500 mt-0.5" />
              <div>
                <p className="text-xs text-gray-500">Date</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {new Date(date).toLocaleDateString('en-IN', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-rose-500 mt-0.5" />
              <div>
                <p className="text-xs text-gray-500">Time</p>
                <p className="font-medium text-gray-900 dark:text-white">{time}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-rose-500 mt-0.5" />
              <div>
                <p className="text-xs text-gray-500">Salon</p>
                <p className="font-medium text-gray-900 dark:text-white">{salonName}</p>
              </div>
            </div>
            <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Service</span>
                <span className="font-medium text-gray-900 dark:text-white">{service}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-gray-600 dark:text-gray-400">Total</span>
                <span className="font-bold text-rose-500 text-lg">₹{parseInt(total).toLocaleString()}</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex gap-3 mb-6"
          >
            <Button variant="outline" className="flex-1" icon={<Download className="w-4 h-4" />}>
              Download
            </Button>
            <Button variant="outline" className="flex-1" icon={<Share2 className="w-4 h-4" />}>
              Share
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Link to="/dashboard">
              <Button variant="primary" className="w-full" icon={<ArrowRight className="w-4 h-4" />}>
                View My Bookings
              </Button>
            </Link>
            <Link to="/">
              <Button variant="ghost" className="w-full mt-3" icon={<Home className="w-4 h-4" />}>
                Back to Home
              </Button>
            </Link>
          </motion.div>
        </GlassCard>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-6 text-sm text-gray-500"
        >
          <p>Confirmation sent to your email</p>
          <p>Booking ID: {Date.now().toString(36).toUpperCase()}</p>
        </motion.div>
      </motion.div>
    </div>
  );
}
