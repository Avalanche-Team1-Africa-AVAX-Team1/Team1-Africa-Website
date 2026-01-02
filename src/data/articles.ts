import type { Article } from '../types/blog'

// Helper to format ISO date strings consistently
const toISO = (d: string) => new Date(d).toISOString()

// These slugs and images match the articles in ArticlePage.tsx that have full content
export const articles: Article[] = [
  {
    id: '1',
    slug: 'building-avalanche-infrastructure-africa',
    title: 'Building Avalanche Infrastructure Across Africa',
    excerpt:
      'Africa is experiencing a technological renaissance, and blockchain infrastructure is at the forefront of this transformation. Team1 Africa is leading the charge.',
    content:
      `<p>Africa is experiencing a technological renaissance, and blockchain infrastructure is at the forefront of this transformation. Team1 Africa is leading the charge in building robust Avalanche infrastructure across the continent.</p>`,
    featuredImage: { url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200', alt: 'Building Avalanche Infrastructure' },
    category: { name: 'Infrastructure', color: '#FF5A5F', slug: 'infrastructure' },
    author: { name: 'Kwame Mensah', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100' },
    publishedDate: toISO('2024-12-18'),
    readTime: 5,
    tags: ['Infrastructure', 'Africa'],
    engagement: { likes: 342, shares: 89, comments: 56 }
  },
  {
    id: '2',
    slug: 'scaling-customer-success-web3',
    title: 'Scaling Customer Success in Web3',
    excerpt: 'How African projects are building world-class customer success programs on Avalanche. Lessons from scaling from 10 to 10,000 users.',
    content: '<p>Scaling customer success in the Web3 space presents unique challenges, especially in emerging markets.</p>',
    featuredImage: { url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800', alt: 'Customer Success' },
    category: { name: 'Testimonial', color: '#3B82F6', slug: 'testimonial' },
    author: { name: 'Amara Okafor', avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100' },
    publishedDate: toISO('2024-12-15'),
    readTime: 5,
    tags: ['Testimonial', 'Web3'],
    engagement: { likes: 287, shares: 64, comments: 42 }
  },
  {
    id: '3',
    slug: 'team1-named-ecosystem-leader',
    title: 'Team1 Africa Named Leading Avalanche Ecosystem Builder',
    excerpt: 'Team1 Africa has been officially recognized as a leading ecosystem builder in the Avalanche network, marking a significant milestone for blockchain development in Africa.',
    content: '<p>Team1 Africa has been officially recognized as a leading ecosystem builder in the Avalanche network.</p>',
    featuredImage: { url: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200', alt: 'Team1 Recognition' },
    category: { name: 'Press', color: '#10B981', slug: 'press' },
    author: { name: 'Press Release', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100' },
    publishedDate: toISO('2024-12-08'),
    readTime: 4,
    tags: ['Press', 'Recognition'],
    engagement: { likes: 412, shares: 128, comments: 67 }
  },
  {
    id: '4',
    slug: 'subnets-power-african-fintech',
    title: 'Avalanche Subnets Power African Financial Infrastructure',
    excerpt: 'Avalanche\'s subnet technology is revolutionizing financial infrastructure across Africa, enabling faster, cheaper, and more secure financial services.',
    content: '<p>Avalanche\'s subnet technology is revolutionizing financial infrastructure across Africa.</p>',
    featuredImage: { url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200', alt: 'African Fintech' },
    category: { name: 'Press', color: '#8B5CF6', slug: 'press' },
    author: { name: 'Tech News Africa', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100' },
    publishedDate: toISO('2024-12-05'),
    readTime: 6,
    tags: ['Subnets', 'Fintech'],
    engagement: { likes: 324, shares: 95, comments: 54 }
  },
  {
    id: '5',
    slug: 'making-impact-impossible-ignore',
    title: 'Making Impact Impossible to Ignore',
    excerpt: 'The impact of blockchain technology in Africa is no longer theoretical—it\'s measurable, quantifiable, and impossible to ignore.',
    content: '<p>The impact of blockchain technology in Africa is no longer theoretical.</p>',
    featuredImage: { url: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800', alt: 'Impact' },
    category: { name: 'Impact', color: '#F59E0B', slug: 'impact' },
    author: { name: 'Chidi Nwosu', avatar: 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=100' },
    publishedDate: toISO('2024-12-15'),
    readTime: 5,
    tags: ['Impact', 'Africa'],
    engagement: { likes: 267, shares: 78, comments: 45 }
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
