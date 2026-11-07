/** Main menu: the same three sections on every page (standard: Geri bildirim, Zihin haritası). */
export const MAIN_NAV = [
    { href: "/destinations", label: "Destinations" },
    { href: "/explore", label: "Explore!" },
    { href: "/erasmus-hacks", label: "Erasmus Hacks" },
] as const;

export function isActive(pathname: string, href: string) {
    return pathname === href || pathname.startsWith(`${href}/`);
}
