'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../ui/Button';
import ESNTurkiyeLogo from '../logos/ESNTurkiyeLogo';

// Dynamic import for MobileMenu (code splitting for non-critical component)
const MobileMenu = dynamic(() => import('./MobileMenu'), {
  ssr: false,
});

interface HeaderProps {
    scrolled: boolean;
}

export default function Header({ scrolled }: HeaderProps) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
                scrolled
                    ? 'bg-white shadow-md border-b border-gray-200'
                    : 'bg-transparent backdrop-blur-sm'
            }`}
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className={`flex justify-between items-center transition-all duration-500 ${
                    scrolled ? 'h-20' : 'h-28'
                }`}>
                    {/* ESN GO Logo */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <Link
                            href="/"
                            className={`flex items-center transition-all duration-700 ease-out ${
                                scrolled ? 'scale-95' : 'scale-110'
                            }`}
                        >
                            <ESNTurkiyeLogo isScrolled={scrolled} />
                        </Link>
                    </motion.div>

                    {/* Desktop Navigation */}
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="hidden md:flex items-center space-x-8"
                    >
                        <Link href="#destinations" className={`transition-all duration-500 font-oswald font-semibold uppercase text-sm tracking-wide hover:scale-105 ${
                            scrolled ? 'text-esn-dark-blue hover:text-esn-cyan' : 'text-white hover:text-esn-cyan'
                            }`}>
                            Destinations
                        </Link>
                        <Link href="#tips" className={`transition-all duration-500 font-oswald font-semibold uppercase text-sm tracking-wide hover:scale-105 ${
                            scrolled ? 'text-esn-dark-blue hover:text-esn-cyan' : 'text-white hover:text-esn-cyan'
                            }`}>
                            Student Tips
                        </Link>
                        <Link href="#events" className={`transition-all duration-500 font-oswald font-semibold uppercase text-sm tracking-wide hover:scale-105 ${
                            scrolled ? 'text-esn-dark-blue hover:text-esn-cyan' : 'text-white hover:text-esn-cyan'
                            }`}>
                            Events
                        </Link>
                        <Link
                            href="#transport"
                            className={`transition-all duration-500 font-oswald font-semibold uppercase text-sm tracking-wide hover:scale-105 ${
                                scrolled ? 'text-esn-dark-blue hover:text-esn-cyan' : 'text-white hover:text-esn-cyan'
                            }`}
                        >
                            Transport
                        </Link>
                    </motion.div>

                    {/* Utility Icons & CTA */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="hidden md:flex items-center space-x-6"
                    >
                        <Button 
                            variant="icon" 
                            size="md"
                            className={scrolled ? 'text-esn-dark-blue hover:text-esn-cyan' : 'text-white hover:text-esn-cyan'}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </Button>
                        <Button 
                            variant="icon" 
                            size="md"
                            className={scrolled ? 'text-esn-dark-blue hover:text-esn-cyan' : 'text-white hover:text-esn-cyan'}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                            </svg>
                        </Button>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`transition-all duration-500 ${
                                scrolled ? 'scale-95' : 'scale-100'
                            }`}
                        >
                            <Button size="sm" variant="cyan">
                                Get ESNcard
                            </Button>
                        </motion.div>
                    </motion.div>

                    {/* Mobile menu button - Touch-friendly 48x48px hit area per design system */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                    >
                        <Button
                            variant="icon"
                            size="md"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label="Toggle navigation menu"
                            aria-expanded={mobileMenuOpen}
                            aria-controls="mobile-navigation"
                            className={`md:hidden fixed right-4 sm:right-6 top-6 z-50 rounded-2xl touch-target ${
                                scrolled
                                    ? 'bg-esn-dark-blue/10 text-esn-dark-blue hover:bg-esn-dark-blue/20'
                                    : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm'
                            }`}
                        >
                            <motion.svg
                                animate={mobileMenuOpen ? { rotate: 90 } : { rotate: 0 }}
                                transition={{ duration: 0.3 }}
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d={mobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                                />
                            </motion.svg>
                        </Button>
                    </motion.div>
                </div>
            </div>

            {/* Mobile menu - Dynamically imported for code splitting */}
            <AnimatePresence>
                {mobileMenuOpen && <MobileMenu scrolled={scrolled} onClose={() => setMobileMenuOpen(false)} />}
            </AnimatePresence>
        </motion.nav>
    );
}

