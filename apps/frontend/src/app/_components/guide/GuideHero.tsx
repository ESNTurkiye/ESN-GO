import Image from 'next/image';
import Link from 'next/link';
import { GuideCalendarIcon, GuideCategoryIcon, GuideChevronIcon } from './guide-icons';
import { getGuideLabel, type GuideCategory } from '@/app/_lib/guide-data';

interface GuideHeroProps {
    category: GuideCategory;
}

export default function GuideHero({ category }: GuideHeroProps) {
    return (
        <div className="mb-8 md:mb-10">
            {/* Breadcrumb + Back */}
            <nav className="mb-4 md:mb-5" aria-label="Breadcrumb">
                <ol className="flex flex-wrap items-center gap-2 font-lato text-xs text-gray-500 sm:text-sm">
                    <li>
                        <Link href="/" className="transition-colors hover:text-esn-dark-blue">
                            Home
                        </Link>
                    </li>
                    <li aria-hidden="true">
                        <GuideChevronIcon className="h-3.5 w-3.5" />
                    </li>
                    <li>
                        <Link href="/#erasmus-hacks" className="transition-colors hover:text-esn-dark-blue">
                            Survival Guide
                        </Link>
                    </li>
                    <li aria-hidden="true">
                        <GuideChevronIcon className="h-3.5 w-3.5" />
                    </li>
                    <li className="font-medium text-esn-dark-blue">{getGuideLabel(category.title)}</li>
                </ol>
            </nav>

            {/* Hero görseli — sadece ikonlu pill + başlık */}
            <div className="relative h-56 w-full overflow-hidden rounded-[28px] shadow-lg sm:h-64 md:h-72">
                <Image
                    src={category.heroImage}
                    alt={category.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 70vw"
                    priority
                    quality={80}
                    unoptimized
                />
                <div
                    className="absolute inset-0"
                    style={{
                        background: `linear-gradient(180deg, ${category.color}22 0%, ${category.color}88 48%, ${category.color}ee 100%)`
                    }}
                />

                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                    <div className="mb-3 inline-flex w-fit items-center gap-2.5 rounded-full bg-white/14 px-3.5 py-1.5 backdrop-blur-sm">
                        <GuideCategoryIcon iconKey={category.iconKey} className="h-4 w-4 text-white" />
                        <span className="font-oswald text-[11px] font-bold uppercase tracking-[0.22em] text-white/90">
                            Erasmus Hacks
                        </span>
                    </div>

                    <h1 className="max-w-4xl font-oswald text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
                        {category.title}
                    </h1>
                </div>
            </div>

            {/* Meta şerit — görselin altında, beyaz zeminde okunabilir */}
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 px-1">
                <span className="inline-flex items-center gap-1.5 font-lato text-sm text-gray-500">
                    <GuideCalendarIcon className="h-3.5 w-3.5 shrink-0" />
                    Last updated {category.lastUpdated}
                </span>
            </div>
        </div>
    );
}
