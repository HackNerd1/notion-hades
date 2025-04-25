/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL,
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 7000,
  exclude: ['/api/*'],
  robotsTxtOptions: {
    additionalSitemaps: [],
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    transformRobotsTxt: async (config, robotsTxt) => {
      // 移除包含 Host 的行
      return robotsTxt.split('\n').filter(line => !line.startsWith('# Host') && !line.startsWith('Host:')).join('\n');
    },
  },
  additionalPaths: async (config) => {
    // 获取所有文章
    const results = []
    let hasMore = true
    let nextCursor = undefined
    while (hasMore) {
      const response = await fetch(`${process.env.SITE_URL}/api/posts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nextCursor })
      })

      const posts = await response.json()
      results.push(...posts.results)
      hasMore = posts.has_more
      nextCursor = posts.next_cursor
    }

    // 为每篇文章生成路径
    const paths = results.map((post) => ({
      loc: `/post/${post.id}`,
      changefreq: 'daily',
      priority: 0.8,
      lastmod: new Date(post.last_edited_time).toISOString(),
    }));

    return paths;
  },
} 