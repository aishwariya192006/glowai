import { motion } from 'framer-motion';
import { Star, TrendingUp, Users, Calendar, ArrowRight, Quote } from 'lucide-react';
import { Link } from 'react-router-dom';

const testimonials = [
  {
    id: 1,
    salonName: 'Elegance Studio',
    location: 'Anna Nagar, Chennai',
    ownerName: 'Priya Rajan',
    image: 'https://images.unsplash.com/photo-1595959183082-7b570b7e08e2?auto=format&fit=crop&q=80&w=300&h=300',
    quote: "Since joining GlowAI, our weekend bookings have doubled. The AI recommendations match us with clients who are exactly looking for our specialized bridal services. It's been a game-changer for our revenue.",
    stats: { label: 'Revenue Increase', value: '+45%' },
  },
  {
    id: 2,
    salonName: 'The Grooming Lounge',
    location: 'T. Nagar, Chennai',
    ownerName: 'Karthik S.',
    image: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&q=80&w=300&h=300',
    quote: "The analytics dashboard helped me understand my peak hours and optimize staff scheduling. We've reduced wait times by 30% and our customer satisfaction scores have never been higher.",
    stats: { label: 'New Clients Monthly', value: '120+' },
  },
  {
    id: 3,
    salonName: 'Aura Spa & Salon',
    location: 'Adyar, Chennai',
    ownerName: 'Meenakshi Iyer',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300&h=300',
    quote: "I was skeptical at first, but the seamless booking integration and automated reminders have practically eliminated no-shows. GlowAI handles the tech so I can focus on my clients.",
    stats: { label: 'No-Shows Reduced', value: '-85%' },
  },
  {
    id: 4,
    salonName: 'Style & Smile',
    location: 'Velachery, Chennai',
    ownerName: 'Rahul Verma',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=300&h=300',
    quote: "The Glow Score feature really motivated our staff. We actively collect feedback now, and being a top-rated salon on the platform has brought in a steady stream of premium clients.",
    stats: { label: 'Client Retention', value: '92%' },
  },
];

const metrics = [
  { icon: TrendingUp, value: '3x', label: 'Average ROI in Year 1' },
  { icon: Users, value: '50,000+', label: 'Active Users in Chennai' },
  { icon: Calendar, value: '1M+', label: 'Appointments Booked' },
  { icon: Star, value: '4.8/5', label: 'Average Partner Rating' },
];

export function SuccessStoriesPage() {
  return (
    <div className="pt-32 pb-20 px-4 min-h-screen relative overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-rose-200/40 dark:bg-rose-900/20 rounded-full blur-[120px]" />
        <div className="absolute top-[40%] right-[-5%] w-[600px] h-[600px] bg-pink-200/40 dark:bg-pink-900/20 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-100 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 font-medium mb-6"
          >
            <Star className="w-4 h-4" />
            Partner Success Stories
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-white tracking-tight"
          >
            Real Salons. <br />
            <span className="bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">
              Real Growth.
            </span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Discover how salon owners across Chennai are transforming their businesses, reaching more clients, and increasing their revenue with GlowAI.
          </motion.p>
        </div>

        {/* Global Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-md rounded-2xl p-6 text-center border border-white/20 dark:border-gray-800 shadow-xl shadow-gray-200/20 dark:shadow-none"
              >
                <div className="w-12 h-12 mx-auto rounded-xl bg-rose-100 dark:bg-rose-950/50 flex items-center justify-center mb-4 text-rose-500">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{metric.value}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">{metric.label}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-24">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/20 dark:border-gray-800 rounded-3xl p-8 shadow-xl shadow-rose-500/5 hover:shadow-2xl hover:shadow-rose-500/10 transition-all group relative overflow-hidden"
            >
              <Quote className="absolute top-6 right-6 w-12 h-12 text-rose-100 dark:text-rose-900/20 group-hover:scale-110 transition-transform" />
              
              <p className="text-lg text-gray-700 dark:text-gray-300 italic mb-8 relative z-10 leading-relaxed">
                "{testimonial.quote}"
              </p>
              
              <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-800 pt-6">
                <div className="flex items-center gap-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.ownerName}
                    className="w-14 h-14 rounded-full object-cover border-2 border-rose-200 dark:border-rose-900"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">{testimonial.ownerName}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.salonName} • {testimonial.location}</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-2xl font-bold text-rose-500">{testimonial.stats.value}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider font-semibold">{testimonial.stats.label}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-rose-500 to-pink-600" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
          
          <div className="relative p-12 md:p-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to write your own success story?
            </h2>
            <p className="text-rose-100 text-lg md:text-xl max-w-2xl mx-auto mb-10">
              Join hundreds of salons in Chennai already growing their business with GlowAI. It only takes 5 minutes to set up your profile.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/for-salons"
                className="w-full sm:w-auto px-8 py-4 bg-white text-rose-600 font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2"
              >
                List Your Salon Free
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/pricing"
                className="w-full sm:w-auto px-8 py-4 bg-rose-600/30 text-white font-bold rounded-xl hover:bg-rose-600/40 border border-white/20 transition-all flex items-center justify-center"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
