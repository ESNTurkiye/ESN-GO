"use client";

import Link from "next/link";
import { useState } from "react";

interface GuideSidebarCategory {
    slug: string;
    title: string;
    icon: string;
    color: string;
}

interface GuideSidebarProps {
    currentSlug: string;
    categories: GuideSidebarCategory[];
}

export default function GuideSidebar({
    currentSlug,
    categories,
}: GuideSidebarProps) {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <>
            {/* Mobile: Collapsible category selector */}
            <div className="lg:hidden mb-6">
                <button
                    type="button"
                    onClick={() => setMobileOpen(!mobileOpen)}
                    className="w-full flex items-center justify-between px-5 py-4 bg-white rounded-2xl shadow-sm border border-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-esn-cyan"
                    aria-expanded={mobileOpen}
                    aria-controls="mobile-guide-nav"
                >
                    <span className="font-oswald font-bold text-esn-dark-blue text-lg">
                        Categories
                    </span>
                    <svg
                        className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${mobileOpen ? "rotate-180" : ""}`}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                    >
                        <path d="m6 9 6 6 6-6" />
                    </svg>
                </button>

                <div
                    id="mobile-guide-nav"
                    className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                        mobileOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                >
                    <div className="overflow-hidden">
                        <nav
                            className="mt-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
                            aria-label="Guide categories"
                        >
                            {categories.map((cat) => {
                                const isActive = cat.slug === currentSlug;
                                return (
                                    <Link
                                        key={cat.slug}
                                        href={`/guide/${cat.slug}`}
                                        onClick={() => setMobileOpen(false)}
                                        className={`flex items-center gap-3 px-5 py-3.5 transition-colors border-b border-gray-50 last:border-b-0 ${
                                            isActive
                                                ? "bg-esn-dark-blue/5 text-esn-dark-blue font-bold"
                                                : "text-gray-600 hover:bg-gray-50 hover:text-esn-dark-blue"
                                        }`}
                                        aria-current={
                                            isActive ? "page" : undefined
                                        }
                                    >
                                        <span
                                            className="text-xl"
                                            aria-hidden="true"
                                        >
                                            {cat.icon}
                                        </span>
                                        <span className="font-lato text-sm">
                                            {cat.title
                                                .replace(" Guide", "")
                                                .replace(" & ", " & ")}
                                        </span>
                                        {isActive && (
                                            <div
                                                className="ml-auto w-2 h-2 rounded-full"
                                                style={{
                                                    backgroundColor: cat.color,
                                                }}
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
            <aside
                className="hidden lg:block sticky top-32 self-start"
                aria-label="Guide categories"
            >
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 w-64">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-oswald text-gray-400 tracking-wider uppercase">
                            survival guide / erasmus hacks
                        </span>
                    </div>

                    <nav className="space-y-1 mt-4">
                        {categories.map((category) => {
                            const isActive = category.slug === currentSlug;
                            return (
                                <Link
                                    key={category.slug}
                                    href={`/guide/${category.slug}`}
                                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                                        isActive
                                            ? "bg-esn-dark-blue text-white shadow-md"
                                            : "text-gray-600 hover:bg-gray-50 hover:text-esn-dark-blue"
                                    }`}
                                    aria-current={isActive ? "page" : undefined}
                                >
                                    <span
                                        className="text-lg"
                                        aria-hidden="true"
                                    >
                                        {category.icon}
                                    </span>
                                    <span
                                        className={`font-lato text-sm ${isActive ? "font-bold" : "font-medium"}`}
                                    >
                                        {category.title
                                            .replace(" Guide", "")
                                            .replace(" Benefits", "")}
                                    </span>
                                </Link>
                            );
                        })}
                    </nav>
                </div>
                <div className="w-64 px-2">
                    <div className="mt-5 pt-5 border-t border-gray-200 flex items-center gap-3 text-gray-600">
                        <div className="relative group">
                            <button
                                type="button"
                                className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 transition-colors hover:text-esn-dark-blue hover:border-esn-dark-blue focus:outline-none focus-visible:ring-2 focus-visible:ring-esn-cyan"
                                aria-label="What is a local buddy?"
                            >
                                <span
                                    className="font-lato text-sm font-bold leading-none"
                                    aria-hidden="true"
                                >
                                    ?
                                </span>
                            </button>

                            <div className="absolute left-0 top-8 z-10 w-56 rounded-xl border border-gray-200 bg-white p-3 shadow-lg opacity-0 pointer-events-none transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100">
                                <p className="font-lato text-xs text-gray-600 leading-relaxed">
                                    Local buddy, deneyimli bir Erasmus ogrencisinin
                                    sehir, universite ve gunluk yasam konularinda
                                    sana birebir destek vermesidir.
                                </p>
                            </div>
                        </div>
                        <span className="font-lato text-xl font-semibold leading-tight">
                            Need a local buddy?
                        </span>
                    </div>
                </div>
            </aside>
        </>
    );
}
