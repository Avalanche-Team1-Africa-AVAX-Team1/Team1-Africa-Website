import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
    const { pathname } = useLocation();
    const isFirstMount = useRef(true);

    useEffect(() => {
        // Skip scroll on initial mount (page refresh) - only scroll on actual navigation
        if (isFirstMount.current) {
            isFirstMount.current = false;
            return;
        }
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}
