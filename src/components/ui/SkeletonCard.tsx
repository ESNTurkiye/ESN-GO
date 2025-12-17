import Skeleton from './Skeleton';

interface SkeletonCardProps {
  variant?: 'destination' | 'food' | 'instagram';
}

export default function SkeletonCard({ variant = 'destination' }: SkeletonCardProps) {
  if (variant === 'destination') {
    return (
      <div className="shrink-0 w-[85vw] md:w-[26%]">
        <div className="relative aspect-3/4 rounded-2xl overflow-hidden">
          <Skeleton className="w-full h-full" />
          <div className="absolute bottom-0 left-0 right-0 p-6 space-y-3">
            <Skeleton variant="text" className="w-3/4 h-8" />
            <Skeleton variant="text" className="w-full h-4" />
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'food') {
    return (
      <article className="bg-white rounded-2xl overflow-hidden shadow-md">
        <Skeleton className="w-full h-48 sm:h-52" />
        <div className="p-5 sm:p-6 space-y-3">
          <Skeleton variant="text" className="w-3/4 h-6" />
          <Skeleton variant="text" className="w-full h-4" />
          <div className="flex justify-between items-center pt-2">
            <Skeleton variant="text" className="w-12 h-5" />
          </div>
        </div>
      </article>
    );
  }

  if (variant === 'instagram') {
    return (
      <div className="relative aspect-square overflow-hidden rounded-lg">
        <Skeleton className="w-full h-full" />
      </div>
    );
  }

  return null;
}

