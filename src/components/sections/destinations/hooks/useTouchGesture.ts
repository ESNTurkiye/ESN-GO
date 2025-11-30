import { useRef, useCallback } from 'react';

interface UseTouchGestureProps {
    onSwipeLeft: () => void;
    onSwipeRight: () => void;
    minSwipeDistance?: number;
}

interface UseTouchGestureReturn {
    handleTouchStart: (e: React.TouchEvent) => void;
    handleTouchMove: (e: React.TouchEvent) => void;
    handleTouchEnd: () => void;
}

export const useTouchGesture = ({
    onSwipeLeft,
    onSwipeRight,
    minSwipeDistance = 50,
}: UseTouchGestureProps): UseTouchGestureReturn => {
    const touchStartX = useRef<number>(0);
    const touchEndX = useRef<number>(0);

    const handleTouchStart = useCallback((e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
    }, []);

    const handleTouchMove = useCallback((e: React.TouchEvent) => {
        touchEndX.current = e.touches[0].clientX;
    }, []);

    const handleTouchEnd = useCallback(() => {
        const swipeDistance = touchStartX.current - touchEndX.current;

        if (Math.abs(swipeDistance) > minSwipeDistance) {
            if (swipeDistance > 0) {
                onSwipeLeft();
            } else {
                onSwipeRight();
            }
        }
    }, [onSwipeLeft, onSwipeRight, minSwipeDistance]);

    return {
        handleTouchStart,
        handleTouchMove,
        handleTouchEnd,
    };
};