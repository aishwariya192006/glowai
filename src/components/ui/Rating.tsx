import { Star } from 'lucide-react';

interface RatingProps {
  rating: number;
  count?: number;
  showCount?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function Rating({ rating, count, showCount = true, size = 'md' }: RatingProps) {
  const sizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  const textSize = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => {
          const filled = star <= Math.round(rating);
          const halfFilled = !filled && star === Math.ceil(rating) && rating % 1 >= 0.5;

          return (
            <Star
              key={star}
              className={`
                ${sizes[size]}
                ${filled ? 'fill-amber-400 text-amber-400' : ''}
                ${halfFilled ? 'fill-amber-400/50 text-amber-400' : ''}
                ${!filled && !halfFilled ? 'fill-gray-200 text-gray-300 dark:fill-gray-700 dark:text-gray-600' : ''}
              `}
            />
          );
        })}
      </div>
      <span className={`font-semibold text-gray-900 dark:text-white ${textSize[size]}`}>
        {rating.toFixed(1)}
      </span>
      {showCount && count !== undefined && (
        <span className={`text-gray-500 dark:text-gray-400 ${textSize[size]}`}>
          ({count})
        </span>
      )}
    </div>
  );
}
