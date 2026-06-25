import { motion } from 'framer-motion';
import { Linkedin, Twitter, Mail, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const executives = [
  {
    name: 'Aisha Rahman',
    role: 'Founder & CEO',
    bio: 'Former beauty industry executive turned tech entrepreneur. Passionate about leveraging AI to empower local businesses in India.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400&h=400',
    social: {
      linkedin: '#',
      twitter: '#',
    }
  },
  {
    name: 'Dr. Siddharth Menon',
    role: 'Co-Founder & CTO',
    bio: 'PhD in Computer Vision. Leading the development of GlowAI\'s proprietary face analysis and personalized recommendation algorithms.',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400&h=400',
    social: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://x.com',
    }
  },
  {
    name: 'Kavya Krishnan',
    role: 'Chief Operations Officer',
    bio: '15+ years scaling marketplaces across Southeast Asia. Obsessed with partner success and operational excellence.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400&h=400',
    social: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://x.com',
    }
  },
  {
    name: 'Arjun Desai',
    role: 'Head of Product',
    bio: 'Designer and product strategist focused on creating intuitive, delightful experiences for both salons and clients.',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400&h=400',
    social: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://x.com',
    }
  }
];

const advisors = [
  {
    name: 'Anita Dongre',
    role: 'Strategic Advisor',
    title: 'Fashion & Lifestyle Icon'
  },
  {
    name: 'Ramesh Srinivasan',
    role: 'Board Member',
    title: 'Ex-VP Engineering, Major Tech Corp'
  },
  {
    name: 'Sarah Chen',
    role: 'Investor & Advisor',
    title: 'Partner, Global Ventures'
  }
];

export function LeadershipPage() {
  return (
    <div className="pt-32 pb-20 px-4 min-h-screen relative overflow-hidden bg-white dark:bg-gray-950">
      {/* Background Ornaments */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-b from-rose-100/50 to-transparent dark:from-rose-900/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-t from-pink-100/50 to-transparent dark:from-pink-900/20 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/4" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-24 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-100 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 font-medium mb-6"
          >
            <Users className="w-4 h-4" />
            Our Leadership
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 text-gray-900 dark:text-white tracking-tight"
          >
            Meet the minds behind <br />
            <span className="bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">
              GlowAI
            </span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-10"
          >
            We are a team of technologists, beauty enthusiasts, and business builders dedicated to revolutionizing the salon industry in India.
          </motion.p>
        </div>

        {/* Executive Team */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Executive Team</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-rose-500 to-pink-500 mx-auto mt-6 rounded-full" />
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {executives.map((exec, index) => (
              <motion.div
                key={exec.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="relative mb-6 rounded-3xl overflow-hidden aspect-square">
                  <img 
                    src={exec.image} 
                    alt={exec.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <div className="flex gap-3">
                      <a href={exec.social.linkedin} className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-blue-600 transition-colors">
                        <Linkedin className="w-5 h-5" />
                      </a>
                      <a href={exec.social.twitter} className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-blue-400 transition-colors">
                        <Twitter className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1 group-hover:text-rose-500 transition-colors">{exec.name}</h3>
                <p className="text-rose-500 font-medium mb-4">{exec.role}</p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
                  {exec.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Board & Advisors */}
        <div className="bg-gray-50 dark:bg-gray-900/50 rounded-[3rem] p-12 md:p-20 border border-gray-100 dark:border-gray-800 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-16">Board & Advisors</h2>
          
          <div className="grid md:grid-cols-3 gap-12">
            {advisors.map((advisor, index) => (
              <motion.div
                key={advisor.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{advisor.name}</h3>
                <p className="text-rose-500 font-medium text-sm mb-1">{advisor.role}</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm">{advisor.title}</p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
