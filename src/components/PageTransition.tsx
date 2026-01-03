import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

interface PageTransitionProps {
    children: React.ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
    const location = useLocation();
    const isFirstMount = useRef(true);

    useEffect(() => {
        // Skip scroll on initial mount (page refresh) - only scroll on actual navigation
        if (isFirstMount.current) {
            isFirstMount.current = false;
            return;
        }
        window.scrollTo(0, 0);
    }, [location.pathname]);

    // Just render children without any wrapper - no transitions
    return <>{children}</>;
}
