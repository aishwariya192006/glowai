import { LandingNavbar } from '../components/layout/LandingNavbar';

export function ProfilePage() {
  return (
    <div className="landing-page-root w-full min-h-screen bg-transparent font-sans flex flex-col relative overflow-x-hidden">
      
      <LandingNavbar />

      <div className="relative z-10 flex-1 flex flex-col w-full">
        {/* SECTION: PROFILE */}
        <section className="relative px-4 md:px-8 lg:px-16 py-24 lg:py-32 w-full">
          <div className="max-w-5xl mx-auto text-center z-20 relative">
            <h2 className="font-serif text-5xl lg:text-6xl text-[#58323e] mb-6">Our Profile</h2>
            <div className="w-24 h-1.5 bg-[#58323e] mx-auto mb-12 rounded-full opacity-50" />
            <p className="text-[#7a6b6b] text-lg lg:text-xl leading-relaxed mb-16 max-w-3xl mx-auto">
              Discover a sanctuary where artistry meets wellness. Our expert stylists and therapists bring years of high-end experience to provide you with an unforgettable transformation.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {[
                { title: "Hair Styling", desc: "Expert cuts, coloring, and styling tailored to your unique facial structure." },
                { title: "Skincare", desc: "Rejuvenating facials and treatments using premium organic products." },
                { title: "Bridal Makeup", desc: "Flawless, long-lasting makeup application for your most special day." }
              ].map((service, i) => (
                <div key={i} className="bg-white/40 backdrop-blur-md p-10 rounded-3xl border border-white/50 shadow-2xl shadow-[#58323e]/5 hover:-translate-y-2 transition-transform duration-300">
                  <h3 className="font-serif text-2xl lg:text-3xl text-[#58323e] mb-4">{service.title}</h3>
                  <p className="text-[#7a6b6b] text-base lg:text-lg leading-relaxed">{service.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
