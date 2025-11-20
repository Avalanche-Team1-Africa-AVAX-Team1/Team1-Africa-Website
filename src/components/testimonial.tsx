import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

import testimonial1 from "../assets/testimonial1.jpg";
import testimonial2 from "../assets/testimonial2.jpg";
import testimonial3 from "../assets/testimonial3.jpg";
import testimonial4 from "../assets/testimonial4.jpg";
import testimonial5 from "../assets/testimonial5.jpg";
import testimonial6 from "../assets/testimonial6.jpg";
import testimonial7 from "../assets/testimonial7.jpg";
import testimonial8 from "../assets/testimonial8.jpg";
import testimonial9 from "../assets/testimonial9.jpg";
import testimonial10 from "../assets/testimonial10.jpg";
import testimonial11 from "../assets/testimonial11.jpeg";
import testimonial12 from "../assets/testimonial12.jpeg";
import testimonial13 from "../assets/testimonial13.JPG";
import testimonial14 from "../assets/testimonial14.JPG";
import testimonial15 from "../assets/testimonial15.JPG";
import testimonial16 from "../assets/testimonial16.jpg";
import testimonial17 from "../assets/testimonial17.jpg";
import testimonial18 from "../assets/testimonial18.JPG";
import testimonial19 from "../assets/testimonial19.JPG";
import testimonial20 from "../assets/testimonial20.jpg";
import testimonial21 from "../assets/testimonial21.jpg";
import testimonial22 from "../assets/testimonial22.jpg";
import testimonial23 from "../assets/testimonial23.jpg";
import testimonial24 from "../assets/testimonial24.JPG";
import testimonial25 from "../assets/testimonial25.JPG";
import testimonial26 from "../assets/testimonial26.jpg";

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
    name: "Kwame Mensah",
    title: "Developer Advocate - Accra",
    image: testimonial2,
    text:
      "Team1's hackathon in Accra was incredible! I met developers from across West Africa and we built a cross-border payment dApp in 48 hours. The mentors from Avalanche really knew their stuff.",
    signature: "Kwame Mensah",
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
  {
    id: 11,
    name: "Oluwatobi Babalola",
    title: "Technical Writer - Ibadan",
    image: testimonial11,
    text:
      "Team1's content creation workshop in Ibadan helped me understand how to explain Avalanche's technology in ways that resonate with African developers. The feedback from other contributors was invaluable.",
    signature: "Oluwatobi Babalola",
  },
  {
    id: 12,
    name: "Yara El Ghazal",
    title: "Partnerships Lead - Casablanca",
    image: testimonial12,
    text:
      "At Team1's partnership summit in Casablanca, I connected with Avalanche ecosystem projects looking to expand into North Africa. Those relationships turned into real collaborations within weeks.",
    signature: "Yara El Ghazal",
  },
  {
    id: 13,
    name: "Nkosi Dlamini",
    title: "Innovation Fellow - Mbabane",
    image: testimonial13,
    text:
      "Team1's innovation week in Mbabane was exactly what our community needed. The hands-on Avalanche development sessions and the networking gave us momentum to keep building together.",
    signature: "Nkosi Dlamini",
  },
  {
    id: 14,
    name: "Leila Faraji",
    title: "Program Coordinator - Marrakech",
    image: testimonial14,
    text:
      "Coordinating Team1 events in Marrakech has been rewarding. Every session on Avalanche attracts curious builders, and watching the community grow from meetup to meetup is truly special.",
    signature: "Leila Faraji",
  },
  {
    id: 15,
    name: "Chinedu Eze",
    title: "Startups Liaison - Enugu",
    image: testimonial15,
    text:
      "Team1's founder meetup in Enugu connected me with investors who understand Avalanche and African markets. The pitch sessions and mentorship have been game-changing for local startups.",
    signature: "Chinedu Eze",
  },
  {
    id: 16,
    name: "Zainab Hassan",
    title: "Community Trainer - Kano",
    image: testimonial16,
    text:
      "Training new developers at Team1 workshops in Kano is my passion. Avalanche's developer-friendly tools make it easy to get beginners building real projects quickly.",
    signature: "Zainab Hassan",
  },
  {
    id: 17,
    name: "Kofi Boateng",
    title: "Operations Lead - Kumasi",
    image: testimonial17,
    text:
      "Team1's community building session in Kumasi taught me how to keep builders engaged. The challenges we run using Avalanche keep our members excited and shipping consistently.",
    signature: "Kofi Boateng",
  },
  {
    id: 18,
    name: "Maya Omondi",
    title: "Youth Advocate - Mombasa",
    image: testimonial18,
    text:
      "Bringing Team1 to youth clubs in Mombasa has been amazing. Students get excited when they see Avalanche transactions happen in real-time and realize they can build the future of finance.",
    signature: "Maya Omondi",
  },
  {
    id: 19,
    name: "Sifiso Khumalo",
    title: "Blockchain Lecturer - Pretoria",
    image: testimonial19,
    text:
      "Team1's academic workshop in Pretoria gave me updated curriculum materials on Avalanche. My students now get hands-on experience with subnets and understand why speed and scalability matter.",
    signature: "Sifiso Khumalo",
  },
  {
    id: 20,
    name: "Iman Suleiman",
    title: "Women in Web3 Lead - Khartoum",
    image: testimonial20,
    text:
      "Team1's Women in Web3 gathering in Khartoum created a supportive space for us to learn about Avalanche together. The mentorship and friendships from that event continue to empower us daily.",
    signature: "Iman Suleiman",
  },
  {
    id: 21,
    name: "Bongani Mokoena",
    title: "Regional Connector - Durban",
    image: testimonial21,
    text:
      "Team1's Southern Africa summit in Durban brought together leaders from five countries. The sessions on Avalanche's cross-chain capabilities sparked collaborations we're still building on today.",
    signature: "Bongani Mokoena",
  },
  {
    id: 22,
    name: "Farida Diallo",
    title: "Innovation Hub Lead - Dakar",
    image: testimonial22,
    text:
      "Our innovation hub in Dakar hosted a Team1 demo day where teams showcased Avalanche projects. The micro-grants and feedback helped several teams move from prototype to launch.",
    signature: "Farida Diallo",
  },
  {
    id: 23,
    name: "Tasnim Bensalem",
    title: "Technical PM - Algiers",
    image: testimonial23,
    text:
      "Team1's technical sprint in Algiers was intense but worth it. Building on Avalanche with experienced mentors guiding us through best practices elevated our entire team's capabilities.",
    signature: "Tasnim Bensalem",
  },
  {
    id: 24,
    name: "Mpho Seabi",
    title: "Community Designer - Gaborone",
    image: testimonial24,
    text:
      "Attending Team1's design thinking workshop in Gaborone helped me reimagine how African users can interact with Avalanche dApps. The collaborative environment encouraged bold, creative solutions.",
    signature: "Mpho Seabi",
  },
  {
    id: 25,
    name: "Abena Owusu",
    title: "Programs Analyst - Cape Coast",
    image: testimonial25,
    text:
      "Team1's data workshop in Cape Coast taught me to measure community impact effectively. Tracking Avalanche adoption metrics helps us prove that African builders are driving real growth.",
    signature: "Abena Owusu",
  },
  {
    id: 26,
    name: "Lebo Molefe",
    title: "Ecosystem Builder - Port Elizabeth",
    image: testimonial26,
    text:
      "Team1's onboarding event in Port Elizabeth made Avalanche accessible to local entrepreneurs. The guided challenges and supportive community make the learning journey genuinely enjoyable.",
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
  const [cardWidth, setCardWidth] = useState(800);
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
  }, [originalCount, GAP, isHovering, isReady, cardWidth]); // Added cardWidth to dependencies

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

      <div className="px-6 max-w-7xl mb-16">
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

      {/* Mobile view - stacked cards */}
      <div className="md:hidden relative transition-opacity duration-700 px-4">
        <div className="flex flex-col gap-6">
          {testimonials.map((item, index) => (
            <div
              key={`mobile-card-${index}`}
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
                  className="h-full w-full object-cover object-center"
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
          ))}
        </div>
      </div>

      {/* Desktop view - Scrolling row */}
      <div
        className={`hidden md:block relative transition-opacity duration-700 ${isReady ? "opacity-100" : "opacity-0 pointer-events-none"}`}
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

            // Responsive widths for different screen sizes
            const accentWidth = cardWidth;
            const collapsedWidth = accentWidth;
            const expandedContentWidth = cardWidth; // Same as image width, so total doubles

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
    </section>
  );
}