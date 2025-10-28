import { Link } from 'react-router-dom'
import { useState } from 'react'
import { articles } from '../data/articles'
import event1Img from '../assets/event1-img.png'
import Navbar from '../components/navbar'
import Footer from '../components/footer'

export default function BlogIndex() {
  const [expanded, setExpanded] = useState(false)
  const visible = expanded ? articles : articles.slice(0, 6)
  const hasMore = articles.length > 6
  const featuredArticle = articles[0]
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Navbar */}
      <div className="mx-auto w-full max-w-site-lg px-2 md:px-8">
        <Navbar />
      </div>

      {/* Hero Section with Pixel Art Style */}
      <div className="relative overflow-hidden bg-black py-20 lt-1024:py-16 lt-768:py-12">
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 via-black to-black"></div>
        
        {/* Pixel Text Background */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10 select-none pointer-events-none">
          <h1 className="text-[200px] lt-1920:text-[150px] lt-1440:text-[120px] lt-1024:text-[80px] font-bold tracking-tight" style={{ fontFamily: "'Press Start 2P'" }}>
            BLOG
          </h1>
        </div>

        <div className="relative mx-auto max-w-7xl px-6 lt-1024:px-4 text-center">
          <span className="inline-block bg-red-500 px-4 py-2 rounded-lg text-sm font-bold text-white mb-6 transform -rotate-3 animate-pulse">
            Latest Updates
          </span>
          <h1 className="text-6xl lt-1440:text-5xl lt-1024:text-4xl lt-768:text-3xl font-bold text-white mb-6 leading-tight">
            News To Keep You <span className="text-red-500">Updated</span> Always
          </h1>
          <p className="text-xl lt-1024:text-lg lt-768:text-base text-gray-300 max-w-3xl mx-auto">
            Join our community and stay informed about the latest campaigns, success stories, and blockchain innovations.
          </p>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-6 lt-1024:px-4 py-16 lt-1024:py-12">
        {/* Featured Article */}
        <div className="mb-20 lt-1024:mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-1 w-12 bg-red-500"></div>
            <h2 className="text-2xl lt-1024:text-xl font-bold text-gray-900">Featured Story</h2>
          </div>
          
          <Link to={`/blog/${featuredArticle.slug}`} className="group block">
            <div className="relative overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 transition-all duration-300 group-hover:shadow-3xl group-hover:-translate-y-2">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="relative h-[400px] lt-1024:h-[300px] overflow-hidden">
                  <img 
                    src={event1Img || featuredArticle.featuredImage.url} 
                    alt={featuredArticle.featuredImage.alt} 
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <span className="absolute top-6 left-6 rounded-2xl px-4 py-2 text-sm font-bold text-white shadow-lg" style={{ backgroundColor: featuredArticle.category.color }}>
                    {featuredArticle.category.name}
                  </span>
                </div>
                <div className="p-8 lt-1024:p-6 flex flex-col justify-center">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                    <span className="px-3 py-1 bg-red-500/10 text-red-500 rounded-full font-medium">Featured</span>
                    <span>•</span>
                    <span>{featuredArticle.readTime} min read</span>
                  </div>
                  <h3 className="text-3xl lt-1024:text-2xl lt-768:text-xl font-bold text-gray-900 mb-4 group-hover:text-red-500 transition-colors">
                    {featuredArticle.title}
                  </h3>
                  <p className="text-lg lt-1024:text-base text-gray-600 mb-6 line-clamp-3">
                    {featuredArticle.excerpt}
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-white font-bold">
                        {featuredArticle.author.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{featuredArticle.author.name}</p>
                        <p className="text-sm text-gray-500">20th August, 2025</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* All Articles Grid */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-1 w-12 bg-red-500"></div>
            <h2 className="text-2xl lt-1024:text-xl font-bold text-gray-900">All Stories</h2>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {visible.slice(1).map((article, idx) => {
              const imgSrc = idx === 0 ? (event1Img || article.featuredImage.url) : (article.featuredImage.url || event1Img)
              return (
                <Link key={article.slug} to={`/blog/${article.slug}`} className="group">
                  <article className="h-full overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-black/5 transition-all duration-300 group-hover:shadow-2xl group-hover:-translate-y-2 group-hover:ring-red-500/20">
                    <div className="relative h-56 overflow-hidden">
                      <img 
                        src={imgSrc} 
                        alt={article.featuredImage.alt} 
                        loading="lazy" 
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110 group-hover:rotate-2"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                      <span className="absolute top-4 left-4 rounded-xl px-3 py-1.5 text-xs font-bold text-white shadow-lg" style={{ backgroundColor: article.category.color }}>
                        {article.category.name}
                      </span>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                        <span>{article.readTime} min read</span>
                        <span>•</span>
                        <span>{article.author.name}</span>
                      </div>
                      <h3 className="text-xl lt-1024:text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-red-500 transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {article.excerpt}
                      </p>
                    </div>
                  </article>
                </Link>
              )
            })}
          </div>
        </div>

        {/* View More Button */}
        {hasMore && (
          <div className="flex justify-center">
            <button 
              onClick={() => setExpanded(v => !v)} 
              className="group relative px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold rounded-full shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10">{expanded ? '← View Less' : 'View More →'}</span>
              <div className="absolute inset-0 bg-black/20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}

