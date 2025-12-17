import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const projects = [
    {
        name: 'AfriPay',
        tagline: 'Instant cross-border payments',
        what: 'Real-time settlement network enabling African merchants to accept payments across borders with sub-second finality',
        why: 'Avalanche consensus ensures instant payment confirmation. Low fees make micro-payments viable.',
        builder: 'Lagos-based fintech team',
        location: 'Nigeria',
        metric: '$2.4M monthly volume',
        bg: 'radial-gradient(circle at 30% 40%, #450a0a 0%, #000000 70%)'
    },
    {
        name: 'Harvest Protocol',
        tagline: 'Farm-to-market transparency',
        what: 'Blockchain tracking for agricultural products ensuring fair prices for 1,200+ smallholder farmers',
        why: 'Low transaction costs enable tracking individual farm batches. Subnets provide enterprise privacy.',
        builder: 'AgTech entrepreneur',
        location: 'Kenya',
        metric: '45K+ products tracked',
        bg: 'radial-gradient(circle at 70% 60%, #450a0a 0%, #000000 70%)'
    },
    {
        name: 'Sankofa NFT',
        tagline: 'Cultural heritage on-chain',
        what: 'Community-owned NFT marketplace where 240 African artists mint and trade cultural NFTs with perpetual royalties',
        why: 'Affordable minting enables grassroots creators. Fast finality improves trading experience.',
        builder: 'Artist collective',
        location: 'Ghana',
        metric: '$680K total sales',
        bg: 'radial-gradient(circle at 50% 50%, #450a0a 0%, #000000 70%)'
    },
    {
        name: 'Jamii DAO',
        tagline: 'Community-governed impact',
        what: 'Decentralized organization funding 67 social impact projects through transparent community voting',
        why: 'Fast consensus enables rapid voting and fund distribution for time-sensitive community needs.',
        builder: 'Distributed impact team',
        location: 'Ethiopia',
        metric: '$420K treasury',
        bg: 'radial-gradient(circle at 20% 70%, #450a0a 0%, #000000 70%)'
    },
    {
        name: 'Adumu Games',
        tagline: 'African mythology meets GameFi',
        what: 'Play-to-earn game based on African folklore with 8,500 beta players earning through skill-based gameplay',
        why: 'High throughput supports real-time gameplay. Subnets enable game-specific optimizations.',
        builder: 'Game studio',
        location: 'South Africa',
        metric: '12K NFTs minted',
        bg: 'radial-gradient(circle at 80% 30%, #450a0a 0%, #000000 70%)'
    },
    {
        name: 'Ubuntu Identity',
        tagline: 'Self-sovereign identity',
        what: 'Decentralized identity system enabling 92K unbanked Africans to access financial and government services',
        why: 'Instant finality ensures identity credentials are immediately verifiable by service providers.',
        builder: 'Identity tech company',
        location: 'Rwanda',
        metric: '5 countries, 18 partners',
        bg: 'radial-gradient(circle at 40% 80%, #450a0a 0%, #000000 70%)'
    }
];

export default function Spotlight() {
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState(0);

    const navigate = useCallback((newIndex: number) => {
        if (newIndex < 0 || newIndex >= projects.length) return;
        setDirection(newIndex > current ? 1 : -1);
        setCurrent(newIndex);
    }, [current]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') navigate(current + 1);
            if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') navigate(current - 1);
        };

        let touchStart = 0;
        const handleTouchStart = (e: TouchEvent) => touchStart = e.touches[0].clientY;
        const handleTouchEnd = (e: TouchEvent) => {
            const diff = touchStart - e.changedTouches[0].clientY;
            if (Math.abs(diff) > 50) navigate(current + (diff > 0 ? 1 : -1));
        };

        let wheelTimeout: NodeJS.Timeout;
        const handleWheel = (e: WheelEvent) => {
            clearTimeout(wheelTimeout);
            wheelTimeout = setTimeout(() => {
                if (Math.abs(e.deltaY) > 50) navigate(current + (e.deltaY > 0 ? 1 : -1));
            }, 50);
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('wheel', handleWheel, { passive: true });
        window.addEventListener('touchstart', handleTouchStart, { passive: true });
        window.addEventListener('touchend', handleTouchEnd, { passive: true });

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('wheel', handleWheel);
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchend', handleTouchEnd);
        };
    }, [current, navigate]);

    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? '100%' : '-100%',
            opacity: 0,
            scale: 0.9
        }),
        center: {
            x: 0,
            opacity: 1,
            scale: 1
        },
        exit: (direction: number) => ({
            x: direction > 0 ? '-100%' : '100%',
            opacity: 0,
            scale: 0.9
        })
    };

    return (
        <div className="fixed inset-0 bg-black text-white overflow-hidden">
            <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                    key={current}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ background: projects[current].bg }}
                >
                    <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-16">
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="mb-12"
                        >
                            <div className="text-sm uppercase tracking-widest text-red-400 mb-4">
                                {projects[current].location}
                            </div>
                            <h1 className="text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.85] mb-6">
                                {projects[current].name}
                            </h1>
                            <p className="text-3xl md:text-4xl text-red-400 font-light italic">
                                {projects[current].tagline}
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="max-w-3xl space-y-8 mb-12"
                        >
                            <div>
                                <div className="text-xs uppercase tracking-widest text-red-400 mb-3">What it does</div>
                                <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
                                    {projects[current].what}
                                </p>
                            </div>

                            <div>
                                <div className="text-xs uppercase tracking-widest text-red-400 mb-3">Why Avalanche</div>
                                <p className="text-lg md:text-xl text-white/80 leading-relaxed">
                                    {projects[current].why}
                                </p>
                            </div>

                            <div className="flex items-center gap-8 pt-4">
                                <div>
                                    <div className="text-xs text-white/40 mb-1">Built by</div>
                                    <div className="text-lg font-semibold">{projects[current].builder}</div>
                                </div>
                                <div>
                                    <div className="text-xs text-white/40 mb-1">Impact</div>
                                    <div className="text-lg font-bold text-red-400">{projects[current].metric}</div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
                    >
                        <div className="flex gap-2">
                            {projects.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => navigate(i)}
                                    className={`w-2 h-2 rounded-full transition-all ${i === current ? 'bg-red-500 w-8' : 'bg-white/30'
                                        }`}
                                />
                            ))}
                        </div>
                        <div className="text-xs text-white/40 uppercase tracking-widest">
                            {current + 1} / {projects.length}
                        </div>
                    </motion.div>

                    {current < projects.length - 1 && (
                        <motion.button
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1 }}
                            onClick={() => navigate(current + 1)}
                            className="absolute right-8 top-1/2 -translate-y-1/2 text-white/60 hover:text-red-500 transition-colors"
                        >
                            <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </motion.button>
                    )}

                    {current > 0 && (
                        <motion.button
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1 }}
                            onClick={() => navigate(current - 1)}
                            className="absolute left-8 top-1/2 -translate-y-1/2 text-white/60 hover:text-red-500 transition-colors"
                        >
                            <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </motion.button>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
