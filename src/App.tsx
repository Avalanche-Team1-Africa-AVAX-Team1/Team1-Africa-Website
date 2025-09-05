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
function App() {

  return (
    <>
      <Navbar />
      <Spinner />
      <Stats />
      <AboutUs />
      <Partners />
      <Build />
      <Gallery />
      <TestimonialSlider />
      <Events />
    </>
  )
}

export default App
