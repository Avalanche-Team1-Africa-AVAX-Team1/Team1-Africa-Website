// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import BlogArticle from './pages/BlogArticle'
import NotFound from './pages/NotFound'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/blog/:slug" element={<BlogArticle />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
)
