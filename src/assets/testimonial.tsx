import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

import testimonial1 from "./testimonial1.jpg";
import testimonial2 from "./testimonial2.jpg";
import testimonial3 from "./testimonial3.jpg";
import testimonial4 from "./testimonial4.jpg";
import testimonial5 from "./testimonial5.jpg";
import testimonial6 from "./testimonial6.jpg";
import testimonial7 from "./testimonial7.jpg";
import testimonial8 from "./testimonial8.jpg";
import testimonial9 from "./testimonial9.jpg";
import testimonial10 from "./testimonial10.jpg";
import testimonial11 from "./testimonial11.jpeg";
import testimonial12 from "./testimonial12.jpeg";
import testimonial13 from "./testimonial13.JPG";
import testimonial14 from "./testimonial14.JPG";
import testimonial15 from "./testimonial15.JPG";
import testimonial16 from "./testimonial16.jpg";
import testimonial17 from "./testimonial17.jpg";
import testimonial18 from "./testimonial18.JPG";
import testimonial19 from "./testimonial19.JPG";
import testimonial20 from "./testimonial20.jpg";
import testimonial21 from "./testimonial21.jpg";
import testimonial22 from "./testimonial22.jpg";
import testimonial23 from "./testimonial23.jpg";
import testimonial24 from "./testimonial24.JPG";
import testimonial25 from "./testimonial25.JPG";
import testimonial26 from "./testimonial26.jpg";

const testimonials = [
  {
    id: 1,
    name: "Techboy Feezy",
    title: "Regional Lead - Nigeria",
    image: testimonial1,
    text:
      "Team1 Africa gave me the structure to grow monthly meetups in Johannesburg into a thriving hub. The playbooks, funding, and mentorship helped our community scale faster than I imagined.",
    signature: "Techboy Feezy",
  },
  {
    id: 2,
    name: "Kwame Mensah",
    title: "Developer Advocate - Accra",
    image: testimonial2,
    text:
      "With Team1 resources, I now run bilingual developer workshops across Accra. Seeing builders ship their first Avalanche dApps in a weekend never gets old.",
    signature: "Kwame Mensah",
  },
  {
    id: 3,
    name: "Fatima El-Sayed",
    title: "Product Designer - Cairo",
    image: testimonial3,
    text:
      "Designing onboarding journeys for new builders is easier with the toolkits Team1 shares. Our Cairo team can prototype, test, and ship ideas in record time.",
    signature: "Fatima El-Sayed",
  },
  {
    id: 4,
    name: "Jean-Paul Umutoni",
    title: "Campus Ambassador - Kigali",
    image: testimonial4,
    text:
      "As a campus ambassador, I rely on Team1 to keep my peers inspired. The curriculum and speaker network transformed blockchain from theory into practice at our university.",
    signature: "Jean-Paul Umutoni",
  },
  {
    id: 5,
    name: "Linda Agyeman",
    title: "Events Lead - Lagos",
    image: testimonial5,
    text:
      "Planning Lagos community events became sustainable once Team1 stepped in with logistics support. Every gathering now feels like a mini summit.",
    signature: "Linda Agyeman",
  },
  {
    id: 6,
    name: "Samuel Ochieng",
    title: "Education Partner - Nairobi",
    image: testimonial6,
    text:
      "Team1 helped us create a consistent education program for Nairobi developers. The curriculum keeps evolving with feedback from our local builders.",
    signature: "Samuel Ochieng",
  },
  {
    id: 7,
    name: "Amara Okeke",
    title: "Blockchain Strategist - Abuja",
    image: testimonial7,
    text:
      "Strategizing adoption with government partners in Abuja needs credibility. Team1's global network gives us the backing to start those conversations.",
    signature: "Amara Okeke",
  },
  {
    id: 8,
    name: "Rania Ben Ali",
    title: "Community Operations - Tunis",
    image: testimonial8,
    text:
      "Coordinating operations across North Africa can be complex, but Team1's templates keep everyone aligned. Our Tunis chapter is more focused than ever.",
    signature: "Rania Ben Ali",
  },
  {
    id: 9,
    name: "Tatenda Chikomo",
    title: "Growth Marketer - Harare",
    image: testimonial9,
    text:
      "Marketing a Web3 community in Harare is challenging without data. Team1 tools help us measure impact, grow smarter, and celebrate every milestone.",
    signature: "Tatenda Chikomo",
  },
  {
    id: 10,
    name: "Selam Tadesse",
    title: "Hackathon Mentor - Addis Ababa",
    image: testimonial10,
    text:
      "Mentoring hackathon teams in Addis Ababa is my favourite part of the program. Team1 makes sure mentors and builders both have the resources they need.",
    signature: "Selam Tadesse",
  },
  {
    id: 11,
    name: "Oluwatobi Babalola",
    title: "Technical Writer - Ibadan",
    image: testimonial11,
    text:
      "Writing technical explainers for Ibadan builders is now collaborative. Team1's review loops and knowledge base keep our content sharp.",
    signature: "Oluwatobi Babalola",
  },
  {
    id: 12,
    name: "Yara El Ghazal",
    title: "Partnerships Lead - Casablanca",
    image: testimonial12,
    text:
      "Partnership conversations in Casablanca accelerated once Team1 introduced us to ecosystem founders. We close more collaborations in less time.",
    signature: "Yara El Ghazal",
  },
  {
    id: 13,
    name: "Nkosi Dlamini",
    title: "Innovation Fellow - Mbabane",
    image: testimonial13,
    text:
      "Innovation weeks in Mbabane used to feel isolated. With Team1 Africa we plug into a continental support system that cheers every prototype.",
    signature: "Nkosi Dlamini",
  },
  {
    id: 14,
    name: "Leila Faraji",
    title: "Program Coordinator - Marrakech",
    image: testimonial14,
    text:
      "Coordinating programs in Marrakech is smoother with the central dashboards Team1 provides. Our volunteers have clarity and momentum.",
    signature: "Leila Faraji",
  },
  {
    id: 15,
    name: "Chinedu Eze",
    title: "Startups Liaison - Enugu",
    image: testimonial15,
    text:
      "Supporting founders in Enugu means connecting them to capital and mentors. Team1 makes both accessible with a single request.",
    signature: "Chinedu Eze",
  },
  {
    id: 16,
    name: "Zainab Hassan",
    title: "Community Trainer - Kano",
    image: testimonial16,
    text:
      "Training cohorts in Kano showed me the power of repeatable playbooks. Team1 resources let us adapt content without starting from scratch.",
    signature: "Zainab Hassan",
  },
  {
    id: 17,
    name: "Kofi Boateng",
    title: "Operations Lead - Kumasi",
    image: testimonial17,
    text:
      "Kumasi builders needed structure to stay engaged. Team1's cadence, challenges, and recognition programs keep everyone shipping.",
    signature: "Kofi Boateng",
  },
  {
    id: 18,
    name: "Maya Omondi",
    title: "Youth Advocate - Mombasa",
    image: testimonial18,
    text:
      "Youth clubs in Mombasa respond to stories about impact. Team1 showcases success cases that convince students to commit.",
    signature: "Maya Omondi",
  },
  {
    id: 19,
    name: "Sifiso Khumalo",
    title: "Blockchain Lecturer - Pretoria",
    image: testimonial19,
    text:
      "Lecturing in Pretoria is easier when I can demonstrate live Avalanche deployments. Team1 workshops give us up-to-date demos and tools.",
    signature: "Sifiso Khumalo",
  },
  {
    id: 20,
    name: "Iman Suleiman",
    title: "Women in Web3 Lead - Khartoum",
    image: testimonial20,
    text:
      "Growing women-led circles in Khartoum felt lonely before Team1. Now we share learning paths and celebrate each other's wins weekly.",
    signature: "Iman Suleiman",
  },
  {
    id: 21,
    name: "Bongani Mokoena",
    title: "Regional Connector - Durban",
    image: testimonial21,
    text:
      "Regional events in Durban require reliable partners. Team1 introductions helped us build a tight-knit coalition across Southern Africa.",
    signature: "Bongani Mokoena",
  },
  {
    id: 22,
    name: "Farida Diallo",
    title: "Innovation Hub Lead - Dakar",
    image: testimonial22,
    text:
      "The innovation hub in Dakar thrives on experimentation. Team1 micro-grants let teams validate ideas quickly and keep momentum.",
    signature: "Farida Diallo",
  },
  {
    id: 23,
    name: "Tasnim Bensalem",
    title: "Technical PM - Algiers",
    image: testimonial23,
    text:
      "Managing technical sprints in Algiers demands structure. Team1's sprint kits and mentorship roster keep our builders moving forward.",
    signature: "Tasnim Bensalem",
  },
  {
    id: 24,
    name: "Mpho Seabi",
    title: "Community Designer - Gaborone",
    image: testimonial24,
    text:
      "Designing community experiences in Gaborone is my dream job. Team1 empowers me to test bold ideas with confidence.",
    signature: "Mpho Seabi",
  },
  {
    id: 25,
    name: "Abena Owusu",
    title: "Programs Analyst - Cape Coast",
    image: testimonial25,
    text:
      "Analyzing programs in Cape Coast used to be manual. Team1 dashboards now show impact metrics in real time.",
    signature: "Abena Owusu",
  },
  {
    id: 26,
    name: "Lebo Molefe",
    title: "Ecosystem Builder - Port Elizabeth",
    image: testimonial26,
    text:
      "Port Elizabeth entrepreneurs are new to Avalanche, but Team1's guided challenges make the learning curve enjoyable.",
    signature: "Lebo Molefe",
  },
];

export default function TestimonialSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Tween | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [expandedKey, setExpandedKey] = useState<number | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const GAP = 24;
  const SCROLL_DURATION = 150;

  // Create the double list for seamless loop
  const renderedCards = [...testimonials, ...testimonials];
  const originalCount = testimonials.length;

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

    // FIXED: Use fixed collapsed width for calculations, not dynamic measurements
    const collapsedWidth = 800;
    const totalWidth = (collapsedWidth + GAP) * originalCount;

    // Ensure there's some width
    if (totalWidth <= 0) return;

    // Animate container's x translation from 0 to -totalWidth continuously.
    // Use modifiers + gsap.utils.wrap to keep it seamless.
    const t = gsap.to(container, {
      x: `-=${totalWidth}`,
      duration: SCROLL_DURATION,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: (x) => {
          // parse current x (string like "123px" or "-456.78px")
          const v = parseFloat(x);
          // wrap between -totalWidth and 0
          const wrapped = gsap.utils.wrap(-totalWidth, 0, v);
          return `${wrapped}px`;
        },
      },
    });

    tlRef.current = t;

    // If currently hovered or expanded, pause right away
    if (isHovering || expandedKey !== null) t.pause();

    return () => {
      t.kill();
      tlRef.current = null;
    };
  }, [originalCount, GAP, isHovering, isReady]); // FIXED: Removed expandedKey from dependencies

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
    if (isAnimating) return; // Prevent clicks during animation
    
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

   return (
     <section className="relative w-full overflow-hidden bg-[#f8f8f8] py-20">
      {/* Header */}
      <div className="px-6 max-w-7xl mx-auto mb-16">
        <div className="mb-4">
          <span className="text-xs uppercase tracking-widest text-gray-500 font-semibold">
            TESTIMONIALS
          </span>
        </div>
        <h2 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
          Don't take our word for it!<br />
          <span className="text-gray-700">Hear it from our partners.</span>
        </h2>
      </div>

      {/* Scrolling row */}
      <div
        className={`relative transition-opacity duration-700 ${isReady ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
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

            const accentWidth = 800;
            const collapsedWidth = accentWidth;
            const expandedContentWidth = 800; // Same as image width, so total doubles

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
                className="flex-shrink-0 h-[800px] rounded-[40px] shadow-xl cursor-pointer overflow-hidden"
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
                       className="h-full w-full object-cover object-center"
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
                      <div className="absolute inset-0 bg-black/60 m-4 rounded-[2em]" />
                        
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
                            <h3 className="text-7xl font-bold mb-2">{item.name}</h3>
                            <p className="text-base text-white/70 mb-6">{item.title}</p>
                            <p className="text-5xl leading-relaxed text-white/90 leading-snug font-light">
                              {item.text}
                            </p>
                          </div>

                          <div className="mt-6">
                            <div
                              className="text-white text-6xl"
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
    </section>
  );
}