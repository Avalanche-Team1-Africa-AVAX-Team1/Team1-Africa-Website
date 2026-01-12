import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

// Import images from assets
import img1 from '../assets/Deon.jpeg';
import img2 from '../assets/DannyYak.jpeg';
import img3 from '../assets/Feezy.jpg';
import img4 from '../assets/testimonial10.jpg';
import img5 from '../assets/community.webp';
import img6 from '../assets/0xchidi.jpg';

const Hero: React.FC = () => {
    return (
        <section className="relative w-full min-h-screen bg-white text-black pt-32 pb-16 md:pt-48 md:pb-24 px-4 md:px-8 overflow-x-hidden">

            {/* -----------------------------------------------------------------
                SVG DEFINITIONS (Optimized for Aspect Ratio Scaling)
                ----------------------------------------------------------------- */}
            <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
                <defs>
                    {/* LEFT TAB FOLDER: Smooth bubble corners, shallow tab */}
                    <clipPath id="folder-left-clip" clipPathUnits="objectBoundingBox">
                        <path d="M 0,0.94 L 0,0.06 Q 0,0 0.06,0 L 0.35,0 C 0.45,0 0.45,0.04 0.55,0.04 L 0.94,0.04 Q 1,0.04 1,0.1 L 1,0.94 Q 1,1 0.94,1 L 0.06,1 Q 0,1 0,0.94 Z" />
                    </clipPath>

                    {/* RIGHT TAB FOLDER: Mirrored */}
                    <clipPath id="folder-right-clip" clipPathUnits="objectBoundingBox">
                        <path d="M 0,0.94 L 0,0.1 Q 0,0.04 0.06,0.04 L 0.45,0.04 C 0.55,0.04 0.55,0 0.65,0 L 0.94,0 Q 1,0 1,0.06 L 1,0.94 Q 1,1 0.94,1 L 0.06,1 Q 0,1 0,0.94 Z" />
                    </clipPath>
                </defs>
            </svg>

            {/* -----------------------------------------------------------------
                HEADER SECTION
                ----------------------------------------------------------------- */}
            <div className="max-w-7xl mx-auto mb-8 md:mb-12 relative">


                <motion.h1
                    className="text-4xl md:text-7xl font-bold text-center tracking-tight leading-[1.1] mb-6 md:mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    Elevate Your Journey<br />
                    With <span className="text-red-600">Avalanche</span> Africa
                </motion.h1>


            </div>

            {/* -----------------------------------------------------------------
                MAIN GRID LAYOUT
                Mobile: 2 Columns (Auto height)
                Desktop: 5 Columns (Fixed 480px height for alignment)
                ----------------------------------------------------------------- */}
            <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-6 h-auto md:h-[480px]">

                {/* COLUMN 1 (Left Stack) */}
                <div className="flex flex-col gap-3 md:gap-4 h-full">
                    {/* Folder Left */}
                    <motion.div
                        className="flex-1 w-full bg-gray-100 relative group overflow-hidden aspect-[4/3] md:aspect-auto"
                        style={{ clipPath: 'url(#folder-left-clip)' }}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 }}
                    >
                        <img src={img2} alt="Deon" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    </motion.div>

                    {/* Standard Rounded */}
                    <motion.div
                        className="w-full bg-gray-100 relative group overflow-hidden rounded-[32px] md:rounded-[48px] aspect-[16/9] md:h-[160px] md:aspect-auto"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <img src={img3} alt="Feezy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    </motion.div>
                </div>

                {/* COLUMN 2 (Mid Left - Tall) */}
                <motion.div
                    className="w-full h-full bg-gray-100 relative group overflow-hidden md:block aspect-[3/4] md:aspect-auto"
                    style={{ clipPath: 'url(#folder-left-clip)' }}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <img src={img4} alt="Builders" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </motion.div>

                {/* COLUMN 3 (Center - Button) 
                    On Mobile: Spans 2 columns to break the grid nicely 
                */}
                <div className="col-span-2 md:col-span-1 flex flex-col justify-end items-center gap-4 h-full mt-4 md:mt-0 order-last md:order-none">
                    {/* Hidden on mobile to save space, or remove 'hidden' to show image above button */}
                    <motion.div
                        className="hidden md:block w-full aspect-square bg-gray-100 relative group overflow-hidden mb-auto rounded-[48px]"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        <img src={img6} alt="0xchidi" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    </motion.div>

                    <motion.a
                        href="https://discord.gg/aZjHtNxEt6"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full md:w-auto bg-black text-white px-8 py-4 rounded-full flex items-center justify-center gap-2 hover:bg-red-700 transition-colors shadow-lg z-10"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Join Community <ArrowUpRight size={18} />
                    </motion.a>
                </div>

                {/* COLUMN 4 (Mid Right - Tall) */}
                <motion.div
                    className="w-full h-full bg-gray-100 relative group overflow-hidden md:block aspect-[3/4] md:aspect-auto"
                    style={{ clipPath: 'url(#folder-right-clip)' }}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <img src={img1} alt="Community" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </motion.div>

                {/* COLUMN 5 (Right Stack) */}
                <div className="flex flex-col gap-3 md:gap-4 h-full">
                    {/* Folder Right */}
                    <motion.div
                        className="w-full bg-gray-100 relative group overflow-hidden aspect-[16/9] md:h-[160px] md:aspect-auto"
                        style={{ clipPath: 'url(#folder-right-clip)' }}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6 }}
                    >
                        <img src={img5} alt="Member" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    </motion.div>

                    {/* Standard Rounded */}
                    <motion.div
                        className="flex-1 w-full bg-gray-100 relative group overflow-hidden rounded-[32px] md:rounded-[48px] aspect-[4/3] md:aspect-auto"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.7 }}
                    >
                        <img src="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=2070&auto=format&fit=crop" alt="Member" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    </motion.div>
                </div>
            </div>


        </section>
    );
};

export default Hero;