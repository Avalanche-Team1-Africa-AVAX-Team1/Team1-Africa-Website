import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect } from 'react';

// Article data structure
interface Article {
    slug: string;
    title: string;
    author: string;
    date: string;
    category: string;
    image: string;
    description?: string;
    content: string[];
}

// All articles data
const allArticles: Article[] = [
    // Featured Article
    {
        slug: "building-avalanche-infrastructure-africa",
        title: "Building Avalanche Infrastructure Across Africa",
        author: "Team1 Africa",
        date: "December 18, 2024",
        category: "Infrastructure",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200",
        content: [
            "Africa is experiencing a technological renaissance, and blockchain infrastructure is at the forefront of this transformation. Team1 Africa is leading the charge in building robust Avalanche infrastructure across the continent.",
            "Our mission is to create a decentralized ecosystem that empowers African developers, entrepreneurs, and communities to build innovative solutions on the Avalanche blockchain. From Lagos to Nairobi, from Cairo to Cape Town, we're establishing nodes, developer hubs, and educational programs.",
            "The infrastructure we're building isn't just about technology—it's about creating opportunities. We're training developers, supporting startups, and fostering a community of builders who are solving real African problems with blockchain technology.",
            "Through partnerships with local universities, tech hubs, and government initiatives, we're ensuring that the next generation of African developers has the tools and knowledge they need to succeed in the Web3 economy.",
            "Join us as we build the future of decentralized technology in Africa, one block at a time."
        ]
    },

    // Trending Articles
    {
        slug: "scaling-customer-success-web3",
        title: "Scaling Customer Success in Web3",
        author: "Amara Okafor",
        date: "December 15, 2024",
        category: "TESTIMONIAL",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600",
        description: "How African projects are building world-class customer success programs on Avalanche. Lessons from scaling from 10 to 10,000 users.",
        content: [
            "Scaling customer success in the Web3 space presents unique challenges, especially in emerging markets. Our journey from serving 10 users to 10,000 has taught us invaluable lessons about building sustainable customer relationships in the blockchain ecosystem.",
            "The key to our success has been understanding that Web3 customer success isn't just about technical support—it's about education, community building, and creating genuine value for users who are often new to blockchain technology.",
            "We've implemented a multi-tiered support system that combines automated onboarding, community-driven support, and dedicated success managers for enterprise clients. This approach has allowed us to scale efficiently while maintaining high satisfaction rates.",
            "Our metrics show that users who complete our onboarding program are 5x more likely to become active participants in the ecosystem. This has driven our focus on creating comprehensive educational content and interactive tutorials.",
            "The future of customer success in Web3 is about creating self-sustaining communities where users help each other grow and succeed together."
        ]
    },

    {
        slug: "proactive-efficient-payments",
        title: "Becoming More Proactive and Efficient",
        author: "Adam Cooney",
        date: "December 12, 2024",
        category: "TESTIMONIAL",
        image: "https://images.unsplash.com/photo-1556740749-887f6717d7e4?w=600",
        description: "Lagos-based fintech shares how Avalanche's subnet architecture enabled real-time payment processing at scale.",
        content: [
            "In the fast-paced world of African fintech, speed and efficiency aren't just competitive advantages—they're necessities. Our Lagos-based payment platform processes thousands of transactions daily, and Avalanche's subnet architecture has been transformative.",
            "Before adopting Avalanche subnets, we struggled with network congestion and high transaction fees during peak hours. The subnet architecture allowed us to create a dedicated blockchain environment optimized for our specific use case.",
            "Real-time payment processing is now a reality for our users. Transactions that previously took minutes now complete in seconds, with predictable fees that make microtransactions economically viable.",
            "The proactive monitoring and optimization capabilities built into our subnet have reduced our operational overhead by 40%. We can now identify and resolve issues before they impact our users.",
            "This efficiency has allowed us to expand our services to underserved communities across West Africa, bringing financial inclusion to millions who previously lacked access to digital payment systems."
        ]
    },

    {
        slug: "platform-every-insight",
        title: "One Platform for Every Insight",
        author: "Catherine De Verteuil",
        date: "December 10, 2024",
        category: "TESTIMONIAL",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600",
        description: "How data aggregation on Avalanche transformed decision-making for African enterprises.",
        content: [
            "Data-driven decision making is crucial for enterprise success, but fragmented data sources have long been a challenge for African businesses. Our platform leverages Avalanche's high-throughput capabilities to aggregate and analyze data in real-time.",
            "By building on Avalanche, we've created a unified platform that brings together data from multiple sources—supply chain, financial transactions, customer interactions, and market trends—all in one place.",
            "The transparency and immutability of blockchain technology have given our enterprise clients unprecedented confidence in their data. Every data point is verifiable, traceable, and tamper-proof.",
            "Our analytics engine processes millions of data points daily, providing insights that help businesses optimize operations, reduce costs, and identify new opportunities. The speed of Avalanche's consensus mechanism means these insights are available in real-time.",
            "African enterprises are now competing on a global stage with the same level of data intelligence as their international counterparts, all thanks to the power of decentralized data aggregation."
        ]
    },

    // Press Articles
    {
        slug: "team1-named-ecosystem-leader",
        title: "Team1 Africa Named Leading Avalanche Ecosystem Builder",
        author: "Press Release",
        date: "December 8, 2024",
        category: "PRESS",
        image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200",
        content: [
            "Team1 Africa has been officially recognized as a leading ecosystem builder in the Avalanche network, marking a significant milestone for blockchain development in Africa.",
            "The recognition comes after months of intensive work building infrastructure, training developers, and launching innovative projects across the African continent. Team1 Africa has established itself as the go-to organization for Avalanche development in the region.",
            "\"This recognition validates our vision of making Africa a major hub for blockchain innovation,\" said the Team1 Africa leadership. \"We're just getting started.\"",
            "The organization has trained over 500 developers, supported 50+ startups, and organized dozens of community events across major African cities. Their impact on the local tech ecosystem has been transformative.",
            "Looking ahead, Team1 Africa plans to expand its operations to additional countries and launch new initiatives focused on DeFi, NFTs, and enterprise blockchain solutions."
        ]
    },

    {
        slug: "subnets-power-african-fintech",
        title: "Avalanche Subnets Power African Financial Infrastructure",
        author: "Tech News Africa",
        date: "December 5, 2024",
        category: "PRESS",
        image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200",
        content: [
            "Avalanche's subnet technology is revolutionizing financial infrastructure across Africa, enabling faster, cheaper, and more secure financial services for millions of users.",
            "Multiple African fintech companies have adopted Avalanche subnets to power their payment platforms, remittance services, and digital banking solutions. The results have been remarkable—transaction speeds have increased by 10x while costs have decreased by 90%.",
            "\"Subnets give us the flexibility to customize our blockchain environment while maintaining the security and decentralization of the Avalanche network,\" explained one fintech CEO.",
            "The technology is particularly well-suited for Africa's unique challenges, including limited internet connectivity, high mobile usage, and the need for low-cost transactions. Subnets can be optimized for these specific requirements.",
            "Industry experts predict that Avalanche subnets will power the next generation of African financial infrastructure, bringing banking services to the unbanked and creating new economic opportunities across the continent."
        ]
    },

    {
        slug: "strategic-partnership-ava-labs",
        title: "Strategic Partnership with Ava Labs Announced",
        author: "Team1 Africa",
        date: "December 1, 2024",
        category: "PRESS",
        image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200",
        content: [
            "Team1 Africa and Ava Labs have announced a strategic partnership to accelerate blockchain adoption across the African continent. This collaboration will bring additional resources, expertise, and support to African developers and entrepreneurs.",
            "The partnership includes a dedicated fund for African blockchain projects, technical support from Ava Labs engineers, and joint marketing initiatives to raise awareness of Avalanche technology in Africa.",
            "\"Africa represents one of the most exciting opportunities for blockchain technology,\" said an Ava Labs spokesperson. \"Team1 Africa's deep understanding of the local market makes them the perfect partner for this initiative.\"",
            "The partnership will focus on three key areas: developer education, startup incubation, and enterprise adoption. Programs will be launched in multiple African countries over the coming months.",
            "This collaboration marks a new chapter in Africa's blockchain journey, with the potential to position the continent as a global leader in Web3 innovation."
        ]
    },

    // Impact Articles
    {
        slug: "making-impact-impossible-ignore",
        title: "Making Impact Impossible to Ignore",
        author: "Team1 Research",
        date: "Dec 15, 2024",
        category: "IMPACT",
        image: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=600",
        description: "Quantifying the transformation happening across African Web3",
        content: [
            "The impact of blockchain technology in Africa is no longer theoretical—it's measurable, quantifiable, and impossible to ignore. Our latest research reveals the transformative effect of Web3 adoption across the continent.",
            "Over the past year, African blockchain projects have created over 10,000 jobs, processed $2 billion in transactions, and brought financial services to 5 million previously unbanked individuals. These numbers tell a story of real economic transformation.",
            "The ripple effects extend beyond direct blockchain usage. Communities with active Web3 projects show increased digital literacy, higher entrepreneurship rates, and improved access to global markets.",
            "Our data shows that blockchain adoption is strongest in countries with young, tech-savvy populations and supportive regulatory environments. Nigeria, Kenya, and South Africa lead the way, but other nations are rapidly catching up.",
            "The next phase of growth will focus on sustainability and scalability. We're working to ensure that this impact continues to grow while remaining environmentally responsible and economically inclusive."
        ]
    },

    {
        slug: "lagos-nairobi-subnet-revolution",
        title: "From Lagos to Nairobi: The Subnet Revolution",
        author: "Marcus Osei",
        date: "Dec 12, 2024",
        category: "INFRASTRUCTURE",
        image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=600",
        description: "How custom blockchains are reshaping commerce across Africa",
        content: [
            "A quiet revolution is taking place in Africa's commercial centers. From the bustling markets of Lagos to the tech hubs of Nairobi, custom blockchain subnets are reshaping how business is conducted.",
            "Subnets offer African businesses something they've never had before: the ability to create blockchain infrastructure tailored to their specific needs, without sacrificing security or decentralization.",
            "In Lagos, a consortium of merchants has launched a subnet for supply chain tracking, reducing fraud and improving efficiency. In Nairobi, a group of cooperatives uses a subnet for transparent financial management and member voting.",
            "The beauty of subnets is their flexibility. Each can be customized for different use cases—some prioritize speed, others focus on privacy, and some optimize for low-cost transactions. This versatility makes them ideal for Africa's diverse economic landscape.",
            "As more businesses discover the power of custom subnets, we're seeing the emergence of a new commercial infrastructure—one that's transparent, efficient, and built for African needs."
        ]
    }
];

export default function ArticlePage() {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();

    const article = allArticles.find(a => a.slug === slug);

    useEffect(() => {
        // Scroll to top when article loads
        window.scrollTo(0, 0);
    }, [slug]);

    if (!article) {
        return (
            <div className="min-h-screen bg-white pt-32 pb-16">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
                    <p className="text-gray-600 mb-8">The article you're looking for doesn't exist.</p>
                    <button
                        onClick={() => navigate('/blog')}
                        className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                        Back to Editorial
                    </button>
                </div>
            </div>
        );
    }

    // Get related articles (same category, excluding current)
    const relatedArticles = allArticles
        .filter(a => a.category === article.category && a.slug !== article.slug)
        .slice(0, 3);

    return (
        <div className="min-h-screen bg-white pt-24 md:pt-28">
            {/* Back Button */}
            <div className="max-w-4xl mx-auto px-6 md:px-12 mb-8">
                <button
                    onClick={() => navigate('/blog')}
                    className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors group"
                >
                    <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Editorial
                </button>
            </div>

            {/* Article Header */}
            <article className="max-w-4xl mx-auto px-6 md:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Category Badge */}
                    <div className="mb-6">
                        <span className="inline-block px-4 py-2 bg-red-50 text-red-600 text-xs font-bold tracking-wider rounded-full">
                            {article.category}
                        </span>
                    </div>

                    {/* Title */}
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-6 leading-tight">
                        {article.title}
                    </h1>

                    {/* Meta Info */}
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-8 pb-8 border-b border-gray-200">
                        <span className="font-medium">{article.author}</span>
                        <span>•</span>
                        <span>{article.date}</span>
                    </div>

                    {/* Featured Image */}
                    <div className="relative aspect-[21/9] rounded-2xl overflow-hidden mb-12">
                        <img
                            src={article.image}
                            alt={article.title}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Article Content */}
                    <div className="prose prose-lg max-w-none mb-16">
                        {article.description && (
                            <p className="text-xl text-gray-700 leading-relaxed mb-8 font-medium">
                                {article.description}
                            </p>
                        )}

                        {article.content.map((paragraph, index) => (
                            <motion.p
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="text-gray-800 leading-relaxed mb-6"
                            >
                                {paragraph}
                            </motion.p>
                        ))}
                    </div>

                    {/* Share Section */}
                    <div className="border-t border-b border-gray-200 py-8 mb-16">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-600">Share this article</span>
                            <div className="flex gap-4">
                                <button className="w-10 h-10 rounded-full bg-gray-100 hover:bg-red-500 hover:text-white transition-colors flex items-center justify-center">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                                    </svg>
                                </button>
                                <button className="w-10 h-10 rounded-full bg-gray-100 hover:bg-red-500 hover:text-white transition-colors flex items-center justify-center">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                                        <circle cx="4" cy="4" r="2" />
                                    </svg>
                                </button>
                                <button className="w-10 h-10 rounded-full bg-gray-100 hover:bg-red-500 hover:text-white transition-colors flex items-center justify-center">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </article>

            {/* Related Articles */}
            {relatedArticles.length > 0 && (
                <section className="max-w-7xl mx-auto px-6 md:px-12 py-16 bg-gray-50">
                    <h2 className="text-3xl font-bold mb-8">Related Articles</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {relatedArticles.map((related, index) => (
                            <motion.div
                                key={related.slug}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                            >
                                <a
                                    href={`/blog/${related.slug}`}
                                    className="block group"
                                >
                                    <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-4">
                                        <img
                                            src={related.image}
                                            alt={related.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                        />
                                    </div>
                                    <div className="text-xs font-semibold text-gray-500 tracking-wider mb-2">
                                        {related.category}
                                    </div>
                                    <h3 className="text-xl font-bold mb-2 group-hover:text-red-600 transition-colors">
                                        {related.title}
                                    </h3>
                                    <div className="flex items-center gap-2 text-xs text-gray-500">
                                        <span className="font-medium">{related.author}</span>
                                        <span>•</span>
                                        <span>{related.date}</span>
                                    </div>
                                </a>
                            </motion.div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}
