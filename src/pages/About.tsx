import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TeamGrid from '../components/TeamGrid';
import LetsBuildSection from '../components/LetsBuildSection';
import { team1AfricaMembers } from '../data/team-members';
import CustomCursor from '../components/CustomCursor';
import videoSrc from '../assets/videos/video.mp4';
import { LogoMask, LogoOutline } from '../components/LogoMask';
import AnimatedText from '../components/AnimatedText';
import AfricaPresence from '../components/AfricaPresence';

// Mission section data
const missionItems = [
    {
        id: 1,
        number: "01",
        title: "Our Origins",
        desc: "Launched as a regional chapter of the global AvaxTeam1 network, Team1Africa builds on successes like Nigerian events and draws from Avalanche's MENA expansions for compliant growth models."
    },
    {
        id: 2,
        number: "02",
        title: "Community Events",
        desc: "We host hackathons, workshops, and blockchain weeks in cities all around Africa, creating vital touchpoints for builders, creators, and enthusiasts to connect and collaborate."
    },
    {
        id: 3,
        number: "03",
        title: "Web3 Education",
        desc: "Through university partnerships, we deliver Web3 training tailored to youth in fintech and gaming, equipping the next generation with future-ready skills."
    },
    {
        id: 4,
        number: "04",
        title: "Strategic Initiatives",
        desc: "From grants for African devs to cultural integrations like art and NFTs, we drive innovation through direct support and collaborations with the global AvaxTeam1 network."
    }
];

// Accordion Item Component
function MissionAccordionItem({ item, index }: { item: typeof missionItems[0], index: number }) {
    const [isExpanded, setIsExpanded] = useState(index === 0); // First item expanded by default

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="border-t border-white/10 py-6 group"
        >
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full flex items-center justify-between text-left"
            >
                <div className="flex items-center gap-4 md:gap-6">
                    {/* Number Box */}
                    <div className="relative flex-shrink-0">
                        <div className={`w-12 h-12 md:w-16 md:h-16 flex items-center justify-center transition-all duration-300 ${isExpanded ? 'bg-red-600' : 'bg-white group-hover:bg-red-600'}`}>
                            <span className={`text-2xl md:text-3xl font-black transition-colors duration-300 ${isExpanded ? 'text-white' : 'text-black group-hover:text-white'}`} style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                                {item.number}
                            </span>
                        </div>
                        {/* Accent square */}
                        <div className={`absolute -bottom-1 -right-1 w-4 h-4 md:w-5 md:h-5 transition-colors duration-300 ${isExpanded ? 'bg-white' : 'bg-red-500 group-hover:bg-white'}`}></div>
                    </div>

                    {/* Title */}
                    <h3 className={`text-xl lt-768:text-xl md:text-3xl lg:text-4xl font-black tracking-tight transition-colors duration-300 ${isExpanded ? 'text-red-600' : 'text-white group-hover:text-red-600'}`}>
                        {item.title}
                    </h3>
                </div>

                {/* Chevron */}
                <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="ml-4 text-white"
                >
                    <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </motion.div>
            </button>

            {/* Expandable Content */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="overflow-hidden"
                    >
                        <div className="pt-4 pl-16 md:pl-24">
                            <p className="text-base md:text-lg text-gray-400 leading-relaxed max-w-2xl">
                                {item.desc}
                            </p>
                            {/* Decorative lines */}
                            <div className="mt-4 flex gap-2">
                                <div className="h-1 w-12 bg-red-500"></div>
                                <div className="h-1 w-8 bg-white"></div>
                                <div className="h-1 w-4 bg-red-500"></div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

const About = () => {

    return (
        <div className="min-h-screen text-white overflow-x-hidden selection:bg-red-500 selection:text-white cursor-none" style={{ backgroundColor: '#F8FAFC' }}>
            <CustomCursor />

            {/* Hero Section - Lisk-Style 3-Column Layout */}
            <section className="relative h-screen w-full flex items-center overflow-hidden">
                {/* 1. The Video Layer (Bottom) */}
                <div className="absolute inset-0 z-0 border-2 border-red-600">
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover opacity-100"
                    >
                        <source src={videoSrc} type="video/mp4" />
                    </video>
                </div>

                {/* 2. The Mask Layer (Middle) */}
                <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
                    <LogoMask />
                </div>

                {/* 3. The Outline Layer (Top) */}
                <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                    <LogoOutline />
                </div>

                {/* 4. Content Grid - 3 Columns */}
                <div className="z-30 w-full px-6 md:px-12 laptop:px-20 pointer-events-auto">
                    <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16 items-start pt-32 md:pt-40 relative">

                        {/* Left Column - Headline */}
                        <div className="absolute right-[80%] bottom-[99%] w-[70%]">
                            <div>
                                <h1 className="text-4xl md:text-5xl lg:text-[2.5vw] font-bold text-black">
                                    <span >At Team<span className="text-red-600">1</span></span> <br /> We're all about <br /> <span className="text-red-600">Community</span> And <span className="text-red-600">Building</span> cool sh<span className="text-red-600">*</span>t
                                </h1>

                            </div>
                        </div>

                        {/* Center Column - Empty (Logo is here via absolute positioning) */}
                        <div className="hidden lg:block lg:col-span-1" />

                        {/* Right Column - Description & Buttons */}
                        <div className="absolute right-[-100%] bottom-[-200%]">
                            <p className="text-base md:text-lg text-gray-700 leading-relaxed w-[30%]">
                                Team1 Africa unites builders, developers, creatives, and enthusiasts across the continent. Join our thriving community and be part of the movement shaping Africa's Web3 future.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-3 mt-5">
                                <a
                                    href="/community"
                                    className="px-5 py-3 bg-black text-white font-semibold text-sm rounded-md border border-gray-300 text-center"
                                >
                                    Join Team1
                                </a>
                                <a
                                    href="/grants"
                                    className="px-5 py-3 text-white font-semibold text-sm rounded-md border border-gray-300 bg-red-600 transition-colors text-center"
                                >
                                    Apply for Funding
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Manifesto / Mission */}
            <section className="py-20 md:py-32 px-6 md:px-12 laptop:px-20 bg-black text-white relative z-10 rounded-t-[2rem] md:rounded-t-[3rem] -mt-10">
                <div className="max-w-[90vw] mx-auto">
                    <div className="grid grid-cols-1 laptop:grid-cols-2 gap-12 laptop:gap-12 xl:gap-24 items-start">
                        <div className="laptop:sticky laptop:top-32">
                            <AnimatedText variant="slideUp" delay={0.2}>
                                <h2 className="text-[10vw] laptop:text-[4.5vw] xl:text-[5vw] tracking-wide mb-6 laptop:mb-8 leading-[0.9]" data-cursor="Our Mission" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                                    TEAM<span className="text-red-600">1</span> <br />
                                    AFRICA'S <br />
                                    <span className="text-red-600">COMMUNITY</span>
                                </h2>
                            </AnimatedText>
                            <AnimatedText variant="slideUp" delay={0.3}>
                                <p className="text-lg md:text-xl font-medium text-gray-400 max-w-lg">
                                    Team1 Africa unites African builders, developers, creatives, gamers, and enthusiasts to drive Avalanche adoption across the continent. It supports local projects through grants, events, and education, fostering Web3 innovation tailored to African challenges like remittances and DeFi accessibility.

                                </p>
                            </AnimatedText>
                        </div>

                        {/* Accordion Section */}
                        <div className="space-y-0">
                            {missionItems.map((item, index) => (
                                <MissionAccordionItem
                                    key={item.id}
                                    item={item}
                                    index={index}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Values - Infinite Scroll */}
            <section className="py-12 md:py-20 bg-red-600 text-white overflow-hidden">
                <div className="flex whitespace-nowrap animate-infinite-scroll">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="flex items-center gap-4 lt-768:gap-4 md:gap-8 mx-4 lt-768:mx-4 md:mx-8">
                            <span className="text-4xl lt-768:text-4xl md:text-6xl lg:text-8xl font-black italic">BUILD</span>
                            <span className="text-xl lt-768:text-xl md:text-2xl lg:text-4xl">★</span>
                            <span className="text-4xl lt-768:text-4xl md:text-6xl lg:text-8xl font-black italic text-black">ON AVAX</span>
                            <span className="text-xl lt-768:text-xl md:text-2xl lg:text-4xl">★</span>
                            <span className="text-4xl lt-768:text-4xl md:text-6xl lg:text-8xl font-black italic">FROM AFRICA</span>
                            <span className="text-xl lt-768:text-xl md:text-2xl lg:text-4xl">★</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* African Presence Section */}
            <AfricaPresence />

            {/* Team Section */}
            <TeamGrid members={team1AfricaMembers} />

            {/* Let's Build */}
            <LetsBuildSection />


        </div>
    );
};

export default About;