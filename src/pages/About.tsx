import { motion } from 'framer-motion';
import Footer from '../components/footer';
import TeamGrid from '../components/TeamGrid';
import LetsBuildSection from '../components/LetsBuildSection';
import { team1AfricaMembers } from '../data/team-members';
import CustomCursor from '../components/CustomCursor';
import videoSrc from '../assets/videos/video.mp4';
import { LogoMask, LogoOutline } from '../components/LogoMask';
import AnimatedText from '../components/AnimatedText';
import AnimatedSection, { AnimatedItem } from '../components/AnimatedSection';
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
            <section className="py-20 md:py-32 px-6 md:px-20 bg-white text-black relative z-10 rounded-t-[2rem] md:rounded-t-[3rem] -mt-10">
                <div className="max-w-[90vw] mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
                        <div className="lg:sticky lg:top-32">
                            <AnimatedText variant="slideUp" delay={0.2}>
                                <h2 className="text-[10vw] lg:text-[5vw] font-black tracking-tighter mb-8 leading-[0.9]" data-cursor="Our Mission">
                                    WHERE AFRICA <br />
                                    BUILDS ON <br />
                                    <span className="text-red-600">AVALANCHE</span>
                                </h2>
                            </AnimatedText>
                            <AnimatedText variant="slideUp" delay={0.3}>
                                <p className="text-lg md:text-xl font-medium text-gray-600 max-w-md">
                                    Team1 Africa is the continent's home for Avalanche builders—connecting talent with training, funding, and opportunities to ship world-class blockchain products.
                                </p>
                            </AnimatedText>
                        </div>
                        <AnimatedSection staggerChildren={0.2} className="space-y-16 md:space-y-24 text-xl md:text-2xl font-light leading-relaxed">
                            {[{
                                title: "Why Avalanche",
                                desc: "Speed matters. Scalability matters. Avalanche's sub-second finality and customizable subnets give African builders the infrastructure to compete globally—without compromise."
                            }, {
                                title: "Community-First",
                                desc: "Developers, designers, creators, students—we're a cross-continental network united by one mission. From local meetups to continental hackathons, Team1 shows up for African builders."
                            }, {
                                title: "Build Careers, Not Just Skills",
                                desc: "We turn blockchain curiosity into professional capability. Through mentorship, workshops, and direct funding, Team1 helps you go from learning Solidity to launching your first protocol."
                            }].map((item, i) => (
                                <AnimatedItem key={i}>
                                    <span className="text-4xl md:text-5xl font-bold block mb-4 text-red-500">0{i + 1}.</span>
                                    <h3 className="text-3xl md:text-4xl font-black mb-4 uppercase">{item.title}</h3>
                                    <p>{item.desc}</p>
                                </AnimatedItem>
                            ))}
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* Values - Infinite Scroll */}
            <section className="py-12 md:py-20 bg-red-600 text-white overflow-hidden">
                <div className="flex whitespace-nowrap animate-infinite-scroll">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="flex items-center gap-8 mx-8">
                            <span className="text-6xl md:text-8xl font-black italic">BUILD</span>
                            <span className="text-2xl md:text-4xl">★</span>
                            <span className="text-6xl md:text-8xl font-black italic text-black">ON AVAX</span>
                            <span className="text-2xl md:text-4xl">★</span>
                            <span className="text-6xl md:text-8xl font-black italic">FROM AFRICA</span>
                            <span className="text-2xl md:text-4xl">★</span>
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