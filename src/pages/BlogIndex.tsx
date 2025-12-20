import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { articles } from '../data/articles';


// Blog data matching Planhat editorial structure
const featuredArticle = {
  title: "Building Avalanche Infrastructure Across Africa",
  author: "Kwame Mensah",
  authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
  date: "December 18, 2024",
  image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200",
  slug: "building-avalanche-infrastructure-africa",
  category: "Infrastructure"
};

const trendingArticles = [
  {
    title: "Scaling Customer Success in Web3",
    description: "How African projects are building world-class customer success programs on Avalanche. Lessons from scaling from 10 to 10,000 users.",
    author: "Amara Okafor",
    authorAvatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100",
    category: "TESTIMONIAL",
    series: "Talking Builders",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600",
    slug: "scaling-customer-success-web3"
  },
  {
    title: "Becoming More Proactive and Efficient",
    description: "Lagos-based fintech shares how Avalanche's subnet architecture enabled real-time payment processing at scale.",
    author: "Adam Cooney",
    authorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
    category: "TESTIMONIAL",
    series: "Talking Builders",
    image: "https://images.unsplash.com/photo-1556740749-887f6717d7e4?w=600",
    slug: "proactive-efficient-payments"
  },
  {
    title: "One Platform for Every Insight",
    description: "How data aggregation on Avalanche transformed decision-making for African enterprises.",
    author: "Catherine De Verteuil",
    authorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
    category: "TESTIMONIAL",
    series: "Talking Builders",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600",
    slug: "platform-every-insight"
  }
];

const essentialReads = {
  title: "The Future of Decentralized Finance in Africa",
  subtitle: "A comprehensive analysis from Ava Labs on how DeFi is reshaping financial inclusion across the continent",
  link: "/blog/future-defi-africa",
  category: "ESSENTIAL READING",
  themes: ["DeFi", "Financial Inclusion", "Ava Labs", "Research"],
  image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800",
  author: "Ava Labs Research",
  source: "External"
};



const impactArticles = [
  {
    title: "Making Impact Impossible to Ignore",
    description: "Quantifying the transformation happening across African Web3",
    author: "Chidi Nwosu",
    authorAvatar: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=100",
    date: "Dec 15, 2024",
    image: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=600",
    slug: "making-impact-impossible-ignore",
    category: "IMPACT"
  },
  {
    title: "From Lagos to Nairobi: The Subnet Revolution",
    description: "How custom blockchains are reshaping commerce across Africa",
    author: "Marcus Osei",
    authorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
    date: "Dec 12, 2024",
    image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=600",
    slug: "lagos-nairobi-subnet-revolution",
    category: "INFRASTRUCTURE"
  }
];

const contributors = [
  { name: "Eric Szafran", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300", slug: "eric-szafran" },
  { name: "Alberto Lambert", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300", slug: "alberto-lambert" },
  { name: "Ardalan Khosrowpour", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300", slug: "ardalan-khosrowpour" },
  { name: "Marcus Osei", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300", slug: "marcus-osei" },
  { name: "Amara Okafor", image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=300", slug: "amara-okafor" },
  { name: "Adam Cooney", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300", slug: "adam-cooney" },
  { name: "Catherine De Verteuil", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300", slug: "catherine-de-verteuil" },
  { name: "David Mensah", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300", slug: "david-mensah" },
  { name: "Sarah Jallo", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300", slug: "sarah-jallo" },
  { name: "Kofi Boaitey", image: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=300", slug: "kofi-boaitey" },
  { name: "Fatima Benta", image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=300", slug: "fatima-benta" },
  { name: "Zainab Abba", image: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=300", slug: "zainab-abba" },
  { name: "Chidi Azeez", image: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=300", slug: "chidi-azeez" },
  { name: "Nadine Toure", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300", slug: "nadine-toure" },
  { name: "Oscar Mbeki", image: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=300", slug: "oscar-mbeki" },
  { name: "Laila Sadiki", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300", slug: "laila-sadiki" },
  { name: "Bemba Diop", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300", slug: "bemba-diop" },
  { name: "Yara Gidado", image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300", slug: "yara-gidado" },
  { name: "Tunde Ednut", image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=300", slug: "tunde-ednut" },
  { name: "Musa Keita", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300", slug: "musa-keita" }
];


export default function BlogIndex() {
  const [activeTag, setActiveTag] = useState('All');
  const tags = ['All', 'Tech talk', 'IRL Events', 'Gaming', 'Infrastructure'];

  const filteredArticles = activeTag === 'All'
    ? articles
    : articles.filter(article => article.tags?.includes(activeTag));

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
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="flex items-center gap-3 mb-8">
          <h2 className="text-xs font-bold tracking-[0.2em] text-gray-900 uppercase">Latest</h2>
          <span className="text-xs text-gray-500">• Most recent publication</span>
        </div>
        <a href={`/blog/${featuredArticle.slug}`} className="block group">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="relative aspect-[4/3] md:aspect-[21/9] rounded-xl overflow-hidden mb-6">
              <img
                src={featuredArticle.image}
                alt={featuredArticle.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-6 left-6">
                <span className="bg-red-600 text-white text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-wider shadow-lg">
                  Latest
                </span>
              </div>
            </div>
            <h2 className="text-3xl lt-480:text-3xl md:text-5xl lg:text-7xl font-serif mb-6 group-hover:text-red-600 transition-colors leading-tight">
              {featuredArticle.title}
            </h2>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-200">
                <img
                  src={featuredArticle.authorAvatar}
                  alt={featuredArticle.author}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-gray-900">{featuredArticle.author}</p>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span>{featuredArticle.date}</span>
                  <span>•</span>
                  <span>8 min read</span>
                </div>
              </div>
            </div>
          </motion.div>
        </a>
      </section>

      {/* Trending Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="flex items-center gap-3 mb-12">
          <h2 className="text-xs font-bold tracking-[0.2em] text-gray-900 uppercase">Trending</h2>
          <span className="text-xs text-gray-500">• Most viewed this week</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* LEFT SIDE - Single large portrait article with text below */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <a href={`/blog/${trendingArticles[0].slug}`} className="block group">
              {/* Portrait Image */}
              <div className="relative w-full aspect-[4/3] lg:aspect-[5/2] rounded-2xl overflow-hidden mb-4">
                <img
                  src={trendingArticles[0].image}
                  alt={trendingArticles[0].title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Text Content Below Image */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[10px] font-bold text-gray-500 tracking-[0.15em] uppercase">
                    {trendingArticles[0].category}
                  </span>
                  <button className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center group-hover:border-gray-900 transition-colors">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

                <h3 className="text-3xl font-serif mb-4 group-hover:text-red-600 transition-colors leading-tight">
                  {trendingArticles[0].title}
                </h3>

                <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                  {trendingArticles[0].description}
                </p>

                <div className="flex items-center gap-3 text-[10px] text-gray-500 tracking-wider">
                  <span className="font-semibold uppercase">{trendingArticles[0].series}</span>
                  <span>—</span>
                  <div className="flex items-center gap-2">
                    {trendingArticles[0].authorAvatar && (
                      <div className="w-5 h-5 rounded-full overflow-hidden border border-gray-300">
                        <img src={trendingArticles[0].authorAvatar} alt={trendingArticles[0].author} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <span className="uppercase">{trendingArticles[0].author}</span>
                  </div>
                </div>
              </div>
            </a>
          </motion.div>

          {/* RIGHT SIDE - Two articles with landscape images and text beside */}
          <div className="space-y-12">
            {trendingArticles.slice(1, 3).map((article, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i + 1) * 0.1 }}
              >
                <a href={`/blog/${article.slug}`} className="block group">
                  <div className="flex flex-col sm:flex-row gap-6 items-start">
                    {/* Landscape Image - Left */}
                    <div className="w-full sm:w-1/3 flex-shrink-0">
                      <div className="relative w-full aspect-square rounded-2xl overflow-hidden">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                    </div>

                    {/* Text Content - Right */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-[10px] font-bold text-gray-500 tracking-[0.15em] uppercase">
                          {article.category}
                        </span>
                        <button className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center group-hover:border-gray-900 transition-colors">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>

                      <h3 className="text-2xl font-serif mb-3 group-hover:text-red-600 transition-colors leading-tight">
                        {article.title}
                      </h3>

                      <div className="flex items-center gap-3 text-[10px] text-gray-500 tracking-wider">
                        <span className="font-semibold uppercase">{article.series}</span>
                        <span>—</span>
                        <div className="flex items-center gap-2">
                          {article.authorAvatar && (
                            <div className="w-5 h-5 rounded-full overflow-hidden border border-gray-300">
                              <img src={article.authorAvatar} alt={article.author} className="w-full h-full object-cover" />
                            </div>
                          )}
                          <span className="uppercase">{article.author}</span>
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

      {/* Essential Reads Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-6 md:p-8 lg:p-12 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center border border-gray-200">
          <div>
            <div className="flex items-center gap-3 mb-6 flex-wrap">
              <span className="text-xs font-black text-red-600 tracking-wider uppercase">{essentialReads.category}</span>
              {essentialReads.themes.map((theme, i) => (
                <span key={i} className="text-xs font-semibold text-gray-500 tracking-wider">• {theme}</span>
              ))}
            </div>
            <h2 className="text-3xl lt-768:text-3xl md:text-4xl lg:text-5xl font-serif mb-4">{essentialReads.title}</h2>
            <p className="text-lg md:text-xl text-gray-600 mb-6 md:mb-8">{essentialReads.subtitle}</p>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
                  {essentialReads.author.charAt(0)}
                </div>
                <span className="font-semibold text-gray-700">{essentialReads.author}</span>
              </div>
              <span className="text-xs text-gray-400">• {essentialReads.source}</span>
            </div>
            <a
              href={essentialReads.link}
              className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors"
            >
              Read Article
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
            <img
              src={essentialReads.image}
              alt={essentialReads.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>



      {/* Impact Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="flex items-center gap-3 mb-8">
          <h2 className="text-2xl font-bold">Impact</h2>
          <span className="text-sm text-gray-500">• Highest engagement & shares</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {impactArticles.map((article, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <a href={`/blog/${article.slug}`} className="block group">
                <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-4">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="text-xs font-semibold text-gray-500 tracking-wider mb-2">{article.category}</div>
                <h3 className="text-2xl font-bold mb-2 group-hover:text-red-600 transition-colors">
                  {article.title}
                </h3>
                <p className="text-gray-600 mb-3 text-sm">{article.description}</p>
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  {article.authorAvatar && (
                    <div className="w-6 h-6 rounded-full overflow-hidden border border-gray-200">
                      <img src={article.authorAvatar} alt={article.author} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <span className="font-medium">{article.author}</span>
                  <span>•</span>
                  <span>{article.date}</span>
                </div>
              </a>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contributors Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-24">
        <div className="flex flex-col md:flex-row md:items-center gap-12">
          <div className="flex-shrink-0">
            <h2 className="text-3xl font-black tracking-tighter mb-2">Active Contributors</h2>
            <p className="text-gray-500 text-sm font-medium">Join 20+ builders shaping the ecosystem</p>
          </div>

          <div className="flex -space-x-2 md:-space-x-3 overflow-visible py-8 px-4 flex-wrap items-center justify-center md:justify-start max-w-2xl">
            {contributors.map((contributor, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{
                  scale: 1.4,
                  zIndex: 50,
                  transition: { type: "spring", stiffness: 500, damping: 15 }
                }}
                animate={{
                  scale: 1,
                  transition: { type: "spring", stiffness: 500, damping: 30, duration: 0.2 }
                }}
                whileTap={{ scale: 0.9 }}
                className="relative group"
              >
                <a
                  href={`/blog/contributors/${contributor.slug}`}
                  className="block w-12 h-12 md:w-16 md:h-16 rounded-full border-[3px] md:border-4 border-white overflow-hidden shadow-lg bg-gray-200 cursor-pointer"
                >
                  <img
                    src={contributor.image}
                    alt={contributor.name}
                    className="w-full h-full object-cover transition-all duration-300"
                  />
                </a>

                {/* Bubble Tooltip - Refined */}
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 group-hover:-translate-y-2 transition-all duration-300 bg-black text-white text-[11px] font-black px-4 py-2 rounded-xl shadow-2xl whitespace-nowrap pointer-events-none z-[60]">
                  {contributor.name}
                  {/* Tooltip Arrow */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-black" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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
            {filteredArticles.map((article) => (
              <motion.div
                layout
                key={article.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <a href={`/blog/${article.slug}`} className="block group h-full">
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-4 shadow-md">
                    <img
                      src={article.featuredImage.url}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      {article.tags?.slice(0, 1).map((t, idx) => (
                        <span key={idx} className="bg-black/80 backdrop-blur-sm text-[10px] font-bold px-3 py-1 rounded-full text-white">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-[10px] font-bold text-red-600 tracking-wider uppercase mb-2">
                    {article.category.name}
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-red-600 transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                    {article.excerpt}
                  </p>

                  {/* Engagement Metrics */}
                  {article.engagement && (
                    <div className="flex items-center gap-4 mb-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                        </svg>
                        <span className="font-semibold">{article.engagement.likes}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                        </svg>
                        <span className="font-semibold">{article.engagement.shares}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                        </svg>
                        <span className="font-semibold">{article.engagement.comments}</span>
                      </div>
                    </div>
                  )}

                  {/* Author and Read Time */}
                  <div className="flex items-center gap-3 mt-auto pt-4 border-t border-gray-100">
                    {article.author.avatar ? (
                      <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-gray-100">
                        <img
                          src={article.author.avatar}
                          alt={article.author.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-white text-xs font-bold">
                        {article.author.name.charAt(0)}
                      </div>
                    )}
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-gray-900">{article.author.name}</p>
                      <p className="text-[10px] text-gray-500">{article.readTime} min read</p>
                    </div>
                  </div>
                </a>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}