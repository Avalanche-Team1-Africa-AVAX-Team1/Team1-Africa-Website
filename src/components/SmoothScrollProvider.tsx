import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface SmoothScrollProviderProps {
    children: ReactNode;
}

/**
 * Global Lenis Smooth Scroll Provider
 * 
 * Implements smooth scrolling across the entire application using Lenis.
 * Respects prefers-reduced-motion for accessibility.
 * 
 * Motion Philosophy:
 * - Smooth scrolling enhances user experience by creating fluid, natural navigation
 * - Subtle parallax creates depth without overwhelming the content
 * - All motion effects gracefully degrade for users who prefer reduced motion
 * 
 * Accessibility Note:
 * Users with vestibular disorders or motion sensitivity can disable animations
 * via their system settings (prefers-reduced-motion). When enabled, this
 * provider will use instant scrolling instead of smooth transitions.
 */
const SmoothScrollProvider = ({ children }: SmoothScrollProviderProps) => {
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        // Only initialize smooth scroll if user hasn't opted out
        if (prefersReducedMotion) {
            console.log('Smooth scroll disabled: user prefers reduced motion');
            return;
        }

        // Initialize Lenis with optimized settings
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
            infinite: false,
        });

        lenisRef.current = lenis;

        // Integrate with GSAP ScrollTrigger
        // This fixes the issue where ScrollTrigger loses track of the scroll position
        lenis.on('scroll', ScrollTrigger.update);

        // Use GSAP's ticker to drive Lenis animations
        // This ensures both run in the same execution frame
        const updateLenis = (time: number) => {
            lenis.raf(time * 1000);
        };

        gsap.ticker.add(updateLenis);

        // Disable lag smoothing to prevent visual stuttering
        gsap.ticker.lagSmoothing(0);

        // Force a resize check to ensure all ScrollTriggers are calculated correctly
        // once the smooth scroller is active
        ScrollTrigger.refresh();

        // Cleanup
        return () => {
            gsap.ticker.remove(updateLenis);
            lenis.destroy();
            lenisRef.current = null;
        };
    }, []);

    // Parallax effect handler using data attributes
    useEffect(() => {
        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (prefersReducedMotion) {
            return;
        }

        const handleScroll = () => {
            const parallaxElements = document.querySelectorAll<HTMLElement>('[data-parallax-speed]');

            parallaxElements.forEach((element) => {
                const speed = parseFloat(element.dataset.parallaxSpeed || '0');
                const rect = element.getBoundingClientRect();
                const scrolled = window.scrollY;
                const elementTop = rect.top + scrolled;
                const windowHeight = window.innerHeight;

                // Only apply parallax when element is in or near viewport
                if (scrolled + windowHeight > elementTop && scrolled < elementTop + rect.height + windowHeight) {
                    const offset = (scrolled - elementTop + windowHeight) * speed;
                    element.style.transform = `translate3d(0, ${offset}px, 0)`;
                }
            });
        };

        // Throttled scroll handler using requestAnimationFrame
        let rafId: number;
        const throttledScroll = () => {
            cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(handleScroll);
        };

        window.addEventListener('scroll', throttledScroll, { passive: true });
        handleScroll(); // Initial calculation

        return () => {
            window.removeEventListener('scroll', throttledScroll);
            cancelAnimationFrame(rafId);
        };
    }, []);

    return <>{children}</>;
};

export default SmoothScrollProvider;
