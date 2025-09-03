import star from '../assets/star.svg'

interface EventBannerProps {
  events?: string[];
  className?: string;
}

export default function EventBanner({ 
  events = [
    "Team 1 Lagos Avalanche Hangout",
    "Team 1 Enugu Avalanche Hangout",
    "Team 1 Delta Avalanche Hangout",
  ], 
  className = '' 
}: EventBannerProps) {
  // Create a longer array to fill the screen and ensure seamless looping
  const extendedEvents = [...events, ...events, ...events, ...events];
  
  return (
    <div className={`bg-black w-full h-20 flex items-center overflow-hidden ${className}`} style={{ width: '100vw', position: 'relative', left: '50%', transform: 'translateX(-50%)' }}>
      <div className="flex items-center animate-scroll">
        {/* First set of events */}
        {extendedEvents.map((event, index) => (
          <div key={`first-${index}`} className="flex items-center whitespace-nowrap">
            <span className="text-white font-medium text-lg ml-4">
              {event}
            </span>
            <img 
              src={star} 
              alt="Avalanche star" 
              className="w-6 h-6 mx-4"
            />
          </div>
        ))}
      </div>
    </div>
  )
}