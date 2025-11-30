'use client';

import Link from "next/link";
import Image from "next/image";
import Button from "../ui/Button";
import { useState } from "react";

const footerColumns = [
    {
        title: "EXPLORE",
        links: [
            { text: "City Guides", href: "#" },
            { text: "Tour Packages & Trips", href: "#" },
            { text: "Saved Routes (Favorites)", href: "#" },
            { text: "Student Reviews", href: "#" },
        ],
    },
    {
        title: "COMMUNITY & EVENTS",
        links: [
            { text: "Upcoming Events", href: "#" },
            { text: "Local ESN Sections", href: "#" },
            { text: "Erasmus Student Tips", href: "#" },
            { text: "Photo Gallery", href: "#" },
        ],
    },
    {
        title: "STUDENT PERKS",
        links: [
            { text: "Get ESNcard (Discounts)", href: "#" },
            { text: "Travel Deals", href: "#" },
            { text: "Budget Eats Guide", href: "#" },
            { text: "Transport Guide", href: "#" },
        ],
    },
    {
        title: "ESN & PARTNERS",
        links: [
            { text: "About ESN Türkiye", href: "#" },
            { text: "Our Mission", href: "#" },
            { text: "Partner Portal", href: "#" },
            { text: "Careers", href: "#" },
        ],
    },
];

export default function Footer() {
    const [openSection, setOpenSection] = useState<number | null>(null);

    const toggleSection = (index: number) => {
        setOpenSection(openSection === index ? null : index);
    };

    return (
        <footer className="relative bg-[#2E2E2E] text-white" role="contentinfo">
            <div className="relative pt-12 sm:pt-16 pb-8">
                <div className="max-w-7xl mx-auto container-responsive">
                    {/* Newsletter Section */}
                    <div className="mb-12 sm:mb-16 pb-12 sm:pb-16 border-b border-white/10">
                        <div className="max-w-4xl mx-auto text-center">
                            <h3 className="fluid-heading-md font-oswald font-black mb-4 uppercase tracking-tight">
                                STAY IN THE LOOP
                            </h3>
                            <p className="text-white/70 font-lato text-base sm:text-lg mb-6 sm:mb-8">
                                Get weekly tips, event announcements, and exclusive ESNcard deals
                            </p>
                            <form className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center justify-center">
                                <label htmlFor="newsletter-email" className="sr-only">Email address</label>
                                <input
                                    id="newsletter-email"
                                    type="email"
                                    placeholder="Enter your email address"
                                    required
                                    aria-required="true"
                                    className="w-full sm:w-auto sm:min-w-[300px] lg:min-w-[400px] px-5 sm:px-6 py-3 sm:py-4 rounded-full text-[#333333] font-lato bg-white focus:outline-none focus:ring-4 focus:ring-[#EC008C]/30 shadow-[0px_4px_15px_rgba(0,0,0,0.2)] transition-all touch-target"
                                />
                                <Button
                                    size="lg"
                                    type="submit"
                                    className="bg-[#EC008C] hover:bg-[#EC008C]/90 text-white font-bold rounded-full px-6 sm:px-8 py-3 sm:py-4 transition-transform hover:scale-105 whitespace-nowrap shadow-[0px_4px_15px_rgba(236,0,140,0.3)] touch-target"
                                    aria-label="Subscribe to newsletter"
                                >
                                    SUBSCRIBE
                                </Button>
                            </form>
                        </div>
                    </div>

                    {/* Links Section - Collapsible on mobile, grid on desktop */}
                    <nav className="mb-12" aria-label="Footer navigation">
                        {/* Mobile: Collapsible */}
                        <div className="md:hidden space-y-2">
                            {footerColumns.map((column, index) => (
                                <div key={index} className="border-b border-white/10">
                                    <Button
                                        onClick={() => toggleSection(index)}
                                        variant="ghost"
                                        className="w-full flex items-center justify-between py-4 text-left rounded-none! hover:text-white!"
                                        aria-expanded={openSection === index}
                                    >
                                        <h4 className="font-oswald font-bold text-base uppercase text-white tracking-wide">
                                            {column.title}
                                        </h4>
                                        <svg
                                            className={`w-5 h-5 text-white transition-transform ${openSection === index ? 'rotate-180' : ''
                                                }`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </Button>
                                    <div
                                        className={`overflow-hidden transition-all duration-300 ${openSection === index ? 'max-h-96 pb-4' : 'max-h-0'
                                            }`}
                                    >
                                        <ul className="space-y-3 text-white/70 font-lato text-sm">
                                            {column.links.map((link, linkIndex) => (
                                                <li key={linkIndex}>
                                                    <Link href={link.href} className="hover:text-esn-magenta transition-colors block py-1">
                                                        {link.text}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Desktop: Grid */}
                        <div className="hidden md:grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                            {footerColumns.map((column, index) => (
                                <div key={index}>
                                    <h4 className="font-oswald font-bold text-base sm:text-lg mb-3 sm:mb-4 uppercase text-white tracking-wide">
                                        {column.title}
                                    </h4>
                                    <ul className="space-y-2 sm:space-y-3 text-white/70 font-lato text-sm">
                                        {column.links.map((link, linkIndex) => (
                                            <li key={linkIndex}>
                                                <Link href={link.href} className="hover:text-esn-magenta transition-colors touch-target block py-1">
                                                    {link.text}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </nav>

                    {/* Back to Top */}
                    <div className="flex justify-center mb-8">
                        <Button
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            variant="ghost"
                            className="flex items-center gap-2 text-white/70 hover:text-white! transition-colors group"
                            aria-label="Back to top"
                        >
                            <span className="font-lato text-sm uppercase tracking-wider">Back to top</span>
                            <svg
                                className="w-4 h-4 transform group-hover:-translate-y-1 transition-transform"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                            </svg>
                        </Button>
                    </div>

                    {/* Bottom Bar */}
                    <div className="pt-6 sm:pt-8 border-t border-white/10">
                        <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-6">
                            {/* Logo and Branding */}
                            <div className="flex items-center space-x-3 sm:space-x-4">
                                <div className="relative w-10 h-10 sm:w-12 sm:h-12 group">
                                <div className="absolute inset-0 bg-[#EC008C] rounded-xl translate-x-2 translate-y-2 group-hover:translate-x-3 group-hover:translate-y-3 transition-transform" />
                                    <Image
                                        src="/images/logos/web-esn-white.png"
                                        alt="ESN Network logo"
                                        fill
                                        sizes="(max-width: 640px) 40px, 48px"
                                        className="object-contain"
                                    />
                                </div>
                                <div className="text-center lg:text-left">
                                    <div className="text-lg sm:text-xl font-lato font-bold">ESN GO</div>
                                    <div className="text-xs text-oswald text-white/60 tracking-wider">
                                        ESN Türkiye
                                    </div>
                                </div>
                            </div>

                            {/* Social Media */}
                            <div className="flex gap-3" role="navigation" aria-label="Social media links">
                                {/* Instagram */}
                                <Link
                                    href="https://www.instagram.com/esnturkiye"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#EC008C] flex items-center justify-center transition-all"
                                    aria-label="Follow us on Instagram"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                                    </svg>
                                </Link>

                                {/* WhatsApp */}
                                <Link
                                    href="https://wa.me/your-whatsapp-number"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#25D366] flex items-center justify-center transition-all"
                                    aria-label="Contact us on WhatsApp"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                    </svg>
                                </Link>

                                {/* Twitter/X */}
                                <Link
                                    href="https://x.com/ESNTurkey"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-black flex items-center justify-center transition-all"
                                    aria-label="Follow us on X (Twitter)"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                    </svg>
                                </Link>

                                {/* LinkedIn */}
                                <Link
                                    href="https://www.linkedin.com/company/erasmusstudentnetwork-turkey"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#0077B5] flex items-center justify-center transition-all"
                                    aria-label="Follow us on LinkedIn"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                    </svg>
                                </Link>
                            </div>
                        </div>

                        {/* Copyright and Legal */}
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs sm:text-sm text-white/60 font-lato">
                            <div className="text-center md:text-left">
                                © 2025 ESN Network. Students helping students since 1989
                            </div>
                            <nav className="flex flex-wrap justify-center md:justify-end gap-3 sm:gap-4" aria-label="Legal and policy links">
                                <Link href="#" className="hover:text-white transition-colors touch-target py-1">
                                    Terms of Use
                                </Link>
                                <span className="hidden sm:inline" aria-hidden="true">•</span>
                                <Link href="#" className="hover:text-white transition-colors touch-target py-1">
                                    Data Protection & Privacy
                                </Link>
                                <span className="hidden sm:inline" aria-hidden="true">•</span>
                                <Link href="#" className="hover:text-white transition-colors touch-target py-1">
                                    Cookie Policy
                                </Link>
                                <span className="hidden sm:inline" aria-hidden="true">•</span>
                                <Link href="#" className="hover:text-white transition-colors touch-target py-1">
                                    Imprint
                                </Link>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>

            {/* ESN Color Line - Broken/Dashed Style */}
            <div className="w-full h-1 overflow-hidden" role="presentation" aria-hidden="true">
                <div className="flex h-full">
                    {/* Repeat the color pattern multiple times to cover entire screen */}
                    {[...Array(20)].map((_, i) => (
                        <div key={i} className="flex h-full">
                            {/* ESN Cyan */}
                            <div className="w-12 sm:w-16 bg-esn-cyan" />
                            <div className="w-1" />
                            {/* ESN Magenta */}
                            <div className="w-12 sm:w-16 bg-esn-magenta" />
                            <div className="w-1" />
                            {/* ESN Orange */}
                            <div className="w-12 sm:w-16 bg-esn-orange" />
                            <div className="w-1" />
                            {/* ESN Green */}
                            <div className="w-12 sm:w-16 bg-esn-green" />
                            <div className="w-1" />
                            {/* ESN Dark Blue */}
                            <div className="w-12 sm:w-16 bg-esn-dark-blue" />
                            <div className="w-1" />
                        </div>
                    ))}
                </div>
            </div>
        </footer>
    );
}