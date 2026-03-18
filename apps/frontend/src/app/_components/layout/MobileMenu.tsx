"use client";

import Link from "next/link";
import {
    type RefObject,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { HOME_LINK, NAV_ITEMS } from "./header/constants";

interface MobileMenuProps {
    onClose: () => void;
}

export default function MobileMenu({ onClose }: MobileMenuProps) {
    const menuRef = useRef<HTMLElement>(null);
    const scrollToHref = useRef<string | null>(null);
    const [closing, setClosing] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    useFocusTrap({
        active: true,
        containerRef: menuRef as RefObject<HTMLElement>,
    });

    useEffect(() => {
        const id = requestAnimationFrame(() => setReady(true));
        return () => cancelAnimationFrame(id);
    }, []);

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "";
        };
    }, []);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") setClosing(true);
        };
        window.addEventListener("keydown", handleEscape);
        return () => window.removeEventListener("keydown", handleEscape);
    }, []);

    const handleClose = useCallback(() => {
        setClosing(true);
    }, []);

    const handleTransitionEnd = useCallback(
        (e: React.TransitionEvent) => {
            if (e.target !== menuRef.current || !closing) return;
            onClose();
            const href = scrollToHref.current;
            scrollToHref.current = null;
            if (href) {
                const element = document.querySelector(href);
                if (element)
                    element.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                    });
            }
        },
        [closing, onClose],
    );

    const handleNavClick = useCallback(
        (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
            e.preventDefault();
            scrollToHref.current = href;
            setClosing(true);
        },
        [],
    );

    const overlayOpacity = closing
        ? "opacity-0"
        : ready
          ? "opacity-100"
          : "opacity-0";
    const panelTranslate = closing
        ? "translate-x-full"
        : ready
          ? "translate-x-0"
          : "translate-x-full";

    return (
        <>
            <div
                style={{ zIndex: 998 }}
                className={`fixed inset-0 bg-black/50 backdrop-blur-sm ${overlayClass}`}
                aria-hidden="true"
                onClick={handleClose}
            />

            <aside
                ref={menuRef}
                role="dialog"
                aria-label="Mobile navigation"
                aria-modal="true"
                style={{ zIndex: 999 }}
                className={`fixed top-0 right-0 bottom-0 w-[85vw] max-w-[420px] bg-linear-to-b from-[#2E3192] to-[#1a1d5c] shadow-2xl flex flex-col ${panelClass}`}
                onTransitionEnd={handleTransitionEnd}
            >
                <div className="p-6">
                    <button
                        type="button"
                        onClick={handleClose}
                        aria-label="Close menu"
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white/90 hover:text-white focus-visible:outline-2 focus-visible:outline-white relative z-10"
                    >
                        <svg
                            className="w-6 h-6"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                        >
                            <path d="M18 6 6 18" />
                            <path d="m6 6 12 12" />
                        </svg>
                    </button>
                </div>

                <div className="flex-1 flex flex-col overflow-y-auto">
                    <Link
                        href={HOME_LINK.href}
                        onClick={(e) => handleNavClick(e, HOME_LINK.href)}
                        className="block text-white text-3xl font-oswald font-bold py-6 px-8 hover:bg-white/5 transition-colors focus-visible:outline-2 focus-visible:outline-white"
                    >
                        {HOME_LINK.label}
                    </Link>

                    {NAV_ITEMS.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={(e) => handleNavClick(e, item.href)}
                            className={`${item.mobileBackground ?? "bg-white/10"} text-white text-xl font-oswald font-bold py-5 px-8 flex justify-between items-center hover:brightness-110 transition-colors focus-visible:outline-2 focus-visible:outline-white`}
                        >
                            <span>{item.label}</span>
                            <svg
                                className="w-6 h-6 shrink-0"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2.5}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                            >
                                <path d="m9 18 6-6-6-6" />
                            </svg>
                        </Link>
                    ))}

                    <div className="flex-1 min-h-8" />
                </div>
            </aside>
        </>
    );
}
