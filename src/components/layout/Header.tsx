'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { HeaderProps } from './header/types';
import { LogoSection } from './header/LogoSection';
import { DesktopNavigation } from './header/DesktopNavigation';
import { UtilityBar } from './header/UtilityBar';
import { MobileMenuButton } from './header/MobileMenuButton';
import { ANIMATIONS } from './header/constants';

const MobileMenu = dynamic(() => import('./MobileMenu'), {
    ssr: false,
});

export default function Header({ scrolled }: HeaderProps) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <motion.nav
            initial={ANIMATIONS.header.initial}
            animate={ANIMATIONS.header.animate}
            transition={ANIMATIONS.header.transition}
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
                    <LogoSection scrolled={scrolled} />
                    <DesktopNavigation scrolled={scrolled} />
                    <UtilityBar scrolled={scrolled} />
                    <MobileMenuButton
                        isOpen={mobileMenuOpen}
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        scrolled={scrolled}
                    />
                </div>
            </div>

            <AnimatePresence>
                {mobileMenuOpen && <MobileMenu scrolled={scrolled} onClose={() => setMobileMenuOpen(false)} />}
            </AnimatePresence>
        </motion.nav>
    );
}