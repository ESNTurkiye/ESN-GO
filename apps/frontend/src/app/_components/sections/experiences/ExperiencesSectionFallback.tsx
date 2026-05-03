import ExperienceListSkeleton from "./ExperienceListSkeleton";

export default function ExperiencesSectionFallback() {
    return (
        <section className="pt-20 md:pt-24 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-0 items-start">
                <div className="lg:col-span-3 min-w-0 px-4 lg:px-8">
                    <div className="mt-4 h-12 w-full max-w-[380px] animate-pulse rounded-full bg-slate-100" />
                    <div className="mt-4 flex flex-wrap gap-2">
                        <div className="h-10 w-14 animate-pulse rounded-full bg-slate-100" />
                        <div className="h-10 w-20 animate-pulse rounded-full bg-slate-100" />
                        <div className="h-10 w-20 animate-pulse rounded-full bg-slate-100" />
                        <div className="h-10 w-24 animate-pulse rounded-full bg-slate-100" />
                    </div>
                    <ExperienceListSkeleton />
                </div>

                <div className="lg:col-span-2 lg:sticky lg:top-24 lg:h-[calc(100vh-6rem)] self-start">
                    <div className="h-[56vh] lg:h-full animate-pulse bg-slate-100" />
                </div>
            </div>
        </section>
    );
}
