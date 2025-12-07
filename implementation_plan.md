# Image Loading Optimization Implementation Plan

## Phase 1: Analysis & Planning
- [x] Task 1.1: Audit current image implementation
  - **Findings**:
    - Images are stored in `src/assets` (some >20MB).
    - Current tech stack: React, Vite, TypeScript, Tailwind CSS.
    - Components import full-res images directly (e.g., `src/components/events.tsx`).
    - Basic `loading="lazy"` is used, but no `srcset` or modern formats (WebP/AVIF).
- [ ] Task 1.2: Measure baseline performance (1 hour)
  - Run Lighthouse on Home and Events pages.
  - Record LCP (Largest Contentful Paint) and cumulative layout shift (CLS).
- [ ] Task 1.3: Technical decisions (1 hour)
  - **Decision**: Use `sharp` for a one-time/batch optimization script.
  - **Decision**: Use `vite-plugin-image-optimizer` for build-time optimization of static assets.
  - **Decision**: Create a generic `<AppImage />` component to encapsulate lazy loading and responsive logic.

## Phase 2: Foundation Setup & Tooling
- [ ] Task 2.1: Install optimization tools (1 hour)
  - `npm install sharp` (for the script).
  - `npm install -D vite-plugin-image-optimizer` (integration).
- [ ] Task 2.2: Create Image Optimization Script (3 hours)
  - Create `scripts/optimize-images.js`.
  - Script should:
    - Scan `src/assets`.
    - Generate WebP/AVIF variants.
    - Generate resized versions (breakpoints: 640, 768, 1024, 1280, 1536).
    - Preserve original structure but output to `src/assets/optimized` (or replacing if approved).
- [ ] Task 2.3: Create Base Image Component (2 hours)
  - Create `src/components/ui/AppImage.tsx`.
  - Props: `src`, `alt`, `sizes`, `className`, `priority`.
  - Features: Wrapper div for aspect ratio, blur-up placeholder support.

## Phase 3: Lazy Loading & Performance
- [ ] Task 3.1: Enhance Lazy Loading (2 hours)
  - Integrate `react-intersection-observer` (already in package.json) into `AppImage`.
  - Add fade-in animation on load.
- [ ] Task 3.2: Implement Layout Shift Protection (1 hour)
  - Enforce aspect-ratio on image containers.
  - Add skeleton/blur placeholder logic.

## Phase 4: Responsive Images & Format Migration
- [ ] Task 4.1:  Batch Process Existing Images (2 hours)
  - Run the optimization script on `src/assets`.
  - Verify quality and file size reduction.
- [ ] Task 4.2: Update Components to use `AppImage` (4 hours)
  - Refactor `src/components/events.tsx`.
  - Refactor `src/components/games.tsx`.
  - Refactor `src/components/blog.tsx`.
  - Refactor key pages (Home, About).
- [ ] Task 4.3: Implement `srcset` and `source` tags (2 hours)
  - Update `AppImage` to generate `srcset` strings automatically from the generated variants.

## Phase 5: Specific Section Optimizations
- [ ] Task 5.1: Hero Section (2 hours)
  - Ensure Hero images are NOT lazy-loaded (use `fetchpriority="high"`).
  - Use specific mobile/desktop variants to save bandwidth.
- [ ] Task 5.2: Events/Gallery optimization (2 hours)
  - Implement "View More" or pagination if not already present (current implementation is an infinite scroll arch - check performance impact).
  - Ensure off-screen arch images allow memory cleanup if possible.

## Phase 6: QA & Testing
- [ ] Task 6.1: Cross-browser testing (Chrome, Firefox, Safari).
- [ ] Task 6.2: Post-optimization benchmarks (Compare against Task 1.2).

## Estimated Total Time: ~20-25 hours
## Dependencies
- Approval to modify/resize source images (or create a parallel `optimized` directory).

## Questions for User
1. May I run a script to **permanently resize/compress** the large >20MB images in `src/assets`, or should I keep the originals and generate a generic `dist/assets` or `src/assets/optimized` folder? (Recommendation: Keep originals in a separate `raw_assets` folder outside `src` if possible, and put optimized ones in `src/assets`).
2. Do you have a preferred limit for image quality (e.g., 80%)?
