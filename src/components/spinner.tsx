// Animation styles
const style = {
  animation: `scroll 40s linear infinite`,
};

const keyframesStyle = `
  @keyframes scroll {
    from { transform: translateX(0); }
    to { transform: translateX(-100%); }
  }
`;

interface Team {
  name: string;
  code: string;
}

interface EventBannerProps {
  events?: Team[];
  className?: string;
}

const defaultTeams: Team[] = [
  { name: "Team1 Nigeria", code: "ng" },
  { name: "Team1 South Africa", code: "za" },
  { name: "Team1 Kenya", code: "ke" },
  { name: "Team1 Uganda", code: "ug" },
];

export default function EventBanner({
  events = defaultTeams,
  className = ''
}: EventBannerProps) {

  // FIX: Repeat the data enough times to naturally fill a wide screen.
  // With 4 items, we repeat them 6 times = 24 items per loop.
  // This ensures the container is physically wider than the screen
  // so we don't need to 'stretch' the items apart.
  const denseEvents = [...events, ...events, ...events, ...events, ...events, ...events];

  return (
    <div
      className={`bg-black py-4 overflow-hidden flex items-center relative ${className}`}
      style={{
        width: '100vw',
        marginLeft: '-50vw',
        left: '50%',
        position: 'relative'
      }}
    >
      <style>{keyframesStyle}</style>

      {/* SCROLLING WRAPPER */}
      <div className="flex gap-8 w-max">

        {/* Loop 1: Contains 24 items packed tightly */}
        <div className="flex shrink-0 items-center gap-8 w-max" style={style}>
          {denseEvents.map((event, index) => (
            <TeamItem key={`original-${index}`} event={event} />
          ))}
        </div>

        {/* Loop 2: Duplicate of the 24 items for seamless loop */}
        <div className="flex shrink-0 items-center gap-8 w-max" style={style} aria-hidden="true">
          {denseEvents.map((event, index) => (
            <TeamItem key={`duplicate-${index}`} event={event} />
          ))}
        </div>

      </div>
    </div>
  );
}

const TeamItem = ({ event }: { event: Team }) => (
  <div className="flex items-center gap-2">
    <span className="text-white font-medium text-lg whitespace-nowrap">
      {event.name}
    </span>
    <img
      src={`https://flagcdn.com/w40/${event.code}.png`}
      srcSet={`https://flagcdn.com/w80/${event.code}.png 2x`}
      width="24"
      height="18"
      alt={`${event.name} flag`}
      className="rounded-[2px] object-cover"
    />
  </div>
);