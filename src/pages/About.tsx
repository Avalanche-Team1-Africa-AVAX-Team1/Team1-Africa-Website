import { motion } from 'framer-motion';
import Footer from '../components/footer';
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
        <div className="bg-black min-h-screen text-white overflow-x-hidden selection:bg-red-500 selection:text-white cursor-none">
            <CustomCursor />

            {/* Hero Section - Video Mask Logo */}
            <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
                {/* 1. The Video Layer (Bottom) */}
                <div className="absolute inset-0 z-0">
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
                <div className="absolute inset-0 z-10 bg-black mix-blend-multiply flex items-center justify-center">
                    <LogoMask />
                </div>

                {/* 3. The Outline Layer (Top) */}
                <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                    <LogoOutline />
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30"
                >
                    <p className="text-sm font-mono animate-bounce text-white/50">KEEP SCROLLING</p>
                </motion.div>
            </section>

            {/* Manifesto / Mission */}
            <section className="py-20 md:py-32 px-6 md:px-12 laptop:px-20 bg-white text-black relative z-10 rounded-t-[2rem] md:rounded-t-[3rem] -mt-10">
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
                                <p className="text-lg md:text-xl font-medium text-gray-600 max-w-md">
                                    Team1 is built for Africans shaping the next greastest technological innovations, from gaming to blockchain and creator platforms to scalable software and custom blockchains on Avalanche.

                                </p>
                            </AnimatedText>
                        </div>

                        <div className="space-y-0 relative">
                            {[{
                                title: "Built for an Emerging Market",
                                desc: "Africa is one of the world's fastest-emerging markets, and Team1 exists to help Africans build for it first. From games and creator platforms to scalable software, we support builders using Avalanche to solve real problems at massive scale."
                            }, {
                                title: "Avalanche as the Backbone",
                                desc: "Emerging markets need infrastructure that doesn't break under pressure. Avalanche's low fees, fast finality, and custom L1s give African builders the freedom to launch games, platforms, and digital economies designed for growth from day one."
                            }, {
                                title: "Local Builders, Global Impact",
                                desc: "Team1 helps Africans turn local insight into global products — connecting builders from an emerging market to the Avalanche ecosystem so they can compete, scale, and win on a worldwide stage."
                            }].map((item, i) => (
                                <AnimatedItem key={i}>
                                    <div className="group relative mb-16 md:mb-24">
                                        {/* Rotated background number */}
                                        <div className="absolute -left-4 md:-left-8 top-0 -rotate-12 opacity-5 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none">
                                            <span className="text-[12rem] md:text-[15rem] font-black text-red-500 leading-none" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                                                {i + 1}
                                            </span>
                                        </div>

                                        {/* Content container with offset */}
                                        <div className={`relative ${i % 2 === 0 ? 'md:ml-0' : 'md:ml-12'}`}>
                                            {/* Large number indicator */}
                                            <div className="flex items-start gap-8 mb-6">
                                                <div className="relative">
                                                    <div className="w-16 h-16 md:w-20 md:h-20 bg-black group-hover:bg-red-600 transition-all duration-300 flex items-center justify-center rotate-3 group-hover:rotate-0 group-hover:scale-110">
                                                        <span className="text-4xl md:text-5xl font-black text-white" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                                                            {i + 1}
                                                        </span>
                                                    </div>
                                                    {/* Accent square */}
                                                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-red-500 group-hover:bg-black transition-colors duration-300"></div>
                                                </div>

                                                {/* Title */}
                                                <div className="flex-1 pt-2">
                                                    <h3 className="text-3xl md:text-4xl font-black text-black mb-2 leading-tight tracking-tight group-hover:text-red-600 transition-colors duration-300">
                                                        {item.title}
                                                    </h3>
                                                    {/* Decorative line */}
                                                    <div className="h-1 bg-black w-0 group-hover:w-full transition-all duration-500 ease-out"></div>
                                                </div>
                                            </div>

                                            {/* Description with reveal effect */}
                                            <div className="relative overflow-hidden">
                                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none"></div>
                                                <p className="text-base md:text-lg text-gray-700 leading-relaxed pl-0 md:pl-28 relative">
                                                    {item.desc}
                                                </p>
                                            </div>

                                            {/* Decorative elements */}
                                            <div className="mt-6 flex gap-2 pl-0 md:pl-28">
                                                <div className="h-1 w-12 bg-red-500 group-hover:w-24 transition-all duration-300"></div>
                                                <div className="h-1 w-8 bg-black group-hover:w-16 transition-all duration-300 delay-75"></div>
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

            <Footer />
        </div>
    );
};

export default About;