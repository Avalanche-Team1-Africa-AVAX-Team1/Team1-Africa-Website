// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import BlogIndex from './pages/BlogIndex'
import ArticlePage from './pages/ArticlePage'
import NotFound from './pages/NotFound'
import EventCalendar from './components/EventCalendar'
import About from './pages/About'
import Spotlight from './pages/Spotlight'
import Gallery from './pages/Gallery'
import GalleryAlbum from './pages/GalleryAlbum'
import SmoothScrollProvider from './components/SmoothScrollProvider'
import ScrollToTop from './components/ScrollToTop'
import PageTransition from './components/PageTransition'

import Layout from './components/Layout'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <ScrollToTop />
    <SmoothScrollProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<PageTransition><App /></PageTransition>} />
          <Route path="/about" element={<PageTransition><About /></PageTransition>} />
          <Route path="/blog" element={<PageTransition><BlogIndex /></PageTransition>} />
          <Route path="/blog/:slug" element={<PageTransition><ArticlePage /></PageTransition>} />
          <Route path="/spotlight" element={<PageTransition><Spotlight /></PageTransition>} />
          <Route path="/gallery" element={<PageTransition><Gallery /></PageTransition>} />
          <Route path="/gallery/:albumId" element={<PageTransition><GalleryAlbum /></PageTransition>} />
          <Route path="/events" element={<PageTransition><EventCalendar /></PageTransition>} />
          <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
        </Route>
      </Routes>
    </SmoothScrollProvider>
  </BrowserRouter>
)
