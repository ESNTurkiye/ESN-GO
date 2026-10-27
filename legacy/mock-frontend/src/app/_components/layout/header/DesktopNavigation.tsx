"use client";

import { NAV_ITEMS } from "./constants";
import { NavLink } from "./NavLink";

export const DesktopNavigation = () => {
    return (
        <div className="hidden md:flex items-center space-x-8">
            {NAV_ITEMS.map((item) => (
                <NavLink key={item.href} href={item.href} label={item.label} />
            ))}
        </div>
    );
};
