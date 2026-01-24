const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const postsDirectory = path.join(process.cwd(), 'md');
const publicDir = path.join(process.cwd(), 'public');

function getSortedPostsData() {
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

function getUniqueTags() {
    const allPostsData = getSortedPostsData();
    const tags = new Set();

    allPostsData.forEach(post => {
        if (post.tag) {
            post.tag.split(',').forEach(tag => {
                tags.add(tag.trim().toLowerCase());
            });
        }
    });

    return Array.from(tags);
}

/**
 * 根据文章发布时间计算priority
 * 越新的文章priority越高
 */
function calculatePriority(postTime) {
    const postDate = new Date(postTime);
    const daysSincePost = (new Date() - postDate) / (1000 * 60 * 60 * 24);

    if (daysSincePost < 30) return 0.9;
    else if (daysSincePost < 90) return 0.8;
    else if (daysSincePost < 180) return 0.7;
    else if (daysSincePost < 365) return 0.6;
    else return 0.5;
}

/**
 * 根据文章发布时间计算changefreq
 * 越新的文章更新频率越高
 */
function calculateChangeFrequency(postTime) {
    const postDate = new Date(postTime);
    const daysSincePost = (new Date() - postDate) / (1000 * 60 * 60 * 24);

    if (daysSincePost < 30) return 'daily';
    else if (daysSincePost < 90) return 'weekly';
    else return 'monthly';
}

/**
 * 标准化时间戳格式，移除毫秒
 */
function normalizeDate(date) {
    const d = new Date(date);
    return d.toISOString().split('.')[0] + 'Z';
}

function generateSitemap() {
    console.log('开始生成sitemap...');
    const allPostsData = getSortedPostsData();
    const uniqueTags = getUniqueTags();
    const now = normalizeDate(new Date());

    // 重要页面 URL
    const staticUrls = [
        {
            url: 'https://www.suiyan.cc/',
            lastModified: now,
            changeFrequency: 'daily',
            priority: 1.0
        },
        {
            url: 'https://www.suiyan.cc/Archives',
            lastModified: now,
            changeFrequency: 'weekly',
            priority: 0.9
        },
        {
            url: 'https://www.suiyan.cc/Tags',
            lastModified: now,
            changeFrequency: 'weekly',
            priority: 0.8
        },
        {
            url: 'https://www.suiyan.cc/Search',
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 0.7
        },
        {
            url: 'https://www.suiyan.cc/Friends',
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 0.6
        },
        {
            url: 'https://www.suiyan.cc/blog/1',
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 0.8
        }
    ];

    // 博客文章 URL - 使用智能优先级和更新频率
    const blogUrls = allPostsData.map(post => ({
        url: `https://www.suiyan.cc/blog/${post.id}`,
        lastModified: normalizeDate(post.time),
        changeFrequency: calculateChangeFrequency(post.time),
        priority: calculatePriority(post.time)
    }));

    // 标签页 URL
    const tagUrls = uniqueTags.map(tag => {
        // 找到该标签下最新文章的时间
        const latestPost = allPostsData.find(post => {
            if (!post.tag) return false;
            return post.tag.split(',').map(t => t.trim().toLowerCase()).includes(tag);
        });

        return {
            url: `https://www.suiyan.cc/tags/${tag}`,
            lastModified: latestPost ? normalizeDate(latestPost.time) : now,
            changeFrequency: 'weekly',
            priority: 0.6
        };
    });

    // 合并所有 URL
    const allUrls = [...staticUrls, ...blogUrls, ...tagUrls];

    // 添加完整的命名空间以支持扩展功能
    const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">${allUrls.map(url => `
    <url>
        <loc>${url.url}</loc>
        <lastmod>${url.lastModified}</lastmod>
        <changefreq>${url.changeFrequency}</changefreq>
        <priority>${url.priority}</priority>
    </url>`).join('')}
</urlset>`;

    // 保存 sitemap_blogs.xml
    const sitemapBlogsPath = path.join(publicDir, 'sitemap_blogs.xml');
    fs.writeFileSync(sitemapBlogsPath, xmlContent);

    // 生成 sitemap.xml 索引文件
    const sitemapIndexPath = path.join(publicDir, 'sitemap.xml');

    const sitemapIndexContent = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <sitemap>
        <loc>https://www.suiyan.cc/sitemap_blogs.xml</loc>
        <lastmod>${now}</lastmod>
    </sitemap>
</sitemapindex>`;
    fs.writeFileSync(sitemapIndexPath, sitemapIndexContent);

    console.log(`Sitemap生成成功！`);
    console.log(`总共 ${allUrls.length} 个URL (${staticUrls.length} 个重要页面 + ${blogUrls.length} 篇文章 + ${tagUrls.length} 个标签)`);
}

generateSitemap();