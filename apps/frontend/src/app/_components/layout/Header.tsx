"use client";

import { useRef, useState } from "react";
import { cn } from "@/_lib/utils";
import { DesktopNavigation } from "./header/DesktopNavigation";
import { LogoSection } from "./header/LogoSection";
import { MobileMenuButton } from "./header/MobileMenuButton";
import { UtilityBar } from "./header/UtilityBar";
import { useSiteHeaderScroll } from "./header/useSiteHeaderScroll";
import MobileMenu from "./MobileMenu";

export default function Header() {
    const headerRef = useRef<HTMLElement | null>(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { surface, translateYPx, isHidden, prefersReducedMotion } =
        useSiteHeaderScroll({
            suppressHide: mobileMenuOpen,
            headerRef,
        });

    const barHidden = !prefersReducedMotion && isHidden;

    return (
        <header
            ref={headerRef}
            className={cn("fixed inset-x-0 top-0 z-50 border-0")}
            data-header-surface={surface}
        >
            <div
                className={cn(
                    "will-change-transform",
                    !prefersReducedMotion &&
                        "transition-[background-color,box-shadow] duration-300 ease-out",
                    prefersReducedMotion && "transition-colors duration-200",
                    surface === "overlay"
                        ? "bg-transparent shadow-none"
                        : "bg-esn-dark-blue shadow-md",
                )}
                style={
                    prefersReducedMotion
                        ? undefined
                        : {
                              transform: `translate3d(0, ${translateYPx}px, 0)`,
                          }
                }
            >
                <div
                    className={cn(barHidden && "pointer-events-none")}
                    aria-hidden={barHidden}
                >
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
                                    onClick={() =>
                                        setMobileMenuOpen(!mobileMenuOpen)
                                    }
                                />
                            </div>
                        </div>
                    </nav>
                </div>
            </div>

            {mobileMenuOpen && (
                <MobileMenu onClose={() => setMobileMenuOpen(false)} />
            )}
        </header>
    );
}
