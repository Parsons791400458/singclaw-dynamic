import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://singclaw.com'

  const routes = [
    // Core pages
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 1 },
    { url: `${baseUrl}/crypto`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.9 },
    { url: `${baseUrl}/crypto/bn-alpha`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.7 },
    { url: `${baseUrl}/crypto/watchlist`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.7 },
    { url: `${baseUrl}/crypto/signal-tracker`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.7 },
    { url: `${baseUrl}/crypto/backtest`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.7 },
    { url: `${baseUrl}/crypto/paper-trade`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.7 },
    { url: `${baseUrl}/crypto/review`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.7 },
    // Blog
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${baseUrl}/blog/36`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.85 },
    { url: `${baseUrl}/blog/24`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.85 },
    // Stars
    { url: `${baseUrl}/stars`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.7 },
    { url: `${baseUrl}/stars/match`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.7 },
    // Game
    { url: `${baseUrl}/game`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
    // Wiki
    { url: `${baseUrl}/wiki`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.7 },
    { url: `${baseUrl}/skills-wiki`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.6 },
    // Sprint & Team
    { url: `${baseUrl}/sprint`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.6 },
    { url: `${baseUrl}/team`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.5 },
  ]

  return routes.map(r => ({
    url: r.url,
    lastModified: r.lastModified,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }))
}
