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

/**
 * 转义XML特殊字符
 */
function escapeXml(str) {
    if (!str) return '';
    return str.toString()
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}

/**
 * 生成标签的XML元素
 */
function generateCategories(tags) {
    if (!tags) return '';
    const tagArray = typeof tags === 'string' ? tags.split(',').map(t => t.trim()) : tags;
    return tagArray.map(tag => `        <category>${escapeXml(tag)}</category>`).join('\n');
}

function generateRSS() {
    console.log('开始生成RSS feed...');
    const allPostsData = getSortedPostsData();

    if (allPostsData.length === 0) {
        console.log('没有找到文章，RSS feed为空');
        return;
    }

    // 限制RSS条目数量为最新的50条，避免文件过大
    const recentPosts = allPostsData.slice(0, 50);
    const now = new Date().toUTCString();
    const lastBuildDate = new Date(recentPosts[0].time).toUTCString();

    const rssItems = recentPosts.map(post => {
        const description = escapeXml(post.summary || post.description || '');
        const categories = generateCategories(post.tag || post.tags);
        // 提取文章内容的前500字符作为完整内容预览
        const contentPreview = post.content ?
            post.content.replace(/!\[.*?\]\(.*?\)/g, '') // 移除图片
                      .replace(/```[\s\S]*?```/g, '') // 移除代码块
                      .replace(/`[^`]+`/g, '') // 移除行内代码
                      .replace(/[#*>\-\[\]]/g, '') // 移除markdown符号
                      .substring(0, 500) + '...' : '';

        return `    <item>
        <title>${escapeXml(post.title)}</title>
        <link>https://www.suiyan.cc/blog/${post.id}</link>
        <guid isPermaLink="true">https://www.suiyan.cc/blog/${post.id}</guid>
        <pubDate>${new Date(post.time).toUTCString()}</pubDate>
        <description><![CDATA[${description}]]></description>
        <content:encoded><![CDATA[${escapeXml(contentPreview)}]]></content:encoded>
        <dc:creator>contact@suiyan.cc (${escapeXml(post.author || 'J.sky')})</dc:creator>
${categories}
    </item>`;
    }).join('\n');

    const rssContent = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
    xmlns:atom="http://www.w3.org/2005/Atom"
    xmlns:content="http://purl.org/rss/1.0/modules/content/"
    xmlns:dc="http://purl.org/dc/elements/1.1/"
    xmlns:slash="http://purl.org/rss/1.0/modules/slash/"
    xmlns:wfw="http://wellformedweb.org/CommentAPI/"
    xmlns:sy="http://purl.org/rss/1.0/modules/syndication/">
    <channel>
        <title>碎言 - SuiYan Blog</title>
        <link>https://www.suiyan.cc</link>
        <atom:link href="https://www.suiyan.cc/rss.xml" rel="self" type="application/rss+xml"/>
        <description>记录并分享个人学习编程的过程和笔记，记录一些平淡的日常。</description>
        <language>zh-CN</language>
        <lastBuildDate>${lastBuildDate}</lastBuildDate>
        <pubDate>${now}</pubDate>
        <generator>SuiYan Blog RSS Generator</generator>
        <docs>https://validator.w3.org/feed/docs/rss2.html</docs>
        <managingEditor>contact@suiyan.cc (J.sky)</managingEditor>
        <webMaster>contact@suiyan.cc (J.sky)</webMaster>
        <ttl>60</ttl>
        <sy:updatePeriod>hourly</sy:updatePeriod>
        <sy:updateFrequency>1</sy:updateFrequency>
        <image>
            <url>https://www.suiyan.cc/assets/images/avatar.jpg</url>
            <title>碎言 - SuiYan Blog</title>
            <link>https://www.suiyan.cc</link>
            <width>144</width>
            <height>144</height>
            <description>碎言博客头像</description>
        </image>
${rssItems}
    </channel>
</rss>`;

    // 保存 rss.xml 到 public 目录下
    const rssPath = path.join(publicDir, 'rss.xml');
    fs.writeFileSync(rssPath, rssContent);

    console.log(`RSS feed生成成功！包含 ${recentPosts.length} 篇最新文章（共 ${allPostsData.length} 篇）`);
}

generateRSS();
