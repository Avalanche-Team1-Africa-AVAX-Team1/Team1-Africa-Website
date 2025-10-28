import { useEffect, useMemo, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import type { Article } from '../types/blog'
import { findArticleBySlug, getRelatedArticles } from '../data/articles'
import { setPageSeo } from '../lib/seo'
import Navbar from '../components/navbar'
import Footer from '../components/footer'

function formatDate(value: string | Date) {
  const d = new Date(value)
  return d.toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' })
}

function MetaRow({ article }: { article: Article }) {
  return (
    <div className="mt-3 flex flex-wrap items-center gap-2 text-xs md:text-sm text-gray-500">
      <span>{formatDate(article.publishedDate)}</span>
      <span className="mx-1">•</span>
      <span>{article.readTime} min read</span>
      <span className="mx-1">•</span>
      <span>{article.author.name}</span>
    </div>
  )
}

function CategoryBadge({ label, color }: { label: string; color: string }) {
  return (
    <span
      className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium text-white shadow-sm ring-1 ring-black/5"
      style={{ backgroundColor: color }}
    >
      {label}
    </span>
  )
}

function RelatedCard({ a }: { a: Article }) {
  return (
    <Link to={`/blog/${a.slug}`} className="group w-72 shrink-0">
      <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/5 transition-transform duration-200 group-hover:-translate-y-1">
        <img
          src={a.featuredImage.url}
          alt={a.featuredImage.alt}
          loading="lazy"
          className="h-40 w-full object-cover"
        />
        <div className="p-4">
          <CategoryBadge label={a.category.name} color={a.category.color} />
          <h3 className="mt-3 line-clamp-2 text-base font-semibold text-gray-900">{a.title}</h3>
          <MetaRow article={a} />
          <p className="mt-2 line-clamp-2 text-sm text-gray-600">{a.excerpt}</p>
        </div>
      </div>
    </Link>
  )
}

function Skeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-64 w-full rounded-xl bg-gray-200" />
      <div className="mt-6 h-6 w-2/3 rounded bg-gray-200" />
      <div className="mt-2 h-4 w-1/2 rounded bg-gray-200" />
      <div className="mt-8 space-y-3">
        <div className="h-4 w-full rounded bg-gray-200" />
        <div className="h-4 w-5/6 rounded bg-gray-200" />
        <div className="h-4 w-4/6 rounded bg-gray-200" />
      </div>
    </div>
  )
}

export default function BlogArticle() {
  const { slug = '' } = useParams()
  const navigate = useNavigate()
  const [article, setArticle] = useState<Article | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    setError(null)
    const timer = setTimeout(() => {
      const a = findArticleBySlug(slug)
      if (!a) {
        setError('Article not found')
        setLoading(false)
        return
      }
      setArticle(a)
      setLoading(false)
      setPageSeo({
        title: `${a.title} | Team1 Africa Blog`,
        description: a.excerpt,
        image: a.featuredImage.url
      })
    }, 500)
    return () => clearTimeout(timer)
  }, [slug])

  const related = useMemo(() => (slug ? getRelatedArticles(slug, 3) : []), [slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="mx-auto w-full max-w-site-lg px-2 md:px-8">
          <Navbar />
        </div>
        <main className="px-4 md:px-8 lg:px-16 py-8 md:py-12">
          <Skeleton />
        </main>
      </div>
    )
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="mx-auto w-full max-w-site-lg px-2 md:px-8">
          <Navbar />
        </div>
        <main className="px-4 md:px-8 lg:px-16 py-16 text-center">
          <p className="text-gray-600 text-xl mb-6">{error ?? 'Something went wrong.'}</p>
          <Link className="inline-block rounded-full bg-gradient-to-r from-red-500 to-red-600 px-6 py-3 text-white font-bold hover:shadow-lg transition-all" to="/blog">← Back to Blog</Link>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Navbar */}
      <div className="mx-auto w-full max-w-site-lg px-2 md:px-8">
        <Navbar />
      </div>

      <article className="px-4 md:px-8 lg:px-16 py-8">
        <div className="mx-auto w-full max-w-6xl">
          {/* Back Button */}
          <div className="mb-6">
            <button 
              onClick={() => navigate(-1)} 
              className="group inline-flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors font-medium"
            >
              <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
          </div>

          {/* Title + Meta */}
          <div className="max-w-4xl">
          <h1 className="text-3xl font-bold leading-tight text-gray-900 md:text-4xl">{article.title}</h1>
          <MetaRow article={article} />
        </div>
        
        {/* Hero */}
        <div className="relative overflow-hidden rounded-2xl bg-gray-100 mt-3">
          <img
            src={article.featuredImage.url}
            alt={article.featuredImage.alt}
            loading="eager"
            className="h-[320px] w-full object-cover md:h-[420px]"
          />
          <div className="absolute left-4 top-4">
            <CategoryBadge label={article.category.name} color={article.category.color} />
          </div>
        </div>

        {/* Content */}
        <div className="mt-8 max-w-3xl text-gray-800">
          <div
            className="prose prose-neutral max-w-none prose-headings:font-semibold prose-a:text-red-600"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          <div className="mt-10 pt-8 border-t border-gray-200">
            <Link to="/blog" className="inline-flex items-center gap-2 text-red-600 font-medium hover:gap-3 transition-all">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to All Articles
            </Link>
          </div>
        </div>

        {/* Related */}
        <section aria-label="Related articles" className="mt-16 pb-16">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Related Articles</h2>
            <Link to="/blog" className="text-sm text-red-600 font-medium hover:underline">View all →</Link>
          </div>
          <div className="no-scrollbar flex gap-6 overflow-x-auto pb-2">
            {related.map(a => (
              <RelatedCard key={a.slug} a={a} />
            ))}
          </div>
        </section>
      </div>
    </article>
    <Footer />
  </div>
  )
}

