import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, MessageCircle, Repeat2, Share, BarChart3 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const TestimonialSlider = () => {
    const panelRef = useRef<HTMLDivElement>(null);
    const stackRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
    const [visibleCards, setVisibleCards] = useState(2);

    const testimonials = [
        {
            name: "Samuel Oliver",
            handle: "@oliesamuel",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
            text: "I'm not even in Web3, but after attending one event, I'm thinking of switching careers. The ecosystem here is vibrant, the people are passionate, and the opportunities are endless. Can't wait to see what we build together! 🚀",
            time: "3:23 AM",
            date: "Aug 12, 2024",
            team: "Team1 Africa",
            likes: "1.2K",
            retweets: "342",
            replies: "89",
            image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop",
            verified: true
        },
        {
            name: "Amara Johnson",
            handle: "@amaratech",
            avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
            text: "The community here is incredible. I've learned more in 3 months than I did in 2 years of self-study. From smart contracts to DeFi protocols, every session opens new doors. Big shoutout to all the mentors who make this possible! 💪",
            time: "5:45 PM",
            date: "Aug 15, 2024",
            team: "Team1 Africa",
            likes: "2.8K",
            retweets: "567",
            replies: "134",
            verified: true
        },
        {
            name: "David Chen",
            handle: "@davidbuilds",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
            text: "From zero to launching my first dApp. The mentorship program changed everything for me. Built a fully functional NFT marketplace on Avalanche in just 8 weeks. This is what happens when great education meets unstoppable passion! 🔥",
            time: "11:20 AM",
            date: "Aug 18, 2024",
            team: "Team1 Africa",
            likes: "3.5K",
            retweets: "892",
            replies: "201",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
            verified: true
        },
        {
            name: "Fatima Ali",
            handle: "@fatimadesigns",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
            text: "As an artist, I never thought I'd understand blockchain. Now I'm minting my own NFTs! The workshops made complex concepts simple. My art is now reaching collectors worldwide, and I'm earning in ways I never imagined. Thank you Team1! 🎨✨",
            time: "2:15 PM",
            date: "Aug 20, 2024",
            team: "Team1 Africa",
            likes: "4.1K",
            retweets: "1.2K",
            replies: "287",
            image: "https://images.unsplash.com/photo-1634986666676-ec8fd927c23d?w=600&h=400&fit=crop",
            verified: true
        }
    ];

    useEffect(() => {
        const mm = gsap.matchMedia();
        
        mm.add("(min-width: 1024px)", () => {
            const cards = cardsRef.current.filter(Boolean);
            if (!cards.length || !panelRef.current || !stackRef.current) return;

            const offset = 20;
            const cardHeight = cards[0]?.offsetHeight ?? 0;
            
            gsap.set(stackRef.current, {
                height: cardHeight + cards.length * offset
            });

            cards.forEach((card, i) => {
                if (card) {
                    if (i === 0) {
                        // First card visible with slight rotation
                        gsap.set(card, {
                            top: offset,
                            zIndex: 1,
                            y: 0,
                            opacity: 1,
                            rotation: -2
                        });
                    } else {
                        // All other cards hidden below with stacked rotation effect
                        gsap.set(card, {
                            top: offset * (i + 1),
                            zIndex: i + 1,
                            y: cardHeight + 200,
                            opacity: 0,
                            rotation: i * 1.5
                        });
                    }
                }
            });

            // Optimized scroll distance to match animation timeline
            const endTime = 150 * cards.length;
            
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: panelRef.current,
                    pin: true,
                    start: "center center",
                    end: `+=${endTime}px`,
                    scrub: 0.4,
                    pinSpacing: "margin",
                    markers: false,
                    invalidateOnRefresh: true,
                    anticipatePin: 1
                }
            });

            tl.to(cards[0], {
                scale: 0.95,
                duration: 0.3,
                transformOrigin: "top"
            }, "b");

            if (cards[1]) {
                tl.to(cards[1], { 
                    y: 0,
                    opacity: 1,
                    rotation: 1.5,
                    ease: "power2.out",
                    duration: 0.4
                }, "+=0.2");
                
                tl.to(cards[1], {
                    scale: 0.95,
                    duration: 0.2,
                    transformOrigin: "center"
                }, "c");
                
                tl.to(cards[0], {
                    scale: 0.9,
                    rotation: -3,
                    duration: 0.2,
                    transformOrigin: "center"
                }, "c");
            }

            if (cards[2]) {
                tl.to(cards[2], { 
                    y: 0,
                    opacity: 1,
                    rotation: 3,
                    ease: "power2.out",
                    duration: 0.4
                }, "+=0.2");
                
                tl.to(cards[0], {
                    scale: 0.85,
                    rotation: -4,
                    duration: 0.2,
                    transformOrigin: "center"
                }, "d");
                
                tl.to(cards[1], {
                    scale: 0.9,
                    rotation: 0.5,
                    duration: 0.2,
                    transformOrigin: "center"
                }, "d");
                
                tl.to(cards[2], {
                    scale: 0.95,
                    duration: 0.2,
                    transformOrigin: "center"
                }, "d");
            }

            if (cards[3]) {
                tl.to(cards[3], { 
                    y: 0,
                    opacity: 1,
                    rotation: -1.5,
                    ease: "power2.out",
                    duration: 0.4
                }, "+=0.2");
                
                tl.to(cards[0], {
                    scale: 0.8,
                    rotation: -5,
                    duration: 0.2,
                    transformOrigin: "center"
                }, "e");
                
                tl.to(cards[1], {
                    scale: 0.85,
                    rotation: -0.5,
                    duration: 0.2,
                    transformOrigin: "center"
                }, "e");
                
                tl.to(cards[2], {
                    scale: 0.9,
                    rotation: 2,
                    duration: 0.2,
                    transformOrigin: "center"
                }, "e");
                
                tl.to(cards[3], {
                    scale: 0.95,
                    duration: 0.2,
                    transformOrigin: "center"
                }, "e");
            }

            return () => {
                if (tl) tl.kill();
            };
        });

        return () => {
            mm.revert();
            ScrollTrigger.getAll().forEach(trigger => {
                if (trigger.vars.trigger === panelRef.current) {
                    trigger.kill();
                }
            });
        };
    }, []);

    const handleLoadMore = () => {
        setVisibleCards(prev => Math.min(prev + 2, testimonials.length));
    };

    const handleViewLess = () => {
        setVisibleCards(2);
    };

    return (
        <div className="bg-gray-50">
            {/* Mobile Static View */}
            <div className="lt-1024:block hidden px-6 py-12">
                <div className="text-center mb-8">
                    <h2 className="text-4xl lt-768:text-3xl lt-480:text-2xl font-bold tracking-tight mb-4" 
                        style={{ fontFamily: "'Press Start 2P', monospace" }}>
                        WALL OF <span className="text-red-500">LOVE</span>
                    </h2>
                    <span className="inline-block bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-bold transform -rotate-6">
                        Testimonies
                    </span>
                </div>

                <div className="max-w-4xl mx-auto space-y-6">
                    {testimonials.slice(0, visibleCards).map((testimonial, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl border-2 border-black shadow-lg p-5 lt-480:p-4 relative overflow-hidden"
                        >
                            {/* Twitter icon */}
                            <div className="absolute top-4 right-4">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="#1DA1F2">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                            </div>

                            {/* Header */}
                            <div className="flex items-center mb-4">
                                <img
                                    src={testimonial.avatar}
                                    alt={testimonial.name}
                                    className="w-14 h-14 lt-480:w-12 lt-480:h-12 rounded-full mr-3 border-2 border-gray-200"
                                />
                                <div>
                                    <div className="flex items-center gap-1">
                                        <h3 className="font-bold text-gray-900">{testimonial.name}</h3>
                                        {testimonial.verified && (
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="#1DA1F2">
                                                <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z" />
                                            </svg>
                                        )}
                                    </div>
                                    <p className="text-gray-500 text-sm">{testimonial.handle}</p>
                                </div>
                            </div>

                            {/* Content */}
                            <p className="text-gray-900 text-base lt-480:text-sm mb-4 leading-relaxed">
                                {testimonial.text}
                            </p>

                            {/* Image if exists */}
                            {testimonial.image && (
                                <div className="mb-4 rounded-xl overflow-hidden border border-gray-200">
                                    <img src={testimonial.image} alt="Post content" className="w-full h-48 object-cover" />
                                </div>
                            )}

                            {/* Metadata */}
                            <div className="flex items-center text-gray-400 text-sm mb-4">
                                <span>{testimonial.time}</span>
                                <span className="mx-2">•</span>
                                <span>{testimonial.date}</span>
                                <span className="mx-2">•</span>
                                <span className="text-blue-500">{testimonial.team}</span>
                            </div>

                            {/* Interaction bar */}
                            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                <div className="flex items-center gap-1 text-gray-500 hover:text-blue-500 cursor-pointer transition-colors">
                                    <MessageCircle size={18} />
                                    <span className="text-sm">{testimonial.replies}</span>
                                </div>
                                <div className="flex items-center gap-1 text-gray-500 hover:text-green-500 cursor-pointer transition-colors">
                                    <Repeat2 size={18} />
                                    <span className="text-sm">{testimonial.retweets}</span>
                                </div>
                                <div className="flex items-center gap-1 text-gray-500 hover:text-red-500 cursor-pointer transition-colors">
                                    <Heart size={18} />
                                    <span className="text-sm">{testimonial.likes}</span>
                                </div>
                                <div className="flex items-center gap-1 text-gray-500 hover:text-blue-500 cursor-pointer transition-colors">
                                    <BarChart3 size={18} />
                                </div>
                                <div className="flex items-center gap-1 text-gray-500 hover:text-blue-500 cursor-pointer transition-colors">
                                    <Share size={18} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-center gap-4 mt-8">
                    {visibleCards < testimonials.length && (
                        <button
                            onClick={handleLoadMore}
                            className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200"
                        >
                            View More
                        </button>
                    )}
                    {visibleCards > 2 && (
                        <button
                            onClick={handleViewLess}
                            className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200"
                        >
                            View Less
                        </button>
                    )}
                </div>
            </div>

            {/* Desktop Animated View */}
            <div className="lt-1024:hidden block bg-gray-50 min-h-screen overflow-hidden">
            <section ref={panelRef} className="panel relative pt-40 pb-28 bg-gray-50">
                <div className="container mx-auto w-full max-w-[1400px] px-8">
                    {/* Background text - positioned at top */}
                    <div className="absolute top-0 left-0 right-0 flex items-start justify-center pointer-events-none z-0 overflow-hidden pt-20">
                        <div className="text-center px-4">
                            <h1 className="text-[180px] lt-1920:text-[140px] lt-1440:text-[110px] tracking-[-1.2rem] lt-1920:tracking-[-0.9rem] lt-1440:tracking-[-0.7rem] leading-[0.9] text-black opacity-40 select-none whitespace-nowrap" 
                                style={{ fontFamily: "'Press Start 2P'" }}>
                                WALL OF <span className="text-red-500">LOVE</span>
                            </h1>
                            
                            <div className="flex justify-center items-center mt-4">
                                <span className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-bold transform -rotate-6">
                                    Testimonies
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Cards stack */}
                    <div className="relative z-10 w-full flex items-center justify-center">
                        <div 
                            ref={stackRef}
                            className="panel__stack relative w-full max-w-[850px] lt-1920:max-w-[750px] lt-1440:max-w-[650px]"
                            style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr',
                                gridTemplateRows: '1fr',
                                alignItems: 'center',
                                justifyItems: 'center'
                            }}
                        >
                            {testimonials.map((testimonial, index) => (
                                <div
                                    key={index}
                                    ref={(el) => { cardsRef.current[index] = el }}
                                    className="panel__card bg-white rounded-2xl border-2 border-black shadow-lg p-8 lt-1024:p-6 w-full overflow-hidden"
                                    style={{
                                        gridArea: '1/1/2/2',
                                        position: 'absolute',
                                        minHeight: '28rem',
                                        maxHeight: '32rem',
                                        willChange: 'transform'
                                    }}
                                >
                                    {/* Twitter icon */}
                                    <div className="absolute top-6 right-6">
                                        <svg width="28" height="28" viewBox="0 0 24 24" fill="#1DA1F2">
                                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                        </svg>
                                    </div>

                                    {/* Header */}
                                    <div className="flex items-center mb-6">
                                        <img
                                            src={testimonial.avatar}
                                            alt={testimonial.name}
                                            className="w-16 h-16 lt-768:w-14 lt-768:h-14 lt-480:w-12 lt-480:h-12 rounded-full mr-4 border-2 border-gray-200"
                                        />
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h3 className="font-bold text-gray-900 text-xl">{testimonial.name}</h3>
                                                {testimonial.verified && (
                                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#1DA1F2">
                                                        <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z" />
                                                    </svg>
                                                )}
                                            </div>
                                            <p className="text-gray-500">{testimonial.handle}</p>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <p className="text-gray-900 text-lg lt-1024:text-base lt-768:text-[0.95rem] lt-480:text-[0.9rem] mb-5 leading-relaxed">
                                        {testimonial.text}
                                    </p>

                                    {/* Image if exists */}
                                    {testimonial.image && (
                                        <div className="mb-5 rounded-xl overflow-hidden border border-gray-200">
                                            <img src={testimonial.image} alt="Post content" className="w-full h-44 object-cover" />
                                        </div>
                                    )}

                                    {/* Bottom section */}
                                    <div className="absolute bottom-8 left-8 right-8">
                                        {/* Metadata */}
                                        <div className="flex items-center text-gray-400 text-sm mb-4">
                                            <span>{testimonial.time}</span>
                                            <span className="mx-2">•</span>
                                            <span>{testimonial.date}</span>
                                            <span className="mx-2">•</span>
                                            <span className="text-blue-500 font-medium">{testimonial.team}</span>
                                        </div>

                                        {/* Interaction bar */}
                                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                            <div className="flex items-center gap-2 text-gray-500 hover:text-blue-500 cursor-pointer transition-colors">
                                                <MessageCircle size={20} />
                                                <span className="text-sm font-medium">{testimonial.replies}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-500 hover:text-green-500 cursor-pointer transition-colors">
                                                <Repeat2 size={20} />
                                                <span className="text-sm font-medium">{testimonial.retweets}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-500 hover:text-red-500 cursor-pointer transition-colors">
                                                <Heart size={20} />
                                                <span className="text-sm font-medium">{testimonial.likes}</span>
                                            </div>
                                            <div className="text-gray-500 hover:text-blue-500 cursor-pointer transition-colors">
                                                <BarChart3 size={20} />
                                            </div>
                                            <div className="text-gray-500 hover:text-blue-500 cursor-pointer transition-colors">
                                                <Share size={20} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            </div>
        </div>
    );
};

export default TestimonialSlider;