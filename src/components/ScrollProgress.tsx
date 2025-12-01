import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Scroll Progress Indicator
 * 
 * A circular progress indicator that shows scroll percentage.
 * Appears in the top-right corner when user scrolls down.
 * Clicking it scrolls back to top smoothly.
 */
const ScrollProgress = () => {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrollTop = window.scrollY;

            // Calculate scroll percentage
            const totalScrollable = documentHeight - windowHeight;
            const progress = (scrollTop / totalScrollable) * 100;

            setScrollProgress(Math.min(progress, 100));

            // Show indicator after scrolling 100px
            setIsVisible(scrollTop > 100);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial calculation

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    // Circle properties
    const radius = 20;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: -20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: -20 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="fixed top-6 right-6 z-50 cursor-pointer group"
                    onClick={scrollToTop}
                    role="button"
                    aria-label="Scroll to top"
                    tabIndex={0}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            scrollToTop();
                        }
                    }}
                >
                    {/* Outer container with hover effect */}
                    <div className="relative w-14 h-14 flex items-center justify-center">
                        {/* Background circle */}
                        <div className="absolute inset-0 bg-white rounded-full shadow-lg group-hover:shadow-xl transition-shadow duration-300" />

                        {/* SVG Progress Circle */}
                        <svg
                            className="absolute inset-0 w-full h-full -rotate-90"
                            viewBox="0 0 50 50"
                        >
                            {/* Background track */}
                            <circle
                                cx="25"
                                cy="25"
                                r={radius}
                                fill="none"
                                stroke="#E5E7EB"
                                strokeWidth="3"
                            />

                            {/* Progress arc */}
                            <circle
                                cx="25"
                                cy="25"
                                r={radius}
                                fill="none"
                                stroke="#EF4444"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeDasharray={circumference}
                                strokeDashoffset={strokeDashoffset}
                                className="transition-all duration-150 ease-out"
                            />
                        </svg>

                        {/* Up arrow icon */}
                        <motion.div
                            className="relative z-10 text-gray-900"
                            whileHover={{ y: -2 }}
                            transition={{ duration: 0.2 }}
                        >
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <line x1="12" y1="19" x2="12" y2="5" />
                                <polyline points="5 12 12 5 19 12" />
                            </svg>
                        </motion.div>

                        {/* Percentage text (shows on hover) */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileHover={{ opacity: 1, scale: 1 }}
                            className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap pointer-events-none"
                        >
                            {Math.round(scrollProgress)}%
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ScrollProgress;
