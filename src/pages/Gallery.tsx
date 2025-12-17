import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

// --- ASSET IMPORTS ---
import event1 from '../assets/event1-img.webp';
import event2 from '../assets/event2-img.webp';
import event3 from '../assets/event3.webp';
import event4 from '../assets/event4.webp';
import event5 from '../assets/event5.webp';
import event6 from '../assets/event6.webp';
import event7 from '../assets/event7.webp';
import event8 from '../assets/event8.webp';
import south1 from '../assets/south1.webp';
import south2 from '../assets/south2.webp';
import south3 from '../assets/south3.webp';
import south4 from '../assets/south4.webp';
import south5 from '../assets/south5.webp';
import south6 from '../assets/south6.webp';
import south7 from '../assets/south7.webp';
import south8 from '../assets/south8.webp';
import south9 from '../assets/south9.webp';
import south10 from '../assets/south10.webp';
import south11 from '../assets/south11.webp';
import south12 from '../assets/south12.webp';
import ghana1 from '../assets/ghana1.JPG';
import ghana2 from '../assets/ghana2.JPG';
import ghana3 from '../assets/ghana3.JPG';
import ghana4 from '../assets/ghana4.JPG';

// --- CONFIGURATION ---
const MIN_IMAGE_SIZE = 400;
const MAX_IMAGE_SIZE = 450;

// INDIVIDUAL MARGIN SETTINGS
const MARGIN_MIN = 80;
const MARGIN_MAX = 100;

// NEW: GLOBAL CANVAS PADDING
// This ensures the furthest images are exactly this far from the edge of the scrollable area
const CANVAS_PADDING = 150;

const CAMERA_SPEED = 0.06;
const CAMERA_DAMPING = 20;
const CAMERA_STIFFNESS = 60;

// --- TYPES ---
interface MomentData {
    id: number;
    image: string;
    title: string;
    location: string;
    date: string;
    description: string;
}

interface Moment extends MomentData {
    x: number;
    y: number;
    size: number;
    margin: number;
}

// --- RAW DATA ---
const rawMoments: MomentData[] = [
    { id: 1, image: south1, title: 'Avalanche Africa Summit', location: 'Cape Town', date: 'March 2024', description: '300 builders from 15 countries. 12 projects demoed. 3 secured funding.' },
    { id: 2, image: event1, title: 'Lagos Smart Contract Workshop', location: 'Lagos', date: 'April 2024', description: '85 developers learned Solidity. 24 contracts deployed.' },
    { id: 3, image: ghana1, title: 'Accra Hackathon', location: 'Accra', date: 'May 2024', description: '48 hours. 47 developers. 8 dApps shipped to mainnet.' },
    { id: 4, image: event2, title: 'Nairobi DeFi Workshop', location: 'Nairobi', date: 'June 2024', description: 'First Kenyan DEX launched. 65 developers onboarded.' },
    { id: 5, image: south2, title: 'Johannesburg Web3 Summit', location: 'Johannesburg', date: 'July 2024', description: '450 attendees. $5M fund announced. 15 partnerships formed.' },
    { id: 6, image: ghana2, title: 'Kumasi University Bootcamp', location: 'Kumasi', date: 'August 2024', description: '120 students trained. 3 startups formed.' },
    { id: 7, image: event3, title: 'Abuja NFT Week', location: 'Abuja', date: 'September 2024', description: '200 participants. 8 NFT collections launched.' },
    { id: 8, image: south3, title: 'Cape Town Subnet Workshop', location: 'Cape Town', date: 'October 2024', description: '35 senior developers. First African subnet deployed.' },
    { id: 9, image: event4, title: 'Lagos DeFi Hackathon', location: 'Lagos', date: 'October 2024', description: '56 developers. Winner built micro-lending platform.' },
    { id: 10, image: south4, title: 'Durban Meetup', location: 'Durban', date: 'November 2024', description: '90 members. 6 local projects showcased.' },
    { id: 11, image: event5, title: 'Accra Developer Conference', location: 'Accra', date: 'November 2024', description: '180 engineers. 15 technical talks. 3 validator nodes launched.' },
    { id: 12, image: event6, title: 'Nairobi Year-End Celebration', location: 'Nairobi', date: 'December 2024', description: '250 community members. 30 projects from the year.' },
    { id: 13, image: event7, title: 'Addis Ababa Blockchain Forum', location: 'Addis Ababa', date: 'February 2024', description: 'First Ethiopian Web3 event. 140 attendees introduced to Avalanche.' },
    { id: 14, image: event8, title: 'Kigali Innovation Workshop', location: 'Kigali', date: 'March 2024', description: 'Government representatives explored blockchain for public services.' },
    { id: 15, image: south5, title: 'Port Elizabeth Community Gathering', location: 'Port Elizabeth', date: 'April 2024', description: 'Local developers showcased projects to investors and mentors.' },
    { id: 16, image: south6, title: 'Pretoria Tech Meetup', location: 'Pretoria', date: 'May 2024', description: '70 developers shared insights on scaling blockchain applications.' },
    { id: 17, image: ghana3, title: 'Tema Port Blockchain Summit', location: 'Tema', date: 'June 2024', description: 'Exploring blockchain for logistics. 95 industry professionals attended.' },
    { id: 18, image: ghana4, title: 'Takoradi Developer Workshop', location: 'Takoradi', date: 'July 2024', description: '60 new developers onboarded to Avalanche ecosystem.' },
    { id: 19, image: south7, title: 'Bloemfontein Innovation Day', location: 'Bloemfontein', date: 'August 2024', description: 'University students built 5 DeFi prototypes in one day.' },
    { id: 20, image: south8, title: 'East London Blockchain Expo', location: 'East London', date: 'September 2024', description: 'Regional businesses explored blockchain integration. 110 attendees.' },
    { id: 21, image: south9, title: 'Polokwane Developer Meetup', location: 'Polokwane', date: 'October 2024', description: '55 developers from northern regions connected and shared knowledge.' },
    { id: 22, image: south10, title: 'Kimberley Mining & Blockchain', location: 'Kimberley', date: 'November 2024', description: 'Exploring blockchain for mining industry transparency.' },
    { id: 23, image: south11, title: 'Nelspruit Tech Summit', location: 'Nelspruit', date: 'December 2024', description: '80 entrepreneurs learned about DeFi opportunities.' },
    { id: 24, image: south12, title: 'George Coastal Tech Day', location: 'George', date: 'January 2024', description: 'Coastal developers showcased innovative blockchain solutions.' }
];

// --- ALGORITHM: INDIVIDUAL MARGIN PACKING + SHRINK WRAP ---
const generatePositions = (data: MomentData[]): { moments: Moment[], width: number, height: number } => {
    // Initial World Size (will expand as needed)
    let currentWorldWidth = 4500;
    let currentWorldHeight = 4500;

    // Shuffle data to keep it random
    const shuffledData = [...data].sort(() => Math.random() - 0.5);

    let success = false;
    let resultingMoments: Moment[] = [];
    let attempts = 0;

    // Phase 1: Placement Loop (Expands world until everything fits without overlap)
    while (!success && attempts < 15) {
        attempts++;
        resultingMoments = [];
        const placedCircles: { x: number; y: number; r: number; margin: number }[] = [];
        let allPlaced = true;

        for (const item of shuffledData) {
            let placed = false;
            let placementAttempts = 0;

            // Random Size & Margin
            const size = Math.random() * (MAX_IMAGE_SIZE - MIN_IMAGE_SIZE) + MIN_IMAGE_SIZE;
            const radius = size / 2;
            const margin = Math.random() * (MARGIN_MAX - MARGIN_MIN) + MARGIN_MIN;

            // Try to find a spot
            while (!placed && placementAttempts < 800) {
                // Determine available space respecting padding
                const availableWidth = currentWorldWidth - (CANVAS_PADDING * 2) - size;
                const availableHeight = currentWorldHeight - (CANVAS_PADDING * 2) - size;

                const x = (Math.random() - 0.5) * availableWidth;
                const y = (Math.random() - 0.5) * availableHeight;

                let overlapping = false;

                // STRICT COLLISION CHECK
                for (const circle of placedCircles) {
                    const dx = circle.x - x;
                    const dy = circle.y - y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    // The required distance includes Radius A + Radius B + Margin A + Margin B
                    const requiredDistance = circle.r + radius + circle.margin + margin;

                    if (distance < requiredDistance) {
                        overlapping = true;
                        break;
                    }
                }

                if (!overlapping) {
                    placed = true;
                    placedCircles.push({ x, y, r: radius, margin });
                    resultingMoments.push({ ...item, x, y, size, margin });
                }
                placementAttempts++;
            }

            if (!placed) {
                allPlaced = false;
                break;
            }
        }

        if (allPlaced) {
            success = true;
        } else {
            // Expand world aggressively to ensure next attempt fits
            currentWorldWidth += 1200;
            currentWorldHeight += 1200;
            console.log("Expanding world to...", currentWorldWidth, "x", currentWorldHeight);
        }
    }

    // Phase 2: Shrink-Wrap
    // We calculate the exact bounding box of the generated content and snap the world size to it.

    const minX = Math.min(...resultingMoments.map(m => m.x - m.size / 2));
    const maxX = Math.max(...resultingMoments.map(m => m.x + m.size / 2));
    const minY = Math.min(...resultingMoments.map(m => m.y - m.size / 2));
    const maxY = Math.max(...resultingMoments.map(m => m.y + m.size / 2));

    const contentWidth = maxX - minX;
    const contentHeight = maxY - minY;

    // Final world size is exactly Content + Padding on both sides
    const finalWorldWidth = contentWidth + CANVAS_PADDING * 2;
    const finalWorldHeight = contentHeight + CANVAS_PADDING * 2;

    // Re-center everything to (0,0) based on the new bounding box center
    const offsetX = (minX + maxX) / 2;
    const offsetY = (minY + maxY) / 2;

    const centeredMoments = resultingMoments.map(m => ({
        ...m,
        x: m.x - offsetX,
        y: m.y - offsetY
    }));

    return {
        moments: centeredMoments,
        width: finalWorldWidth,
        height: finalWorldHeight
    };
};

// --- MAIN COMPONENT ---
export default function Gallery() {
    const [isMobile, setIsMobile] = useState(false);
    const [selected, setSelected] = useState<Moment | null>(null);

    // Calculate positions AND world size ONCE when component loads
    // Destructure to get the moments and the calculated world dimensions
    const { moments, width, height } = useMemo(() => generatePositions(rawMoments), []);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    if (isMobile) {
        return <MobileGallery moments={moments} onSelect={setSelected} selected={selected} onClose={() => setSelected(null)} />;
    }

    return (
        <div className="relative">
            {/* Hero Section - Infinite Canvas */}
            <div className="h-screen">
                <DesktopGallery
                    moments={moments}
                    worldWidth={width}
                    worldHeight={height}
                    onSelect={setSelected}
                    selected={selected}
                    onClose={() => setSelected(null)}
                />
            </div>

            {/* Scrollable Content Below */}
            <EventAlbumsSection />
            <PolaroidGallerySection />
        </div>
    );
}

// --- EVENT ALBUMS SECTION ---
const eventAlbums = [
    {
        id: 1,
        title: "AVALANCHE AFRICA SUMMIT",
        number: "01",
        description: "We brought together 300+ builders from 15 African countries for the largest Avalanche gathering on the continent. Projects pitched, partnerships formed, and the future of blockchain in Africa was shaped.",
        image: south1,
        link: "#"
    },
    {
        id: 2,
        title: "ACCRA HACKATHON",
        number: "02",
        description: "48 intense hours of innovation in Ghana's tech capital. 47 developers built 8 production-ready dApps that shipped to mainnet. The energy was unmatched.",
        image: ghana1,
        link: "#"
    },
    {
        id: 3,
        title: "NAIROBI DEFI WORKSHOP",
        number: "03",
        description: "Kenya's first decentralized exchange was born here. 65 developers learned DeFi fundamentals and the community gained new validators for the ecosystem.",
        image: event2,
        link: "#"
    },
    {
        id: 4,
        title: "CAPE TOWN SUBNET WORKSHOP",
        number: "04",
        description: "Senior developers dove deep into Avalanche subnet architecture. By the end, we had deployed Africa's first custom subnet - a milestone moment.",
        image: south3,
        link: "#"
    }
];

function EventAlbumsSection() {
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const windowHeight = window.innerHeight;

            // Start animation after scrolling past the hero section
            // Progress from 0 to 1 over the next 300px of scrolling
            const startScroll = windowHeight * 0.5; // Start halfway through hero
            const scrollRange = 400; // Complete transition over 400px

            const progress = Math.min(Math.max((scrollPosition - startScroll) / scrollRange, 0), 1);
            setScrollProgress(progress);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial check

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Calculate dynamic values based on scroll progress
    const marginX = 40 - (scrollProgress * 40); // 40px (mx-10) to 0px
    const borderRadius = 16 - (scrollProgress * 16); // 16px (rounded-2xl) to 0px

    return (
        <motion.section
            style={{
                marginLeft: `${marginX}px`,
                marginRight: `${marginX}px`,
                borderRadius: `${borderRadius}px`,
            }}
            className="relative bg-black border-t py-24 px-6 md:px-12"
        >
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="mb-16">
                    <h2 className="text-5xl md:text-7xl font-black tracking-tight text-white mb-4">
                        Experience Avalanche Africa
                    </h2>
                    <p className="text-lg md:text-xl text-gray-400 max-w-2xl">
                        Share our best moments with us. Feel the vibe, see the impact, bask in the innovation.
                    </p>
                </div>

                {/* Event Albums Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {eventAlbums.map((album, index) => (
                        <motion.div
                            key={album.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="group"
                        >
                            <div className="relative bg-zinc-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
                                {/* Image */}
                                <div className="relative h-64 md:h-80 overflow-hidden">
                                    <img
                                        src={album.image}
                                        alt={album.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                                    {/* Event Number */}
                                    <div className="absolute top-6 right-6">
                                        <span className="text-6xl font-black text-white/20">
                                            {album.number}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-8">
                                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight">
                                        {album.title}
                                    </h3>
                                    <p className="text-gray-400 leading-relaxed mb-6">
                                        {album.description}
                                    </p>
                                    <a
                                        href={album.link}
                                        className="inline-flex items-center gap-2 text-red-500 font-semibold hover:gap-4 transition-all duration-300"
                                    >
                                        View full album
                                        <svg
                                            className="w-5 h-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                                            />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.section>
    );
}

// --- POLAROID GALLERY SECTION ---
const galleryEvents = [
    {
        id: 1,
        title: "AVALANCHE AFRICA SUMMIT",
        description: "We brought together 300+ builders from 15 African countries for the largest Avalanche gathering on the continent.",
        images: [south1, event1, ghana1, south2],
        country: "ZA", // South Africa
        flagEmoji: "🇿🇦"
    },
    {
        id: 2,
        title: "ACCRA HACKATHON",
        description: "48 intense hours of innovation in Ghana's tech capital. 47 developers built 8 production-ready dApps.",
        images: [event2, south3, ghana2, event3],
        country: "GH", // Ghana
        flagEmoji: "🇬🇭"
    },
    {
        id: 3,
        title: "NAIROBI DEFI WORKSHOP",
        description: "Kenya's first decentralized exchange was born here. 65 developers learned DeFi fundamentals.",
        images: [event4, south4, event5, ghana3],
        country: "KE", // Kenya
        flagEmoji: "🇰🇪"
    },
    {
        id: 4,
        title: "CAPE TOWN SUBNET WORKSHOP",
        description: "Senior developers dove deep into Avalanche subnet architecture. Africa's first custom subnet was deployed.",
        images: [event6, south5, ghana4, event7],
        country: "ZA", // South Africa
        flagEmoji: "🇿🇦"
    }
];

function PolaroidGallerySection() {
    const [expandedId, setExpandedId] = useState<number | null>(1); // First item expanded by default
    const [hoveredId, setHoveredId] = useState<number | null>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const toggleExpand = (id: number) => {
        setExpandedId(expandedId === id ? null : id);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });
    };

    return (
        <section className="relative bg-white py-24 px-6 md:px-12">
            <div className="max-w-7xl mx-auto">
                {galleryEvents.map((event, index) => (
                    <motion.div
                        key={event.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        onMouseEnter={() => setHoveredId(event.id)}
                        onMouseLeave={() => setHoveredId(null)}
                        onMouseMove={(e) => handleMouseMove(e)}
                        transition={{ delay: index * 0.1 }}
                        className="border-t border-gray-200 py-8 relative"
                    >
                        {/* Kinetic Flag */}
                        <AnimatePresence>
                            {hoveredId === event.id && (
                                <motion.div
                                    className="absolute pointer-events-none z-50"
                                    style={{
                                        left: mousePosition.x,
                                        top: mousePosition.y,
                                    }}
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{
                                        opacity: 1,
                                        scale: 1,
                                        x: -32, // Center the 64px circle
                                        y: -32
                                    }}
                                    exit={{ opacity: 0, scale: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <div className="w-16 h-16 rounded-full overflow-hidden shadow-xl border-2 border-white">
                                        <img
                                            src={`https://flagcdn.com/w160/${event.country.toLowerCase()}.png`}
                                            alt={`${event.country} flag`}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <button
                            onClick={() => toggleExpand(event.id)}
                            className="w-full flex items-center justify-between text-left group relative z-10"
                        >
                            <div className="flex-1">
                                <h3 className="text-3xl md:text-5xl font-black text-gray-900 mb-2 group-hover:text-red-500 transition-colors duration-300">
                                    {event.title}
                                </h3>
                                <p className="text-gray-600 text-lg">
                                    {event.description}
                                </p>
                            </div>
                            <motion.div
                                animate={{ rotate: expandedId === event.id ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                                className="ml-4 text-gray-900"
                            >
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </motion.div>
                        </button>

                        <AnimatePresence>
                            {expandedId === event.id && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.4 }}
                                    className="overflow-hidden"
                                >
                                    <div className="pt-8 pb-4">
                                        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
                                            {event.images.map((image, imgIndex) => (
                                                <motion.div
                                                    key={imgIndex}
                                                    initial={{ opacity: 0, y: 20, rotate: -5 }}
                                                    animate={{ opacity: 1, y: 0, rotate: imgIndex % 2 === 0 ? 2 : -2 }}
                                                    transition={{ delay: imgIndex * 0.1 }}
                                                    whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
                                                    className="flex-shrink-0"
                                                >
                                                    <div className="bg-white p-3" style={{ width: '280px' }}>
                                                        <div className="relative aspect-[4/3] bg-gray-200 overflow-hidden">
                                                            <img src={image} alt={`${event.title} - ${imgIndex + 1}`} className="w-full h-full object-cover" />
                                                        </div>
                                                        <div className="h-16 bg-white"></div>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                        <div className="mt-6">
                                            <a href="#" className="inline-flex items-center gap-2 text-red-500 font-semibold hover:gap-4 transition-all duration-300">
                                                View full album
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </div>
            <style>{`
                .scrollbar-hide::-webkit-scrollbar { display: none; }
                .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </section>
    );
}

// --- DESKTOP GALLERY ---
function DesktopGallery({
    moments,
    worldWidth,
    worldHeight,
    onSelect,
    selected,
    onClose
}: {
    moments: Moment[];
    worldWidth: number;
    worldHeight: number;
    onSelect: (m: Moment) => void;
    selected: Moment | null;
    onClose: () => void;
}) {
    // Camera Logic
    const cameraX = useMotionValue(0);
    const cameraY = useMotionValue(0);

    const cameraXSpring = useSpring(cameraX, {
        damping: CAMERA_DAMPING,
        stiffness: CAMERA_STIFFNESS,
        restDelta: 0.001
    });
    const cameraYSpring = useSpring(cameraY, {
        damping: CAMERA_DAMPING,
        stiffness: CAMERA_STIFFNESS,
        restDelta: 0.001
    });

    const [isHoveringImage, setIsHoveringImage] = useState(false);

    useEffect(() => {
        let animationFrame: number;

        const handleMouseMove = (e: MouseEvent) => {
            if (animationFrame) cancelAnimationFrame(animationFrame);

            animationFrame = requestAnimationFrame(() => {
                if (isHoveringImage) return;

                const { innerWidth, innerHeight } = window;

                // Calculate max translation based on world size vs screen size
                // This ensures we can reach the edge of the world, but no further (respecting padding)
                const maxTranslateX = Math.max(0, (worldWidth - innerWidth) / 2);
                const maxTranslateY = Math.max(0, (worldHeight - innerHeight) / 2);

                const mouseXNormalized = (e.clientX / innerWidth - 0.5) * 2;
                const mouseYNormalized = (e.clientY / innerHeight - 0.5) * 2;

                const targetX = -mouseXNormalized * maxTranslateX;
                const targetY = -mouseYNormalized * maxTranslateY;

                cameraX.set(targetX);
                cameraY.set(targetY);
            });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            if (animationFrame) cancelAnimationFrame(animationFrame);
        };
    }, [cameraX, cameraY, isHoveringImage, worldWidth, worldHeight]);

    return (
        <div className="fixed inset-0 bg-[#F7F7F7] overflow-hidden cursor-default">
            {/* Center Gallery Text */}
            <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
                <h1 className="text-[15vw] font-semibold tracking-tight text-red-500 select-none">
                    GALLERY
                </h1>
            </div>

            {/* World container */}
            <motion.div
                style={{
                    x: cameraXSpring,
                    y: cameraYSpring,
                }}
                className="absolute top-1/2 left-1/2"
            >
                {moments.map((moment, index) => (
                    <WorldImage
                        key={moment.id}
                        moment={moment}
                        delay={index * 0.02}
                        onClick={() => onSelect(moment)}
                        onHoverChange={setIsHoveringImage}
                    />
                ))}
            </motion.div>

            <AnimatePresence>
                {selected && <EventFullPage moment={selected} onClose={onClose} />}
            </AnimatePresence>
        </div>
    );
}

// --- SINGLE IMAGE COMPONENT ---
function WorldImage({
    moment,
    delay,
    onClick,
    onHoverChange
}: {
    moment: Moment;
    delay: number;
    onClick: () => void;
    onHoverChange: (hovering: boolean) => void;
}) {
    return (
        <motion.div
            initial={{
                y: moment.y + 500,
                opacity: 0,
                scale: 0.6
            }}
            animate={{
                y: moment.y,
                opacity: 1,
                scale: 1,
            }}
            transition={{
                y: { type: 'spring', damping: 25, stiffness: 70, delay },
                opacity: { duration: 0.4, delay },
                scale: { duration: 0.4, delay }
            }}
            whileHover={{
                scale: 1.05,
                zIndex: 100,
                transition: { duration: 0.2 }
            }}
            style={{
                position: 'absolute',
                left: moment.x,
                top: 0,
                marginLeft: -moment.size / 2,
                marginTop: -moment.size / 2,
                width: moment.size,
                height: moment.size,
                transformOrigin: 'center center',
            }}
            onMouseEnter={() => onHoverChange(true)}
            onMouseLeave={() => onHoverChange(false)}
            onClick={onClick}
            className="cursor-pointer group"
        >
            <div className="relative w-full h-full overflow-hidden rounded-3xl shadow-2xl bg-zinc-900">
                <img
                    src={moment.image}
                    alt={moment.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                />
            </div>
        </motion.div>
    );
}

// --- MOBILE GALLERY (Unchanged) ---
function MobileGallery({
    moments,
    onSelect,
    selected,
    onClose
}: {
    moments: Moment[];
    onSelect: (m: Moment) => void;
    selected: Moment | null;
    onClose: () => void;
}) {
    return (
        <div className="min-h-screen bg-black text-white">
            <div className="pt-32 pb-16 px-6">
                <h1 className="text-5xl font-black tracking-tighter mb-2">Gallery</h1>
                <p className="text-white/60">Events from across Africa</p>
            </div>

            <div className="px-6 pb-16 space-y-6">
                {moments.map((moment) => (
                    <motion.div
                        key={moment.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        onClick={() => onSelect(moment)}
                        className="bg-zinc-900 rounded-2xl overflow-hidden border border-white/10 active:scale-95 transition-transform"
                    >
                        <div className="relative aspect-square">
                            <img
                                src={moment.image}
                                alt={moment.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="p-6">
                            <div className="text-xs uppercase tracking-widest text-red-400 mb-2">
                                {moment.location} · {moment.date}
                            </div>
                            <h3 className="text-xl font-bold mb-2">{moment.title}</h3>
                            <p className="text-sm text-white/70">{moment.description}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {selected && <EventFullPage moment={selected} onClose={onClose} />}
            </AnimatePresence>
        </div>
    );
}

// --- MODAL / FULL PAGE VIEW (Unchanged) ---
function EventFullPage({
    moment,
    onClose
}: {
    moment: Moment;
    onClose: () => void;
}) {
    return (
        <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
            className="fixed inset-0 z-[300] bg-black overflow-auto"
        >
            <div className="min-h-screen relative">
                <button
                    onClick={onClose}
                    className="fixed top-8 right-8 z-10 text-white/60 hover:text-red-500 text-5xl font-light leading-none transition-colors"
                >
                    ×
                </button>

                <div className="relative h-screen">
                    <img
                        src={moment.image}
                        alt={moment.title}
                        className="w-full h-full object-cover"
                    />

                    <div className="absolute inset-0 flex items-end p-16 bg-gradient-to-t from-black via-transparent to-transparent">
                        <div className="max-w-4xl">
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.6 }}
                            >
                                <div className="text-sm uppercase tracking-widest text-red-400 mb-4">
                                    {moment.location} · {moment.date}
                                </div>
                                <h1 className="text-5xl md:text-7xl font-black mb-6 text-white">{moment.title}</h1>
                                <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
                                    {moment.description}
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </div>

                <div className="bg-black p-16">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-4xl font-bold text-white mb-8">Event Details</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-white/80">
                            <div>
                                <h3 className="text-xl font-bold mb-3 text-red-400">Location</h3>
                                <p className="text-lg">{moment.location}</p>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-3 text-red-400">Date</h3>
                                <p className="text-lg">{moment.date}</p>
                            </div>
                        </div>

                        <button
                            onClick={onClose}
                            className="mt-12 bg-red-600 hover:bg-red-700 text-white px-10 py-5 rounded-full font-bold text-lg transition-colors"
                        >
                            Back to Gallery
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}