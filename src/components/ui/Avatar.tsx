import { type ReactNode } from 'react';

interface AvatarProps {
  src?: string;
  alt?: string;
  name?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function Avatar({ src, alt, name, size = 'md', className = '' }: AvatarProps) {
  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-base',
    xl: 'w-20 h-20 text-lg',
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (src) {
    return (
      <img
        src={src}
        alt={alt || name}
        className={`${sizes[size]} rounded-full object-cover ring-2 ring-white dark:ring-gray-800 shadow-lg ${className}`}
      />
    );
  }

  return (
    <div
      className={`
        ${sizes[size]}
        rounded-full
        bg-gradient-to-br from-rose-400 to-pink-500
        flex items-center justify-center
        text-white font-bold
        ring-2 ring-white dark:ring-gray-800
        shadow-lg
        ${className}
      `}
    >
      {name ? getInitials(name) : '?'}
    </div>
  );
}

interface StatCardProps {
  icon: ReactNode;
  label: string;
  value: string | number;
  trend?: 'up' | 'down' | 'stable';
  trendValue?: string;
  className?: string;
}

export function StatCard({ icon, label, value, trend, trendValue, className = '' }: StatCardProps) {
  return (
    <div className={`flex items-center gap-4 p-4 ${className}`}>
      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-100 to-pink-100 dark:from-rose-950/50 dark:to-pink-950/50 flex items-center justify-center text-rose-500">
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
        <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
        {trend && trendValue && (
          <p
            className={`text-xs ${
              trend === 'up'
                ? 'text-emerald-500'
                : trend === 'down'
                  ? 'text-red-500'
                  : 'text-gray-500'
            }`}
          >
            {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'} {trendValue}
          </p>
        )}
      </div>
    </div>
  );
}
