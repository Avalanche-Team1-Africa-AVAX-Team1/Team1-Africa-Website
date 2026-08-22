// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './custom-prose.css'
import App from './App.tsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import BlogIndex from './pages/BlogIndex'
import BlogArticle from './pages/BlogArticle'
import NotFound from './pages/NotFound'
import EventCalendar from './components/EventCalendar'
import About from './pages/About'
import Spotlight from './pages/Spotlight'
import Gallery from './pages/Gallery' // Hardcoded version (reverted from API)
import GalleryAlbum from './pages/GalleryAlbum'
import CommunityWrapped from './pages/CommunityWrapped'
import Projects from './pages/Projects'
import ProjectDetails from './pages/ProjectDetails'
import SmoothScrollProvider from './components/SmoothScrollProvider'
import ScrollToTop from './components/ScrollToTop'
import PageTransition from './components/PageTransition'

import Layout from './components/Layout'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <ScrollToTop />
    <Routes>
      {/* Community Wrapped - standalone cinematic experience with its own scroll */}
      <Route path="/wrapped" element={<CommunityWrapped />} />

      {/* Main site with shared layout */}
      <Route element={<SmoothScrollProvider><Layout /></SmoothScrollProvider>}>
        <Route path="/" element={<PageTransition><App /></PageTransition>} />
        <Route path="/about" element={<PageTransition><About /></PageTransition>} />
        <Route path="/blog" element={<PageTransition><BlogIndex /></PageTransition>} />
        <Route path="/blog/:slug" element={<PageTransition><BlogArticle /></PageTransition>} />
        <Route path="/spotlight" element={<PageTransition><Spotlight /></PageTransition>} />
        <Route path="/projects" element={<PageTransition><Projects /></PageTransition>} />
        <Route path="/projects/:id" element={<PageTransition><ProjectDetails /></PageTransition>} />
        <Route path="/gallery" element={<PageTransition><Gallery /></PageTransition>} />
        <Route path="/gallery/:albumId" element={<PageTransition><GalleryAlbum /></PageTransition>} />
        <Route path="/events" element={<PageTransition><EventCalendar /></PageTransition>} />
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Route>
    </Routes>
  </BrowserRouter>
)
