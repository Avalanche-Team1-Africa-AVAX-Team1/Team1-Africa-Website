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
function App() {

  return (
    <>
      <div className="px-8">
        <Navbar />
        <Spinner />
        <Stats />
        <AboutUs />
        <Partners />
        <Build />
        <Gallery />
        <TestimonialSlider />
      </div>
      <Events />
      <Footer />
    </>
  )
}

export default App
