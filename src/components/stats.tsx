import { useState, useEffect, useRef } from 'react';
import AnimatedText from './AnimatedText';
import AppImage from './ui/AppImage';
import event1 from '../assets/event1-img.webp'
import event1Webp from '../assets/event1-img.webp'
import event2 from '../assets/event2-img.webp'
import event2Webp from '../assets/event2-img.webp'
import avaxlogo from '../assets/logo.webp'
import abstractBg from '../assets/abstract.webp'
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

    // --- OBSERVER & ANIMATION LOGIC ---
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
            const eventsInterval = setInterval(() => {
                setEventsCount(prev => {
                    if (prev >= 138) { clearInterval(eventsInterval); return 138; }
                    return prev + 2;
                });
            }, 30);
            const membersInterval = setInterval(() => {
                setMembersCount(prev => {
                    if (prev >= 1400) { clearInterval(membersInterval); return 1400; }
                    return prev + 20;
                });
            }, 20);
            const toursInterval = setInterval(() => {
                setToursCount(prev => {
                    if (prev >= 37) { clearInterval(toursInterval); return 37; }
                    return prev + 1;
                });
            }, 50);
            const bountyInterval = setInterval(() => {
                setBountyCount(prev => {
                    if (prev >= 25) { clearInterval(bountyInterval); return 25; }
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

    useEffect(() => {
        let animationId: number;
        let startTime: number | null = null;
        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const progress = (elapsed % 4000) / 4000;
            const offset = -100 + (progress * 300);
            setWaveOffset(offset);
            animationId = requestAnimationFrame(animate);
        };
        animationId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationId);
    }, []);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setMousePos({ x, y });
    };

    // --- RENDER ---
    return (
        <div ref={statsRef} className='w-full min-h-screen relative flex flex-col justify-center items-center py-16 px-4 md:px-8 overflow-hidden'>

            {/* RESPONSIVE GRID LAYOUT 
               - Using minmax for side columns to ensure they don't get too small or too big
               - Center column takes remaining space
            */}
            <div className='w-full max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-[220px_1fr_220px] xl:grid-cols-[260px_1fr_260px] gap-6 xl:gap-12 items-stretch'>

                {/* LEFT COLUMN - IMAGE (Aligned Top) */}
                <div className='hidden lg:flex flex-col justify-start h-full pt-4'>
                    <AppImage
                        src={event1}
                        srcWebp={event1Webp}
                        alt="event1"
                        className='w-full h-auto aspect-[3/4] rounded-2xl pointer-events-none object-cover shadow-xl hover:scale-105 transition-transform duration-700'
                    />
                </div>

                {/* CENTER COLUMN - TEXT & STATS */}
                <div className='flex flex-col items-start w-full min-w-0 z-10'>

                    {/* Headline Text Section - FORCED LEFT ALIGNMENT */}
                    <div className='w-full text-left'>
                        <AnimatedText
                            variant="slideUp"
                            delay={0.2}
                            // UPDATED FONT SIZES: Much smaller on lg screens to match your screenshot
                            className='w-full text-3xl md:text-3xl lg:text-4xl xl:text-5xl font-["Outfit"] font-[300] tracking-tight text-black'
                        >
                            <div className='leading-[1.3] md:leading-[1.2] w-full mx-auto'>
                                Team1 Africa 
                                {/* Inline Video Box - Scaled down to match text */}
                                <span className='inline-block w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 relative align-middle mx-2 -mb-2 rounded-lg overflow-hidden'>
                                    <video key="character-video" src={characterVideo} autoPlay loop muted playsInline className='w-full h-full object-cover' />
                                </span> 
                                is Team1's
                                <br className="hidden md:block" />
                                African
                                <span className='inline-block w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 relative align-middle mx-2 -mb-2 rounded-lg overflow-hidden'>
                                    <video key="home-video" src={homeVideo} autoPlay loop muted playsInline className='w-full h-full object-cover' />
                                </span>
                                network empowering 
                                <span className='inline-block w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 relative align-middle mx-2 -mb-2 rounded-lg overflow-hidden'>
                                    <video key="computer-video" src={computerVideo} autoPlay loop muted playsInline className='w-full h-full object-cover' />
                                </span>
                                <br className="hidden md:block" />
                                Builders 
                                <span className='inline-block w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 relative align-middle mx-2 -mb-2 rounded-lg overflow-hidden'>
                                    <video key="robot-video" src={robotVideo} autoPlay loop muted playsInline className='w-full h-full object-cover' />
                                </span> 
                                and Creators
                                <br className="hidden md:block" />
                                with resources to thrive on
                                <span className='inline-block relative align-middle mx-1 w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10'>
                                    <img src={avaxlogo} alt="logo" className='w-full h-full object-contain' />
                                </span>
                                valanche.
                            </div>
                        </AnimatedText>
                    </div>

                    {/* Stats Card */}
                    <div
                        ref={containerRef}
                        className='w-full mt-10 md:mt-12 relative rounded-[24px] md:rounded-[32px] overflow-hidden shadow-2xl transition-transform hover:scale-[1.01] duration-500'
                        onMouseMove={handleMouseMove}
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                    >
                        {/* Background & Effects */}
                        <div className='absolute inset-0'>
                            <img src={abstractBg} alt="" className='w-full h-full object-cover' aria-hidden="true" />
                            <div className='absolute inset-0 pointer-events-none'
                                style={{
                                    background: `linear-gradient(90deg, transparent 0%, transparent ${waveOffset}%, rgba(255,255,255,0.4) ${waveOffset + 10}%, rgba(255,255,255,0.6) ${waveOffset + 15}%, rgba(255,255,255,0.4) ${waveOffset + 20}%, transparent ${waveOffset + 30}%, transparent 100%)`,
                                    mixBlendMode: 'overlay'
                                }}
                            />
                            <div className='absolute inset-0 pointer-events-none transition-opacity duration-300'
                                style={{
                                    opacity: isHovering ? 1 : 0,
                                    background: `radial-gradient(circle 150px at ${mousePos.x}% ${mousePos.y}%, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.3) 20%, rgba(255,255,255,0.1) 40%, transparent 70%)`,
                                    mixBlendMode: 'overlay'
                                }}
                            />
                        </div>

                        {/* Content Layer */}
                        <div className='relative z-20 w-full p-6 lg:p-10 bg-white/5 backdrop-blur-[2px]'>
                            <div className='grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-4 text-center font-["Outfit"]'>

                                {/* Stat Item 1 */}
                                <div className='flex flex-col items-center justify-center'>
                                    {/* UPDATED FONT SIZE: text-7xl was too big, reduced to text-5xl for cleaner look */}
                                    <p className='text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-[300] text-gray-900 tracking-tight leading-none'>
                                        {eventsCount}+
                                    </p>
                                    <p className='text-xs md:text-sm text-gray-600 font-medium mt-2 uppercase tracking-wider'>Events</p>
                                </div>

                                {/* Stat Item 2 */}
                                <div className='flex flex-col items-center justify-center border-l md:border-l-0 border-gray-300/30 md:relative'>
                                    <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-px h-12 bg-gradient-to-b from-transparent via-gray-400/50 to-transparent"></div>
                                    <p className='text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-[300] text-gray-900 tracking-tight leading-none'>
                                        {membersCount >= 1000 ? (membersCount / 1000).toFixed(1) : membersCount}k+
                                    </p>
                                    <p className='text-xs md:text-sm text-gray-600 font-medium mt-2 uppercase tracking-wider'>Members</p>
                                </div>

                                {/* Stat Item 3 */}
                                <div className='flex flex-col items-center justify-center md:relative'>
                                    <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-px h-12 bg-gradient-to-b from-transparent via-gray-400/50 to-transparent"></div>
                                    <p className='text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-[300] text-gray-900 tracking-tight leading-none'>
                                        {toursCount}
                                    </p>
                                    <p className='text-xs md:text-sm text-gray-600 font-medium mt-2 uppercase tracking-wider'>Campus Tours</p>
                                </div>

                                {/* Stat Item 4 */}
                                <div className='flex flex-col items-center justify-center border-l md:border-l-0 border-gray-300/30 md:relative'>
                                    <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-px h-12 bg-gradient-to-b from-transparent via-gray-400/50 to-transparent"></div>
                                    <p className='text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-[300] text-gray-900 tracking-tight leading-none'>
                                        ${bountyCount}k+
                                    </p>
                                    <p className='text-xs md:text-sm text-gray-600 font-medium mt-2 uppercase tracking-wider'>Bounties</p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN - IMAGE (Aligned Bottom) */}
                <div className='hidden lg:flex flex-col justify-end h-full pb-4'>
                    <AppImage
                        src={event2}
                        srcWebp={event2Webp}
                        alt="event2"
                        className='w-full h-auto aspect-[3/4] rounded-2xl pointer-events-none object-cover shadow-xl hover:scale-105 transition-transform duration-700'
                    />
                </div>

            </div>
        </div>
    );
}

export default Stats;