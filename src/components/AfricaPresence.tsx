import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Check } from 'lucide-react';

// --- Data ---
const ACTIVE_COUNTRIES = [
    { code: 'ng', name: 'Nigeria' },
    { code: 'gh', name: 'Ghana' },
    { code: 'ke', name: 'Kenya' },
    { code: 'za', name: 'South Africa' },
    { code: 'tz', name: 'Tanzania' },
    { code: 'ug', name: 'Uganda' },
];

// --- Vertical Carousel Component ---
const VerticalFlagCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % ACTIVE_COUNTRIES.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    // Get visible indices (previous, current, next)
    const getPrevIndex = () => (currentIndex - 1 + ACTIVE_COUNTRIES.length) % ACTIVE_COUNTRIES.length;
    const getNextIndex = () => (currentIndex + 1) % ACTIVE_COUNTRIES.length;

    const prevCountry = ACTIVE_COUNTRIES[getPrevIndex()];
    const currentCountry = ACTIVE_COUNTRIES[currentIndex];
    const nextCountry = ACTIVE_COUNTRIES[getNextIndex()];

    return (
        <div className="relative h-[500px] md:h-[700px] lg:h-[900px] flex items-center justify-center overflow-hidden px-4 md:px-6 lg:px-8">
            {/* Vertical stack container */}
            <div className="flex flex-col items-center justify-center gap-6 md:gap-8 lg:gap-12 relative">
                {/* Top Flag (Previous) */}
                <motion.div
                    key={`prev-${currentIndex}`}
                    initial={{ opacity: 0, y: -50, scale: 0.7 }}
                    animate={{ opacity: 1, y: 0, scale: 0.75 }}
                    transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                    className="relative"
                >
                    <div className="w-[280px] h-[180px] md:w-[400px] md:h-[260px] lg:w-[600px] lg:h-[400px] rounded-xl md:rounded-2xl lg:rounded-3xl overflow-hidden shadow-xl">
                        <img
                            src={`https://flagcdn.com/${prevCountry.code}.svg`}
                            alt={prevCountry.name}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-white/60 to-transparent" />
                    </div>
                </motion.div>

                {/* Center Flag (Current) - Emphasized */}
                <motion.div
                    key={`current-${currentIndex}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                    className="relative z-10"
                >
                    <div className="w-[280px] h-[180px] md:w-[400px] md:h-[260px] lg:w-[600px] lg:h-[400px] rounded-xl md:rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl">
                        <img
                            src={`https://flagcdn.com/${currentCountry.code}.svg`}
                            alt={currentCountry.name}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Country Label */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.4 }}
                        className="mt-4 md:mt-5 lg:mt-6 text-center"
                    >
                        <h3 className="text-xl md:text-2xl lg:text-4xl font-bold text-black tracking-tight">
                            {currentCountry.name}
                        </h3>
                    </motion.div>
                </motion.div>

                {/* Bottom Flag (Next) */}
                <motion.div
                    key={`next-${currentIndex}`}
                    initial={{ opacity: 0, y: 50, scale: 0.7 }}
                    animate={{ opacity: 1, y: 0, scale: 0.75 }}
                    transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                    className="relative"
                >
                    <div className="w-[280px] h-[180px] md:w-[400px] md:h-[260px] lg:w-[600px] lg:h-[400px] rounded-xl md:rounded-2xl lg:rounded-3xl overflow-hidden shadow-xl">
                        <img
                            src={`https://flagcdn.com/${nextCountry.code}.svg`}
                            alt={nextCountry.name}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-white/60 to-transparent" />
                    </div>
                </motion.div>
            </div>

            {/* Gradient masks for top and bottom */}
            <div className="absolute top-0 left-0 w-full h-24 md:h-28 lg:h-32 bg-gradient-to-b from-white to-transparent pointer-events-none z-20" />
            <div className="absolute bottom-0 left-0 w-full h-24 md:h-28 lg:h-32 bg-gradient-to-t from-white to-transparent pointer-events-none z-20" />
        </div>
    );
};

// --- Inline Contact Form Component ---
const InlineContactForm = () => {
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        country: '',
        message: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock submission
        setTimeout(() => {
            setSubmitted(true);
            setTimeout(() => {
                setSubmitted(false);
                setFormData({ name: '', email: '', country: '', message: '' });
            }, 4000);
        }, 800);
    };

    return (
        <div className="h-full flex items-center justify-center px-8 lg:px-16">
            <div className="w-full max-w-lg">
                {!submitted ? (
                    <>
                        <div className="mb-10 ">
                            <h3 className="text-3xl lg:text-4xl font-black text-black mb-3 leading-tight">
                                Expand Our Reach
                            </h3>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                Don't see your country listed? Help us bring Team1 to your community.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-xs font-medium text-zinc-500 mb-2 uppercase tracking-wider">
                                    Full Name
                                </label>
                                <input
                                    required
                                    type="text"
                                    className="w-full bg-gray-100 border border-gray-200 rounded-lg px-5 py-4 text-black text-base
                                             focus:outline-none focus:border-red-600 transition-colors
                                             placeholder:text-gray-500"
                                    placeholder="Your name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-zinc-500 mb-2 uppercase tracking-wider">
                                    Email Address
                                </label>
                                <input
                                    required
                                    type="email"
                                    className="w-full bg-gray-100 border border-gray-200 rounded-lg px-5 py-4 text-black text-base
                                             focus:outline-none focus:border-red-600 transition-colors
                                             placeholder:text-gray-500"
                                    placeholder="your@email.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-zinc-500 mb-2 uppercase tracking-wider">
                                    Country
                                </label>
                                <input
                                    required
                                    type="text"
                                    className="w-full bg-gray-100 border border-gray-200 rounded-lg px-5 py-4 text-black text-base
                                             focus:outline-none focus:border-red-600 transition-colors
                                             placeholder:text-gray-500"
                                    placeholder="Where are you based?"
                                    value={formData.country}
                                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-zinc-500 mb-2 uppercase tracking-wider">
                                    Message <span className="text-zinc-600">(Optional)</span>
                                </label>
                                <textarea
                                    rows={4}
                                    className="w-full bg-gray-100 border border-gray-200 rounded-lg px-5 py-4 text-black text-base
                                             focus:outline-none focus:border-red-600 transition-colors
                                             placeholder:text-gray-500 resize-none"
                                    placeholder="Tell us about your community..."
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-4 px-6 rounded-lg
                                         transition-all duration-200 flex items-center justify-center gap-3 group mt-8"
                            >
                                <span className="text-base">Submit Request</span>
                                <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </form>
                    </>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-16"
                    >
                        <div className="w-20 h-20 bg-green-500/10 border-2 border-green-500/30 rounded-full 
                                      flex items-center justify-center mx-auto mb-6">
                            <Check className="text-green-500 w-10 h-10" strokeWidth={2.5} />
                        </div>
                        <h4 className="text-2xl font-bold text-black mb-3">Request Received</h4>
                        <p className="text-gray-600 text-base max-w-sm mx-auto leading-relaxed">
                            Thank you for your interest. We'll be in touch soon.
                        </p>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

// --- Main Section Component ---
const AfricaPresence = () => {
    return (
        <section className="relative bg-white overflow-hidden">
            {/* Subtle top border */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[700px]">
                {/* Left Side: Vertical Carousel */}
                <div className="relative flex items-center justify-center py-20 lg:py-32 border-b lg:border-b-0 lg:border-r border-gray-200">
                    <VerticalFlagCarousel />
                </div>

                {/* Right Side: Inline Form */}
                <div className="relative py-20 lg:py-32">
                    <InlineContactForm />
                </div>
            </div>

            {/* Subtle bottom border */}
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
        </section>
    );
};

export default AfricaPresence;
