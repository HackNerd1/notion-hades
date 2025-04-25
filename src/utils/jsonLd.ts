interface WebsiteData {
  name: string;
  description: string;
  siteUrl: string;
}

interface BlogPostData {
  title: string;
  description: string;
  url: string;
  imageUrl?: string;
  datePublished: string;
  dateModified: string;
  authorName: string;
}

export function generateWebsiteJsonLd(data: WebsiteData) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: data.name,
    description: data.description,
    url: data.siteUrl,
  };
}

export function generateBlogPostJsonLd(data: BlogPostData) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: data.title,
    description: data.description,
    url: data.url,
    image: data.imageUrl,
    datePublished: data.datePublished,
    dateModified: data.dateModified,
    author: {
      "@type": "Person",
      name: data.authorName,
    },
  };
}

export function generateBreadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
} 