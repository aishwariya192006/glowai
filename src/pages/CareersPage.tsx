import { motion } from 'framer-motion';
import { 
  Heart, 
  Rocket, 
  Coffee, 
  Laptop, 
  GraduationCap, 
  Sun,
  MapPin,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const values = [
  {
    icon: Heart,
    title: 'Customer Obsession',
    description: 'We put salons and their clients at the center of everything we do, building tools that truly solve their problems.'
  },
  {
    icon: Rocket,
    title: 'Think Big, Move Fast',
    description: 'We are ambitious in our goals and agile in our execution. We are not afraid to disrupt the beauty tech industry.'
  },
  {
    icon: Users,
    title: 'Collaborative Spirit',
    description: 'Great ideas come from everywhere. We foster an inclusive environment where everyone\'s voice is heard.'
  }
];
import { Users } from 'lucide-react';

const perks = [
  { icon: Laptop, title: 'Flexible Work', desc: 'Hybrid model with flexible hours' },
  { icon: Sun, title: 'Wellness Days', desc: 'Unlimited paid time off & mental health days' },
  { icon: GraduationCap, title: 'Learning Budget', desc: 'Annual stipend for courses and conferences' },
  { icon: Coffee, title: 'Office Perks', desc: 'Catered lunches and fully stocked kitchen in Chennai HQ' },
];

const jobs = [
  {
    id: 1,
    title: 'Senior Full Stack Engineer',
    department: 'Engineering',
    location: 'Chennai (Hybrid)',
    type: 'Full-time'
  },
  {
    id: 2,
    title: 'AI/ML Researcher - Computer Vision',
    department: 'Engineering',
    location: 'Remote (India)',
    type: 'Full-time'
  },
  {
    id: 3,
    title: 'Partner Success Manager',
    department: 'Sales & Operations',
    location: 'Chennai',
    type: 'Full-time'
  },
  {
    id: 4,
    title: 'Product Marketing Lead',
    department: 'Marketing',
    location: 'Chennai (Hybrid)',
    type: 'Full-time'
  }
];

export function CareersPage() {
  return (
    <div className="pt-32 pb-20 px-4 min-h-screen relative overflow-hidden bg-white dark:bg-gray-950">
      {/* Background Ornaments */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-rose-200/30 dark:bg-rose-900/10 rounded-full blur-[120px]" />
        <div className="absolute top-[40%] left-[-10%] w-[500px] h-[500px] bg-pink-200/30 dark:bg-pink-900/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-24 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-100 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 font-medium mb-6"
          >
            <Rocket className="w-4 h-4" />
            Join the GlowAI Team
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 text-gray-900 dark:text-white tracking-tight"
          >
            Build the future of <br />
            <span className="bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">
              beauty tech.
            </span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10"
          >
            We're a fast-growing team in Chennai on a mission to empower salons and delight clients through cutting-edge AI.
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            onClick={() => document.getElementById('open-roles')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
          >
            View Open Roles
          </motion.button>
        </div>

        {/* Culture & Values */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Values</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">This is what drives us every day.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-8 rounded-3xl shadow-sm hover:shadow-xl hover:shadow-rose-500/5 transition-all"
                >
                  <div className="w-14 h-14 rounded-2xl bg-rose-50 dark:bg-rose-950/30 flex items-center justify-center text-rose-500 mb-6">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{value.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Perks Grid */}
        <div className="bg-gray-50 dark:bg-gray-900/50 rounded-[3rem] p-8 md:p-16 mb-24 border border-gray-100 dark:border-gray-800">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Life at GlowAI</h2>
            <p className="text-gray-600 dark:text-gray-400">We take care of our team so they can focus on doing their best work.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {perks.map((perk, index) => {
              const Icon = perk.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 mx-auto rounded-full bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 flex items-center justify-center text-rose-500 mb-6">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{perk.title}</h4>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{perk.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Open Roles */}
        <div id="open-roles" className="mb-24 scroll-mt-32">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Open Positions</h2>
              <p className="text-gray-600 dark:text-gray-400">Find your next opportunity.</p>
            </div>
            
            <div className="flex gap-2 overflow-x-auto pb-2">
              <button className="px-5 py-2 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-semibold whitespace-nowrap">All Departments</button>
              <button className="px-5 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 text-sm font-medium whitespace-nowrap transition-colors">Engineering</button>
              <button className="px-5 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 text-sm font-medium whitespace-nowrap transition-colors">Marketing</button>
            </div>
          </div>

          <div className="space-y-4">
            {jobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={`/careers/${job.id}`} className="group flex flex-col md:flex-row md:items-center justify-between p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-rose-300 dark:hover:border-rose-700 hover:shadow-lg transition-all">
                  <div className="mb-4 md:mb-0">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-rose-500 transition-colors">{job.title}</h3>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 font-medium">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
                        {job.department}
                      </span>
                      <span>{job.type}</span>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center group-hover:bg-rose-500 group-hover:text-white transition-colors shrink-0">
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-white" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* General Application CTA */}
        <div className="bg-gradient-to-br from-rose-500 to-pink-600 rounded-3xl p-12 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
          <h2 className="text-2xl md:text-3xl font-bold mb-4 relative z-10">Don't see your role?</h2>
          <p className="text-rose-100 mb-8 max-w-xl mx-auto relative z-10">
            We're always looking for talented people. Send us your resume and we'll keep you in mind for future openings.
          </p>
          <button className="px-8 py-3 bg-white text-rose-600 font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all relative z-10">
            Send General Application
          </button>
        </div>

      </div>
    </div>
  );
}
