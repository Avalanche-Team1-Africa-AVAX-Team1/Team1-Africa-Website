import './App.css'
import { useState, useEffect } from 'react'
import Preloader from './components/Preloader'
import Navbar from './components/navbar'
import Spinner from './components/spinner'
import Stats from './components/stats'
import AboutUs from './components/about'
import Partners from './components/partners'
import Build from './components/build'
import Gallery from './components/gallery'
import TestimonialSlider from './assets/testimonial'
import Events from './components/events'
import Footer from './components/footer'
import Games from './components/games'
import Blog from './components/blog'
import Join from './components/join'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)

  // Check if user has already seen the preloader in this session
  useEffect(() => {
    const hasSeenPreloader = sessionStorage.getItem('hasSeenPreloader')
    if (hasSeenPreloader) {
      setIsLoading(false)
      setShowContent(true)
    }
  }, [])

  const handlePreloaderComplete = () => {
    setIsLoading(false)
    // Mark that user has seen the preloader
    sessionStorage.setItem('hasSeenPreloader', 'true')
    // Small delay before showing content for smooth transition
    setTimeout(() => {
      setShowContent(true)
    }, 300)
  }

  return (
    <>
      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}

      {showContent && (
        <>
          {/* Navbar with slightly wider max-width */}
          <div className="mx-auto w-full max-w-site-nav px-2 md:px-8">
            <Navbar />
          </div>
          
          {/* Centered content wrapper with consistent max-width */}
          <div className="mx-auto w-full max-w-site-lg px-2 md:px-8">
            <Spinner />
            <Stats />
            <AboutUs />
            <Partners />
          </div>

          {/* Full-width sections */}
          <Build />

          {/* Gallery - back to centered container */}
          <div className="mx-auto w-full max-w-site-lg px-2 md:px-8">
            <Gallery />
          </div>

          {/* Testimonial - full-width background */}
          <div className="mt-16 lt-1024:mt-48">
            <TestimonialSlider />
          </div>

          {/* Full-width sections */}
          <Events />
          <Games />

          {/* Blog - centered container */}
          <div className="mx-auto w-full max-w-site-lg px-2 md:px-8">
            <Blog />
          </div>

          {/* Join and Footer - full-width */}
          <Join />
          <Footer />
        </>
      )}
    </>
  )
}

export default App
