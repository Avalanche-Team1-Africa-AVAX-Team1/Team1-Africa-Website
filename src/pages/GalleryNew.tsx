import { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import { api, type Event as ApiEvent, type GalleryImage } from '../lib/api';

// --- CONFIGURATION ---
const MIN_IMAGE_SIZE = 300;
const MAX_IMAGE_SIZE = 400;

// INDIVIDUAL MARGIN SETTINGS
const MARGIN_MIN = 60;
const MARGIN_MAX = 80;

// NEW: GLOBAL CANVAS PADDING
const CANVAS_PADDING = 100;

const CAMERA_DAMPING = 20;
const CAMERA_STIFFNESS = 60;

// --- TYPES ---
interface MomentData {
    id: string;
    image: string;
    title: string;
    location: string;
    date: string;
    description: string;
    eventId: string;
}

interface Moment extends MomentData {
    x: number;
    y: number;
    size: number;
    margin: number;
}

// --- ALGORITHM: INDIVIDUAL MARGIN PACKING + SHRINK WRAP ---
const generatePositions = (data: MomentData[]): { moments: Moment[], width: number, height: number } => {
    const isSmallLaptop = window.innerWidth < 1280 && window.innerWidth >= 1024;
    const isTablet = window.innerWidth < 1024;

    let scaleFactor = 1.0;
    if (isTablet) scaleFactor = 0.6;
    else if (isSmallLaptop) scaleFactor = 0.75;

    let currentWorldWidth = 4500 * scaleFactor;
    let currentWorldHeight = 4500 * scaleFactor;

    const shuffledData = [...data].sort(() => Math.random() - 0.5);

    let success = false;
    let resultingMoments: Moment[] = [];
    let attempts = 0;

    while (!success && attempts < 15) {
        attempts++;
        resultingMoments = [];
        const placedCircles: { x: number; y: number; r: number; margin: number }[] = [];
        let allPlaced = true;

        for (const item of shuffledData) {
            let placed = false;
            let placementAttempts = 0;

            const baseSize = Math.random() * (MAX_IMAGE_SIZE - MIN_IMAGE_SIZE) + MIN_IMAGE_SIZE;
            const size = baseSize * scaleFactor;
            const radius = size / 2;
            const baseMargin = Math.random() * (MARGIN_MAX - MARGIN_MIN) + MARGIN_MIN;
            const margin = baseMargin * scaleFactor;

            while (!placed && placementAttempts < 800) {
                const padding = CANVAS_PADDING * scaleFactor;
                const availableWidth = currentWorldWidth - (padding * 2) - size;
                const availableHeight = currentWorldHeight - (padding * 2) - size;

                const x = (Math.random() - 0.5) * availableWidth;
                const y = (Math.random() - 0.5) * availableHeight;

                let overlapping = false;

                for (const circle of placedCircles) {
                    const dx = circle.x - x;
                    const dy = circle.y - y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
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
            currentWorldWidth += (1200 * scaleFactor);
            currentWorldHeight += (1200 * scaleFactor);
        }
    }

    const minX = Math.min(...resultingMoments.map(m => m.x - m.size / 2));
    const maxX = Math.max(...resultingMoments.map(m => m.x + m.size / 2));
    const minY = Math.min(...resultingMoments.map(m => m.y - m.size / 2));
    const maxY = Math.max(...resultingMoments.map(m => m.y + m.size / 2));

    const contentWidth = maxX - minX;
    const contentHeight = maxY - minY;

    const padding = CANVAS_PADDING * scaleFactor;
    const finalWorldWidth = contentWidth + padding * 2;
    const finalWorldHeight = contentHeight + padding * 2;

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
    const randomImages = useMemo(() => {
        const shuffled = [...moments].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, 4);
    }, [moments]);

    const positions = useMemo(() => [
        { top: '8%', right: '5%', size: '40vw', rotate: -5 },
        { top: '30%', left: '2%', size: '35vw', rotate: 3 },
        { bottom: '25%', right: '-10%', size: '45vw', rotate: -7 },
        { bottom: '8%', left: '-10%', size: '50vw', rotate: 5 },
    ], []);

    return (
        <div className="relative h-screen bg-white overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center z-10">
                <h1 className="text-[20vw] font-semibold text-red-500 tracking-tight leading-none">
                    GALLERY
                </h1>
            </div>

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
export default function GalleryNew() {
    const [isMobile, setIsMobile] = useState(false);
    const [completedEvents, setCompletedEvents] = useState<ApiEvent[]>([]);
    const [galleryImages, setGalleryImages] = useState<Record<string, GalleryImage[]>>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch completed events and their gallery images
    useEffect(() => {
        async function fetchGalleryData() {
            try {
                setLoading(true);

                // Fetch all completed events
                const events = await api.getCompletedEvents();
                setCompletedEvents(events);

                // Fetch gallery images for each event
                const imagesMap: Record<string, GalleryImage[]> = {};
                for (const event of events) {
                    const images = await api.getEventGallery(event.id);
                    if (images.length > 0) {
                        imagesMap[event.id] = images;
                    }
                }
                setGalleryImages(imagesMap);

                setLoading(false);
            } catch (err) {
                console.error('Failed to fetch gallery data:', err);
                setError(err instanceof Error ? err.message : 'Failed to load gallery');
                setLoading(false);
            }
        }

        fetchGalleryData();
    }, []);

    // Convert API events to moment data for the infinite canvas
    const moments = useMemo(() => {
        const momentData: MomentData[] = [];

        completedEvents.forEach(event => {
            const eventImages = galleryImages[event.id] || [];
            eventImages.forEach(img => {
                momentData.push({
                    id: img.id,
                    image: img.imageUrl,
                    title: event.title,
                    location: event.location || 'Unknown',
                    date: new Date(event.startDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
                    description: event.description,
                    eventId: event.id
                });
            });
        });

        return momentData;
    }, [completedEvents, galleryImages]);

    const { moments: positionedMoments, width, height } = useMemo(
        () => moments.length > 0 ? generatePositions(moments) : { moments: [], width: 0, height: 0 },
        [moments]
    );

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading gallery...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="text-center max-w-md px-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Failed to Load Gallery</h2>
                    <p className="text-gray-600 mb-4">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    if (isMobile) {
        return (
            <div className="relative">
                <MobileGalleryHero moments={positionedMoments} />
                <EventAlbumsSection events={completedEvents} galleryImages={galleryImages} />
                <PolaroidGallerySection events={completedEvents} galleryImages={galleryImages} />
            </div>
        );
    }

    return (
        <div className="relative">
            <div className="h-screen">
                <DesktopGallery
                    moments={positionedMoments}
                    worldWidth={width}
                    worldHeight={height}
                />
            </div>
            <EventAlbumsSection events={completedEvents} galleryImages={galleryImages} />
            <PolaroidGallerySection events={completedEvents} galleryImages={galleryImages} />
        </div>
    );
}

// --- EVENT ALBUMS SECTION ---
function EventAlbumsSection({
    events,
    galleryImages
}: {
    events: ApiEvent[];
    galleryImages: Record<string, GalleryImage[]>;
}) {
    const [scrollProgress, setScrollProgress] = useState(0);
    const sectionRef = useRef<HTMLElement>(null);
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
                    const sectionTop = rect.top;
                    const sectionBottom = rect.bottom;
                    const expandStart = windowHeight * 0.5;
                    const expandRange = 400;
                    const shrinkStart = windowHeight;
                    const shrinkRange = 400;

                    let progress = 0;

                    if (sectionTop > expandStart) {
                        progress = 0;
                    } else if (sectionTop <= expandStart && sectionTop > expandStart - expandRange) {
                        progress = (expandStart - sectionTop) / expandRange;
                    } else if (sectionBottom > shrinkStart) {
                        progress = 1;
                    } else if (sectionBottom <= shrinkStart && sectionBottom > shrinkStart - shrinkRange) {
                        progress = (sectionBottom - (shrinkStart - shrinkRange)) / shrinkRange;
                    } else {
                        progress = 0;
                    }

                    setScrollProgress(Math.min(Math.max(progress, 0), 1));
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const marginX = isMobile ? 16 : (40 - (scrollProgress * 40));
    const borderRadius = isMobile ? 12 : (16 - (scrollProgress * 16));

    // Take first 4 events with images
    const featuredEvents = events
        .filter(event => galleryImages[event.id]?.length > 0)
        .slice(0, 4);

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
                <div className="mb-16">
                    <h2 className="text-3xl lt-768:text-3xl md:text-5xl lg:text-7xl font-black tracking-tight text-white mb-4">
                        Experience Avalanche Africa
                    </h2>
                    <p className="text-lg md:text-xl text-gray-400 max-w-2xl">
                        Share our best moments with us. Feel the vibe, see the impact, bask in the innovation.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {featuredEvents.map((event, index) => {
                        const images = galleryImages[event.id] || [];
                        const coverImage = event.coverImage || images[0]?.imageUrl;

                        return (
                            <motion.div
                                key={event.id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="group"
                            >
                                <div className="relative bg-zinc-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
                                    <div className="relative h-64 md:h-80 overflow-hidden">
                                        {coverImage && (
                                            <img
                                                src={coverImage}
                                                alt={event.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                        <div className="absolute top-6 right-6">
                                            <span className="text-6xl font-black text-white/20">
                                                {String(index + 1).padStart(2, '0')}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-8">
                                        <h3 className="text-xl lt-768:text-xl md:text-2xl lg:text-3xl font-bold text-white mb-4 tracking-tight uppercase">
                                            {event.title}
                                        </h3>
                                        <p className="text-gray-400 leading-relaxed mb-6">
                                            {event.description}
                                        </p>
                                        <Link
                                            to={`/gallery/${event.id}`}
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
                        );
                    })}
                </div>
            </div>
        </motion.section>
    );
}

// --- POLAROID GALLERY SECTION ---
function PolaroidGallerySection({
    events,
    galleryImages
}: {
    events: ApiEvent[];
    galleryImages: Record<string, GalleryImage[]>;
}) {
    const [expandedId, setExpandedId] = useState<string | null>(events[0]?.id || null);
    const [hoveredId, setHoveredId] = useState<string | null>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const toggleExpand = (id: string) => {
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

    // Only show events with images
    const eventsWithImages = events.filter(event => galleryImages[event.id]?.length > 0);

    return (
        <section className="relative bg-white py-24 px-6 md:px-12">
            <div className="max-w-7xl mx-auto">
                {eventsWithImages.map((event, index) => {
                    const images = galleryImages[event.id] || [];

                    return (
                        <motion.div
                            key={event.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            onMouseEnter={() => setHoveredId(event.id)}
                            onMouseLeave={() => setHoveredId(null)}
                            onMouseMove={handleMouseMove}
                            transition={{ delay: index * 0.1 }}
                            className="border-t border-gray-200 py-8 relative group"
                        >
                            <button
                                onClick={() => toggleExpand(event.id)}
                                className="w-full flex items-center justify-between text-left relative z-10"
                            >
                                <div className="flex-1">
                                    <h3 className={`text-2xl lt-768:text-2xl md:text-4xl lg:text-5xl font-black mb-2 transition-colors duration-300 uppercase ${expandedId === event.id ? '!text-red-600' : 'text-gray-900'} group-hover:!text-red-800`}>
                                        {event.title}
                                    </h3>
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
                                                {images.slice(0, 8).map((image, imgIndex) => (
                                                    <motion.div
                                                        key={image.id}
                                                        initial={{ opacity: 0, y: 20, rotate: -5 }}
                                                        animate={{ opacity: 1, y: 0, rotate: imgIndex % 2 === 0 ? 2 : -2 }}
                                                        transition={{ delay: imgIndex * 0.1 }}
                                                        whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
                                                        className="flex-shrink-0"
                                                    >
                                                        <div className="bg-white p-3 w-[70vw] md:w-[280px] flex-shrink-0 shadow-lg">
                                                            <div className="relative aspect-[4/3] bg-gray-200 overflow-hidden">
                                                                <img
                                                                    src={image.imageUrl}
                                                                    alt={image.description || event.title}
                                                                    className="w-full h-full object-cover"
                                                                />
                                                            </div>
                                                            <div className="h-16 bg-white"></div>
                                                        </div>
                                                    </motion.div>
                                                ))}
                                            </div>
                                            <div className="mt-6">
                                                <Link
                                                    to={`/gallery/${event.id}`}
                                                    className="inline-flex items-center gap-2 text-red-500 font-semibold hover:gap-4 transition-all duration-300"
                                                >
                                                    View full album ({images.length} photos)
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
                    );
                })}
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

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;

            if (scrollY < windowHeight * 0.5) {
                setScrollOpacity(1);
            } else if (scrollY < windowHeight) {
                const fadeProgress = (scrollY - windowHeight * 0.5) / (windowHeight * 0.5);
                setScrollOpacity(1 - fadeProgress);
            } else {
                setScrollOpacity(0);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        let animationFrame: number;

        const handleMouseMove = (e: MouseEvent) => {
            if (animationFrame) cancelAnimationFrame(animationFrame);

            animationFrame = requestAnimationFrame(() => {
                if (isHoveringImage) return;

                const mouseX = e.clientX;
                const mouseY = e.clientY;
                const windowWidth = window.innerWidth;
                const windowHeight = window.innerHeight;

                const normalizedX = (mouseX / windowWidth) - 0.5;
                const normalizedY = (mouseY / windowHeight) - 0.5;

                const maxPanX = (worldWidth - windowWidth) / 2;
                const maxPanY = (worldHeight - windowHeight) / 2;

                cameraX.set(-normalizedX * maxPanX);
                cameraY.set(-normalizedY * maxPanY);
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            if (animationFrame) cancelAnimationFrame(animationFrame);
        };
    }, [isHoveringImage, worldWidth, worldHeight, cameraX, cameraY]);

    return (
        <div className="relative w-full h-full bg-white overflow-hidden">
            <motion.div
                className="absolute inset-0 flex items-center justify-center"
                style={{
                    x: cameraXSpring,
                    y: cameraYSpring,
                    opacity: scrollOpacity,
                }}
            >
                {moments.map((moment) => (
                    <motion.div
                        key={moment.id}
                        className="absolute"
                        style={{
                            left: `calc(50% + ${moment.x}px)`,
                            top: `calc(50% + ${moment.y}px)`,
                            width: moment.size,
                            height: moment.size,
                        }}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            delay: Math.random() * 0.5,
                            duration: 0.6,
                            type: "spring"
                        }}
                        whileHover={{ scale: 1.1, zIndex: 50 }}
                        onMouseEnter={() => setIsHoveringImage(true)}
                        onMouseLeave={() => setIsHoveringImage(false)}
                    >
                        <div className="relative w-full h-full rounded-xl overflow-hidden shadow-xl border-4 border-white cursor-pointer group">
                            <img
                                src={moment.image}
                                alt={moment.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                                <div className="text-center text-white">
                                    <h3 className="font-bold text-sm mb-1">{moment.title}</h3>
                                    <p className="text-xs opacity-90">{moment.location}</p>
                                    <p className="text-xs opacity-75">{moment.date}</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center z-10 pointer-events-none">
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    style={{ opacity: scrollOpacity }}
                >
                    <p className="text-sm text-gray-600 mb-2">Scroll to explore</p>
                    <svg className="w-6 h-6 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </motion.div>
            </div>
        </div>
    );
}
