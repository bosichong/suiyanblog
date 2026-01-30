import React, { useState } from 'react';
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
import PostList from '@/components/PostList';
import readingTime from 'reading-time';
import type { Post } from '../../types';
import CustomLink from '@/components/Link';
import config from '@/config';
import ArticleStats from '@/components/ArticleStats';
import styles from './[id].module.css';

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
    const [showComments, setShowComments] = useState(false);
    const [commentCount, setCommentCount] = useState(0);

    // 监听 Giscus 的消息事件来获取评论数
    React.useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            if (event.origin !== 'https://giscus.app') return;
            if (!(typeof event.data === 'object' && event.data.giscus)) return;

            const giscusData = event.data.giscus;

            // 获取顶级评论数（不含回复）
            const count = giscusData.discussion?.totalCommentCount ||
                         giscusData.totalCommentCount;

            if (typeof count === 'number') {
                setCommentCount(count);
            }
        };

        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, []);

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
                        <div className="flex items-center gap-2">
                            <ArticleStats slug={`/blog/${post.id}`} mode="views" />
                        </div>
                    </div>
                </header>

                <div className={styles.blog_post_content}>
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
                    <div className="flex items-center justify-between">
                        {/* 左侧：评论和喜欢按钮 */}
                        <div className="flex items-center justify-center gap-6">
                            {/* 评论按钮 */}
                            <div className="relative group inline-block">
                                <button
                                    onClick={() => setShowComments(!showComments)}
                                    className="text-text-secondary hover:text-text-dark"
                                    aria-label={showComments ? "隐藏评论" : "显示评论"}
                                >
                                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                                    </svg>
                                    {/* 评论数角标 */}
                                    {commentCount > 0 && (
                                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                                            {commentCount}
                                        </span>
                                    )}
                                </button>
                                {/* Hover 提示 */}
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-text-primary text-bg-content text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                                    英雄请留步！欢迎点击图标，留言交流！
                                </div>
                            </div>

                            {/* 喜欢按钮 */}
                            <ArticleStats slug={`/blog/${post.id}`} />
                        </div>

                        {/* 右侧：赞赏按钮 */}
                        <div className="relative group inline-block">
                            <button aria-label="赞赏作者" className="text-text-secondary hover:text-text-dark">
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
                                    <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
                                    <line x1="6" y1="1" x2="6" y2="4" />
                                    <line x1="10" y1="1" x2="10" y2="4" />
                                    <line x1="14" y1="1" x2="14" y2="4" />
                                </svg>
                            </button>
                            <div className="absolute right-0 top-full mt-2 w-48 pointer-events-none">
                                <img
                                    src="https://www.suiyan.cc/assets/images/zs.jpg"
                                    alt="赞赏码"
                                    className="w-full h-auto rounded border border-border opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-300 z-10"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <section className="mt-8">
                    {/* Giscus 组件始终渲染，但根据 showComments 控制显示/隐藏 */}
                    <div className={showComments ? '' : 'hidden'}>
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
                        emitMetadata="1"
                        inputPosition="bottom"
                        theme="light"
                        />
                    </div>
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