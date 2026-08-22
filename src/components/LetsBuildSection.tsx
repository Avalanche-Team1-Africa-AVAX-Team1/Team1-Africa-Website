import { useState, useRef, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaPlay } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';

// Import images
import community1 from '../assets/community-sm.webp';
import ghana1 from '../assets/ghana1-sm.webp';
import south1 from '../assets/south1-sm.webp';

// Import video
import mainVideo from '../assets/videos/video-web.mp4';
import mainVideoPoster from '../assets/videos/video-poster.webp';

gsap.registerPlugin(ScrollTrigger);

const LetsBuildSection = () => {
    const [videoOpen, setVideoOpen] = useState(false);
    const horizontalContainerRef = useRef<HTMLElement>(null);
    const horizontalWrapperRef = useRef<HTMLDivElement>(null);

    const activities = [
        {
            title: "Gamified Learning",
            description: "Interactive Web3 education through challenges, quests, and rewards that make blockchain development engaging and accessible.",
            mainImage: community1,
            thumbnail: community1,
            cta: "Start Learning"
        },
        {
            title: "University Programs",
            description: "Partnering with African universities to integrate Avalanche development into computer science curricula.",
            mainImage: ghana1,
            thumbnail: ghana1,
            cta: "Partner With Us"
        },
        {
            title: "Hackathons & Bootcamps",
            description: "Intensive building experiences where ideas transform into production-ready dApps on Avalanche.",
            mainImage: south1,
            thumbnail: south1,
            cta: "Build With Us"
        }
    ];

    // GSAP Horizontal Scroll
    useLayoutEffect(() => {
        const element = horizontalContainerRef.current;
        const wrapper = horizontalWrapperRef.current;
        if (!element || !wrapper) return;

        // Calculate scroll distance dynamically based on content width
        const totalWidth = wrapper.scrollWidth;
        const scrollDistance = totalWidth - window.innerWidth;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: element,
                pin: true,
                scrub: 1,
                end: () => `+=${scrollDistance}`,
                invalidateOnRefresh: true,
            }
        });

        tl.to(wrapper, {
            x: () => -scrollDistance,
            ease: 'none',
        });

        return () => {
            tl.scrollTrigger?.kill();
            tl.kill();
        };
    }, []);

    return (
        <>
            {/* VIDEO MODAL */}
            <AnimatePresence>
                {videoOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/95 z-[9999] flex items-center justify-center p-4"
                        onClick={() => setVideoOpen(false)}
                    >
                        <button
                            onClick={() => setVideoOpen(false)}
                            className="absolute top-8 right-8 text-white hover:text-red-500 transition-colors z-10"
                        >
                            <IoClose size={40} />
                        </button>
                        <motion.div
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.8 }}
                            className="w-full max-w-6xl aspect-video"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <video
                                src={mainVideo}
                                controls
                                autoPlay
                                preload="none"
                                poster={mainVideoPoster}
                                className="w-full h-full rounded-2xl"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* WHAT WE DO SECTION - HORIZONTAL SCROLL (Desktop 1200px+) */}
            <div className="hidden laptop:block">
                <section ref={horizontalContainerRef} className="h-screen overflow-hidden bg-white text-black relative">
                    <div className="absolute top-12 lg:top-16 left-8 lg:left-12 z-20 hidden xl:block text-left">
                        <div className="w-16 lg:w-20 h-1 bg-red-600 mb-4" />
                        <h2 className="font-black" style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)' }}>How We Show Up</h2>
                    </div>

                    {/* Wrapper with gap and padding for significant peek effect */}
                    <div ref={horizontalWrapperRef} className="flex h-full w-max gap-12 px-12 items-center">
                        {activities.map((activity, index) => (
                            <div key={index} className="w-[65vw] h-full flex items-center justify-center horizontal-item flex-shrink-0">
                                {/* CARD CONTAINER - Black Card on White Background */}
                                <div className="w-full h-[65vh] min-h-[500px] bg-black text-white rounded-[3rem] overflow-hidden flex relative shadow-2xl">
                                    {/* Left: Image (45%) */}
                                    <div className="w-[45%] h-full relative border-r border-white/5">
                                        <img
                                            src={activity.mainImage}
                                            alt={activity.title}
                                            className="w-full h-full object-cover opacity-60"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/20 to-black/80" />
                                    </div>

                                    {/* Right: Content (55%) */}
                                    <div className="w-[55%] h-full flex flex-col justify-center px-8 lg:px-12 xl:px-16 relative z-10 bg-black">
                                        {/* Title */}
                                        <h3 className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 leading-tight">{activity.title}</h3>

                                        {/* Description */}
                                        <p className="text-gray-400 leading-relaxed max-w-xl mb-6 text-base xl:text-lg">
                                            {activity.description}
                                        </p>

                                        {/* Video Preview */}
                                        <div
                                            className="w-full max-w-md aspect-video rounded-xl overflow-hidden cursor-pointer group border border-white/20 hover:border-red-600 transition-colors duration-300 mb-8 relative"
                                            onClick={() => setVideoOpen(true)}
                                        >
                                            <img src={activity.thumbnail} alt="Video Thumbnail" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center pl-1 group-hover:scale-110 transition-transform shadow-lg">
                                                    <FaPlay className="text-white text-lg" />
                                                </div>
                                            </div>
                                            <div className="absolute bottom-4 left-4">
                                                <p className="text-white font-bold text-[10px] uppercase tracking-wider">Watch Highlights</p>
                                            </div>
                                        </div>

                                        {/* CTA */}
                                        <button className="btn-white px-8 py-3 font-bold text-base xl:text-lg rounded-full transition-all duration-300 flex items-center gap-3 group w-fit lg:hover:text-white">
                                            <span className="relative z-10">{activity.cta}</span>
                                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            {/* MOBILE & TABLET VERSION (Below 1200px) */}
            <div className="laptop:hidden bg-white py-16 px-6">
                <div className="max-w-4xl mx-auto space-y-12">
                    <div className="text-left mb-12">
                        <div className="w-16 h-1 bg-red-600 mb-4" />
                        <h2 className="text-4xl font-black text-black">How We Show Up</h2>
                    </div>
                    {activities.map((activity, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            className="bg-black text-white rounded-3xl overflow-hidden shadow-xl"
                        >
                            {/* Image */}
                            <div className="relative h-64">
                                <img
                                    src={activity.mainImage}
                                    alt={activity.title}
                                    className="w-full h-full object-cover opacity-90"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            </div>

                            {/* Content */}
                            <div className="p-8">
                                {/* Title */}
                                <h3 className="text-3xl font-black mb-4 leading-tight">
                                    {activity.title}
                                </h3>

                                {/* Description */}
                                <p className="text-lg text-gray-300 leading-relaxed mb-6">
                                    {activity.description}
                                </p>

                                {/* Video Button */}
                                <button
                                    onClick={() => setVideoOpen(true)}
                                    className="flex items-center gap-3 text-red-500 hover:text-white font-bold mb-6 transition-colors"
                                >
                                    <FaPlay className="w-4 h-4" />
                                    <span>Watch Highlights</span>
                                </button>

                                {/* CTA */}
                                <button className="w-full bg-white text-black font-bold py-4 rounded-full transition-all duration-300">
                                    {activity.cta}
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default LetsBuildSection;
