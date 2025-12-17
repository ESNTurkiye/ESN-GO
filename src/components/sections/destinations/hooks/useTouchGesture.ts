import { useRef, useEffect } from 'react';

interface UseTouchGestureProps {
    onSwipeLeft: () => void;
    onSwipeRight: () => void;
    containerRef: React.RefObject<HTMLDivElement | null>; // Changed to accept Ref
    minSwipeDistance?: number;
}

export const useTouchGesture = ({
    onSwipeLeft,
    onSwipeRight,
    containerRef,
    minSwipeDistance = 50,
}: UseTouchGestureProps) => {
    // We store coordinates in refs to avoid re-renders during gestures
    const touchStartX = useRef<number>(0);
    const touchStartY = useRef<number>(0);
    const touchEndX = useRef<number>(0);
    const touchEndY = useRef<number>(0);
    
    // Flags to determine gesture intent
    const isHorizontalSwipe = useRef<boolean>(false);
    const isVerticalScroll = useRef<boolean>(false);

    useEffect(() => {
        const element = containerRef.current;
        if (!element) return;

        const handleTouchStart = (e: TouchEvent) => {
            touchStartX.current = e.touches[0].clientX;
            touchStartY.current = e.touches[0].clientY;
            
            // Reset flags
            isHorizontalSwipe.current = false;
            isVerticalScroll.current = false;
        };

        const handleTouchMove = (e: TouchEvent) => {
            // If we already decided this is a vertical scroll, let the browser handle it
            if (isVerticalScroll.current) return;

            touchEndX.current = e.touches[0].clientX;
            touchEndY.current = e.touches[0].clientY;

            const deltaX = Math.abs(touchEndX.current - touchStartX.current);
            const deltaY = Math.abs(touchEndY.current - touchStartY.current);

            // If we haven't decided the direction yet
            if (!isHorizontalSwipe.current && !isVerticalScroll.current) {
                // Determine direction based on which axis has more movement
                if (deltaX > deltaY && deltaX > 5) {
                    isHorizontalSwipe.current = true;
                } else if (deltaY > deltaX && deltaY > 5) {
                    isVerticalScroll.current = true;
                }
            }

            // If it IS a horizontal swipe, block vertical scroll
            if (isHorizontalSwipe.current) {
                if (e.cancelable) {
                    e.preventDefault(); // This locks the Y axis
                    e.stopPropagation();
                }
            }
        };

        const handleTouchEnd = () => {
            if (isHorizontalSwipe.current) {
                const swipeDistance = touchStartX.current - touchEndX.current;
                
                if (Math.abs(swipeDistance) > minSwipeDistance) {
                    if (swipeDistance > 0) {
                        onSwipeLeft();
                    } else {
                        onSwipeRight();
                    }
                }
            }
            
            // Reset
            isHorizontalSwipe.current = false;
            isVerticalScroll.current = false;
        };

        // Attach with { passive: false } to allow e.preventDefault()
        element.addEventListener('touchstart', handleTouchStart, { passive: true });
        element.addEventListener('touchmove', handleTouchMove, { passive: false });
        element.addEventListener('touchend', handleTouchEnd);

        return () => {
            element.removeEventListener('touchstart', handleTouchStart);
            element.removeEventListener('touchmove', handleTouchMove);
            element.removeEventListener('touchend', handleTouchEnd);
        };
    }, [containerRef, onSwipeLeft, onSwipeRight, minSwipeDistance]);
};