import { useState, useEffect } from 'react';

// Import images properly
import event1 from '../assets/event1-img.png';
import event2 from '../assets/event2-img.png';

const Events = () => {
    const [currentOffset, setCurrentOffset] = useState(0);
    
    // 12 event images - duplicated for infinite scroll
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
    
    // Create infinite array by duplicating images
    const eventImages = [...baseImages, ...baseImages, ...baseImages];

    // Auto-advance infinite slideshow
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentOffset((prev) => prev + 1);
        }, 2000); // Move every 2 seconds
        return () => clearInterval(interval);
    }, []);


    return (
        <div className='w-full py-20 bg-white relative overflow-hidden'>
            {/* Header */}
            <div className="text-center mb-16 relative z-10">
                <span className='bg-red-500 px-4 py-2 rounded-lg text-sm inline-block transform -rotate-12 font-bold text-white mb-6'>
                    Events
                </span>
                <h2 className='text-5xl font-bold text-black mb-8'>See Our Past Events</h2>
            </div>
            
            {/* Events Arch - INFINITE SLIDESHOW */}
            <div className="relative w-full h-[900px] mb-16 flex items-center justify-center overflow-hidden">
                <div className="arch-container relative w-full h-full">
                    {/* Show 7 visible images that slide infinitely */}
                    {Array.from({length: 7}).map((_, index) => {
                        // Calculate which image to show (with infinite loop)
                        const imageIndex = (currentOffset + index) % eventImages.length;
                        const image = eventImages[imageIndex];
                        
                        // Position along the arch
                        const totalImages = 7;
                        const totalWidth = 120;
                        const startOffset = -10;
                        const spacing = totalWidth / (totalImages - 1);
                        const x = startOffset + (index * spacing);
                        
                        // Create arch curve for Y position
                        const angle = (index / (totalImages - 1)) * Math.PI;
                        const archHeight = 25;
                        const centerY = 60;
                        const y = centerY - (Math.sin(angle) * archHeight);
                        
                        const rotation = 0;
                        
                        return (
                            <div
                                key={`${imageIndex}-${index}`}
                                className="absolute transition-all duration-1000 ease-in-out"
                                style={{
                                     left: `${x}%`,
                                     top: `${y}%`,
                                     transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
                                     width: '380px',
                                     height: '520px',
                                     zIndex: index === 3 ? 10 : 5, // Center image on top
                                     opacity: 1,
                                 }}
                            >
                                <div className="bg-white rounded-2xl shadow-2xl p-3 w-full h-full hover:scale-105 transition-transform duration-300">
                                    <img
                                        src={image.src}
                                        alt={image.alt}
                                        className="w-full h-full object-cover rounded-xl"
                                        onLoad={() => console.log(`✅ Infinite Slideshow Image loaded`)}
                                        onError={(e) => {
                                            console.error(`❌ Infinite Slideshow Image failed`);
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
            <div className="text-center mb-16">
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

            <style>{`
                .events-arch-container {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .event-card-item {
                    position: absolute;
                    cursor: pointer;
                    transition: all 0.7s cubic-bezier(0.4, 0, 0.2, 1);
                    will-change: transform, opacity;
                }

                /* Position -2 (far left, partially visible) */
                .event-card-item[data-position="-2"] {
                    transform: translate(-420px, 140px) rotate(-30deg) scale(0.7);
                    opacity: 0.4;
                    z-index: 1;
                    width: 240px;
                    height: 180px;
                    clip-path: inset(0 60% 0 0);
                }

                /* Position -1 (left, partially visible) */
                .event-card-item[data-position="-1"] {
                    transform: translate(-280px, 40px) rotate(-15deg) scale(0.85);
                    opacity: 0.7;
                    z-index: 2;
                    width: 280px;
                    height: 210px;
                    clip-path: inset(0 30% 0 0);
                }

                /* Position 0 (center, fully visible and largest) */
                .event-card-item[data-position="0"] {
                    transform: translate(0px, 0px) rotate(0deg) scale(1);
                    opacity: 1;
                    z-index: 5;
                    width: 320px;
                    height: 240px;
                }

                /* Position 1 (right, partially visible) */
                .event-card-item[data-position="1"] {
                    transform: translate(280px, 40px) rotate(15deg) scale(0.85);
                    opacity: 0.7;
                    z-index: 2;
                    width: 280px;
                    height: 210px;
                    clip-path: inset(0 0 0 30%);
                }

                /* Position 2 (far right, partially visible) */
                .event-card-item[data-position="2"] {
                    transform: translate(420px, 140px) rotate(30deg) scale(0.7);
                    opacity: 0.4;
                    z-index: 1;
                    width: 240px;
                    height: 180px;
                    clip-path: inset(0 0 0 60%);
                }

                .event-card-item:hover {
                    z-index: 10 !important;
                }

                /* Responsive adjustments */
                @media (max-width: 1200px) {
                    .event-card-item[data-position="-2"] {
                        transform: translate(-350px, 120px) rotate(-30deg) scale(0.6);
                        width: 200px;
                        height: 150px;
                    }
                    .event-card-item[data-position="-1"] {
                        transform: translate(-220px, 30px) rotate(-15deg) scale(0.75);
                        width: 240px;
                        height: 180px;
                    }
                    .event-card-item[data-position="0"] {
                        width: 280px;
                        height: 210px;
                    }
                    .event-card-item[data-position="1"] {
                        transform: translate(220px, 30px) rotate(15deg) scale(0.75);
                        width: 240px;
                        height: 180px;
                    }
                    .event-card-item[data-position="2"] {
                        transform: translate(350px, 120px) rotate(30deg) scale(0.6);
                        width: 200px;
                        height: 150px;
                    }
                }

                @media (max-width: 900px) {
                    .event-card-item[data-position="-2"] {
                        transform: translate(-280px, 100px) rotate(-25deg) scale(0.5);
                        width: 160px;
                        height: 120px;
                    }
                    .event-card-item[data-position="-1"] {
                        transform: translate(-180px, 25px) rotate(-12deg) scale(0.7);
                        width: 200px;
                        height: 150px;
                    }
                    .event-card-item[data-position="0"] {
                        width: 240px;
                        height: 180px;
                    }
                    .event-card-item[data-position="1"] {
                        transform: translate(180px, 25px) rotate(12deg) scale(0.7);
                        width: 200px;
                        height: 150px;
                    }
                    .event-card-item[data-position="2"] {
                        transform: translate(280px, 100px) rotate(25deg) scale(0.5);
                        width: 160px;
                        height: 120px;
                    }
                }

                @media (max-width: 640px) {
                    .event-card-item[data-position="-2"],
                    .event-card-item[data-position="2"] {
                        display: none;
                    }
                    .event-card-item[data-position="-1"] {
                        transform: translate(-140px, 20px) rotate(-10deg) scale(0.75);
                        width: 180px;
                        height: 135px;
                        clip-path: inset(0 40% 0 0);
                    }
                    .event-card-item[data-position="0"] {
                        width: 200px;
                        height: 150px;
                    }
                    .event-card-item[data-position="1"] {
                        transform: translate(140px, 20px) rotate(10deg) scale(0.75);
                        width: 180px;
                        height: 135px;
                        clip-path: inset(0 0 0 40%);
                    }
                }
            `}</style>
        </div>
    );
};

export default Events;