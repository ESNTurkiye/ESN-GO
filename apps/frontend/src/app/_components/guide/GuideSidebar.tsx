'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { GUIDE_CATEGORIES, getGuideBySlug, getGuideLabel } from '@/app/_lib/guide-data';
import { GuideCategoryIcon } from './guide-icons';

interface GuideSidebarProps {
    currentSlug: string;
}

export default function GuideSidebar({ currentSlug }: GuideSidebarProps) {
    const currentCategory = getGuideBySlug(currentSlug);
    const navRef = useRef<HTMLElement>(null);
    const activeRef = useRef<HTMLAnchorElement>(null);

    useEffect(() => {
        if (navRef.current && activeRef.current) {
            const nav = navRef.current;
            const item = activeRef.current;
            const navCenter = nav.offsetWidth / 2;
            const itemCenter = item.offsetLeft + item.offsetWidth / 2;
            nav.scrollTo({ left: itemCenter - navCenter, behavior: 'instant' });
        }
    }, [currentSlug]);

    return (
        <>
            <div className="sticky top-16 z-40 -mx-4 mb-6 bg-white/95 px-4 pb-3 pt-3 shadow-sm backdrop-blur-sm sm:-mx-6 sm:px-6 lg:hidden">
                {currentCategory && (
                    <div className="mb-3 flex items-center gap-2">
                        <div
                            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
                            style={{ backgroundColor: `${currentCategory.color}20`, color: currentCategory.color }}
                        >
                            <GuideCategoryIcon iconKey={currentCategory.iconKey} className="h-3.5 w-3.5" />
                        </div>
                        <p className="font-lato text-sm text-gray-500">
                            <span className="text-gray-400">Reading: </span>
                            <span className="font-semibold" style={{ color: currentCategory.color }}>
                                {getGuideLabel(currentCategory.title)}
                            </span>
                        </p>
                    </div>
                )}

                {/* Scroll bar */}
                <div className="relative">
                    <nav ref={navRef} className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2.5 sm:-mx-6 sm:px-6" aria-label="Guide categories"
                        style={{ scrollbarWidth: 'none' }}>
                        {GUIDE_CATEGORIES.map((category) => {
                            const isActive = category.slug === currentSlug;
                            return (
                                <Link
                                    key={category.slug}
                                    href={`/guide/${category.slug}`}
                                    ref={isActive ? activeRef : undefined}
                                    onClick={(e) => {
                                        const nav = navRef.current;
                                        const item = e.currentTarget;
                                        if (nav) {
                                            const navCenter = nav.offsetWidth / 2;
                                            const itemCenter = item.offsetLeft + item.offsetWidth / 2;
                                            nav.scrollTo({ left: itemCenter - navCenter, behavior: 'smooth' });
                                        }
                                    }}
                                    className={`flex shrink-0 items-center gap-2 rounded-full border px-3.5 py-2 transition-all duration-200 ${
                                        isActive
                                            ? 'border-transparent text-white shadow-md'
                                            : 'border-gray-200 bg-white text-gray-600 shadow-sm hover:border-gray-300 hover:shadow'
                                    }`}
                                    style={isActive ? { backgroundColor: category.color } : {}}
                                    aria-current={isActive ? 'page' : undefined}
                                >
                                    <GuideCategoryIcon iconKey={category.iconKey} className="h-4 w-4 shrink-0" />
                                    <span className="whitespace-nowrap font-oswald text-sm font-bold">
                                        {getGuideLabel(category.title)}
                                    </span>
                                </Link>
                            );
                        })}
                    </nav>
                </div>
            </div>

            <aside className="sticky top-32 hidden self-start lg:block" aria-label="Guide categories">
                <div className="max-h-[calc(100vh-8rem)] w-72 overflow-y-auto rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">
                    <div className="mb-1 flex items-center justify-between">
                        <span className="text-xs font-oswald uppercase tracking-wider text-gray-400">
                            survival guide / erasmus hacks
                        </span>
                    </div>

                    <nav className="space-y-1 mt-4">
                        {GUIDE_CATEGORIES.map((category) => {
                            const isActive = category.slug === currentSlug;
                            return (
                                <Link
                                    key={category.slug}
                                    href={`/guide/${category.slug}`}
                                    className={`flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-200 ${
                                        isActive
                                            ? 'text-white shadow-md'
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-esn-dark-blue'
                                    }`}
                                    style={isActive ? { backgroundColor: category.color } : {}}
                                    aria-current={isActive ? 'page' : undefined}
                                >
                                    <GuideCategoryIcon iconKey={category.iconKey} className="h-5 w-5 shrink-0" />
                                    <span className={`font-lato text-sm ${isActive ? 'font-bold' : 'font-medium'}`}>
                                        {getGuideLabel(category.title)}
                                    </span>
                                </Link>
                            );
                        })}
                    </nav>

                </div>
            </aside>
        </>
    );
}
