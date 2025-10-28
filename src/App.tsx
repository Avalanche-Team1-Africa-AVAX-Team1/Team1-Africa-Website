import './App.css'
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

  return (
    <>
      {/* Centered content wrapper for ultrawide screens */}
      <div className="mx-auto w-full max-w-site-lg">
        <div className="px-2 md:px-8">
          <Navbar />
          <Spinner />
          <Stats />
          <AboutUs />
          <Partners />
        </div>
      </div>
      {/* Full-width sections remain outside the centered wrapper */}
      <Build />
      <div className="mx-auto w-full max-w-site-lg">
        <div className="px-2 md:px-8">
          <Gallery />
        </div>
      </div>
      {/* Testimonial needs full-width background */}
      <div className="mt-16 lt-1024:mt-48">
        <TestimonialSlider />
      </div>
      <Events />
      <Games />
      <Blog />
      <Join />
      <Footer />
    </>
  )
}

export default App
