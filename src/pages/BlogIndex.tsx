import { motion } from 'framer-motion';


// Blog data matching Planhat editorial structure
const featuredArticle = {
  title: "Building Avalanche Infrastructure Across Africa",
  author: "Team1 Africa",
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
    category: "TESTIMONIAL",
    series: "Talking Builders",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600",
    slug: "scaling-customer-success-web3"
  },
  {
    title: "Becoming More Proactive and Efficient",
    description: "Lagos-based fintech shares how Avalanche's subnet architecture enabled real-time payment processing at scale.",
    author: "Adam Cooney",
    category: "TESTIMONIAL",
    series: "Talking Builders",
    image: "https://images.unsplash.com/photo-1556740749-887f6717d7e4?w=600",
    slug: "proactive-efficient-payments"
  },
  {
    title: "One Platform for Every Insight",
    description: "How data aggregation on Avalanche transformed decision-making for African enterprises.",
    author: "Catherine De Verteuil",
    category: "TESTIMONIAL",
    series: "Talking Builders",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600",
    slug: "platform-every-insight"
  }
];

const builderEvent = {
  title: "Builder's Hour: Subnets",
  subtitle: "Custom infrastructure that scales",
  link: "/events/builders-hour-subnets",
  category: "DEMONSTRATION",
  themes: ["Demonstration", "Subnets", "Avalanche", "Innovation"],
  image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800"
};

const pressArticles = [
  {
    title: "Team1 Africa Named Leading Avalanche Ecosystem Builder",
    slug: "team1-named-ecosystem-leader"
  },
  {
    title: "Avalanche Subnets Power African Financial Infrastructure",
    slug: "subnets-power-african-fintech"
  },
  {
    title: "Strategic Partnership with Ava Labs Announced",
    slug: "strategic-partnership-ava-labs"
  }
];

const impactArticles = [
  {
    title: "Making Impact Impossible to Ignore",
    description: "Quantifying the transformation happening across African Web3",
    author: "Team1 Research",
    date: "Dec 15, 2024",
    image: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=600",
    slug: "making-impact-impossible-ignore",
    category: "IMPACT"
  },
  {
    title: "From Lagos to Nairobi: The Subnet Revolution",
    description: "How custom blockchains are reshaping commerce across Africa",
    author: "Marcus Osei",
    date: "Dec 12, 2024",
    image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=600",
    slug: "lagos-nairobi-subnet-revolution",
    category: "INFRASTRUCTURE"
  }
];

const contributors = [
  {
    name: "Eric Szafran",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300",
    slug: "eric-szafran"
  },
  {
    name: "Alberto Lambert",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300",
    slug: "alberto-lambert"
  },
  {
    name: "Ardalan Khosrowpour",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300",
    slug: "ardalan-khosrowpour"
  }
];

const dontMissArticles = [
  "Scaling Customer-Centricity",
  "Becoming More Proactive and Efficient",
  "One Place for Every Insight",
  "Scaling Impact with Speed & Flexibility",
  "Moving Faster Together",
  "Defining What You Need From Your Customer Platform",
  "The Rise of the Forward-Deployed Developer",
  "Subnet Architecture Best Practices",
  "Vertical Integration in African Web3",
  "Serving an Exploding Customer Base",
  "When Founders Lead Engineering",
  "Platform Upgrade: Custom VMs",
  "Cross-Chain Integration Demo",
  "African Builders Are Leading",
  "The Real Job Isn't Support—It's Innovation",
  "The Feedback Loop: Dev and Product Collaboration",
  "When Community Shapes the Roadmap",
  "Redefining Feature Adoption",
  "The Work We Won't Let Our Teams Do",
  "Open Source Contribution Guide",
  "Mastering Digital Payment Infrastructure",
  "Learnings From Avalanche Summit",
  "Outcome-Based Development",
  "How To Create Developer Programs",
  "AI in Blockchain Development",
  "Raising the Bar for African Tech",
  "Introducing: Smart Contract Templates",
  "The Infinite Frontier of Subnets",
  "Risk Management in DeFi",
  "Scaled Infrastructure Solutions"
];

export default function BlogIndex() {

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-serif">Editorial</h1>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Featured Article */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <a href={`/blog/${featuredArticle.slug}`} className="block group">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-5xl md:text-7xl font-serif mb-8 group-hover:text-red-600 transition-colors">
              {featuredArticle.title}
            </h2>
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-8">
              <span className="font-medium">{featuredArticle.author}</span>
              <span>•</span>
              <span>{featuredArticle.date}</span>
            </div>
            <div className="relative aspect-[21/9] rounded-xl overflow-hidden">
              <img
                src={featuredArticle.image}
                alt={featuredArticle.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </motion.div>
        </a>
      </section>

      {/* Trending Section - EXACT LAYOUT FROM REFERENCE */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <h2 className="text-xs font-bold mb-12 tracking-[0.2em] text-gray-900">TRENDING</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* LEFT SIDE - Single large portrait article with text below */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <a href={`/blog/${trendingArticles[0].slug}`} className="block group">
              {/* Portrait Image */}
              <div className="relative w-full aspect-[3/3] lg:aspect-[5/2] rounded-2xl overflow-hidden mb-4">
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

                <div className="flex items-center gap-2 text-[10px] text-gray-500 tracking-wider">
                  <span className="font-semibold uppercase">{trendingArticles[0].series}</span>
                  <span>—</span>
                  <span className="uppercase">{trendingArticles[0].author}</span>
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

                      <div className="flex items-center gap-2 text-[10px] text-gray-500 tracking-wider">
                        <span className="font-semibold uppercase">{article.series}</span>
                        <span>—</span>
                        <span className="uppercase">{article.author}</span>
                      </div>
                    </div>
                  </div>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Builder Event Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="bg-gray-50 rounded-3xl p-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-xs font-semibold text-gray-500 tracking-wider">{builderEvent.category}</span>
              {builderEvent.themes.map((theme, i) => (
                <span key={i} className="text-xs font-semibold text-gray-500 tracking-wider">• {theme}</span>
              ))}
            </div>
            <h2 className="text-5xl font-serif mb-4">{builderEvent.title}</h2>
            <p className="text-xl text-gray-600 mb-8">{builderEvent.subtitle}</p>
            <a
              href={builderEvent.link}
              className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors"
            >
              Discover Events
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
            <img
              src={builderEvent.image}
              alt={builderEvent.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Press Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <h2 className="text-2xl font-bold mb-8">Press</h2>
        <div className="space-y-4">
          {pressArticles.map((article, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <a
                href={`/blog/${article.slug}`}
                className="block py-4 border-b border-gray-200 hover:pl-4 transition-all duration-300 group"
              >
                <span className="text-lg font-medium group-hover:text-red-600 transition-colors">
                  {article.title}
                </span>
              </a>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Impact Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <h2 className="text-2xl font-bold mb-8">Impact</h2>
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
                <div className="flex items-center gap-2 text-xs text-gray-500">
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
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <h2 className="text-2xl font-bold mb-8">Contributors</h2>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
          {contributors.map((contributor, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <a href={`/blog/contributors/${contributor.slug}`} className="block group text-center">
                <div className="relative w-20 h-20 mx-auto mb-2 rounded-full overflow-hidden">
                  <img
                    src={contributor.image}
                    alt={contributor.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <p className="text-xs font-medium group-hover:text-red-600 transition-colors">
                  {contributor.name}
                </p>
              </a>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Don't Miss These Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16 pb-32">
        <h2 className="text-2xl font-bold mb-8">Don't Miss these</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
          {dontMissArticles.map((title, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.02 }}
            >
              <a
                href={`/blog/${title.toLowerCase().replace(/\s+/g, '-')}`}
                className="block py-2 text-sm hover:text-red-600 hover:pl-2 transition-all duration-200"
              >
                {title}
              </a>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}