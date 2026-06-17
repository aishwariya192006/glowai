import { motion } from 'framer-motion';
import { Search, MapPin, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';

interface SearchBarProps {
  variant?: 'hero' | 'compact';
  className?: string;
}

export function SearchBar({ variant = 'hero', className = '' }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('Chennai');
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/discover?search=${encodeURIComponent(query)}&location=${encodeURIComponent(location)}`);
  };

  if (variant === 'compact') {
    return (
      <div className={`flex items-center gap-2 max-w-md ${className}`}>
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Search salons, services..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-400/50"
          />
        </div>
        <Button variant="primary" size="sm" onClick={handleSearch}>
          Search
        </Button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`max-w-4xl mx-auto ${className}`}
    >
      <div className="backdrop-blur-xl bg-white/90 dark:bg-gray-900/90 border border-white/20 dark:border-gray-700/50 rounded-3xl shadow-2xl shadow-rose-500/10 p-2">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Sparkles className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-rose-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="What are you looking for? (e.g. hair coloring, bridal makeup, facial)"
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border-0 text-base text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-400/30"
            />
          </div>
          <div className="relative sm:w-48">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border-0 text-base text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-400/30 appearance-none"
            >
              <option value="Chennai">Chennai</option>
              <option value="T. Nagar">T. Nagar</option>
              <option value="Adyar">Adyar</option>
              <option value="Anna Nagar">Anna Nagar</option>
              <option value="OMR">OMR</option>
              <option value="Mylapore">Mylapore</option>
            </select>
          </div>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              variant="primary"
              size="lg"
              className="w-full sm:w-auto px-8"
              icon={<Search className="w-5 h-5" />}
              onClick={handleSearch}
            >
              Discover
            </Button>
          </motion.div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
        <span className="text-sm text-gray-500 dark:text-gray-400">Popular:</span>
        {['Bridal Makeup', 'Hair Spa', 'Keratin Treatment', 'Facial', 'Nail Art'].map((tag) => (
          <button
            key={tag}
            onClick={() => navigate(`/discover?search=${encodeURIComponent(tag)}`)}
            className="px-3 py-1 rounded-full text-sm bg-white/50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-300 hover:bg-rose-100 dark:hover:bg-rose-950/50 hover:text-rose-500 transition-colors border border-gray-200/50 dark:border-gray-700/50"
          >
            {tag}
          </button>
        ))}
      </div>
    </motion.div>
  );
}
