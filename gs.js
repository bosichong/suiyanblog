const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const postsDirectory = path.join(process.cwd(), 'md');
const publicDir = path.join(process.cwd(), 'public');

function getSortedPostsData() {
    // ... (This function remains the same as before)
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames.map(fileName => {
        const id = fileName.replace(/\.md$/, '');
        const filePath = path.join(postsDirectory, fileName);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const matterResult = matter(fileContent);
        const { data } = matterResult;

        if (!data.time || !isValidDate(data.time)) {
            console.error(`Invalid date in file: ${fileName}`);
            return null;
        }

        return {
            id,
            ...data,
            content: matterResult.content,
        };
    }).filter(post => post !== null).sort((a, b) => {
        if (!a.time || !b.time) {
            return 0;
        }
        return new Date(b.time) - new Date(a.time);
    });
}

function isValidDate(dateStr) {
    const date = new Date(dateStr);
    return !isNaN(date.getTime());
}

function generateSitemap() {
    const allPostsData = getSortedPostsData();
    const urls = allPostsData.map(post => ({
        url: `https://www.suiyan.cc/blog/${post.id}`,
        lastModified: new Date(post.time).toISOString(),
        changeFrequency: 'monthly',
        priority: 0.8,
    }));

    const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map(url =>`
    <url>
        <loc>${url.url}</loc>
        <lastmod>${url.lastModified}</lastmod>
        <changefreq>${url.changeFrequency}</changefreq>
        <priority>${url.priority}</priority>
    </url>
`).join('')}</urlset>
`;

    // 保存 sitemap_blogs.xml
    const sitemapBlogsPath = path.join(publicDir, 'sitemap_blogs.xml');
    fs.writeFileSync(sitemapBlogsPath, xmlContent);

    // 生成 sitemap.xml 索引文件
    const sitemapIndexPath = path.join(publicDir, 'sitemap.xml');
    const now = new Date().toISOString(); // 获取当前时间

    const sitemapIndexContent = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <sitemap>
        <loc>https://www.suiyan.cc/sitemap_blogs.xml</loc>
        <lastmod>${now}</lastmod>
    </sitemap>
</sitemapindex>
`;
    fs.writeFileSync(sitemapIndexPath, sitemapIndexContent);


    console.log('Sitemap and sitemap index generated successfully!');
}

generateSitemap();