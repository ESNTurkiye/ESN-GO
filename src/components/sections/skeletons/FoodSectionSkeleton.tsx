import SkeletonCard from '@/components/ui/SkeletonCard';
import Skeleton from '@/components/ui/Skeleton';

export default function FoodSectionSkeleton() {
  return (
    <section className="section-padding bg-[#FFF8F0]" aria-busy="true" aria-label="Loading food section">
      <div className="max-w-7xl mx-auto container-responsive">
        <div className="mb-12 space-y-4">
          <div className="flex items-center gap-3">
            <Skeleton variant="circular" className="w-3 h-3" />
            <Skeleton variant="text" className="w-32 h-4" />
          </div>
          <Skeleton variant="text" className="w-64 h-10" />
          <Skeleton variant="text" className="w-96 h-6" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {[1, 2, 3, 4].map((i) => (
            <SkeletonCard key={i} variant="food" />
          ))}
        </div>
      </div>
    </section>
  );
}

