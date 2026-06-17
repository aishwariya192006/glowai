import { LandingNavbar } from '../components/layout/LandingNavbar';

export function AboutPage() {
  return (
    <div className="landing-page-root w-full min-h-screen bg-transparent font-sans flex flex-col relative overflow-x-hidden">
      
      <LandingNavbar />

      <div className="relative z-10 flex-1 flex flex-col w-full">
        {/* SECTION: ABOUT US */}
        <section className="relative px-4 md:px-8 lg:px-16 py-24 lg:py-32 overflow-hidden w-full">
          <div className="absolute top-1/2 right-10 opacity-30">
            <svg width="150" height="150" viewBox="0 0 100 100" fill="none" stroke="#58323e" strokeWidth="1">
              <circle cx="50" cy="50" r="40" strokeDasharray="5 5" />
              <circle cx="50" cy="50" r="30" />
            </svg>
          </div>
          
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 lg:gap-24 z-20 relative">
            <div className="w-full md:w-1/2">
              <div className="w-full aspect-[4/5] rounded-t-full rounded-bl-full bg-[#ebd3ce] overflow-hidden border-8 border-white/50 shadow-2xl p-2 md:p-3 relative">
                <img src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?q=80&w=800&auto=format&fit=crop" alt="Salon Interior" className="w-full h-full object-cover rounded-t-full rounded-bl-full" />
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="font-serif text-5xl lg:text-6xl text-[#58323e] mb-8">Our Story</h2>
              <p className="text-[#7a6b6b] text-lg lg:text-xl leading-relaxed mb-6">
                Founded in the heart of Miami, we started with a simple belief: beauty is a delicate balance of deep self-care and brilliant artistry. 
              </p>
              <p className="text-[#7a6b6b] text-lg lg:text-xl leading-relaxed mb-12">
                Over the past decade, our dedicated team has crafted a space where you can escape the noise of the city, indulge in premium treatments, and emerge feeling completely renewed.
              </p>
              <div className="flex items-center gap-8 lg:gap-12">
                <div className="flex flex-col">
                  <span className="font-serif text-5xl lg:text-6xl text-[#58323e] mb-2">10+</span>
                  <span className="text-sm lg:text-base font-bold tracking-widest text-[#968285] uppercase">Years Exp</span>
                </div>
                <div className="w-px h-16 bg-[#d6aca9]" />
                <div className="flex flex-col">
                  <span className="font-serif text-5xl lg:text-6xl text-[#58323e] mb-2">5k+</span>
                  <span className="text-sm lg:text-base font-bold tracking-widest text-[#968285] uppercase">Happy Clients</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
