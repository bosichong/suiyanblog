const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const postsDirectory = path.join(process.cwd(), 'md');
const outputDir = path.join(process.cwd(), 'public');

function getSortedPostsData() {
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames.map(fileName => {
        const id = fileName.replace(/\.md$/, '');
        const filePath = path.join(postsDirectory, fileName);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const matterResult = matter(fileContent);
        const { data } = matterResult;

        if (!data.time || !isValidDate(data.time)) {
            return null;
        }

        return {
            id,
            ...data,
            content: matterResult.content,
        };
    }).filter((post) => post !== null).sort((a, b) => {
        if (!a.time || !b.time) {
            return 0;
        }
        return new Date(b.time).getTime() - new Date(a.time).getTime();
    });
}

function isValidDate(dateStr) {
    const date = new Date(dateStr);
    return !isNaN(date.getTime());
}

function escapeXml(str) {
    if (!str) return '';
    return str.toString()
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}

function generateSitemap() {
    const allPostsData = getSortedPostsData();

    // 静态页面列表
    const staticPages = [
        { url: 'https://www.suiyan.cc/', priority: '1.0', changefreq: 'daily' },
        { url: 'https://www.suiyan.cc/blog/', priority: '0.9', changefreq: 'daily' },
        { url: 'https://www.suiyan.cc/tags/', priority: '0.8', changefreq: 'weekly' },
        { url: 'https://www.suiyan.cc/about/', priority: '0.8', changefreq: 'monthly' },
        { url: 'https://www.suiyan.cc/feed', priority: '0.5', changefreq: 'hourly' },
    ];

    // 博客文章 URL
    const blogUrls = allPostsData.map(post => {
        const lastmod = post.time ? new Date(post.time).toISOString().split('T')[0] : '';
        return {
            url: `https://www.suiyan.cc/blog/${post.id}`,
            lastmod: lastmod,
            priority: '0.7',
            changefreq: 'weekly'
        };
    });

    // 合并所有 URL
    const allUrls = [...staticPages, ...blogUrls];

    // 生成 XML
    const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(item => {
    const lastmodAttr = item.lastmod ? `\n        <lastmod>${item.lastmod}</lastmod>` : '';
    return `    <url>
        <loc>${item.url}</loc>${lastmodAttr}
        <changefreq>${item.changefreq}</changefreq>
        <priority>${item.priority}</priority>
    </url>`;
}).join('\n')}
</urlset>`;

    // 确保输出目录存在
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    // 写入 sitemap.xml 文件
    const outputPath = path.join(outputDir, 'sitemap.xml');
    fs.writeFileSync(outputPath, xmlContent, 'utf8');
    console.log(`Sitemap generated successfully at: ${outputPath}`);
    console.log(`Total URLs: ${allUrls.length}`);
}

// 执行生成
generateSitemap();