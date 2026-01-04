import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { articles } from '../data/articles'
import AnimatedText from './AnimatedText'
import AnimatedSection from './AnimatedSection'
import { motion } from 'framer-motion'
import { api, type Blog as ApiBlog } from '../lib/api'

// Transform API blog to match article format
interface Article {
    slug: string;
    title: string;
    excerpt: string;
    featuredImage: {
        url: string;
        alt: string;
    };
    category: {
        name: string;
        color: string;
    };
    publishedDate: string;
    readTime: number;
    author: {
        name: string;
        avatar?: string;
    };
}

function transformBlogToArticle(blog: ApiBlog): Article {
    return {
        slug: blog.id, // Use ID as slug for now
        title: blog.title,
        excerpt: blog.excerpt || blog.content.substring(0, 150) + '...',
        featuredImage: {
            url: blog.coverImage || 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=400&fit=crop',
            alt: blog.title
        },
        category: {
            name: blog.category || 'News',
            color: '#ef4444' // Red color
        },
        publishedDate: blog.publishedAt || blog.createdAt || new Date().toISOString(),
        readTime: Math.ceil((blog.content?.length || 0) / 1000), // Rough estimate
        author: {
            name: blog.author?.name || 'Team1 Africa',
            avatar: blog.author?.avatar
        }
    };
}

export default function BlogAPI() {
    const [expanded, setExpanded] = useState(false);
    const [apiBlogs, setApiBlogs] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch blogs from API
    useEffect(() => {
        async function fetchBlogs() {
            try {
                setLoading(true);
                const blogs = await api.getAllBlogs();
                // Transform API blogs to article format
                const transformedBlogs = blogs.map(transformBlogToArticle);
                setApiBlogs(transformedBlogs);
                setLoading(false);
            } catch (err) {
                console.error('Failed to fetch blogs:', err);
                setError(err instanceof Error ? err.message : 'Failed to load blogs');
                setLoading(false);
                // Will fall back to hardcoded articles
            }
        }
        fetchBlogs();
    }, []);

    // Use API blogs if available, otherwise fall back to hardcoded articles
    const displayArticles = apiBlogs.length > 0 ? apiBlogs : articles;
    const mobileVisible = expanded ? displayArticles : displayArticles.slice(0, 3);
    const hasMore = displayArticles.length > 3;

    return (
        <section id="blog-section" className="py-12 overflow-hidden">
            <div>
                <div className="flex items-start justify-between">
                    <div>
                        <div className="inline-block ml-2">
                            <motion.div
                                initial={{ rotate: -12 }}
                                className="inline-block bg-red-600 px-4 py-2 rounded-xl text-sm text-white font-semibold mb-4 shadow-lg"
                            >
                                Editorial
                            </motion.div>
                        </div>
                        <AnimatedText variant="slideUp" delay={0.2}>
                            <h2 className="text-2xl lt-768:text-2xl md:text-3xl font-bold text-gray-900">
                                {loading ? 'Loading Articles...' : 'News To Keep You Updated Always'}
                            </h2>
                        </AnimatedText>
                        <AnimatedText variant="slideUp" delay={0.3}>
                            <p className="mt-2 text-gray-600 max-w-3xl leading-relaxed">
                                Join our community and stay informed about the latest campaigns, success stories, and blockchain innovations in fundraising.
                            </p>
                        </AnimatedText>
                        {error && (
                            <p className="mt-2 text-sm text-red-600">
                                Note: Using cached articles. API connection failed.
                            </p>
                        )}
                    </div>
                    <div className="hidden md:flex">
                        <Link
                            to="/blog"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
                        >
                            Check out Editorial
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>
                </div>

                {/* Mobile: stack cards vertically with show more/less */}
                <div className="mt-6 md:hidden">
                    <AnimatedSection staggerChildren={0.1} className="space-y-6">
                        {mobileVisible.map((a) => (
                            <div key={a.slug}>
                                <Link to={`/blog/${a.slug}`} className="group block">
                                    <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/5 transition-transform duration-200 group-hover:-translate-y-1">
                                        <img
                                            src={a.featuredImage.url}
                                            alt={a.featuredImage.alt}
                                            className="h-48 w-full object-cover"
                                        />
                                        <div className="p-4">
                                            <span className="rounded-full px-2.5 py-1 text-xs font-medium text-white" style={{ backgroundColor: a.category.color }}>{a.category.name}</span>
                                            <h3 className="mt-3 line-clamp-2 text-lg font-semibold text-gray-900">{a.title}</h3>
                                            <p className="mt-2 line-clamp-2 text-sm text-gray-600">{a.excerpt}</p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </AnimatedSection>
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

                {/* Desktop/tablet: 3-column grid */}
                <AnimatedText variant="fadeIn" delay={0.4}>
                    <div className="hidden md:grid md:grid-cols-3 mt-6 gap-6 py-4">
                        {displayArticles.slice(0, 3).map((a) => (
                            <Link key={a.slug} to={`/blog/${a.slug}`} className="group">
                                <div data-card className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/5 transition-transform duration-200 group-hover:scale-[1.02] flex flex-col h-full">
                                    <img
                                        src={a.featuredImage.url}
                                        alt={a.featuredImage.alt}
                                        className="h-48 lg:h-56 w-full object-cover"
                                    />
                                    <div className="p-4 flex-1 flex flex-col">
                                        <span className="rounded-full px-3 py-1.5 text-xs font-medium text-white w-fit" style={{ backgroundColor: a.category.color }}>{a.category.name}</span>
                                        <h3 className="mt-3 line-clamp-2 text-lg lg:text-xl font-semibold text-gray-900">{a.title}</h3>
                                        <div className="mt-2 text-xs text-gray-500">
                                            {new Date(a.publishedDate).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })} • {a.readTime} min read • {a.author.name}
                                        </div>
                                        <p className="mt-2 line-clamp-3 text-sm text-gray-600">{a.excerpt}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </AnimatedText>
            </div>
        </section>
    )
}
