# 🚀 Quick Start Guide - API Integration

## Prerequisites
- ✅ Backend API running at `http://localhost:3000`
- ✅ Node.js and npm installed
- ✅ Dependencies installed (`npm install`)

## 5-Minute Setup

### 1️⃣ Configure Environment (30 seconds)
```bash
# Copy example env file
cp .env.example .env

# Edit .env if your API is at a different URL
# Default is http://localhost:3000/api/v1
```

### 2️⃣ Migrate Hardcoded Images (2 minutes)
```bash
# This uploads your 24 hardcoded gallery images to the backend
npm run migrate:gallery
```

**Expected output:**
```
🚀 Starting Gallery Migration...
📅 Creating "Legacy Gallery 2024" event...
✅ Legacy event created with ID: evt_123...
📤 Uploading: south1.webp...
   ✅ Uploaded: http://localhost:3000/uploads/...
...
✨ Migration completed!
```

### 3️⃣ Switch to New Gallery (1 minute)
```bash
# Backup old gallery
mv src/pages/Gallery.tsx src/pages/GalleryOld.tsx

# Activate new gallery
mv src/pages/GalleryNew.tsx src/pages/Gallery.tsx
```

### 4️⃣ Test (1 minute)
```bash
# Start dev server (if not already running)
npm run dev

# Visit http://localhost:5173/gallery
# You should see your migrated images!
```

## ✅ Verification Checklist

After setup, verify:
- [ ] Gallery page loads
- [ ] You see "Legacy Gallery 2024" event
- [ ] Images display correctly
- [ ] No console errors

## 🎯 What You Can Do Now

### Add New Events with Photos
1. Create event in Admin Panel
2. Set status to "Completed"
3. Upload photos to that event
4. Photos automatically appear in website Gallery!

### Use the API Client
```typescript
import { api } from './lib/api';

// Get upcoming events
const events = await api.getUpcomingEvents();

// Get completed events (for gallery)
const completed = await api.getCompletedEvents();

// Get gallery images for an event
const images = await api.getEventGallery(eventId);
```

## 🐛 Troubleshooting

### Migration fails?
```bash
# Check backend is running
curl http://localhost:3000/api/v1/events

# If it fails, start your backend first!
```

### Gallery shows error?
1. Open browser console (F12)
2. Check for network errors
3. Verify backend URL in `.env`
4. Ensure CORS is enabled on backend

### Images not loading?
- Check that backend returns absolute URLs
- Verify image files were uploaded successfully
- Check backend logs for errors

## 📚 More Information

- **Full Documentation**: `API_REFACTORING.md`
- **Complete Summary**: `API_INTEGRATION_SUMMARY.md`
- **Example Code**: `src/examples/EventCalendarApiExample.tsx`

## 🎉 You're Done!

Your website now fetches data from your backend API. Add events and photos through your Admin Panel and they'll automatically appear on the website!

---

**Questions?** Check the documentation files or review the API client code in `src/lib/api.ts`.
