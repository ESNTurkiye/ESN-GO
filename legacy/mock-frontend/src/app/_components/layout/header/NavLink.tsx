import Link from "next/link";
import type { NavItem } from "./types";

export const NavLink = ({ href, label }: NavItem) => {
    return (
        <Link
            href={href}
            className="font-oswald font-semibold text-sm tracking-wide text-white hover:text-esn-cyan transition-colors duration-300"
        >
            {label}
        </Link>
    );
};
