import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { api, type Blog as ApiBlog, getImageUrl } from '../lib/api';

export default function BlogIndex() {
  const [blogs, setBlogs] = useState<ApiBlog[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTag, setActiveTag] = useState('All');
  const tags = ['All', 'Tech talk', 'IRL Events', 'Gaming', 'Infrastructure'];

  // Fetch blogs from API
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await api.getBlogs({ limit: 100 });
        setBlogs(response.items);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  // Get latest blog (most recent publishedAt)
  const latestBlog = blogs.length > 0
    ? blogs.sort((a, b) => new Date(b.publishedAt || b.createdAt || '').getTime() - new Date(a.publishedAt || a.createdAt || '').getTime())[0]
    : null;

  // Get trending blogs (next 3 after latest)
  const trendingBlogs = blogs.slice(1, 4);

  // Filter blogs by tag
  const filteredBlogs = activeTag === 'All'
    ? blogs
    : blogs.filter(blog => blog.tags?.includes(activeTag));

  if (loading) {
    return (
      <div className="min-h-screen bg-white pt-24 md:pt-28 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-red-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500 font-medium">Loading Editorial...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-24 md:pt-28">
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-8 md:py-12">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl md:text-4xl font-serif">Editorial</h1>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Featured Article - Latest */}
      {latestBlog && (
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-16">
          <div className="flex items-center gap-3 mb-8">
            <h2 className="text-xs font-bold tracking-[0.2em] text-gray-900 uppercase">Latest</h2>
            <span className="text-xs text-gray-500">• Most recent publication</span>
          </div>
          <a href={`/blog/${latestBlog.id}`} className="block group">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="relative aspect-[4/3] md:aspect-[21/9] rounded-xl overflow-hidden mb-6">
                <img
                  src={getImageUrl(latestBlog.coverImage) || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200'}
                  alt={latestBlog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-6 left-6">
                  <span className="bg-red-600 text-white text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-wider shadow-lg">
                    Latest
                  </span>
                </div>
              </div>
              <h2 className="text-3xl lt-480:text-3xl md:text-5xl lg:text-7xl font-serif mb-6 group-hover:text-red-600 transition-colors leading-tight">
                {latestBlog.title}
              </h2>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-200">
                  <img
                    src={getImageUrl(latestBlog.customAuthorAvatar || latestBlog.author?.avatar) || `https://ui-avatars.com/api/?name=${encodeURIComponent(latestBlog.customAuthorName || latestBlog.author?.name || 'Team1')}&background=random`}
                    alt={latestBlog.customAuthorName || latestBlog.author?.name || 'Author'}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-gray-900">{latestBlog.customAuthorName || latestBlog.author?.name || 'Team1 Africa'}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>{new Date(latestBlog.publishedAt || latestBlog.createdAt || '').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                    <span>•</span>
                    <span>8 min read</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </a>
        </section>
      )}

      {/* Trending Section */}
      {trendingBlogs.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-16">
          <div className="flex items-center gap-3 mb-12">
            <h2 className="text-xs font-bold tracking-[0.2em] text-gray-900 uppercase">Trending</h2>
            <span className="text-xs text-gray-500">• Most viewed this week</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* LEFT SIDE - Single large portrait article with text below */}
            {trendingBlogs[0] && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <a href={`/blog/${trendingBlogs[0].id}`} className="block group">
                  {/* Portrait Image */}
                  <div className="relative w-full aspect-[4/3] lg:aspect-[5/2] rounded-2xl overflow-hidden mb-4">
                    <img
                      src={getImageUrl(trendingBlogs[0].coverImage) || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600'}
                      alt={trendingBlogs[0].title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>

                  {/* Text Content Below Image */}
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-[10px] font-bold text-gray-500 tracking-[0.15em] uppercase">
                        {trendingBlogs[0].category || 'ARTICLE'}
                      </span>
                      <button className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center group-hover:border-gray-900 transition-colors">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>

                    <h3 className="text-3xl font-serif mb-4 group-hover:text-red-600 transition-colors leading-tight">
                      {trendingBlogs[0].title}
                    </h3>

                    <p className="text-sm text-gray-700 mb-4 leading-relaxed line-clamp-3">
                      {trendingBlogs[0].excerpt || trendingBlogs[0].content?.replace(/<[^>]*>/g, '').substring(0, 150) + '...'}
                    </p>

                    <div className="flex items-center gap-3 text-[10px] text-gray-500 tracking-wider">
                      <div className="flex items-center gap-2">
                        {(trendingBlogs[0].customAuthorAvatar || trendingBlogs[0].author?.avatar) && (
                          <div className="w-5 h-5 rounded-full overflow-hidden border border-gray-300">
                            <img src={getImageUrl(trendingBlogs[0].customAuthorAvatar || trendingBlogs[0].author?.avatar) || ''} alt={trendingBlogs[0].customAuthorName || trendingBlogs[0].author?.name} className="w-full h-full object-cover" />
                          </div>
                        )}
                        <span className="uppercase">{trendingBlogs[0].customAuthorName || trendingBlogs[0].author?.name || 'Team1 Africa'}</span>
                      </div>
                    </div>
                  </div>
                </a>
              </motion.div>
            )}

            {/* RIGHT SIDE - Two articles with landscape images and text beside */}
            <div className="space-y-12">
              {trendingBlogs.slice(1, 3).map((blog, i) => (
                <motion.div
                  key={blog.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i + 1) * 0.1 }}
                >
                  <a href={`/blog/${blog.id}`} className="block group">
                    <div className="flex flex-col sm:flex-row gap-6 items-start">
                      {/* Landscape Image - Left */}
                      <div className="w-full sm:w-1/3 flex-shrink-0">
                        <div className="relative w-full aspect-square rounded-2xl overflow-hidden">
                          <img
                            src={getImageUrl(blog.coverImage) || 'https://images.unsplash.com/photo-1556740749-887f6717d7e4?w=600'}
                            alt={blog.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                        </div>
                      </div>

                      {/* Text Content - Right */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-[10px] font-bold text-gray-500 tracking-[0.15em] uppercase">
                            {blog.category || 'ARTICLE'}
                          </span>
                          <button className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center group-hover:border-gray-900 transition-colors">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                        </div>

                        <h3 className="text-2xl font-serif mb-3 group-hover:text-red-600 transition-colors leading-tight">
                          {blog.title}
                        </h3>

                        <div className="flex items-center gap-3 text-[10px] text-gray-500 tracking-wider">
                          <div className="flex items-center gap-2">
                            {(blog.customAuthorAvatar || blog.author?.avatar) && (
                              <div className="w-5 h-5 rounded-full overflow-hidden border border-gray-300">
                                <img src={getImageUrl(blog.customAuthorAvatar || blog.author?.avatar)} alt={blog.customAuthorName || blog.author?.name} className="w-full h-full object-cover" />
                              </div>
                            )}
                            <span className="uppercase">{blog.customAuthorName || blog.author?.name || 'Team1 Africa'}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Articles Grid Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16 pb-32 border-t border-gray-100 mt-16">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
          <h2 className="text-3xl font-bold tracking-tight">More from the Ecosystem</h2>

          <div className="flex items-center gap-2 overflow-x-auto pb-4 md:pb-0 no-scrollbar">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${activeTag === tag
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode='popLayout'>
            {filteredBlogs.map((blog) => (
              <motion.div
                layout
                key={blog.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <a href={`/blog/${blog.id}`} className="block group h-full">
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-4 shadow-md">
                    <img
                      src={getImageUrl(blog.coverImage) || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600'}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      {blog.tags?.slice(0, 1).map((t, idx) => (
                        <span key={idx} className="bg-black/80 backdrop-blur-sm text-[10px] font-bold px-3 py-1 rounded-full text-white">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-[10px] font-bold text-red-600 tracking-wider uppercase mb-2">
                    {blog.category || 'ARTICLE'}
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-red-600 transition-colors line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                    {blog.excerpt || blog.content?.replace(/<[^>]*>/g, '').substring(0, 120) + '...'}
                  </p>

                  {/* Author and Read Time */}
                  <div className="flex items-center gap-3 mt-auto pt-4 border-t border-gray-100">
                    {(blog.customAuthorAvatar || blog.author?.avatar) ? (
                      <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-gray-100">
                        <img
                          src={getImageUrl(blog.customAuthorAvatar || blog.author?.avatar) || ''}
                          alt={blog.customAuthorName || blog.author?.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-white text-xs font-bold">
                        {(blog.customAuthorName || blog.author?.name || 'T').charAt(0)}
                      </div>
                    )}
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-gray-900">{blog.customAuthorName || blog.author?.name || 'Team1 Africa'}</p>
                      <p className="text-[10px] text-gray-500">{new Date(blog.publishedAt || blog.createdAt || '').toLocaleDateString()}</p>
                    </div>
                  </div>
                </a>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredBlogs.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No articles found for this category.</p>
          </div>
        )}
      </section>
    </div>
  );
}