import { Link } from 'react-router-dom'
import { articles } from '../data/articles'

export default function BlogIndex() {
  return (
    <main className="px-4 md:px-8 lg:px-16 py-10">
      <div className="mb-6">
        <span className="mb-2 inline-block rounded-full bg-red-500 px-2.5 py-1 text-xs font-semibold text-white">Blog</span>
        <h1 className="text-3xl font-bold text-gray-900">News To Keep You Updated Always</h1>
        <p className="mt-2 max-w-3xl text-gray-600">Join our community and stay informed about the latest campaigns, success stories, and blockchain innovations in fundraising.</p>
      </div>

      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map(a => (
          <li key={a.slug} className="group">
            <Link to={`/blog/${a.slug}`} className="block overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/5 transition-transform duration-200 group-hover:-translate-y-1">
              <img src={a.featuredImage.url} alt={a.featuredImage.alt} loading="lazy" className="h-44 w-full object-cover" />
              <div className="p-4">
                <span className="rounded-full px-2.5 py-1 text-xs font-medium text-white" style={{ backgroundColor: a.category.color }}>{a.category.name}</span>
                <h3 className="mt-3 line-clamp-2 text-base font-semibold text-gray-900">{a.title}</h3>
                <p className="mt-2 line-clamp-2 text-sm text-gray-600">{a.excerpt}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}

