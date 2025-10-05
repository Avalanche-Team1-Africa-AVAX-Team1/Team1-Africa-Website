import { Link } from 'react-router-dom'
import { useState } from 'react'
import { articles } from '../data/articles'
import event1Img from '../assets/event1-img.png'

export default function BlogIndex() {
  const [expanded, setExpanded] = useState(false)
  const visible = expanded ? articles : articles.slice(0, 6)
  const hasMore = articles.length > 6
  return (
    <main className="px-4 md:px-8 lg:px-16 py-10">
      <div className="mb-6">
        <span className="mb-2 inline-block rounded-full bg-red-500 px-2.5 py-1 text-xs font-semibold text-white">Blog</span>
        <h1 className="text-3xl font-bold text-gray-900">News To Keep You Updated Always</h1>
        <p className="mt-2 max-w-3xl text-gray-600">Join our community and stay informed about the latest campaigns, success stories, and blockchain innovations in fundraising.</p>
      </div>

      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((a, idx) => (
          <li key={a.slug} className="group">
            <Link to={`/blog/${a.slug}`} className="block overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/5 transition-transform duration-200 group-hover:-translate-y-1">
              <img src={idx === 0 ? (event1Img || a.featuredImage.url) : (a.featuredImage.url || event1Img)} alt={a.featuredImage.alt} loading="lazy" className="h-44 w-full object-cover" />
              <div className="p-4">
                <span className="rounded-full px-2.5 py-1 text-xs font-medium text-white" style={{ backgroundColor: a.category.color }}>{a.category.name}</span>
                <h3 className="mt-3 line-clamp-2 text-base font-semibold text-gray-900">{a.title}</h3>
                <p className="mt-2 line-clamp-2 text-sm text-gray-600">{a.excerpt}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      {hasMore && (
        <div className="mt-8 flex justify-center">
          <button onClick={() => setExpanded(v => !v)} className="rounded-full bg-gray-900 px-5 py-2 text-sm font-medium text-white">
            {expanded ? 'View less' : 'View more'}
          </button>
        </div>
      )}
    </main>
  )
}

