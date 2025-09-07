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
  const [nextGameIndex, setNextGameIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<'next' | 'prev'>('next');

  const games: Game[] = [
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
  ];

  const platformIcons = {
    "Windows": windowsIcon,
    "PlayStation": playstationIcon,
    "Xbox": xboxIcon,
    "Steam": steamIcon,
    "Nintendo Switch": nintendoSwitchIcon
  };

  const nextGame = () => {
    if (isTransitioning) return;
    const nextIndex = (currentGameIndex + 1) % games.length;
    setNextGameIndex(nextIndex);
    setSlideDirection('next');
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentGameIndex(nextIndex);
      setIsTransitioning(false);
    }, 500);
  };

  const prevGame = () => {
    if (isTransitioning) return;
    const prevIndex = (currentGameIndex - 1 + games.length) % games.length;
    setNextGameIndex(prevIndex);
    setSlideDirection('prev');
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentGameIndex(prevIndex);
      setIsTransitioning(false);
    }, 500);
  };

  const currentGame = games[currentGameIndex];

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
          <div className="text-gray-600">
            <p className="text-lg">Showcase gaming on Avalanche and engage game</p>
            <p className="text-lg">developers/creators</p>
          </div>
        </div>
      </div>

      {/* Cards Container - Breaking out of padding */}
      <div className="relative w-[120vw] h-[900px] flex gap-10 pl-8">
        {/* Main Game Card */}
        <div className="relative w-[60%] h-full bg-black rounded-2xl overflow-hidden">
          {/* Gradient Overlay - Pure black on left, transparent on right */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black to-transparent" />

          {/* Card Layout */}
          <div className="relative z-10 h-full flex">

            {/* Content Section */}
            <div className="w-1/2 p-12 flex flex-col justify-between">
              {/* Game Info */}
              <div className={`transition-all duration-300 ease-out ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
                <h2 className="text-white text-5xl font-bold mb-6 leading-tight">
                  {currentGame.title}
                </h2>

                <p className="text-gray-300 text-xl mb-8 leading-relaxed">
                  {currentGame.description}
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
                    {currentGame.platforms.map((platform, index) => (
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
                  <p className="text-white font-medium text-lg">{currentGame.genre}</p>
                </div>

                {/* Navigation Controls */}
                <div className="flex justify-center mt-10 items-center z-20">
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
                          if (isTransitioning) return;
                          setIsTransitioning(true);
                          setTimeout(() => {
                            setCurrentGameIndex(index);
                            setIsTransitioning(false);
                          }, 300);
                        }}
                        className={`w-3 h-3 mx-4 rounded-full transition-all duration-300 ${index === currentGameIndex ? 'bg-white scale-125' : 'bg-gray-400 hover:bg-gray-300'
                          }`}
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

            {/* Image Section */}
            <div className="w-1/2 relative overflow-hidden">
              <div className="relative w-full h-full">
                {/* Current Image */}
                <img
                  key={`current-${currentGameIndex}`}
                  src={currentGame.image}
                  alt={currentGame.title}
                  className={`absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out ${isTransitioning
                    ? slideDirection === 'next'
                      ? '-translate-x-full'
                      : 'translate-x-full'
                    : 'translate-x-0'
                    }`}
                />

                {/* Incoming Image */}
                {isTransitioning && (
                  <img
                    key={`next-${nextGameIndex}`}
                    src={games[nextGameIndex].image}
                    alt={games[nextGameIndex].title}
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{
                      transform: slideDirection === 'next' ? 'translateX(100%)' : 'translateX(-100%)',
                      animation: slideDirection === 'next'
                        ? 'slideInFromRight 0.5s ease-out forwards'
                        : 'slideInFromLeft 0.5s ease-out forwards'
                    }}
                  />
                )}
              </div>
            </div>

            {/* CSS Animations */}
            <style>{`
                @keyframes slideInFromRight {
                  from { transform: translateX(100%); }
                  to { transform: translateX(0%); }
                }
                @keyframes slideInFromLeft {
                  from { transform: translateX(-100%); }
                  to { transform: translateX(0%); }
                }
              `}</style>
          </div>
        </div>

        {/* Next Image Peek (only part of the image) */}
        <div className="relative w-[40vw] h-full rounded-2xl overflow-hidden">
          <img
            src={games[isTransitioning ? (nextGameIndex + 1) % games.length : (currentGameIndex + 1) % games.length].image}
            alt={games[isTransitioning ? (nextGameIndex + 1) % games.length : (currentGameIndex + 1) % games.length].title}
            className="absolute top-0 left-0 h-full w-[40vw] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/30" />
        </div>
      </div>
    </div>
  );
};

export default FeaturedGames;
