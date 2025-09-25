import { useState, useRef, useCallback, useEffect } from 'react';

const TestimonialSlider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [scrollOffset, setScrollOffset] = useState(0);
    
    // Refs for scroll handling
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollTimeoutRef = useRef<number | null>(null);
    const lastScrollTime = useRef(0);
    const animationRef = useRef<number | null>(null);

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

    // Constants for scroll behavior
    const SCROLL_DEBOUNCE_TIME = 50; // Debounce time in ms (much faster)
    const SCROLL_THRESHOLD = 10; // Minimum scroll delta to trigger change (much lower)
    const MAX_VISUAL_OFFSET = 15; // Maximum visual feedback offset

    // Navigate to next/previous slide
    const goToSlide = useCallback((direction: 'next' | 'prev') => {
        if (isAnimating) return;
        
        setIsAnimating(true);
        const newSlide = direction === 'next' 
            ? (currentSlide + 1) % testimonials.length
            : (currentSlide - 1 + testimonials.length) % testimonials.length;
        
        setCurrentSlide(newSlide);
        
        // Reset animation state after transition
        setTimeout(() => {
            setIsAnimating(false);
            setScrollOffset(0);
        }, 300);
    }, [currentSlide, testimonials.length, isAnimating]);

    // Handle scroll wheel events
    const handleWheel = useCallback((e: WheelEvent) => {
        // Only handle scroll if hovering over the container and not animating
        if (!isHovering || isAnimating) return;
        
        e.preventDefault(); // Prevent page scroll
        
        const now = Date.now();
        const deltaY = e.deltaY;
        
        // Debounce rapid scroll events
        if (now - lastScrollTime.current < 20) return;
        lastScrollTime.current = now;
        
        // Provide immediate visual feedback
        const visualOffset = Math.max(-MAX_VISUAL_OFFSET, Math.min(MAX_VISUAL_OFFSET, deltaY / 2));
        setScrollOffset(visualOffset);
        
        // Clear existing timeout
        if (scrollTimeoutRef.current) {
            window.clearTimeout(scrollTimeoutRef.current);
        }
        
        // Set new timeout for slide change
        scrollTimeoutRef.current = window.setTimeout(() => {
            if (Math.abs(deltaY) > SCROLL_THRESHOLD) {
                if (deltaY > 0) {
                    // Scroll down - go to next
                    goToSlide('next');
                } else {
                    // Scroll up - go to previous
                    goToSlide('prev');
                }
            } else {
                // Reset visual offset if threshold not met
                setScrollOffset(0);
            }
        }, SCROLL_DEBOUNCE_TIME);
        
    }, [isHovering, isAnimating, goToSlide]);

    // Handle mouse enter/leave for hover detection
    const handleMouseEnter = useCallback(() => {
        setIsHovering(true);
    }, []);

    const handleMouseLeave = useCallback(() => {
        setIsHovering(false);
        setScrollOffset(0); // Reset visual feedback when leaving
        
        // Clear any pending scroll timeout
        if (scrollTimeoutRef.current) {
            window.clearTimeout(scrollTimeoutRef.current);
            scrollTimeoutRef.current = null;
        }
    }, []);

    // Add wheel event listener to container
    useEffect(() => {
        const container = containerRef.current;
        if (container) {
            container.addEventListener('wheel', handleWheel, { passive: false });
            
            return () => {
                container.removeEventListener('wheel', handleWheel);
            };
        }
    }, [handleWheel]);

    // Cleanup scroll timeout on unmount
    useEffect(() => {
        return () => {
            if (scrollTimeoutRef.current) {
                window.clearTimeout(scrollTimeoutRef.current);
            }
        };
    }, []);

    // Cleanup animation frame on unmount
    useEffect(() => {
        const animationId = animationRef.current;
        return () => {
            if (animationId !== null) {
                cancelAnimationFrame(animationId);
            }
        };
    }, []);

    return (
        <div className="m-16 lt-1440:m-12 lt-1024:m-8 lt-768:m-6 lt-480:m-4 lt-1920:max-w-[1400px] lt-1920:mx-auto lt-1440:px-6 lt-1024:px-4 lt-768:px-3 lt-480:px-2 border-2 border-red-500"> {/* Add symmetric side padding across breakpoints for equal px and cap width below 4K */}
            {/* Background Design - WALL OF LOVE text behind card */}
            <div className="relative pt-40 lt-1920:pt-36 lt-1440:pt-28 lt-1024:pt-24 lt-768:pt-20 lt-480:pt-12"> {/* Scale vertical space below the background heading; slightly tighter on small phones */}
                <div className="flex items-center justify-center pointer-events-none leading-none">
                    <h1 className="text-[150px] lt-1920:text-[128px] lt-1440:text-[80px] lt-1024:text-[60px] lt-768:text-[46px] lt-480:text-[28px] tracking-[-1rem] lt-1920:tracking-[-0.8rem] lt-1440:tracking-[-0.55rem] lt-1024:tracking-[-0.36rem] lt-768:tracking-[-0.2rem] lt-480:tracking-[-0.12rem] leading-[0.95] text-black select-none whitespace-nowrap" style={{ fontFamily: "'Press Start 2P', monospace" }}> {/* Make header smaller on ≤1920 and tighten leading */}
                        WALL OF <span className="text-red-500">LOVE</span>
                    </h1>
                </div>
                {/* Testimonies Badge */}
                <div className="flex justify-center items-center absolute top-[40%] lt-1024:top-[36%] lt-768:top-[30%] lt-480:top-[26%] left-1/2 transform -translate-x-1/2 -translate-y-1/2"> {/* Reposition badge on smaller screens */}
                    <span className="bg-red-500 px-4 py-2 lt-768:px-3 lt-768:py-1.5 rounded-lg text-sm lt-768:text-xs font-bold transform -rotate-12"> {/* Slightly smaller badge on small screens */}
                        Testimonies
                    </span>
                </div>
            </div>



            {/* Testimonial Cards Container */}
            <div className="relative">
                <div className='w-full cursor-pointer flex items-center justify-center py-2 translate-y-[-30%] lt-1440:translate-y-[-10%] lt-1024:translate-y-0 transform rotate-[-5deg] lt-1440:rotate-0 lt-1024:rotate-0'> {/* Reduce vertical offset for ≤1440 and remove tilt to keep card centered */}
                    <div 
                        ref={containerRef}
                        className={`relative w-[35%] lt-1920:w-[42%] lt-1440:w-[50%] lt-1024:w-[64%] lt-768:w-[86%] lt-480:w-[90%] max-w-[640px] mx-auto h-[20rem] lt-1920:h-[19rem] lt-1440:h-[18rem] lt-1024:h-[17rem] lt-768:h-[16rem] lt-480:h-[15rem] select-none transition-all duration-200 ${
                            isHovering ? 'cursor-pointer scale-102' : 'hover:scale-101'
                        }`}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        style={{
                            transform: `translateY(${scrollOffset}px)`,
                            transition: 'transform 0.2s ease-out'
                        }}
                    >
                        {testimonials.map((testimonial, index) => {
                            const isActive = index === currentSlide;
                            const isPrev = index === (currentSlide - 1 + testimonials.length) % testimonials.length;
                            const isNext = index === (currentSlide + 1) % testimonials.length;
                            
                            let cardTransform = '';
                            let cardOpacity = 0;
                            let cardZIndex = 0;
                            
                            if (isActive) {
                                cardTransform = 'translateY(0px) scale(1)';
                                cardOpacity = 1;
                                cardZIndex = 10;
                            } else if (isPrev && scrollOffset < 0) {
                                // Show previous card when scrolling up
                                cardTransform = `translateY(-50%) scale(0.95)`;
                                cardOpacity = Math.min(0.7, Math.abs(scrollOffset) / MAX_VISUAL_OFFSET);
                                cardZIndex = 5;
                            } else if (isNext && scrollOffset > 0) {
                                // Show next card when scrolling down
                                cardTransform = `translateY(50%) scale(0.95)`;
                                cardOpacity = Math.min(0.7, scrollOffset / MAX_VISUAL_OFFSET);
                                cardZIndex = 5;
                            } else {
                                cardTransform = 'translateY(0px) scale(0.9)';
                                cardOpacity = 0;
                                cardZIndex = 0;
                            }

                            return (
                                <div
                                    key={index}
                                    className="absolute inset-0 transition-all duration-300 ease-out"
                                    style={{
                                        transform: cardTransform,
                                        opacity: cardOpacity,
                                        zIndex: cardZIndex,
                                        transition: isAnimating ? 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' : 'all 0.2s ease-out'
                                    }}
                                >
                                    {/* Card Stack Effect */}
                                    <div className="absolute inset-0 bg-white rounded-2xl border-2 border-black transform rotate-1 translate-x-1 translate-y-1 lt-1440:hidden"></div> {/* Hide stack layer on ≤1440 to avoid asymmetric look */}
                                    <div className="absolute inset-0 bg-white rounded-2xl border-2 border-black transform -rotate-1 translate-x-0.5 translate-y-0.5 lt-1440:hidden"></div> {/* Hide stack layer on ≤1440 */}

                                    {/* Main Card */}
                                    <div className="relative bg-white rounded-2xl border-2 border-black box-border p-6 lt-1024:p-5 lt-768:p-4 lt-480:p-3 shadow-lg h-full flex flex-col justify-center"> {/* Ensure symmetric padding with box-border */}
                                        {/* Twitter X Icon */}
                                        <div className="absolute top-4 right-4">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="#1DA1F2">
                                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                            </svg>
                                        </div>

                                        {/* User Info */}
                                        <div className="flex items-center mb-4">
                                            <img
                                                src={testimonial.avatar}
                                                alt={testimonial.name}
                                                className="w-12 h-12 lt-768:w-10 lt-768:h-10 lt-480:w-9 lt-480:h-9 rounded-full mr-3" /* Smaller avatar on small screens */
                                            />
                                            <div>
                                                <h3 className="font-bold text-gray-900">{testimonial.name}</h3>
                                                <p className="text-gray-500 text-sm">{testimonial.handle}</p>
                                            </div>
                                        </div>

                                        {/* Testimonial Text */}
                                        <p className="text-gray-900 text-lg lt-1024:text-base lt-768:text-[0.95rem] lt-480:text-[0.9rem] mb-4 leading-relaxed"> {/* Scale body text down */}
                                            {testimonial.text}
                                        </p>

                                        {/* Meta Info */}
                                        <div className="flex items-center text-gray-400 text-sm">
                                            <span>{testimonial.time}</span>
                                            <span className="mx-2">•</span>
                                            <span>{testimonial.date}</span>
                                            <span className="mx-2">•</span>
                                            <span>{testimonial.team}</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Scroll Indicators */}
                {isHovering && !isAnimating && (
                    <>
                        {/* Scroll Up Indicator */}
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4 opacity-50 transition-all duration-200">
                            <div className="flex flex-col items-center text-gray-600">
                                <svg className="w-4 h-4 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                                </svg>
                                <span className="text-xs font-medium">Scroll up</span>
                            </div>
                        </div>
                        
                        {/* Scroll Down Indicator */}
                        <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 translate-y-4 opacity-50 transition-all duration-200">
                            <div className="flex flex-col items-center text-gray-600">
                                <span className="text-xs font-medium">Scroll down</span>
                                <svg className="w-4 h-4 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </div>
                    </>
                )}

                {/* Slide Indicators */}
                <div className="absolute bottom-[0%] left-1/2 transform -translate-x-1/2 flex space-x-2 z-20 pb-2 lt-768:pb-1"> {/* Always center dots; baseline visuals unchanged */}
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide
                                ? 'bg-red-500 scale-125'
                                : 'bg-gray-300 hover:bg-gray-400'
                                }`}
                        />
                    ))}
                </div>
            </div>


        </div>
    );
};

export default TestimonialSlider;