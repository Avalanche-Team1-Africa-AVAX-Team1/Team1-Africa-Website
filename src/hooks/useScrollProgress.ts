import { useState, useEffect } from 'react';

/**
 * useScrollProgress Hook
 * 
 * Returns the current scroll progress as a percentage (0-100)
 */
export const useScrollProgress = () => {
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrollTop = window.scrollY;

            const totalScrollable = documentHeight - windowHeight;
            const progress = (scrollTop / totalScrollable) * 100;

            setScrollProgress(Math.min(progress, 100));
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return scrollProgress;
};

/**
 * useScrollDirection Hook
 * 
 * Returns 'up' or 'down' based on scroll direction
 */
export const useScrollDirection = () => {
    const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY) {
                setScrollDirection('down');
            } else if (currentScrollY < lastScrollY) {
                setScrollDirection('up');
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    return scrollDirection;
};

/**
 * useScrollPosition Hook
 * 
 * Returns the current scroll position
 */
export const useScrollPosition = () => {
    const [scrollPosition, setScrollPosition] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollPosition(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return scrollPosition;
};
