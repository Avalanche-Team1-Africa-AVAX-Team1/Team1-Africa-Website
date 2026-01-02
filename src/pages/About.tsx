import { motion, AnimatePresence } from 'framer-motion';

import TeamGrid from '../components/TeamGrid';
import LetsBuildSection from '../components/LetsBuildSection';
import { team1AfricaMembers } from '../data/team-members';
import CustomCursor from '../components/CustomCursor';
import videoSrc from '../assets/videos/video.mp4';
import { LogoMask, LogoOutline } from '../components/LogoMask';
import AnimatedText from '../components/AnimatedText';
import { AnimatedItem } from '../components/AnimatedSection';
import AfricaPresence from '../components/AfricaPresence';

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
                                    <span className="text-red-600">Build</span> Cool <span className="text-red-600">Sh*t</span>. <br />
                                    Touch Grass. <br />
                                    Get <span className="text-red-600">Recognized</span>.
                                </h1>
                                
                            </div>
                        </div>

                        {/* Center Column - Empty (Logo is here via absolute positioning) */}
                        <div className="hidden lg:block lg:col-span-1" />

                        {/* Right Column - Description & Buttons */}
                        <div className="absolute right-[-80%] bottom-[-50%]">
                            <p className="text-base md:text-lg text-gray-700 leading-relaxed w-[30%]">
                                Across Africa, Southeast Asia, and Latin America, we combine local programs, a $5M fund, and an Ethereum-aligned L2 so you can build locally and scale globally.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-3">
                                <a
                                    href="/community"
                                    className="px-5 py-3 bg-white text-black font-semibold text-sm rounded-md border border-gray-300 hover:bg-gray-50 transition-colors text-center"
                                >
                                    Join as Incubatee
                                </a>
                                <a
                                    href="/grants"
                                    className="px-5 py-3 bg-white text-black font-semibold text-sm rounded-md border border-gray-300 hover:bg-gray-50 transition-colors text-center"
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

                        <div className="space-y-0 relative">
                            {[{
                                title: "Our Origins",
                                desc: "Launched as a regional chapter of the global AvaxTeam1 network, Team1Africa builds on successes like Nigerian events and draws from Avalanche's MENA expansions for compliant growth models."
                            }, {
                                title: "Community Events",
                                desc: "We host hackathons, workshops, and blockchain weeks in cities all around Africa, creating vital touchpoints for builders, creators, and enthusiasts to connect and collaborate."
                            }, {
                                title: "Web3 Education",
                                desc: "Through university partnerships, we deliver Web3 training tailored to youth in fintech and gaming, equipping the next generation with future-ready skills."
                            }, {
                                title: "Strategic Initiatives",
                                desc: "From grants for African devs to cultural integrations like art and NFTs, we drive innovation through direct support and collaborations with the global AvaxTeam1 network."
                            }].map((item, i) => (
                                <AnimatedItem key={i}>
                                    <div className="group relative mb-16 md:mb-24">
                                        {/* Rotated background number */}
                                        <div className="absolute -left-4 md:-left-8 top-0 -rotate-12 opacity-10 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none">
                                            <span className="text-[12rem] md:text-[15rem] font-black text-white/5 leading-none" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                                                {i + 1}
                                            </span>
                                        </div>

                                        {/* Content container with offset */}
                                        <div className={`relative ${i % 2 === 0 ? 'md:ml-0' : 'md:ml-12'}`}>
                                            {/* Large number indicator */}
                                            <div className="flex items-start gap-8 mb-6">
                                                <div className="relative">
                                                    <div className="w-16 h-16 md:w-20 md:h-20 bg-white group-hover:bg-red-600 transition-all duration-300 flex items-center justify-center rotate-3 group-hover:rotate-0 group-hover:scale-110">
                                                        <span className="text-4xl md:text-5xl font-black text-black group-hover:text-white" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                                                            {i + 1}
                                                        </span>
                                                    </div>
                                                    {/* Accent square */}
                                                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-red-500 group-hover:bg-white transition-colors duration-300"></div>
                                                </div>

                                                {/* Title */}
                                                <div className="flex-1 pt-2">
                                                    <h3 className="text-3xl md:text-4xl font-black text-white mb-2 leading-tight tracking-tight group-hover:text-red-600 transition-colors duration-300">
                                                        {item.title}
                                                    </h3>
                                                    {/* Decorative line */}
                                                    <div className="h-1 bg-white w-0 group-hover:w-full transition-all duration-500 ease-out"></div>
                                                </div>
                                            </div>

                                            {/* Description with reveal effect */}
                                            <div className="relative overflow-hidden">
                                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none"></div>
                                                <p className="text-base md:text-lg text-gray-400 leading-relaxed pl-0 md:pl-28 relative">
                                                    {item.desc}
                                                </p>
                                            </div>

                                            {/* Decorative elements */}
                                            <div className="mt-6 flex gap-2 pl-0 md:pl-28">
                                                <div className="h-1 w-12 bg-red-500 group-hover:w-24 transition-all duration-300"></div>
                                                <div className="h-1 w-8 bg-white group-hover:w-16 transition-all duration-300 delay-75"></div>
                                                <div className="h-1 w-4 bg-red-500 group-hover:w-12 transition-all duration-300 delay-150"></div>
                                            </div>
                                        </div>
                                    </div>
                                </AnimatedItem>
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