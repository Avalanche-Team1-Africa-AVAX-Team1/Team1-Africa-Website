import { useState, useEffect } from 'react';

// Import images properly
import event1 from '../assets/event1-img.png';
import event2 from '../assets/event2-img.png';

const Events = () => {
    const [scrollPosition, setScrollPosition] = useState(0);
    // const [isPaused, setIsPaused] = useState(false);

    // 12 event images using the same pattern as original
    const baseImages = [
        { src: event1, alt: "Team1 Africa Event 1" },
        { src: event2, alt: "Team1 Africa Event 2" },
        { src: event1, alt: "Team1 Africa Event 3" },
        { src: event2, alt: "Team1 Africa Event 4" },
        { src: event1, alt: "Team1 Africa Event 5" },
        { src: event2, alt: "Team1 Africa Event 6" },
        { src: event1, alt: "Team1 Africa Event 7" },
        { src: event2, alt: "Team1 Africa Event 8" },
        { src: event1, alt: "Team1 Africa Event 9" },
        { src: event2, alt: "Team1 Africa Event 10" },
        { src: event1, alt: "Team1 Africa Event 11" },
        { src: event2, alt: "Team1 Africa Event 12" },
    ];

    // Note: Using baseImages directly with modulo arithmetic for seamless infinite loop

    // Continuous smooth scrolling
    useEffect(() => {
        const interval = setInterval(() => {
            setScrollPosition((prev) => prev + 0.002); // Slightly slower for smoother movement
        }, 16); // 60fps for smooth animation

        return () => clearInterval(interval);
    });

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

        // Arch curve mathematics for smooth continuous positioning
        const x = Math.round((5 + (t * 90)) * 100) / 100; // Round to 2 decimal places for stability

        // Create arch curve for Y position
        const archHeight = 25;
        const centerY = 65;
        const y = Math.round((centerY - (Math.sin(t * Math.PI) * archHeight)) * 100) / 100;

        // Rotation based on position along arch
        const rotation = Math.round(((t - 0.5) * 30) * 100) / 100; // Round rotation for stability

        // Keep all images the same size
        const scale = 1; // All images same size

        // Z-index based on position (center highest for proper layering)
        const distanceFromCenter = Math.abs(t - 0.5) * 2; // 0 to 1
        const zIndex = Math.round(10 - (distanceFromCenter * 9));

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
                className="relative w-full h-[900px] mb-16 flex items-center justify-center overflow-hidden"
            >
                <div className="arch-container relative w-full h-full">
                    {/* Render only 5 visible images with smooth continuous movement */}
                    {baseImages.map((image, index) => {
                        const position = getArchPosition(index, scrollPosition);

                        if (!position.visible) return null;

                        return (
                            <div
                                key={`${image.alt}-${index}`}
                                className="absolute cursor-pointer hover:scale-110 transition-transform duration-300"
                                style={{
                                    willChange: 'transform', // Optimize for animations
                                    backfaceVisibility: 'hidden', // Reduce flickering
                                    left: `${position.x}%`,
                                    top: `${position.y}%`,
                                    transform: `translate(-50%, -50%) rotate(${position.rotation}deg) scale(${position.scale})`,
                                    width: '430px', // Slightly smaller for better spacing
                                    height: '530px',
                                    zIndex: position.zIndex,
                                    opacity: position.opacity,
                                    margin: '0 10px', // Add horizontal spacing
                                }}
                            >
                                <div className="bg-white rounded-2xl p-4 w-full h-full mx-2"> {/* Added horizontal margin */}
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
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Description */}
            <div className="text-center mb-4 border-2 border-red-600">
                <p className='text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed'>
                    Events organized and built by Africans, for Africans, amplifying voices and
                    empowering builders within the Avalanche ecosystem. Explore photos capturing all
                    the action from the most recent Team1 Africa Avalanche events.
                </p>
            </div>

            {/* Call to Action */}
            <div className="text-center">
                <button className="inline-flex items-center px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors duration-300 group">
                    See All Events
                    <svg
                        className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
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