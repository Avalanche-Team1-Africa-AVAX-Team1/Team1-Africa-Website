import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function NotFound() {
  const navigate = useNavigate()

  useEffect(() => {
    const t = setTimeout(() => navigate('/'), 4000)
    return () => clearTimeout(t)
  }, [navigate])

  return (
    <main className="min-h-screen grid place-items-center px-4">
      <div className="text-center">
        <h1 className="text-7xl font-extrabold text-gray-900">404</h1>
        <p className="mt-3 text-lg text-gray-700">Oops — the page you’re looking for doesn’t exist.</p>
        <p className="mt-1 text-sm text-gray-500">You’ll be redirected to the homepage shortly.</p>
        <div className="mt-6">
          <Link to="/" className="inline-block rounded-full bg-gray-900 px-5 py-2 text-white">Go to homepage now</Link>
        </div>
      </div>
    </main>
  )
}

