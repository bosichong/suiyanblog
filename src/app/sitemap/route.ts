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
    tag?: string;
    tags?: string[];
    content: string;
}

function getSortedPostsData(): PostData[] {
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames.map(fileName => {
        const normalizedFileName = path.normalize(fileName).replace(/^(\.\.(\/|\\|$))+/, '');
        if (normalizedFileName !== fileName) {
            return null;
        }

        const id = normalizedFileName.replace(/\.md$/, '');
        const filePath = path.join(postsDirectory, normalizedFileName);

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

function getUniqueTags(): string[] {
    const allPostsData = getSortedPostsData();
    const tags = new Set<string>();

    allPostsData.forEach(post => {
        if (post.tag) {
            post.tag.split(',').forEach(tag => {
                tags.add(tag.trim().toLowerCase());
            });
        }
    });

    return Array.from(tags);
}

function calculatePriority(postTime: string | Date): number {
    const postDate = new Date(postTime);
    const daysSincePost = (new Date().getTime() - postDate.getTime()) / (1000 * 60 * 60 * 24);

    if (daysSincePost < 30) return 0.9;
    else if (daysSincePost < 90) return 0.8;
    else if (daysSincePost < 180) return 0.7;
    else if (daysSincePost < 365) return 0.6;
    else return 0.5;
}

function calculateChangeFrequency(postTime: string | Date): string {
    const postDate = new Date(postTime);
    const daysSincePost = (new Date().getTime() - postDate.getTime()) / (1000 * 60 * 60 * 24);

    if (daysSincePost < 30) return 'daily';
    else if (daysSincePost < 90) return 'weekly';
    else return 'monthly';
}

function normalizeDate(date: string | Date): string {
    const d = new Date(date);
    return d.toISOString().split('.')[0] + 'Z';
}

export async function GET() {
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
            url: 'https://www.suiyan.cc/search',
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

    // 博客文章 URL
    const blogUrls = allPostsData.map(post => ({
        url: `https://www.suiyan.cc/blog/${post.id}`,
        lastModified: post.time ? normalizeDate(post.time) : now,
        changeFrequency: post.time ? calculateChangeFrequency(post.time) : 'monthly',
        priority: post.time ? calculatePriority(post.time) : 0.5
    }));

    // 标签页 URL
    const tagUrls = uniqueTags.map(tag => {
        const latestPost = allPostsData.find(post => {
            if (!post.tag) return false;
            return post.tag.split(',').map(t => t.trim().toLowerCase()).includes(tag);
        });

        return {
            url: `https://www.suiyan.cc/tags/${tag}`,
            lastModified: (latestPost && latestPost.time) ? normalizeDate(latestPost.time) : now,
            changeFrequency: 'weekly',
            priority: 0.6
        };
    });

    // 合并所有 URL
    const allUrls = [...staticUrls, ...blogUrls, ...tagUrls];

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

    return new NextResponse(xmlContent, {
        status: 200,
        headers: {
            'Content-Type': 'application/xml; charset=utf-8',
            'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        },
    });
}