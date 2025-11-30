import { useState, useRef, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaGamepad, FaUniversity, FaCode } from 'react-icons/fa';

// Import community images for polaroids
import community1 from '../assets/community.png';
import ghana1 from '../assets/ghana1.JPG';
import south1 from '../assets/south1.jpg';
import south2 from '../assets/south2.jpg';

gsap.registerPlugin(ScrollTrigger);

interface WhoWeNeed {
    id: number;
    title: string;
    description: string;
    image: string;
    rotation: number;
    zIndex: number;
}

const profiles: WhoWeNeed[] = [
    {
        id: 1,
        title: 'Developers',
        description: 'We build products that expose our community to opportunities for professional growth and career advancement. We build job boards and outsourcing platforms tailored to the unique realities of skilled talent on campuses.',
        image: community1,
        rotation: -6,
        zIndex: 4
    },
    {
        id: 2,
        title: 'Content Creators',
        description: 'We foster a vibrant ecosystem where builders, creators, and educators connect, collaborate, and grow together. From Lagos to Nairobi, Accra to Cape Town, we are weaving the fabric of Africa\'s Web3 revolution.',
        image: ghana1,
        rotation: 3,
        zIndex: 3
    },
    {
        id: 3,
        title: 'Gamers',
        description: 'We bridge the gap between potential and possibility by facilitating connections with global Web3 projects, hosting hackathons, and creating pathways for African talent to showcase their skills on the world stage.',
        image: south1,
        rotation: -4,
        zIndex: 2
    },
    {
        id: 4,
        title: 'Designers',
        description: 'Your creative vision can shape the future of Web3 in Africa. We collaborate with talented designers to create stunning visual experiences that resonate with our community and drive engagement across the continent.',
        image: south2,
        rotation: 5,
        zIndex: 1
    }
];

const activities = [
    {
        title: "Hackathons",
        description: "We organize intense, collaborative coding events where developers solve real-world problems and showcase their skills.",
        icon: FaCode,
        color: "text-blue-500",
        bg: "bg-blue-950"
    },
    {
        title: "Gaming Events",
        description: "Connecting gamers through tournaments and community events, bridging the gap between Web2 and Web3 gaming.",
        icon: FaGamepad,
        color: "text-purple-500",
        bg: "bg-purple-950"
    },
    {
        title: "Campus Outreaches",
        description: "Empowering the next generation of tech talent directly at universities and campuses across the continent.",
        icon: FaUniversity,
        color: "text-yellow-500",
        bg: "bg-yellow-950"
    }
];

const LetsBuildSection = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const mainRef = useRef<HTMLDivElement>(null);
    const pinnedRef = useRef<HTMLDivElement>(null);
    const horizontalContainerRef = useRef<HTMLDivElement>(null);
    const horizontalWrapperRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // 1. Pinned Slideshow (Who We Are)
            ScrollTrigger.create({
                trigger: pinnedRef.current,
                start: "top top",
                end: "+=3000",
                pin: true,
                scrub: 0.5,
                onUpdate: (self) => {
                    const length = profiles.length;
                    const progress = self.progress;
                    const index = Math.min(
                        Math.floor(progress * length),
                        length - 1
                    );
                    setActiveIndex(index);
                }
            });

            // 2. Horizontal Scroll (What We Do)
            // Only apply on desktop (lg breakpoint is 1024px)
            if (window.innerWidth >= 1024) {
                const sections = gsap.utils.toArray(".horizontal-item");
                gsap.to(sections, {
                    xPercent: -100 * (sections.length - 1),
                    ease: "none",
                    scrollTrigger: {
                        trigger: horizontalContainerRef.current,
                        pin: true,
                        scrub: 1,
                        end: "+=3000", // Adjust scroll length for speed
                    }
                });
            }
        }, mainRef);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={mainRef}>
            {/* DESKTOP: Pinned Slideshow (Hidden on Mobile) */}
            <div className="hidden lg:block">
                <section ref={pinnedRef} className="h-screen bg-white text-black overflow-hidden flex flex-col justify-center relative">
                    {/* Header for the Section */}
                    <div className="absolute top-12 left-0 w-full text-center z-20">
                        <h2 className="text-6xl font-black tracking-tight">Who We Are</h2>
                        <div className="w-20 h-1 bg-black mx-auto mt-4" />
                    </div>

                    <div className="max-w-[95vw] mx-auto w-full grid grid-cols-2 gap-16 items-center mt-20">

                        {/* LEFT: Polaroid Stack */}
                        <div className="flex items-center justify-center h-full">
                            <div className="relative w-full max-w-lg h-[600px]">
                                <AnimatePresence mode="sync">
                                    {profiles.map((profile, index) => (
                                        <motion.div
                                            key={profile.id}
                                            className="absolute inset-0 w-full"
                                            initial={false}
                                            animate={{
                                                scale: activeIndex === index ? 1 : 0.95,
                                                rotate: activeIndex === index ? 0 : profile.rotation,
                                                y: activeIndex === index ? 0 : (index - activeIndex) * 8,
                                                zIndex: activeIndex === index ? 10 : profile.zIndex,
                                                opacity: activeIndex === index ? 1 : 0.6,
                                            }}
                                            transition={{
                                                duration: 0.5,
                                                ease: [0.43, 0.13, 0.23, 0.96]
                                            }}
                                        >
                                            {/* Polaroid Frame */}
                                            <div className="bg-white p-6 shadow-2xl h-full transform transition-transform">
                                                <div className="relative h-[480px] overflow-hidden">
                                                    <img
                                                        src={profile.image}
                                                        alt={profile.title}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                {/* Polaroid Caption */}
                                                <div className="pt-6 text-center">
                                                    <p className="font-handwriting text-3xl text-gray-700">
                                                        {profile.title.toLowerCase()}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Tape Effect */}
                                            {activeIndex === index && (
                                                <motion.div
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-32 h-8 bg-yellow-100/70 backdrop-blur-sm rotate-2 shadow-md"
                                                />
                                            )}
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* RIGHT: Content Slideshow */}
                        <div className="relative h-[500px] flex items-center">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeIndex}
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -50 }}
                                    transition={{ duration: 0.5, ease: "easeOut" }}
                                    className="absolute inset-0 flex flex-col justify-center"
                                >
                                    <h3 className="text-7xl xl:text-8xl font-black mb-8 tracking-tight">
                                        {profiles[activeIndex].title}
                                    </h3>

                                    <p className="text-xl md:text-2xl leading-relaxed text-gray-700 max-w-2xl mb-10">
                                        {profiles[activeIndex].description}
                                    </p>

                                    <motion.button
                                        whileHover={{ scale: 1.05, x: 10 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="inline-flex items-center gap-3 text-black font-bold text-xl group w-fit"
                                    >
                                        Learn More
                                        <svg
                                            className="w-8 h-8 group-hover:translate-x-2 transition-transform"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </motion.button>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Progress Indicators */}
                    <div className="absolute right-12 top-1/2 -translate-y-1/2 flex flex-col gap-6">
                        {profiles.map((_, i) => (
                            <div
                                key={i}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${i === activeIndex ? 'bg-black h-12' : 'bg-gray-300'}`}
                            />
                        ))}
                    </div>
                </section>
            </div>

            {/* MOBILE: Vertical Stack (Shown on Mobile) */}
            <div className="lg:hidden bg-white text-black py-20 px-6 space-y-32">
                <div className="text-center mb-12">
                    <h2 className="text-5xl font-black">Who We Are</h2>
                    <div className="w-20 h-1 bg-black mx-auto mt-4" />
                </div>
                {profiles.map((profile) => (
                    <div key={profile.id} className="flex flex-col gap-10">
                        {/* Polaroid */}
                        <div className="relative w-full max-w-sm mx-auto aspect-[4/5] rotate-2">
                            <div className="bg-white p-4 shadow-xl h-full">
                                <img src={profile.image} alt={profile.title} className="w-full h-[85%] object-cover" />
                                <div className="h-[15%] flex items-center justify-center">
                                    <p className="font-handwriting text-2xl text-gray-700">{profile.title.toLowerCase()}</p>
                                </div>
                            </div>
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-8 bg-yellow-100/70 rotate-2 shadow-sm" />
                        </div>

                        {/* Text */}
                        <div className="text-center">
                            <h3 className="text-5xl font-black mb-6">{profile.title}</h3>
                            <p className="text-lg text-gray-700 leading-relaxed">{profile.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* WHAT WE DO SECTION - HORIZONTAL SCROLL (Desktop) */}
            <div className="hidden lg:block">
                <section ref={horizontalContainerRef} className="h-screen overflow-hidden bg-black text-white relative">
                    <div className="absolute top-12 left-12 z-20">
                        <h2 className="text-6xl font-black">What We Do</h2>
                        <div className="w-20 h-1 bg-red-600 mt-4" />
                    </div>

                    <div ref={horizontalWrapperRef} className="flex h-full w-[300vw]">
                        {activities.map((activity, index) => (
                            <div key={index} className={`w-screen h-full flex items-center justify-center horizontal-item relative overflow-hidden ${activity.bg}`}>
                                <div className="absolute inset-0 bg-black/40" /> {/* Overlay */}
                                <div className="relative z-10 max-w-4xl px-8 text-center">
                                    <div className={`text-9xl mb-12 ${activity.color} flex justify-center`}>
                                        <activity.icon />
                                    </div>
                                    <h3 className="text-7xl font-bold mb-8">{activity.title}</h3>
                                    <p className="text-3xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
                                        {activity.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            {/* WHAT WE DO SECTION - VERTICAL STACK (Mobile) */}
            <div className="lg:hidden bg-black text-white py-24 px-6">
                <div className="text-center mb-16">
                    <h2 className="text-5xl font-black">What We Do</h2>
                    <div className="w-20 h-1 bg-red-600 mx-auto mt-4" />
                </div>
                <div className="space-y-16">
                    {activities.map((activity, index) => (
                        <div key={index} className="bg-white/5 border border-white/10 p-8 rounded-2xl">
                            <div className={`text-6xl mb-6 ${activity.color}`}>
                                <activity.icon />
                            </div>
                            <h3 className="text-3xl font-bold mb-4">{activity.title}</h3>
                            <p className="text-gray-400 text-lg leading-relaxed">
                                {activity.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Shadows+Into+Light&display=swap');
                
                .font-handwriting {
                    font-family: 'Shadows Into Light', cursive;
                }
            `}</style>
        </div>
    );
};

export default LetsBuildSection;
