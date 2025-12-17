import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
// import logo from '../assets/logo.png';
import arrow from '../assets/arrow.svg';
import arrowUp from '../assets/arrow-up.svg';
import logo from '../assets/avaxteam.svg';

const Navbar = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    const location = useLocation();

    // Scroll detection for auto-hide navbar
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Show navbar when scrolling up, hide when scrolling down
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                // Scrolling down & past 100px - hide navbar
                setIsVisible(false);
            } else {
                // Scrolling up or at top - show navbar
                setIsVisible(true);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollY]);

    // Body scroll lock for mobile sidebar
    useEffect(() => {
        const isMobile = window.innerWidth < 768; // md breakpoint

        if (sidebarOpen && isMobile) {
            // Lock scroll on mobile when sidebar is open
            const originalOverflow = document.body.style.overflow;
            const originalPosition = document.body.style.position;
            const originalWidth = document.body.style.width;

            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';

            return () => {
                // Restore scroll when sidebar closes
                document.body.style.overflow = originalOverflow;
                document.body.style.position = originalPosition;
                document.body.style.width = originalWidth;
            };
        }
    }, [sidebarOpen]);

    // Auto-close sidebar and restore scroll on resize to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768 && sidebarOpen) {
                setSidebarOpen(false);
                // Restore scroll
                document.body.style.overflow = '';
                document.body.style.position = '';
                document.body.style.width = '';
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [sidebarOpen]);



    return (
        <>
            <nav
                className={`w-full fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out bg-white text-black ${isVisible ? 'translate-y-0' : '-translate-y-full'
                    }`}
                style={{
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                }}
            >
                {/* Reduced vertical padding on smaller screens; ≥1920px unchanged */}
                <div className="w-full flex items-center justify-between py-4 lt-1024:py-3 lt-768:py-2 px-4 md:px-6 lg:px-8 max-w-site-nav mx-auto"
                >
                    <Link to="/" className="flex items-center bg-black p-4 rounded-full cursor-pointer hover:scale-105 transition-transform duration-200">
                        <img src={logo} alt="team1-logo" width={20} height={20} />
                    </Link>

                    {/* Desktop Tabs */}
                    <div className="hidden md:flex items-center justify-between">
                        {/* Tighter gaps for tabs on smaller breakpoints */}
                        <ul className="flex items-center gap-8 lt-1440:gap-6 lt-1024:gap-4 cursor-pointer text-black">
                            <li><Link to="/about" className={location.pathname === '/about' ? 'font-semibold text-red-400' : 'text-black'}>About</Link></li>
                            <li><Link to="/blog" className={location.pathname === '/blog' ? 'font-semibold text-red-400' : 'text-black'}>Blog</Link></li>
                            <li><Link to="/spotlight" className={location.pathname === '/spotlight' ? 'font-semibold text-red-400' : 'text-black'}>Spotlight</Link></li>
                            <li><Link to="/gallery" className={location.pathname === '/gallery' ? 'font-semibold text-red-400' : 'text-black'}>Gallery</Link></li>
                            <div className="flex gap-2">
                                <li><Link to="/events" className={location.pathname === '/events' ? 'font-semibold text-red-400' : 'text-black'}>Events</Link></li>
                            </div>
                        </ul>
                    </div>

                    {/* Desktop Button - Blank Link */}
                    <div className="hidden md:flex relative">
                        <a
                            href="#"
                            className="group relative flex items-center gap-4 text-2xl lt-1440:text-xl lt-1024:text-lg bg-black text-white px-4 py-3 cursor-pointer z-50 rounded-full border-0 w-fit overflow-hidden transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:scale-105"
                        >
                            {/* Animated Background Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-red-500 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

                            <div className="relative z-10 text-lg lt-1440:text-base lt-1024:text-sm font-semibold">Join the community</div>
                            <img
                                src={arrowUp}
                                alt="arrow"
                                width={30}
                                height={30}
                                className="lt-1440:w-[26px] lt-1440:h-[26px] lt-1024:w-6 lt-1024:h-6 relative z-10 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                            />
                        </a>
                    </div>

                    {/* Hamburger for mobile */}
                    {/* Slightly smaller tap target on very small phones */}
                    <button
                        className="md:hidden flex flex-col justify-center items-center w-10 h-10 lt-480:w-9 lt-480:h-9 focus:outline-none"
                        onClick={() => setSidebarOpen(true)}
                        aria-label="Open sidebar"
                    >
                        <span className="block w-7 h-1 lt-480:w-6 bg-black mb-1 rounded"></span> {/* Shrink bars on very small phones */}
                        <span className="block w-7 h-1 lt-480:w-6 bg-black mb-1 rounded"></span>
                        <span className="block w-7 h-1 lt-480:w-6 bg-black rounded"></span>
                    </button>
                </div>
            </nav>

            {/* Sidebar Overlay - Mobile Only */}
            <div
                className={`md:hidden fixed inset-0 z-[9998] bg-black bg-opacity-60 transition-opacity duration-300 ${sidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setSidebarOpen(false)}
            ></div>

            {/* Sidebar - Mobile Only, Full Width Overlay */}
            <aside
                className={`md:hidden fixed inset-0 h-full w-full bg-white z-[9999] shadow-lg transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <div className="flex justify-end p-6">
                    <button onClick={() => setSidebarOpen(false)} aria-label="Close sidebar">
                        <span className='text-[3rem] lt-768:text-[2.5rem] lt-480:text-[2rem] text-black'>&times;</span>
                    </button>
                </div>
                {/* Reduce nav item spacing and font size as screens shrink */}
                <ul className="flex flex-col gap-8 lt-768:gap-6 lt-480:gap-5 px-8 lt-768:px-6 lt-480:px-5 text-xl lt-768:text-lg lt-480:text-base cursor-pointer text-black">
                    <li onClick={() => setSidebarOpen(false)}><Link to="/about" className={location.pathname === '/about' ? 'font-semibold text-red-400' : 'text-black'}>About</Link></li>
                    <li onClick={() => setSidebarOpen(false)}><Link to="/blog" className={location.pathname === '/blog' ? 'font-semibold text-red-400' : 'text-black'}>Blog</Link></li>
                    <li onClick={() => setSidebarOpen(false)}><Link to="/spotlight" className={location.pathname === '/spotlight' ? 'font-semibold text-red-400' : 'text-black'}>Spotlight</Link></li>
                    <li onClick={() => setSidebarOpen(false)}><Link to="/gallery" className={location.pathname === '/gallery' ? 'font-semibold text-red-400' : 'text-black'}>Gallery</Link></li>
                    <li onClick={() => setSidebarOpen(false)}><Link to="/events" className={location.pathname === '/events' ? 'font-semibold text-red-400' : 'text-black'}>Events</Link></li>
                    <li onClick={() => setSidebarOpen(false)} className="text-black">Games</li>
                    <li onClick={() => setSidebarOpen(false)} className="text-black">Community</li>
                </ul>
                <div className="mt-12 px-8 lt-768:px-6 lt-480:px-5">
                    <a href="#" className="flex items-center gap-4 text-2xl lt-768:text-xl lt-480:text-lg bg-black text-white px-4 py-3 rounded-full w-full justify-center">
                        <span className="text-lg lt-768:text-base lt-480:text-sm">Join the community</span>
                        <img src={arrowUp} alt="arrow" width={30} height={30} className="lt-1440:w-[26px] lt-1440:h-[26px] lt-1024:w-6 lt-1024:h-6" />
                    </a>
                </div>
            </aside>
        </>
    );
};

export default Navbar;
