import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";

const testimonials = [
  {
    id: 1,
    name: "Sarah Chen",
    title: "Team1 Community Leader - Singapore",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=600&fit=crop",
    text:
      "Joining Avalanche Team1 has been transformative for my blockchain journey. The support from the global community is incredible, and organizing local meetups in Singapore has connected me with amazing builders and developers. Team1 provides resources, mentorship, and opportunities that have helped me grow both personally and professionally in the Web3 space.",
  },
  {
    id: 2,
    name: "Marcus Rodriguez",
    title: "Developer Advocate - Mexico City",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&h=600&fit=crop",
    text:
      "Team1 gave me the platform to host hackathons and developer workshops across Latin America. The Spanish-language bootcamp we launched reached over 800 builders, and seeing developers create their first dApps on Avalanche is incredibly rewarding. The ecosystem's speed and scalability make it perfect for onboarding new talent to blockchain development.",
  },
  {
    id: 3,
    name: "Aisha Patel",
    title: "Content Creator & Team1 Member - Mumbai",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&h=600&fit=crop",
    text:
      "As a content creator in Team1, I've had the opportunity to tell the Avalanche story through videos, articles, and social media. The community is passionate about building real-world solutions, and being part of the India Hackathon Tour has been amazing. Team1 doesn't just support you—it amplifies your voice and helps you make a genuine impact in the ecosystem.",
  },
  {
    id: 4,
    name: "James Wilson",
    title: "University Lead - London",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&h=600&fit=crop",
    text:
      "Through Team1, I've integrated Avalanche into blockchain clubs at universities across the UK. The program provides everything you need to educate students about Web3—from technical resources to event funding. Watching students build their first smart contracts and seeing them get excited about the technology's potential is what drives me. Team1 is building the next generation of blockchain developers.",
  },
  {
    id: 5,
    name: "Elena Kowalski",
    title: "Event Organizer - Warsaw",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&h=600&fit=crop",
    text:
      "Organizing IRL events for Team1 in Warsaw has been an incredible experience. From community dinners to networking meetups, every event brings together passionate people who believe in Avalanche's mission. The Team1 program gives us the autonomy to create meaningful experiences while providing the support and resources we need. The free Summit tickets and exclusive merch are just bonuses!",
  },
  {
    id: 6,
    name: "David Nguyen",
    title: "Technical Workshop Lead - Vietnam",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop",
    text:
      "Team1 empowered me to host technical workshops for developers in Vietnam. Teaching builders about Avalanche's custom L1s, interchain messaging, and the C-Chain has been fulfilling. The platform's near-instant finality and low fees make it easy to demonstrate real-world use cases. Being part of a global network of 700+ members across 55 countries is inspiring—we're all building the future together.",
  },
  {
    id: 7,
    name: "Priya Sharma",
    title: "DeFi Educator - Bangalore",
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600&h=600&fit=crop",
    text:
      "As a DeFi educator in Team1, I help newcomers understand Avalanche's growing ecosystem—from DEXs like Blackhole Protocol to innovative stablecoin primitives. The community is welcoming, knowledgeable, and always willing to help. Team1 has given me networking opportunities with project leaders and access to educational resources that have deepened my understanding of blockchain technology exponentially.",
  },
  {
    id: 8,
    name: "Carlos Mendoza",
    title: "Gaming Community Builder - Buenos Aires",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&h=600&fit=crop",
    text:
      "The gaming side of Avalanche is explosive, and Team1 lets me connect gamers with incredible projects like MapleStory and Pixelmon. Hosting game nights and tournaments in Buenos Aires has built a vibrant local community. Avalanche's high-performance network makes Web3 gaming seamless, and being part of Team1 means I get early access to new gaming launches and exclusive event invites. It's been a game-changer for my career.",
  },
];

export default function TestimonialSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Tween | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [expandedKey, setExpandedKey] = useState<number | null>(null);
  const GAP = 24;

  // Create the double list for seamless loop
  const renderedCards = [...testimonials, ...testimonials];
  const originalCount = testimonials.length;

  // GSAP loop setup
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // cleanup previous timeline if any
    if (tlRef.current) {
      tlRef.current.kill();
      tlRef.current = null;
    }

    // measure total width of the first set of cards (originalCount items)
    const nodes = Array.from(container.children).slice(0, originalCount) as HTMLElement[];
    const totalWidth =
      nodes.reduce((sum, n) => sum + (n.getBoundingClientRect().width || 0), 0) +
      GAP * originalCount;

    // Ensure there's some width
    if (totalWidth <= 0) return;

    // Animate container's x translation from 0 to -totalWidth continuously.
    // Use modifiers + gsap.utils.wrap to keep it seamless.
    const t = gsap.to(container, {
      x: `-=${totalWidth}`,
      duration: 30,
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
  }, [originalCount, GAP, expandedKey, isHovering]);

  // Pause/resume when hovering or when expanded
  useEffect(() => {
    const tl = tlRef.current;
    if (!tl) return;
    if (isHovering || expandedKey !== null) tl.pause();
    else tl.resume();
  }, [isHovering, expandedKey]);

  const handleCardClick = (renderIndex: number) => {
    if (expandedKey === renderIndex) {
      setExpandedKey(null);
      return;
    }
    setExpandedKey(renderIndex);
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
        className="relative"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* containerRef will move horizontally */}
        <div
          ref={containerRef}
          className="flex gap-6 px-8 items-stretch"
          style={{ willChange: "transform" }}
        >
           {renderedCards.map((item, renderIndex) => {
            const isExpanded = expandedKey === renderIndex;
            const isDimmed = expandedKey !== null && !isExpanded;

            const accentWidth = 800;
            const collapsedWidth = accentWidth;
            const expandedContentWidth = 1350;

            return (
              <motion.div
                key={`card-${renderIndex}`}
                animate={{
                  width: isExpanded ? accentWidth + expandedContentWidth : collapsedWidth,
                }}
                transition={{ 
                  width: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
                }}
                onClick={() => handleCardClick(renderIndex)}
                className="flex-shrink-0 h-[800px] rounded-[40px] bg-white shadow-xl cursor-pointer overflow-hidden"
              >
                <div className="relative h-full flex">
                  <motion.div
                    animate={{ width: accentWidth, opacity: isExpanded ? 1 : (isDimmed ? 0.6 : 1) }}
                    transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="relative h-full flex-[0_0_auto] overflow-hidden"
                    style={{ pointerEvents: isExpanded ? 'none' : 'auto' }}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20" />
                  </motion.div>

                  <AnimatePresence mode="wait">
                    {isExpanded && (
                      <motion.div
                        key="expanded"
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: expandedContentWidth, opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        transition={{
                          width: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] },
                          opacity: { duration: 0.3 }
                        }}
                        className="relative h-full overflow-hidden text-white"
                      >
                        <img
                          src={item.image}
                          alt=""
                          className="absolute inset-0 h-full w-full object-cover blur-[60px] scale-110"
                        />
                        <div className="absolute inset-0 bg-black/55" />
                        <motion.div
                          initial={{ x: 60, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          exit={{ x: 60, opacity: 0 }}
                          transition={{
                            x: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
                            opacity: { duration: 0.35 }
                          }}
                          className="relative flex h-full flex-col justify-between p-10"
                        >
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setExpandedKey(null);
                            }}
                            className="absolute top-7 right-7 w-11 h-11 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors"
                          >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <line x1="18" y1="6" x2="6" y2="18" />
                              <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                          </button>

                          <div>
                            <p className="text-[11px] uppercase tracking-[0.28em] text-white/60 font-medium mb-5">
                              Overview
                            </p>
                            <h3 className="text-3xl font-bold mb-2">{item.name}</h3>
                            <p className="text-base text-white/70 mb-6">{item.title}</p>
                            <p className="text-base leading-relaxed text-white/90">
                              {item.text}
                            </p>
                          </div>

                          <div className="mt-6">
                            <a
                              href="#"
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-2 text-white font-semibold text-base hover:gap-3 transition-all group"
                            >
                              View Live Site
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="group-hover:translate-x-1 transition-transform">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                              </svg>
                            </a>
                          </div>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
             );
           })}
        </div>

      </div>

      {/* hint */}
      <div className="text-center text-sm text-gray-500 mt-8">
        Click a card to expand inline. Hover to pause scrolling.
      </div>
    </section>
  );
}