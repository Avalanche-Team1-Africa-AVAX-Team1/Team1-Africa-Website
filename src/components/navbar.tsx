import { useState } from 'react';
// import logo from '../assets/logo.png';
import arrow from '../assets/arrow.svg';
import arrowUp from '../assets/arrow-up.svg';
import logo from '../assets/team1logo.png';

const Navbar = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <nav className="w-full">
            {/* Reduced vertical padding on smaller screens; ≥1920px unchanged */}
            <div className="flex items-center justify-between py-4 lt-1024:py-3 lt-768:py-2">
                <div className="flex items-center bg-black rounded-full">
                    <img src={logo} alt="team1-logo" width={50} height={50} />
                </div>

                {/* Desktop Tabs */}
                <div className="hidden md:flex items-center justify-between">
                    {/* Tighter gaps for tabs on smaller breakpoints */}
                    <ul className="flex items-center gap-8 lt-1440:gap-6 lt-1024:gap-4 cursor-pointer">
                        <li>Home</li>
                        <li>About</li>
                        <li>Blog</li>
                        <div className="flex gap-2">
                            <li>Events</li>
                            {/* Shrink arrow icon on smaller screens */}
                            <img src={arrow} alt="arrow" className="lt-1440:w-4 lt-1440:h-4 lt-1024:w-3.5 lt-1024:h-3.5" />
                        </div>
                        <div className="flex gap-2">
                            <li>Games</li>
                            {/* Shrink arrow icon on smaller screens */}
                            <img src={arrow} alt="arrow" className="lt-1440:w-4 lt-1440:h-4 lt-1024:w-3.5 lt-1024:h-3.5" />
                        </div>
                        <div className="flex gap-2">
                            <li>Community</li>
                            {/* Shrink arrow icon on smaller screens */}
                            <img src={arrow} alt="arrow" className="lt-1440:w-4 lt-1440:h-4 lt-1024:w-3.5 lt-1024:h-3.5" />
                        </div>
                    </ul>
                </div>

                {/* Desktop Button */}
                {/* Scale button content down at smaller breakpoints; ≥1920px unchanged */}
                <div className="hidden md:flex items-center gap-4 text-2xl lt-1440:text-xl lt-1024:text-lg bg-black text-white px-4 py-3 rounded-full w-fit">
                    <div className="text-lg lt-1440:text-base lt-1024:text-sm">Join the community</div>
                    {/* Shrink arrow-up icon on smaller screens via CSS width/height */}
                    <img src={arrowUp} alt="arrow" width={30} height={30} className="lt-1440:w-[26px] lt-1440:h-[26px] lt-1024:w-6 lt-1024:h-6" />
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

            {/* Sidebar Overlay */}
            <div
                className={`fixed inset-0 z-40 bg-black bg-opacity-60 transition-opacity duration-300 ${sidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setSidebarOpen(false)}
            ></div>

            {/* Sidebar */}
            {/* Narrower drawer on smaller screens */}
            <aside
                className={`fixed top-0 right-0 h-full w-80 lt-768:w-72 lt-480:w-64 max-w-full bg-white z-50 shadow-lg transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <div className="flex justify-end p-6">
                    <button onClick={() => setSidebarOpen(false)} aria-label="Close sidebar">
                        <span className='text-[3rem] lt-768:text-[2.5rem] lt-480:text-[2rem]'>&times;</span> {/* Smaller close icon on small screens */}
                    </button>
                </div>
                {/* Reduce nav item spacing and font size as screens shrink */}
                <ul className="flex flex-col gap-8 lt-768:gap-6 lt-480:gap-5 px-8 lt-768:px-6 lt-480:px-5 text-xl lt-768:text-lg lt-480:text-base cursor-pointer">
                    <li onClick={() => setSidebarOpen(false)}>Home</li>
                    <li onClick={() => setSidebarOpen(false)}>About</li>
                    <li onClick={() => setSidebarOpen(false)}>Blog</li>
                    <li onClick={() => setSidebarOpen(false)}>Events</li>
                    <li onClick={() => setSidebarOpen(false)}>Games</li>
                    <li onClick={() => setSidebarOpen(false)}>Community</li>
                </ul>
                <div className="mt-12 px-8 lt-768:px-6 lt-480:px-5">{/* Match drawer inner padding on small screens */}
                    <button className="flex items-center gap-4 text-2xl lt-768:text-xl lt-480:text-lg bg-black text-white px-4 py-3 rounded-full w-full justify-center">{/* Scale CTA text on smaller screens */}
                        <span className="text-lg lt-768:text-base lt-480:text-sm">Join the community</span>
                        <img src={arrowUp} alt="arrow" width={30} height={30} className="lt-1440:w-[26px] lt-1440:h-[26px] lt-1024:w-6 lt-1024:h-6" />{/* Shrink icon on small screens */}
                    </button>
                </div>
            </aside>
        </nav>
    );
};

export default Navbar;
