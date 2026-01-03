import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
    const { pathname } = useLocation();
    const isFirstMount = useRef(true);

    useEffect(() => {
        // Always skip on first mount (page load/refresh)
        if (isFirstMount.current) {
            isFirstMount.current = false;
            return;
        }

        // Only scroll to top on actual navigation between routes
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}
