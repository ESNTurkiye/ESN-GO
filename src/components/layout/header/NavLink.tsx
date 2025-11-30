import Link from 'next/link';
import { NavItem } from './types';

interface NavLinkProps extends NavItem {
    scrolled: boolean;
}

export const NavLink = ({ href, label, scrolled }: NavLinkProps) => {
    return (
        <Link
            href={href}
            className={`transition-all duration-500 font-oswald font-semibold text-sm tracking-wide hover:scale-105 ${
                scrolled ? 'text-esn-dark-blue hover:text-esn-cyan' : 'text-white hover:text-esn-cyan'
            }`}
        >
            {label}
        </Link>
    );
};