import Skeleton from '@/components/ui/Skeleton';

export default function VibeSelectorSkeleton() {
  return (
    <section className="section-padding bg-white" aria-busy="true" aria-label="Loading vibe selector">
      <div className="max-w-7xl mx-auto container-responsive">
        <div className="text-center mb-12 space-y-4">
          <Skeleton variant="text" className="w-64 h-12 mx-auto" />
          <Skeleton variant="text" className="w-96 h-6 mx-auto" />
        </div>

        <div className="mb-16">
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="w-24 h-12 rounded-full" />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
          <div className="lg:col-span-7">
            <Skeleton className="w-full h-[400px] sm:h-[500px] rounded-2xl" />
          </div>
          <div className="lg:col-span-5 space-y-4 sm:space-y-6">
            <Skeleton className="w-full h-48 sm:h-60 rounded-2xl" />
            <Skeleton className="w-full h-48 sm:h-60 rounded-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}

