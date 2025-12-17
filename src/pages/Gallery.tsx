import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

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

// World configuration - much larger than viewport
const WORLD_WIDTH = 10000;
const WORLD_HEIGHT = 10000;
const WORLD_PADDING = 800; // Large padding to ensure edge images are fully visible (like Colu)
const CAMERA_SPEED = 0.06;
const CAMERA_DAMPING = 20;
const CAMERA_STIFFNESS = 60;

// Define Moment type to avoid circular reference
interface Moment {
    id: number;
    image: string;
    title: string;
    location: string;
    date: string;
    description: string;
    x: number;
    y: number;
    z: number;
    size: number;
}

const moments: Moment[] = [
    {
        id: 1,
        image: south1,
        title: 'Avalanche Africa Summit',
        location: 'Cape Town',
        date: 'March 2024',
        description: '300 builders from 15 countries. 12 projects demoed. 3 secured funding.',
        x: -1200, y: -900, z: 0, size: 400
    },
    {
        id: 2,
        image: event1,
        title: 'Lagos Smart Contract Workshop',
        location: 'Lagos',
        date: 'April 2024',
        description: '85 developers learned Solidity. 24 contracts deployed.',
        x: 1800, y: 1200, z: 0, size: 380
    },
    {
        id: 3,
        image: ghana1,
        title: 'Accra Hackathon',
        location: 'Accra',
        date: 'May 2024',
        description: '48 hours. 47 developers. 8 dApps shipped to mainnet.',
        x: -600, y: 1600, z: 0, size: 420
    },
    {
        id: 4,
        image: event2,
        title: 'Nairobi DeFi Workshop',
        location: 'Nairobi',
        date: 'June 2024',
        description: 'First Kenyan DEX launched. 65 developers onboarded.',
        x: 3000, y: -600, z: 0, size: 410
    },
    {
        id: 5,
        image: south2,
        title: 'Johannesburg Web3 Summit',
        location: 'Johannesburg',
        date: 'July 2024',
        description: '450 attendees. $5M fund announced. 15 partnerships formed.',
        x: -2400, y: 400, z: 0, size: 390
    },
    {
        id: 6,
        image: ghana2,
        title: 'Kumasi University Bootcamp',
        location: 'Kumasi',
        date: 'August 2024',
        description: '120 students trained. 3 startups formed.',
        x: 1200, y: -1800, z: 0, size: 400
    },
    {
        id: 7,
        image: event3,
        title: 'Abuja NFT Week',
        location: 'Abuja',
        date: 'September 2024',
        description: '200 participants. 8 NFT collections launched.',
        x: -1800, y: -1200, z: 0, size: 380
    },
    {
        id: 8,
        image: south3,
        title: 'Cape Town Subnet Workshop',
        location: 'Cape Town',
        date: 'October 2024',
        description: '35 senior developers. First African subnet deployed.',
        x: 3600, y: 1800, z: 0, size: 420
    },
    {
        id: 9,
        image: event4,
        title: 'Lagos DeFi Hackathon',
        location: 'Lagos',
        date: 'October 2024',
        description: '56 developers. Winner built micro-lending platform.',
        x: -300, y: 2500, z: 0, size: 390
    },
    {
        id: 10,
        image: south4,
        title: 'Durban Meetup',
        location: 'Durban',
        date: 'November 2024',
        description: '90 members. 6 local projects showcased.',
        x: 2400, y: -1350, z: 0, size: 410
    },
    {
        id: 11,
        image: event5,
        title: 'Accra Developer Conference',
        location: 'Accra',
        date: 'November 2024',
        description: '180 engineers. 15 technical talks. 3 validator nodes launched.',
        x: -3300, y: -300, z: 0, size: 400
    },
    {
        id: 12,
        image: event6,
        title: 'Nairobi Year-End Celebration',
        location: 'Nairobi',
        date: 'December 2024',
        description: '250 community members. 30 projects from the year.',
        x: 900, y: 3000, z: 0, size: 420
    },
    {
        id: 13,
        image: event7,
        title: 'Addis Ababa Blockchain Forum',
        location: 'Addis Ababa',
        date: 'February 2024',
        description: 'First Ethiopian Web3 event. 140 attendees introduced to Avalanche.',
        x: -4200, y: 2100, z: 0, size: 380
    },
    {
        id: 14,
        image: event8,
        title: 'Kigali Innovation Workshop',
        location: 'Kigali',
        date: 'March 2024',
        description: 'Government representatives explored blockchain for public services.',
        x: 4200, y: -2100, z: 0, size: 390
    },
    {
        id: 15,
        image: south5,
        title: 'Port Elizabeth Community Gathering',
        location: 'Port Elizabeth',
        date: 'April 2024',
        description: 'Local developers showcased projects to investors and mentors.',
        x: -1500, y: 3300, z: 0, size: 410
    },
    {
        id: 16,
        image: south6,
        title: 'Pretoria Tech Meetup',
        location: 'Pretoria',
        date: 'May 2024',
        description: '70 developers shared insights on scaling blockchain applications.',
        x: 600, y: -2700, z: 0, size: 400
    },
    {
        id: 17,
        image: ghana3,
        title: 'Tema Port Blockchain Summit',
        location: 'Tema',
        date: 'June 2024',
        description: 'Exploring blockchain for logistics. 95 industry professionals attended.',
        x: -3600, y: -1500, z: 0, size: 420
    },
    {
        id: 18,
        image: ghana4,
        title: 'Takoradi Developer Workshop',
        location: 'Takoradi',
        date: 'July 2024',
        description: '60 new developers onboarded to Avalanche ecosystem.',
        x: 2700, y: 2400, z: 0, size: 390
    },
    {
        id: 19,
        image: south7,
        title: 'Bloemfontein Innovation Day',
        location: 'Bloemfontein',
        date: 'August 2024',
        description: 'University students built 5 DeFi prototypes in one day.',
        x: -900, y: -3600, z: 0, size: 410
    },
    {
        id: 20,
        image: south8,
        title: 'East London Blockchain Expo',
        location: 'East London',
        date: 'September 2024',
        description: 'Regional businesses explored blockchain integration. 110 attendees.',
        x: -2100, y: -3300, z: 0, size: 400
    },
    {
        id: 21,
        image: south9,
        title: 'Polokwane Developer Meetup',
        location: 'Polokwane',
        date: 'October 2024',
        description: '55 developers from northern regions connected and shared knowledge.',
        x: 3300, y: -3000, z: 0, size: 390
    },
    {
        id: 22,
        image: south10,
        title: 'Kimberley Mining & Blockchain',
        location: 'Kimberley',
        date: 'November 2024',
        description: 'Exploring blockchain for mining industry transparency.',
        x: -4500, y: -2400, z: 0, size: 410
    },
    {
        id: 23,
        image: south11,
        title: 'Nelspruit Tech Summit',
        location: 'Nelspruit',
        date: 'December 2024',
        description: '80 entrepreneurs learned about DeFi opportunities.',
        x: 4500, y: 3300, z: 0, size: 420
    },
    {
        id: 24,
        image: south12,
        title: 'George Coastal Tech Day',
        location: 'George',
        date: 'January 2024',
        description: 'Coastal developers showcased innovative blockchain solutions.',
        x: 0, y: -3900, z: 0, size: 410
    },
    {
        id: 25,
        image: event1,
        title: 'Ibadan Innovation Hub',
        location: 'Ibadan',
        date: 'February 2024',
        description: '100 students introduced to Web3 development.',
        x: -3900, y: 900, z: 0, size: 400
    },
    {
        id: 26,
        image: event2,
        title: 'Mombasa Blockchain Week',
        location: 'Mombasa',
        date: 'March 2024',
        description: 'Coastal Kenya explored maritime blockchain applications.',
        x: 3900, y: 600, z: 0, size: 390
    },
    {
        id: 27,
        image: south1,
        title: 'Rustenburg Mining Innovation',
        location: 'Rustenburg',
        date: 'April 2024',
        description: 'Blockchain solutions for mining sector transparency.',
        x: 1500, y: -3300, z: 0, size: 415
    },
    {
        id: 28,
        image: event3,
        title: 'Kampala Developer Conference',
        location: 'Kampala',
        date: 'May 2024',
        description: '150 developers from East Africa gathered to share knowledge.',
        x: -1200, y: 3600, z: 0, size: 400
    },
    {
        id: 29,
        image: ghana1,
        title: 'Dodoma Blockchain Forum',
        location: 'Dodoma',
        date: 'June 2024',
        description: 'Government officials explored blockchain for public services.',
        x: 2100, y: 3300, z: 0, size: 395
    },
    {
        id: 30,
        image: event4,
        title: 'Windhoek Blockchain Initiative',
        location: 'Windhoek',
        date: 'July 2024',
        description: 'Namibian developers explored cross-border payment solutions.',
        x: -4800, y: -3600, z: 0, size: 405
    },
    {
        id: 31,
        image: event5,
        title: 'Harare Tech Expo',
        location: 'Harare',
        date: 'August 2024',
        description: 'Zimbabwean entrepreneurs discovered DeFi opportunities.',
        x: 4800, y: -3600, z: 0, size: 400
    },
    {
        id: 32,
        image: south2,
        title: 'Gaborone Innovation Summit',
        location: 'Gaborone',
        date: 'September 2024',
        description: 'Botswana first major blockchain conference with 200 attendees.',
        x: 0, y: 3900, z: 0, size: 410
    },
    {
        id: 33,
        image: event6,
        title: 'Lusaka Web3 Conference',
        location: 'Lusaka',
        date: 'October 2024',
        description: 'Zambian developers gathered to explore blockchain opportunities.',
        x: -3600, y: -3000, z: 0, size: 400
    },
    {
        id: 34,
        image: event7,
        title: 'Dar es Salaam Tech Week',
        location: 'Dar es Salaam',
        date: 'November 2024',
        description: 'Tanzania blockchain ecosystem showcase. 180 participants.',
        x: 3600, y: 3600, z: 0, size: 415
    },
    {
        id: 35,
        image: south3,
        title: 'Maputo Innovation Day',
        location: 'Maputo',
        date: 'December 2024',
        description: 'Mozambique first blockchain developer meetup.',
        x: 2400, y: -3900, z: 0, size: 395
    },
    {
        id: 36,
        image: ghana2,
        title: 'Abidjan DeFi Summit',
        location: 'Abidjan',
        date: 'January 2025',
        description: 'West African DeFi leaders discussed cross-border solutions.',
        x: -4200, y: 1800, z: 0, size: 405
    },
    {
        id: 37,
        image: event8,
        title: 'Freetown Blockchain Initiative',
        location: 'Freetown',
        date: 'February 2025',
        description: 'Sierra Leone developers explored Web3 applications.',
        x: 4200, y: -1800, z: 0, size: 410
    },
    {
        id: 38,
        image: south4,
        title: 'Ouagadougou Tech Forum',
        location: 'Ouagadougou',
        date: 'March 2025',
        description: 'Burkina Faso first major blockchain education event.',
        x: -1800, y: 4200, z: 0, size: 400
    },
    {
        id: 39,
        image: south5,
        title: 'Bamako Developer Workshop',
        location: 'Bamako',
        date: 'April 2025',
        description: 'Mali developers learned smart contract development.',
        x: 1800, y: -4200, z: 0, size: 390
    },
    {
        id: 40,
        image: event1,
        title: 'Conakry Blockchain Week',
        location: 'Conakry',
        date: 'May 2025',
        description: 'Guinea blockchain community launched local projects.',
        x: -4500, y: -1200, z: 0, size: 415
    },
    {
        id: 41,
        image: event2,
        title: 'Monrovia Innovation Hub',
        location: 'Monrovia',
        date: 'June 2025',
        description: 'Liberia entrepreneurs discovered blockchain use cases.',
        x: 4500, y: 1200, z: 0, size: 405
    },
    {
        id: 42,
        image: south1,
        title: 'Niamey Blockchain Forum',
        location: 'Niamey',
        date: 'July 2025',
        description: 'Niger developers connected with regional Web3 community.',
        x: -2700, y: 3900, z: 0, size: 420
    }
];

export default function Gallery() {
    const [isMobile, setIsMobile] = useState(false);
    const [selected, setSelected] = useState<Moment | null>(null);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    if (isMobile) {
        return <MobileGallery moments={moments} onSelect={setSelected} selected={selected} onClose={() => setSelected(null)} />;
    }

    return <DesktopGallery moments={moments} onSelect={setSelected} selected={selected} onClose={() => setSelected(null)} />;
}

function DesktopGallery({
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
    const velocityRef = useRef({ x: 0, y: 0 });
    const lastMouseRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        let animationFrame: number;

        const handleMouseMove = (e: MouseEvent) => {
            if (animationFrame) cancelAnimationFrame(animationFrame);

            animationFrame = requestAnimationFrame(() => {
                if (isHoveringImage) return;

                const { innerWidth, innerHeight } = window;

                const deltaX = e.clientX - lastMouseRef.current.x;
                const deltaY = e.clientY - lastMouseRef.current.y;

                lastMouseRef.current = { x: e.clientX, y: e.clientY };

                const mouseXNormalized = (e.clientX / innerWidth - 0.5) * 2;
                const mouseYNormalized = (e.clientY / innerHeight - 0.5) * 2;

                velocityRef.current.x -= mouseXNormalized * CAMERA_SPEED + deltaX * 0.3;
                velocityRef.current.y -= mouseYNormalized * CAMERA_SPEED + deltaY * 0.3;

                velocityRef.current.x *= 0.92;
                velocityRef.current.y *= 0.92;

                const currentX = cameraX.get();
                const currentY = cameraY.get();

                const newX = currentX + velocityRef.current.x;
                const newY = currentY + velocityRef.current.y;

                // Add padding to camera bounds so edge images are fully visible
                const maxCameraX = WORLD_WIDTH / 2 - innerWidth / 2 - WORLD_PADDING;
                const maxCameraY = WORLD_HEIGHT / 2 - innerHeight / 2 - WORLD_PADDING;

                const clampedX = Math.max(-maxCameraX, Math.min(maxCameraX, newX));
                const clampedY = Math.max(-maxCameraY, Math.min(maxCameraY, newY));

                cameraX.set(clampedX);
                cameraY.set(clampedY);
            });
        };

        const initMouse = (e: MouseEvent) => {
            lastMouseRef.current = { x: e.clientX, y: e.clientY };
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseenter', initMouse);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseenter', initMouse);
            if (animationFrame) cancelAnimationFrame(animationFrame);
        };
    }, [cameraX, cameraY, isHoveringImage]);

    return (
        <div className="fixed inset-0 bg-black overflow-hidden cursor-default">
            {/* Center Gallery Text - High z-index */}
            <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
                <h1 className="text-[15vw] font-semibold tracking-tight text-red-500/70 select-none">
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
                        delay={index * 0.08}
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
                y: moment.y - 1200,
                opacity: 0,
                rotate: Math.random() * 20 - 10,
                scale: 0.8
            }}
            animate={{
                y: moment.y,
                opacity: 1,
                rotate: 0,
                scale: 1,
            }}
            transition={{
                y: { type: 'spring', damping: 15, stiffness: 30, delay },
                opacity: { duration: 0.6, delay },
                rotate: { duration: 0.8, delay },
                scale: { duration: 0.8, delay }
            }}
            whileHover={{
                scale: 1.05,
                zIndex: 100,
                transition: { duration: 0.2 }
            }}
            style={{
                position: 'absolute',
                left: moment.x,
                width: moment.size,
                height: moment.size,
                transformOrigin: 'center center',
            }}
            onMouseEnter={() => onHoverChange(true)}
            onMouseLeave={() => onHoverChange(false)}
            onClick={onClick}
            className="cursor-pointer"
        >
            <div className="relative w-full h-full overflow-hidden rounded-2xl shadow-2xl border-4 border-white/10 hover:border-red-500/60 transition-colors duration-300">
                <img
                    src={moment.image}
                    alt={moment.title}
                    className="w-full h-full object-cover"
                />
            </div>
        </motion.div>
    );
}

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

                    <div className="absolute inset-0 flex items-end p-16">
                        <div className="max-w-4xl">
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.6 }}
                            >
                                <div className="text-sm uppercase tracking-widest text-red-400 mb-4">
                                    {moment.location} · {moment.date}
                                </div>
                                <h1 className="text-7xl font-black mb-6 text-white">{moment.title}</h1>
                                <p className="text-2xl text-white/90 leading-relaxed">
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