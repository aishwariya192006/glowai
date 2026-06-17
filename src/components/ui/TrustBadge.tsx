import { BadgeCheck, Users, GraduationCap, Star, Sparkles } from 'lucide-react';
import { Badge } from './Badge';

interface TrustBadgesProps {
  isVerified?: boolean;
  isWomenOwned?: boolean;
  hasStudentDeals?: boolean;
  rating?: number;
  trustScore?: number;
  isAIRecommended?: boolean;
  size?: 'sm' | 'md';
}

export function TrustBadges({
  isVerified,
  isWomenOwned,
  hasStudentDeals,
  rating,
  trustScore,
  isAIRecommended,
  size = 'sm',
}: TrustBadgesProps) {
  const badges = [];

  if (isVerified) {
    badges.push({
      label: 'Verified',
      icon: BadgeCheck,
      variant: 'success' as const,
    });
  }

  if (isWomenOwned) {
    badges.push({
      label: 'Women-Owned',
      icon: Users,
      variant: 'primary' as const,
    });
  }

  if (hasStudentDeals) {
    badges.push({
      label: 'Student Friendly',
      icon: GraduationCap,
      variant: 'info' as const,
    });
  }

  if (rating && rating >= 4.8) {
    badges.push({
      label: 'Top Rated',
      icon: Star,
      variant: 'warning' as const,
    });
  }

  if (isAIRecommended) {
    badges.push({
      label: 'AI Recommended',
      icon: Sparkles,
      variant: 'primary' as const,
    });
  }

  if (badges.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-1">
      {badges.map((badge, i) => (
        <Badge
          key={i}
          variant={badge.variant}
          className={`${size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-sm px-3 py-1'}`}
          icon={<badge.icon className={size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'} />}
        >
          {badge.label}
        </Badge>
      ))}
    </div>
  );
}

export function TrustScoreBadge({ score, size = 'sm' }: { score: number; size?: 'sm' | 'md' }) {
  const getVariant = () => {
    if (score >= 90) return 'success';
    if (score >= 75) return 'info';
    if (score >= 60) return 'warning';
    return 'error';
  };

  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm';

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-medium ${sizeClasses} ${
        getVariant() === 'success'
          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300'
          : getVariant() === 'info'
            ? 'bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300'
            : getVariant() === 'warning'
              ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300'
              : 'bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-300'
      }`}
    >
      Trust: {score}
    </span>
  );
}
