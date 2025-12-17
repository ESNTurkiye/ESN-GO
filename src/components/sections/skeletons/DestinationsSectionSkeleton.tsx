import SkeletonCard from '@/components/ui/SkeletonCard';
import Skeleton from '@/components/ui/Skeleton';

export default function DestinationsSectionSkeleton() {
  return (
    <section className="py-20 bg-gray-50" aria-busy="true" aria-label="Loading destinations">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-12 space-y-4">
          <Skeleton variant="text" className="w-64 h-12" />
          <Skeleton variant="text" className="w-96 h-6" />
        </div>
        
        {/* Mobile */}
        <div className="md:hidden flex gap-4 overflow-hidden">
          {[1, 2, 3].map((i) => (
            <SkeletonCard key={i} variant="destination" />
          ))}
        </div>

        {/* Desktop */}
        <div className="hidden md:flex gap-6">
          {[1, 2, 3, 4].map((i) => (
            <SkeletonCard key={i} variant="destination" />
          ))}
        </div>
      </div>
    </section>
  );
}

