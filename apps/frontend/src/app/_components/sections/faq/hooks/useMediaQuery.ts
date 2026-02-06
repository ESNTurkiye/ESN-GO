import { useState, useEffect } from 'react';

export function useMediaQuery(query: string) {
    const [matches, setMatches] = useState(() => {
        if (typeof window !== 'undefined') {
            return window.matchMedia(query).matches;
        }
        return false;
    });

    useEffect(() => {
        const media = window.matchMedia(query);
        
        // Update state if initial value doesn't match current value
        const updateMatches = () => {
            setMatches(media.matches);
        };
        
        // Set initial value
        updateMatches();
        
        // Subscribe to changes
        media.addEventListener("change", updateMatches);
        return () => media.removeEventListener("change", updateMatches);
    }, [query]);

    return matches;
}