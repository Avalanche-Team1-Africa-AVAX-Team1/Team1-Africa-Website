import { useState, useEffect } from 'react';
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
    // const [isPaused, setIsPaused] = useState(false);

    // 12 event images using the same pattern as original
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

    // Note: Using baseImages directly with modulo arithmetic for seamless infinite loop

    // Continuous smooth scrolling with requestAnimationFrame
    useEffect(() => {
        let animationId: number;
        
        const animate = () => {
            setScrollPosition((prev) => prev - 0.0025);
            animationId = requestAnimationFrame(animate);
        };
        
        animationId = requestAnimationFrame(animate);
        
        return () => cancelAnimationFrame(animationId);
    }, []);

    // Calculate arch position for any image index with smooth continuous movement
    const getArchPosition = (index: number, offset: number) => {
        const totalImages = baseImages.length;
        const coreVisiblePositions = 5; // Main 5 images that are fully visible
        const fadeZoneWidth = 1.2; // Width of fade zones on each side
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

        // Arch curve mathematics for smooth continuous positioning with more spacing
        const x = 2 + (t * 96); // Remove rounding for smoother movement

        // Create arch curve for Y position
        const archHeight = 25;
        const centerY = 65;
        const y = centerY - (Math.sin(t * Math.PI) * archHeight); // Remove rounding for smoother movement

        // Rotation based on position along arch
        const rotation = (t - 0.5) * 30; // Remove rounding for smoother movement

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
            <div
                className="relative w-full h-[900px] flex items-center justify-center overflow-hidden"
            >
                <div className="arch-container relative w-full h-full">
                    {/* Render only 5 visible images with smooth continuous movement */}
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
                                    margin: '0 10px',
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

                <div className='absolute bottom-0 left-0 right-0 z-10'>
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

            {/* Responsive Styles */}
            <style>{`
                @media (max-width: 1200px) {
                    .arch-container > div {
                        width: 300px !important;
                        height: 420px !important;
                        margin: 0 8px !important;
                    }
                }
                
                @media (max-width: 900px) {
                    .arch-container > div {
                        width: 260px !important;
                        height: 360px !important;
                        margin: 0 6px !important;
                    }
                }
                
                @media (max-width: 640px) {
                    .arch-container > div {
                        width: 220px !important;
                        height: 300px !important;
                        margin: 0 4px !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default Events;