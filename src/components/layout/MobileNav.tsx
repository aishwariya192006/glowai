import { motion } from 'framer-motion';
import { Home, Search, Calendar, User, Sparkles } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/discover', icon: Search, label: 'Discover' },
  { path: '/ai-features', icon: Sparkles, label: 'AI' },
  { path: '/beauty-journey', icon: Calendar, label: 'Journey' },
  { path: '/dashboard', icon: User, label: 'Profile' },
];

export function MobileNav() {
  const location = useLocation();

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 px-4 pb-4"
    >
      <div className="backdrop-blur-xl bg-white/90 dark:bg-gray-900/90 border border-white/20 dark:border-gray-700/50 rounded-3xl shadow-2xl shadow-rose-500/10 px-2 py-2">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path ||
              (item.path !== '/' && location.pathname.startsWith(item.path));
            return (
              <Link
                key={item.path + item.label}
                to={item.path}
                className="relative flex flex-col items-center gap-0.5 p-2"
              >
                {isActive && (
                  <motion.div
                    layoutId="mobileNavIndicator"
                    className="absolute inset-0 rounded-2xl bg-rose-100 dark:bg-rose-950/50"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <item.icon
                  className={`w-5 h-5 relative z-10 ${
                    isActive ? 'text-rose-500' : 'text-gray-400 dark:text-gray-500'
                  }`}
                />
                <span
                  className={`text-[10px] font-medium relative z-10 ${
                    isActive ? 'text-rose-500' : 'text-gray-400 dark:text-gray-500'
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
}
