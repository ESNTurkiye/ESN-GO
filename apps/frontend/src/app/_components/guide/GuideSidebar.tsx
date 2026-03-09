'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { GUIDE_CATEGORIES } from '@/app/_lib/guide-data';
import { useState } from 'react';

interface GuideSidebarProps {
    currentSlug: string;
}

export default function GuideSidebar({ currentSlug }: GuideSidebarProps) {
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);

    const currentCategory = GUIDE_CATEGORIES.find(c => c.slug === currentSlug);

    return (
        <>
            {/* Mobile: Collapsible category selector */}
            <div className="lg:hidden mb-6">
                <button
                    onClick={() => setMobileOpen(!mobileOpen)}
                    className="w-full flex items-center justify-between px-5 py-4 bg-white rounded-2xl shadow-sm border border-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-esn-cyan"
                    aria-expanded={mobileOpen}
                    aria-controls="mobile-guide-nav"
                >
                    <div className="flex items-center gap-3">
                        <span className="text-2xl" aria-hidden="true">
                            {currentCategory?.icon}
                        </span>
                        <span className="font-oswald font-bold text-esn-dark-blue text-lg">
                            {currentCategory?.title || 'Categories'}
                        </span>
                    </div>
                    <svg
                        className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${mobileOpen ? 'rotate-180' : ''}`}
                        viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
                    >
                        <path d="m6 9 6 6 6-6" />
                    </svg>
                </button>

                <div
                    id="mobile-guide-nav"
                    className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${mobileOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                        }`}
                >
                    <div className="overflow-hidden">
                        <nav
                            className="mt-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
                            aria-label="Guide categories"
                        >
                            {GUIDE_CATEGORIES.map((cat) => {
                                const isActive = cat.slug === currentSlug;
                                return (
                                    <Link
                                        key={cat.slug}
                                        href={`/guide/${cat.slug}`}
                                        onClick={() => setMobileOpen(false)}
                                        className={`flex items-center gap-3 px-5 py-3.5 transition-colors border-b border-gray-50 last:border-b-0 ${isActive
                                            ? 'bg-esn-dark-blue/5 text-esn-dark-blue font-bold'
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-esn-dark-blue'
                                            }`}
                                        aria-current={isActive ? 'page' : undefined}
                                    >
                                        <span className="text-xl" aria-hidden="true">{cat.icon}</span>
                                        <span className="font-lato text-sm">{cat.title.replace(' Guide', '').replace(' & ', ' & ')}</span>
                                        {isActive && (
                                            <div
                                                className="ml-auto w-2 h-2 rounded-full"
                                                style={{ backgroundColor: cat.color }}
                                            />
                                        )}
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>
                </div>
            </div>

            {/* Desktop: Sticky sidebar */}
            <aside className="hidden lg:block sticky top-28 self-start" aria-label="Guide categories">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 w-64">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-oswald text-gray-400 tracking-wider uppercase">
                            survival guide / erasmus hacks
                        </span>
                    </div>
                    <div className="inline-block px-2.5 py-0.5 bg-esn-cyan/10 text-esn-cyan text-xs font-oswald font-bold rounded-full mb-5">
                        2025 edition
                    </div>

                    {/* Category links */}
                    <nav className="space-y-1">
                        {GUIDE_CATEGORIES.map((cat) => {
                            const isActive = cat.slug === currentSlug;
                            return (
                                <Link
                                    key={cat.slug}
                                    href={`/guide/${cat.slug}`}
                                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${isActive
                                        ? 'bg-esn-dark-blue text-white shadow-md'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-esn-dark-blue'
                                        }`}
                                    aria-current={isActive ? 'page' : undefined}
                                >
                                    <span className="text-lg" aria-hidden="true">{cat.icon}</span>
                                    <span className={`font-lato text-sm ${isActive ? 'font-bold' : 'font-medium'}`}>
                                        {cat.title.replace(' Guide', '').replace(' Benefits', '')}
                                    </span>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Read time */}
                    {currentCategory && (
                        <div className="mt-5 pt-4 border-t border-gray-100">
                            <div className="flex items-center gap-2 text-gray-400 text-xs font-lato">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>{currentCategory.readTime} min read</span>
                            </div>
                        </div>
                    )}
                </div>
            </aside>
        </>
    );
}
