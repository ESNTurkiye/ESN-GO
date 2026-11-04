"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { isActive, MAIN_NAV } from "@/lib/navigation";

type MainNavProps = {
    className?: string;
    linkClassName?: string;
    onNavigate?: () => void;
    id?: string;
};

/** The active page gets aria-current and an underline (not colour alone). */
export function MainNav({ className, linkClassName, onNavigate, id }: MainNavProps) {
    const pathname = usePathname();

    return (
        <nav aria-label="Main" className={className} id={id}>
            <ul>
                {MAIN_NAV.map((item) => (
                    <li key={item.href}>
                        <Link href={item.href} className={linkClassName} aria-current={isActive(pathname, item.href) ? "page" : undefined} onClick={onNavigate}>
                            {item.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
