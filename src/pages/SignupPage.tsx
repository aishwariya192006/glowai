import { motion } from 'framer-motion';
import { Sparkles, Mail, Lock, Eye, EyeOff, ArrowLeft, User, Phone, GraduationCap } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../lib/api';
import { supabase } from '../lib/supabase';
import { Button, GlassCard, Input } from '../components/ui';

export function SignupPage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isStudent, setIsStudent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await api.signup({ email, password, name, phone, is_student: isStudent });
      navigate('/login');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Signup failed');
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-rose-200 dark:bg-rose-950/30 rounded-full blur-[150px] opacity-40" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-200 dark:bg-pink-950/30 rounded-full blur-[120px] opacity-40" />
      </div>

      <div className="w-full max-w-md relative">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-rose-500 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <GlassCard className="p-8">
            <div className="text-center mb-8">
              <Link to="/" className="inline-flex items-center gap-2 mb-4">
                <motion.div
                  whileHover={{ rotate: 180 }}
                  transition={{ duration: 0.5 }}
                  className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center shadow-lg shadow-rose-500/30"
                >
                  <Sparkles className="w-6 h-6 text-white" />
                </motion.div>
              </Link>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create Account</h1>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Join GlowAI and start your beauty journey</p>
            </div>

            <form onSubmit={handleSignup} className="space-y-4" autoComplete="off">
              <Input
                label="Full Name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                icon={<User className="w-5 h-5" />}
                autoComplete="new-password"
                required
              />

              <Input
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                icon={<Mail className="w-5 h-5" />}
                autoComplete="new-password"
                required
              />

              <Input
                label="Phone Number"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 XXXXX XXXXX"
                icon={<Phone className="w-5 h-5" />}
                autoComplete="new-password"
                required
              />

              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                icon={<Lock className="w-5 h-5" />}
                suffix={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                }
                autoComplete="new-password"
                required
              />

              {error && (
                <p className="text-red-500 text-sm">{error}</p>
              )}

              <div className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30">
                <input
                  type="checkbox"
                  id="student"
                  checked={isStudent}
                  onChange={(e) => setIsStudent(e.target.checked)}
                  className="w-5 h-5 rounded accent-rose-500"
                />
                <label htmlFor="student" className="flex-1">
                  <span className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-medium">
                    <GraduationCap className="w-4 h-4 text-emerald-500" />
                    I'm a student
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Unlock exclusive student discounts!
                  </span>
                </label>
              </div>

              <div className="flex items-start gap-3">
                <input type="checkbox" className="w-4 h-4 rounded accent-rose-500 mt-0.5" required />
                <label className="text-sm text-gray-600 dark:text-gray-400">
                  I agree to the{' '}
                  <Link to="/terms" className="text-rose-500 hover:underline">Terms of Service</Link>
                  {' '}and{' '}
                  <Link to="/privacy" className="text-rose-500 hover:underline">Privacy Policy</Link>
                </label>
              </div>

              <Button
                type="submit"
                variant="primary"
                className="w-full"
                loading={loading}
                icon={<Sparkles className="w-4 h-4" />}
              >
                Create Account
              </Button>
            </form>



            <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
              Already have an account?{' '}
              <Link to="/login" className="text-rose-500 hover:text-rose-600 font-medium">
                Sign in
              </Link>
            </p>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}
