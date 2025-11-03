import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/navbar'
import Footer from '../components/footer'

export default function NotFound() {
  const navigate = useNavigate()
  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          navigate('/')
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [navigate])

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navbar */}
      <div className="mx-auto w-full max-w-site-nav px-2 md:px-8">
        <Navbar />
      </div>

      {/* 404 Content */}
      <main className="flex-1 grid place-items-center px-4 py-16 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-red-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-red-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-red-500/5 rounded-full blur-2xl animate-pulse delay-500"></div>
        </div>

        <div className="text-center relative z-10 max-w-3xl mx-auto">
          {/* Glitch 404 Badge */}
          <div className="mb-8 inline-block animate-bounce">
            <span className="bg-red-500 px-6 py-3 rounded-xl text-sm inline-block transform -rotate-6 font-bold text-white shadow-lg">
              ERROR
            </span>
          </div>

          {/* Giant 404 */}
          <h1 className="text-[150px] lt-1440:text-[120px] lt-1024:text-[100px] lt-768:text-[80px] lt-480:text-[60px] font-extrabold text-black leading-none mb-6 tracking-tight">
            4<span className="text-red-500">0</span>4
          </h1>

          {/* Message */}
          <div className="space-y-4 mb-12">
            <h2 className="text-3xl lt-1024:text-2xl lt-768:text-xl font-bold text-gray-900">
              Page Not Found
            </h2>
            <p className="text-lg lt-1024:text-base text-gray-600 max-w-xl mx-auto leading-relaxed">
              Oops! Looks like this page took an off-chain route. The page you're looking for doesn't exist or has been moved.
            </p>
          </div>

          {/* Countdown Timer */}
          <div className="mb-8 p-6 bg-gray-50 rounded-2xl border-2 border-gray-200 inline-block">
            <p className="text-sm text-gray-500 mb-2">Redirecting to homepage in</p>
            <div className="flex items-center justify-center gap-2">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-3xl font-bold text-white">{countdown}</span>
              </div>
              <span className="text-gray-400 text-xl">seconds</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link 
              to="/" 
              className="group relative px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold rounded-full shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Go Home Now
              </span>
              <div className="absolute inset-0 bg-black/20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </Link>

            <Link 
              to="/blog" 
              className="px-8 py-4 bg-white border-2 border-gray-200 text-gray-700 font-bold rounded-full hover:border-red-500 hover:text-red-500 transition-all duration-300"
            >
              Visit Blog
            </Link>
          </div>

          {/* Helpful Links */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-4">You might be looking for:</p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
              <Link to="/" className="text-gray-600 hover:text-red-500 transition-colors">Home</Link>
              <span className="text-gray-300">•</span>
              <Link to="/blog" className="text-gray-600 hover:text-red-500 transition-colors">Blog</Link>
              <span className="text-gray-300">•</span>
              <a href="#about" className="text-gray-600 hover:text-red-500 transition-colors">About</a>
              <span className="text-gray-300">•</span>
              <a href="#events" className="text-gray-600 hover:text-red-500 transition-colors">Events</a>
            </div>
        </div>
      </div>
    </main>

      <Footer />
    </div>
  )
}

