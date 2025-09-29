import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import type { Article } from '../types/blog'
import { findArticleBySlug, getRelatedArticles } from '../data/articles'
import { setPageSeo } from '../lib/seo'

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
      <main className="px-4 md:px-8 lg:px-16 py-8 md:py-12">
        <Skeleton />
      </main>
    )
  }

  if (error || !article) {
    return (
      <main className="px-4 md:px-8 lg:px-16 py-16 text-center">
        <p className="text-gray-600">{error ?? 'Something went wrong.'}</p>
        <Link className="mt-6 inline-block rounded-full bg-gray-900 px-4 py-2 text-white" to="/blog">Back to blog</Link>
      </main>
    )
  }

  return (
    <article className="px-4 md:px-8 lg:px-16">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl bg-gray-100">
        <img
          src={article.featuredImage.url}
          alt={article.featuredImage.alt}
          loading="eager"
          className="h-[320px] w-full object-cover md:h-[420px]"
        />
        <div className="absolute left-4 top-4">
          <CategoryBadge label={article.category.name} color={article.category.color} />
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent p-4 md:p-6">
          <h1 className="pointer-events-auto max-w-4xl text-2xl font-bold leading-tight text-white md:text-4xl">
            {article.title}
          </h1>
        </div>
      </div>

      {/* Meta */}
      <MetaRow article={article} />

      {/* Content */}
      <div className="mx-auto mt-8 max-w-3xl text-gray-800">
        <div
          className="prose prose-neutral max-w-none prose-headings:font-semibold prose-a:text-red-600"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        <div className="mt-10">
          <Link to="/blog" className="text-sm font-medium text-red-600 hover:underline">← Back to blog</Link>
        </div>
      </div>

      {/* Related */}
      <section aria-label="Related articles" className="mt-16">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Related Articles</h2>
          <Link to="/blog" className="text-sm text-red-600 hover:underline">View all</Link>
        </div>
        <div className="no-scrollbar flex gap-6 overflow-x-auto pb-2">
          {related.map(a => (
            <RelatedCard key={a.slug} a={a} />
          ))}
        </div>
      </section>
    </article>
  )
}

