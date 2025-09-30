import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
            text: "I'm not even in Web3, but after attending one event, I'm thinking of switching careers.",
            time: "3:23 AM",
            date: "Aug 12",
            team: "Team1 Africa"
        },
        {
            name: "Amara Johnson",
            handle: "@amaratech",
            avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
            text: "The community here is incredible. I've learned more in 3 months than I did in 2 years of self-study.",
            time: "5:45 PM",
            date: "Aug 15",
            team: "Team1 Africa"
        },
        {
            name: "David Chen",
            handle: "@davidbuilds",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
            text: "From zero to launching my first dApp. The mentorship program changed everything for me.",
            time: "11:20 AM",
            date: "Aug 18",
            team: "Team1 Africa"
        },
        {
            name: "Fatima Ali",
            handle: "@fatimadesigns",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
            text: "As an artist, I never thought I'd understand blockchain. Now I'm minting my own NFTs!",
            time: "2:15 PM",
            date: "Aug 20",
            team: "Team1 Africa"
        }
    ];

    useEffect(() => {
        const mm = gsap.matchMedia();
        
        mm.add("(min-width: 768px)", () => {
            const cards = cardsRef.current.filter(Boolean);
            if (!cards.length || !panelRef.current || !stackRef.current) return;

            const offset = 20;
            const cardHeight = cards[0]?.offsetHeight ?? 0;
            
            gsap.set(stackRef.current, {
                height: cardHeight + cards.length * offset
            });

            cards.forEach((card, i) => {
                if (card) {
                    gsap.set(card, {
                        top: offset * (i + 1),
                        zIndex: i + 1
                    });
                }
            });

            const endTime = 500 * cards.length;
            
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: panelRef.current,
                    pin: true,
                    start: "50% 50%",
                    end: `+=${endTime}px`,
                    scrub: 0.2,
                    pinSpacing: true,
                    markers: false
                }
            });

            tl.to(cards[0], {
                scale: 0.95,
                duration: 0.3,
                transformOrigin: "top"
            }, "b");

            if (cards[1]) {
                tl.from(cards[1], { 
                    y: window.innerHeight
                });
                
                tl.to(cards[1], {
                    scale: 0.95,
                    duration: 0.3,
                    transformOrigin: "top"
                }, "c");
                
                tl.to(cards[0], {
                    scale: 0.9,
                    duration: 0.3,
                    transformOrigin: "top"
                }, "c");
            }

            if (cards[2]) {
                tl.from(cards[2], { 
                    y: window.innerHeight
                });
                
                tl.to(cards[0], {
                    scale: 0.85,
                    duration: 0.3,
                    transformOrigin: "top"
                }, "d");
                
                tl.to(cards[1], {
                    scale: 0.9,
                    duration: 0.3,
                    transformOrigin: "top"
                }, "d");
                
                tl.to(cards[2], {
                    scale: 0.95,
                    duration: 0.3,
                    transformOrigin: "top"
                }, "d");
            }

            if (cards[3]) {
                tl.from(cards[3], { 
                    y: window.innerHeight
                });
                
                tl.to(cards[0], {
                    scale: 0.8,
                    duration: 0.3,
                    transformOrigin: "top"
                }, "e");
                
                tl.to(cards[1], {
                    scale: 0.85,
                    duration: 0.3,
                    transformOrigin: "top"
                }, "e");
                
                tl.to(cards[2], {
                    scale: 0.9,
                    duration: 0.3,
                    transformOrigin: "top"
                }, "e");
                
                tl.to(cards[3], {
                    scale: 0.95,
                    duration: 0.3,
                    transformOrigin: "top"
                }, "e");
            }

            return () => {
                tl.kill();
                ScrollTrigger.getAll().forEach(trigger => trigger.kill());
            };
        });

        return () => mm.revert();
    }, [testimonials.length]);

    const handleLoadMore = () => {
        setVisibleCards(prev => Math.min(prev + 2, testimonials.length));
    };

    const handleViewLess = () => {
        setVisibleCards(2);
    };

    return (
        <div className="bg-gray-50">
            {/* Mobile Static View - Simple card grid with View More */}
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
                            className="bg-white rounded-2xl border-2 border-black shadow-lg p-5 lt-480:p-4 relative"
                        >
                            <div className="absolute top-4 right-4">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="#1DA1F2">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                            </div>

                            <div className="flex items-center mb-4">
                                <img
                                    src={testimonial.avatar}
                                    alt={testimonial.name}
                                    className="w-12 h-12 lt-480:w-10 lt-480:h-10 rounded-full mr-3"
                                />
                                <div>
                                    <h3 className="font-bold text-gray-900">{testimonial.name}</h3>
                                    <p className="text-gray-500 text-sm">{testimonial.handle}</p>
                                </div>
                            </div>

                            <p className="text-gray-900 text-base lt-480:text-sm mb-4 leading-relaxed">
                                {testimonial.text}
                            </p>

                            <div className="flex items-center text-gray-400 text-sm">
                                <span>{testimonial.time}</span>
                                <span className="mx-2">•</span>
                                <span>{testimonial.date}</span>
                                <span className="mx-2">•</span>
                                <span>{testimonial.team}</span>
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

            {/* Desktop Animated View - Keep exactly as is */}
            <div className="lt-1024:hidden block bg-gray-50">
            {/* Panel section - exactly like your reference */}
            <section ref={panelRef} className="panel relative py-28">
                <div className="container mx-auto w-full">
                    {/* Background text */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                        <div className="text-center">
                            <h1 className="text-[320px] lt-1920:text-[128px] lt-1440:text-[90px] lt-1024:text-[60px] lt-768:text-[46px] lt-480:text-[28px] tracking-[-4rem] lt-1920:tracking-[-0.8rem] lt-1440:tracking-[-0.55rem] lt-1024:tracking-[-0.36rem] lt-768:tracking-[-0.2rem] lt-480:tracking-[-0.12rem] leading-[0.95] text-black select-none whitespace-nowrap" 
                                style={{ fontFamily: "'Press Start 2P', monospace" }}>
                                WALL OF <span className="text-red-500">LOVE</span>
                            </h1>
                            
                            <div className="flex justify-center items-center mt-8">
                                <span className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-bold transform -rotate-12">
                                    Testimonies
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Cards stack */}
                    <div className="relative z-10 w-full flex items-center justify-center">
                        <div 
                            ref={stackRef}
                            className="panel__stack relative w-[1800px] lt-1920:w-[42%] lt-1440:w-[50%] lt-1024:w-[64%] lt-768:w-[86%] lt-480:w-[90%] max-w-[1280px]"
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
                                    className="panel__card bg-white rounded-2xl border-2 border-black shadow-lg p-6 lt-1024:p-5 lt-768:p-4 lt-480:p-3 w-full"
                                    style={{
                                        gridArea: '1/1/2/2',
                                        position: 'absolute',
                                        height: '30rem',
                                        willChange: 'transform'
                                    }}
                                >
                                    {index === testimonials.length - 1 && (
                                        <>
                                            <div className="absolute inset-0 bg-white rounded-2xl border-2 border-black transform rotate-1 translate-x-1 translate-y-1 -z-10 lt-1440:hidden"></div>
                                            <div className="absolute inset-0 bg-white rounded-2xl border-2 border-black transform -rotate-1 translate-x-0.5 translate-y-0.5 -z-20 lt-1440:hidden"></div>
                                        </>
                                    )}

                                    <div className="absolute top-4 right-4">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="#1DA1F2">
                                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                        </svg>
                                    </div>

                                    <div className="flex items-center mb-4">
                                        <img
                                            src={testimonial.avatar}
                                            alt={testimonial.name}
                                            className="w-12 h-12 lt-768:w-10 lt-768:h-10 lt-480:w-9 lt-480:h-9 rounded-full mr-3"
                                        />
                                        <div>
                                            <h3 className="font-bold text-gray-900">{testimonial.name}</h3>
                                            <p className="text-gray-500 text-sm">{testimonial.handle}</p>
                                        </div>
                                    </div>

                                    <p className="text-gray-900 text-lg lt-1024:text-base lt-768:text-[0.95rem] lt-480:text-[0.9rem] mb-4 leading-relaxed">
                                        {testimonial.text}
                                    </p>

                                    <div className="flex items-center text-gray-400 text-sm">
                                        <span>{testimonial.time}</span>
                                        <span className="mx-2">•</span>
                                        <span>{testimonial.date}</span>
                                        <span className="mx-2">•</span>
                                        <span>{testimonial.team}</span>
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