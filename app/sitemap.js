export default function sitemap() {
    const baseUrl = "https://bluewaytradingcompany.vercel.app"
    return [
        {
            url:baseUrl,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 1,
        },
        {
            url:`${baseUrl}/products`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        }
    ]
}