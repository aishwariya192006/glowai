import { motion } from 'framer-motion';
import { Sparkles, Menu, X, Sun, Moon, User, LogOut, LayoutDashboard, ChevronDown, Sparkle, Calendar, Users, TrendingUp, Camera, PiggyBank, Activity, MapPin, Scissors } from 'lucide-react';
import { useState, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useApp } from '../../context/AppContext';
import { Button } from '../ui/Button';
import { LogoutModal } from '../ui/LogoutModal';

const navItems = [
  { label: 'Discover', path: '/discover' },
  {
    label: 'AI Features',
    path: '/ai-features',
    dropdown: [
      { label: 'Face Analysis', path: '/face-analysis', icon: Camera },
      { label: 'Glow Score', path: '/glow-score', icon: TrendingUp },
      { label: 'Bridal Planner', path: '/bridal-planner', icon: Sparkle },
      { label: 'Interview Planner', path: '/interview-planner', icon: Calendar },
      { label: 'Occasion Planner', path: '/occasion-planner', icon: Sparkles },
      { label: 'Budget Planner', path: '/budget-planner', icon: PiggyBank },
      { label: 'Beauty Journey', path: '/beauty-journey', icon: Activity },
      { label: 'Salon Heatmap', path: '/salon-heatmap', icon: MapPin },
      { label: 'Virtual Style', path: '/virtual-style', icon: Scissors },
      { label: 'Beauty Trends', path: '/beauty-trends', icon: TrendingUp },
    ],
  },
  { label: 'Student Deals', path: '/student-deals' },
  { label: 'Women-Owned', path: '/women-owned' },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { theme, toggleTheme } = useTheme();
  const { user, setUser } = useApp();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    sessionStorage.clear();
    setUser(null);
    setIsMobileMenuOpen(false);
    navigate('/');
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="mx-4 mt-4">
        <nav className="backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border border-white/20 dark:border-gray-700/50 rounded-3xl shadow-xl shadow-rose-500/5 dark:shadow-purple-500/5 px-6 py-3">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <motion.div
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.5 }}
                className="w-10 h-10 rounded-2xl bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center shadow-lg shadow-rose-500/30"
              >
                <Sparkles className="w-5 h-5 text-white" />
              </motion.div>
              <div className="flex flex-col">
                <span className="text-xl font-bold bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent leading-none">
                  GlowAI
                </span>
                <span className="text-[10px] text-gray-400 dark:text-gray-500 leading-none hidden sm:block">Chennai</span>
              </div>
            </Link>

            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <div
                  key={item.path}
                  className="relative"
                  onMouseEnter={() => {
                    if (timeoutRef.current) clearTimeout(timeoutRef.current);
                    if (item.dropdown) setActiveDropdown(item.label);
                  }}
                  onMouseLeave={() => {
                    timeoutRef.current = setTimeout(() => {
                      setActiveDropdown(null);
                    }, 200);
                  }}
                >
                  <Link
                    to={item.path}
                    className={`flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      location.pathname === item.path || (item.dropdown && item.dropdown.some(d => location.pathname === d.path))
                        ? 'text-rose-500 bg-rose-50 dark:bg-rose-950/30'
                        : 'text-gray-600 dark:text-gray-300 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30'
                    }`}
                  >
                    {item.label}
                    {item.dropdown && <ChevronDown className="w-4 h-4" />}
                  </Link>

                  {item.dropdown && activeDropdown === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute top-full left-0 pt-2 w-56"
                    >
                      <div className="backdrop-blur-xl bg-white/95 dark:bg-gray-900/95 border border-white/20 dark:border-gray-700/50 rounded-2xl shadow-xl shadow-rose-500/10 p-2">
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.path}
                            to={subItem.path}
                            onClick={() => setActiveDropdown(null)}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                              location.pathname === subItem.path
                                ? 'bg-rose-100 dark:bg-rose-950/50 text-rose-600'
                                : 'text-gray-600 dark:text-gray-300 hover:bg-rose-50 dark:hover:bg-rose-950/30'
                            }`}
                          >
                            <subItem.icon className="w-4 h-4 text-rose-400" />
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleTheme}
                className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-rose-100 dark:hover:bg-rose-950/50 transition-colors"
              >
                {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              </motion.button>

              {user ? (
                <div className="hidden md:flex items-center gap-3">
                  <Link to="/dashboard">
                    <Button variant="ghost" size="sm" icon={<LayoutDashboard className="w-4 h-4" />}>
                      Dashboard
                    </Button>
                  </Link>
                  <button
                    onClick={() => setShowLogoutModal(true)}
                    className="p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <LogOut className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                  </button>
                </div>
              ) : (
                <div className="hidden md:flex items-center gap-2">
                  <Link to="/login">
                    <Button variant="ghost" size="sm">Log in</Button>
                  </Link>
                  <Link to="/signup">
                    <Button variant="primary" size="sm" icon={<User className="w-4 h-4" />}>
                      Sign up
                    </Button>
                  </Link>
                </div>
              )}

              <button
                className="lg:hidden p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5 text-gray-600 dark:text-gray-300" /> : <Menu className="w-5 h-5 text-gray-600 dark:text-gray-300" />}
              </button>
            </div>
          </div>

          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden mt-4 pt-4 border-t border-gray-200/50 dark:border-gray-700/50"
            >
              <div className="flex flex-col gap-2 pb-4">
                {navItems.map((item) => (
                  item.dropdown ? (
                    <div key={item.path}>
                      <div className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase">{item.label}</div>
                      <div className="flex flex-col gap-1 mt-1">
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.path}
                            to={subItem.path}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm transition-all ${
                              location.pathname === subItem.path
                                ? 'bg-rose-100 dark:bg-rose-950/50 text-rose-500'
                                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                            }`}
                          >
                            <subItem.icon className="w-4 h-4" />
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                        location.pathname === item.path
                          ? 'bg-rose-100 dark:bg-rose-950/50 text-rose-500'
                          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                    >
                      {item.label}
                    </Link>
                  )
                ))}
                {user ? (
                  <>
                    <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-sm font-medium text-gray-600 dark:text-gray-300">
                      <div className="flex items-center gap-2">
                        <LayoutDashboard className="w-4 h-4" />
                        Dashboard
                      </div>
                    </Link>
                    <button
                      onClick={() => { setIsMobileMenuOpen(false); setShowLogoutModal(true); }}
                      className="px-4 py-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-left text-sm font-medium text-gray-600 dark:text-gray-300"
                    >
                      <div className="flex items-center gap-2">
                        <LogOut className="w-4 h-4" />
                        Log out
                      </div>
                    </button>
                  </>
                ) : (
                  <div className="flex gap-2 pt-2 mt-2 border-t border-gray-200/50 dark:border-gray-700/50">
                    <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="flex-1">
                      <Button variant="ghost" size="sm" className="w-full">Log in</Button>
                    </Link>
                    <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)} className="flex-1">
                      <Button variant="primary" size="sm" className="w-full">Sign up</Button>
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </nav>
      </div>
      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onLogout={() => {
          setShowLogoutModal(false);
          handleLogout();
        }}
      />
    </motion.header>
  );
}
