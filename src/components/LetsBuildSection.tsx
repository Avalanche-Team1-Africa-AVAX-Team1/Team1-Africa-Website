import { useState, useRef, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaGamepad, FaUniversity, FaCode } from 'react-icons/fa';
import { FaPlay } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';

// Import images
import community1 from '../assets/community.webp';
import ghana1 from '../assets/ghana1.JPG';
import south1 from '../assets/south1.webp';
import south2 from '../assets/south2.webp';

// Import video
import mainVideo from '../assets/videos/video.mp4';

gsap.registerPlugin(ScrollTrigger);

const LetsBuildSection = () => {
    const [videoOpen, setVideoOpen] = useState(false);
    const horizontalContainerRef = useRef<HTMLElement>(null);
    const horizontalWrapperRef = useRef<HTMLDivElement>(null);

    const activities = [
        {
            icon: FaGamepad,
            title: "Gamified Learning",
            description: "Interactive Web3 education through challenges, quests, and rewards that make blockchain development engaging and accessible.",
            image: community1,
            achievements: ["500+ developers trained", "12 learning paths", "NFT badges"]
        },
        {
            icon: FaUniversity,
            title: "University Programs",
            description: "Partnering with African universities to integrate Avalanche development into computer science curricula.",
            image: ghana1,
            achievements: ["15 partner universities", "1000+ students", "Research grants"]
        },
        {
            icon: FaCode,
            title: "Hackathons & Bootcamps",
            description: "Intensive building experiences where ideas transform into production-ready dApps on Avalanche.",
            image: south1,
            achievements: ["24 hackathons", "300+ projects", "$500K in prizes"]
        }
    ];

    // GSAP Horizontal Scroll for "How We Show Up"
    useLayoutEffect(() => {
        const element = horizontalContainerRef.current;
        const wrapper = horizontalWrapperRef.current;
        if (!element || !wrapper) return;

        const items = gsap.utils.toArray('.horizontal-item');
        const totalWidth = items.length * window.innerWidth;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: element,
                pin: true,
                scrub: 1,
                end: `+=${totalWidth}`,
                invalidateOnRefresh: true,
            }
        });

        tl.to(wrapper, {
            x: () => -(totalWidth - window.innerWidth),
            ease: 'none',
        });

        return () => {
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
                                className="w-full h-full rounded-2xl"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* WHAT WE DO SECTION - HORIZONTAL SCROLL (Desktop 1200px+) */}
            <div className="hidden laptop:block">
                <section ref={horizontalContainerRef} className="h-screen overflow-hidden bg-white text-black relative">
                    <div ref={horizontalWrapperRef} className="flex h-full will-change-transform">
                        {activities.map((activity, index) => (
                            <div key={index} className="w-screen h-full flex items-center justify-center horizontal-item p-4">
                                {/* CARD CONTAINER - Black Card on White Background */}
                                <div className="w-full max-w-[1400px] h-[75vh] min-h-[600px] bg-black text-white rounded-[3rem] overflow-hidden flex relative shadow-2xl">
                                    {/* Left: Image */}
                                    <div className="w-[45%] h-full relative border-r border-white/5">
                                        <img
                                            src={activity.image}
                                            alt={activity.title}
                                            className="w-full h-full object-cover opacity-90"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/40" />
                                    </div>

                                    {/* Right: Content */}
                                    <div className="w-[55%] h-full p-12 flex flex-col justify-between relative overflow-hidden">
                                        {/* Decorative Background Elements */}
                                        <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-3xl" />
                                        <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-500/5 rounded-full blur-3xl" />

                                        <div className="relative z-10">
                                            {/* Icon */}
                                            <div className="mb-8">
                                                <activity.icon className="w-16 h-16 text-red-500" />
                                            </div>

                                            {/* Title */}
                                            <h3 className="text-5xl font-black mb-6 leading-tight tracking-tight">
                                                {activity.title}
                                            </h3>

                                            {/* Description */}
                                            <p className="text-xl text-gray-300 leading-relaxed mb-8">
                                                {activity.description}
                                            </p>

                                            {/* Achievements */}
                                            <div className="space-y-4">
                                                {activity.achievements.map((achievement, i) => (
                                                    <div key={i} className="flex items-center gap-3">
                                                        <span className="w-2 h-2 bg-red-500 rounded-full" />
                                                        <span className="text-gray-400 font-medium">{achievement}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Bottom: CTA */}
                                        <div className="relative z-10">
                                            <button
                                                onClick={() => setVideoOpen(true)}
                                                className="group flex items-center gap-4 bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105"
                                            >
                                                <FaPlay className="w-5 h-5" />
                                                <span className="font-bold text-lg">Watch Our Impact</span>
                                            </button>
                                        </div>
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
                                    src={activity.image}
                                    alt={activity.title}
                                    className="w-full h-full object-cover opacity-90"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            </div>

                            {/* Content */}
                            <div className="p-8">
                                {/* Icon */}
                                <activity.icon className="w-12 h-12 text-red-500 mb-6" />

                                {/* Title */}
                                <h3 className="text-3xl font-black mb-4 leading-tight">
                                    {activity.title}
                                </h3>

                                {/* Description */}
                                <p className="text-lg text-gray-300 leading-relaxed mb-6">
                                    {activity.description}
                                </p>

                                {/* Achievements */}
                                <div className="space-y-3 mb-6">
                                    {activity.achievements.map((achievement, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <span className="w-2 h-2 bg-red-500 rounded-full" />
                                            <span className="text-gray-400 text-sm">{achievement}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* CTA */}
                                <button
                                    onClick={() => setVideoOpen(true)}
                                    className="flex items-center gap-3 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full transition-colors"
                                >
                                    <FaPlay className="w-4 h-4" />
                                    <span className="font-bold">Watch Impact Video</span>
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
