"use client";

import { useState } from "react";
import { DesktopNavigation } from "./header/DesktopNavigation";
import { LogoSection } from "./header/LogoSection";
import { MobileMenuButton } from "./header/MobileMenuButton";
import { UtilityBar } from "./header/UtilityBar";
import MobileMenu from "./MobileMenu";

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 bg-esn-dark-blue shadow-md border-b border-esn-dark-blue/80">
            <nav
                className="hidden md:block"
                aria-label="Main navigation"
            >
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="flex justify-between items-center h-24">
                        <LogoSection />
                        <DesktopNavigation />
                        <UtilityBar />
                    </div>
                </div>
            </nav>

            <nav
                className="md:hidden"
                aria-label="Main navigation"
            >
                <div className="flex items-center justify-between h-16 px-4 relative">
                    <div className="w-12" aria-hidden="true"></div>
                    <div className="flex-1 flex justify-center">
                        <LogoSection isMobile />
                    </div>
                    <div className="w-12 flex justify-end">
                        <MobileMenuButton
                            isOpen={mobileMenuOpen}
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        />
                    </div>
                </div>
            </nav>

            {mobileMenuOpen && (
                <MobileMenu onClose={() => setMobileMenuOpen(false)} />
            )}
        </header>
    );
}
