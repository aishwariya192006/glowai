import { MapPin, Phone, Mail, Instagram, Facebook, Twitter } from 'lucide-react';
import { LandingNavbar } from '../components/layout/LandingNavbar';

export function ContactPage() {
  return (
    <div className="landing-page-root w-full min-h-screen bg-transparent font-sans flex flex-col relative overflow-x-hidden">
      
      <LandingNavbar />

      <div className="relative z-10 flex-1 flex flex-col w-full">
        {/* SECTION: CONTACT US */}
        <section className="relative px-4 md:px-8 lg:px-16 py-24 lg:py-32 w-full">
          <div className="max-w-7xl mx-auto z-20 relative">
            <div className="text-center mb-20">
              <h2 className="font-serif text-5xl lg:text-6xl text-[#58323e] mb-6">Get In Touch</h2>
              <p className="text-[#7a6b6b] text-lg lg:text-xl">We'd love to hear from you. Book an appointment or send us a message.</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
              {/* Contact Info */}
              <div className="w-full lg:w-1/3 space-y-10">
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 rounded-full bg-[#ebd3ce] flex items-center justify-center flex-shrink-0 text-[#58323e]">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl text-[#58323e] mb-2">Visit Us</h4>
                    <p className="text-[#7a6b6b] text-base lg:text-lg">Miami, FL 33132<br />United State green park</p>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 rounded-full bg-[#ebd3ce] flex items-center justify-center flex-shrink-0 text-[#58323e]">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl text-[#58323e] mb-2">Call Us</h4>
                    <p className="text-[#7a6b6b] text-base lg:text-lg">+1 (555) 123-4567<br />Mon-Sat: 9am - 8pm</p>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 rounded-full bg-[#ebd3ce] flex items-center justify-center flex-shrink-0 text-[#58323e]">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl text-[#58323e] mb-2">Email Us</h4>
                    <p className="text-[#7a6b6b] text-base lg:text-lg">hello@beautysalon.com</p>
                  </div>
                </div>

                <div className="pt-10 border-t border-[#d6aca9]/50 flex gap-6">
                  <a href="#" className="w-12 h-12 rounded-full border-2 border-[#d6aca9] flex items-center justify-center text-[#58323e] hover:bg-[#58323e] hover:border-[#58323e] hover:text-white transition-all">
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-12 h-12 rounded-full border-2 border-[#d6aca9] flex items-center justify-center text-[#58323e] hover:bg-[#58323e] hover:border-[#58323e] hover:text-white transition-all">
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-12 h-12 rounded-full border-2 border-[#d6aca9] flex items-center justify-center text-[#58323e] hover:bg-[#58323e] hover:border-[#58323e] hover:text-white transition-all">
                    <Twitter className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* Contact Form */}
              <div className="w-full lg:w-2/3">
                <form className="bg-white/50 backdrop-blur-md p-10 lg:p-14 rounded-3xl border border-white/50 shadow-2xl shadow-[#58323e]/10 flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="flex flex-col md:flex-row gap-6">
                    <input type="text" placeholder="Your Name" className="w-full px-6 py-4 rounded-xl bg-white/70 border border-[#d6aca9]/50 focus:outline-none focus:border-[#58323e] text-lg text-[#58323e] placeholder-[#b89592]" />
                    <input type="email" placeholder="Your Email" className="w-full px-6 py-4 rounded-xl bg-white/70 border border-[#d6aca9]/50 focus:outline-none focus:border-[#58323e] text-lg text-[#58323e] placeholder-[#b89592]" />
                  </div>
                  <input type="text" placeholder="Subject" className="w-full px-6 py-4 rounded-xl bg-white/70 border border-[#d6aca9]/50 focus:outline-none focus:border-[#58323e] text-lg text-[#58323e] placeholder-[#b89592]" />
                  <textarea placeholder="Your Message" rows={5} className="w-full px-6 py-4 rounded-xl bg-white/70 border border-[#d6aca9]/50 focus:outline-none focus:border-[#58323e] text-lg text-[#58323e] placeholder-[#b89592] resize-none"></textarea>
                  <button type="submit" className="self-start bg-[#58323e] text-white px-12 py-4 rounded-full text-sm font-bold tracking-widest hover:bg-[#3d222b] transition-colors mt-4 shadow-xl shadow-[#58323e]/20">
                    SEND MESSAGE
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
