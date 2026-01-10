import './App.css'
import Hero from './components/hero'
import Spinner from './components/spinner'
import Stats from './components/stats'
import AboutUs from './components/about'
import Partners from './components/partners'
import Build from './components/build'
import Gallery from './components/gallery'
import TestimonialSlider from './components/testimonial'
// import Events from './components/events'

import Games from './components/games'
import Blog from './components/blog'
// import Join from './components/join'
import AvalancheEcosystem from './components/avalanche-ecosystem'

function App() {
  return (
    <>
      {/* Hero Section - Full Screen */}
      <Hero />

      {/* Centered content wrapper with consistent max-width */}
      <div className="mx-auto w-full max-w-site-lg px-2 md:px-8">
        <Spinner />
      </div>

      {/* Stats Section - Handles its own max-width */}
      <Stats />

      <div className="mx-auto w-full max-w-site-lg px-2 md:px-8">
        <AboutUs />
        <Partners />
      </div>
      {/* Testimonial - full-width background */}
      <div className="mt-16 lt-1024:mt-48">
        <TestimonialSlider />
      </div>
      {/* Gallery - back to centered container */}
      <div className="mx-auto w-full max-w-site-lg px-2 md:px-8">
        <Gallery />
      </div>
      {/* Full-width sections */}
      {/* <Events /> */}
      <Games />
      <AvalancheEcosystem />

      {/* Blog - centered container */}
      <div className="mx-auto w-full max-w-site-lg px-2 md:px-8">
        <Blog />
      </div>

      {/* Join and Footer - full-width */}
      {/* <Join /> */}

    </>
  )
}

export default App
