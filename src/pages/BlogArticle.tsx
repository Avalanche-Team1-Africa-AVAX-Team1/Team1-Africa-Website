import { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { api, type Blog, getImageUrl } from '../lib/api'
import { setPageSeo } from '../lib/seo'
import CommentsSection from '../components/CommentsSection'

function formatDate(value?: string | Date) {
  if (!value) return '';
  const d = new Date(value)
  return d.toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' })
}

function MetaRow({ article }: { article: Blog }) {
  return (
    <div className="mt-3 flex flex-wrap items-center gap-3 text-xs md:text-sm text-gray-500">
      {(article.customAuthorAvatar || article.author?.avatar) && (
        <div className="w-6 h-6 rounded-full overflow-hidden border border-gray-200">
          <img src={getImageUrl(article.customAuthorAvatar || article.author?.avatar)} alt={article.customAuthorName || article.author?.name} className="w-full h-full object-cover" />
        </div>
      )}
      <span className="font-semibold text-gray-900">{article.customAuthorName || article.author?.name || 'Unknown Author'}</span>
      <span className="mx-1">•</span>
      <span>{formatDate(article.publishedAt || article.createdAt)}</span>
      <span className="mx-1">•</span>
      {/* Read time is not in API yet, hardcoding or estimating */}
      <span>5 min read</span>
    </div>
  )
}

function CategoryBadge({ label }: { label?: string }) {
  if (!label) return null;
  return (
    <span
      className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium text-white shadow-sm ring-1 ring-black/5 bg-blue-600"
    >
      {label}
    </span>
  )
}

function RelatedCard({ a }: { a: Blog }) {
  // Use slug if available, otherwise fallback to id (frontend routes might expect slug)
  // The API blog object usually has 'slug' but the interface I saw in api.ts didn't explicitly list it?
  // Let me check api.ts again. It has id, title, content...
  // Wait, if api.ts's Blog interface doesn't have slug, we link by ID?
  // The backend entity HAS slug. The frontend interface might be incomplete.
  // I will assume it has slug or use id as backup.
  const linkId = (a as any).slug || a.id;

  return (
    <Link to={`/blog/${linkId}`} className="group w-72 shrink-0">
      <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/5 transition-transform duration-200 group-hover:-translate-y-1">
        <div className="h-40 w-full bg-gray-200 overflow-hidden">
          {a.coverImage ? (
            <img
              src={getImageUrl(a.coverImage)}
              alt={a.title}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center text-gray-400 font-bold">No Image</div>
          )}
        </div>
        <div className="p-4">
          <CategoryBadge label={a.category || "General"} />
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
  const [article, setArticle] = useState<Blog | null>(null)
  const [related, setRelated] = useState<Blog[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        // Fetch main article
        const data = await api.getBlog(slug);
        setArticle(data);

        // Fetch related (latest 4 excluding current)
        try {
          const latest = await api.getBlogs({ limit: 4 });
          setRelated(latest.items.filter(b => b.id !== data.id && (b as any).slug !== slug).slice(0, 3));
        } catch (err) {
          console.warn("Failed to fetch related", err);
        }

        setPageSeo({
          title: `${data.title} | Team1 Africa Blog`,
          description: data.excerpt || '',
          image: getImageUrl(data.coverImage) || ''
        })

        // Scroll to top
        window.scrollTo(0, 0);
      } catch (err) {
        console.error(err);
        setError('Article not found');
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchData();
  }, [slug])


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
              {(article.customAuthorAvatar || article.author?.avatar) && (
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-gray-200 shadow-sm">
                  <img src={getImageUrl(article.customAuthorAvatar || article.author?.avatar)} alt={article.customAuthorName || article.author?.name} className="w-full h-full object-cover" />
                </div>
              )}
              <div className="flex-1">
                {/* Author Name with Flag */}
                <div className="flex items-center gap-2">
                  <p className="text-base font-bold text-gray-900">{article.customAuthorName || article.author?.name || 'Unknown'}</p>
                  <span className="text-xl" title="South Africa">🇿🇦</span>
                </div>

                <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                  <span>{formatDate(article.publishedAt || article.createdAt)}</span>
                  <span>•</span>
                  <span>5 min read</span>
                </div>
              </div>
            </div>

            {/* Removed Engagement Metrics as they are not in API yet */}
          </div>

          {/* Hero */}
          <div className="relative overflow-hidden rounded-2xl bg-gray-100 mt-8">
            {article.coverImage ? (
              <img
                src={getImageUrl(article.coverImage)}
                alt={article.title}
                loading="eager"
                className="h-[320px] w-full object-cover md:h-[420px]"
              />
            ) : (
              <div className="h-[320px] w-full bg-gray-200 flex items-center justify-center text-gray-400">No Image</div>
            )}

            <div className="absolute left-4 top-4">
              <CategoryBadge label={article.category || "General"} />
            </div>
          </div>


          {/* Content */}
          <div className="mt-8 max-w-3xl text-gray-800">
            <div
              className="prose prose-neutral max-w-none prose-headings:font-semibold prose-a:text-red-600"
              // API returns HTML content from rich text editor
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
            {related.length > 0 ? (
              <div className="no-scrollbar flex gap-6 overflow-x-auto pb-2">
                {related.map(a => (
                  <RelatedCard key={a.id} a={a} />
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No related articles found.</p>
            )}

          </section>
        </div>
      </article>

    </div>
  )
}
