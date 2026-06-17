import { motion } from 'framer-motion';
import { type ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
  animate?: boolean;
}

export function GlassCard({
  children,
  className = '',
  hover = false,
  onClick,
  animate = true,
}: GlassCardProps) {
  const baseClasses = `
    backdrop-blur-xl
    bg-white/70
    dark:bg-gray-900/70
    border
    border-white/20
    dark:border-gray-700/50
    rounded-3xl
    shadow-xl
    shadow-rose-500/5
    dark:shadow-purple-500/5
  `;

  const Wrapper = animate ? motion.div : 'div';

  return (
    <Wrapper
      initial={animate ? { opacity: 0, y: 20 } : undefined}
      animate={animate ? { opacity: 1, y: 0 } : undefined}
      transition={animate ? { duration: 0.4, ease: 'easeOut' } : undefined}
      whileHover={hover ? { scale: 1.02, y: -4 } : undefined}
      onClick={onClick}
      className={`${baseClasses} ${hover ? 'cursor-pointer' : ''} ${className}`}
    >
      {children}
    </Wrapper>
  );
}

export function GlassCardOverlay({ children }: { children: ReactNode }) {
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 flex items-center justify-center p-4">
      {children}
    </div>
  );
}
