import Skeleton from '@/components/ui/Skeleton';

interface GenericSectionSkeletonProps {
  backgroundColor?: string;
  minHeight?: string;
}

export default function GenericSectionSkeleton({ 
  backgroundColor = 'bg-white',
  minHeight = 'min-h-[400px]'
}: GenericSectionSkeletonProps) {
  return (
    <section 
      className={`${minHeight} ${backgroundColor} flex items-center justify-center`}
      aria-busy="true"
      aria-label="Loading content"
    >
      <div className="max-w-7xl mx-auto container-responsive w-full space-y-6">
        <Skeleton variant="text" className="w-64 h-12 mx-auto" />
        <Skeleton variant="text" className="w-96 h-6 mx-auto" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          <Skeleton className="w-full h-64 rounded-2xl" />
          <Skeleton className="w-full h-64 rounded-2xl" />
        </div>
      </div>
    </section>
  );
}

