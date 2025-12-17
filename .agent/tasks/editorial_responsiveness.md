# Implementation Plan: Editorial Rebrand & Responsiveness

## 1. Rename "Blog" to "Editorial"
- [ ] Update `src/components/navbar.tsx`: Rename menu item from "Blog" to "Editorial".
- [ ] Update `src/App.tsx`: Rename route or just the internal labeling if needed (keep URL `/blog` for SEO preservation unless requested otherwise, but maybe update text in page titles).
- [ ] Update `src/pages/BlogIndex.tsx`: Ensure page title says "Editorial" (already done in previous steps, but verify).

## 2. Footer Styling
- [ ] Modify `src/components/footer.tsx`:
    - [ ] Add container/margins for `md` screens and up (boxed layout).
    - [ ] Keep full width for mobile (`sm`).

## 3. Blog (Editorial) Responsiveness
- [ ] Audit `src/pages/BlogIndex.tsx`:
    - [ ] Verify font sizes for headings on `md` and `lg`.
    - [ ] Check grid layouts (trending section especially) for `md` and `lg` breaks.
    - [ ] ensures padding is consistent.

## 4. Gallery Responsiveness
- [ ] Audit `src/pages/Gallery.tsx`:
    - [ ] Fix layout for `md` (tablet) and `lg` (small laptop) screens.
    - [ ] Ensure canvas/grid interactions work smoothly on these intermediate sizes.

## 5. Image Optimization
- [ ] Locate and run the image optimization script (likely a python or node script in the project).
- [ ] Convert new assets to WebP.
