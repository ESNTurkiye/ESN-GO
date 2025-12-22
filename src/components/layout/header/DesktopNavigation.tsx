'use client';

import { NavLink } from './NavLink';
import { NAV_ITEMS } from './constants';
import { useTranslations } from '@/hooks/useTranslations';

export const DesktopNavigation = () => {
    const { t } = useTranslations();
    
    return (
        <div className="hidden md:flex items-center space-x-8">
            {NAV_ITEMS.map((item) => (
                <NavLink 
                    key={item.href} 
                    href={item.href}
                    label={item.translationKey ? t(item.translationKey) : item.label}
                />
            ))}
        </div>
    );
};