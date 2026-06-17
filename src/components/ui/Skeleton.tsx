import { motion } from 'framer-motion';

interface SkeletonProps {
  className?: string;
  variant?: 'rect' | 'circle' | 'text';
  width?: string | number;
  height?: string | number;
}

export function Skeleton({ className = '', variant = 'rect', width, height }: SkeletonProps) {
  const baseClasses = 'animate-pulse bg-gray-200 dark:bg-gray-700/50';

  const variantClasses = {
    rect: 'rounded-xl',
    circle: 'rounded-full',
    text: 'rounded h-4',
  };

  const style = {
    width: width || (variant === 'circle' ? height : undefined),
    height: height || (variant === 'text' ? '1rem' : undefined),
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={style}
    />
  );
}

export function SalonCardSkeleton() {
  return (
    <div className="rounded-3xl overflow-hidden bg-white/50 dark:bg-gray-800/50 border border-gray-200/50 dark:border-gray-700/50">
      <Skeleton className="aspect-[4/3] w-full" height={200} />
      <div className="p-6 space-y-3">
        <Skeleton variant="text" className="w-3/4 h-6" />
        <Skeleton variant="text" className="w-1/2 h-4" />
        <div className="flex items-center gap-2">
          <Skeleton variant="circle" className="w-5 h-5" />
          <Skeleton variant="text" className="w-20 h-4" />
        </div>
        <div className="flex gap-2 pt-2">
          <Skeleton className="w-16 h-6 rounded-full" />
          <Skeleton className="w-20 h-6 rounded-full" />
          <Skeleton className="w-14 h-6 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function ServiceCardSkeleton() {
  return (
    <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton variant="text" className="w-40 h-5" />
          <Skeleton variant="text" className="w-20 h-4" />
        </div>
        <div className="text-right space-y-2">
          <Skeleton variant="text" className="w-16 h-6" />
          <Skeleton variant="text" className="w-12 h-4" />
        </div>
      </div>
    </div>
  );
}

export function DashboardStatSkeleton() {
  return (
    <div className="p-4 rounded-2xl bg-white/50 dark:bg-gray-800/50">
      <div className="flex items-center gap-4">
        <Skeleton variant="circle" className="w-12 h-12" />
        <div className="space-y-2">
          <Skeleton variant="text" className="w-20 h-4" />
          <Skeleton variant="text" className="w-16 h-7" />
        </div>
      </div>
    </div>
  );
}

export function TableRowSkeleton({ columns = 4 }: { columns?: number }) {
  return (
    <tr>
      {Array.from({ length: columns }).map((_, i) => (
        <td key={i} className="py-4">
          <Skeleton variant="text" className="h-5" />
        </td>
      ))}
    </tr>
  );
}

export function GallerySkeleton() {
  return (
    <div className="grid grid-cols-3 gap-3">
      <div className="col-span-2 row-span-2">
        <Skeleton className="aspect-video w-full rounded-2xl" height={300} />
      </div>
      <Skeleton className="aspect-square rounded-2xl" />
      <Skeleton className="aspect-square rounded-2xl" />
      <Skeleton className="aspect-square rounded-2xl" />
      <Skeleton className="aspect-square rounded-2xl" />
    </div>
  );
}
