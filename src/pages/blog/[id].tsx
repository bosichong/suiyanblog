import React from 'react';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import ReactMarkdown from 'react-markdown';
import getSortedPostsData from "../../utils/parseMd";
import { sanitizeHtml } from "../../utils/sanitizeHtml";
import Layout from "../../components/Layout";
import formatDate from "../../utils/formatDate";
import dynamic from 'next/dynamic';
import Head from "next/head";
import Link from 'next/link';
import CC from '@/components/CC';
import Breadcrumb from '@/components/Breadcrumb';
import readingTime from 'reading-time';
import type { Post } from '../../types';
import CustomLink from '@/components/Link';
import config from '@/config';

// 动态导入 Giscus 组件以延迟加载
const Giscus = dynamic(() => import('@giscus/react'), {
    ssr: false,
    loading: () => (
        <div className="flex items-center justify-center py-8">
            <div>加载评论中...</div>
        </div>
    )
});

import giscusConfig from '../../giscusConfigs';

export async function getStaticPaths() {
    const posts = getSortedPostsData();
    return {
        paths: posts.map(post => ({
            params: { id: post.id },
        })),
        fallback: false,
    };
}

export async function getStaticProps({ params }: { params: { id: string } }) {
    const posts = getSortedPostsData();
    const post = posts.find(p => p.id === params.id);
    if (!post) {
        return {
            notFound: true,
        };
    }

    const currentIndex = posts.findIndex(p => p.id === post.id);
    const prevPost = currentIndex > 0 ? posts[currentIndex - 1] : null;
    const nextPost = currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;

    const tags = post.tag ? post.tag.split(',').map((t: string) => t.trim()) : [];
    const relatedPosts = posts.filter(p => {
        const postTags = p.tag ? p.tag.split(',').map((t: string) => t.trim()) : [];
        return tags.some((tag: string) => postTags.includes(tag)) && p.id !== post.id;
    });

    const currentPostDate = new Date(post.time || '');
    const currentMonth = currentPostDate.getMonth();
    const currentDay = currentPostDate.getDate();
    const currentYear = currentPostDate.getFullYear();

    const sameDayPosts = posts.filter(p => {
        if (!p.time) return false;
        const postDate = new Date(p.time);
        const postYear = postDate.getFullYear();
        if (postYear === currentYear) return false;
        return postDate.getMonth() === currentMonth && postDate.getDate() === currentDay;
    }).sort((a: Post, b: Post) => {
        return new Date(b.time || '').getTime() - new Date(a.time || '').getTime();
    });

    return {
        props: {
            post,
            relatedPosts,
            prevPost,
            nextPost,
            sameDayPosts,
        },
    };
}

function Post({ post, relatedPosts, prevPost, nextPost, sameDayPosts }: { post: Post; relatedPosts: Post[]; prevPost: Post | null; nextPost: Post | null; sameDayPosts: Post[] }) {
    const stats = readingTime(post.content || '');
    const sanitizedContent = sanitizeHtml(post.content || '');

    return (
        <Layout>
            <Head>
                <title>{post.title} | {config.BLOG_NAME}</title>
                <meta name="description" content={post.description} />
                <meta name="keywords" content={post.tag?.replace(/,/g, ',')} />
                <meta name="author" content={post.author} />
                <link rel="canonical" href={`https://www.suiyan.cc/blog/${post.id}`} />
                <meta property="og:title" content={`${post.title} | ${config.BLOG_NAME}`} />
                <meta property="og:description" content={post.description} />
                <meta property="og:type" content="article" />
                <meta property="og:url" content={`https://www.suiyan.cc/blog/${post.id}`} />
                <meta property="article:published_time" content={post.time} />
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:title" content={`${post.title} | ${config.BLOG_NAME}`} />
                <meta name="twitter:description" content={post.description} />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "BlogPosting",
                            "headline": post.title,
                            "description": post.description,
                            "author": {
                                "@type": "Person",
                                "name": post.author
                            },
                            "datePublished": post.time,
                            "dateModified": post.time,
                            "url": `https://www.suiyan.cc/blog/${post.id}`,
                            "mainEntityOfPage": {
                                "@type": "WebPage",
                                "@id": `https://www.suiyan.cc/blog/${post.id}`
                            },
                            "keywords": post.tag?.split(',').map((t: string) => t.trim()),
                            "wordCount": stats.words,
                            "timeRequired": stats.text
                        })
                    }}
                />
            </Head>

            <article className="w-full">
                <Breadcrumb
                    type="blog"
                    title="正文"
                    tag={post.tag ? post.tag.split(',')[0].trim() : ''}
                />

                <header className="mb-8">
                    <h1 className="text-2xl font-semibold mb-4 text-text-primary">
                        {post.title}
                    </h1>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-text-secondary">
                        <div className="flex items-center gap-2">
                            <span>作者: {post.author}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span>{stats.words} 字</span>
                            <span>·</span>
                            <span>预计阅读 {stats.text}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <time dateTime={post.time}>
                                {formatDate(post.time || '')}
                            </time>
                        </div>
                    </div>
                </header>

                <div className="blog_post_content">
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeRaw]}
                        components={{
                            p: ({ children, ...props }: any) => {
                                const hasBlockElement = React.Children.toArray(children).some((child: any) => {
                                    if (React.isValidElement(child)) {
                                        const type = typeof child.type === 'string' ? child.type : child.type?.name || '';
                                        return ['div', 'iframe', 'video', 'pre', 'blockquote', 'ul', 'ol', 'table', 'figure'].includes(type);
                                    }
                                    return false;
                                });

                                if (hasBlockElement) {
                                    return <>{children}</>;
                                }

                                return <p {...props}>{children}</p>;
                            },
                            iframe: ({ node, ...props }: any) => {
                                const src = props.src;
                                if (typeof src === 'string' && (
                                    src.includes('player.bilibili.com') ||
                                    src.includes('//player.bilibili.com')
                                )) {
                                    return <iframe {...props} />;
                                }
                                return null;
                            }
                        }}
                    >
                        {sanitizedContent}
                    </ReactMarkdown>
                </div>

                <div className="mt-8">
                    <CC />
                </div>

                {post.tag && (
                    <div className="mt-6 text-sm">
                        <span className="text-text-secondary">标签: </span>
                        {post.tag.split(',').map((tag: string, index: number) => (
                            <CustomLink
                                key={index}
                                href={`/tags/${tag.trim().toLowerCase().replace(/\s+/g, '')}`}
                                className="ml-2"
                            >
                                {tag.trim()}
                            </CustomLink>
                        ))}
                    </div>
                )}

                <nav className="mt-8 py-4 flex flex-col gap-4 border-t border-border">
                    {prevPost && (
                        <CustomLink href={`/blog/${prevPost.id}`} className="block">
                            <span className="text-text-secondary">上一篇：</span>
                            <span className="text-text-primary">{prevPost.title}</span>
                        </CustomLink>
                    )}
                    {nextPost && (
                        <CustomLink href={`/blog/${nextPost.id}`} className="block">
                            <span className="text-text-secondary">下一篇：</span>
                            <span className="text-text-primary">{nextPost.title}</span>
                        </CustomLink>
                    )}
                </nav>

                <div className="mt-8 py-4 text-center border-t border-border">
                    <p className="text-text-secondary mb-4">英雄请留步！欢迎在下方留言交流！</p>
                    <div className="relative inline-block group w-48">
                        <button aria-label="赞赏作者" className="text-text-secondary hover:text-text-dark">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
                                <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
                                <line x1="6" y1="1" x2="6" y2="4" />
                                <line x1="10" y1="1" x2="10" y2="4" />
                                <line x1="14" y1="1" x2="14" y2="4" />
                            </svg>
                        </button>
                        <img
                            src="https://www.suiyan.cc/assets/images/zs.jpg"
                            alt="赞赏码"
                            className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-48 h-auto rounded border border-border opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-300 z-10"
                        />
                    </div>
                </div>

                <section className="mt-8">
                    <Giscus
                        key={post.id}
                        repo={giscusConfig.repo as `${string}/${string}`}
                        repoId={giscusConfig.repoId}
                        category={giscusConfig.category}
                        categoryId={giscusConfig.categoryId}
                        mapping={giscusConfig.mapping as any}
                        lang={giscusConfig.lang}
                        strict="0"
                        reactionsEnabled="1"
                        emitMetadata="0"
                        inputPosition="bottom"
                        theme="light"
                    />
                </section>

                {relatedPosts.length > 0 && (
                    <section className="mt-8 py-4 border-t border-border">
                        <h2 className="text-lg font-semibold mb-4 text-text-primary">相关文章</h2>
                        <ul className="space-y-2">
                            {relatedPosts.map((relatedPost, index) => (
                                <li key={index}>
                                    <CustomLink href={`/blog/${relatedPost.id}`}>
                                        {relatedPost.title}
                                    </CustomLink>
                                </li>
                            ))}
                        </ul>
                    </section>
                )}

                {sameDayPosts.length > 0 && (
                    <section className="mt-8 py-4 border-t border-border">
                        <h2 className="text-lg font-semibold mb-4 text-text-primary">那年今日</h2>
                        <ul className="space-y-2">
                            {sameDayPosts.map((sameDayPost, index) => (
                                <li key={index} className="flex items-start gap-2">
                                    <time className="text-sm text-text-tertiary whitespace-nowrap">
                                        {formatDate(sameDayPost.time || '')}
                                    </time>
                                    <CustomLink href={`/blog/${sameDayPost.id}`}>
                                        {sameDayPost.title}
                                    </CustomLink>
                                </li>
                            ))}
                        </ul>
                    </section>
                )}
            </article>
        </Layout>
    );
}

export default Post;