import { useState, useEffect, useRef } from 'react';
import AnimatedText from './AnimatedText';
import AppImage from './ui/AppImage';
import event1 from '../assets/event1-img.png'
import event1Webp from '../assets/event1-img.webp'
import event2 from '../assets/event2-img.png'
import event2Webp from '../assets/event2-img.webp'
import avaxlogo from '../assets/logo.png'
import abstractBg from '../assets/abstract.png'
import characterVideo from '../assets/videos/character.mp4'
import computerVideo from '../assets/videos/computer.mp4'
import homeVideo from '../assets/videos/home.mp4'
import robotVideo from '../assets/videos/robot.mp4'

const Stats = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [eventsCount, setEventsCount] = useState(0);
    const [membersCount, setMembersCount] = useState(0);
    const [toursCount, setToursCount] = useState(0);
    const [bountyCount, setBountyCount] = useState(0);
    const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
    const [isHovering, setIsHovering] = useState(false);
    const [waveOffset, setWaveOffset] = useState(0);
    const statsRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !isVisible) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.3 }
        );

        if (statsRef.current) {
            observer.observe(statsRef.current);
        }

        return () => observer.disconnect();
    }, [isVisible]);

    useEffect(() => {
        if (isVisible) {
            // Animate Events count (0 to 138)
            const eventsInterval = setInterval(() => {
                setEventsCount(prev => {
                    if (prev >= 138) {
                        clearInterval(eventsInterval);
                        return 138;
                    }
                    return prev + 2;
                });
            }, 30);

            // Animate Members count (0 to 1400)
            const membersInterval = setInterval(() => {
                setMembersCount(prev => {
                    if (prev >= 1400) {
                        clearInterval(membersInterval);
                        return 1400;
                    }
                    return prev + 20;
                });
            }, 20);

            // Animate Tours count (0 to 37)
            const toursInterval = setInterval(() => {
                setToursCount(prev => {
                    if (prev >= 37) {
                        clearInterval(toursInterval);
                        return 37;
                    }
                    return prev + 1;
                });
            }, 50);

            // Animate Bounty count (0 to 25)
            const bountyInterval = setInterval(() => {
                setBountyCount(prev => {
                    if (prev >= 25) {
                        clearInterval(bountyInterval);
                        return 25;
                    }
                    return prev + 1;
                });
            }, 60);

            return () => {
                clearInterval(eventsInterval);
                clearInterval(membersInterval);
                clearInterval(toursInterval);
                clearInterval(bountyInterval);
            };
        }
    }, [isVisible]);

    // Wave animation - travels left to right
    useEffect(() => {
        let animationId: number;
        let startTime: number | null = null;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            // Complete cycle every 4 seconds, traveling from -100 to 200
            const progress = (elapsed % 4000) / 4000;
            const offset = -100 + (progress * 300);
            setWaveOffset(offset);
            animationId = requestAnimationFrame(animate);
        };

        animationId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationId);
    }, []);

    // Mouse tracking handler
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setMousePos({ x, y });
    };

    return (
        <div ref={statsRef} className='w-full 2xl:min-h-screen md:min-h-[calc(100vh-20rem)] lt-1024:min-h-[calc(100vh-20rem)] relative flex flex-col justify-center items-center py-[10%] px-[6%] xl:px-0 xl:py-10 xl:h-auto overflow-visible'>

            {/* Grid Container */}
            <div className='w-full max-w-[100vw] 2xl:max-w-[1800px] mx-auto grid grid-cols-1 xl:grid-cols-[1fr_minmax(0,1000px)_1fr] 2xl:grid-cols-[1fr_minmax(0,1200px)_1fr] gap-4 xl:gap-6 items-stretch px-4 xl:px-8'>

                {/* Left Column - Image Aligned Top */}
                <div className='hidden xl:flex flex-col justify-start items-start -translate-y-20'>
                    <AppImage
                        src={event1}
                        srcWebp={event1Webp}
                        alt="event1"
                        className='w-full max-w-[280px] aspect-[3/4] rounded-2xl pointer-events-none object-cover shadow-lg'
                    />
                </div>

                {/* Center Column - Text Content + Stats Card */}
                <div className='flex flex-col items-center w-full min-w-0'>

                    {/* Text Section */}
                    <div className='w-full max-w-[90%] xl:max-w-full mx-auto'>
                        <AnimatedText
                            variant="slideUp"
                            delay={0.2}
                            className='w-full text-[1.8rem] md:text-[2rem] lg:text-[2.2rem] xl:text-[2.4rem] 2xl:text-[3rem] font-["Outfit"] font-[300] tracking-[-0.02em] text-black'
                        >
                            <div className='text-left leading-[1.08] md:leading-[1.1] lg:leading-[1.08] xl:leading-[1.05] w-fit mx-auto'>
                                Team1 Africa <span className='inline-block w-[70px] h-[70px] md:w-[100px] md:h-[100px] relative align-middle mx-[0.1em] md:mx-[0.15em] mb-[-8px] md:mb-[-15px]'>
                                    <video key="character-video" src={characterVideo} autoPlay loop muted playsInline className='w-full h-full object-cover' />
                                </span> is Avalanche's
                                <br className="block" />
                                African
                                <span className='inline-block w-[70px] h-[70px] md:w-[100px] md:h-[100px] relative align-middle mx-[0.1em] md:mx-[0.15em] mb-[-8px] md:mb-[-15px]'>
                                    <video key="home-video" src={homeVideo} autoPlay loop muted playsInline className='w-full h-full object-cover' />
                                </span>
                                network empowering <span className='inline-block w-[70px] h-[70px] md:w-[100px] md:h-[100px] relative align-middle mx-[0.1em] md:mx-[0.15em] mb-[-8px] md:mb-[-15px]'>
                                    <video key="computer-video" src={computerVideo} autoPlay loop muted playsInline className='w-full h-full object-cover' />
                                </span>
                                <br className="block" />
                                Builders <span className='inline-block w-[70px] h-[70px] md:w-[100px] md:h-[100px] relative align-middle mx-[0.1em] md:mx-[0.15em] mb-[-8px] md:mb-[-15px]'>
                                    <video key="robot-video" src={robotVideo} autoPlay loop muted playsInline className='w-full h-full object-cover' />
                                </span> and Creators
                                <br className="block" />
                                with resources to thrive on
                                <span className='inline-block relative align-middle mx-[0.15em] mb-[0.1em] w-[0.7em] h-[0.7em]'>
                                    <img src={avaxlogo} alt="logo" className='w-full h-full object-contain' />
                                </span>
                                valanche.
                            </div>
                        </AnimatedText>
                    </div>

                    {/* Stats counters with Advanced Effects */}
                    <div
                        ref={containerRef}
                        className='w-full max-w-full mx-auto mt-12 xl:mt-16 relative rounded-[32px] overflow-hidden shadow-2xl transition-transform hover:scale-[1.01] duration-500'
                        onMouseMove={handleMouseMove}
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                    >
                        {/* Background image */}
                        <div className='absolute inset-0'>
                            <img
                                src={abstractBg}
                                alt=""
                                className='w-full h-full object-cover'
                                aria-hidden="true"
                            />

                            {/* Traveling wave effect - animated light band moving left to right */}
                            <div
                                className='absolute inset-0 pointer-events-none'
                                style={{
                                    background: `linear-gradient(90deg,
                                        transparent 0%,
                                        transparent ${waveOffset}%,
                                        rgba(255,255,255,0.4) ${waveOffset + 10}%,
                                        rgba(255,255,255,0.6) ${waveOffset + 15}%,
                                        rgba(255,255,255,0.4) ${waveOffset + 20}%,
                                        transparent ${waveOffset + 30}%,
                                        transparent 100%)`,
                                    mixBlendMode: 'overlay'
                                }}
                            />

                            {/* Mouse-following magnify/distortion lens */}
                            <div
                                className='absolute inset-0 pointer-events-none transition-opacity duration-300'
                                style={{
                                    opacity: isHovering ? 1 : 0,
                                    background: `radial-gradient(circle 150px at ${mousePos.x}% ${mousePos.y}%,
                                        rgba(255,255,255,0.5) 0%,
                                        rgba(255,255,255,0.3) 20%,
                                        rgba(255,255,255,0.1) 40%,
                                        transparent 70%)`,
                                    mixBlendMode: 'overlay'
                                }}
                            />

                            {/* Distortion ring around mouse cursor */}
                            <div
                                className='absolute pointer-events-none transition-opacity duration-300'
                                style={{
                                    opacity: isHovering ? 1 : 0,
                                    width: '200px',
                                    height: '200px',
                                    left: `calc(${mousePos.x}% - 100px)`,
                                    top: `calc(${mousePos.y}% - 100px)`,
                                    borderRadius: '50%',
                                    border: '2px solid rgba(255,255,255,0.3)',
                                    boxShadow: `
                                        0 0 30px rgba(255,255,255,0.2),
                                        inset 0 0 30px rgba(255,255,255,0.1)
                                    `,
                                    transform: 'scale(1)',
                                    animation: isHovering ? 'pulse-ring 2s ease-in-out infinite' : 'none'
                                }}
                            />
                        </div>

                        {/* Text content layer - completely separate, unaffected by distortion */}
                        {/* Text content layer - completely separate, unaffected by distortion */}
                <div className='relative z-20 w-full p-8 md:p-12 xl:p-16 bg-white/5 backdrop-blur-[2px]'>
                    <div className='flex flex-col md:flex-row gap-12 md:gap-8 justify-between items-center text-center font-["Outfit"]'>

                        <div className='flex-1'>
                            <p className='text-[3.5rem] md:text-[3rem] lg:text-[4rem] xl:text-[5rem] font-[300] text-gray-900 tracking-tight leading-none'>{eventsCount}+</p>
                            <p className='text-base md:text-lg text-gray-600 font-medium mt-2 uppercase tracking-wider'>Events</p>
                        </div>

                        {/* Vertical Dividers */}
                        <div className="hidden md:block w-px h-24 bg-gradient-to-b from-transparent via-gray-400/50 to-transparent"></div>

                        <div className='flex-1'>
                            <p className='text-[3.5rem] md:text-[3rem] lg:text-[4rem] xl:text-[5rem] font-[300] text-gray-900 tracking-tight leading-none'>
                                {membersCount >= 1000 ? (membersCount / 1000).toFixed(1) : membersCount}k+
                            </p>
                            <p className='text-base md:text-lg text-gray-600 font-medium mt-2 uppercase tracking-wider'>Members</p>
                        </div>

                        <div className="hidden md:block w-px h-24 bg-gradient-to-b from-transparent via-gray-400/50 to-transparent"></div>

                        <div className='flex-1'>
                            <p className='text-[3.5rem] md:text-[3rem] lg:text-[4rem] xl:text-[5rem] font-[300] text-gray-900 tracking-tight leading-none'>{toursCount}</p>
                            <p className='text-base md:text-lg text-gray-600 font-medium mt-2 uppercase tracking-wider'>Uni Tours</p>
                        </div>

                        <div className="hidden md:block w-px h-24 bg-gradient-to-b from-transparent via-gray-400/50 to-transparent"></div>

                        <div className='flex-1'>
                            <p className='text-[3.5rem] md:text-[3rem] lg:text-[4rem] xl:text-[5rem] font-[300] text-gray-900 tracking-tight leading-none'>${bountyCount}k+</p>
                            <p className='text-base md:text-lg text-gray-600 font-medium mt-2 uppercase tracking-wider'>Bounties</p>
                        </div>
                    </div>
                </div>

                        {/* Keyframes for pulse ring animation */}
                        <style>{`
                            @keyframes pulse-ring {
                                0%, 100% { transform: scale(1); opacity: 0.8; }
                                50% { transform: scale(1.1); opacity: 0.4; }
                            }
                        `}</style>
                    </div>
                </div>

                {/* Right Column - Image Aligned Bottom */}
                <div className='hidden xl:flex flex-col justify-end items-end translate-y-20'>
                    <AppImage
                        src={event2}
                        srcWebp={event2Webp}
                        alt="event2"
                        className='w-full max-w-[280px] aspect-[3/4] rounded-2xl pointer-events-none object-cover shadow-lg'
                    />
                </div>
            </div>
        </div>
    );
}

export default Stats;