import { useState } from 'react';
import logo from '../assets/logo.png';
import arrow from '../assets/arrow.svg';
import arrowUp from '../assets/arrow-up.svg';

const Navbar = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <nav className="w-full">
            <div className="flex items-center justify-between py-4">
                <div className="flex items-center">
                    <img src={logo} alt="team1-logo" width={50} height={50} />
                </div>

                {/* Desktop Tabs */}
                <div className="hidden md:flex items-center justify-between">
                    <ul className="flex items-center gap-8 cursor-pointer">
                        <li>Home</li>
                        <li>About</li>
                        <div className="flex gap-2">
                            <li>Events</li>
                            <img src={arrow} alt="arrow" />
                        </div>
                        <div className="flex gap-2">
                            <li>Games</li>
                            <img src={arrow} alt="arrow" />
                        </div>
                        <div className="flex gap-2">
                            <li>Community</li>
                            <img src={arrow} alt="arrow" />
                        </div>
                    </ul>
                </div>

                {/* Desktop Button */}
                <div className="hidden md:flex items-center gap-4 text-2xl bg-black text-white px-4 py-3 rounded-full w-fit">
                    <div className="text-lg">Join the community</div>
                    <img src={arrowUp} alt="arrow" width={30} height={30} />
                </div>

                {/* Hamburger for mobile */}
                <button
                    className="md:hidden flex flex-col justify-center items-center w-10 h-10 focus:outline-none"
                    onClick={() => setSidebarOpen(true)}
                    aria-label="Open sidebar"
                >
                    <span className="block w-7 h-1 bg-black mb-1 rounded"></span>
                    <span className="block w-7 h-1 bg-black mb-1 rounded"></span>
                    <span className="block w-7 h-1 bg-black rounded"></span>
                </button>
            </div>

            {/* Sidebar Overlay */}
            <div
                className={`fixed inset-0 z-40 bg-black bg-opacity-60 transition-opacity duration-300 ${sidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setSidebarOpen(false)}
            ></div>

            {/* Sidebar */}
            <aside
                className={`fixed top-0 right-0 h-full w-80 max-w-full bg-white z-50 shadow-lg transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <div className="flex justify-end p-6">
                    <button onClick={() => setSidebarOpen(false)} aria-label="Close sidebar">
                        <span className='text-[3rem]'>&times;</span>
                    </button>
                </div>
                <ul className="flex flex-col gap-8 px-8 text-xl cursor-pointer">
                    <li onClick={() => setSidebarOpen(false)}>Home</li>
                    <li onClick={() => setSidebarOpen(false)}>About</li>
                    <li onClick={() => setSidebarOpen(false)}>Events</li>
                    <li onClick={() => setSidebarOpen(false)}>Games</li>
                    <li onClick={() => setSidebarOpen(false)}>Community</li>
                </ul>
                <div className="mt-12 px-8">
                    <button className="flex items-center gap-4 text-2xl bg-black text-white px-4 py-3 rounded-full w-full justify-center">
                        <span className="text-lg">Join the community</span>
                        <img src={arrowUp} alt="arrow" width={30} height={30} />
                    </button>
                </div>
            </aside>
        </nav>
    );
};

export default Navbar;
