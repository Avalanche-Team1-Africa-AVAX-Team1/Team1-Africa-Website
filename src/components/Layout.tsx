import { Outlet } from 'react-router-dom';
import Navbar from './navbar';
import { useState, useEffect } from 'react';
import Preloader from './Preloader';
import ScrollProgress from './ScrollProgress';
import CustomCursor from './CustomCursor';

const Layout = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [showContent, setShowContent] = useState(false);

    // Check if user has already seen the preloader in this session
    useEffect(() => {
        const hasSeenPreloader = sessionStorage.getItem('hasSeenPreloader');
        if (hasSeenPreloader) {
            setIsLoading(false);
            setShowContent(true);
        }
    }, []);

    const handlePreloaderComplete = () => {
        setIsLoading(false);
        // Mark that user has seen the preloader
        sessionStorage.setItem('hasSeenPreloader', 'true');
        // Small delay before showing content for smooth transition
        setTimeout(() => {
            setShowContent(true);
        }, 300);
    };

    return (
        <>
            {isLoading && <Preloader onComplete={handlePreloaderComplete} />}

            {showContent && (
                <div className="cursor-none">
                    {/* Custom Cursor - Site Wide */}
                    <CustomCursor />

                    {/* Scroll Progress Indicator */}
                    <ScrollProgress />

                    {/* Navbar with slightly wider max-width */}
                    <div className="mx-auto w-full max-w-site-nav px-2 md:px-8 relative z-50">
                        <Navbar />
                    </div>

                    <main className="relative z-10 min-h-screen">
                        <Outlet />
                    </main>
                </div>
            )}
        </>
    );
};

export default Layout;
