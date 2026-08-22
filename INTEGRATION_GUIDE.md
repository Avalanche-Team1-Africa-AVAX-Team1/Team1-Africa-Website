# 🚀 Team1 Africa Website - API Integration Guide

## Overview

This guide walks you through the complete integration of your Team1 Africa website with the Admin Backend API. After following these steps, your website will dynamically fetch all content from the database instead of using hardcoded data.

## 📋 Prerequisites

✅ **Backend Running**: Admin Backend API must be running on `http://localhost:3000`
✅ **Database Populated**: At least one event with status "completed" and some gallery images
✅ **CORS Configured**: Backend allows requests from `localhost:5173`

## 🎯 What Will Change

### Gallery Page
- **Before**: 24 hardcoded images in random positions
- **After**: Fetches completed events and their photos from API
- **Benefit**: Update gallery by marking events as "completed" in admin panel

### Events Section (Homepage)
- **Before**: 8 hardcoded event images
- **After**: Fetches upcoming events from API
- **Benefit**: Homepage automatically shows new upcoming events

### Blog Section
- **Before**: Hardcoded articles from `data/articles.ts`
- **After**: Fetches published blogs from API
- **Benefit**: Publish blogs in admin panel, they appear on website

## 🔧 Step-by-Step Integration

### Step 1: Verify Backend is Running

```bash
# In your Admin project directory
cd c:\Users\DEON\Projects\Admin\backend
npm run start:dev
```

Verify it's running at: http://localhost:3000/api/v1/events

### Step 2: Test API Connection

```bash
# In your website directory
cd c:\Users\DEON\Projects\Team1-Africa-Website
npm run test:api
```

This will verify:
- ✅ Backend is reachable
- ✅ Events endpoint works
- ✅ Gallery endpoint works
- ✅ Blogs endpoint works

### Step 3: Create Test Data in Admin Panel

1. **Open Admin Panel**: http://localhost:3001
2. **Login**: admin@team1.africa / password123
3. **Create a Test Event**:
   - Title: "Test Event - Avalanche Summit"
   - Description: "Testing the integration"
   - Start Date: Any future date
   - Status: **"upcoming"** (for Events section)
   - Save the event

4. **Upload Event Gallery Images**:
   - Open the event you just created
   - Scroll to "Event Gallery" section
   - Upload 3-5 images
   - Save

5. **Mark Event as Completed**:
   - Change status to **"completed"**
   - Save
   - This event will now appear in the Gallery page

6. **Create a Test Blog** (optional):
   - Go to Blogs section
   - Create a new blog post
   - Set `isPublished: true`
   - Save

### Step 4: Run the Website

```bash
npm run dev
```

Visit: http://localhost:5173

### Step 5: Verify Integration

#### Gallery Page (`/gallery`)
- ✅ Completed events load
- ✅ Event photos display in infinite canvas
- ✅ Event Albums section shows completed events
- ✅ Polaroid Gallery section shows event photos
- ✅ Loading states work
- ✅ No console errors

#### Homepage Events Section
- ✅ Upcoming events display in the carousel
- ✅ Event images load correctly
- ✅ Smooth scrolling animation works

#### Blog Section
- ✅ Published blogs display
- ✅ Blog cards show correct data
- ✅ Links to blog detail pages work

## 📊 API Endpoints Used

| Endpoint | Purpose | Used By |
|----------|---------|---------|
| `GET /api/v1/events?status=upcoming` | Fetch upcoming events | Homepage Events |
| `GET /api/v1/events?status=completed` | Fetch completed events | Gallery Page |
| `GET /api/v1/gallery?eventId={id}` | Fetch event photos | Gallery Page |
| `GET /api/v1/blogs` | Fetch published blogs | Blog Section |

## 🔄 Migration Script (Optional)

If you want to migrate your existing hardcoded gallery images to the database:

```bash
npm run migrate:gallery
```

This will:
1. Create a "Legacy Gallery 2024" event
2. Upload all 24 hardcoded images
3. Link them to the legacy event
4. Mark the event as "completed"

**Note**: Only run this once! It will create duplicate data if run multiple times.

## 🎨 How It Works

### Gallery Page Architecture

```typescript
// 1. Fetch completed events
const completedEvents = await api.getCompletedEvents();

// 2. For each event, fetch its gallery images
const eventAlbums = await Promise.all(
  completedEvents.map(async (event) => {
    const images = await api.getEventGallery(event.id);
    return { event, images };
  })
);

// 3. Display in three sections:
// - Infinite Canvas (all images randomly positioned)
// - Event Albums (first 4 events with their photos)
// - Polaroid Gallery (all events with expandable photo strips)
```

### Events Section Architecture

```typescript
// 1. Fetch upcoming events
const upcomingEvents = await api.getUpcomingEvents();

// 2. Use event coverImage for carousel
// 3. Display in infinite scrolling arch
```

### Blog Section Architecture

```typescript
// 1. Fetch all blogs
const blogs = await api.getAllBlogs();

// 2. Filter published blogs
const publishedBlogs = blogs.filter(b => b.isPublished);

// 3. Display in grid (first 3 on homepage)
```

## 🐛 Troubleshooting

### "Failed to fetch" Error

**Problem**: Cannot connect to backend
**Solutions**:
1. Verify backend is running: `http://localhost:3000/api/v1/events`
2. Check `.env` file has correct `VITE_API_BASE_URL`
3. Restart dev server after changing `.env`
4. Check CORS is enabled in backend

### Images Not Loading

**Problem**: Gallery images return 404
**Solutions**:
1. Verify `imageUrl` in database contains full URL
2. Check backend serves static files correctly
3. Ensure uploads directory exists and is accessible
4. Check browser console for exact error

### No Events/Blogs Showing

**Problem**: API returns empty array
**Solutions**:
1. Create test data in admin panel
2. Verify event status is "upcoming" or "completed"
3. Verify blog `isPublished` is true
4. Check API response in browser Network tab

### Gallery Shows "No completed events"

**Problem**: No events with status="completed"
**Solutions**:
1. Create an event in admin panel
2. Upload some images to the event
3. Change event status to "completed"
4. Refresh website

## 📝 Code Examples

### Fetching Events in a Component

```typescript
import { useState, useEffect } from 'react';
import { api, Event } from '../lib/api';

function MyComponent() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEvents() {
      try {
        setLoading(true);
        const data = await api.getUpcomingEvents();
        setEvents(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch');
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {events.map(event => (
        <div key={event.id}>{event.title}</div>
      ))}
    </div>
  );
}
```

### Fetching Gallery for an Event

```typescript
const eventId = "some-event-id";
const images = await api.getEventGallery(eventId);

images.forEach(img => {
  console.log(img.imageUrl); // Full URL to image
});
```

## ✅ Success Criteria

Your integration is complete when:

- [ ] Backend API is running
- [ ] Website connects to API successfully
- [ ] Gallery page displays completed events
- [ ] Homepage events section shows upcoming events
- [ ] Blog section shows published blogs
- [ ] Images load correctly
- [ ] No hardcoded data is being used
- [ ] Loading states work
- [ ] Error states work
- [ ] No console errors

## 🎉 Next Steps

After successful integration:

1. **Deploy Backend**: Deploy your Admin Backend to production
2. **Update API URL**: Change `VITE_API_BASE_URL` to production URL
3. **Build Website**: `npm run build`
4. **Deploy Website**: Deploy the built files
5. **Test Production**: Verify everything works in production

## 📞 Need Help?

If you encounter issues:
1. Check browser console for errors
2. Check Network tab for failed requests
3. Verify backend logs for errors
4. Run `npm run test:api` to diagnose connection issues

---

**Happy Building! 🚀**
