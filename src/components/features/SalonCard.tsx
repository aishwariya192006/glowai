import { motion } from 'framer-motion';
import { MapPin, Clock, Heart, ImageIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import type { Salon } from '../../types';
import { GlassCard, Rating, TrustBadges, TrustScoreBadge, Button } from '../ui';

interface SalonCardProps {
  salon: Salon;
  index?: number;
  hasStudentDeals?: boolean;
}

export function SalonCard({ salon, index = 0, hasStudentDeals }: SalonCardProps) {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);

  const priceRange = {
    budget: '₹',
    moderate: '₹₹',
    premium: '₹₹₹',
  };

  const fallbackImage = '/makeup_classes.png';
  
  // Handle field mismatches for older data or missing arrays
  const legacyImageUrl = (salon as any).image || (salon as any).imageUrl || (salon as any).photo || (salon as any).images?.[0];
  
  let primaryImage = salon.logo_url || legacyImageUrl;
  if (salon.gallery_urls) {
    if (Array.isArray(salon.gallery_urls) && salon.gallery_urls.length > 0) {
      primaryImage = salon.gallery_urls[0];
    } else if (typeof salon.gallery_urls === 'string') {
      primaryImage = salon.gallery_urls;
    }
  }
    
  const imageSrc = (!imageError && primaryImage) ? primaryImage : fallbackImage;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="h-full"
    >
      <GlassCard hover className="overflow-hidden group h-full flex flex-col">
        <div 
          className="aspect-[4/3] relative overflow-hidden cursor-pointer bg-gray-100 dark:bg-gray-800"
          onClick={() => navigate(`/salon/${salon.id}`)}
        >
          <img
            src={imageSrc}
            alt={salon.name || 'Salon'}
            onError={() => {
              if (!imageError) {
                console.warn(`Invalid or broken image URL for salon "${salon.name}": ${primaryImage}`);
                setImageError(true);
              }
            }}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <button
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg hover:bg-rose-50 dark:hover:bg-rose-950 transition-colors z-10 group/btn"
          >
            <Heart className="w-4 h-4 text-gray-400 group-hover/btn:text-rose-500 group-hover/btn:fill-rose-500 transition-all" />
          </button>

          {salon.is_verified && (
            <div className="absolute top-4 left-4">
              <span className="px-2.5 py-1 text-xs font-semibold bg-blue-500/90 backdrop-blur-md text-white rounded-full shadow-sm">
                Verified
              </span>
            </div>
          )}
        </div>

        <div className="p-6 flex flex-col flex-1">
          <div className="flex items-start justify-between mb-2">
            <Link to={`/salon/${salon.id}`} className="hover:text-rose-500 transition-colors">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-1">
                {salon.name}
              </h3>
            </Link>
            <div className="text-right shrink-0 ml-2">
              <span className="text-gray-500 dark:text-gray-400 font-medium bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-lg text-sm">
                {priceRange[salon.price_range as keyof typeof priceRange] || '₹₹'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 mb-3">
            <MapPin className="w-4 h-4 text-rose-400" />
            <span className="line-clamp-1">{salon.address}</span>
          </div>

          <div className="mb-4">
            <Rating rating={salon.rating} count={salon.review_count} />
          </div>

          <div className="mb-4 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
            {salon.description}
          </div>

          {salon.features && salon.features.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {salon.features.slice(0, 3).map((feature, idx) => (
                <span key={idx} className="px-2.5 py-1 text-xs font-medium bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-300 rounded-lg border border-rose-100 dark:border-rose-500/20">
                  {feature}
                </span>
              ))}
              {salon.features.length > 3 && (
                <span className="px-2.5 py-1 text-xs font-medium bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 rounded-lg border border-gray-200 dark:border-gray-700">
                  +{salon.features.length - 3}
                </span>
              )}
            </div>
          )}

          <div className="mt-auto">
            <div className="flex items-center justify-between py-3 mb-4 border-y border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
                <Clock className="w-4 h-4 text-gray-400" />
                <span>
                  {salon.opening_time} - {salon.closing_time}
                </span>
              </div>
              <TrustScoreBadge score={salon.trust_score} />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button 
                variant="outline" 
                onClick={() => navigate(`/salon/${salon.id}`)}
                className="w-full justify-center group-hover:border-rose-200 dark:group-hover:border-rose-800 transition-colors"
              >
                View Details
              </Button>
              <Button 
                variant="primary" 
                onClick={() => navigate(`/booking/${salon.id}`)}
                className="w-full justify-center"
              >
                Book Now
              </Button>
            </div>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}
