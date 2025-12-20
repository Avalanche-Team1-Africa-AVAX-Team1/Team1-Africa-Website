import type { Article } from '../types/blog'
import avaxImg from '../assets/avax.png'
import avaxImgWebp from '../assets/avax.webp'
import avalancheLogo from '../assets/avalanche_logo.png'
import avalancheLogoWebp from '../assets/avalanche_logo.webp'
import communityImg from '../assets/community.png'
import communityImgWebp from '../assets/community.webp'
import collageImg from '../assets/collage.png'
import collageImgWebp from '../assets/collage.webp'

// Helper to format ISO date strings consistently
const toISO = (d: string) => new Date(d).toISOString()

export const articles: Article[] = [
  {
    id: '1',
    slug: 'africa-on-avalanche-building-web3-real-world-impact',
    title: 'Africa on Avalanche: Building Web3 Solutions for Real-World Impact',
    excerpt:
      'Discover how African developers are leveraging Avalanche’s scalability to create decentralized applications that solve local problems.',
    content:
      `<p>Avalanche is powering a new wave of innovation across Africa...</p>`,
    featuredImage: { url: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800', alt: 'Blockchain technology' },
    category: { name: 'Education', color: '#FF5A5F', slug: 'education' },
    author: { name: 'Kwame Mensah', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100' },
    publishedDate: toISO('2024-12-20'),
    readTime: 5,
    tags: ['Tech talk', 'Infrastructure']
  },
  {
    id: '2',
    slug: 'scaling-customer-success-web3',
    title: 'Scaling Customer Success in Web3',
    excerpt: 'How African projects are building world-class customer success programs on Avalanche.',
    content: '<p>Content...</p>',
    featuredImage: { url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800', alt: 'Customer success' },
    category: { name: 'Tech talk', color: '#3B82F6', slug: 'tech-talk' },
    author: { name: 'Amara Okafor', avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100' },
    publishedDate: toISO('2024-12-19'),
    readTime: 5,
    tags: ['Tech talk', 'IRL Events']
  },
  {
    id: '3',
    slug: 'gaming-on-avalanche-africa',
    title: 'The Infinite Frontier of Subnets',
    excerpt: 'How Subnets are revolutionizing the gaming industry in Africa.',
    content: '<p>Content...</p>',
    featuredImage: { url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800', alt: 'Gaming' },
    category: { name: 'Gaming', color: '#EF4444', slug: 'gaming' },
    author: { name: 'Chidi Nwosu', avatar: 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=100' },
    publishedDate: toISO('2024-12-18'),
    readTime: 8,
    tags: ['Gaming', 'Infrastructure']
  },
  {
    id: '4',
    slug: 'irl-events-recap-2024',
    title: 'IRL Events: Connecting Builders in Person',
    excerpt: 'A look back at our physical meetups and hackathons across the continent.',
    content: '<p>Content...</p>',
    featuredImage: { url: collageImg, urlWebp: collageImgWebp, alt: 'IRL Events' },
    category: { name: 'IRL Events', color: '#10B981', slug: 'irl-events' },
    author: { name: 'Marcus Osei', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100' },
    publishedDate: toISO('2024-12-17'),
    readTime: 4,
    tags: ['IRL Events', 'Community']
  }
]

export function findArticleBySlug(slug: string) {
  return articles.find(a => a.slug === slug)
}

export function getRelatedArticles(slug: string, limit = 3) {
  const current = findArticleBySlug(slug)
  if (!current) return articles.slice(0, limit)
  const sameCategory = articles.filter(a => a.category.slug === current.category.slug && a.slug !== slug)
  const pool = sameCategory.length ? sameCategory : articles.filter(a => a.slug !== slug)
  return pool.slice(0, limit)
}
