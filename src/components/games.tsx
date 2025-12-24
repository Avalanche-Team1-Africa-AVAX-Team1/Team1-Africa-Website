import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, X } from 'lucide-react';
import AnimatedText from './AnimatedText';
import AnimatedSection, { AnimatedItem } from './AnimatedSection';
import AppImage from './ui/AppImage';

import providenceImg from '../assets/providence.jpg';
import providenceWebp from '../assets/providence.webp';
import offTheGridImg from '../assets/off-the-grid.jpg';
import offTheGridWebp from '../assets/off-the-grid.webp';
import domiImg from '../assets/domi.png';
import domiWebp from '../assets/domi.webp';
import shrapnelImg from '../assets/shrapnel.png';
import shrapnelWebp from '../assets/shrapnel.webp';
import defiKingdomImg from '../assets/kingdom.png';
import defiKingdomWebp from '../assets/kingdom.webp';
import maplestoryImg from '../assets/maple.png';
import maplestoryWebp from '../assets/maple.webp';

import steamIcon from '../assets/steam.svg';
import windowsIcon from '../assets/windows.svg';
import xboxIcon from '../assets/xbox.svg';
import playstationIcon from '../assets/playstation.svg';
import nintendoSwitchIcon from '../assets/switch.svg';

interface Game {
  id: number;
  title: string;
  description: string;
  genre: string;
  platforms: string[];
  image: string;
  imageWebp: string;
  website: string;
}

const FeaturedGames: React.FC = () => {
  const [currentGameIndex, setCurrentGameIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showDetails, setShowDetails] = useState<boolean>(false);
  // cardPositions tracks the visual position of the games [-1, 0, 1, 2]
  // We need 4 slots to handle Next (left shift) and Prev (right shift) smoothly
  // We need 4 slots to handle Next (left shift) and Prev (right shift) smoothly
  const [cardPositions, setCardPositions] = useState<number[]>([-1, 0, 1, 2]);
  const [visibleGames, setVisibleGames] = useState(2);

  const games: Game[] = React.useMemo(() => [
    {
      id: 1,
      title: "PROVIDENCE",
      description: "A sci-fi survival extraction game on Avalanche. Players venture into unstable Slipworlds to scavenge resources and alien tech before the Singularity arrives. Race against collapsing timelines and rival explorers in tense PvE/PvP gameplay. Built with Unreal Engine 5, featuring blockchain ownership and a player-driven economy.",
      genre: "Survival / Extraction",
      platforms: ["Windows", "PlayStation", "Xbox", "Steam", "Nintendo Switch"],
      image: providenceImg,
      imageWebp: providenceWebp,
      website: "https://playprovidence.io/"
    },
    {
      id: 2,
      title: "Off The Grid",
      description: "A cyberpunk third-person extraction royale by Gunzilla Games. Drop into massive battlegrounds, loot cybernetic upgrades, and extract valuable gear. Harvest enemy cyber-limbs and customize with 30+ augmentations. Features a 60+ hour campaign and blockchain-enabled trading on Avalanche's GUNZ subnet.",
      genre: "Action-RPG / Extraction Royale",
      platforms: ["Windows", "PlayStation", "Xbox", "Steam"],
      image: offTheGridImg,
      imageWebp: offTheGridWebp,
      website: "https://gameoffthegrid.com/"
    },
    {
      id: 3,
      title: "DOMI Online",
      description: "A hardcore fantasy MMORPG with no level caps and real death consequences. Explore vast worlds, claim towers, and build strategic houses. Features seasonal leaderboards and blockchain-powered true ownership of items with token-based governance in a sustainable play-to-own economy.",
      genre: "MMORPG / Fantasy Sandbox",
      platforms: ["Windows", "PlayStation", "Xbox", "Steam", "Epic"],
      image: domiImg,
      imageWebp: domiWebp,
      website: "https://domionline.io/"
    },
    {
      id: 4,
      title: "Shrapnel",
      description: "A next-gen extraction shooter on Avalanche. Enter The Sacrifice Zone to recover rare Sigma resources—death means losing gear. Beyond intense FPS gameplay, create maps, skins, and mods, mint them as NFTs, and trade freely. AAA visuals meet blockchain ownership and community creation tools.",
      genre: "Extraction Shooter / FPS",
      platforms: ["Windows", "PlayStation", "Xbox", "Nintendo Switch"],
      image: shrapnelImg,
      imageWebp: shrapnelWebp,
      website: "https://www.shrapnel.com/"
    },
    {
      id: 5,
      title: "DeFi Kingdoms",
      description: "Pixel-art fantasy RPG meets decentralized finance. Summon NFT Heroes, quest in PvE/PvP, and engage in staking and liquidity mining. The Crystalvale expansion on Avalanche introduced $CRYSTAL token for summoning and upgrades. A living DeFi ecosystem disguised as a fantasy adventure.",
      genre: "Fantasy RPG / GameFi",
      platforms: ["Windows", "PlayStation", "Steam", "Epic"],
      image: defiKingdomImg,
      imageWebp: defiKingdomWebp,
      website: "https://defikingdoms.com/"
    },
    {
      id: 6,
      title: "MapleStory Universe",
      description: "Nexon's legendary MMORPG reimagined for Web3 on Avalanche. Return to the beloved 2D side-scrolling world with blockchain-powered ownership. Tokenize items and characters, design user-generated content, and earn rewards. Nostalgia meets modern Web3 functionality in this iconic franchise reborn.",
      genre: "MMORPG / UGC",
      platforms: ["Windows", "Xbox", "Steam"],
      image: maplestoryImg,
      imageWebp: maplestoryWebp,
      website: "https://msu.io/"
    }

  ], []);

  const platformIcons: Record<string, string> = {
    "Windows": windowsIcon,
    "PlayStation": playstationIcon,
    "Xbox": xboxIcon,
    "Steam": steamIcon,
    "Nintendo Switch": nintendoSwitchIcon,
    "Epic": steamIcon // Using steam as fallback for Epic
  };

  // Reusable Platform Icons Component
  const PlatformIcons = ({ platforms, variant = 'mobile' }: { platforms: string[], variant?: 'mobile' | 'desktop' | 'overlay' }) => {
    if (variant === 'overlay') {
      return (
        <div className="flex gap-2 flex-wrap">
          {platforms.map((platform, index) => {
            const icon = platformIcons[platform];
            if (!icon) return null;
            return (
              <img
                key={index}
                src={icon}
                alt={platform}
                className="w-8 h-8 object-contain opacity-90"
              />
            );
          })}
        </div>
      );
    }

    if (variant === 'desktop') {
      return (
        <div className="flex gap-2 lg:gap-2.5 flex-wrap">
          {platforms.map((platform, index) => {
            const icon = platformIcons[platform];
            if (!icon) return null;
            return (
              <div
                key={index}
                className="w-8 h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10 bg-white/5 hover:bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center transition-all border border-white/10"
                title={platform}
              >
                <img
                  src={icon}
                  alt={platform}
                  className="w-5 h-5 lg:w-6 lg:h-6 object-contain opacity-80"
                />
              </div>
            );
          })}
        </div>
      );
    }

    // mobile variant (default)
    return (
      <div className="flex gap-3 flex-wrap">
        {platforms.map((platform, index) => {
          const icon = platformIcons[platform];
          if (!icon) return null;
          return (
            <div key={index} className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <img
                src={icon}
                alt={platform}
                className="w-8 h-8 object-contain"
              />
            </div>
          );
        })}
      </div>
    );
  };

  const nextGame = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setShowDetails(false);

    // Shift positions to the RIGHT (current card exits right)
    setCardPositions(prev => prev.map(pos => pos + 1));

    setTimeout(() => {
      // Decrement index to show previous content
      setCurrentGameIndex((prev) => (prev - 1 + games.length) % games.length);
      // Reset positions to stable state
      setCardPositions([-1, 0, 1, 2]);
      setIsTransitioning(false);
    }, 500);
  };

  const prevGame = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setShowDetails(false);

    // Shift positions to the LEFT (current card exits left)
    setCardPositions(prev => prev.map(pos => pos - 1));

    setTimeout(() => {
      // Increment index to show next content
      setCurrentGameIndex((prev) => (prev + 1) % games.length);
      // Reset positions to stable state
      setCardPositions([-1, 0, 1, 2]);
      setIsTransitioning(false);
    }, 500);
  };

  const getGameAtPosition = (position: number) => {
    if (position === -1) return (currentGameIndex - 1 + games.length) % games.length;
    if (position === 0) return currentGameIndex;
    if (position === 1) return (currentGameIndex + 1) % games.length;
    return (currentGameIndex + 2) % games.length;
  };

  // Shared navigation function for carousel dots
  const navigateToGame = (targetIndex: number) => {
    if (isTransitioning || targetIndex === currentGameIndex) return;
    const diff = (targetIndex - currentGameIndex + games.length) % games.length;
    if (diff <= games.length / 2) {
      for (let i = 0; i < diff; i++) {
        setTimeout(() => nextGame(), i * 500);
      }
    } else {
      const backSteps = games.length - diff;
      for (let i = 0; i < backSteps; i++) {
        setTimeout(() => prevGame(), i * 500);
      }
    }
  };

  // Carousel Dots Component - Minimal & Elegant
  const CarouselDots = ({ variant = 'desktop' }: { variant?: 'desktop' | 'mobile' }) => {
    if (variant === 'desktop') {
      return (
        <div className="flex gap-1.5 items-center">
          {games.map((_, index) => (
            <button
              key={index}
              onClick={() => navigateToGame(index)}
              className={`transition-all duration-300 rounded-full ${index === currentGameIndex
                ? 'w-6 h-1.5 bg-white'
                : 'w-1.5 h-1.5 bg-white/30 hover:bg-white/50'
                }`}
              aria-label={`Go to game ${index + 1}`}
            />
          ))}
        </div>
      );
    }

    // Mobile variant
    return (
      <div className="flex gap-2 items-center">
        {games.map((_, index) => (
          <button
            key={index}
            onClick={() => navigateToGame(index)}
            className={`transition-all duration-300 rounded-full ${index === currentGameIndex
              ? 'w-8 h-2 bg-gray-900'
              : 'w-2 h-2 bg-gray-400 hover:bg-gray-500'
              }`}
            aria-label={`Go to game ${index + 1}`}
          />
        ))}
      </div>
    );
  };

  // Preload all images on mount
  React.useEffect(() => {
    games.forEach((game) => {
      const img = new Image();
      img.src = game.image;
    });
  }, [games]);

  const handleLoadMore = () => {
    setVisibleGames(prev => Math.min(prev + 2, games.length));
  };

  const handleViewLess = () => {
    setVisibleGames(2);
  };

  return (
    <div className="bg-gray-100 py-16">
      {/* Mobile Static View - Simple card grid with View More */}
      <div className="lt-1024:block hidden px-6 py-12">
        <div className="mb-8">
          <AnimatedText variant="scale" delay={0.1}>
            <div className="inline-block text-white bg-red-500 px-3 py-1 rounded-md text-sm font-medium mb-3 -rotate-6">
              Games
            </div>
          </AnimatedText>
          <AnimatedText variant="slideUp" delay={0.2}>
            <h1 className="text-3xl lt-768:text-2xl font-bold text-gray-900 mb-2">Featured Games</h1>
          </AnimatedText>
        </div>

        <AnimatedSection staggerChildren={0.15} className="space-y-6">
          {games.slice(0, visibleGames).map((game) => (
            <AnimatedItem key={game.id} className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-gray-100">
              <AppImage src={game.image} srcWebp={game.imageWebp} alt={game.title} className="w-full h-48 object-cover" />

              <div className="p-5">
                <h2 className="text-2xl font-bold text-gray-900 mb-3">{game.title}</h2>
                <p className="text-gray-600 mb-4 leading-relaxed">{game.description}</p>

                <div className="mb-4">
                  <h3 className="text-gray-500 text-sm font-semibold mb-2">Platforms</h3>
                  <PlatformIcons platforms={game.platforms} variant="mobile" />
                </div>

                <div className="mb-4">
                  <h3 className="text-gray-500 text-sm font-semibold mb-1">Genre</h3>
                  <p className="text-gray-900 font-medium">{game.genre}</p>
                </div>

                <a href={game.website} target="_blank" rel="noopener noreferrer" className="w-full bg-[#1C1D1F] hover:bg-gray-800 text-white py-3 px-6 flex items-center justify-center gap-2 transition-colors duration-200">
                  WEBSITE
                  <ExternalLink size={18} />
                </a>
              </div>
            </AnimatedItem>
          ))}
        </AnimatedSection>

        <div className="flex justify-center gap-4 mt-8">
          {visibleGames < games.length && (
            <button
              onClick={handleLoadMore}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200"
            >
              View More
            </button>
          )}
          {visibleGames > 2 && (
            <button
              onClick={handleViewLess}
              className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200"
            >
              View Less
            </button>
          )}
        </div>
      </div>

      {/* Desktop Carousel View */}
      <div className="lt-1024:hidden block bg-gray-100 py-16">
        <div className="w-full px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <AnimatedText variant="scale" delay={0.1}>
                <div className="inline-block text-white bg-red-500 font-semibold px-3 py-1 rounded-md text-sm font-medium mb-3 -rotate-12">
                  Games
                </div>
              </AnimatedText>
              <AnimatedText variant="slideUp" delay={0.2}>
                <h1 className="text-4xl font-bold text-gray-900">Featured Games</h1>
              </AnimatedText>
            </div>
            <div className="text-gray-600 lt-1024:hidden">
              <AnimatedText variant="slideUp" delay={0.3}>
                <p className="text-lg">Showcase gaming on Avalanche and engage game</p>
                <p className="text-lg">developers/creators</p>
              </AnimatedText>
            </div>
          </div>
        </div>

        <AnimatedText variant="fadeIn" delay={0.4} className="relative w-[120vw] lt-1024:w-full h-[90vh] min-h-[550px] max-h-[900px] lt-1024:h-[540px] lt-768:h-[480px] flex lt-1024:gap-6 pl-8 lt-1024:px-4">
          {/* Fixed Details Card - Left Side (Desktop Only) */}
          <div className="relative w-[30%] lt-1024:hidden h-full bg-gradient-to-br from-gray-950 via-black to-gray-900 rounded-l-2xl px-6 lg:px-8 xl:px-10 py-8 lg:py-10 xl:py-12 flex flex-col justify-between z-10 overflow-hidden shadow-2xl">
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

            {/* Content wrapper */}
            <div className="relative z-10 flex flex-col h-full">
              {/* Top section - Game info */}
              <div className={`flex-1 flex flex-col transition-all duration-500 ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
                <h2 className="text-white text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 lg:mb-6 leading-tight tracking-tight">
                  {games[currentGameIndex].title}
                </h2>

                <p className="text-gray-300 text-sm lg:text-base xl:text-lg mb-6 lg:mb-8 leading-relaxed line-clamp-6">
                  {games[currentGameIndex].description}
                </p>

                <a href={games[currentGameIndex].website} target="_blank" rel="noopener noreferrer" className="bg-red-500 hover:bg-red-600 text-white px-6 py-3.5 lg:px-8 lg:py-4 rounded-xl font-semibold flex items-center justify-center gap-2.5 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-red-500/20 text-sm lg:text-base w-full lg:w-auto">
                  VISIT WEBSITE
                  <ExternalLink size={18} className="lg:w-5 lg:h-5" />
                </a>
              </div>

              {/* Bottom section - Metadata & Navigation */}
              <div className={`space-y-6 lg:space-y-8 transition-all duration-500 ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
                {/* Platforms */}
                <div>
                  <h3 className="text-gray-400 text-xs lg:text-sm font-semibold mb-3 uppercase tracking-wider">Platforms</h3>
                  <PlatformIcons platforms={games[currentGameIndex].platforms} variant="desktop" />
                </div>

                {/* Genre */}
                <div>
                  <h3 className="text-gray-400 text-xs lg:text-sm font-semibold mb-2 uppercase tracking-wider">Genre</h3>
                  <p className="text-white font-medium text-base lg:text-lg">{games[currentGameIndex].genre}</p>
                </div>

                {/* Navigation */}
                <div className="flex justify-between items-center pt-4 lg:pt-6 border-t border-gray-800">
                  <button
                    onClick={prevGame}
                    disabled={isTransitioning}
                    className="w-11 h-11 lg:w-14 lg:h-14 bg-white/5 hover:bg-white/10 text-white rounded-full flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed backdrop-blur-sm border border-white/10"
                    aria-label="Previous game"
                  >
                    <ChevronLeft size={20} className="lg:w-6 lg:h-6" />
                  </button>

                  <CarouselDots variant="desktop" />

                  <button
                    onClick={nextGame}
                    disabled={isTransitioning}
                    className="w-11 h-11 lg:w-14 lg:h-14 bg-white/5 hover:bg-white/10 text-white rounded-full flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed backdrop-blur-sm border border-white/10"
                    aria-label="Next game"
                  >
                    <ChevronRight size={20} className="lg:w-6 lg:h-6" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sliding Image Cards Container */}
          <div className="relative flex-1 h-full overflow-hidden lt-1024:rounded-2xl bg-gray-100">
            {[-1, 0, 1, 2].map((relativeIndex) => { // Render 4 slots relative to current index
              const gameIndex = getGameAtPosition(relativeIndex);
              const game = games[gameIndex];
              // Map the relative index (-1..2) to the tracked position state index (0..3)
              // The cardPositions state array corresponds to slots [-1, 0, 1, 2]
              // So cardPositions[0] tracks where slot -1 is visually, cardPositions[1] tracks slot 0, etc.
              const trackedIndex = relativeIndex + 1; // Map -1..2 to 0..3
              const visualPosition = cardPositions[trackedIndex] ?? relativeIndex; // Fallback to relativeIndex if initializing

              let translateX = 'translateX(200%)';
              let zIndex = 0;
              let width = '60%';
              let opacity = 0;
              let left = 'auto';

              if (visualPosition === -1) {
                translateX = 'translateX(-100%)';
                zIndex = 1;
                opacity = 1;
                width = '60%';
                left = '0';
              } else if (visualPosition === 0) {
                translateX = 'translateX(0%)';
                zIndex = 10;
                width = '60%';
                opacity = 1;
                left = '0';
              } else if (visualPosition === 1) {
                translateX = 'translateX(calc(100% + 2rem))';
                zIndex = 5;
                width = '60%';
                opacity = 1;
                left = 'auto';
              } else if (visualPosition === 2) {
                translateX = 'translateX(200%)';
                zIndex = 0;
                opacity = 1;
                width = '60%';
              } else if (visualPosition === 3) {
                // Buffer right (during Prev transition, slot 2 moves to 3)
                translateX = 'translateX(300%)';
                zIndex = 0;
                opacity = 1;
                width = '60%';
              } else if (visualPosition === -2) {
                // Buffer left (during Next transition, slot -1 moves to -2)
                translateX = 'translateX(-200%)';
                zIndex = 0;
                opacity = 1;
                width = '60%';
              }


              return (
                <div
                  key={relativeIndex} // Stable position key - prevents unmounting
                  className="absolute top-0 h-full rounded-r-2xl lt-1024:rounded-2xl overflow-hidden lt-1024:hidden"
                  style={{
                    transform: translateX,
                    zIndex: zIndex,
                    width: width,
                    left: left,
                    opacity: opacity,
                    transition: isTransitioning ? 'transform 500ms ease-in-out' : 'none'
                  }}
                >
                  <AppImage
                    src={game.image}
                    srcWebp={game.imageWebp}
                    alt={game.title}
                    className="w-full h-full object-cover"
                    priority={visualPosition === 0 || visualPosition === 1 || visualPosition === -1}
                  />

                  {visualPosition === 1 && (
                    <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/30" />
                  )}
                </div>
              );
            })}

            {/* Mobile: Show current card */}
            <div className="hidden lt-1024:block w-full h-full relative">
              <AppImage
                src={games[currentGameIndex].image}
                srcWebp={games[currentGameIndex].imageWebp}
                alt={games[currentGameIndex].title}
                className="w-full h-full object-cover"
                priority={true}
              />

              {!showDetails && (
                <button
                  onClick={() => setShowDetails(true)}
                  className="absolute top-3 right-3 z-20 px-4 py-2 rounded-full bg-gray-900/80 text-white text-sm"
                >
                  Details
                </button>
              )}

              <div className={`absolute inset-0 bg-black/90 text-white px-6 py-6 transform transition-all duration-500 ease-out pointer-events-none z-20 ${showDetails ? 'translate-x-0 opacity-100 pointer-events-auto' : '-translate-x-full opacity-0'}`}>
                <button
                  onClick={() => setShowDetails(false)}
                  aria-label="Close details"
                  className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center"
                >
                  <X size={18} />
                </button>
                <h2 className="text-2xl font-bold mb-3">{games[currentGameIndex].title}</h2>
                <p className="text-sm text-gray-300 mb-4">{games[currentGameIndex].description}</p>
                <div className="mb-3">
                  <h3 className="text-gray-400 text-xs font-semibold mb-2">Platforms</h3>
                  <PlatformIcons platforms={games[currentGameIndex].platforms} variant="overlay" />
                </div>
                <p className="text-sm"><span className="text-gray-400">Genre:</span> {games[currentGameIndex].genre}</p>
              </div>
            </div>
          </div>
        </AnimatedText>

        {/* Mobile/Tablet Navigation */}
        <div className="hidden lt-1024:flex justify-center items-center gap-4 mt-8 px-4">
          <button
            onClick={prevGame}
            disabled={isTransitioning}
            className="w-12 h-12 bg-gray-900 hover:bg-gray-800 text-white rounded-full flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-lg"
            aria-label="Previous game"
          >
            <ChevronLeft size={20} />
          </button>
          <CarouselDots variant="mobile" />
          <button
            onClick={nextGame}
            disabled={isTransitioning}
            className="w-12 h-12 bg-gray-900 hover:bg-gray-800 text-white rounded-full flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-lg"
            aria-label="Next game"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedGames;