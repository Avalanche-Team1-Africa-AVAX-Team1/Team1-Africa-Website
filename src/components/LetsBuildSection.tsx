import { useState, useRef, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaGamepad, FaUniversity, FaCode, FaPlay } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import AnimatedSection, { AnimatedItem } from './AnimatedSection';

// Import community images
import community1 from '../assets/community.png';
import ghana1 from '../assets/ghana1.JPG';
import south1 from '../assets/south1.jpg';
import south2 from '../assets/south2.jpg';

// Import Video
import mainVideo from '../assets/videos/video.mp4';

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
        description: "Experience the adrenaline of our 48-hour coding marathons. We bring together the brightest minds across the continent to solve critical challenges using blockchain technology. Whether you're a seasoned pro or a first-time hacker, our events provide the perfect platform to launch your ideas, win prizes, and get scouted by top global protocols.",
        icon: FaCode,
        color: "text-blue-500",
        mainImage: community1,
        thumbnail: ghana1,
        cta: "Join Next Hackathon"
    },
    {
        title: "Gaming Events",
        description: "Step into the arena of the future. We bridge the gap between traditional gaming and Web3, hosting high-energy esports tournaments and community game nights. Our events are more than just competition; they are a celebration of African gaming culture, offering players new ways to earn, compete, and connect with the global gaming economy.",
        icon: FaGamepad,
        color: "text-purple-500",
        mainImage: south1,
        thumbnail: south2,
        cta: "View Tournaments"
    },
    {
        title: "Campus Outreaches",
        description: "We are planting the seeds of the future directly on campuses. Our university outreach programs are designed to demystify Web3 and empower the next generation of tech leaders. Through hands-on workshops, seminars, and mentorship sessions, we provide students with the tools and knowledge they need to build a career in the digital economy.",
        icon: FaUniversity,
        color: "text-yellow-500",
        mainImage: ghana1,
        thumbnail: community1,
        cta: "Partner With Us"
    }
];

const VideoModal = ({ isOpen, onClose, videoSrc }: { isOpen: boolean; onClose: () => void; videoSrc: string }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm">
            <button onClick={onClose} className="absolute top-8 right-8 text-white text-5xl hover:text-red-500 transition-colors">
                <IoClose />
            </button>
            <div className="w-full max-w-6xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                <video src={videoSrc} controls autoPlay className="w-full h-full object-contain" />
            </div>
        </div>
    );
};

const LetsBuildSection = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [videoOpen, setVideoOpen] = useState(false);
    const mainRef = useRef<HTMLDivElement>(null);
    const pinnedRef = useRef<HTMLDivElement>(null);
    const horizontalContainerRef = useRef<HTMLDivElement>(null);
    const horizontalWrapperRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // 1. Pinned Slideshow
            ScrollTrigger.create({
                trigger: pinnedRef.current,
                start: "top top",
                end: "+=3000",
                pin: true,
                scrub: 0.5,
                onUpdate: (self) => {
                    const length = profiles.length;
                    const progress = self.progress;
                    const index = Math.min(Math.floor(progress * length), length - 1);
                    setActiveIndex(index);
                }
            });

            // 2. Horizontal Scroll
            if (window.innerWidth >= 1024) {
                const sections = gsap.utils.toArray(".horizontal-item");
                gsap.to(sections, {
                    xPercent: -100 * (sections.length - 1),
                    ease: "none",
                    scrollTrigger: {
                        trigger: horizontalContainerRef.current,
                        pin: true,
                        scrub: 1,
                        end: "+=3000",
                    }
                });
            }
        }, mainRef);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={mainRef}>
            <VideoModal isOpen={videoOpen} onClose={() => setVideoOpen(false)} videoSrc={mainVideo} />

            {/* DESKTOP: Pinned Slideshow */}
            <div className="hidden lg:block">
                <section ref={pinnedRef} className="h-screen bg-white text-black overflow-hidden flex flex-col justify-center relative">
                    <div className="absolute top-12 left-0 w-full text-center z-20">
                        <h2 className="text-6xl font-black tracking-tight">The Builders We're Building For</h2>
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
                                            transition={{ duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] }}
                                        >
                                            <div className="bg-white p-6 shadow-2xl h-full transform transition-transform">
                                                <div className="relative h-[480px] overflow-hidden">
                                                    <img src={profile.image} alt={profile.title} className="w-full h-full object-cover" />
                                                </div>
                                                <div className="pt-6 text-center">
                                                    <p className="font-handwriting text-3xl text-gray-700">{profile.title.toLowerCase()}</p>
                                                </div>
                                            </div>
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
                                    <h3 className="text-7xl xl:text-8xl font-black mb-8 tracking-tight">{profiles[activeIndex].title}</h3>
                                    <p className="text-xl md:text-2xl leading-relaxed text-gray-700 max-w-2xl mb-10">{profiles[activeIndex].description}</p>
                                    <motion.button
                                        whileHover={{ scale: 1.05, x: 10 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="inline-flex items-center gap-3 text-black font-bold text-xl group w-fit"
                                    >
                                        Learn More
                                        <svg className="w-8 h-8 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </motion.button>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                    <div className="absolute right-12 top-1/2 -translate-y-1/2 flex flex-col gap-6">
                        {profiles.map((_, i) => (
                            <div key={i} className={`w-3 h-3 rounded-full transition-all duration-300 ${i === activeIndex ? 'bg-black h-12' : 'bg-gray-300'}`} />
                        ))}
                    </div>
                </section>
            </div>

            {/* MOBILE: Vertical Stack */}
            <div className="lg:hidden bg-white text-black py-20 px-6 space-y-32">
                <div className="text-center mb-12">
                    <h2 className="text-5xl font-black">The Builders We're Building For</h2>
                    <div className="w-20 h-1 bg-black mx-auto mt-4" />
                </div>
                <AnimatedSection staggerChildren={0.2} className="space-y-32">
                    {profiles.map((profile) => (
                        <AnimatedItem key={profile.id} className="flex flex-col gap-10">
                            <div className="relative w-full max-w-sm mx-auto aspect-[4/5] rotate-2">
                                <div className="bg-white p-4 shadow-xl h-full">
                                    <img src={profile.image} alt={profile.title} className="w-full h-[85%] object-cover" />
                                    <div className="h-[15%] flex items-center justify-center">
                                        <p className="font-handwriting text-2xl text-gray-700">{profile.title.toLowerCase()}</p>
                                    </div>
                                </div>
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-8 bg-yellow-100/70 rotate-2 shadow-sm" />
                            </div>
                            <div className="text-center">
                                <h3 className="text-5xl font-black mb-6">{profile.title}</h3>
                                <p className="text-lg text-gray-700 leading-relaxed">{profile.description}</p>
                            </div>
                        </AnimatedItem>
                    ))}
                </AnimatedSection>
            </div>

            {/* WHAT WE DO SECTION - HORIZONTAL SCROLL (Desktop) */}
            <div className="hidden lg:block">
                <section ref={horizontalContainerRef} className="h-screen overflow-hidden bg-black text-white relative">
                    <div className="absolute top-12 left-12 z-20">
                        <h2 className="text-6xl font-black">How We Show Up</h2>
                        <div className="w-20 h-1 bg-red-600 mt-4" />
                    </div>

                    <div ref={horizontalWrapperRef} className="flex h-full w-[300vw]">
                        {activities.map((activity, index) => (
                            <div key={index} className="w-screen h-full flex horizontal-item relative overflow-hidden bg-black">
                                {/* LEFT: Full Image */}
                                <div className="w-1/2 h-full relative">
                                    <img
                                        src={activity.mainImage}
                                        alt={activity.title}
                                        className="w-full h-full object-cover opacity-50"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/50 to-black" />
                                </div>

                                {/* RIGHT: Content */}
                                <div className="w-1/2 h-full flex flex-col justify-center px-24 relative z-10">

                                    {/* Title */}
                                    <h3 className="text-6xl font-bold mb-6">{activity.title}</h3>

                                    {/* Description */}
                                    <p className="text-xl text-gray-400 leading-relaxed max-w-2xl mb-10">
                                        {activity.description}
                                    </p>

                                    {/* Video Preview (Large) */}
                                    <div
                                        className="w-full max-w-2xl aspect-video rounded-xl overflow-hidden cursor-pointer group border border-white/20 hover:border-red-600 transition-colors duration-300 mb-10 relative"
                                        onClick={() => setVideoOpen(true)}
                                    >
                                        <img src={activity.thumbnail} alt="Video Thumbnail" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                            <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center pl-1 group-hover:scale-110 transition-transform shadow-lg">
                                                <FaPlay className="text-white text-3xl" />
                                            </div>
                                        </div>
                                        <div className="absolute bottom-4 left-4">
                                            <p className="text-white font-bold text-lg uppercase tracking-wider">Watch Highlights</p>
                                        </div>
                                    </div>

                                    {/* CTA */}
                                    <button className="px-8 py-4 bg-white text-black font-bold text-lg rounded-full hover:bg-red-600 hover:text-white transition-all duration-300 flex items-center gap-3 group w-fit">
                                        {activity.cta}
                                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            {/* WHAT WE DO SECTION - VERTICAL STACK (Mobile) */}
            <div className="lg:hidden bg-black text-white py-24 px-6">
                <div className="text-center mb-16">
                    <h2 className="text-5xl font-black">How We Show Up</h2>
                    <div className="w-20 h-1 bg-red-600 mx-auto mt-4" />
                </div>
                <AnimatedSection staggerChildren={0.2} className="space-y-24">
                    {activities.map((activity, index) => (
                        <AnimatedItem key={index} className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                            {/* Title */}
                            <h3 className="text-3xl font-bold mb-4">{activity.title}</h3>

                            {/* Description */}
                            <p className="text-gray-400 text-lg leading-relaxed mb-8">
                                {activity.description}
                            </p>

                            {/* Video Preview Mobile */}
                            <div
                                className="relative aspect-video rounded-xl overflow-hidden mb-8 cursor-pointer"
                                onClick={() => setVideoOpen(true)}
                            >
                                <img src={activity.thumbnail} alt="Video" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                    <div className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center pl-1">
                                        <FaPlay className="text-white text-xl" />
                                    </div>
                                </div>
                            </div>

                            {/* CTA */}
                            <button className="w-full px-6 py-4 bg-white text-black font-bold rounded-xl hover:bg-red-600 hover:text-white transition-colors">
                                {activity.cta}
                            </button>
                        </AnimatedItem>
                    ))}
                </AnimatedSection>
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
