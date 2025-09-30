import type { Article } from '../types/blog'
import avaxImg from '../assets/avax.png'
import avalancheLogo from '../assets/avalanche_logo.png'
import communityImg from '../assets/community.png'
import collageImg from '../assets/collage.png'

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
      `<p>Avalanche is powering a new wave of innovation across Africa. From <strong>payments and remittances</strong> to <strong>identity and supply chain</strong>, builders are leveraging fast finality and low fees to deliver real value.</p>
      <h2>Why Avalanche?</h2>
      <ul><li>High throughput and sub-second finality</li><li>Low and predictable fees</li><li>Subnets for app-specific chains</li></ul>
      <blockquote>“We can finally ship products that users love without making them pay a premium.” — Team1 Africa</blockquote>
      <p>Explore projects, grants, and community programs supporting developers in the region.</p>`,
    featuredImage: { url: avalancheLogo, alt: 'Avalanche logo with coins' },
    category: { name: 'Education', color: '#FF5A5F', slug: 'education' },
    author: { name: 'Avalanche Team1' },
    publishedDate: toISO('2025-08-20'),
    readTime: 5,
    tags: ['avalanche', 'africa', 'education']
  },
  {
    id: '2',
    slug: 'from-campus-to-code-university-clubs-teaching-blockchain',
    title: 'From Campus to Code: How University Clubs Are Teaching Blockchain',
    excerpt:
      'Explore how student-led clubs in Kenya, Nigeria, and Ghana are incorporating Avalanche into tech education with Team1 Africa’s support.',
    content:
      `<p>Student communities are the beating heart of the ecosystem. We profile several clubs and their approach to hands-on learning.</p>
      <h2>What they’re building</h2>
      <ol><li>Hackathon dApps</li><li>Open-source tooling</li><li>On-chain credentials</li></ol>
      <p>Want to start a club? Reach out to join our community.</p>`,
    featuredImage: { url: communityImg, alt: 'Student developer community' },
    category: { name: 'Gaming', color: '#EF4444', slug: 'gaming' },
    author: { name: 'Avalanche Team1' },
    publishedDate: toISO('2025-08-19'),
    readTime: 3,
    tags: ['education', 'clubs']
  },
  {
    id: '3',
    slug: 'team1-africa-monthly-recap-july-2025',
    title: 'Team1 Africa Monthly Recap – July 2025',
    excerpt:
      'A full roundup of July’s community activities: builder meetups, artist showcases, AMAs, and more.',
    content:
      `<p>July was packed: workshops, new partnerships, and dozens of new builders onboarding to Avalanche.</p>
      <h2>Highlights</h2>
      <ul><li>Developer workshops in 4 cities</li><li>Launch of educator toolkit</li><li>New open grants</li></ul>
      <p>See photos and session recordings inside.</p>`,
    featuredImage: { url: avaxImg, alt: 'Red Avalanche mark and gold coins' },
    category: { name: 'Team1 Africa', color: '#FF3B30', slug: 'team1-africa' },
    author: { name: 'Avalanche Team1' },
    publishedDate: toISO('2025-08-17'),
    readTime: 4,
    tags: ['recap']
  },
  {
    id: '4',
    slug: 'women-in-web3-how-avalanche-empowers-creators',
    title: 'Women in Web3: How Avalanche is Empowering Female Creators and Entrepreneurs',
    excerpt:
      'We highlight the women leading the community through education, mentorship, and on-chain entrepreneurship.',
    content:
      `<p>Diversity strengthens ecosystems. Learn about programs designed to empower women founders and creators building on Avalanche.</p>
      <h2>Community Programs</h2>
      <p>Across Africa and beyond, community leads are organizing workshops, office hours, and mentorship circles that help more women ship their first dApps. These programs emphasize practical skills: key management, smart contract patterns, security basics, and user onboarding.</p>
      <h3>Mentorship that compounds</h3>
      <p>Mentors pair weekly with cohorts to review product designs, track metrics, and prepare demos for community calls. By focusing on repeatable playbooks, cohorts share resources—grant templates, starter repositories, and content kits—so each group moves faster than the last.</p>
      <blockquote>“When founders feel seen and supported, they tend to out-execute expectations.”</blockquote>
      <h2>What they are building</h2>
      <ul>
        <li>Creator marketplaces using Subnets for predictable fees and compliance boundaries.</li>
        <li>On-chain microgrants for art collectives and local communities.</li>
        <li>Reputation primitives for verifiable teaching, speaking, and community leadership.</li>
      </ul>
      <p>These stories are only a glimpse of a growing movement. If you want to participate—whether as a mentor, creator, or partner—reach out to join our next cohort.</p>`,
    featuredImage: { url: collageImg, alt: 'Collage of community highlights' },
    category: { name: 'Education', color: '#F97316', slug: 'education' },
    author: { name: 'Avalanche Team1' },
    publishedDate: toISO('2025-08-10'),
    readTime: 6
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

