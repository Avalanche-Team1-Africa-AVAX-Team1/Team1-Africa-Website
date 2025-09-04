import './App.css'
import Navbar from './components/navbar'
import Spinner from './components/spinner'
import Stats from './components/stats'
import AboutUs from './components/About'
import Partners from './components/partners'
import Build from './components/build'
function App() {

  return (
    <>
      <Navbar />
      <Spinner />
      <Stats />
      <AboutUs />
      <Partners />
      <Build />
    </>
  )
}

export default App
