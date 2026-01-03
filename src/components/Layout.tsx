import { Outlet } from 'react-router-dom';
import Navbar from './navbar';
import Footer from './footer';
import { useState, useCallback, useEffect } from 'react';
import Preloader from './Preloader_Concept1';
import ScrollProgress from './ScrollProgress';
import { motion, AnimatePresence } from 'framer-motion';

const Layout = () => {
    // Initialize state synchronously from sessionStorage to prevent layout flash
    const hasSeenPreloader = typeof window !== 'undefined' && sessionStorage.getItem('hasSeenPreloader');
    const [isLoading, setIsLoading] = useState(!hasSeenPreloader);
    const [transitionFinished, setTransitionFinished] = useState(!!hasSeenPreloader);

    // Dispatch custom event when layout transition completes - components can listen for this
    useEffect(() => {
        if (transitionFinished) {
            // Small delay to ensure DOM has updated
            setTimeout(() => {
                window.dispatchEvent(new CustomEvent('layoutTransitionComplete'));
            }, 100);
        }
    }, [transitionFinished]);

    const handlePreloaderComplete = useCallback(() => {
        // Start the lift animation by setting isLoading to false
        setIsLoading(false);
        sessionStorage.setItem('hasSeenPreloader', 'true');

        // Wait for the animation (1.8s) + small buffer before switching to native layout
        setTimeout(() => {
            setTransitionFinished(true);
        }, 2000);
    }, []);

    return (
        // When transition is finished, we switch to a normal block layout (min-h-screen) 
        // to ensure native window scrolling works perfectly for all content.
        <div className={transitionFinished ? "relative min-h-screen w-full" : "relative overflow-hidden h-screen w-screen flex flex-col"}>

            {/* 
                MEGA-CONTAINER STRATEGY (Active only during loading/transition):
                The Preloader acts as the first item in a flex column.
                The Website follows it.
                When loading is done, we animate the Preloader's marginTop to -100vh.
                This physically drags the Website up into the viewport seamlessly.
            */}

            <AnimatePresence mode='wait' onExitComplete={() => null}>
                {!transitionFinished && (
                    <motion.div
                        className="relative z-50 flex-shrink-0 h-screen w-full"
                        // Only animate exit if we haven't forcibly finished
                        animate={isLoading ? { marginTop: 0 } : { marginTop: '-100vh' }}
                        transition={{ duration: 1.8, ease: [0.76, 0, 0.24, 1] }}
                        key="preloader"
                    >
                        {/* Keep Preloader mounted during the lift animation so its background remains visible */}
                        <Preloader onComplete={handlePreloaderComplete} />

                        {/* If not loading but not finished, this div persists as the 'curtain' moving up */}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <div className={transitionFinished
                ? "relative w-full z-40 bg-white"  // Native Flow: Just a div
                : "flex-shrink-0 h-screen w-full relative z-40 bg-white overflow-hidden" // Locked Flow: Fixed size, no scroll during lift
            }>
                {/* Scroll Progress Indicator */}
                <ScrollProgress />

                {/* Navbar with slightly wider max-width */}
                <div className="mx-auto w-full max-w-site-nav px-2 md:px-8 relative z-50">
                    <Navbar />
                </div>

                <main className="relative z-10 flex-grow pb-10">
                    <Outlet />
                </main>
                <Footer />
            </div>
        </div>
    );
};

export default Layout;