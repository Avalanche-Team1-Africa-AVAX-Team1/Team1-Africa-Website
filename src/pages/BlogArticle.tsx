import { useEffect, useMemo, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import type { Article } from '../types/blog'
import { findArticleBySlug, getRelatedArticles } from '../data/articles'
import { setPageSeo } from '../lib/seo'
import CommentsSection from '../components/CommentsSection'


function formatDate(value: string | Date) {
  const d = new Date(value)
  return d.toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' })
}

function MetaRow({ article }: { article: Article }) {
  return (
    <div className="mt-3 flex flex-wrap items-center gap-3 text-xs md:text-sm text-gray-500">
      {article.author.avatar && (
        <div className="w-6 h-6 rounded-full overflow-hidden border border-gray-200">
          <img src={article.author.avatar} alt={article.author.name} className="w-full h-full object-cover" />
        </div>
      )}
      <span className="font-semibold text-gray-900">{article.author.name}</span>
      <span className="mx-1">•</span>
      <span>{formatDate(article.publishedDate)}</span>
      <span className="mx-1">•</span>
      <span>{article.readTime} min read</span>
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
        <main className="px-4 md:px-8 lg:px-16 py-8 md:py-12">
          <Skeleton />
        </main>
      </div>
    )
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <main className="px-4 md:px-8 lg:px-16 py-16 text-center">
          <p className="text-gray-600 text-xl mb-6">{error ?? 'Something went wrong.'}</p>
          <Link className="inline-block rounded-full bg-gradient-to-r from-red-500 to-red-600 px-6 py-3 text-white font-bold hover:shadow-lg transition-all" to="/blog">← Back to Blog</Link>
        </main>

      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
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

          {/* Title */}
          <div className="max-w-4xl">
            <h1 className="text-3xl font-bold leading-tight text-gray-900 md:text-4xl">{article.title}</h1>

            {/* Author Info with Avatar - PROMINENT */}
            <div className="mt-6 flex items-center gap-4 pb-6 border-b border-gray-200">
              {article.author.avatar && (
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-gray-200 shadow-sm">
                  <img src={article.author.avatar} alt={article.author.name} className="w-full h-full object-cover" />
                </div>
              )}
              <div className="flex-1">
                <p className="text-base font-bold text-gray-900">{article.author.name}</p>
                <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                  <span>{formatDate(article.publishedDate)}</span>
                  <span>•</span>
                  <span>{article.readTime} min read</span>
                </div>
              </div>
            </div>

            {/* Engagement Metrics - PROMINENT */}
            {article.engagement && (
              <div className="mt-6 flex items-center gap-8 pb-6 border-b border-gray-200">
                <div className="flex items-center gap-2 text-gray-700">
                  <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                  </svg>
                  <span className="font-bold text-xl">{article.engagement.likes}</span>
                  <span className="text-sm font-medium">Likes</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  <span className="font-bold text-xl">{article.engagement.shares}</span>
                  <span className="text-sm font-medium">Shares</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                  <span className="font-bold text-xl">{article.engagement.comments}</span>
                  <span className="text-sm font-medium">Comments</span>
                </div>
              </div>
            )}
          </div>

          {/* Hero */}
          <div className="relative overflow-hidden rounded-2xl bg-gray-100 mt-8">
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

          {/* Comments Section */}
          <CommentsSection />

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

    </div>
  )
}

