import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Video, 
  TrendingUp, 
  Users, 
  PlayCircle, 
  FileText, 
  HelpCircle,
  Search,
  ArrowRight,
  Calendar
} from 'lucide-react';
import { Link } from 'react-router-dom';

const categories = [
  { id: 'getting-started', label: 'Getting Started', icon: BookOpen },
  { id: 'marketing', label: 'Marketing & Growth', icon: TrendingUp },
  { id: 'tutorials', label: 'Video Tutorials', icon: Video },
  { id: 'management', label: 'Salon Management', icon: Users },
];

const resources = [
  {
    title: 'Optimizing Your GlowAI Profile',
    category: 'Getting Started',
    type: 'Guide',
    icon: FileText,
    readTime: '5 min read',
    description: 'Learn how to make your salon stand out with high-quality photos and SEO-friendly descriptions.',
  },
  {
    title: 'Mastering the AI Booking System',
    category: 'Video Tutorials',
    type: 'Video',
    icon: PlayCircle,
    readTime: '12 min watch',
    description: 'A step-by-step walkthrough of managing appointments, staff schedules, and automated reminders.',
  },
  {
    title: 'Social Media Strategies for Salons',
    category: 'Marketing & Growth',
    type: 'Article',
    icon: TrendingUp,
    readTime: '8 min read',
    description: 'How to leverage Instagram and Facebook to drive more bookings to your GlowAI page.',
  },
  {
    title: 'Reducing No-Shows and Cancellations',
    category: 'Salon Management',
    type: 'Guide',
    icon: FileText,
    readTime: '6 min read',
    description: 'Best practices for setting deposit policies and using GlowAI\'s automated communication tools.',
  },
  {
    title: 'Understanding the Glow Score Algorithm',
    category: 'Marketing & Growth',
    type: 'Guide',
    icon: TrendingUp,
    readTime: '10 min read',
    description: 'Discover how reviews, responsiveness, and booking completion rates affect your ranking.',
  },
  {
    title: 'Onboarding New Staff to GlowAI',
    category: 'Video Tutorials',
    type: 'Video',
    icon: PlayCircle,
    readTime: '15 min watch',
    description: 'Train your new stylists on how to check their schedule and manage their individual profiles.',
  },
];

const webinars = [
  {
    title: 'Maximizing Bridal Season Bookings',
    date: 'Oct 15, 2024',
    time: '2:00 PM IST',
    speaker: 'Aarti Sharma, Partner Success',
  },
  {
    title: 'Introduction to AI Face Analysis Tools',
    date: 'Oct 22, 2024',
    time: '3:30 PM IST',
    speaker: 'Vikram Patel, Product Manager',
  },
];

export function PartnerResourcesPage() {
  return (
    <div className="pt-32 pb-20 px-4 min-h-screen relative overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-5%] left-[-10%] w-[500px] h-[500px] bg-rose-200/40 dark:bg-rose-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[20%] right-[-10%] w-[600px] h-[600px] bg-pink-200/40 dark:bg-pink-900/20 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-white tracking-tight"
          >
            Partner Resource <span className="bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">Hub</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10"
          >
            Everything you need to grow your salon, attract more clients, and master the GlowAI platform.
          </motion.p>

          {/* Search Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-rose-400 to-pink-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
            <div className="relative bg-white dark:bg-gray-900 rounded-2xl flex items-center p-2 border border-gray-200 dark:border-gray-800 shadow-sm">
              <Search className="w-6 h-6 text-gray-400 ml-4 mr-2" />
              <input 
                type="text" 
                placeholder="Search guides, tutorials, and more..." 
                className="w-full bg-transparent border-none focus:ring-0 text-gray-900 dark:text-white placeholder-gray-400 text-lg py-3 px-2 outline-none"
              />
              <button className="bg-rose-500 hover:bg-rose-600 text-white px-6 py-3 rounded-xl font-medium transition-colors">
                Search
              </button>
            </div>
          </motion.div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((cat, index) => {
            const Icon = cat.icon;
            return (
              <motion.button
                key={cat.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-rose-300 dark:hover:border-rose-700 hover:shadow-md transition-all text-gray-700 dark:text-gray-300 font-medium"
              >
                <Icon className="w-4 h-4 text-rose-500" />
                {cat.label}
              </motion.button>
            );
          })}
        </div>

        {/* Resources Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {resources.map((resource, index) => {
            const Icon = resource.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/20 dark:border-gray-800 rounded-3xl p-6 shadow-lg shadow-gray-200/20 dark:shadow-none hover:shadow-xl hover:border-rose-200 dark:hover:border-rose-900/50 transition-all flex flex-col h-full cursor-pointer"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-rose-500 bg-rose-50 dark:bg-rose-950/50 px-3 py-1 rounded-full">
                    {resource.category}
                  </span>
                  <div className="flex items-center gap-1 text-gray-400 text-sm font-medium">
                    <Icon className="w-4 h-4" />
                    {resource.type}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-rose-500 transition-colors">
                  {resource.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 flex-grow">
                  {resource.description}
                </p>
                
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-gray-800">
                  <span className="text-sm text-gray-500 dark:text-gray-400">{resource.readTime}</span>
                  <div className="w-8 h-8 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center group-hover:bg-rose-100 dark:group-hover:bg-rose-900/50 transition-colors">
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-rose-500 transition-colors" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Webinars Section */}
          <div className="lg:col-span-2 bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-950/20 dark:to-pink-950/20 rounded-3xl p-8 border border-rose-100 dark:border-rose-900/30">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-rose-500 flex items-center justify-center text-white">
                <Calendar className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Upcoming Webinars</h2>
            </div>
            
            <div className="space-y-4">
              {webinars.map((webinar, index) => (
                <div key={index} className="bg-white dark:bg-gray-900 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-rose-50 dark:border-gray-800 shadow-sm">
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white text-lg">{webinar.title}</h4>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                      {webinar.date} • {webinar.time} • Hosted by {webinar.speaker}
                    </p>
                  </div>
                  <button className="shrink-0 px-5 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium rounded-xl hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors">
                    Register Now
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Support CTA */}
          <div className="bg-gray-900 dark:bg-gray-800 rounded-3xl p-8 text-center flex flex-col justify-center items-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/20 blur-[50px] rounded-full" />
            
            <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-white mb-6 backdrop-blur-sm">
              <HelpCircle className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Need direct help?</h3>
            <p className="text-gray-400 mb-8">
              Our partner success team is available 24/7 to help you resolve issues and grow your business.
            </p>
            <Link
              to="/contact"
              className="w-full py-4 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              Contact Support
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
