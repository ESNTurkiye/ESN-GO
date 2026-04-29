import Image from "next/image";
import Link from "next/link";
import type { GuideCategory } from "@/app/_lib/guides/types";

interface GuideHeroProps {
    category: GuideCategory;
}

export default function GuideHero({ category }: GuideHeroProps) {
    return (
        <div className="relative w-full h-48 sm:h-56 md:h-64 rounded-2xl overflow-hidden mb-8 md:mb-10 shadow-lg">
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
                    background: `linear-gradient(to top, ${category.color}ee 0%, ${category.color}88 40%, ${category.color}33 100%)`,
                }}
            />
            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                {/* Breadcrumb */}
                <nav className="mb-3" aria-label="Breadcrumb">
                    <ol className="flex items-center gap-2 text-white/70 text-xs font-lato">
                        <li>
                            <Link
                                href="/"
                                className="hover:text-white transition-colors"
                            >
                                Home
                            </Link>
                        </li>
                        <li aria-hidden="true">/</li>
                        <li>
                            <Link
                                href="/guide/accommodation"
                                className="hover:text-white transition-colors"
                            >
                                Survival Guide
                            </Link>
                        </li>
                        <li aria-hidden="true">/</li>
                        <li className="text-white font-medium">
                            {category.title
                                .replace(" Guide", "")
                                .replace(" Benefits", "")}
                        </li>
                    </ol>
                </nav>

                <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl md:text-4xl" aria-hidden="true">
                        {category.icon}
                    </span>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-oswald font-bold text-white tracking-tight">
                        {category.title}
                    </h1>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 text-white/80 text-xs font-lato">
                        <svg
                            className="w-3.5 h-3.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <span>{category.readTime} min read</span>
                    </div>
                    <span className="px-2 py-0.5 bg-white/20 backdrop-blur-sm text-white text-xs font-oswald font-bold rounded-full">
                        2025 edition
                    </span>
                </div>
            </div>
        </div>
    );
}
