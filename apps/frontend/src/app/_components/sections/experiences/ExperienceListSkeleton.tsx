interface ExperienceListSkeletonProps {
    count?: number;
}

export default function ExperienceListSkeleton({
    count = 12,
}: ExperienceListSkeletonProps) {
    return (
        <div className="mt-6 min-w-0 pr-2">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
                {Array.from({ length: count }).map((_, index) => (
                    <div
                        key={`skeleton-${index}`}
                        className="min-h-[260px] animate-pulse rounded-xl"
                    >
                        <div className="h-32 rounded-xl bg-slate-100" />
                        <div className="mt-4 space-y-2 px-1">
                            <div className="h-5 w-3/4 rounded bg-slate-100" />
                            <div className="h-4 w-full rounded bg-slate-100" />
                            <div className="h-4 w-5/6 rounded bg-slate-100" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
