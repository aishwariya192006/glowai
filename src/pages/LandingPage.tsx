import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import type { Salon } from '../types';
import { LandingNavbar } from '../components/layout/LandingNavbar';

export function LandingPage() {
  const [salons, setSalons] = useState<Salon[]>([]);

  useEffect(() => {
    loadSalons();
  }, []);

  const loadSalons = async () => {
    try {
      const data = await api.getSalons({ is_verified: true, sort: 'rating', limit: 6 });
      setSalons(data);
    } catch (error) {
      console.error('Failed to load salons:', error);
    }
  };

  return (
    <div className="landing-page-root w-full min-h-screen bg-transparent font-sans flex flex-col relative overflow-x-hidden">
      
      <LandingNavbar />

      <div className="relative z-10 flex-1 flex flex-col w-full">
        {/* SECTION: HOME */}
        <section className="relative flex flex-col lg:flex-row items-center justify-between px-4 md:px-8 lg:px-16 py-12 lg:py-24 min-h-[85vh] w-full">
          
          {/* Small scattered dots bottom left */}
          <div className="absolute bottom-[10%] left-[5%] flex flex-wrap gap-4 w-40 opacity-70 z-10 hidden lg:flex">
            <span className="w-4 h-3 bg-[#968285] rounded-full inline-block"></span>
            <span className="w-5 h-4 bg-[#968285] rounded-full inline-block"></span>
            <span className="w-3 h-3 bg-[#968285] rounded-full inline-block"></span>
            <span className="w-5 h-3 bg-[#968285] rounded-full inline-block"></span>
            <span className="w-6 h-4 bg-[#968285] rounded-full inline-block"></span>
            <span className="w-4 h-4 bg-[#968285] rounded-full inline-block"></span>
          </div>

          {/* Left Text */}
          <div className="w-full lg:w-1/2 lg:pr-16 z-20 flex flex-col justify-center items-start">
            <h1 className="font-serif text-6xl md:text-8xl lg:text-[7rem] text-[#58323e] leading-[1.05] mb-4 tracking-tight">
              GlowAI
            </h1>
            <h2 className="font-sans text-[#58323e] text-xl md:text-2xl lg:text-3xl font-bold tracking-[0.2em] mb-8 italic">
              AI-POWERED BEAUTY
            </h2>
            
            <p className="text-[#7a6b6b] text-base lg:text-lg leading-relaxed max-w-xl mb-10">
              Discover Chennai's finest salons, matched perfectly to your style with the power of Artificial Intelligence. Your personalized beauty journey starts here.
            </p>

            <a href="#about" className="inline-block bg-[#58323e] text-white px-10 py-4 rounded-full text-sm font-bold tracking-widest hover:bg-[#3d222b] transition-colors mb-20 shadow-xl shadow-[#58323e]/20">
              READ MORE
            </a>

            <p className="text-[#968285] text-sm tracking-widest font-medium">
              Chennai, Tamil Nadu, India
            </p>
          </div>

          {/* Right Image */}
          <div className="w-full lg:w-1/2 relative flex items-center justify-center mt-16 lg:mt-0 z-20">
            {/* Circular Image Mask */}
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="w-[90vw] h-[90vw] max-w-[600px] max-h-[600px] rounded-full overflow-hidden shadow-2xl relative z-10 border-[12px] border-[#fdf1ee]"
            >
              <img 
                src="/circle_hero.png" 
                alt="Beauty Portrait" 
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>

          {/* Line Art Flowers (Anchored to Home Hero) */}
          <div className="absolute bottom-[5%] left-[20%] lg:left-[40%] z-20 pointer-events-none opacity-90 scale-75 lg:scale-100">
            <svg width="400" height="350" viewBox="0 0 200 200" fill="none" stroke="#2c1a20" strokeWidth="1.5">
              <path d="M60 120 Q 50 160 30 200" />
              <path d="M45 150 Q 30 140 20 150 Q 35 155 45 150" />
              <path d="M55 170 Q 70 180 80 170 Q 65 165 55 170" />
              <circle cx="60" cy="120" r="10" fill="#fdf1ee" />
              {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => {
                const rad = angle * Math.PI / 180;
                const x1 = 60 + Math.cos(rad) * 10;
                const y1 = 120 + Math.sin(rad) * 10;
                const x2 = 60 + Math.cos(rad) * 25;
                const y2 = 120 + Math.sin(rad) * 25;
                const cx = 60 + Math.cos(rad + 0.2) * 18;
                const cy = 120 + Math.sin(rad + 0.2) * 18;
                return <path key={`f1-${angle}`} d={`M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2} Q ${60 + Math.cos(rad - 0.2) * 18} ${120 + Math.sin(rad - 0.2) * 18} ${x1} ${y1}`} fill="#fdf1ee" />;
              })}
              <path d="M110 80 Q 90 140 70 200" />
              <path d="M95 120 Q 80 115 70 125 Q 85 125 95 120" />
              <path d="M100 160 Q 120 165 130 155 Q 110 155 100 160" />
              <circle cx="110" cy="80" r="12" fill="#fdf1ee" />
              {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(angle => {
                const rad = angle * Math.PI / 180;
                const x1 = 110 + Math.cos(rad) * 12;
                const y1 = 80 + Math.sin(rad) * 12;
                const x2 = 110 + Math.cos(rad) * 30;
                const y2 = 80 + Math.sin(rad) * 30;
                const cx = 110 + Math.cos(rad + 0.15) * 20;
                const cy = 80 + Math.sin(rad + 0.15) * 20;
                return <path key={`f2-${angle}`} d={`M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2} Q ${110 + Math.cos(rad - 0.15) * 20} ${80 + Math.sin(rad - 0.15) * 20} ${x1} ${y1}`} fill="#fdf1ee" />;
              })}
              <path d="M160 140 Q 140 170 120 200" />
              <path d="M145 160 Q 165 155 175 165 Q 155 165 145 160" />
              <path d="M135 180 Q 120 175 110 185 Q 125 185 135 180" />
              <circle cx="160" cy="140" r="8" fill="#fdf1ee" />
              {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => {
                const rad = angle * Math.PI / 180;
                const x1 = 160 + Math.cos(rad) * 8;
                const y1 = 140 + Math.sin(rad) * 8;
                const x2 = 160 + Math.cos(rad) * 20;
                const y2 = 140 + Math.sin(rad) * 20;
                const cx = 160 + Math.cos(rad + 0.2) * 14;
                const cy = 140 + Math.sin(rad + 0.2) * 14;
                return <path key={`f3-${angle}`} d={`M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2} Q ${160 + Math.cos(rad - 0.2) * 14} ${140 + Math.sin(rad - 0.2) * 14} ${x1} ${y1}`} fill="#fdf1ee" />;
              })}
            </svg>
          </div>
        </section>
      </div>
    </div>
  );
}
