import React, { useState } from 'react';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import ReactMarkdown from 'react-markdown';
import getSortedPostsData from "../../utils/parseMd";
import { sanitizeHtml } from "../../utils/sanitizeHtml";
import Layout from "../../components/Layout";
import dynamic from 'next/dynamic';
import Head from "next/head";
import CC from '@/components/CC';
import Breadcrumb from '@/components/Breadcrumb';
import PostList from '@/components/PostList';
import readingTime from 'reading-time';
import type { Post } from '../../types';
import CustomLink from '@/components/Link';
import config from '@/config';
import SponsorButton from '@/components/SponsorButton';
import CommentButton from '@/components/CommentButton';
import AILabelBadge from '@/components/AILabelBadge';

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

export async function getStaticProps({ params }: { params?: { id: string } } = {}) {
    const posts = getSortedPostsData();
    const id = params?.id;

    if (!id) {
        return {
            notFound: true,
        };
    }

    const post = posts.find(p => p.id === id);
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
        revalidate: false,
    };
}

function Post({ post, relatedPosts, prevPost, nextPost, sameDayPosts }: { post: Post; relatedPosts: Post[]; prevPost: Post | null; nextPost: Post | null; sameDayPosts: Post[] }) {
    const stats = readingTime(post.content || '');
    const sanitizedContent = sanitizeHtml(post.content || '');
    const [showComments, setShowComments] = useState(false);

    const formatDate = (dateString: string): string => {
        if (!dateString) return '';
        const parts = dateString.split('T')[0];
        const [year, month, day] = (parts || dateString.substring(0, 10)).split('-');
        return `${year}/${month}/${day}`;
    };

    return (
        <Layout>
            <Head>
                <title>{`${post.title} | ${config.BLOG_NAME}`}</title>
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
                    <div className="flex flex-wrap items-center gap-2 text-sm text-text-secondary">
                        <span>作者: {post.author}</span>
                        <span>·</span>
                        <time dateTime={post.time}>
                            {formatDate(post.time || '')}
                        </time>
                        <span>·</span>
                        <span>{stats.words} 字</span>
                        <span>·</span>
                        <span>预计阅读 {stats.text}</span>
                        <AILabelBadge level={post.ai_label || 0} />
                    </div>
                </header>

                <div className="prose prose-lg prose-slate">
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeRaw]}
                        components={{
                            iframe: ({ node, ...props }: any) => {
                                const src = props.src;
                                if (typeof src === 'string' && (
                                    src.includes('player.bilibili.com') ||
                                    src.includes('//player.bilibili.com')
                                )) {
                                    const fixedSrc = src.startsWith('//') ? `https:${src}` : src;
                                    return (
                                        <iframe
                                            {...props}
                                            src={fixedSrc}
                                            allowFullScreen
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            style={{ width: '100%', minHeight: '400px' }}
                                        />
                                    );
                                }
                                return null;
                            },

                            a: ({ href, children }) => (
                                <CustomLink className="break-words" href={href || ''}>
                                    {children}
                                </CustomLink>
                            ),
                            table: ({ children }: any) => (
                                <div className="overflow-x-auto my-4">
                                    <table className="min-w-full max-w-full">{children}</table>
                                </div>
                            ),
                            th: ({ children }: any) => (
                                <th className="px-4 py-2 border bg-gray-50 font-semibold text-left whitespace-nowrap">{children}</th>
                            ),
                            td: ({ children }: any) => (
                                <td className="px-4 py-2 border max-w-xs break-all">{children}</td>
                            ),
                            code: ({ children, className }: any) => {
                                const isInline = !className;
                                if (isInline) {
                                    return <code className="px-1.5 py-0.5 rounded text-sm break-all">{children}</code>;
                                }
                                return <code className={className}>{children}</code>;
                            },
                            pre: ({ children }: any) => (
                                <pre className="overflow-x-auto">{children}</pre>
                            ),
                        }}
                    >
                        {sanitizedContent}
                    </ReactMarkdown>
                </div>

                <div className="mt-8">
                    <CC title={post.title || ''} author={post.author || ''} id={post.id || ''} />
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

                <nav className="mt-8 py-4 border-t border-border" aria-label="文章导航">
                    <div className="flex flex-col gap-4">
                        {prevPost && (
                            <CustomLink href={`/blog/${prevPost.id}`} className="block" aria-label={`上一篇：${prevPost.title}`}>
                                上一篇：{prevPost.title}
                            </CustomLink>
                        )}
                        {nextPost && (
                            <CustomLink href={`/blog/${nextPost.id}`} className="block" aria-label={`下一篇：${nextPost.title}`}>
                                下一篇：{nextPost.title}
                            </CustomLink>
                        )}
                    </div>
                </nav>

                <div className="mt-8 py-4 text-center border-t border-border">
                    <div className="flex items-center justify-center gap-6">
                        {/* 评论按钮 */}
                        <CommentButton
                            showComments={showComments}
                            onToggle={() => setShowComments(!showComments)}
                        />

                        {/* 赞赏按钮 */}
                        <SponsorButton />
                    </div>
                </div>

                <section className="mt-4">
                    {/* 只在 showComments 为 true 时才渲染 Giscus 组件 */}
                    {showComments && (
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
                    )}
                </section>

                <PostList
                    title="相关文章"
                    posts={relatedPosts}
                />

                <PostList
                    title="那年今日"
                    posts={sameDayPosts}
                    showDate={true}
                    formatDate={formatDate}
                />
            </article>
        </Layout>
    );
}

export default Post;