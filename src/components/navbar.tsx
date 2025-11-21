import { useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
// import logo from '../assets/logo.png';
import arrow from '../assets/arrow.svg';
import arrowUp from '../assets/arrow-up.svg';
import logo from '../assets/team1logo.png';
import discordIcon from '../assets/Discord.svg';
import telegramIcon from '../assets/telegram.svg';
import { QRCodeSVG } from 'qrcode.react';

type SocialPlatform = 'whatsapp' | 'discord' | 'telegram';

const Navbar = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [showWhatsAppPopup, setShowWhatsAppPopup] = useState(false);
    const [selectedPlatform, setSelectedPlatform] = useState<SocialPlatform>('whatsapp');
    const location = useLocation();
    const popupRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    
    const handleMouseEnter = () => {
        if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current);
            hoverTimeoutRef.current = null;
        }
        setShowWhatsAppPopup(true);
    };
    
    const handleMouseLeave = () => {
        // Add a small delay before closing to allow mouse to move to popup
        hoverTimeoutRef.current = setTimeout(() => {
            setShowWhatsAppPopup(false);
        }, 300); // 300ms delay
    };
    
    
    // Replace with your actual social media links
    const whatsappNumber = "1234567890"; // Update this with your WhatsApp number
    const whatsappUrl = `https://wa.me/${whatsappNumber}`;
    const discordUrl = "https://discord.gg/your-invite-code"; // Update with your Discord invite
    const telegramUrl = "https://t.me/your-telegram-username"; // Update with your Telegram username
    
    const getPlatformUrl = (platform: SocialPlatform): string => {
        switch (platform) {
            case 'whatsapp':
                return whatsappUrl;
            case 'discord':
                return discordUrl;
            case 'telegram':
                return telegramUrl;
            default:
                return whatsappUrl;
        }
    };
    
    const getPlatformName = (platform: SocialPlatform): string => {
        switch (platform) {
            case 'whatsapp':
                return 'whatsapp us';
            case 'discord':
                return 'join discord';
            case 'telegram':
                return 'join telegram';
            default:
                return 'whatsapp us';
        }
    };
    
    
    const getPlatformBackground = (platform: SocialPlatform): string => {
        switch (platform) {
            case 'whatsapp':
                return 'bg-green-50'; // Light green
            case 'discord':
                return 'bg-purple-50'; // Light purple
            case 'telegram':
                return 'bg-blue-50'; // Light blue
            default:
                return 'bg-green-50';
        }
    };

    const getPlatformIconBackground = (iconPlatform: SocialPlatform, selectedPlatform: SocialPlatform, isSelected: boolean): string => {
        if (isSelected) {
            switch (iconPlatform) {
                case 'whatsapp':
                    return 'bg-[#25D366]'; // WhatsApp green
                case 'discord':
                    return 'bg-[#535fe4]'; // Discord purple
                case 'telegram':
                    return 'bg-[#0088cc]'; // Telegram blue
                default:
                    return 'bg-[#25D366]';
            }
        } else {
            // Each icon maintains its own color family (green, purple, blue)
            // Depth varies based on whether it matches the selected platform
            const depth = selectedPlatform === iconPlatform ? '200' : '100';
            switch (iconPlatform) {
                case 'whatsapp':
                    return depth === '200' ? 'bg-green-200' : 'bg-green-100';
                case 'discord':
                    return depth === '200' ? 'bg-purple-200' : 'bg-purple-100';
                case 'telegram':
                    return depth === '200' ? 'bg-blue-200' : 'bg-blue-100';
                default:
                    return 'bg-green-100';
            }
        }
    };


    return (
        <nav className="w-full">
            {/* Reduced vertical padding on smaller screens; ≥1920px unchanged */}
            <div className="w-full flex items-center justify-between py-4 lt-1024:py-3 lt-768:py-2">
                <Link to="/" className="flex items-center bg-black rounded-full cursor-pointer hover:scale-105 transition-transform duration-200">
                    <img src={logo} alt="team1-logo" width={50} height={50} />
                </Link>

                {/* Desktop Tabs */}
                <div className="hidden md:flex items-center justify-between">
                    {/* Tighter gaps for tabs on smaller breakpoints */}
                    <ul className="flex items-center gap-8 lt-1440:gap-6 lt-1024:gap-4 cursor-pointer">
                        <li>About</li>
                        <li><Link to="/blog" className={location.pathname === '/blog' ? 'font-semibold text-red-400' : ''}>Blog</Link></li>
                        <div className="flex gap-2">
                            <li><Link to="/events" className={location.pathname === '/events' ? 'font-semibold text-red-400' : ''}>Events</Link></li>
                            {/* Shrink arrow icon on smaller screens */}
                            <img src={arrow} alt="arrow" className="lt-1440:w-4 lt-1440:h-4 lt-1024:w-3.5 lt-1024:h-3.5" />
                        </div>
                        <div className="flex gap-2">
                            <li>Games</li>
                            {/* Shrink arrow icon on smaller screens */}
                            <img src={arrow} alt="arrow" className="lt-1440:w-4 lt-1440:h-4 lt-1024:w-3.5 lt-1024:h-3.5" />
                        </div>
                        <div className="flex gap-2">
                            <li>Community</li>
                            {/* Shrink arrow icon on smaller screens */}
                            <img src={arrow} alt="arrow" className="lt-1440:w-4 lt-1440:h-4 lt-1024:w-3.5 lt-1024:h-3.5" />
                        </div>
                    </ul>
                </div>

                {/* Desktop Button with Community Popup - Innovative Liquid Morph Design */}
                <div 
                    className="hidden md:flex relative"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    {/* Enhanced Glow Effect - Multi-layered */}
                    {showWhatsAppPopup && (
                        <div className="absolute top-0 right-0 w-[28rem] lt-1440:w-[26rem] lt-1024:w-[24rem] h-full pointer-events-none z-30">
                            <div className="absolute inset-0 bg-gradient-to-br from-red-500/30 via-purple-500/20 to-transparent rounded-3xl animate-pulse blur-3xl"></div>
                            <div className="absolute top-0 right-0 w-40 h-40 bg-red-400/40 rounded-full blur-3xl animate-ping" style={{ animationDuration: '3s' }}></div>
                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-400/30 rounded-full blur-2xl animate-pulse" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }}></div>
                        </div>
                    )}
                    
                    {/* Premium Main Button - Glassmorphism Style */}
                    <button 
                        ref={buttonRef}
                        className="group relative flex items-center gap-3 text-2xl lt-1440:text-xl lt-1024:text-lg bg-gradient-to-r from-black via-gray-900 to-black text-white px-6 py-3.5 cursor-pointer z-50 rounded-full border border-white/10 w-fit overflow-hidden transition-all duration-700 ease-out hover:scale-105 hover:shadow-2xl hover:shadow-red-500/50"
                    >
                        {/* Animated Background Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-red-500 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out"></div>
                        {/* Shimmer effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1500"></div>
                        
                        <div className="relative z-10 text-lg lt-1440:text-base lt-1024:text-sm font-medium tracking-wide" style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '0.7rem', letterSpacing: '0.08em' }}>Join the community</div>
                        <div className="relative z-10 p-1.5 rounded-full bg-white/10 group-hover:bg-white/20 transition-all duration-300">
                            <img 
                                src={arrowUp} 
                                alt="arrow" 
                                width={20} 
                                height={20} 
                                className="lt-1440:w-[18px] lt-1440:h-[18px] lt-1024:w-4 lt-1024:h-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:rotate-12" 
                            />
                        </div>
                    </button>
                    
                    {/* Container - Smooth Reveal */}
                    <div 
                        ref={popupRef}
                        className={`absolute top-full right-0 mt-4 flex flex-col items-end overflow-visible z-40 transition-all duration-1200 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
                            showWhatsAppPopup 
                                ? 'w-[28rem] lt-1440:w-[26rem] lt-1024:w-[24rem] opacity-100 scale-100 translate-y-0' 
                                : 'w-fit opacity-0 scale-95 translate-y-[-20px] pointer-events-none'
                        }`}
                        style={{
                            transformOrigin: 'top right'
                        }}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        {/* Premium Community Popup Card - Glassmorphism */}
                        <div 
                            className={`w-full ${getPlatformBackground(selectedPlatform)} rounded-3xl shadow-2xl p-8 lt-1440:p-7 lt-1024:p-6 relative transition-all duration-1200 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] backdrop-blur-xl border border-white/20 ${
                                showWhatsAppPopup 
                                    ? 'opacity-100 max-h-[800px] pointer-events-auto' 
                                    : 'opacity-0 max-h-0 pointer-events-none overflow-hidden'
                            }`}
                            style={{
                                background: selectedPlatform === 'whatsapp' 
                                    ? 'linear-gradient(135deg, rgba(240, 253, 244, 0.95) 0%, rgba(220, 252, 231, 0.9) 100%)'
                                    : selectedPlatform === 'discord'
                                    ? 'linear-gradient(135deg, rgba(250, 245, 255, 0.95) 0%, rgba(243, 232, 255, 0.9) 100%)'
                                    : 'linear-gradient(135deg, rgba(239, 246, 255, 0.95) 0%, rgba(219, 234, 254, 0.9) 100%)',
                                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1) inset'
                            }}
                        >
                            {/* Animated Background Pattern - Enhanced */}
                            <div className="absolute inset-0 opacity-[0.03] overflow-hidden rounded-3xl">
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(0,0,0,0.2),transparent_50%)] animate-pulse"></div>
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(0,0,0,0.15),transparent_50%)] animate-pulse" style={{ animationDelay: '1s' }}></div>
                            </div>
                            
                            {/* Subtle gradient overlay */}
                            <div 
                                className="absolute inset-0 rounded-3xl opacity-30 pointer-events-none"
                                style={{
                                    background: selectedPlatform === 'whatsapp'
                                        ? 'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, transparent 50%)'
                                        : selectedPlatform === 'discord'
                                        ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, transparent 50%)'
                                        : 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, transparent 50%)'
                                }}
                            ></div>
                            
                            {/* QR Code - Premium Styled */}
                            <div 
                                className={`flex justify-center mb-8 lt-1024:mb-6 transition-all duration-1200 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] z-10 relative ${
                                    showWhatsAppPopup 
                                        ? 'opacity-100 scale-100 translate-y-0' 
                                        : 'opacity-0 scale-75 translate-y-4'
                                }`}
                                style={{ transitionDelay: showWhatsAppPopup ? '200ms' : '0ms' }}
                            >
                                {/* QR Code Container with Premium Shadow */}
                                <div 
                                    className="w-[260px] h-[260px] lt-1024:w-[220px] lt-1024:h-[220px] flex items-center justify-center rounded-2xl p-4 relative"
                                    style={{ 
                                        border: 'none', 
                                        outline: 'none',
                                        background: 'rgba(255, 255, 255, 0.6)',
                                        backdropFilter: 'blur(10px)',
                                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.2) inset'
                                    }}
                                >
                                    <QRCodeSVG 
                                        value={getPlatformUrl(selectedPlatform)}
                                        size={260}
                                        level="H"
                                        includeMargin={true}
                                        bgColor="transparent"
                                        fgColor="#000000"
                                        style={{ width: '100%', height: '100%', border: 'none', outline: 'none' }}
                                    />
                                    {/* Decorative corner accents */}
                                    <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-gray-300/50 rounded-tl-lg"></div>
                                    <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-gray-300/50 rounded-tr-lg"></div>
                                    <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-gray-300/50 rounded-bl-lg"></div>
                                    <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-gray-300/50 rounded-br-lg"></div>
                                </div>
                            </div>
                            
                            {/* Platform Name - Premium Typography */}
                            <div 
                                className={`text-center mb-4 transition-all duration-1200 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] z-10 relative ${
                                    showWhatsAppPopup 
                                        ? 'opacity-100 translate-y-0' 
                                        : 'opacity-0 translate-y-4'
                                }`}
                                style={{ transitionDelay: showWhatsAppPopup ? '300ms' : '0ms' }}
                            >
                                <h3 
                                    className="text-2xl lt-1440:text-xl lt-1024:text-lg font-bold tracking-tight capitalize relative inline-block"
                                    style={{ 
                                        fontFamily: "'Press Start 2P', monospace", 
                                        fontSize: '0.9rem', 
                                        letterSpacing: '0.1em',
                                        background: selectedPlatform === 'whatsapp'
                                            ? 'linear-gradient(135deg, #16a34a 0%, #22c55e 100%)'
                                            : selectedPlatform === 'discord'
                                            ? 'linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)'
                                            : 'linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        backgroundClip: 'text',
                                        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
                                    }}
                                >
                                    {getPlatformName(selectedPlatform)}
                                </h3>
                            </div>
                            
                            {/* Instructions - Refined Typography */}
                            <div 
                                className={`text-center mb-8 lt-1024:mb-6 transition-all duration-1200 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] z-10 ${
                                    showWhatsAppPopup 
                                        ? 'opacity-100 translate-y-0' 
                                        : 'opacity-0 translate-y-2'
                                }`}
                                style={{ transitionDelay: showWhatsAppPopup ? '400ms' : '0ms' }}
                            >
                                <p className="text-sm lt-1024:text-xs text-gray-600 leading-relaxed px-2" style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif", fontWeight: 400, lineHeight: '1.6' }}>
                                    {selectedPlatform === 'whatsapp' 
                                        ? 'Scan the QR code to chat with us via your smartphone.'
                                        : 'Scan the QR code to join our community.'
                                    }
                                </p>
                            </div>
                            
                            {/* Premium Desktop Link Button */}
                            <div 
                                className={`text-center mb-6 lt-1024:mb-5 transition-all duration-1200 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] z-10 ${
                                    showWhatsAppPopup 
                                        ? 'opacity-100 translate-y-0' 
                                        : 'opacity-0 translate-y-4'
                                }`}
                                style={{ transitionDelay: showWhatsAppPopup ? '500ms' : '0ms' }}
                            >
                                <a 
                                    href={getPlatformUrl(selectedPlatform)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group/link relative inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-500/50"
                                    style={{
                                        fontFamily: "'Press Start 2P', monospace",
                                        fontSize: '0.65rem',
                                        letterSpacing: '0.05em',
                                    }}
                                >
                                    <span>{selectedPlatform === 'whatsapp' ? 'Chat via desktop' : 'Join via desktop'}</span>
                                    <svg className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover/link:translate-x-[100%] transition-transform duration-1000"></div>
                                </a>
                            </div>
                            
                            {/* Premium Social Media Icons - Positioned on Right Side */}
                            {/* WhatsApp Icon - Top Right */}
                            <button
                                onClick={() => setSelectedPlatform('whatsapp')}
                                className={`absolute w-14 h-14 p-0 rounded-full flex items-center justify-center transition-all duration-700 ease-out shadow-xl hover:scale-110 hover:shadow-2xl group/icon ${
                                    selectedPlatform === 'whatsapp' 
                                        ? 'bg-[#25D366] ring-4 ring-[#25D366]/30' 
                                        : getPlatformIconBackground('whatsapp', selectedPlatform, false)
                                } ${
                                    showWhatsAppPopup 
                                        ? 'opacity-100 scale-100' 
                                        : 'opacity-0 scale-0'
                                }`}
                                style={{ 
                                    top: '20px',
                                    right: '-24px',
                                    transitionDelay: showWhatsAppPopup ? '800ms' : '0ms',
                                    zIndex: 50,
                                    boxShadow: selectedPlatform === 'whatsapp' 
                                        ? '0 10px 25px -5px rgba(37, 211, 102, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1) inset'
                                        : '0 4px 15px -3px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.2) inset'
                                }}
                                aria-label="Select WhatsApp"
                            >
                                <svg 
                                    width="24" 
                                    height="24" 
                                    viewBox="0 0 24 24" 
                                    fill={selectedPlatform === 'whatsapp' ? "#FFFFFF" : "#25D366"}
                                    className="transition-all duration-300 flex-shrink-0"
                                    style={{ width: '24px', height: '24px', minWidth: '24px', minHeight: '24px' }}
                                >
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                                </svg>
                            </button>
                            
                            {/* Discord Icon - Middle Right */}
                            <button
                                onClick={() => setSelectedPlatform('discord')}
                                className={`absolute w-14 h-14 p-0 rounded-full flex items-center justify-center transition-all duration-700 ease-out shadow-xl hover:scale-110 hover:shadow-2xl group/icon ${
                                    selectedPlatform === 'discord' 
                                        ? 'bg-[#535fe4] ring-4 ring-[#535fe4]/30' 
                                        : getPlatformIconBackground('discord', selectedPlatform, false)
                                } ${
                                    showWhatsAppPopup 
                                        ? 'opacity-100 scale-100' 
                                        : 'opacity-0 scale-0'
                                }`}
                                style={{ 
                                    top: '76px',
                                    right: '-24px',
                                    transitionDelay: showWhatsAppPopup ? '900ms' : '0ms',
                                    zIndex: 50,
                                    boxShadow: selectedPlatform === 'discord' 
                                        ? '0 10px 25px -5px rgba(83, 95, 228, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1) inset'
                                        : '0 4px 15px -3px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.2) inset'
                                }}
                                aria-label="Select Discord"
                            >
                                <img 
                                    src={discordIcon} 
                                    alt="Discord" 
                                    width="24"
                                    height="24"
                                    className={`w-6 h-6 transition-all duration-300 flex-shrink-0 ${
                                        selectedPlatform === 'discord' ? 'brightness-0 invert' : ''
                                    }`}
                                    style={{ width: '24px', height: '24px', minWidth: '24px', minHeight: '24px' }}
                                />
                            </button>
                            
                            {/* Telegram Icon - Bottom Right */}
                            <button
                                onClick={() => setSelectedPlatform('telegram')}
                                className={`absolute w-14 h-14 p-0 rounded-full flex items-center justify-center transition-all duration-700 ease-out shadow-xl hover:scale-110 hover:shadow-2xl group/icon ${
                                    selectedPlatform === 'telegram' 
                                        ? 'bg-[#0088cc] ring-4 ring-[#0088cc]/30' 
                                        : getPlatformIconBackground('telegram', selectedPlatform, false)
                                } ${
                                    showWhatsAppPopup 
                                        ? 'opacity-100 scale-100' 
                                        : 'opacity-0 scale-0'
                                }`}
                                style={{ 
                                    top: '132px',
                                    right: '-24px',
                                    transitionDelay: showWhatsAppPopup ? '1000ms' : '0ms',
                                    zIndex: 50,
                                    boxShadow: selectedPlatform === 'telegram' 
                                        ? '0 10px 25px -5px rgba(0, 136, 204, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1) inset'
                                        : '0 4px 15px -3px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.2) inset'
                                }}
                                aria-label="Select Telegram"
                            >
                                <img 
                                    src={telegramIcon} 
                                    alt="Telegram" 
                                    width="24"
                                    height="24"
                                    className={`w-6 h-6 transition-all duration-300 flex-shrink-0 ${
                                        selectedPlatform === 'telegram' ? 'brightness-0 invert' : ''
                                    }`}
                                    style={{ width: '24px', height: '24px', minWidth: '24px', minHeight: '24px' }}
                                />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile - Just Icons */}
                <div className="md:hidden flex items-center gap-3">
                    <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-white border-2 border-black rounded-full hover:bg-gray-100 transition-all duration-300 hover:scale-110"
                        aria-label="WhatsApp"
                    >
                        <svg 
                            width="24" 
                            height="24" 
                            viewBox="0 0 24 24" 
                            fill="#25D366"
                        >
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                        </svg>
                    </a>
                    
                    <a
                        href={discordUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-white border-2 border-black rounded-full hover:bg-gray-100 transition-all duration-300 hover:scale-110"
                        aria-label="Discord"
                    >
                        <img 
                            src={discordIcon} 
                            alt="Discord" 
                            className="w-6 h-6"
                        />
                    </a>
                    
                    <a
                        href={telegramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-white border-2 border-black rounded-full hover:bg-gray-100 transition-all duration-300 hover:scale-110"
                        aria-label="Telegram"
                    >
                        <img 
                            src={telegramIcon} 
                            alt="Telegram" 
                            className="w-6 h-6"
                        />
                    </a>
                </div>

                {/* Hamburger for mobile */}
                {/* Slightly smaller tap target on very small phones */}
                <button
                    className="md:hidden flex flex-col justify-center items-center w-10 h-10 lt-480:w-9 lt-480:h-9 focus:outline-none"
                    onClick={() => setSidebarOpen(true)}
                    aria-label="Open sidebar"
                >
                    <span className="block w-7 h-1 lt-480:w-6 bg-black mb-1 rounded"></span> {/* Shrink bars on very small phones */}
                    <span className="block w-7 h-1 lt-480:w-6 bg-black mb-1 rounded"></span>
                    <span className="block w-7 h-1 lt-480:w-6 bg-black rounded"></span>
                </button>
            </div>

            {/* Sidebar Overlay */}
            <div
                className={`fixed inset-0 z-40 bg-black bg-opacity-60 transition-opacity duration-300 ${sidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setSidebarOpen(false)}
            ></div>

            {/* Sidebar */}
            {/* Narrower drawer on smaller screens */}
            <aside
                className={`fixed top-0 right-0 h-full w-80 lt-768:w-72 lt-480:w-64 max-w-full bg-white z-50 shadow-lg transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <div className="flex justify-end p-6">
                    <button onClick={() => setSidebarOpen(false)} aria-label="Close sidebar">
                        <span className='text-[3rem] lt-768:text-[2.5rem] lt-480:text-[2rem]'>&times;</span> {/* Smaller close icon on small screens */}
                    </button>
                </div>
                {/* Reduce nav item spacing and font size as screens shrink */}
                <ul className="flex flex-col gap-8 lt-768:gap-6 lt-480:gap-5 px-8 lt-768:px-6 lt-480:px-5 text-xl lt-768:text-lg lt-480:text-base cursor-pointer">
                    <li onClick={() => setSidebarOpen(false)}>About</li>
                    <li onClick={() => setSidebarOpen(false)}><Link to="/blog" className={location.pathname === '/blog' ? 'font-semibold text-red-400' : ''}>Blog</Link></li>
                    <li onClick={() => setSidebarOpen(false)}><Link to="/events" className={location.pathname === '/events' ? 'font-semibold text-red-400' : ''}>Events</Link></li>
                    <li onClick={() => setSidebarOpen(false)}>Games</li>
                    <li onClick={() => setSidebarOpen(false)}>Community</li>
                </ul>
                <div className="mt-12 px-8 lt-768:px-6 lt-480:px-5">{/* Match drawer inner padding on small screens */}
                    <button className="flex items-center gap-4 text-2xl lt-768:text-xl lt-480:text-lg bg-black text-white px-4 py-3 rounded-full w-full justify-center">{/* Scale CTA text on smaller screens */}
                        <span className="text-lg lt-768:text-base lt-480:text-sm">Join the community</span>
                        <img src={arrowUp} alt="arrow" width={30} height={30} className="lt-1440:w-[26px] lt-1440:h-[26px] lt-1024:w-6 lt-1024:h-6" />{/* Shrink icon on small screens */}
                    </button>
                </div>
            </aside>
        </nav>
    );
};

export default Navbar;
