# 🏗️ Team1 Africa - System Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                     TEAM1 AFRICA ECOSYSTEM                       │
└─────────────────────────────────────────────────────────────────┘

┌──────────────────────┐         ┌──────────────────────┐
│   ADMIN PANEL        │         │   PUBLIC WEBSITE     │
│   (Next.js)          │         │   (React + Vite)     │
│   localhost:3001     │         │   localhost:5173     │
└──────────┬───────────┘         └──────────┬───────────┘
           │                                │
           │ Manage Content                 │ Fetch Content
           │ (Create/Update/Delete)         │ (Read Only)
           │                                │
           └────────────┬───────────────────┘
                        │
                        ▼
           ┌────────────────────────┐
           │   BACKEND API          │
           │   (NestJS)             │
           │   localhost:3000       │
           │   /api/v1              │
           └────────────┬───────────┘
                        │
                        ▼
           ┌────────────────────────┐
           │   DATABASE             │
           │   (SQLite)             │
           │   local.db             │
           └────────────────────────┘
```

---

## Data Flow Architecture

### 1. Gallery Page Flow

```
PUBLIC WEBSITE (Gallery Page)
       │
       │ 1. Fetch completed events
       ├──────────────────────────────────────────────┐
       │                                               │
       ▼                                               ▼
GET /api/v1/events?status=completed          GET /api/v1/gallery?eventId={id}
       │                                               │
       ▼                                               ▼
┌──────────────────┐                          ┌──────────────────┐
│ Event 1          │                          │ Image 1          │
│ Event 2          │                          │ Image 2          │
│ Event 3          │                          │ Image 3          │
└──────────────────┘                          └──────────────────┘
       │                                               │
       └───────────────────┬───────────────────────────┘
                           │
                           ▼
                   ┌───────────────────┐
                   │ DISPLAY:          │
                   │ - Infinite Canvas │
                   │ - Event Albums    │
                   │ - Polaroid Gallery│
                   └───────────────────┘
```

### 2. Events Component Flow (Homepage)

```
PUBLIC WEBSITE (Homepage - Events Section)
       │
       │ Fetch upcoming events
       ▼
GET /api/v1/events?status=upcoming
       │
       ▼
┌──────────────────┐
│ Event 1          │ ──► coverImage: "url1"
│ Event 2          │ ──► coverImage: "url2"
│ Event 3          │ ──► coverImage: "url3"
└──────────────────┘
       │
       ▼
┌───────────────────┐
│ DISPLAY:          │
│ - Infinite Arch   │
│ - Auto-scroll     │
│ - Responsive      │
└───────────────────┘
```

### 3. Blog Component Flow (Homepage)

```
PUBLIC WEBSITE (Homepage - Blog Section)
       │
       │ Fetch published blogs
       ▼
GET /api/v1/blogs
       │
       ▼
┌──────────────────┐
│ Blog 1           │ ──► isPublished: true
│ Blog 2           │ ──► isPublished: true
│ Blog 3           │ ──► isPublished: true
└──────────────────┘
       │
       ▼
┌───────────────────┐
│ DISPLAY:          │
│ - 3-column grid   │
│ - First 3 blogs   │
│ - Mobile stack    │
└───────────────────┘
```

---

## Admin Panel Workflow

### Creating an Event for Gallery

```
ADMIN PANEL
    │
    ├─► 1. Create Event
    │      - Title: "Avalanche Summit"
    │      - Description: "..."
    │      - Status: "upcoming"
    │      - Save
    │
    ├─► 2. Upload Gallery Images
    │      - Open event
    │      - Upload 10 images
    │      - Each image linked to event.id
    │      - Save
    │
    ├─► 3. Mark as Completed
    │      - Change status to "completed"
    │      - Save
    │
    ▼
DATABASE
    │
    ├─► events table
    │   └─► { id: "1", title: "Avalanche Summit", status: "completed" }
    │
    └─► gallery_images table
        ├─► { id: "1", imageUrl: "...", relatedEventId: "1" }
        ├─► { id: "2", imageUrl: "...", relatedEventId: "1" }
        └─► { id: "3", imageUrl: "...", relatedEventId: "1" }
    │
    ▼
PUBLIC WEBSITE
    │
    └─► Gallery Page automatically shows:
        - Event in Event Albums section
        - All 10 images in Infinite Canvas
        - Event in Polaroid Gallery
```

### Creating an Event for Homepage

```
ADMIN PANEL
    │
    ├─► 1. Create Event
    │      - Title: "Web3 Workshop"
    │      - Description: "..."
    │      - Status: "upcoming"
    │      - Upload Cover Image
    │      - Save
    │
    ▼
DATABASE
    │
    └─► events table
        └─► { id: "2", title: "Web3 Workshop", status: "upcoming", coverImage: "..." }
    │
    ▼
PUBLIC WEBSITE
    │
    └─► Homepage Events Section automatically shows:
        - Event in carousel
        - Cover image displayed
        - Smooth scrolling animation
```

---

## API Response Structure

### Events Endpoint

```json
GET /api/v1/events?status=completed

Response:
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "uuid-1",
        "title": "Avalanche Africa Summit",
        "description": "The biggest blockchain event...",
        "startDate": "2024-03-15T00:00:00Z",
        "endDate": "2024-03-16T00:00:00Z",
        "location": "Lagos, Nigeria",
        "coverImage": "http://localhost:3000/uploads/poster.jpg",
        "status": "completed",
        "capacity": 300
      }
    ],
    "meta": {
      "total": 1,
      "page": 1,
      "limit": 100
    }
  }
}
```

### Gallery Endpoint

```json
GET /api/v1/gallery?eventId=uuid-1

Response:
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "img-1",
        "imageUrl": "http://localhost:3000/uploads/photo1.jpg",
        "relatedEventId": "uuid-1",
        "description": "Opening ceremony"
      },
      {
        "id": "img-2",
        "imageUrl": "http://localhost:3000/uploads/photo2.jpg",
        "relatedEventId": "uuid-1",
        "description": "Panel discussion"
      }
    ],
    "meta": {
      "total": 2
    }
  }
}
```

### Blogs Endpoint

```json
GET /api/v1/blogs

Response:
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "blog-1",
        "title": "Building Web3 in Africa",
        "content": "Full blog content...",
        "excerpt": "Short excerpt...",
        "coverImage": "http://localhost:3000/uploads/blog-cover.jpg",
        "author": {
          "name": "John Doe",
          "avatar": "http://localhost:3000/uploads/avatar.jpg"
        },
        "category": "Technology",
        "tags": ["web3", "africa", "blockchain"],
        "isPublished": true,
        "publishedAt": "2024-01-15T00:00:00Z"
      }
    ],
    "meta": {
      "total": 1
    }
  }
}
```

---

## Component Architecture

### Gallery Page Component Tree

```
GalleryNew
├── Loading State (if loading)
├── Error State (if error)
├── Mobile View (if mobile)
│   ├── MobileGalleryHero
│   │   └── 4 Random Images
│   ├── EventAlbumsSection
│   │   └── Featured Events (first 4)
│   └── PolaroidGallerySection
│       └── All Events (expandable)
└── Desktop View (if desktop)
    ├── DesktopGallery
    │   ├── Infinite Canvas
    │   └── All Images (random positions)
    ├── EventAlbumsSection
    │   └── Featured Events (first 4)
    └── PolaroidGallerySection
        └── All Events (expandable)
```

### Events Component Tree

```
EventsAPI
├── Loading State (if loading)
├── Error State (if error, falls back to hardcoded)
├── Header
│   ├── "Events" Badge
│   └── Title
├── Events Arch
│   ├── Infinite Scroll Animation
│   └── Event Cards (coverImage)
└── Footer
    ├── Description
    └── "See All Events" Button
```

### Blog Component Tree

```
BlogAPI
├── Loading State (if loading)
├── Error State (if error, falls back to hardcoded)
├── Header
│   ├── "Editorial" Badge
│   ├── Title
│   └── "Check out Editorial" Button
├── Mobile View
│   ├── Blog Cards (stacked)
│   └── "View more" Button
└── Desktop View
    └── Blog Grid (3 columns)
```

---

## File Dependencies

### Gallery Page Dependencies

```
pages/GalleryNew.tsx
├── lib/api.ts (API client)
│   ├── api.getCompletedEvents()
│   └── api.getEventGallery(eventId)
├── framer-motion (animations)
├── react-router-dom (navigation)
└── Types:
    ├── Event (from api.ts)
    └── GalleryImage (from api.ts)
```

### Events Component Dependencies

```
components/events-api.tsx
├── lib/api.ts (API client)
│   └── api.getUpcomingEvents()
├── components/AnimatedText
├── components/MagneticButton
├── components/ui/AppImage
├── react-router-dom (navigation)
└── Fallback Images:
    ├── assets/event1-img.webp
    ├── assets/event2-img.webp
    └── ... (8 total)
```

### Blog Component Dependencies

```
components/blog-api.tsx
├── lib/api.ts (API client)
│   └── api.getAllBlogs()
├── components/AnimatedText
├── components/AnimatedSection
├── data/articles (fallback)
├── framer-motion (animations)
└── react-router-dom (navigation)
```

---

## Error Handling Strategy

```
API Request
    │
    ├─► Success?
    │   ├─► YES ──► Display API Data
    │   └─► NO
    │       │
    │       ├─► Log Error to Console
    │       ├─► Set Error State
    │       └─► Fallback Strategy:
    │           │
    │           ├─► Gallery: Show error message with retry
    │           ├─► Events: Use hardcoded images
    │           └─► Blog: Use hardcoded articles
    │
    └─► User Experience:
        │
        ├─► Loading State: Spinner + "Loading..."
        ├─► Error State: Error message + Retry button
        └─► Fallback State: Hardcoded content (seamless)
```

---

## Deployment Architecture

### Development

```
┌─────────────────────┐
│ localhost:3001      │ Admin Panel
└─────────────────────┘
           │
           ▼
┌─────────────────────┐
│ localhost:3000      │ Backend API
└─────────────────────┘
           │
           ▼
┌─────────────────────┐
│ localhost:5173      │ Public Website
└─────────────────────┘
```

### Production (Future)

```
┌─────────────────────┐
│ admin.team1.africa  │ Admin Panel (Vercel/Netlify)
└─────────────────────┘
           │
           ▼
┌─────────────────────┐
│ api.team1.africa    │ Backend API (Railway/Render)
└─────────────────────┘
           │
           ▼
┌─────────────────────┐
│ team1.africa        │ Public Website (Vercel/Netlify)
└─────────────────────┘
```

---

## Security Considerations

### Admin Panel
- ✅ JWT Authentication
- ✅ Protected routes
- ✅ Role-based access control

### Backend API
- ✅ CORS configured for specific origins
- ✅ Input validation (DTOs)
- ✅ SQL injection protection (TypeORM)
- ✅ File upload validation

### Public Website
- ✅ Read-only API access
- ✅ No authentication required
- ✅ Public endpoints only
- ✅ Error handling (no sensitive data leaked)

---

## Performance Optimizations

### Frontend
- ✅ React hooks optimization (useMemo, useCallback)
- ✅ Lazy loading (React.lazy for routes)
- ✅ Image optimization (WebP format)
- ✅ Efficient re-renders (proper dependencies)

### Backend
- ✅ Database indexing (on frequently queried fields)
- ✅ Pagination (limit/offset)
- ✅ Caching (future: Redis)
- ✅ Efficient queries (TypeORM optimization)

### API
- ✅ Response compression (gzip)
- ✅ Proper HTTP caching headers
- ✅ Minimal payload size
- ✅ Batch requests where possible

---

## Monitoring & Debugging

### Development Tools

```
Browser DevTools
├── Console: API errors, component logs
├── Network: API requests/responses
├── React DevTools: Component state
└── Performance: Rendering metrics

Backend Logs
├── NestJS Logger: Request/response logs
├── TypeORM Logs: Database queries
└── Error Stack Traces: Debugging info
```

### Testing Commands

```bash
# Test API connection
npm run test:api

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Summary

This architecture provides:
- ✅ **Separation of Concerns**: Admin, API, Website
- ✅ **Scalability**: Easy to add new features
- ✅ **Maintainability**: Clear structure, well-documented
- ✅ **Reliability**: Graceful fallbacks, error handling
- ✅ **Performance**: Optimized rendering, efficient queries
- ✅ **Security**: Authentication, validation, CORS

---

**The system is designed to be robust, scalable, and easy to maintain. All components work together seamlessly to provide a dynamic content management system for Team1 Africa. 🚀**
