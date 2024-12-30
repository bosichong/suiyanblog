const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// 假设你的 Markdown 文件夹位于项目根目录下的 'md' 文件夹中
const postsDirectory = path.join(process.cwd(), 'md');

function getSortedPostsData() {
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames.map(fileName => {
        const id = fileName.replace(/\.md$/, ''); // 从文件名中提取 id
        const filePath = path.join(postsDirectory, fileName);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const matterResult = matter(fileContent);
        const { data } = matterResult;

        // 检查日期字段是否存在且有效
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
        // 确保 time 字段存在且是有效的日期格式
        if (!a.time || !b.time) {
            return 0; // 或者根据你的需求处理错误
        }
        return new Date(b.time) - new Date(a.time); // 颠倒排序，最新的在前
    });
}

function isValidDate(dateStr) {
    const date = new Date(dateStr);
    return !isNaN(date.getTime());
}

function generateRSS() {
    const allPostsData = getSortedPostsData();
    const rssItems = allPostsData.map(post => `
        <item>
            <title>${post.title}</title>
            <link>https://www.suiyan.cc/${post.id}</link>
            <guid>https://www.suiyan.cc/${post.id}</guid>
            <pubDate>${new Date(post.time).toUTCString()}</pubDate>
            <description>${post.summary || post.description || ''}</description>
        </item>
    `).join('');

    const rssContent = `<?xml version="1.0" encoding="UTF-8"?>
        <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
            <channel>
                <title>SuiYan RSS Feed</title>
                <link>https://www.suiyan.cc</link>
                <atom:link href="https://www.suiyan.cc/rss.xml" rel="self"/>
                <description>Latest posts from SuiYan</description>
                ${rssItems}
            </channel>
        </rss>`;

    // 保存 rss.xml 到 public 目录下
    const publicDir = path.join(process.cwd(), 'public');
    const rssPath = path.join(publicDir, 'rss.xml');
    fs.writeFileSync(rssPath, rssContent);

    console.log('RSS feed generated successfully!');
}

generateRSS();
