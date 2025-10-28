import { Link } from 'react-router-dom'
import { useState } from 'react'
import { articles } from '../data/articles'
import event1Img from '../assets/event1-img.png'

const scrollByCards = (container: HTMLDivElement | null, dir: 1 | -1) => {
  if (!container) return
  const firstCard = container.querySelector('[data-card]') as HTMLElement | null
  const cardWidth = firstCard ? firstCard.clientWidth + 24 /* gap */ : Math.min(container.clientWidth, 380)
  container.scrollBy({ left: cardWidth * dir, behavior: 'smooth' })
}

export default function Blog() {
  let scroller: HTMLDivElement | null = null
  const [expanded, setExpanded] = useState(false)
  const mobileVisible = expanded ? articles : articles.slice(0, 3)
  const hasMore = articles.length > 3
  return (
    <section className="px-2 md:px-8 py-12 overflow-hidden">
      <div>
        <div className="flex items-start justify-between">
          <div>
            <span className="mb-3 inline-block rounded-full bg-red-500 px-2.5 py-1 text-xs font-semibold text-white">Blog</span>
            <h2 className="text-3xl font-bold text-gray-900">News To Keep You Updated Always</h2>
            <p className="mt-2 max-w-3xl text-gray-600">Join our community and stay informed about the latest campaigns, success stories, and blockchain innovations in fundraising.</p>
          </div>
          <div className="hidden md:flex gap-3">
            <button aria-label="Previous" className="size-10 rounded-full border border-gray-200 bg-white text-gray-700 shadow-sm" onClick={() => scrollByCards(scroller, -1)}>
              <span className="sr-only">Previous</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6"/></svg>
            </button>
            <button aria-label="Next" className="size-10 rounded-full border border-gray-200 bg-white text-gray-700 shadow-sm" onClick={() => scrollByCards(scroller, 1)}>
              <span className="sr-only">Next</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          </div>
        </div>

        {/* Mobile: stack cards vertically with show more/less */}
        <div className="mt-6 md:hidden">
          <ul className="space-y-6">
            {mobileVisible.map((a, idx) => {
              const imgSrc = idx === 0 ? (event1Img || a.featuredImage.url) : (a.featuredImage.url || event1Img)
              return (
                <li key={a.slug}>
                  <Link to={`/blog/${a.slug}`} className="group block">
                    <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/5 transition-transform duration-200 group-hover:-translate-y-1">
                      <img src={imgSrc} alt={a.featuredImage.alt} className="h-48 w-full object-cover" />
                      <div className="p-4">
                        <span className="rounded-full px-2.5 py-1 text-xs font-medium text-white" style={{ backgroundColor: a.category.color }}>{a.category.name}</span>
                        <h3 className="mt-3 line-clamp-2 text-lg font-semibold text-gray-900">{a.title}</h3>
                        <p className="mt-2 line-clamp-2 text-sm text-gray-600">{a.excerpt}</p>
                      </div>
                    </div>
                  </Link>
                </li>
              )
            })}
          </ul>
          {hasMore && (
            <div className="mt-6 flex justify-center">
              <button
                onClick={() => setExpanded(v => !v)}
                className="rounded-full bg-gray-900 px-4 py-2 text-sm font-medium text-white"
              >
                {expanded ? 'View less' : 'View more'}
              </button>
            </div>
          )}
        </div>

        {/* Desktop/tablet: horizontal scroller */}
        <div ref={(el) => { scroller = el }} className="hidden md:flex mt-6 gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory md:scroll-pl-2 -mx-8 px-8 py-4">
          {articles.map((a, idx) => {
            const imgSrc = idx === 0 ? (event1Img || a.featuredImage.url) : (a.featuredImage.url || event1Img)
            return (
              <Link key={a.slug} to={`/blog/${a.slug}`} className="group w-[420px] md:w-[480px] lg:w-[520px] shrink-0 snap-start">
                <div data-card className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/5 transition-transform duration-200 group-hover:scale-[1.02] flex flex-col min-h-[520px] md:min-h-[560px] lg:min-h-[600px]">
                  <img src={imgSrc} alt={a.featuredImage.alt} className="h-64 md:h-72 lg:h-80 w-full object-cover" />
                  <div className="p-4 flex-1 flex flex-col">
                    <span className="rounded-2xl px-4 py-2 text-xs font-medium text-white w-fit" style={{ backgroundColor: a.category.color }}>{a.category.name}</span>
                    <h3 className="mt-3 clamp-2 text-2xl font-semibold text-gray-900">{a.title}</h3>
                    <div className="mt-2 text-sm text-gray-500 whitespace-nowrap overflow-hidden text-ellipsis">
                      20th August, 2025 • {a.readTime} min read • {a.author.name}
                    </div>
                    <p className="mt-2 clamp-3 text-base text-gray-600">{a.excerpt}</p>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

