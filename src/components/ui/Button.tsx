import { motion } from 'framer-motion';
import { type ReactNode, type ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: ReactNode;
  loading?: boolean;
  children: ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  icon,
  loading,
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const variants = {
    primary: `
      bg-gradient-to-r from-rose-400 to-pink-500
      hover:from-rose-500 hover:to-pink-600
      text-white
      shadow-lg shadow-rose-500/30
      hover:shadow-xl hover:shadow-rose-500/40
    `,
    secondary: `
      bg-gradient-to-r from-gray-100 to-gray-200
      dark:from-gray-800 dark:to-gray-700
      hover:from-gray-200 hover:to-gray-300
      dark:hover:from-gray-700 dark:hover:to-gray-600
      text-gray-800 dark:text-white
    `,
    outline: `
      border-2 border-rose-400
      text-rose-500
      hover:bg-rose-50
      dark:hover:bg-rose-950/30
    `,
    ghost: `
      text-gray-700 dark:text-gray-300
      hover:bg-gray-100 dark:hover:bg-gray-800
    `,
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm rounded-xl',
    md: 'px-6 py-3 text-base rounded-2xl',
    lg: 'px-8 py-4 text-lg rounded-3xl',
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={`
        ${variants[variant]}
        ${sizes[size]}
        font-semibold
        inline-flex items-center justify-center gap-2
        transition-all duration-300
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <svg
          className="animate-spin h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.37 0 0 5.37 0 12h4z"
          />
        </svg>
      ) : (
        <>
          {icon}
          {children}
        </>
      )}
    </motion.button>
  );
}
