# Architecture Diagram - Gallery & Events Flow

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        ADMIN PANEL                              │
│                  (http://localhost:3000)                        │
│                                                                 │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐    │
│  │ Create Event │───▶│ Upload Photos│───▶│ Mark Complete│    │
│  └──────────────┘    └──────────────┘    └──────────────┘    │
│                                                                 │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             │ Saves to Database
                             ▼
                    ┌─────────────────┐
                    │   DATABASE      │
                    │                 │
                    │  ┌───────────┐  │
                    │  │  Events   │  │
                    │  │  - draft  │  │
                    │  │  - upcoming│ │
                    │  │  - completed│ │
                    │  └───────────┘  │
                    │                 │
                    │  ┌───────────┐  │
                    │  │  Gallery  │  │
                    │  │  Images   │  │
                    │  │  (linked  │  │
                    │  │  to events)│ │
                    │  └───────────┘  │
                    └────────┬────────┘
                             │
                             │ API Requests
                             ▼
                    ┌─────────────────┐
                    │  BACKEND API    │
                    │  localhost:3000 │
                    │                 │
                    │  GET /events    │
                    │  GET /gallery   │
                    │  GET /blogs     │
                    │  POST /media    │
                    └────────┬────────┘
                             │
                             │ HTTP Requests
                             ▼
                    ┌─────────────────┐
                    │  API CLIENT     │
                    │  (src/lib/api.ts)│
                    │                 │
                    │  - Unwraps      │
                    │    responses    │
                    │  - Error        │
                    │    handling     │
                    │  - TypeScript   │
                    └────────┬────────┘
                             │
                             │ Provides Data
                             ▼
                    ┌─────────────────┐
                    │  FRONTEND       │
                    │  localhost:5173 │
                    │                 │
                    │  ┌───────────┐  │
                    │  │  Gallery  │  │
                    │  │   Page    │  │
                    │  └───────────┘  │
                    │                 │
                    │  ┌───────────┐  │
                    │  │  Events   │  │
                    │  │  Calendar │  │
                    │  └───────────┘  │
                    │                 │
                    │  ┌───────────┐  │
                    │  │   Blog    │  │
                    │  │   Pages   │  │
                    │  └───────────┘  │
                    └─────────────────┘
```

## 🔄 Gallery Data Flow

### Old Way (Hardcoded)
```
┌──────────────┐
│  Gallery.tsx │
│              │
│  rawMoments  │◀── Hardcoded array of 24 images
│  = [...]     │
└──────────────┘
```

### New Way (API-Driven)
```
┌──────────────┐
│ GalleryNew   │
│    .tsx      │
└──────┬───────┘
       │
       │ 1. Fetch completed events
       │
       ▼
┌──────────────┐
│ api.get      │
│ CompletedEvents()
└──────┬───────┘
       │
       │ Returns: [Event, Event, ...]
       │
       ▼
┌──────────────┐
│ For each     │
│ event...     │
└──────┬───────┘
       │
       │ 2. Fetch gallery images
       │
       ▼
┌──────────────┐
│ api.get      │
│ EventGallery(id)
└──────┬───────┘
       │
       │ Returns: [GalleryImage, ...]
       │
       ▼
┌──────────────┐
│ Display in   │
│ - Infinite   │
│   Canvas     │
│ - Event      │
│   Albums     │
│ - Polaroid   │
│   Gallery    │
└──────────────┘
```

## 📊 Data Transformation

### API Response → Display Format

```typescript
// 1. API returns this:
{
  success: true,
  data: {
    items: [
      {
        id: "evt_123",
        title: "Avalanche Africa Summit",
        description: "300+ builders...",
        startDate: "2024-03-15T09:00:00Z",
        endDate: "2024-03-15T17:00:00Z",
        location: "Cape Town",
        coverImage: "https://...",
        status: "completed"
      }
    ]
  }
}

// 2. API client unwraps to:
{
  items: [
    {
      id: "evt_123",
      title: "Avalanche Africa Summit",
      ...
    }
  ]
}

// 3. Component transforms to:
{
  id: "evt_123",
  image: "https://...",
  title: "Avalanche Africa Summit",
  location: "Cape Town",
  date: "March 2024",
  description: "300+ builders...",
  eventId: "evt_123"
}

// 4. Layout algorithm adds:
{
  ...above,
  x: 245,      // Random position
  y: -120,     // Random position
  size: 350,   // Random size
  margin: 65   // Random margin
}
```

## 🎯 Event Lifecycle

```
┌─────────────┐
│   DRAFT     │  Created in admin, not visible
└──────┬──────┘
       │
       │ Publish
       ▼
┌─────────────┐
│  UPCOMING   │  Shows in Events Calendar
└──────┬──────┘
       │
       │ Event happens
       │ Upload photos
       ▼
┌─────────────┐
│  COMPLETED  │  Shows in Gallery
└──────┬──────┘
       │
       │ (Optional)
       ▼
┌─────────────┐
│  CANCELLED  │  Hidden from both
└─────────────┘
```

## 🔐 API Request Flow

```
Frontend                API Client              Backend
   │                        │                      │
   │  api.getEvents()       │                      │
   │───────────────────────▶│                      │
   │                        │  GET /events         │
   │                        │─────────────────────▶│
   │                        │                      │
   │                        │  { success, data }   │
   │                        │◀─────────────────────│
   │                        │                      │
   │                        │  Unwrap response     │
   │                        │  ─────────────       │
   │                        │                      │
   │  [Event, Event, ...]   │                      │
   │◀───────────────────────│                      │
   │                        │                      │
```

## 📁 File Structure

```
Team1-Africa-Website/
│
├── src/
│   ├── lib/
│   │   └── api.ts                    ← API Client (NEW)
│   │
│   ├── pages/
│   │   ├── Gallery.tsx               ← Old (to be replaced)
│   │   └── GalleryNew.tsx            ← New API-driven (NEW)
│   │
│   ├── examples/
│   │   └── EventCalendarApiExample.tsx  ← Example (NEW)
│   │
│   └── data/
│       └── events.ts                 ← Old hardcoded data
│
├── scripts/
│   └── migrate-gallery.js            ← Migration script (NEW)
│
├── .env.example                      ← Env template (NEW)
├── QUICK_START.md                    ← Quick guide (NEW)
├── API_INTEGRATION_SUMMARY.md        ← Full summary (NEW)
└── API_REFACTORING.md                ← Detailed docs (NEW)
```

## 🎨 Component Hierarchy

```
GalleryNew
│
├── Loading State
│   └── Spinner + "Loading gallery..."
│
├── Error State
│   └── Error message + Retry button
│
├── Mobile View
│   ├── MobileGalleryHero
│   │   └── 4 random images + "GALLERY" text
│   ├── EventAlbumsSection
│   │   └── First 4 completed events
│   └── PolaroidGallerySection
│       └── All completed events (expandable)
│
└── Desktop View
    ├── DesktopGallery (Infinite Canvas)
    │   └── All images with random positioning
    ├── EventAlbumsSection
    │   └── First 4 completed events
    └── PolaroidGallerySection
        └── All completed events (expandable)
```

## 🔄 Migration Process

```
┌─────────────────────┐
│  Hardcoded Images   │
│  (src/assets/)      │
│                     │
│  - south1.webp      │
│  - event1-img.webp  │
│  - ghana1.JPG       │
│  - ... (24 total)   │
└──────────┬──────────┘
           │
           │ npm run migrate:gallery
           ▼
┌─────────────────────┐
│  Migration Script   │
│                     │
│  1. Create event    │
│  2. Upload images   │
│  3. Link to event   │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Backend Database   │
│                     │
│  Event:             │
│  "Legacy Gallery    │
│   2024"             │
│                     │
│  Images:            │
│  - 24 photos linked │
│    to this event    │
└──────────┬──────────┘
           │
           │ Website fetches
           ▼
┌─────────────────────┐
│  Gallery Page       │
│  (displays photos)  │
└─────────────────────┘
```

---

This architecture enables:
- ✅ Dynamic content updates
- ✅ Better organization
- ✅ Scalability
- ✅ Type safety
- ✅ Error handling
