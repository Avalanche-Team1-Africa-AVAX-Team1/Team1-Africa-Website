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
        color: "text-blue-500"
    },
    {
        title: "Gaming Events",
        description: "Connecting gamers through tournaments and community events, bridging the gap between Web2 and Web3 gaming.",
        icon: FaGamepad,
        color: "text-purple-500"
    },
    {
        title: "Campus Outreaches",
        description: "Empowering the next generation of tech talent directly at universities and campuses across the continent.",
        icon: FaUniversity,
        color: "text-yellow-500"
    }
];

const LetsBuildSection = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            ScrollTrigger.create({
                trigger: containerRef.current,
                start: "top top",
                end: "+=3000", // Scroll distance to scrub through
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
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <>
            {/* DESKTOP: Pinned Slideshow (Hidden on Mobile) */}
            <div className="hidden lg:block">
                <section ref={containerRef} className="h-screen bg-white text-black overflow-hidden flex items-center relative">
                    <div className="max-w-[95vw] mx-auto w-full grid grid-cols-2 gap-16 items-center">

                        {/* LEFT: Polaroid Stack - BIGGER */}
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

                                            {/* Tape Effect - Only show on active */}
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

                        {/* RIGHT: Content Slideshow - BIGGER */}
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

            {/* WHAT WE DO SECTION */}
            <section className="py-32 bg-black text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-900 via-black to-black" />

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-24"
                    >
                        <h2 className="text-5xl md:text-7xl font-black mb-6">What We Do</h2>
                        <div className="w-24 h-1 bg-red-600 mx-auto mb-8" />
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                            We are building the infrastructure and community to power Africa's Web3 future through impactful initiatives.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                        {activities.map((activity, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors duration-300 group"
                            >
                                <div className={`text-5xl mb-6 ${activity.color} group-hover:scale-110 transition-transform duration-300`}>
                                    <activity.icon />
                                </div>
                                <h3 className="text-2xl font-bold mb-4">{activity.title}</h3>
                                <p className="text-gray-400 leading-relaxed">
                                    {activity.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA SECTION */}
            <section className="py-32 bg-white text-center border-t border-black/5">
                <div className="max-w-4xl mx-auto px-4">
                    <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-5xl font-black mb-6"
                    >
                        Join the <span className="text-red-600">Movement</span>
                    </motion.h3>

                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.15 }}
                        className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto"
                    >
                        Whether you're a developer, gamer, content creator, or designer—<br />
                        there's a place for you in Team1 Africa.
                    </motion.p>

                    <motion.a
                        href="mailto:hi@team1africa.com"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-block px-12 py-5 bg-black text-white text-xl font-bold rounded-full hover:bg-red-600 transition-colors duration-300"
                    >
                        hi@team1africa.com
                    </motion.a>
                </div>
            </section>

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Shadows+Into+Light&display=swap');
                
                .font-handwriting {
                    font-family: 'Shadows Into Light', cursive;
                }
            `}</style>
        </>
    );
};

export default LetsBuildSection;
