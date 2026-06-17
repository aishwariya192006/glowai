import { type ReactNode } from 'react';

interface BadgeProps {
  variant?: 'primary' | 'success' | 'warning' | 'error' | 'info';
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
}

export function Badge({ variant = 'primary', children, className = '', icon }: BadgeProps) {
  const variants = {
    primary: 'bg-rose-100 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300',
    success: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300',
    warning: 'bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300',
    error: 'bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-300',
    info: 'bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300',
  };

  return (
    <span
      className={`
        inline-flex items-center gap-1.5
        px-2.5 py-1
        text-xs font-medium
        rounded-full
        ${variants[variant]}
        ${className}
      `}
    >
      {icon}
      {children}
    </span>
  );
}
