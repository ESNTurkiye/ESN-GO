"use client";

import { usePathname } from "next/navigation";
import type { RefObject } from "react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

/** Near the document top: bar snaps fully visible */
export const HEADER_TOP_RESET_PX = 28;
/**
 * How far past the hero (by document scroll) before the bar is “in content”
 * and should use the solid surface while still visible.
 */
export const HEADER_HERO_TAIL_PX = 56;

const FALLBACK_HEADER_HEIGHT_PX = 96;

export type SiteHeaderSurface = "overlay" | "solid";

export interface UseSiteHeaderScrollOptions {
    /** When true, the bar stays visible (e.g. mobile drawer open). */
    suppressHide?: boolean;
    /** Measured `<header>` element for height and scroll-linked transform. */
    headerRef: RefObject<HTMLElement | null>;
}

export interface SiteHeaderScrollSnapshot {
    scrollY: number;
    surface: SiteHeaderSurface;
    /** 0 = fully visible, negative = moved up (px). */
    translateYPx: number;
    /** Last measured header height (px). */
    headerHeightPx: number;
    /** Fully off-screen; use for a11y / pointer-events. */
    isHidden: boolean;
    prefersReducedMotion: boolean;
}

function getHeroEl(): HTMLElement | null {
    if (typeof document === "undefined") return null;
    return document.getElementById("hero");
}

function computeSurface(args: {
    hero: HTMLElement | null;
    scrollY: number;
}): SiteHeaderSurface {
    const { hero, scrollY } = args;
    if (!hero) return "solid";
    const pastHero =
        scrollY > hero.offsetHeight - HEADER_HERO_TAIL_PX;
    return pastHero ? "solid" : "overlay";
}

function initialTranslateForScrollY(
    scrollY: number,
    headerHeight: number,
): number {
    if (scrollY < HEADER_TOP_RESET_PX) return 0;
    return -headerHeight;
}

/**
 * Scroll-linked header: `translateY` tracks wheel/touch scroll (down hides, up reveals)
 * within [-headerHeight, 0]. At document top the bar snaps open.
 */
export function useSiteHeaderScroll(
    options: UseSiteHeaderScrollOptions,
): SiteHeaderScrollSnapshot {
    const { suppressHide = false, headerRef } = options;
    const pathname = usePathname();
    const suppressHideRef = useRef(suppressHide);
    suppressHideRef.current = suppressHide;

    const [scrollY, setScrollY] = useState(0);
    const [surface, setSurface] = useState<SiteHeaderSurface>("solid");
    const [translateYPx, setTranslateYPx] = useState(0);
    const [headerHeightPx, setHeaderHeightPx] = useState(
        FALLBACK_HEADER_HEIGHT_PX,
    );
    const [isHidden, setIsHidden] = useState(false);
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    const lastYRef = useRef(0);
    const translateRef = useRef(0);
    const measuredHeightRef = useRef(FALLBACK_HEADER_HEIGHT_PX);
    const prefersReducedMotionRef = useRef(false);
    const rafRef = useRef<number | null>(null);

    useEffect(() => {
        prefersReducedMotionRef.current = prefersReducedMotion;
    }, [prefersReducedMotion]);

    useEffect(() => {
        if (suppressHide) {
            translateRef.current = 0;
            setTranslateYPx(0);
            setIsHidden(false);
        }
    }, [suppressHide]);

    useLayoutEffect(() => {
        void pathname;
        lastYRef.current = window.scrollY;

        const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        const reducedInitial = mq.matches;
        setPrefersReducedMotion(reducedInitial);
        prefersReducedMotionRef.current = reducedInitial;

        const H =
            headerRef.current?.offsetHeight ?? FALLBACK_HEADER_HEIGHT_PX;
        measuredHeightRef.current = H;
        setHeaderHeightPx(H);

        const y0 = lastYRef.current;
        const t0 = reducedInitial
            ? 0
            : initialTranslateForScrollY(y0, H);
        translateRef.current = t0;
        setTranslateYPx(t0);
        setIsHidden(t0 <= -H + 0.5);

        const hero = getHeroEl();
        setScrollY(y0);
        setSurface(computeSurface({ hero, scrollY: y0 }));

        const onMq = () => {
            const reduced = mq.matches;
            setPrefersReducedMotion(reduced);
            prefersReducedMotionRef.current = reduced;
            if (reduced) {
                translateRef.current = 0;
                setTranslateYPx(0);
                setIsHidden(false);
            }
        };
        mq.addEventListener("change", onMq);

        const tick = () => {
            rafRef.current = null;
            const y = window.scrollY;
            const delta = y - lastYRef.current;
            lastYRef.current = y;

            const Hm =
                headerRef.current?.offsetHeight ?? FALLBACK_HEADER_HEIGHT_PX;
            if (Hm !== measuredHeightRef.current) {
                measuredHeightRef.current = Hm;
                setHeaderHeightPx(Hm);
            }

            let t = translateRef.current;

            if (suppressHideRef.current || prefersReducedMotionRef.current) {
                t = 0;
            } else if (y < HEADER_TOP_RESET_PX) {
                t = 0;
            } else {
                t = Math.max(-Hm, Math.min(0, t - delta));
            }

            t = Math.max(-Hm, Math.min(0, t));

            translateRef.current = t;
            setTranslateYPx(t);
            setIsHidden(t <= -Hm + 0.5);

            const hero = getHeroEl();
            setScrollY(y);
            setSurface(computeSurface({ hero, scrollY: y }));
        };

        const onScrollOrResize = () => {
            if (rafRef.current != null) return;
            rafRef.current = window.requestAnimationFrame(tick);
        };

        window.addEventListener("scroll", onScrollOrResize, { passive: true });
        window.addEventListener("resize", onScrollOrResize, { passive: true });
        tick();

        return () => {
            mq.removeEventListener("change", onMq);
            window.removeEventListener("scroll", onScrollOrResize);
            window.removeEventListener("resize", onScrollOrResize);
            if (rafRef.current != null) {
                cancelAnimationFrame(rafRef.current);
            }
        };
    }, [pathname, headerRef]);

    return {
        scrollY,
        surface,
        translateYPx,
        headerHeightPx,
        isHidden,
        prefersReducedMotion,
    };
}