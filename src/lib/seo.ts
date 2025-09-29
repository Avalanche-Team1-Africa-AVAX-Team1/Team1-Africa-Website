type SeoInput = {
  title?: string
  description?: string
  image?: string
  url?: string
}

export function setPageSeo({ title, description, image, url }: SeoInput) {
  if (title) document.title = title

  const ensureMeta = (name: string, attr: 'name' | 'property' = 'name') => {
    let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null
    if (!el) {
      el = document.createElement('meta')
      el.setAttribute(attr, name)
      document.head.appendChild(el)
    }
    return el
  }

  if (description) {
    ensureMeta('description').setAttribute('content', description)
    ensureMeta('og:description', 'property').setAttribute('content', description)
  }
  if (title) {
    ensureMeta('og:title', 'property').setAttribute('content', title)
  }
  if (image) {
    ensureMeta('og:image', 'property').setAttribute('content', image)
  }
  if (url) {
    ensureMeta('og:url', 'property').setAttribute('content', url)
  }
}

