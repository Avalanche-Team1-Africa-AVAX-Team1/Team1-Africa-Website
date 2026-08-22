import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import arrowup from '../assets/arrow-up.svg'
import AnimatedText from './AnimatedText'
import MagneticButton from './MagneticButton'
import AppImage from './ui/AppImage';
import { api, type Event as ApiEvent } from '../lib/api';

// Import fallback images
import event1 from '../assets/event1-img.webp';
import event1Webp from '../assets/event1-img.webp';
import event2 from '../assets/event2-img.webp';
import event2Webp from '../assets/event2-img.webp';
import event3 from '../assets/event3.webp';
import event3Webp from '../assets/event3.webp';
import event4 from '../assets/event4.webp';
import event4Webp from '../assets/event4.webp';
import event5 from '../assets/event5.webp';
import event5Webp from '../assets/event5.webp';
import event6 from '../assets/event6.webp';
import event6Webp from '../assets/event6.webp';
import event7 from '../assets/event7.webp';
import event7Webp from '../assets/event7.webp';
import event8 from '../assets/event8.webp';
import event8Webp from '../assets/event8.webp';

// Type for arch position return value
type ArchPosition =
    | { visible: false }
    | {
        x: number;
        y: number;
        rotation: number;
        scale: number;
        opacity: number;
        zIndex: number;
        visible: true;
    };

interface EventImage {
    src: string;
    srcWebp: string;
    alt: string;
}

const EventsAPI = () => {
    const navigate = useNavigate();
    const [scrollPosition, setScrollPosition] = useState(0);
    const animationIdRef = useRef<number | null>(null);
    const [isFlatLayout, setIsFlatLayout] = useState(false);
    const [viewportWidth, setViewportWidth] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 1920);
    const speedRef = useRef(0.0025);

    // API state
    const [upcomingEvents, setUpcomingEvents] = useState<ApiEvent[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fallback images if API fails or no events
    const fallbackImages: EventImage[] = [
        { src: event1, srcWebp: event1Webp, alt: "Team1 Africa Event 1" },
        { src: event2, srcWebp: event2Webp, alt: "Team1 Africa Event 2" },
        { src: event3, srcWebp: event3Webp, alt: "Team1 Africa Event 3" },
        { src: event4, srcWebp: event4Webp, alt: "Team1 Africa Event 4" },
        { src: event5, srcWebp: event5Webp, alt: "Team1 Africa Event 5" },
        { src: event6, srcWebp: event6Webp, alt: "Team1 Africa Event 6" },
        { src: event7, srcWebp: event7Webp, alt: "Team1 Africa Event 7" },
        { src: event8, srcWebp: event8Webp, alt: "Team1 Africa Event 8" },
    ];

    // Fetch upcoming events from API
    useEffect(() => {
        async function fetchEvents() {
            try {
                setLoading(true);
                const events = await api.getUpcomingEvents();
                setUpcomingEvents(events);
                setLoading(false);
            } catch (err) {
                console.error('Failed to fetch events:', err);
                setError(err instanceof Error ? err.message : 'Failed to load events');
                setLoading(false);
                // Will fall back to hardcoded images
            }
        }
        fetchEvents();
    }, []);

    // Convert API events to image format, or use fallback
    const baseImages: EventImage[] = upcomingEvents.length > 0
        ? upcomingEvents.map((event, index) => ({
            src: event.coverImage || fallbackImages[index % fallbackImages.length].src,
            srcWebp: event.coverImage || fallbackImages[index % fallbackImages.length].srcWebp,
            alt: event.title
        }))
        : fallbackImages;

    // Continuous smooth scrolling using requestAnimationFrame
    useEffect(() => {
        const animate = () => {
            setScrollPosition((prev) => prev - speedRef.current);
            animationIdRef.current = requestAnimationFrame(animate);
        };

        animationIdRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationIdRef.current) {
                cancelAnimationFrame(animationIdRef.current);
            }
        };
    }, []);

    // Toggle flat layout for tablet and smaller screens
    useEffect(() => {
        const updateLayoutMode = () => {
            const width = window.innerWidth;
            setViewportWidth(width);
            setIsFlatLayout(width <= 1023);
            if (width <= 1023) {
                speedRef.current = 0.0012;
            } else {
                speedRef.current = 0.0025;
            }
        };
        updateLayoutMode();
        window.addEventListener('resize', updateLayoutMode);
        return () => window.removeEventListener('resize', updateLayoutMode);
    }, []);

    // Calculate arch position for any image index with smooth continuous movement
    const getArchPosition = (index: number, offset: number): ArchPosition => {
        const totalImages = baseImages.length;
        const coreVisiblePositions = isFlatLayout ? 3 : 5;
        const fadeZoneWidth = isFlatLayout ? 1.0 : 1.2;
        const totalVisibleRange = coreVisiblePositions + (fadeZoneWidth * 2);

        const relativePosition = (index - offset + totalImages * 10) % totalImages;

        if (relativePosition >= totalVisibleRange) {
            return { visible: false };
        }

        let opacity = 1;

        if (relativePosition < fadeZoneWidth) {
            const fadeProgress = relativePosition / fadeZoneWidth;
            opacity = Math.max(0, fadeProgress);
        } else if (relativePosition > coreVisiblePositions + fadeZoneWidth) {
            const fadeProgress = (relativePosition - (coreVisiblePositions + fadeZoneWidth)) / fadeZoneWidth;
            opacity = Math.max(0, 1 - fadeProgress);
        } else {
            opacity = 1;
        }

        if (opacity < 0.05) {
            return { visible: false };
        }

        const adjustedPosition = relativePosition - fadeZoneWidth;
        const t = adjustedPosition / (coreVisiblePositions - 1);

        let x: number;
        if (isFlatLayout) {
            let start = 5;
            let span = 90;
            if (viewportWidth <= 480) { start = 4; span = 92; }
            else if (viewportWidth <= 640) { start = 5; span = 90; }
            else if (viewportWidth <= 900) { start = 7; span = 84; }
            else { start = 7; span = 82; }
            x = start + (t * span);
        } else {
            let startX = 2;
            let span = 96;
            if (viewportWidth <= 1440) { startX = 6; span = 88; }
            else if (viewportWidth <= 1919) { startX = 4; span = 92; }
            x = startX + (t * span);
        }

        let y: number;
        let rotation: number;
        if (isFlatLayout) {
            y = 48;
            rotation = 0;
        } else {
            let archHeight = 25;
            let centerY = 65;
            if (viewportWidth <= 1440) { archHeight = 20; centerY = 58; }
            else if (viewportWidth <= 1919) { archHeight = 22; centerY = 60; }
            y = centerY - (Math.sin(t * Math.PI) * archHeight);
            rotation = (t - 0.5) * 30;
        }

        const scale = 1;
        const distanceFromCenter = Math.abs(t - 0.5) * 2;
        const zIndex = Math.floor(10 - (distanceFromCenter * 9));

        return {
            x,
            y,
            rotation,
            scale,
            opacity,
            zIndex: Math.max(zIndex, 1),
            visible: true
        };
    };

    return (
        <div className='w-full py-20 bg-white relative overflow-hidden'>
            {/* Header */}
            <div className="text-center mb-16 relative z-10">
                <AnimatedText variant="scale" delay={0.1}>
                    <div className='mb-6'>
                        <span className='bg-red-500 px-4 py-2 rounded-lg text-sm inline-block transform font-bold text-white'>
                            Events
                        </span>
                    </div>
                </AnimatedText>
                <AnimatedText variant="slideUp" delay={0.2}>
                    <h2 className='text-5xl font-bold text-black mb-8'>
                        {loading ? 'Loading Events...' : error ? 'See Our Past Events' : 'Upcoming Events'}
                    </h2>
                </AnimatedText>
            </div>

            {/* Events Arch - CONTINUOUS INFINITE SCROLL */}
            <AnimatedText
                variant="fadeIn"
                delay={0.3}
                className="relative w-full h-[900px] lt-1920:h-[680px] lt-1440:h-[560px] lt-1024:h-[420px] lt-768:h-[360px] lt-480:h-[320px] flex items-center justify-center overflow-hidden"
            >
                <div className="arch-container relative w-full h-full">
                    {baseImages.map((image, index) => {
                        const position = getArchPosition(index, scrollPosition);

                        if (!position.visible) return null;

                        return (
                            <div
                                key={`${image.alt}-${index}`}
                                className="absolute cursor-pointer"
                                style={{
                                    willChange: 'transform',
                                    backfaceVisibility: 'hidden',
                                    left: `${position.x}%`,
                                    top: `${position.y}%`,
                                    transform: `translate3d(-50%, -50%, 0) rotate(${position.rotation}deg) scale(${position.scale})`,
                                    width: '430px',
                                    height: '530px',
                                    zIndex: position.zIndex,
                                    opacity: position.opacity,
                                }}
                            >
                                <AppImage
                                    src={image.src}
                                    srcWebp={image.srcWebp}
                                    alt={image.alt}
                                    className="w-full h-full object-cover rounded-xl"
                                    placeholderColor="#f0f0f0"
                                />
                            </div>
                        );
                    })}
                </div>

                <div className='absolute bottom-0 left-0 right-0 z-10 lt-1024:hidden'>
                    <div className="text-center mb-4">
                        <AnimatedText variant="slideUp" delay={0.4}>
                            <p className='text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed'>
                                Events organized and built by Africans, for Africans, amplifying voices and
                                empowering builders within the Avalanche ecosystem. Explore photos capturing all
                                the action from the most recent Team1 Africa Avalanche events.
                            </p>
                        </AnimatedText>
                    </div>

                    <AnimatedText variant="fadeIn" delay={0.5}>
                        <MagneticButton
                            onClick={() => navigate('/events')}
                            className='w-fit btn-outline border-2 border-gray-200 text-gray-700 px-6 py-3 mx-auto rounded-full font-medium transition-colors flex items-center gap-2 group cursor-pointer lg:hover:text-white lg:hover:border-red-500'
                        >
                            <span className="relative z-10">See All Events</span>
                            <img src={arrowup} alt="" width={20} height={20} className='relative z-10' />
                        </MagneticButton>
                    </AnimatedText>
                </div>
            </AnimatedText>

            {/* Mobile/Tablet description below images */}
            <div className='hidden lt-1024:block mt-6 px-4'>
                <div className="text-center mb-4">
                    <AnimatedText variant="slideUp" delay={0.4}>
                        <p className='text-base lt-768:text-[0.95rem] text-gray-600 max-w-2xl mx-auto leading-relaxed'>
                            Events organized and built by Africans, for Africans, amplifying voices and
                            empowering builders within the Avalanche ecosystem. Explore photos capturing all
                            the action from the most recent Team1 Africa Avalanche events.
                        </p>
                    </AnimatedText>
                </div>
                <AnimatedText variant="fadeIn" delay={0.5}>
                    <MagneticButton
                        onClick={() => navigate('/events')}
                        className='w-fit bg-black text-white px-6 py-3 mx-auto rounded-full font-medium transition-colors flex items-center gap-2 group cursor-pointer'
                    >
                        See All Events
                        <img src={arrowup} alt="" width={20} height={20} />
                    </MagneticButton>
                </AnimatedText>
            </div>

            {/* Responsive Styles */}
            <style>{`
                .arch-container > div {
                    margin: 0 14px !important;
                }
                
                @media (max-width: 1919px) and (min-width: 1441px) {
                    .arch-container > div {
                        width: 300px !important;
                        height: 400px !important;
                        margin: 0 40px !important;
                    }
                }
                @media (max-width: 1440px) {
                    .arch-container > div {
                        width: 260px !important;
                        height: 340px !important;
                        margin: 0 22px !important;
                    }
                }
                @media (max-width: 1200px) {
                    .arch-container > div {
                        width: 240px !important;
                        height: 300px !important;
                        margin: 0 14px !important;
                    }
                }
                
                @media (max-width: 900px) {
                    .arch-container > div {
                        width: 210px !important;
                        height: 270px !important;
                        margin: 0 12px !important;
                    }
                }
                
                @media (max-width: 640px) {
                    .arch-container > div {
                        width: 185px !important;
                        height: 240px !important;
                        margin: 0 16px !important;
                    }
                }

                @media (max-width: 480px) {
                    .arch-container > div {
                        width: 165px !important;
                        height: 220px !important;
                        margin: 0 18px !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default EventsAPI;
