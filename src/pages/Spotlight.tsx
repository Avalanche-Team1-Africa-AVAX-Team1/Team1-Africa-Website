import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from '../components/footer';

// Sample data - replace with real data
const monthlySpotlights = [
    {
        category: "PROJECT OF THE MONTH",
        title: "AfriPay",
        description: "Real-time cross-border payment network enabling 12,000+ African merchants to accept instant settlements with sub-second finality. Processed $2.4M in December across 8 countries.",
        image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800",
        country: "Nigeria",
        link: "https://afripay.example.com",
        gradient: "from-red-950 via-black to-black"
    },
    {
        category: "CONTRIBUTOR OF THE MONTH",
        title: "Amara Okafor",
        description: "Led 4 workshops across West Africa, onboarding 200+ developers to Avalanche. Created the most-used subnet deployment guide in the ecosystem.",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800",
        country: "Ghana",
        link: "https://twitter.com/amaraokafor",
        gradient: "from-orange-950 via-black to-black"
    },
    {
        category: "CONTENT OF THE MONTH",
        title: "Building Scalable DeFi on Avalanche Subnets",
        description: "Comprehensive technical breakdown of subnet architecture for DeFi applications. 50K+ views, translated into 3 African languages, referenced in official Avalanche docs.",
        image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800",
        country: "Kenya",
        link: "https://medium.com/@builder",
        gradient: "from-blue-950 via-black to-black"
    },
    {
        category: "COMMUNITY MOMENT OF THE MONTH",
        title: "Nairobi Subnet Summit",
        description: "East Africa's largest blockchain infrastructure gathering. 300+ attendees, 15 projects launched, first regional subnet deployment. Set the standard for technical events.",
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
        country: "Kenya",
        link: "#",
        gradient: "from-green-950 via-black to-black"
    },
    {
        category: "SPECIAL RECOGNITION",
        title: "Sankofa NFT Collective",
        description: "230 African artists achieved financial sovereignty through on-chain art. $680K total sales, 100% of royalties paid instantly. Proof that culture scales on Avalanche.",
        image: "https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?w=800",
        country: "South Africa",
        link: "#",
        gradient: "from-purple-950 via-black to-black"
    }
];

export default function Spotlight() {
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const navigate = useCallback((newIndex: number) => {
        if (newIndex < 0 || newIndex >= monthlySpotlights.length) return;
        setDirection(newIndex > current ? 1 : -1);
        setCurrent(newIndex);
    }, [current]);

    // Auto-play every 5 seconds
    useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(() => {
            setCurrent(prev => (prev + 1) % monthlySpotlights.length);
            setDirection(1);
        }, 5000);

        return () => clearInterval(interval);
    }, [isPaused]);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight') navigate(current + 1);
            if (e.key === 'ArrowLeft') navigate(current - 1);
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [current, navigate]);

    // Touch handling
    useEffect(() => {
        let touchStart = 0;
        const handleTouchStart = (e: TouchEvent) => touchStart = e.touches[0].clientX;
        const handleTouchEnd = (e: TouchEvent) => {
            const diff = touchStart - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 50) navigate(current + (diff > 0 ? 1 : -1));
        };

        window.addEventListener('touchstart', handleTouchStart, { passive: true });
        window.addEventListener('touchend', handleTouchEnd, { passive: true });

        return () => {
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchend', handleTouchEnd);
        };
    }, [current, navigate]);

    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? '100%' : '-100%',
            opacity: 0
        }),
        center: {
            x: 0,
            opacity: 1
        },
        exit: (direction: number) => ({
            x: direction > 0 ? '-100%' : '100%',
            opacity: 0
        })
    };

    return (
        <div className="min-h-screen bg-black text-white">
            <section className="relative h-screen overflow-hidden">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                    <motion.div
                        key={current}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
                        className="absolute inset-0"
                    >
                        <div className="absolute inset-0">
                            <div className={`absolute inset-0 bg-gradient-to-br ${monthlySpotlights[current].gradient} opacity-95 z-10`} />
                            <img
                                src={monthlySpotlights[current].image}
                                alt={monthlySpotlights[current].title}
                                className="w-full h-full object-cover opacity-30"
                            />
                            <div className="absolute inset-0 opacity-[0.03] z-20 mix-blend-overlay"
                                style={{
                                    backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' /%3E%3C/svg%3E")'
                                }}
                            />
                        </div>

                        <div
                            className="relative z-30 h-full flex items-center"
                            onMouseEnter={() => setIsPaused(true)}
                            onMouseLeave={() => setIsPaused(false)}
                        >
                            <div className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                                    <motion.div
                                        initial={{ opacity: 0, y: 40 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3, duration: 0.8 }}
                                        className="order-2 lg:order-1"
                                    >
                                        <div className="mb-6">
                                            <span className="inline-block text-xs md:text-sm font-bold tracking-[0.2em] text-red-400 uppercase">
                                                {monthlySpotlights[current].category}
                                            </span>
                                        </div>

                                        <h1 className="text-4xl lt-768:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter mb-6 leading-[0.9]">
                                            {monthlySpotlights[current].title}
                                        </h1>

                                        <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-8 max-w-xl">
                                            {monthlySpotlights[current].description}
                                        </p>

                                        <div className="flex flex-wrap items-center gap-6 mb-8">
                                            <div>
                                                <div className="text-xs text-white/40 mb-1">COUNTRY</div>
                                                <div className="text-sm font-semibold">{monthlySpotlights[current].country}</div>
                                            </div>
                                        </div>

                                        <a
                                            href={monthlySpotlights[current].link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-red-500 hover:text-white transition-all duration-300 group"
                                        >
                                            Learn More
                                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </a>
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.5, duration: 0.8 }}
                                        className="order-1 lg:order-2 relative aspect-square lg:aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl"
                                    >
                                        <img
                                            src={monthlySpotlights[current].image}
                                            alt={monthlySpotlights[current].title}
                                            className="w-full h-full object-cover"
                                        />
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-6">
                    <div className="flex gap-3">
                        {monthlySpotlights.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => navigate(i)}
                                className={`transition-all duration-300 rounded-full ${i === current
                                    ? 'bg-white w-12 h-3'
                                    : 'bg-white/30 w-3 h-3 hover:bg-white/50'
                                    }`}
                                aria-label={`Go to slide ${i + 1}`}
                            />
                        ))}
                    </div>
                    <div className="text-xs text-white/40 font-mono">
                        {String(current + 1).padStart(2, '0')} / {String(monthlySpotlights.length).padStart(2, '0')}
                    </div>
                </div>

                {current > 0 && (
                    <button
                        onClick={() => navigate(current - 1)}
                        className="absolute left-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex items-center justify-center w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-black transition-all duration-300"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                )}

                {current < monthlySpotlights.length - 1 && (
                    <button
                        onClick={() => navigate(current + 1)}
                        className="absolute right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex items-center justify-center w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-black transition-all duration-300"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                )}
            </section>

            <Footer />
        </div>
    );
}
