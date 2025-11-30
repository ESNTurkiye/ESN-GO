import { motion } from 'framer-motion';
import { NavLink } from './NavLink';
import { NAV_ITEMS, ANIMATIONS } from './constants';

interface DesktopNavigationProps {
    scrolled: boolean;
}

export const DesktopNavigation = ({ scrolled }: DesktopNavigationProps) => {
    return (
        <motion.div
            {...ANIMATIONS.navigation}
            className="hidden md:flex items-center space-x-8"
        >
            {NAV_ITEMS.map((item) => (
                <NavLink key={item.href} {...item} scrolled={scrolled} />
            ))}
        </motion.div>
    );
};