import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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

const LetsBuildSection = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const sectionRef = useRef<HTMLDivElement>(null);
    const polaroidStackRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const sections = gsap.utils.toArray('.content-section');

        sections.forEach((section, i) => {
            ScrollTrigger.create({
                trigger: section as Element,
                start: 'top center',
                end: 'bottom center',
                onEnter: () => setActiveIndex(i),
                onEnterBack: () => setActiveIndex(i),
            });
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <section ref={sectionRef} className="bg-white text-black py-16 md:py-24">
            <div className="max-w-[90vw] mx-auto">
                {/* Grid Layout: Sticky Polaroids | Scrolling Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">

                    {/* LEFT: Sticky Polaroid Stack */}
                    <div className="lg:sticky lg:top-32 lg:h-[60vh] flex items-center justify-center">
                        <div ref={polaroidStackRef} className="relative w-full max-w-sm h-[450px]">
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
                                        <div className="bg-white p-5 shadow-2xl h-full">
                                            <div className="relative h-[340px] overflow-hidden">
                                                <img
                                                    src={profile.image}
                                                    alt={profile.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            {/* Polaroid Caption */}
                                            <div className="pt-3 text-center">
                                                <p className="font-handwriting text-lg text-gray-700">
                                                    {profile.title.toLowerCase()}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Tape Effect - Only show on active */}
                                        {activeIndex === index && (
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-20 h-6 bg-yellow-100/70 backdrop-blur-sm rotate-2 shadow-md"
                                            />
                                        )}
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* RIGHT: Scrolling Content Sections */}
                    <div className="space-y-24 md:space-y-32 lg:space-y-48">
                        {profiles.map((profile, index) => (
                            <div
                                key={profile.id}
                                className="content-section min-h-[50vh] flex items-center"
                            >
                                <div className="w-full">
                                    <motion.div
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: false, amount: 0.5 }}
                                        transition={{ duration: 0.6 }}
                                    >
                                        <h3 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tight">
                                            {profile.title}
                                        </h3>

                                        <p className="text-lg md:text-xl leading-relaxed text-gray-700 max-w-xl mb-8">
                                            {profile.description}
                                        </p>

                                        <motion.button
                                            whileHover={{ scale: 1.05, x: 10 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="inline-flex items-center gap-2 text-black font-bold text-lg group"
                                        >
                                            Learn More
                                            <svg
                                                className="w-6 h-6 group-hover:translate-x-2 transition-transform"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </motion.button>
                                    </motion.div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom CTA */}
                <div className="mt-24 text-center border-t border-black/10 pt-16">
                    <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-5xl font-black mb-4"
                    >
                        Join the <span className="text-red-600">Movement</span>
                    </motion.h3>

                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.15 }}
                        className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
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
            </div>

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Shadows+Into+Light&display=swap');
                
                .font-handwriting {
                    font-family: 'Shadows Into Light', cursive;
                }
            `}</style>
        </section>
    );
};

export default LetsBuildSection;
