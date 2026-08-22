import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import AnimatedText from './AnimatedText';

import testimonial1 from "../assets/testimonial1.webp";
import chidi from "../assets/0xchidi.webp";
import testimonial3 from "../assets/testimonial3.webp";
import testimonial4 from "../assets/testimonial4.webp";
import testimonial5 from "../assets/testimonial5.webp";
import testimonial6 from "../assets/testimonial6.webp";
import testimonial7 from "../assets/testimonial7.webp";
import testimonial8 from "../assets/testimonial8.webp";
import testimonial9 from "../assets/testimonial9.webp";
import testimonial10 from "../assets/testimonial10.webp";

const testimonials = [
  {
    id: 1,
    name: "Techboy Feezy",
    title: "Regional Lead - Nigeria",
    image: testimonial1,
    text:
      "Attending my first Team1 summit in Lagos completely changed my perspective on what's possible with Avalanche. The energy, the connections, and the hands-on workshops showed me this ecosystem is truly built for Africa.",
    signature: "Techboy Feezy",
  },
  {
    id: 2,
    name: "0xchidi",
    title: "Business Developer - Accra",
    image: chidi,
    text:
      "Team1's hackathon in Accra was incredible! I met developers from across West Africa and we built a cross-border payment dApp in 48 hours. The mentors from Avalanche really knew their stuff.",
    signature: "Chidi Ugwu",
  },
  {
    id: 3,
    name: "Fatima El-Sayed",
    title: "Product Designer - Cairo",
    image: testimonial3,
    text:
      "The Team1 design workshop in Cairo taught me so much about building user-friendly Web3 interfaces. Avalanche's subnet architecture opens up amazing possibilities for African use cases.",
    signature: "Fatima El-Sayed",
  },
  {
    id: 4,
    name: "Jean-Paul Umutoni",
    title: "Campus Ambassador - Kigali",
    image: testimonial4,
    text:
      "Being part of Team1 on campus has been life-changing. The monthly meetups we host introduce students to Avalanche and blockchain development. Seeing my classmates deploy their first smart contracts is amazing!",
    signature: "Jean-Paul Umutoni",
  },
  {
    id: 5,
    name: "Linda Agyeman",
    title: "Events Lead - Lagos",
    image: testimonial5,
    text:
      "Every Team1 event I've attended in Lagos leaves me inspired. The community is genuine, the Avalanche ecosystem keeps growing, and there's real support for builders creating solutions for African markets.",
    signature: "Linda Agyeman",
  },
  {
    id: 6,
    name: "Samuel Ochieng",
    title: "Education Partner - Nairobi",
    image: testimonial6,
    text:
      "Team1's developer bootcamp in Nairobi was phenomenal. Learning about Avalanche's consensus mechanism and building on subnets opened my eyes to scalable blockchain solutions Africa needs.",
    signature: "Samuel Ochieng",
  },
  {
    id: 7,
    name: "Amara Okeke",
    title: "Blockchain Strategist - Abuja",
    image: testimonial7,
    text:
      "Team1 connected me with policymakers and builders at their Abuja roundtable. Discussing how Avalanche can support government digital transformation was exactly the conversation Africa needs to have.",
    signature: "Amara Okeke",
  },
  {
    id: 8,
    name: "Rania Ben Ali",
    title: "Community Operations - Tunis",
    image: testimonial8,
    text:
      "The Team1 North Africa meetup in Tunis brought together brilliant minds from across the region. Avalanche's speed and low fees make it perfect for the financial inclusion projects we're building.",
    signature: "Rania Ben Ali",
  },
  {
    id: 9,
    name: "Tatenda Chikomo",
    title: "Growth Marketer - Harare",
    image: testimonial9,
    text:
      "Team1 events in Harare always deliver value. The workshops on Avalanche marketing and community building gave me practical strategies I use daily to grow our local Web3 community.",
    signature: "Tatenda Chikomo",
  },
  {
    id: 10,
    name: "Selam Tadesse",
    title: "Hackathon Mentor - Addis Ababa",
    image: testimonial10,
    text:
      "Mentoring at Team1's Addis Ababa hackathon was incredible. Watching teams build innovative dApps on Avalanche in just one weekend showed me the untapped talent across Ethiopia.",
    signature: "Selam Tadesse",
  },
];

export default function TestimonialSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Tween | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [expandedKey, setExpandedKey] = useState<number | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [cardWidth, setCardWidth] = useState(800);
  const [visibleMobileTestimonials, setVisibleMobileTestimonials] = useState(4);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const scrollStartX = useRef(0);
  const dragThreshold = 5; // Pixels to move before it counting as a drag
  const [hasMoved, setHasMoved] = useState(false);
  const GAP = 24;
  const SCROLL_DURATION = 150;

  // Create the double list for seamless loop
  const renderedCards = [...testimonials, ...testimonials];
  const originalCount = testimonials.length;

  // Update card width based on screen size
  useEffect(() => {
    const updateCardWidth = () => {
      setCardWidth(window.innerWidth < 1440 ? 600 : 800);
    };

    updateCardWidth();
    window.addEventListener('resize', updateCardWidth);
    return () => window.removeEventListener('resize', updateCardWidth);
  }, []);

  // GSAP loop setup - FIXED: Only calculate based on COLLAPSED card width
  useEffect(() => {
    if (!isReady) return;

    const container = containerRef.current;
    if (!container) return;

    // cleanup previous timeline if any
    if (tlRef.current) {
      tlRef.current.kill();
      tlRef.current = null;
    }

    // FIXED: Use responsive collapsed width for calculations
    const collapsedWidth = cardWidth;
    const totalWidth = (collapsedWidth + GAP) * originalCount;

    // Ensure there's some width
    if (totalWidth <= 0) return;

    // Animate container's x translation from 0 to -totalWidth continuously.
    // Use modifiers + gsap.utils.wrap to keep it seamless.
    const t = gsap.fromTo(container,
      { x: 0 },
      {
        x: -totalWidth,
        duration: SCROLL_DURATION,
        ease: "none",
        repeat: -1,
      }
    );

    tlRef.current = t;

    // If currently hovered or expanded, pause right away
    if (isHovering || expandedKey !== null) t.pause();

    return () => {
      t.kill();
      tlRef.current = null;
    };
  }, [originalCount, GAP, isReady, cardWidth]); // Removed isHovering - pause/resume handled separately

  // Pause/resume when hovering or when expanded
  useEffect(() => {
    const tl = tlRef.current;
    if (!tl) return;
    if (isHovering || expandedKey !== null) tl.pause();
    else tl.resume();
  }, [isHovering, expandedKey]);

  // Preload and decode ALL images before showing slider
  useEffect(() => {
    let isMounted = true;
    if (testimonials.length === 0) {
      setIsReady(true);
      return () => {
        isMounted = false;
      };
    }

    const preloadAndDecodeImages = async () => {
      try {
        // Create image elements for all testimonials
        const imagePromises = testimonials.map((item) => {
          return new Promise<void>((resolve) => {
            const img = new Image();

            img.onload = async () => {
              try {
                // Decode the image to ensure it's ready for rendering
                if ('decode' in img) {
                  await img.decode();
                }
                resolve();
              } catch (decodeError) {
                console.warn('Image decode failed:', item.image, decodeError);
                resolve(); // Still resolve to not block other images
              }
            };

            img.onerror = () => {
              console.warn('Image load failed:', item.image);
              resolve(); // Resolve anyway to not block
            };

            // Set explicit dimensions to prevent layout shift
            img.width = 800;
            img.height = 800;
            img.src = item.image;

            // If already cached and complete, decode immediately
            if (img.complete) {
              if ('decode' in img) {
                img.decode().then(resolve).catch(() => resolve());
              } else {
                resolve();
              }
            }
          });
        });

        // Wait for all images to load and decode
        await Promise.all(imagePromises);

        // Add small delay to ensure GPU has processed everything
        await new Promise(resolve => setTimeout(resolve, 100));

        if (isMounted) {
          setIsReady(true);
        }
      } catch (error) {
        console.error('Image preloading error:', error);
        if (isMounted) {
          setIsReady(true); // Show anyway
        }
      }
    };

    preloadAndDecodeImages();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleCardClick = (renderIndex: number) => {
    if (isAnimating || hasMoved) return; // Prevent clicks during animation or after dragging

    setIsAnimating(true);

    if (expandedKey === renderIndex) {
      setExpandedKey(null);
    } else {
      setExpandedKey(renderIndex);
    }

    // Reset animation lock after transition completes
    setTimeout(() => {
      setIsAnimating(false);
    }, 900); // Match the longest animation duration
  };

  // --- DRAG & SCROLL LOGIC ---

  const handleStart = (clientX: number) => {
    if (expandedKey !== null || isAnimating) return;
    setIsDragging(true);
    setHasMoved(false);
    dragStartX.current = clientX;
    scrollStartX.current = gsap.getProperty(containerRef.current, "x") as number;
    if (tlRef.current) tlRef.current.pause();
  };

  const handleMove = (clientX: number) => {
    if (!isDragging || !containerRef.current) return;
    const dx = clientX - dragStartX.current;

    if (Math.abs(dx) > dragThreshold) {
      setHasMoved(true);
    }

    const newX = scrollStartX.current + dx;
    const totalWidth = (cardWidth + GAP) * originalCount;
    const wrappedX = gsap.utils.wrap(-totalWidth, 0, newX);

    gsap.set(containerRef.current, { x: wrappedX });
  };

  const handleEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    // Sync the timeline progress to the manual position
    if (tlRef.current && containerRef.current) {
      const totalWidth = (cardWidth + GAP) * originalCount;
      const currentX = gsap.getProperty(containerRef.current, "x") as number;
      // Calculate progress (0 to 1) based on currentX position
      const progress = gsap.utils.normalize(-totalWidth, 0, currentX);
      tlRef.current.progress(1 - progress);
    }

    // Delay setting hasMoved to false to prevent click trigger immediately
    setTimeout(() => {
      setHasMoved(false);
    }, 50);

    if (!isHovering && expandedKey === null && tlRef.current) {
      tlRef.current.resume();
    }
  };

  const handleWheelScroll = (e: React.WheelEvent) => {
    if (expandedKey !== null || isAnimating || window.innerWidth < 768) return;

    // Only respond to HORIZONTAL scroll (Shift+Wheel or trackpad horizontal swipe)
    // Ignore vertical scrolling to allow normal page scroll
    const isHorizontalScroll = Math.abs(e.deltaX) > Math.abs(e.deltaY);
    if (!isHorizontalScroll) return;

    // Prevent default only for horizontal scrolling
    e.preventDefault();

    const delta = e.deltaX;
    if (Math.abs(delta) < 2) return;

    if (tlRef.current) tlRef.current.pause();

    const container = containerRef.current;
    if (!container) return;

    const currentX = gsap.getProperty(container, "x") as number;
    const totalWidth = (cardWidth + GAP) * originalCount;
    const newX = currentX - delta;
    const wrappedX = gsap.utils.wrap(-totalWidth, 0, newX);

    gsap.set(container, { x: wrappedX });

    // Sync progress so it resumes from here
    if (tlRef.current) {
      const progress = gsap.utils.normalize(-totalWidth, 0, wrappedX);
      tlRef.current.progress(1 - progress);
    }
  };

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => handleMove(e.clientX);
    const onMouseUp = () => handleEnd();
    const onTouchMove = (e: TouchEvent) => handleMove(e.touches[0].clientX);
    const onTouchEnd = () => handleEnd();

    if (isDragging) {
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
      window.addEventListener("touchmove", onTouchMove);
      window.addEventListener("touchend", onTouchEnd);
    }

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [isDragging, cardWidth, originalCount]);

  return (
    <section className="relative w-full overflow-hidden bg-[#f8f8f8] py-20">
      {/* Header */}

      <div className="px-6 max-w-7xl mb-16">
        <AnimatedText variant="scale" delay={0.1}>
          <div className="mb-4">
            <motion.div
              initial={{ rotate: -12 }}
              className="inline-block text-white bg-red-600 px-6 py-3 rounded-xl text-base font-bold mb-6 shadow-lg"
            >
              Testimonials
            </motion.div>
          </div>
        </AnimatedText>
        <AnimatedText variant="slideUp" delay={0.2}>
          <h2 className="text-3xl lt-768:text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            Straight from the source!!<br />
            <span className=""><span className="text-red-600">Team1</span> has impacted <br /> African <span className="text-red-600">Greatest</span> <span>Innovators</span></span>
          </h2>
        </AnimatedText>
      </div>

      {/* Mobile view - stacked cards */}
      <div className="md:hidden relative transition-opacity duration-700 px-4">
        <div className="flex flex-col gap-6">
          {testimonials.slice(0, visibleMobileTestimonials).map((item, index) => (
            <AnimatedText key={`mobile-card-${index}`} variant="slideUp" delay={0.1 * index}>
              <div
                className="w-full bg-white rounded-[40px] shadow-xl overflow-hidden"
              >
                {/* Image on top */}
                <div className="relative w-full h-[300px] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    width={1600}
                    height={800}
                    decoding="sync"
                    className="h-full w-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                </div>

                {/* Text below image */}
                <div className="p-6 text-gray-900">
                  <div className="mb-4">
                    <p className="text-[10px] uppercase tracking-[0.28em] text-gray-500 font-medium mb-3">
                      Overview
                    </p>
                    <h3 className="text-2xl font-bold mb-1">{item.name}</h3>
                    <p className="text-sm text-gray-600 mb-4">{item.title}</p>
                    <p className="text-base leading-relaxed text-gray-800 font-light">
                      {item.text}
                    </p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div
                      className="text-gray-900 text-2xl"
                      style={{
                        fontFamily: "'Bastliga One', 'Dancing Script', cursive",
                      }}
                    >
                      {item.signature}
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedText>
          ))}
        </div>

        {/* See More / See Less Button */}
        <div className="flex justify-center mt-8">
          {visibleMobileTestimonials < testimonials.length && (
            <button
              onClick={() => setVisibleMobileTestimonials(testimonials.length)}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200"
            >
              See More
            </button>
          )}
          {visibleMobileTestimonials >= testimonials.length && (
            <button
              onClick={() => setVisibleMobileTestimonials(4)}
              className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200"
            >
              See Less
            </button>
          )}
        </div>
      </div>

      {/* Desktop view - Scrolling row */}
      {/* Desktop view - Scrolling row */}
      {/* 1. Placeholder to reserve space while loading */}
      {!isReady && (
        <div className="hidden md:block w-full h-[600px] lt-1440:h-[500px]" />
      )}

      {/* 2. Actual Slider - Only mount when ready, letting AnimatedText handle the entry fade */}
      {isReady && (
        <AnimatedText
          variant="fadeIn"
          delay={0.3}
          className="hidden md:block relative"
        >
          <div
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => {
              setIsHovering(false);
              if (!isDragging && expandedKey === null && tlRef.current) {
                tlRef.current.resume();
              }
            }}
            onMouseDown={(e) => handleStart(e.clientX)}
            onTouchStart={(e) => handleStart(e.touches[0].clientX)}
            onWheel={handleWheelScroll}
            className={`cursor-grab active:cursor-grabbing select-none`}
          >
            {/* containerRef will move horizontally */}
            <div
              ref={containerRef}
              className="flex gap-6 px-8 items-stretch"
              style={{
                willChange: "transform",
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden',
              }}
            >
              {renderedCards.map((item, renderIndex) => {
                const isExpanded = expandedKey === renderIndex;
                const isDimmed = expandedKey !== null && !isExpanded;

                // Responsive widths for different screen sizes
                const accentWidth = cardWidth;
                const collapsedWidth = accentWidth;
                const expandedContentWidth = cardWidth * 0.75; // Increased to give text more width

                return (
                  <motion.div
                    key={`card-${renderIndex}`}
                    initial={{ width: collapsedWidth }}
                    animate={{
                      width: isExpanded ? accentWidth + expandedContentWidth : collapsedWidth,
                    }}
                    transition={{
                      width: { duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] },
                    }}
                    onClick={() => handleCardClick(renderIndex)}
                    className="flex-shrink-0 h-[600px] lt-1440:h-[500px] rounded-[40px] shadow-xl cursor-pointer overflow-hidden"
                    style={{
                      pointerEvents: isAnimating ? 'none' : 'auto',
                      willChange: 'width',
                      transform: 'translateZ(0)',
                      backfaceVisibility: 'hidden',
                      backgroundColor: 'transparent',
                    }}
                  >
                    <div className="relative h-full bg-white rounded-[40px] overflow-hidden">
                      {/* Image that spans full width - fixed, no scaling */}
                      <div className="absolute inset-0 h-full w-full overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          width={1600}
                          height={800}
                          decoding="sync"
                          className="h-full w-full object-cover object-top"
                          style={{
                            transform: 'translateZ(0)',
                            backfaceVisibility: 'hidden',
                            minWidth: '100%',
                            minHeight: '100%',
                          }}
                        />
                      </div>

                      {/* Light overlay on image side */}
                      <motion.div
                        initial={{ opacity: 0.2 }}
                        animate={{ opacity: isDimmed ? 0.6 : (isExpanded ? 0.3 : 0.2) }}
                        transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="absolute inset-0 bg-black"
                      />

                      {/* Content overlay on the right side when expanded - no transitions */}
                      {isExpanded && (
                        <div
                          className="absolute top-0 right-0 h-full text-white"
                          style={{
                            width: expandedContentWidth,
                            transform: 'translateZ(0)',
                            backfaceVisibility: 'hidden',
                          }}
                        >
                          {/* Very dark overlay panel for text side - clearly distinguished */}
                          <div className="absolute inset-0 bg-black/60 m-2 rounded-[2em]" />

                          <div className="relative flex h-full flex-col justify-between p-10">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                if (isAnimating) return;
                                setIsAnimating(true);
                                setExpandedKey(null);
                                setTimeout(() => setIsAnimating(false), 900);
                              }}
                              className="absolute top-7 right-7 w-11 h-11 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors"
                            >
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                              </svg>
                            </button>

                            <div>
                              <p className="text-[11px] uppercase tracking-[0.28em] text-white/60 font-medium mb-5 ">
                                Overview
                              </p>
                              <h3 className="text-5xl lt-1440:text-4xl font-bold mb-2">{item.name}</h3>
                              <p className="text-base text-white/70 mb-6">{item.title}</p>
                              <p className="text-3xl lt-1440:text-2xl leading-relaxed text-white/90 leading-snug font-light">
                                {item.text}
                              </p>
                            </div>

                            <div className="mt-6">
                              <div
                                className="text-white text-5xl lt-1440:text-4xl"
                                style={{
                                  fontFamily: "'Bastliga One', 'Dancing Script', cursive",
                                }}
                              >
                                {item.signature}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </AnimatedText>
      )}
    </section>
  );
}