import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';

export function LandingNavbar() {
  return (
    <header className="relative z-50 flex items-center justify-between px-4 md:px-8 lg:px-16 py-6 lg:py-8 sticky top-0 bg-[#fdf1ee]/90 backdrop-blur-md border-b border-[#ebd3ce]/30 w-full">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <svg width="40" height="40" viewBox="0 0 100 100" fill="none" stroke="#58323e" strokeWidth="2">
          <circle cx="50" cy="50" r="10" />
          <path d="M50 40 C 60 20, 70 20, 50 40 Z" />
          <path d="M50 40 C 40 20, 30 20, 50 40 Z" />
          <path d="M60 50 C 80 40, 80 30, 60 50 Z" />
          <path d="M60 50 C 80 60, 80 70, 60 50 Z" />
          <path d="M50 60 C 60 80, 70 80, 50 60 Z" />
          <path d="M50 60 C 40 80, 30 80, 50 60 Z" />
          <path d="M40 50 C 20 60, 20 70, 40 50 Z" />
          <path d="M40 50 C 20 40, 20 30, 40 50 Z" />
          <circle cx="50" cy="50" r="40" strokeWidth="1" strokeDasharray="4 4" />
        </svg>
        <span className="font-sans tracking-widest text-[#58323e] text-sm lg:text-base font-bold">LOGO HERE</span>
      </div>

      {/* Navigation Links */}
      <nav className="hidden lg:flex items-center gap-12 text-[#58323e] text-sm tracking-widest font-bold">
        <Link to="/" className="hover:text-black transition-colors">HOME</Link>
        <Link to="/profile" className="hover:text-black transition-colors">PROFILE</Link>
        <Link to="/about" className="hover:text-black transition-colors">ABOUT US</Link>
        <Link to="/contact" className="hover:text-black transition-colors">CONTACTS</Link>
      </nav>

      {/* Search & Auth */}
      <div className="flex items-center gap-6">
        <div className="relative hidden md:block">
          <input 
            type="text" 
            placeholder="Search" 
            className="bg-transparent border border-[#d6aca9] rounded-full pl-5 pr-12 py-2 text-base text-[#58323e] placeholder-[#b89592] outline-none focus:border-[#58323e] w-48 lg:w-64 transition-all"
          />
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#b89592]" />
        </div>
        <div className="flex items-center gap-4 md:border-l md:border-[#d6aca9] md:pl-6">
          <Link to="/login" className="text-[#58323e] text-sm font-bold hover:text-black">LOG IN</Link>
          <Link to="/signup" className="bg-[#58323e] text-white px-6 py-2 rounded-full text-sm font-bold hover:bg-[#3d222b] transition-colors">SIGN UP</Link>
        </div>
      </div>
    </header>
  );
}
