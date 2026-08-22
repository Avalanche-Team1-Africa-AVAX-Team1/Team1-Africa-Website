# Gallery & Events API Integration - Refactoring Guide

## Overview

This refactoring changes the Team1 Africa website from using hardcoded mock data to fetching real data from the backend API at `http://localhost:3000/api/v1`.

## Critical Architecture Change: Gallery

**Old Way**: Gallery was a separate random list of hardcoded images.

**New Way**: Gallery is now a collection of **Completed Events**.

### The Flow:
1. An Event is created in the Admin Panel
2. When the Event is marked as **Completed**, photos are uploaded to that specific event
3. The website's "Gallery" page fetches **All Completed Events** and displays their attached photos

## Files Created/Modified

### 1. API Client (`src/lib/api.ts`) ✅
- **Purpose**: Centralized API client with fetch wrapper, error handling, and response unwrapping
- **Features**:
  - Base URL configuration via environment variable
  - Generic `apiFetch` function that unwraps API responses
  - Methods for Events, Gallery, Blogs, and Media Upload
  - TypeScript interfaces for all API responses

**Usage Example**:
```typescript
import { api } from '../lib/api';

// Get all upcoming events
const upcomingEvents = await api.getUpcomingEvents();

// Get completed events (for gallery)
const completedEvents = await api.getCompletedEvents();

// Get gallery images for a specific event
const eventImages = await api.getEventGallery(eventId);
```

### 2. New Gallery Page (`src/pages/GalleryNew.tsx`) ✅
- **Purpose**: Refactored Gallery page that fetches from API
- **Features**:
  - Fetches completed events on mount
  - Fetches gallery images for each completed event
  - Maintains the same visual design (infinite canvas, event albums, polaroid sections)
  - Loading and error states
  - Converts API data to the existing moment format for the canvas

**Key Changes**:
- Removed hardcoded `rawMoments` array
- Added `useEffect` to fetch data from API
- Gallery images are now grouped by event
- Each image links back to its parent event

### 3. Migration Script (`scripts/migrate-gallery.js`) ✅
- **Purpose**: One-time script to migrate hardcoded gallery images to the backend
- **Process**:
  1. Creates a "Legacy Gallery 2024" event (status: completed)
  2. Uploads all 24 hardcoded images from `src/assets/` to that event
  3. Sets the first uploaded image as the event's cover image
  4. Provides progress feedback and summary

**Usage**:
```bash
npm run migrate:gallery
```

**Prerequisites**:
- Backend API must be running at `http://localhost:3000`
- Image files must exist in `src/assets/`
- Dependencies: `form-data` and `node-fetch@2`

## Environment Configuration

Create a `.env` file in the project root:

```env
VITE_API_BASE_URL=http://localhost:3000/api/v1
```

If not set, defaults to `http://localhost:3000/api/v1`.

## Type Definitions

### Event (API Response)
```typescript
interface Event {
  id: string;
  title: string;
  description: string;
  startDate: string; // ISO 8601
  endDate: string;   // ISO 8601
  location?: string;
  coverImage?: string; // Poster URL
  status: 'draft' | 'upcoming' | 'completed' | 'cancelled';
  createdAt?: string;
  updatedAt?: string;
}
```

### GalleryImage (API Response)
```typescript
interface GalleryImage {
  id: string;
  imageUrl: string;
  relatedEventId: string; // Links to Event
  description?: string;
  createdAt?: string;
}
```

### Blog (API Response)
```typescript
interface Blog {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  coverImage?: string;
  author?: {
    name: string;
    avatar?: string;
  };
  category?: string;
  tags?: string[];
  publishedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}
```

## API Endpoints

### Events
- `GET /events` - Get all events (supports `?status=completed`)
- `GET /events/:id` - Get single event

### Gallery
- `GET /gallery` - Get all gallery images
- `GET /gallery?eventId={id}` - Get images for specific event

### Blogs
- `GET /blogs` - Get all blog posts
- `GET /blogs/:id` - Get single blog post

### Media Upload
- `POST /media/upload` - Upload image file
  - Body: `multipart/form-data`
  - Fields: `file`, `relatedEventId`, `description`

## Migration Steps

### Step 1: Install Dependencies
```bash
npm install --save-dev form-data node-fetch@2
```

### Step 2: Ensure Backend is Running
Make sure your backend API is running at `http://localhost:3000`.

### Step 3: Run Migration Script
```bash
npm run migrate:gallery
```

This will:
- Create "Legacy Gallery 2024" event
- Upload all 24 hardcoded images
- Link them to the legacy event
- Set cover image

### Step 4: Update Routes
Replace the old Gallery route with the new one:

**In `src/App.tsx` or your router file:**
```typescript
// Old
import Gallery from './pages/Gallery';

// New
import Gallery from './pages/GalleryNew';
```

Or rename the files:
```bash
mv src/pages/Gallery.tsx src/pages/GalleryOld.tsx
mv src/pages/GalleryNew.tsx src/pages/Gallery.tsx
```

### Step 5: Test
1. Navigate to `/gallery`
2. Verify completed events are displayed
3. Check that images load correctly
4. Test the infinite canvas, event albums, and polaroid sections

## Rollback Plan

If issues occur:

1. **Revert to old Gallery**:
   ```bash
   mv src/pages/GalleryOld.tsx src/pages/Gallery.tsx
   ```

2. **Keep both versions** (recommended during testing):
   - Old: `/gallery-old` route
   - New: `/gallery` route

## Future Enhancements

### Events Calendar Integration
The `EventCalendar` component currently uses `src/data/events.ts`. To refactor:

1. Update `EventCalendar.tsx` to use `api.getUpcomingEvents()`
2. Convert API date format to calendar format
3. Handle loading/error states

### Blog Integration
Similar pattern for blog pages:

```typescript
// In BlogIndex.tsx
const [blogs, setBlogs] = useState([]);

useEffect(() => {
  async function fetchBlogs() {
    const data = await api.getAllBlogs();
    setBlogs(data);
  }
  fetchBlogs();
}, []);
```

## Troubleshooting

### CORS Errors
Ensure your backend has CORS enabled for `http://localhost:5173` (or your Vite dev server port).

### Images Not Loading
- Check that `imageUrl` paths are absolute URLs
- Verify backend serves images correctly
- Check browser console for 404 errors

### Migration Script Fails
- Verify backend API is running
- Check that image files exist in `src/assets/`
- Ensure you have write permissions for the backend database

### TypeScript Errors
If you see "Cannot find module" errors:
```bash
npm install
npm run build
```

## Testing Checklist

- [ ] Backend API is running
- [ ] Migration script completes successfully
- [ ] Gallery page loads without errors
- [ ] Completed events are displayed
- [ ] Images load correctly
- [ ] Infinite canvas works
- [ ] Event albums section displays
- [ ] Polaroid gallery section works
- [ ] Mobile view works
- [ ] Loading states display
- [ ] Error states display
- [ ] Links to individual event albums work

## Notes

- The old Gallery page is preserved as `GalleryOld.tsx` for reference
- All hardcoded data remains in the codebase but is not used
- The migration script is idempotent (can be run multiple times)
- API client handles response unwrapping automatically
- Error handling includes network errors, API errors, and parsing errors

## Contact

For questions or issues with the refactoring, please contact the development team.
