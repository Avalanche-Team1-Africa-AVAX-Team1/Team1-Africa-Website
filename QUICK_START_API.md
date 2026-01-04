# 🎯 API Integration - Quick Start Guide

## What's Been Done

I've successfully created API-integrated versions of your website components. Here's what's ready:

### ✅ Completed Integrations

1. **Gallery Page** (`/gallery`) - ✅ **ALREADY ACTIVE**
   - Fetches completed events from API
   - Displays event photos in infinite canvas
   - Shows event albums and polaroid gallery
   - **Status**: Already integrated and working!

2. **Events Component** (Homepage section) - ⏳ **READY TO ACTIVATE**
   - New file: `src/components/events-api.tsx`
   - Fetches upcoming events from API
   - Falls back to hardcoded images if API fails
   - **Status**: Created, needs activation

3. **Blog Component** (Homepage section) - ⏳ **READY TO ACTIVATE**
   - New file: `src/components/blog-api.tsx`
   - Fetches published blogs from API
   - Falls back to hardcoded articles if API fails
   - **Status**: Created, needs activation

## 🚀 How to Activate API Integration

### Prerequisites

1. **Backend Running**:
   ```bash
   cd c:\Users\DEON\Projects\Admin\backend
   npm run start:dev
   ```
   Verify: http://localhost:3000/api/v1/events

2. **Environment Variables**:
   - `.env` file already created with `VITE_API_BASE_URL=http://localhost:3000/api/v1`

### Step 1: Test API Connection

```bash
cd c:\Users\DEON\Projects\Team1-Africa-Website
npm run test:api
```

This will verify all endpoints are working.

### Step 2: Activate Events Component (Optional)

**Option A: Replace in App.tsx** (Recommended for testing)

Open `src/App.tsx` and:

```typescript
// Find this line (around line 10):
// import Events from './components/events'

// Replace with:
import Events from './components/events-api'

// Then uncomment the Events component (around line 50):
<Events />
```

**Option B: Side-by-side comparison**

Keep both and test:
```typescript
import Events from './components/events'
import EventsAPI from './components/events-api'

// In the JSX:
<Events />        {/* Old hardcoded version */}
<EventsAPI />     {/* New API version */}
```

### Step 3: Activate Blog Component (Optional)

Open `src/App.tsx` and:

```typescript
// Find this line (around line 13):
import Blog from './components/blog'

// Replace with:
import Blog from './components/blog-api'
```

### Step 4: Test Everything

```bash
npm run dev
```

Visit:
- **Homepage**: http://localhost:5173 (check Events and Blog sections)
- **Gallery**: http://localhost:5173/gallery (already using API!)

## 📊 What Each Component Does

### Gallery Page (Already Active)

**Data Flow**:
```
1. Fetches: GET /api/v1/events?status=completed
2. For each event: GET /api/v1/gallery?eventId={id}
3. Displays:
   - Infinite canvas with all photos
   - Event Albums section (first 4 events)
   - Polaroid Gallery (all events, expandable)
```

**Admin Panel Workflow**:
1. Create event in admin
2. Upload photos to event
3. Mark event as "completed"
4. Photos appear on website gallery!

### Events Component (Ready to Activate)

**Data Flow**:
```
1. Fetches: GET /api/v1/events?status=upcoming
2. Uses event.coverImage for carousel
3. Falls back to hardcoded images if API fails
```

**Admin Panel Workflow**:
1. Create event in admin
2. Set status to "upcoming"
3. Upload a cover image
4. Event appears on homepage!

### Blog Component (Ready to Activate)

**Data Flow**:
```
1. Fetches: GET /api/v1/blogs
2. Displays first 3 on homepage
3. Falls back to hardcoded articles if API fails
```

**Admin Panel Workflow**:
1. Create blog post in admin
2. Set isPublished to true
3. Blog appears on homepage!

## 🧪 Testing Checklist

### Gallery Page (Already Working)
- [ ] Visit `/gallery`
- [ ] Verify completed events load
- [ ] Check images display correctly
- [ ] Test infinite canvas (desktop)
- [ ] Test mobile hero (mobile)
- [ ] Verify Event Albums section
- [ ] Verify Polaroid Gallery section

### Events Component (After Activation)
- [ ] Homepage shows upcoming events
- [ ] Event images load in carousel
- [ ] Smooth scrolling animation works
- [ ] Falls back gracefully if API fails

### Blog Component (After Activation)
- [ ] Homepage shows published blogs
- [ ] Blog cards display correctly
- [ ] Links to blog pages work
- [ ] Falls back gracefully if API fails

## 🎨 Creating Test Data

### Create a Test Event

1. Open Admin Panel: http://localhost:3001
2. Login: `admin@team1.africa` / `password123`
3. Go to Events → Create New Event
4. Fill in:
   - **Title**: "Avalanche Africa Summit 2024"
   - **Description**: "The biggest blockchain event in Africa"
   - **Start Date**: Any future date
   - **Status**: "upcoming" (for homepage) or "completed" (for gallery)
   - **Cover Image**: Upload a poster/flyer
5. Save the event
6. Upload gallery images (if status = completed)

### Create a Test Blog

1. Go to Blogs → Create New Blog
2. Fill in:
   - **Title**: "Building the Future of Web3 in Africa"
   - **Content**: Your blog content
   - **Author**: Your name
   - **isPublished**: true
3. Save

## 🔄 Migration Script (Optional)

If you want to migrate existing hardcoded gallery images:

```bash
npm run migrate:gallery
```

**⚠️ Warning**: Only run this ONCE! It will create a "Legacy Gallery 2024" event with all hardcoded images.

## 🐛 Troubleshooting

### "Failed to fetch" Error

**Problem**: Cannot connect to backend

**Solutions**:
1. Verify backend is running: http://localhost:3000/api/v1/events
2. Check `.env` file has correct URL
3. Restart dev server: `npm run dev`
4. Check CORS is enabled in backend

### Images Not Loading

**Problem**: Gallery images return 404

**Solutions**:
1. Verify `imageUrl` in database contains full URL (e.g., `http://localhost:3000/uploads/image.jpg`)
2. Check backend serves static files correctly
3. Ensure uploads directory exists

### No Events/Blogs Showing

**Problem**: API returns empty array

**Solutions**:
1. Create test data in admin panel
2. Verify event status is correct ("upcoming" or "completed")
3. Verify blog `isPublished` is true
4. Check API response in browser Network tab

### Components Fall Back to Hardcoded Data

**Problem**: API fails silently

**Solutions**:
1. This is expected behavior! Components are designed to fall back gracefully
2. Check browser console for error messages
3. Run `npm run test:api` to diagnose
4. Verify backend is running

## 📝 File Structure

```
src/
├── components/
│   ├── events.tsx          # Original hardcoded version
│   ├── events-api.tsx      # ✨ NEW: API-integrated version
│   ├── blog.tsx            # Original hardcoded version
│   └── blog-api.tsx        # ✨ NEW: API-integrated version
├── pages/
│   ├── Gallery.tsx         # Original hardcoded version
│   └── GalleryNew.tsx      # ✨ ACTIVE: API-integrated version
├── lib/
│   └── api.ts              # API client (already exists)
└── App.tsx                 # Main app (update imports here)
```

## 🎯 Next Steps

### Immediate (Testing)
1. ✅ Gallery is already working
2. Test Events component activation
3. Test Blog component activation
4. Create test data in admin panel
5. Verify everything works

### Production Deployment
1. Deploy backend to production
2. Update `VITE_API_BASE_URL` in `.env` to production URL
3. Build website: `npm run build`
4. Deploy website
5. Test in production

## 💡 Tips

1. **Gradual Migration**: You can activate components one at a time
2. **Fallback Safety**: All components fall back to hardcoded data if API fails
3. **Testing**: Use `npm run test:api` to verify connection before activating
4. **Debugging**: Check browser console and Network tab for errors

## 📞 Need Help?

Check these files for detailed documentation:
- `INTEGRATION_GUIDE.md` - Complete integration guide
- `API_INTEGRATION_SUMMARY.md` - API integration summary
- `API_REFACTORING.md` - Detailed refactoring guide

---

**You're all set! 🎉**

The Gallery is already using the API. When you're ready, activate Events and Blog components by updating the imports in `App.tsx`.
