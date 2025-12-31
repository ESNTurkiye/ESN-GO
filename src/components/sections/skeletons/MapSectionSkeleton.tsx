import Skeleton from '@/components/ui/Skeleton';

export default function MapSectionSkeleton() {
  return (
    <section 
      className="section-padding bg-white" 
      aria-busy="true" 
      aria-label="Loading map"
    >
      <div className="max-w-7xl mx-auto container-responsive">
        <div className="mb-6 space-y-4">
          <Skeleton variant="text" className="w-64 h-10" />
          <Skeleton variant="text" className="w-full max-w-2xl h-6" />
        </div>
        
        {/* Map container skeleton */}
        <div className="border-4 border-gray-200 rounded-xl overflow-hidden shadow-lg">
          <Skeleton className="w-full h-[500px] rounded-lg" />
        </div>

        {/* Legend skeleton */}
        <div className="mt-6 flex flex-wrap gap-4 items-center justify-center">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-2">
              <Skeleton variant="circular" className="w-4 h-4" />
              <Skeleton variant="text" className="w-16 h-4" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

