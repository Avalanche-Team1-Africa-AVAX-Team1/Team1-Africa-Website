import { useState, useEffect, useRef } from 'react';
import arrow from '../assets/white-arrow.svg'
import arrowup from '../assets/arrow-up.svg'

// Import images properly
import event1 from '../assets/event1-img.png';
import event2 from '../assets/event2-img.png';
import event3 from '../assets/event3.png';
import event4 from '../assets/event4.png';
import event5 from '../assets/event5.png';
import event6 from '../assets/event6.png';
import event7 from '../assets/event7.png';
import event8 from '../assets/event8.png';

const Events = () => {
    const [scrollPosition, setScrollPosition] = useState(0);
    const animationIdRef = useRef<number | null>(null);
    const [isFlatLayout, setIsFlatLayout] = useState(false); // Flatten curve on tablet/phone
    const speedRef = useRef(0.0025); // Base scroll speed; tweaked on tablet

    // 8 event images using the same pattern as original
    const baseImages = [
        { src: event1, alt: "Team1 Africa Event 1" },
        { src: event2, alt: "Team1 Africa Event 2" },
        { src: event3, alt: "Team1 Africa Event 3" },
        { src: event4, alt: "Team1 Africa Event 4" },
        { src: event5, alt: "Team1 Africa Event 5" },
        { src: event6, alt: "Team1 Africa Event 6" },
        { src: event7, alt: "Team1 Africa Event 7" },
        { src: event8, alt: "Team1 Africa Event 8" },   
    ];

    // Continuous smooth scrolling using requestAnimationFrame
    useEffect(() => {
        const animate = () => {
            setScrollPosition((prev) => prev - speedRef.current); // Use responsive speed
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
            setIsFlatLayout(window.innerWidth <= 1023); // Tablet and below
            // Slow down animation slightly on tablets
            if (window.innerWidth <= 1023) {
                speedRef.current = 0.0012; // Slow down more on tablet per request
            } else {
                speedRef.current = 0.0025; // Default speed elsewhere
            }
        };
        updateLayoutMode();
        window.addEventListener('resize', updateLayoutMode);
        return () => window.removeEventListener('resize', updateLayoutMode);
    }, []);

    // Calculate arch position for any image index with smooth continuous movement
    const getArchPosition = (index: number, offset: number) => {
        const totalImages = baseImages.length;
        const coreVisiblePositions = isFlatLayout ? 4 : 5; // Show 4 items in flat mode to reduce big gaps
        const fadeZoneWidth = isFlatLayout ? 0.6 : 1.2; // Slightly narrower fade zones on small screens
        const totalVisibleRange = coreVisiblePositions + (fadeZoneWidth * 2); // Extended range including fade zones

        // Calculate the continuous position of this image relative to the viewport
        const relativePosition = (index - offset + totalImages * 10) % totalImages;

        // Don't render if completely outside the extended range
        if (relativePosition >= totalVisibleRange) {
            return { visible: false };
        }

        // Calculate opacity for smooth edge transitions
        let opacity = 1;

        // Left fade zone (images entering from left)
        if (relativePosition < fadeZoneWidth) {
            const fadeProgress = relativePosition / fadeZoneWidth;
            opacity = Math.max(0, fadeProgress);
        }
        // Right fade zone (images exiting to right) 
        else if (relativePosition > coreVisiblePositions + fadeZoneWidth) {
            const fadeProgress = (relativePosition - (coreVisiblePositions + fadeZoneWidth)) / fadeZoneWidth;
            opacity = Math.max(0, 1 - fadeProgress);
        }
        // Core visible area - full opacity
        else {
            opacity = 1;
        }

        // If opacity is too low, don't render
        if (opacity < 0.05) {
            return { visible: false };
        }

        // Adjust positioning to account for the fade zones
        // Map the position to the display area (still 0-4 for the main arch)
        const adjustedPosition = relativePosition - fadeZoneWidth;
        const t = adjustedPosition / (coreVisiblePositions - 1); // Normalize to 0-1 for the main arch

        // Compute X/Y/rotation. For tablet/phone, use flat row; otherwise, keep arch
        const x = 2 + (t * 96);
        let y: number;
        let rotation: number;
        if (isFlatLayout) {
            y = 42; // Raise row a bit more on tablet/mobile to remove extra top space
            rotation = 0;
        } else {
            const archHeight = 25;
            const centerY = 65;
            y = centerY - (Math.sin(t * Math.PI) * archHeight);
            rotation = (t - 0.5) * 30;
        }

        // Keep all images the same size
        const scale = 1; // All images same size

        // Z-index based on position (center highest for proper layering)
        const distanceFromCenter = Math.abs(t - 0.5) * 2; // 0 to 1
        const zIndex = Math.floor(10 - (distanceFromCenter * 9)); // Use Math.floor instead of Math.round for stability

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
                <span className='bg-red-500 px-4 py-2 rounded-lg text-sm inline-block transform font-bold text-white mb-6'>
                    Events
                </span>
                <h2 className='text-5xl font-bold text-black mb-8'>See Our Past Events</h2>
            </div>

            {/* Events Arch - CONTINUOUS INFINITE SCROLL */}
            {/* Reduce container height across screens; keep 4K baseline */}
            <div
                className="relative border-2 border-red-500 w-full h-[900px] lt-1920:h-[680px] lt-1440:h-[560px] lt-1024:h-[340px] lt-768:h-[320px] lt-480:h-[300px] flex items-center justify-center overflow-hidden lt-1024:-mt-8 lt-768:-mt-10"
            >
                <div className="arch-container relative w-full h-full">
                    {/* Render only visible images with smooth continuous movement */}
                    {baseImages.map((image, index) => {
                        const position = getArchPosition(index, scrollPosition);

                        if (!position.visible) return null;

                        return (
                            <div
                                key={`${image.alt}-${index}`}
                                className="absolute cursor-pointer"
                                style={{
                                    willChange: 'transform', // Optimize for animations
                                    backfaceVisibility: 'hidden', // Reduce flickering
                                    left: `${position.x}%`,
                                    top: `${position.y}%`,
                                    transform: `translate3d(-50%, -50%, 0) rotate(${position.rotation}deg) scale(${position.scale})`,
                                    width: '430px',
                                    height: '530px',
                                    zIndex: position.zIndex,
                                    opacity: position.opacity,
                                    margin: '0 6px', // Reduce base horizontal spacing between items
                                }}
                            >
                                <img
                                    src={image.src}
                                    alt={image.alt}
                                    className="w-full h-full object-cover rounded-xl"
                                    onLoad={() => console.log(`✅ Flowing Arch Image loaded`)}
                                    onError={(e) => {
                                        console.error(`❌ Flowing Arch Image failed`);
                                        const target = e.target as HTMLImageElement;
                                        target.style.backgroundColor = '#ff9999';
                                    }}
                                />
                            </div>
                        );
                    })}
                </div>

                <div className='absolute bottom-0 left-0 right-0 z-10 lt-1024:hidden'> {/* Keep overlay text on desktop; hide on tablet/mobile */}
                    {/* Description */}
                    <div className="text-center mb-4">
                        <p className='text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed'>
                            Events organized and built by Africans, for Africans, amplifying voices and
                            empowering builders within the Avalanche ecosystem. Explore photos capturing all
                            the action from the most recent Team1 Africa Avalanche events.
                        </p>

                    </div>

                    {/* Call to Action */}
                    <div className='w-fit fill-left hover:text-white border-2 border-gray-200 text-gray-700 px-6 py-3 mx-auto rounded-full font-medium transition-colors flex items-center gap-2 group cursor-pointer'>
                        See All Events
                        <img src={arrow} alt="" width={20} height={20} className='group-hover:hidden' />
                        <img src={arrowup} alt="" width={20} height={20} className='group-hover:block hidden' />
                    </div>
                </div>
            </div>

            {/* Mobile/Tablet description below images (image above text) */}
            <div className='hidden lt-1024:block mt-6 px-4'> {/* Show static text below on tablet/mobile */}
                <div className="text-center mb-4">
                    <p className='text-base lt-768:text-[0.95rem] text-gray-600 max-w-2xl mx-auto leading-relaxed'>
                        Events organized and built by Africans, for Africans, amplifying voices and
                        empowering builders within the Avalanche ecosystem. Explore photos capturing all
                        the action from the most recent Team1 Africa Avalanche events.
                    </p>
                </div>
                <div className='w-fit fill-left hover:text-white border-2 border-gray-200 text-gray-700 px-6 py-3 mx-auto rounded-full font-medium transition-colors flex items-center gap-2 group cursor-pointer'>
                    See All Events
                    <img src={arrow} alt="" width={20} height={20} className='group-hover:hidden' />
                    <img src={arrowup} alt="" width={20} height={20} className='group-hover:block hidden' />
                </div>
            </div>

            {/* Responsive Styles - extend existing rules without touching 4K baseline */}
            <style>{`
                @media (max-width: 1919px) {
                    .arch-container > div {
                        width: 300px !important; /* Smaller on laptop large */
                        height: 400px !important;
                        margin: 0 12px !important; /* Tighten spacing */
                    }
                }
                @media (max-width: 1440px) {
                    .arch-container > div {
                        width: 260px !important; /* Smaller on laptops */
                        height: 340px !important;
                        margin: 0 10px !important; /* Tighten spacing */
                    }
                }
                @media (max-width: 1200px) {
                    .arch-container > div {
                        width: 240px !important;
                        height: 320px !important;
                        margin: 0 8px !important; /* Tight spacing */
                    }
                }
                
                @media (max-width: 900px) {
                    .arch-container > div {
                        width: 210px !important;
                        height: 290px !important;
                        margin: 0 6px !important; /* Reduce spacing on tablets */
                    }
                }
                
                @media (max-width: 640px) {
                    .arch-container > div {
                        width: 185px !important;
                        height: 250px !important;
                        margin: 0 6px !important; /* Reduce spacing on large phones */
                    }
                }

                /* Further tighten for very small phones */
                @media (max-width: 480px) {
                    .arch-container > div {
                        width: 165px !important;
                        height: 230px !important;
                        margin: 0 6px !important; /* Reduce spacing on small phones */
                    }
                }
            `}</style>
        </div>
    );
};

export default Events;