// rssGenerator.js
import RSS from 'rss';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import getSortedPostsData from './src/utils/parseMd.js'; // 确保这个路径是正确的
import  config from './src/config.js';

// 获取当前文件的路径
const __filename = fileURLToPath(import.meta.url);
// 获取当前文件所在的目录路径
const __dirname = path.dirname(__filename);

const feed = new RSS({
    title: config.BLOG_NAME,
    description:config.META_DESCRIPTION,
    site_url: 'https://www.suiyan.cc',
    feed_url: 'https://www.suiyan.cc/rss.xml'
});

const articles = getSortedPostsData();

articles.forEach(article => {
    feed.item({
        title: article.title,
        description: article.description,
        url: `https://www.suiyan.cc/blog/${article.id}`, // 确保 URL 路径正确
        date: new Date(article.time).toISOString() // 确保日期格式正确
    });
});

// 使用 __dirname 构建文件路径
const rssPath = path.join(__dirname, 'public', 'rss.xml');
fs.writeFileSync(rssPath, feed.xml());
