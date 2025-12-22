import { FAQ_CONFIG } from './constants';

export const getAnimationProps = (
    index: number, 
    activeIndex: number, 
    isMounted: boolean, 
    isDesktop: boolean
) => {
    const isActive = activeIndex === index;
    if (!isMounted) return {};

    if (isDesktop) {
        return { flex: isActive ? FAQ_CONFIG.ACTIVE_FLEX : FAQ_CONFIG.INACTIVE_FLEX };
    } else {
        return { 
            height: isActive ? FAQ_CONFIG.MOBILE_ACTIVE_HEIGHT : FAQ_CONFIG.MOBILE_INACTIVE_HEIGHT 
        };
    }
};

export const handleKeyDown = (
    e: React.KeyboardEvent, 
    onActivate: () => void
) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onActivate();
    }
};