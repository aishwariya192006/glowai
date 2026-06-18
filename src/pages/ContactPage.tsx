import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Mail, Instagram, Facebook, Linkedin, Send, CheckCircle, Loader2 } from 'lucide-react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { api } from '../lib/api';

// X (Twitter) icon — lucide-react doesn't have the new X logo, so we use a custom SVG
function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

interface FormData {
  full_name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  full_name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const socialLinks = [
  { icon: Instagram, href: 'https://instagram.com/glowai', label: 'Instagram', color: 'hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500' },
  { icon: Facebook, href: 'https://facebook.com/glowai', label: 'Facebook', color: 'hover:bg-blue-600' },
  { icon: Linkedin, href: 'https://linkedin.com/company/glowai', label: 'LinkedIn', color: 'hover:bg-blue-700' },
  { icon: XIcon, href: 'https://x.com/glowai', label: 'X (Twitter)', color: 'hover:bg-gray-900 dark:hover:bg-white dark:hover:text-gray-900' },
];

export function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    full_name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.full_name.trim()) {
      newErrors.full_name = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');

    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await api.submitContact(formData);
      setIsSuccess(true);
      setFormData({ full_name: '', email: '', subject: '', message: '' });
    } catch (error: any) {
      setSubmitError(error.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />

      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-rose-200 dark:bg-rose-950/30 rounded-full blur-[150px] opacity-40" />
        <div className="absolute top-60 -left-40 w-80 h-80 bg-pink-200 dark:bg-pink-950/30 rounded-full blur-[120px] opacity-40" />
        <div className="absolute bottom-40 right-20 w-64 h-64 bg-purple-200 dark:bg-purple-950/20 rounded-full blur-[100px] opacity-30" />
      </div>

      <section className="relative pt-28 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 bg-clip-text text-transparent mb-4">
              Get In Touch
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
              We'd love to hear from you. Send us a message and we'll get back to you as soon as possible.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Left Column — Contact Info + Social + Map */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-2 space-y-8"
            >
              {/* Contact Info Card */}
              <div className="backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 border border-white/20 dark:border-gray-700/50 rounded-3xl shadow-xl shadow-rose-500/5 dark:shadow-purple-500/5 p-8">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  Contact Information
                </h3>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-100 to-pink-100 dark:from-rose-950/50 dark:to-pink-950/50 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-rose-500" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Email Us</h4>
                      <a
                        href="mailto:hello@glowai.com"
                        className="text-gray-600 dark:text-gray-400 hover:text-rose-500 dark:hover:text-rose-400 transition-colors"
                      >
                        hello@glowai.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-100 to-pink-100 dark:from-rose-950/50 dark:to-pink-950/50 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-rose-500" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Call Us</h4>
                      <p className="text-gray-600 dark:text-gray-400">+91 XXXXX XXXXX</p>
                      <p className="text-sm text-gray-500 dark:text-gray-500">Mon–Sat: 9am – 8pm</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-100 to-pink-100 dark:from-rose-950/50 dark:to-pink-950/50 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-rose-500" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Visit Us</h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        Chennai, Tamil Nadu, India
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media Card */}
              <div className="backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 border border-white/20 dark:border-gray-700/50 rounded-3xl shadow-xl shadow-rose-500/5 dark:shadow-purple-500/5 p-8">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  Follow Us
                </h3>
                <div className="flex gap-3">
                  {socialLinks.map(({ icon: Icon, href, label, color }) => (
                    <motion.a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-12 h-12 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-white ${color} transition-all shadow-sm hover:shadow-lg`}
                      title={label}
                    >
                      <Icon className="w-5 h-5" />
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Google Maps Embed */}
              <div className="backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 border border-white/20 dark:border-gray-700/50 rounded-3xl shadow-xl shadow-rose-500/5 dark:shadow-purple-500/5 overflow-hidden">
                <div className="p-6 pb-0">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Our Location
                  </h3>
                </div>
                <div className="p-4 pt-2">
                  <div className="rounded-2xl overflow-hidden">
                    <iframe
                      title="GlowAI Location — Chennai, Tamil Nadu"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248849.84916296526!2d80.0442788214039!3d13.047985942648498!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5265ea4f7d3361%3A0x6e61a70b6571f70d!2sChennai%2C%20Tamil%20Nadu%2C%20India!5e0!3m2!1sen!2sin!4v1718700000000!5m2!1sen!2sin"
                      width="100%"
                      height="220"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column — Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-3"
            >
              <div className="backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 border border-white/20 dark:border-gray-700/50 rounded-3xl shadow-xl shadow-rose-500/5 dark:shadow-purple-500/5 p-8 lg:p-10">
                <AnimatePresence mode="wait">
                  {isSuccess ? (
                    /* Success State */
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="flex flex-col items-center justify-center py-16 text-center"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', damping: 15, stiffness: 200, delay: 0.1 }}
                        className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center mb-6 shadow-xl shadow-emerald-500/30"
                      >
                        <CheckCircle className="w-10 h-10 text-white" />
                      </motion.div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                        Message Sent!
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 max-w-md mb-8">
                        Thank you for contacting GlowAI. We will get back to you soon.
                      </p>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setIsSuccess(false)}
                        className="px-8 py-3 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold shadow-lg shadow-rose-500/25 hover:shadow-xl hover:shadow-rose-500/30 transition-shadow"
                      >
                        Send Another Message
                      </motion.button>
                    </motion.div>
                  ) : (
                    /* Form State */
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="space-y-6"
                    >
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                          Send us a Message
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                          Fill out the form below and we'll get back to you.
                        </p>
                      </div>

                      {submitError && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-4 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/50 text-red-600 dark:text-red-400 text-sm"
                        >
                          {submitError}
                        </motion.div>
                      )}

                      {/* Full Name */}
                      <div>
                        <label htmlFor="contact-full-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Full Name <span className="text-rose-500">*</span>
                        </label>
                        <input
                          id="contact-full-name"
                          type="text"
                          value={formData.full_name}
                          onChange={(e) => handleChange('full_name', e.target.value)}
                          placeholder="Enter your full name"
                          className={`w-full px-5 py-3.5 rounded-xl bg-gray-50 dark:bg-gray-800/50 border ${
                            errors.full_name
                              ? 'border-red-400 dark:border-red-600 focus:border-red-500 focus:ring-red-400/20'
                              : 'border-gray-200 dark:border-gray-700 focus:border-rose-400 focus:ring-rose-400/20'
                          } focus:ring-2 outline-none transition-all text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500`}
                        />
                        {errors.full_name && (
                          <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="mt-1.5 text-sm text-red-500">
                            {errors.full_name}
                          </motion.p>
                        )}
                      </div>

                      {/* Email */}
                      <div>
                        <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Email Address <span className="text-rose-500">*</span>
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleChange('email', e.target.value)}
                          placeholder="you@example.com"
                          className={`w-full px-5 py-3.5 rounded-xl bg-gray-50 dark:bg-gray-800/50 border ${
                            errors.email
                              ? 'border-red-400 dark:border-red-600 focus:border-red-500 focus:ring-red-400/20'
                              : 'border-gray-200 dark:border-gray-700 focus:border-rose-400 focus:ring-rose-400/20'
                          } focus:ring-2 outline-none transition-all text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500`}
                        />
                        {errors.email && (
                          <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="mt-1.5 text-sm text-red-500">
                            {errors.email}
                          </motion.p>
                        )}
                      </div>

                      {/* Subject */}
                      <div>
                        <label htmlFor="contact-subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Subject <span className="text-rose-500">*</span>
                        </label>
                        <input
                          id="contact-subject"
                          type="text"
                          value={formData.subject}
                          onChange={(e) => handleChange('subject', e.target.value)}
                          placeholder="What is this about?"
                          className={`w-full px-5 py-3.5 rounded-xl bg-gray-50 dark:bg-gray-800/50 border ${
                            errors.subject
                              ? 'border-red-400 dark:border-red-600 focus:border-red-500 focus:ring-red-400/20'
                              : 'border-gray-200 dark:border-gray-700 focus:border-rose-400 focus:ring-rose-400/20'
                          } focus:ring-2 outline-none transition-all text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500`}
                        />
                        {errors.subject && (
                          <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="mt-1.5 text-sm text-red-500">
                            {errors.subject}
                          </motion.p>
                        )}
                      </div>

                      {/* Message */}
                      <div>
                        <label htmlFor="contact-message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Message <span className="text-rose-500">*</span>
                        </label>
                        <textarea
                          id="contact-message"
                          rows={5}
                          value={formData.message}
                          onChange={(e) => handleChange('message', e.target.value)}
                          placeholder="Tell us how we can help..."
                          className={`w-full px-5 py-3.5 rounded-xl bg-gray-50 dark:bg-gray-800/50 border ${
                            errors.message
                              ? 'border-red-400 dark:border-red-600 focus:border-red-500 focus:ring-red-400/20'
                              : 'border-gray-200 dark:border-gray-700 focus:border-rose-400 focus:ring-rose-400/20'
                          } focus:ring-2 outline-none transition-all text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 resize-none`}
                        />
                        {errors.message && (
                          <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="mt-1.5 text-sm text-red-500">
                            {errors.message}
                          </motion.p>
                        )}
                      </div>

                      {/* Submit Button */}
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                        whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                        className="w-full px-8 py-4 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold shadow-lg shadow-rose-500/25 hover:shadow-xl hover:shadow-rose-500/30 transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5" />
                            Send Message
                          </>
                        )}
                      </motion.button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
