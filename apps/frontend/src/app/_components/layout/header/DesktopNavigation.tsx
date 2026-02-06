'use client';

import { NavLink } from './NavLink';
import { NAV_ITEMS } from './constants';

export const DesktopNavigation = () => {
    return (
        <div className="hidden md:flex items-center space-x-8">
            {NAV_ITEMS.map((item) => (
                <NavLink 
                    key={item.href} 
                    href={item.href}
                    label={item.label}
                />
            ))}
        </div>
    );
};