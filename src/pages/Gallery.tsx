import { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';


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
import ghana1 from '../assets/ghana1.webp';
import ghana2 from '../assets/ghana2.webp';
import ghana3 from '../assets/ghana3.webp';
import ghana4 from '../assets/ghana4.webp';

// --- CONFIGURATION ---
const MIN_IMAGE_SIZE = 300;
const MAX_IMAGE_SIZE = 400;

// INDIVIDUAL MARGIN SETTINGS
const MARGIN_MIN = 60;
const MARGIN_MAX = 80;

// NEW: GLOBAL CANVAS PADDING
// This ensures the furthest images are exactly this far from the edge of the scrollable area
const CANVAS_PADDING = 100;

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
    slug: string;
}

interface Moment extends MomentData {
    x: number;
    y: number;
    size: number;
    margin: number;
}

// --- RAW DATA ---
const rawMoments: MomentData[] = [
    { id: 1, image: south1, title: 'Avalanche Africa Summit', location: 'Cape Town', date: 'March 2024', description: '300 builders from 15 countries. 12 projects demoed. 3 secured funding.', slug: 'avalanche-africa-summit' },
    { id: 2, image: event1, title: 'Lagos Smart Contract Workshop', location: 'Lagos', date: 'April 2024', description: '85 developers learned Solidity. 24 contracts deployed.', slug: 'lagos-blockchain-summit' },
    { id: 3, image: ghana1, title: 'Accra Hackathon', location: 'Accra', date: 'May 2024', description: '48 hours. 47 developers. 8 dApps shipped to mainnet.', slug: 'accra-hackathon' },
    { id: 4, image: event2, title: 'Nairobi DeFi Workshop', location: 'Nairobi', date: 'June 2024', description: 'First Kenyan DEX launched. 65 developers onboarded.', slug: 'nairobi-defi-workshop' },
    { id: 5, image: south2, title: 'Johannesburg Web3 Summit', location: 'Johannesburg', date: 'July 2024', description: '450 attendees. $5M fund announced. 15 partnerships formed.', slug: 'avalanche-africa-summit' },
    { id: 6, image: ghana2, title: 'Kumasi University Bootcamp', location: 'Kumasi', date: 'August 2024', description: '120 students trained. 3 startups formed.', slug: 'accra-hackathon' },
    { id: 7, image: event3, title: 'Abuja NFT Week', location: 'Abuja', date: 'September 2024', description: '200 participants. 8 NFT collections launched.', slug: 'lagos-blockchain-summit' },
    { id: 8, image: south3, title: 'Cape Town Subnet Workshop', location: 'Cape Town', date: 'October 2024', description: '35 senior developers. First African subnet deployed.', slug: 'cape-town-subnet-workshop' },
    { id: 9, image: event4, title: 'Lagos DeFi Hackathon', location: 'Lagos', date: 'October 2024', description: '56 developers. Winner built micro-lending platform.', slug: 'lagos-blockchain-summit' },
    { id: 10, image: south4, title: 'Durban Meetup', location: 'Durban', date: 'November 2024', description: '90 members. 6 local projects showcased.', slug: 'avalanche-africa-summit' },
    { id: 11, image: event5, title: 'Accra Developer Conference', location: 'Accra', date: 'November 2024', description: '180 engineers. 15 technical talks. 3 validator nodes launched.', slug: 'accra-hackathon' },
    { id: 12, image: event6, title: 'Nairobi Year-End Celebration', location: 'Nairobi', date: 'December 2024', description: '250 community members. 30 projects from the year.', slug: 'nairobi-defi-workshop' },
    { id: 13, image: event7, title: 'Addis Ababa Blockchain Forum', location: 'Addis Ababa', date: 'February 2024', description: 'First Ethiopian Web3 event. 140 attendees introduced to Avalanche.', slug: 'nairobi-defi-workshop' },
    { id: 14, image: event8, title: 'Kigali Innovation Workshop', location: 'Kigali', date: 'March 2024', description: 'Government representatives explored blockchain for public services.', slug: 'nairobi-defi-workshop' },
    { id: 15, image: south5, title: 'Port Elizabeth Community Gathering', location: 'Port Elizabeth', date: 'April 2024', description: 'Local developers showcased projects to investors and mentors.', slug: 'cape-town-subnet-workshop' },
    { id: 16, image: south6, title: 'Pretoria Tech Meetup', location: 'Pretoria', date: 'May 2024', description: '70 developers shared insights on scaling blockchain applications.', slug: 'avalanche-africa-summit' },
    { id: 17, image: ghana3, title: 'Tema Port Blockchain Summit', location: 'Tema', date: 'June 2024', description: 'Exploring blockchain for logistics. 95 industry professionals attended.', slug: 'accra-hackathon' },
    { id: 18, image: ghana4, title: 'Takoradi Developer Workshop', location: 'Takoradi', date: 'July 2024', description: '60 new developers onboarded to Avalanche ecosystem.', slug: 'accra-hackathon' },
    { id: 19, image: south7, title: 'Bloemfontein Innovation Day', location: 'Bloemfontein', date: 'August 2024', description: 'University students built 5 DeFi prototypes in one day.', slug: 'avalanche-africa-summit' },
    { id: 20, image: south8, title: 'East London Blockchain Expo', location: 'East London', date: 'September 2024', description: 'Regional businesses explored blockchain integration. 110 attendees.', slug: 'cape-town-subnet-workshop' },
    { id: 21, image: south9, title: 'Polokwane Developer Meetup', location: 'Polokwane', date: 'October 2024', description: '55 developers from northern regions connected and shared knowledge.', slug: 'avalanche-africa-summit' },
    { id: 22, image: south10, title: 'Kimberley Mining & Blockchain', location: 'Kimberley', date: 'November 2024', description: 'Exploring blockchain for mining industry transparency.', slug: 'avalanche-africa-summit' },
    { id: 23, image: south11, title: 'Nelspruit Tech Summit', location: 'Nelspruit', date: 'December 2024', description: '80 entrepreneurs learned about DeFi opportunities.', slug: 'avalanche-africa-summit' },
    { id: 24, image: south12, title: 'George Coastal Tech Day', location: 'George', date: 'January 2024', description: 'Coastal developers showcased innovative blockchain solutions.', slug: 'cape-town-subnet-workshop' }
];

// --- ALGORITHM: INDIVIDUAL MARGIN PACKING + SHRINK WRAP ---
const generatePositions = (data: MomentData[]): { moments: Moment[], width: number, height: number } => {
    // Determine screen size scale factor (simplified version of CSS breakpoints)
    const isSmallLaptop = window.innerWidth < 1280 && window.innerWidth >= 1024;
    const isTablet = window.innerWidth < 1024;

    // Scale sizes down for smaller screens
    // 1.0 for large desktop, 0.75 for laptop, 0.6 for tablet
    let scaleFactor = 1.0;
    if (isTablet) scaleFactor = 0.6;
    else if (isSmallLaptop) scaleFactor = 0.75;

    // Initial World Size (will expand as needed)
    let currentWorldWidth = 4500 * scaleFactor;
    let currentWorldHeight = 4500 * scaleFactor;

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

            // Random Size & Margin - SCALED
            const baseSize = Math.random() * (MAX_IMAGE_SIZE - MIN_IMAGE_SIZE) + MIN_IMAGE_SIZE;
            const size = baseSize * scaleFactor;

            const radius = size / 2;

            const baseMargin = Math.random() * (MARGIN_MAX - MARGIN_MIN) + MARGIN_MIN;
            const margin = baseMargin * scaleFactor;

            // Try to find a spot
            while (!placed && placementAttempts < 800) {
                // Determine available space respecting padding
                const padding = CANVAS_PADDING * scaleFactor;
                const availableWidth = currentWorldWidth - (padding * 2) - size;
                const availableHeight = currentWorldHeight - (padding * 2) - size;

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
            currentWorldWidth += (1200 * scaleFactor);
            currentWorldHeight += (1200 * scaleFactor);
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
    const padding = CANVAS_PADDING * scaleFactor;
    const finalWorldWidth = contentWidth + padding * 2;
    const finalWorldHeight = contentHeight + padding * 2;

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

// --- MOBILE GALLERY HERO ---
function MobileGalleryHero({ moments }: { moments: Moment[] }) {
    // Randomly select 4 images from moments
    const randomImages = useMemo(() => {
        const shuffled = [...moments].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, 4);
    }, []); // Empty dependency array ensures this only runs once on mount

    // Random positions for each image - more scattered like the reference
    // Using vw for size ensures responsiveness across mobile (sm) and tablet (md)
    const positions = useMemo(() => [
        { top: '8%', right: '5%', size: '40vw', rotate: -5 }, // Top right
        { top: '30%', left: '2%', size: '35vw', rotate: 3 },  // Mid left (smaller)
        { bottom: '25%', right: '-10%', size: '45vw', rotate: -7 }, // Lower right
        { bottom: '8%', left: '-10%', size: '50vw', rotate: 5 }, // Bottom left
    ], []);

    return (
        <div className="relative h-screen bg-white overflow-hidden">
            {/* GALLERY Title - Centered */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
                <h1 className="text-[20vw] font-semibold text-red-500 tracking-tight leading-none">
                    GALLERY
                </h1>
            </div>

            {/* Random Images - Scattered */}
            {randomImages.map((moment, index) => {
                const pos = positions[index];
                return (
                    <motion.div
                        key={moment.id}
                        initial={{ opacity: 0, scale: 0, rotate: pos.rotate - 10 }}
                        animate={{ opacity: 1, scale: 1, rotate: pos.rotate }}
                        transition={{
                            delay: index * 0.15,
                            duration: 0.6,
                            type: "spring",
                            stiffness: 100
                        }}
                        style={{
                            position: 'absolute',
                            top: pos.top,
                            left: pos.left,
                            right: pos.right,
                            bottom: pos.bottom,
                            width: pos.size,
                            height: pos.size,
                            transform: `rotate(${pos.rotate}deg)`,
                        }}
                        className="rounded-xl overflow-hidden shadow-2xl border-4 border-white z-20"
                    >
                        <img
                            src={moment.image}
                            alt={moment.title}
                            className="w-full h-full object-cover"
                        />
                    </motion.div>
                );
            })}
        </div>
    );
}

// --- MAIN COMPONENT ---
export default function Gallery() {
    const [isMobile, setIsMobile] = useState(false);

    // Calculate positions AND world size ONCE when component loads
    // Destructure to get the moments and the calculated world dimensions
    const { moments, width, height } = useMemo(() => generatePositions(rawMoments), []);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    if (isMobile) {
        return (
            <div className="relative">
                {/* Mobile Hero - 4 Random Images */}
                <MobileGalleryHero moments={moments} />

                {/* Scrollable Content Below */}
                <EventAlbumsSection />
                <PolaroidGallerySection />

                {/* Footer */}

            </div>
        );
    }

    return (
        <div className="relative">
            {/* Hero Section - Infinite Canvas */}
            <div className="h-screen">
                <DesktopGallery
                    moments={moments}
                    worldWidth={width}
                    worldHeight={height}
                />
            </div>

            {/* Scrollable Content Below */}
            <EventAlbumsSection />
            <PolaroidGallerySection />

            {/* Footer */}

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
        link: "/gallery/avalanche-africa-summit"
    },
    {
        id: 2,
        title: "ACCRA HACKATHON",
        number: "02",
        description: "48 intense hours of innovation in Ghana's tech capital. 47 developers built 8 production-ready dApps that shipped to mainnet. The energy was unmatched.",
        image: ghana1,
        link: "/gallery/accra-hackathon"
    },
    {
        id: 3,
        title: "NAIROBI DEFI WORKSHOP",
        number: "03",
        description: "Kenya's first decentralized exchange was born here. 65 developers learned DeFi fundamentals and the community gained new validators for the ecosystem.",
        image: event2,
        link: "/gallery/nairobi-defi-workshop"
    },
    {
        id: 4,
        title: "CAPE TOWN SUBNET WORKSHOP",
        number: "04",
        description: "Senior developers dove deep into Avalanche subnet architecture. By the end, we had deployed Africa's first custom subnet - a milestone moment.",
        image: south3,
        link: "/gallery/cape-town-subnet-workshop"
    }
];

function EventAlbumsSection() {
    const [scrollProgress, setScrollProgress] = useState(0);
    const sectionRef = useRef<HTMLElement>(null);

    // Check mobile once and store it
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    if (!sectionRef.current) {
                        ticking = false;
                        return;
                    }

                    const rect = sectionRef.current.getBoundingClientRect();
                    const windowHeight = window.innerHeight;

                    // Calculate progress based on section position
                    const sectionTop = rect.top;
                    const sectionBottom = rect.bottom;

                    // Expand phase: when section enters viewport
                    const expandStart = windowHeight * 0.5;
                    const expandRange = 400;

                    // Shrink phase: when reaching bottom of section
                    const shrinkStart = windowHeight;
                    const shrinkRange = 400;

                    let progress = 0;

                    if (sectionTop > expandStart) {
                        // Before expansion starts
                        progress = 0;
                    } else if (sectionTop <= expandStart && sectionTop > expandStart - expandRange) {
                        // Expanding phase
                        progress = (expandStart - sectionTop) / expandRange;
                    } else if (sectionBottom > shrinkStart) {
                        // Fully expanded
                        progress = 1;
                    } else if (sectionBottom <= shrinkStart && sectionBottom > shrinkStart - shrinkRange) {
                        // Shrinking phase - mirror the expansion calculation
                        progress = (sectionBottom - (shrinkStart - shrinkRange)) / shrinkRange;
                    } else {
                        // After shrink completes
                        progress = 0;
                    }

                    setScrollProgress(Math.min(Math.max(progress, 0), 1));
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial check

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Calculate dynamic values based on scroll progress
    // If mobile/tablet (isMobile), we keep it stationary (no scroll effect)
    // We'll fix it to the "expanded" state or a specific static state.
    // User requested "stationary". Let's standardise to 0 margin for full width feel or small static margin.
    // Let's go with static small margin effectively "expanded" or just completely static.

    // Desktop: Animates from 40px -> 0px margin
    // Mobile/Tablet: Stationary (Fixed at 0px or small padding? User said "stationary").
    // Let's set it to 0 for stationary full-width-like feel or fixed 16px.
    // Given the previous design allowed shrinking, "stationary" probably means "don't shrink". 
    // So we'll force progress to 0 (expanded state) or 1 (shrunk state)? 
    // Actually the animation was shrinking on exit.
    // Let's just force the values.

    const marginX = isMobile ? 16 : (40 - (scrollProgress * 40));
    const borderRadius = isMobile ? 12 : (16 - (scrollProgress * 16));

    // Actually, if it's stationary, we likely don't want it to react to scroll at all.
    // If we want it to look "normal", we probably just want standard spacing.
    // Let's keep a consistent small margin for mobile/tablet so it looks like a nice card but doesn't move.

    return (
        <motion.section
            ref={sectionRef}
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
                    <h2 className="text-3xl lt-768:text-3xl md:text-5xl lg:text-7xl font-black tracking-tight text-white mb-4">
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
                                    <h3 className="text-xl lt-768:text-xl md:text-2xl lg:text-3xl font-bold text-white mb-4 tracking-tight">
                                        {album.title}
                                    </h3>
                                    <p className="text-gray-400 leading-relaxed mb-6">
                                        {album.description}
                                    </p>
                                    <Link
                                        to={album.link}
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
                                    </Link>
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
        flagEmoji: "🇿🇦",
        slug: "avalanche-africa-summit"
    },
    {
        id: 2,
        title: "ACCRA HACKATHON",
        description: "48 intense hours of innovation in Ghana's tech capital. 47 developers built 8 production-ready dApps.",
        images: [event2, south3, ghana2, event3],
        country: "GH", // Ghana
        flagEmoji: "🇬🇭",
        slug: "accra-hackathon"
    },
    {
        id: 3,
        title: "NAIROBI DEFI WORKSHOP",
        description: "Kenya's first decentralized exchange was born here. 65 developers learned DeFi fundamentals.",
        images: [event4, south4, event5, ghana3],
        country: "KE", // Kenya
        flagEmoji: "🇰🇪",
        slug: "nairobi-defi-workshop"
    },
    {
        id: 4,
        title: "CAPE TOWN SUBNET WORKSHOP",
        description: "Senior developers dove deep into Avalanche subnet architecture. Africa's first custom subnet was deployed.",
        images: [event6, south5, ghana4, event7],
        country: "ZA", // South Africa
        flagEmoji: "🇿🇦",
        slug: "cape-town-subnet-workshop"
    },
    {
        id: 5,
        title: "LAGOS BLOCKCHAIN SUMMIT",
        description: "Nigeria's tech capital hosted the biggest blockchain gathering in West Africa with over 500 participants and groundbreaking partnerships.",
        images: [event8, event1, south1, ghana1],
        country: "NG", // Nigeria
        flagEmoji: "🇳🇬",
        slug: "lagos-blockchain-summit"
    }
];

function PolaroidGallerySection() {
    const [expandedId, setExpandedId] = useState<number | null>(1); // First item expanded by default
    const [hoveredId, setHoveredId] = useState<number | null>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const toggleExpand = (id: number) => {
        // Don't allow closing if clicking the already expanded item
        if (expandedId !== id) {
            setExpandedId(id);
        }
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
                        className="border-t border-gray-200 py-8 relative group"
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
                            className="w-full flex items-center justify-between text-left relative z-10"
                        >
                            <div className="flex-1">
                                <h3 className={`text-2xl lt-768:text-2xl md:text-4xl lg:text-5xl font-black mb-2 transition-colors duration-300 ${expandedId === event.id ? '!text-red-600' : 'text-gray-900'} group-hover:!text-red-800`}>
                                    {event.title}
                                </h3>
                                {/* Only show description when expanded */}
                                {expandedId === event.id && (
                                    <p className="text-gray-600 text-[1rem] md:text-lg leading-relaxed">
                                        {event.description}
                                    </p>
                                )}
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
                                                    <div className="bg-white p-3 w-[70vw] md:w-[280px] flex-shrink-0">
                                                        <div className="relative aspect-[4/3] bg-gray-200 overflow-hidden">
                                                            <img src={image} alt={`${event.title} - ${imgIndex + 1}`} className="w-full h-full object-cover" />
                                                        </div>
                                                        <div className="h-16 bg-white"></div>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                        <div className="mt-6">
                                            <Link to={`/gallery/${event.slug}`} className="inline-flex items-center gap-2 text-red-500 font-semibold hover:gap-4 transition-all duration-300">
                                                View full album
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                </svg>
                                            </Link>
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
    worldHeight
}: {
    moments: Moment[];
    worldWidth: number;
    worldHeight: number;
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
    const [scrollOpacity, setScrollOpacity] = useState(1);

    // Scroll listener to fade out gallery when scrolling past hero
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;

            // Fade out between 0 and half screen height
            if (scrollY < windowHeight * 0.5) {
                setScrollOpacity(1);
            } else if (scrollY < windowHeight) {
                // Gradual fade from 100% at 0.5vh to 0% at 1vh
                const fadeProgress = (scrollY - windowHeight * 0.5) / (windowHeight * 0.5);
                setScrollOpacity(1 - fadeProgress);
            } else {
                setScrollOpacity(0);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial check

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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
        <div
            className="fixed inset-0 bg-[#F7F7F7] overflow-hidden cursor-default transition-opacity duration-300"
            style={{
                opacity: scrollOpacity,
                pointerEvents: scrollOpacity === 0 ? 'none' : 'auto'
            }}
        >
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
                        onHoverChange={setIsHoveringImage}
                    />
                ))}
            </motion.div>
        </div>
    );
}

// --- SINGLE IMAGE COMPONENT ---
function WorldImage({
    moment,
    delay,
    onHoverChange
}: {
    moment: Moment;
    delay: number;
    onHoverChange: (hovering: boolean) => void;
}) {
    const navigate = useNavigate();

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
            onClick={() => navigate(`/gallery/${moment.slug}`)}
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