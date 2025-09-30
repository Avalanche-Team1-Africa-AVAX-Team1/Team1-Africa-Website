import star from '../../assets/star.png'

interface EventBannerProps {
  events?: string[];
  className?: string;
}

export default function EventBanner({ 
  events = [
    "Team 1 Lagos Avalanche Hangout",
    "Team 1 Enugu Avalanche Hangout",
    "Team 1 Lagos Avalanche Hangout",
    "Team 1 Enugu Avalanche Hangout",
  ], 
  className = '' 
}: EventBannerProps) {
  return (
    <div className={`bg-black w-full h-20 flex items-center justify-center overflow-hidden ${className}`}>
      <div className="flex items-center animate-scroll">
        {/* Start with a star */}
        <img 
          src={star} 
          alt="Avalanche star" 
          className="w-6 h-6 mr-2"
        />
        
        {events.map((event, index) => (
          <div key={index} className="flex items-center whitespace-nowrap">
            <span className="text-white font-medium text-lg">
              {event}
            </span>
            <img 
              src={star} 
              alt="Avalanche star" 
              className="w-6 h-6 mx-2"
            />
          </div>
        ))}
        
        {/* Duplicate for seamless loop */}
        <img 
          src={star} 
          alt="Avalanche star" 
          className="w-6 h-6 mr-2"
        />
        {events.map((event, index) => (
          <div key={`duplicate-${index}`} className="flex items-center whitespace-nowrap">
            <span className="text-white font-medium text-lg">
              {event}
            </span>
            <img 
              src={star} 
              alt="Avalanche star" 
              className="w-6 h-6 mx-2"
            />
          </div>
        ))}
        {/* End with a star */}
        <img 
          src={star} 
          alt="Avalanche star" 
          className="w-6 h-6 ml-2"
        />
      </div>
    </div>
  )
}
