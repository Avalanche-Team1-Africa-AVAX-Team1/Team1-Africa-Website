export type ArticleCategory = {
  name: string
  color: string
  slug: string
}

export type ArticleAuthor = {
  name: string
  avatar?: string
}

export type ArticleImage = {
  url: string
  alt: string
}

export type Article = {
  id: string | number
  slug: string
  title: string
  excerpt: string
  content: string
  featuredImage: ArticleImage
  category: ArticleCategory
  author: ArticleAuthor
  publishedDate: string | Date
  readTime: number
  tags?: string[]
}

export type ApiResult<T> = {
  data?: T
  error?: string
}

