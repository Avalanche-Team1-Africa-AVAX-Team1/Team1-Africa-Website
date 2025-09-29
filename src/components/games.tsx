import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import providenceImg from '../assets/providence.jpg';
import offTheGridImg from '../assets/off-the-grid.jpg';
import domiImg from '../assets/domi.webp';
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
}

const FeaturedGames: React.FC = () => {
  const [currentGameIndex, setCurrentGameIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [slideIndex, setSlideIndex] = useState(1); // with clones: 0..slides.length-1
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  // const [isSmallScreen, setIsSmallScreen] = useState<boolean>(typeof window !== 'undefined' ? window.innerWidth <= 1023 : false); // Track ≤1023
  const [showDetails, setShowDetails] = useState<boolean>(false); // Mobile/tablet details toggle

  // Resize listener to keep small-screen state accurate
  // React.useEffect(() => {
  //   const onResize = () => setIsSmallScreen(window.innerWidth <= 1023);
  //   window.addEventListener('resize', onResize);
  //   return () => window.removeEventListener('resize', onResize);
  // }, []);

  const games: Game[] = React.useMemo(() => [
    {
      id: 1,
      title: "PROVIDENCE",
      description: "Survive the singularity! Providence is a game that offers a unique survival-on-a-loop experience",
      genre: "Survival-on-a-loop",
      platforms: ["Windows", "PlayStation", "Xbox", "Steam", "Nintendo Switch"],
      image: providenceImg
    },
    {
      id: 2,
      title: "Off The Grid",
      description: "A cyberpunk adventure where reality meets digital consciousness in an ever-evolving virtual world",
      genre: "Action-RPG",
      platforms: ["Windows", "PlayStation", "Xbox", "Steam"],
      image: offTheGridImg
    },
    {
      id: 3,
      title: "DOMI Online",
      description: "Embark on an epic space exploration journey across infinite galaxies and discover ancient civilizations",
      genre: "Space Exploration",
      platforms: ["Windows", "PlayStation", "Xbox", "Steam", "Epic"],
      image: domiImg
    },
    {
      id: 4,
      title: "NEON RUNNERS",
      description: "High-octane racing through neon-lit cityscapes with customizable vehicles and dynamic weather",
      genre: "Racing",
      platforms: ["Windows", "PlayStation", "Xbox", "Nintendo Switch"],
      image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=800&h=600&fit=crop"
    },
    {
      id: 5,
      title: "ETHEREAL REALM",
      description: "A mystical fantasy adventure through ancient magical realms with spellbinding combat systems",
      genre: "Fantasy RPG",
      platforms: ["Windows", "PlayStation", "Steam", "Epic"],
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop"
    },
    {
      id: 6,
      title: "QUANTUM HEIST",
      description: "Plan and execute the perfect heist across multiple dimensions with time-bending mechanics",
      genre: "Strategy",
      platforms: ["Windows", "Xbox", "Steam"],
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=600&fit=crop"
    }
  ], []);

  const platformIcons = {
    "Windows": windowsIcon,
    "PlayStation": playstationIcon,
    "Xbox": xboxIcon,
    "Steam": steamIcon,
    "Nintendo Switch": nintendoSwitchIcon
  };

  // Build slides with clones for seamless wrap-around
  const slides = React.useMemo(() => {
    const last = games[games.length - 1];
    const first = games[0];
    return [last, ...games, first];
  }, [games]);

  const handleTransitionEnd = () => {
    if (slideIndex === slides.length - 1) {
      // reached end clone, jump to first real without transition
      setTransitionEnabled(false);
      setSlideIndex(1);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setTransitionEnabled(true));
      });
    } else if (slideIndex === 0) {
      // reached start clone, jump to last real without transition
      setTransitionEnabled(false);
      setSlideIndex(slides.length - 2);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setTransitionEnabled(true));
      });
    }
    setIsTransitioning(false);
  };

  const nextGame = () => {
    if (isTransitioning) return;
    const nextIndex = (currentGameIndex + 1) % games.length;
    setIsTransitioning(true);
    setShowDetails(false);
    setCurrentGameIndex(nextIndex);
    setSlideIndex((i) => i + 1);
  };

  const prevGame = () => {
    if (isTransitioning) return;
    const prevIndex = (currentGameIndex - 1 + games.length) % games.length;
    setIsTransitioning(true);
    setShowDetails(false);
    setCurrentGameIndex(prevIndex);
    setSlideIndex((i) => i - 1);
  };

  // const currentGame = games[currentGameIndex];

  return (
    <div className="bg-gray-100 py-16">
      <div className="w-full px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="inline-block bg-red-500 px-3 py-1 rounded-md text-sm font-medium mb-3 -rotate-12">
              Games
            </div>
            <h1 className="text-4xl font-bold text-gray-900">Featured Games</h1>
          </div>
          <div className="text-gray-600 lt-1024:hidden"> {/* Hide right copy on tablet/phone to reduce clutter */}
            <p className="text-lg">Showcase gaming on Avalanche and engage game</p>
            <p className="text-lg">developers/creators</p>
          </div>
        </div>
      </div>

      

      {/* Cards Container - Responsive */}
      <div className="relative w-[120vw] lt-1024:w-full h-[900px] lt-1920:h-[760px] lt-1440:h-[640px] lt-1024:h-[540px] lt-768:h-[480px] flex gap-10 lt-1024:gap-6 pl-8 lt-1024:px-4">
        {/* Main Game Card */}
        <div className="relative group w-[60%] lt-1024:w-full h-full bg-black rounded-2xl overflow-hidden"> {/* group used for hover/tap interactions on small screens */}
          {/* Gradient Overlay - desktop only */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black to-transparent lt-1024:hidden" /> {/* Keep original overlay on desktop/4K */}

          {/* Card Layout */}
          <div className="relative z-10 h-full flex lt-1024:block"> {/* Stack content on small screens */}

            {/* Content Section (desktop/4K only) */}
            <div className="w-1/2 p-12 flex flex-col justify-between lt-1024:hidden"> {/* Hide content on ≤1023: image-only view; ensure flex on laptops */}
              {/* Game Info */}
              <div className={`transition-all duration-300 ease-out ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
                <h2 className="text-white text-5xl font-bold mb-6 leading-tight">
                  {games[currentGameIndex].title}
                </h2>

                <p className="text-gray-300 text-xl mb-8 leading-relaxed">
                  {games[currentGameIndex].description}
                </p>

                <button className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-8 py-4 rounded-lg flex items-center gap-3 transition-all duration-300 hover:scale-105 border border-white/20">
                  VIEW ON IMDB
                  <ExternalLink size={20} />
                </button>
              </div>

              {/* Platform and Genre Info */}
              <div className={`transition-all duration-300 ease-out ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
                <div className="mb-6">
                  <h3 className="text-gray-400 text-sm font-semibold mb-3">Platforms</h3>
                  <div className="flex gap-3 flex-wrap">
                    {games[currentGameIndex].platforms.map((platform, index) => (
                      <div
                        key={index}
                        className="w-12 h-12 backdrop-blur-sm rounded-lg flex items-center justify-center text-xl"
                        title={platform}
                      >
                        <img
                          src={platformIcons[platform as keyof typeof platformIcons] as string}
                          alt={platform}
                          className="w-12 h-12 object-contain filter"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-gray-400 text-sm font-semibold mb-2">Genre</h3>
                  <p className="text-white font-medium text-lg">{games[currentGameIndex].genre}</p>
                </div>

                {/* Navigation Controls - desktop only (preserve current 4K behavior) */}
                <div className="flex justify-center mt-10 items-center z-20 lt-1024:hidden"> {/* Hide on ≤1023 */}
                  <button
                    onClick={prevGame}
                    className="w-24 h-24 bg-gray-950 text-white rounded-full flex items-center justify-center transition-colors"
                  >
                    <ChevronLeft size={20} />
                  </button>

                  {/* Dots Indicator */}
                  <div className="flex gap-2">
                    {games.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          if (isTransitioning || index === currentGameIndex) return;
                          setIsTransitioning(true);
                          setShowDetails(false);
                          setCurrentGameIndex(index);
                          setSlideIndex(index + 1);
                        }}
                        className={`w-3 h-3 mx-4 rounded-full transition-all duration-300 ${index === currentGameIndex ? 'bg-white scale-125' : 'bg-gray-400 hover:bg-gray-300'}`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={nextGame}
                    className="w-24 h-24 bg-gray-950 text-white rounded-full flex items-center justify-center transition-colors"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>

            </div>

            {/* Image Section (moves on track) */}
            <div className="w-1/2 lt-1024:w-full relative overflow-hidden lt-1024:min-h-[340px] lt-1024:h-full"> {/* Image-only by default on small screens */}
              <div className="w-full h-full overflow-hidden">
                <div className="relative w-full h-full" onTransitionEnd={handleTransitionEnd}>
                  {slides.map((game, idx) => (
                    <div
                      key={`main-slide-${game.id}-${idx}`}
                      className="absolute top-0 left-0 w-full h-full"
                      style={{
                        transform: `translateX(${(idx - slideIndex) * 100}%)`,
                        transition: transitionEnabled ? 'transform 500ms linear' : 'none'
                      }}
                    >
                      <button
                        onClick={() => setShowDetails(s => !s)}
                        className="hidden lt-1024:flex absolute top-3 right-3 z-20 px-4 py-2 rounded-full bg-gray-900/80 text-white text-sm"
                      >
                        {showDetails ? 'Hide details' : 'Details'}
                      </button>
                      <img src={game.image} alt={game.title} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Slide-in Details Overlay for ≤1023px */}
              <div className={`hidden lt-1024:block absolute inset-0 bg-black/90 text-white px-6 py-6 transform transition-all duration-500 ease-out pointer-events-none z-20 ${showDetails ? 'translate-x-0 opacity-100 pointer-events-auto' : '-translate-x-full opacity-0'}`}> {/* Controlled by external Details button */}
                <h2 className="text-2xl font-bold mb-3">{games[currentGameIndex].title}</h2>
                <p className="text-sm text-gray-300 mb-4">{games[currentGameIndex].description}</p>
                <div className="mb-3">
                  <h3 className="text-gray-400 text-xs font-semibold mb-2">Platforms</h3>
                  <div className="flex gap-2 flex-wrap">
                    {games[currentGameIndex].platforms.map((platform, index) => (
                      <img key={index} src={platformIcons[platform as keyof typeof platformIcons] as string} alt={platform} className="w-8 h-8 object-contain" />
                    ))}
                  </div>
                </div>
                <p className="text-sm"><span className="text-gray-400">Genre:</span> {games[currentGameIndex].genre}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Next Image Peek (hide on ≤1023 to keep only image content) */}
        <div className="relative w-[40vw] h-full rounded-2xl overflow-hidden lt-1024:hidden">
          <div className="w-full h-full overflow-hidden">
            <div className="relative w-full h-full">
              {slides.map((game, idx) => (
                <div
                  key={`peek-slide-${game.id}-${idx}`}
                  className="absolute top-0 left-0 w-full h-full"
                  style={{
                    transform: `translateX(${(idx - (slideIndex + 1)) * 100}%)`,
                    transition: transitionEnabled ? 'transform 500ms linear' : 'none'
                  }}
                >
                  <img src={game.image} alt={game.title} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/30" />
        </div>
      </div>

      {/* Mobile/Tablet Navigation under the card */}
      <div className="hidden lt-1024:flex justify-center items-center gap-6 mt-6 px-4"> {/* Outside card, visible on ≤1023 */}
        <button onClick={prevGame} className="w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center">
          <ChevronLeft size={18} />
        </button>
        <div className="flex gap-2">
          {games.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (isTransitioning || index === currentGameIndex) return;
                setIsTransitioning(true);
                setShowDetails(false);
                setCurrentGameIndex(index);
                setSlideIndex(index + 1);
              }}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${index === currentGameIndex ? 'bg-gray-900 scale-125' : 'bg-gray-400'}`}
            />
          ))}
        </div>
        <button onClick={nextGame} className="w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center">
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default FeaturedGames;