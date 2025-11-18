# Event Calendar - 3D Interactive Calendar

A web-based 3D Event Calendar interface built with Three.js, React, and GSAP. Features an immersive 3D calendar grid with interactive date tiles, smooth animations, and a responsive design that falls back to 2D on mobile devices.

## Features

- **3D Calendar Grid**: Month view rendered as an interactive 3D grid using Three.js
- **Interactive Date Tiles**: Hover animations (tilt, scale, glow, depth shift) on desktop
- **Clickable Tiles**: Click any date to view event details
- **Event Detail Panel**: Beautiful overlay panel showing event information
- **Month Navigation**: Smooth 3D transitions when switching months
- **Responsive Design**: Desktop-first 3D experience with 2D fallback on mobile
- **Performance Optimized**: Reduced polygon counts, selective animations, efficient rendering

## Tech Stack

- **React 19** - UI framework
- **Three.js** - 3D rendering
- **GSAP** - Animation library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Router** - Navigation

## Installation

The required dependencies are already installed. If you need to reinstall:

```bash
npm install
```

## Running Locally

1. Start the development server:
```bash
npm run dev
```

2. Navigate to the calendar:
   - Direct URL: `http://localhost:5173/calendar`
   - Or click "See All Events" button on the main page

## Project Structure

```
src/
├── components/
│   ├── EventCalendar.tsx      # Main 3D calendar component
│   └── EventDetailPanel.tsx    # Event detail overlay panel
├── data/
│   └── events.ts               # Mock event data
├── types/
│   └── event.ts                # TypeScript type definitions
└── main.tsx                    # Router configuration
```

## Event Data Structure

Events are stored in `src/data/events.ts` with the following structure:

```typescript
{
  date: "YYYY-MM-DD",
  title: string,
  description: string,
  time: string,
  location: string,
  organizer: {
    name: string,
    avatar: string
  },
  attendees: [
    {
      name: string,
      avatar: string
    }
  ]
}
```

## Adding Events

To add new events, edit `src/data/events.ts` and add entries to the `mockEvents` array:

```typescript
{
  date: '2025-01-20',
  title: 'Your Event Title',
  description: 'Event description...',
  time: '6:00 PM - 9:00 PM',
  location: 'City, Country',
  organizer: {
    name: 'Organizer Name',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Organizer'
  },
  attendees: [
    { name: 'Attendee 1', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Attendee1' }
  ]
}
```

## Performance Optimizations

- **Reduced Polygon Counts**: Sphere geometries use 8 segments instead of 16
- **Pre-computed Bounding Spheres**: Faster raycasting for tile interactions
- **Pixel Ratio Limiting**: Capped at 2x for better performance on high-DPI displays
- **Selective Animations**: Animations only enabled when needed
- **Geometry Reuse**: Shared geometries where possible
- **Shadow Maps Disabled**: Improves rendering performance
- **Mobile Fallback**: 2D grid on mobile devices (≤768px) for better performance

## Responsive Behavior

- **Desktop (>768px)**: Full 3D calendar with Three.js rendering
- **Mobile (≤768px)**: Simplified 2D grid layout for better performance and usability

## Customization

### Styling
- Colors and gradients can be modified in the component files
- Tailwind CSS classes are used throughout for easy customization

### 3D Settings
- Camera position: `camera.position.set(0, 0, 25)`
- Tile spacing: `spacing = 2.2`
- Tile size: `BoxGeometry(1.8, 1.8, 0.2)`

### Animations
- Hover animations use GSAP with `power2.out` easing
- Month transitions use `power2.inOut` easing
- Panel animations use `power3.out` easing

## Browser Support

- Chrome/Edge (recommended)
- Firefox
- Safari
- Mobile browsers (with 2D fallback)

## Future Enhancements

- API integration for real-time event data
- User authentication for event registration
- Calendar export functionality
- Recurring events support
- Event categories and filtering
- Dark mode support

## Troubleshooting

### Calendar not rendering
- Check browser console for errors
- Ensure WebGL is supported in your browser
- Try disabling browser extensions that might interfere

### Performance issues
- Reduce the number of events
- Lower the pixel ratio in the renderer settings
- Check device capabilities (mobile automatically uses 2D)

### Events not showing
- Verify event dates match the calendar month
- Check the date format (YYYY-MM-DD)
- Ensure events are in the `mockEvents` array

## License

Part of the Team1 Africa Website project.

