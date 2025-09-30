import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, X } from 'lucide-react';
import providenceImg from '../assets/providence.jpg';
import offTheGridImg from '../assets/off-the-grid.jpg';
import domiImg from '../assets/domi.png';
import shrapnelImg from '../assets/shrapnel.png';
import defiKingdomImg from '../assets/kingdom.png';
import maplestoryImg from '../assets/maple.png';
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
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [cardPositions, setCardPositions] = useState<number[]>([0, 1, 2]);
  const [visibleGames, setVisibleGames] = useState(2);

  const games: Game[] = React.useMemo(() => [
    {
      id: 1,
      title: "PROVIDENCE",
      description: "Providence is a sci-fi survival extraction game built on Avalanche. Players become Trailblazers who venture from their Homesteads into unstable Slipworlds to scavenge resources, alien tech, and blueprints before the Singularity consumes the world. Each run is a tense mix of PvE and PvP as players race against collapsing timelines, hostile creatures, and rival explorers. With Unreal Engine 5 visuals and optional blockchain ownership of items, blueprints, and resources, Providence blends AAA survival gameplay with a player-driven economy.",
      genre: "Survival / Extraction",
      platforms: ["Windows", "PlayStation", "Xbox", "Steam", "Nintendo Switch"],
      image: providenceImg
    },
    {
      id: 2,
      title: "Off The Grid",
      description: "Off The Grid is a cyberpunk third-person extraction royale developed by Gunzilla Games. The game drops squads into massive battlegrounds where survival means looting powerful cybernetic upgrades, fighting rival players, and extracting valuable gear. Unique mechanics include harvesting enemy cyber-limbs and customizing your character with over 30 augmentations. Alongside the PvP chaos, a 60+ hour campaign story unfolds, weaving narrative missions into the same living world. Powered by the Avalanche-based GUNZ subnet, future updates bring blockchain-enabled trading and ownership of in-game assets.",
      genre: "Action-RPG / Extraction Royale",
      platforms: ["Windows", "PlayStation", "Xbox", "Steam"],
      image: offTheGridImg
    },
    {
      id: 3,
      title: "DOMI Online",
      description: "DOMI Online is a hardcore fantasy MMORPG that rejects the hand-holding of modern MMOs. There are no level or skill caps, and death carries real consequences. Players must physically explore the vast world, travel to remote regions without shortcuts, and survive its dangers. Guilds can rise in power, claim towers, and build personal houses that grant strategic advantages. Seasonal leaderboards reward top adventurers, while blockchain layers add true ownership of items, token-based governance, and a sustainable play-to-own economy.",
      genre: "MMORPG / Fantasy Sandbox",
      platforms: ["Windows", "PlayStation", "Xbox", "Steam", "Epic"],
      image: domiImg
    },
    {
      id: 4,
      title: "Shrapnel",
      description: "Shrapnel is a next-generation extraction shooter powered by Avalanche. Set in the aftermath of asteroid 38 Sigma’s impact with the moon, players enter The Sacrifice Zone as Operators tasked with recovering the rare resource Sigma. The risk is high—death means losing your gear. Beyond its tense FPS gameplay, Shrapnel empowers the community with creation tools: players can build maps, skins, and mods, mint them as NFTs, and trade within the ecosystem. Combining AAA visuals, blockchain ownership, and user-generated content, Shrapnel pushes the boundaries of Web3 shooters.",
      genre: "Extraction Shooter / FPS",
      platforms: ["Windows", "PlayStation", "Xbox", "Nintendo Switch"],
      image: shrapnelImg
    },
    {
      id: 5,
      title: "DeFi Kingdoms",
      description: "DeFi Kingdoms blends pixel-art fantasy RPG mechanics with decentralized finance. Players summon and collect NFT Heroes, send them on quests, and battle in PvE and PvP while also engaging in staking, liquidity mining, and crafting. The world is presented as a charming RPG realm with banks, gardens, and taverns, each tied to DeFi systems. With its Crystalvale expansion on Avalanche, the game introduced the $CRYSTAL token alongside $JEWEL, powering summoning, upgrades, and in-game transactions. It’s both a game and a living DeFi ecosystem disguised as a fantasy adventure.",
      genre: "Fantasy RPG / GameFi",
      platforms: ["Windows", "PlayStation", "Steam", "Epic"],
      image: defiKingdomImg
    },
    {
      id: 6,
      title: "MapleStory",
      description: "MapleStory Universe brings Nexon’s legendary MMORPG into Web3 with MapleStory N on Avalanche. Players return to the beloved 2D side-scrolling world with new layers of blockchain-powered ownership and interoperability. Items, characters, and creations can be tokenized, giving players true control over their digital assets. A major innovation is user-generated content: players can design and share experiences, earning rewards for their creations. MapleStory N combines nostalgia, community-driven content, and modern Web3 functionality to redefine one of gaming’s most iconic franchises.",
      genre: "MMORPG / UGC",
      platforms: ["Windows", "Xbox", "Steam"],
      image: maplestoryImg
    }
    
  ], []);

  const platformIcons = {
    "Windows": windowsIcon,
    "PlayStation": playstationIcon,
    "Xbox": xboxIcon,
    "Steam": steamIcon,
    "Nintendo Switch": nintendoSwitchIcon
  };

  const nextGame = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setShowDetails(false);
    
    setCardPositions(prev => prev.map(pos => pos - 1));
    
    setTimeout(() => {
      setCurrentGameIndex((prev) => (prev + 1) % games.length);
      setCardPositions([0, 1, 2]);
      setIsTransitioning(false);
    }, 500);
  };

  const prevGame = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setShowDetails(false);
    
    setCardPositions(prev => prev.map(pos => pos + 1));
    
    setTimeout(() => {
      setCurrentGameIndex((prev) => (prev - 1 + games.length) % games.length);
      setCardPositions([0, 1, 2]);
      setIsTransitioning(false);
    }, 500);
  };

  const getGameAtPosition = (position: number) => {
    if (position === 0) return currentGameIndex;
    if (position === 1) return (currentGameIndex + 1) % games.length;
    return (currentGameIndex + 2) % games.length;
  };

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
          <div className="inline-block bg-red-500 px-3 py-1 rounded-md text-sm font-medium mb-3 -rotate-6">
            Games
          </div>
          <h1 className="text-3xl lt-768:text-2xl font-bold text-gray-900 mb-2">Featured Games</h1>
        </div>

        <div className="space-y-6">
          {games.slice(0, visibleGames).map((game) => (
            <div key={game.id} className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-gray-100">
              <img src={game.image} alt={game.title} className="w-full h-48 object-cover" />
              
              <div className="p-5">
                <h2 className="text-2xl font-bold text-gray-900 mb-3">{game.title}</h2>
                <p className="text-gray-600 mb-4 leading-relaxed">{game.description}</p>
                
                <div className="mb-4">
                  <h3 className="text-gray-500 text-sm font-semibold mb-2">Platforms</h3>
                  <div className="flex gap-3 flex-wrap">
                    {game.platforms.map((platform, index) => (
                      <div key={index} className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <img
                          src={platformIcons[platform as keyof typeof platformIcons] as string}
                          alt={platform}
                          className="w-8 h-8 object-contain"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="text-gray-500 text-sm font-semibold mb-1">Genre</h3>
                  <p className="text-gray-900 font-medium">{game.genre}</p>
                </div>

                <button className="w-full bg-[#1C1D1F] hover:bg-gray-800 text-white py-3 px-6 flex items-center justify-center gap-2 transition-colors duration-200">
                  WEBSITE
                  <ExternalLink size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

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

      {/* Desktop Carousel View - Keep exactly as is */}
      <div className="lt-1024:hidden block bg-gray-100 py-16">
      <div className="w-full px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="inline-block bg-red-500 px-3 py-1 rounded-md text-sm font-medium mb-3 -rotate-12">
              Games
            </div>
            <h1 className="text-4xl font-bold text-gray-900">Featured Games</h1>
          </div>
          <div className="text-gray-600 lt-1024:hidden">
            <p className="text-lg">Showcase gaming on Avalanche and engage game</p>
            <p className="text-lg">developers/creators</p>
          </div>
        </div>
      </div>

      <div className="relative w-[120vw] lt-1024:w-full h-[900px] lt-1920:h-[760px] lt-1440:h-[640px] lt-1024:h-[540px] lt-768:h-[480px] flex lt-1024:gap-6 pl-8 lt-1024:px-4">
        {/* Fixed Details Card - Left Side (Desktop Only) */}
        <div className="relative w-[30%] lt-1024:hidden h-full bg-black rounded-l-2xl p-12 flex flex-col justify-between z-10">
          <div className={`transition-all duration-300 ease-out ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
            <h2 className="text-white text-5xl font-bold mb-6 leading-tight">
              {games[currentGameIndex].title}
            </h2>

            <p className="text-gray-300 text-xl mb-8 leading-relaxed">
              {games[currentGameIndex].description}
            </p>

            <button className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-8 py-6 rounded-full flex items-center gap-3 transition-all duration-300 hover:scale-105 border border-white/20">
              WEBSITE
              <ExternalLink size={20} />
            </button>
          </div>

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

            <div className="flex justify-center mt-10 items-center z-20">
              <button
                onClick={prevGame}
                disabled={isTransitioning}
                className="w-24 h-24 bg-gray-950 text-white rounded-full flex items-center justify-center transition-colors disabled:opacity-50"
              >
                <ChevronLeft size={20} />
              </button>

              <div className="flex gap-2">
                {games.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      if (isTransitioning || index === currentGameIndex) return;
                      const diff = (index - currentGameIndex + games.length) % games.length;
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
                    }}
                    className={`w-3 h-3 mx-4 rounded-full transition-all duration-300 ${index === currentGameIndex ? 'bg-white scale-125' : 'bg-gray-400 hover:bg-gray-300'}`}
                  />
                ))}
              </div>

              <button
                onClick={nextGame}
                disabled={isTransitioning}
                className="w-24 h-24 bg-gray-950 text-white rounded-full flex items-center justify-center transition-colors disabled:opacity-50"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Sliding Image Cards Container */}
        <div className="relative flex-1 h-full overflow-hidden lt-1024:rounded-2xl">
          {[0, 1, 2].map((positionIndex) => {
            const gameIndex = getGameAtPosition(positionIndex);
            const game = games[gameIndex];
            const cardPosition = cardPositions[positionIndex];
            
            let translateX = 'translateX(200%)';
            let zIndex = 0;
            let width = '60%';
            let opacity = 0;
            let left = 'auto';
            
            if (cardPosition === -1) {
              translateX = 'translateX(-100%)';
              zIndex = 0;
              opacity = 0;
              width = '60%';
            } else if (cardPosition === 0) {
              translateX = 'translateX(0%)';
              zIndex = 10;
              width = '60%';
              opacity = 1;
              left = '0';
            } else if (cardPosition === 1) {
              translateX = 'translateX(calc(100% + 2rem))';
              zIndex = 5;
              width = '60%';
              opacity = 1;
              left = 'auto';
            } else if (cardPosition === 2) {
              translateX = 'translateX(200%)';
              zIndex = 0;
              opacity = 0;
              width = '60%';
            }

            return (
              <div
                key={`card-${gameIndex}-${positionIndex}`}
                className="absolute top-0 h-full rounded-r-2xl lt-1024:rounded-2xl overflow-hidden lt-1024:hidden"
                style={{
                  transform: translateX,
                  zIndex: zIndex,
                  width: width,
                  left: left,
                  opacity: opacity,
                  transition: 'transform 500ms ease-out, opacity 500ms ease-out'
                }}
              >
                <img 
                  src={game.image} 
                  alt={game.title} 
                  className="w-full h-full object-cover" 
                />
                
                {cardPosition === 1 && (
                  <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/30" />
                )}
              </div>
            );
          })}

          {/* Mobile: Show current card */}
          <div className="hidden lt-1024:block w-full h-full relative">
            <img 
              src={games[currentGameIndex].image} 
              alt={games[currentGameIndex].title} 
              className="w-full h-full object-cover" 
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

      {/* Mobile/Tablet Navigation */}
      <div className="hidden lt-1024:flex justify-center items-center gap-6 mt-6 px-4">
        <button 
          onClick={prevGame} 
          disabled={isTransitioning}
          className="w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center disabled:opacity-50"
        >
          <ChevronLeft size={18} />
        </button>
        <div className="flex gap-2">
          {games.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (isTransitioning || index === currentGameIndex) return;
                const diff = (index - currentGameIndex + games.length) % games.length;
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
              }}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${index === currentGameIndex ? 'bg-gray-900 scale-125' : 'bg-gray-400'}`}
            />
          ))}
        </div>
        <button 
          onClick={nextGame} 
          disabled={isTransitioning}
          className="w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center disabled:opacity-50"
        >
          <ChevronRight size={18} />
        </button>
      </div>
      </div>
    </div>
  );
};

export default FeaturedGames;