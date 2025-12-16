// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import BlogIndex from './pages/BlogIndex'
import BlogArticle from './pages/BlogArticle'
import NotFound from './pages/NotFound'
import EventCalendar from './components/EventCalendar'
import About from './pages/About'
import SmoothScrollProvider from './components/SmoothScrollProvider'

import Layout from './components/Layout'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <SmoothScrollProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<App />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<BlogIndex />} />
          <Route path="/blog/:slug" element={<BlogArticle />} />
          <Route path="/events" element={<EventCalendar />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </SmoothScrollProvider>
  </BrowserRouter>
)
