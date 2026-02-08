import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export const dynamic = 'force-static';
export const revalidate = false;

const postsDirectory = path.join(process.cwd(), 'md');

interface PostData {
    id: string;
    title?: string;
    time?: string;
    description?: string;
    summary?: string;
    tag?: string;
    tags?: string[];
    author?: string;
    content: string;
}

function getSortedPostsData(): PostData[] {
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
        } as PostData;
    }).filter((post): post is PostData => post !== null).sort((a, b) => {
        if (!a.time || !b.time) {
            return 0;
        }
        return new Date(b.time).getTime() - new Date(a.time).getTime();
    });
}

function isValidDate(dateStr: string | Date): boolean {
    const date = new Date(dateStr);
    return !isNaN(date.getTime());
}

function escapeXml(str: string | undefined): string {
    if (!str) return '';
    return str.toString()
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}

function generateCategories(tags: string | string[] | undefined): string {
    if (!tags) return '';
    const tagArray = typeof tags === 'string' ? tags.split(',').map(t => t.trim()) : tags;
    return tagArray.map(tag => `        <category>${escapeXml(tag)}</category>`).join('\n');
}

export async function GET() {
    const allPostsData = getSortedPostsData();

    if (allPostsData.length === 0) {
        return new NextResponse('No posts found', { status: 404 });
    }

    // 限制RSS条目数量为最新的50条
    const recentPosts = allPostsData.slice(0, 50);
    const now = new Date().toUTCString();
    const lastBuildDate = recentPosts[0].time ? new Date(recentPosts[0].time).toUTCString() : now;

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
        <pubDate>${post.time ? new Date(post.time).toUTCString() : now}</pubDate>
        <description><![CDATA[${description}]]></description>
        <content:encoded><![CDATA[${escapeXml(contentPreview)}]]></content:encoded>
        <dc:creator>contact@suiyan.cc (${escapeXml(post.author || 'J.sky')})</dc:creator>
${categories}
    </item>`;
    }).join('\n');

    const rssContent = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/rss.xsl"?>
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
        <atom:link href="https://www.suiyan.cc/feed" rel="self" type="application/rss+xml"/>
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

    return new NextResponse(rssContent, {
        status: 200,
        headers: {
            'Content-Type': 'text/xml; charset=utf-8',
            'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        },
    });
}