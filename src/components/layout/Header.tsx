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
        <header role="banner">
            {/* Desktop Header */}
            <motion.nav
                initial={ANIMATIONS.header.initial}
                animate={ANIMATIONS.header.animate}
                transition={ANIMATIONS.header.transition}
                className="hidden md:block fixed top-0 left-0 right-0 z-50 bg-esn-dark-blue shadow-md border-b border-esn-dark-blue/80"
                role="navigation"
                aria-label="Main navigation"
            >
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className={`flex justify-between items-center transition-all duration-700 ${
                        scrolled ? 'h-20' : 'h-24'
                    }`}>
                        <LogoSection scrolled={scrolled} />
                        <DesktopNavigation />
                        <UtilityBar />
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Header */}
            <motion.nav
                initial={ANIMATIONS.header.initial}
                animate={ANIMATIONS.header.animate}
                transition={ANIMATIONS.header.transition}
                className="md:hidden fixed top-0 left-0 right-0 z-50 bg-esn-dark-blue shadow-md border-b border-esn-dark-blue/80"
                role="navigation"
                aria-label="Main navigation"
            >
                <div className="flex items-center justify-between h-16 px-4 relative">
                    {/* Invisible spacer for centering */}
                    <div className="w-12" aria-hidden="true"></div>
                    {/* Centered Logo */}
                    <div className="flex-1 flex justify-center">
                        <LogoSection scrolled={false} isMobile={true} />
                    </div>
                    {/* Right-aligned Menu Button */}
                    <div className="w-12 flex justify-end">
                        <MobileMenuButton
                            isOpen={mobileMenuOpen}
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        />
                    </div>
                </div>
            </motion.nav>

            <AnimatePresence>
                {mobileMenuOpen && <MobileMenu onClose={() => setMobileMenuOpen(false)} />}
            </AnimatePresence>
        </header>
    );
}