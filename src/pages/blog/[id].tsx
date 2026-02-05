import React, { useState } from 'react';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import ReactMarkdown from 'react-markdown';
import getSortedPostsData from "../../utils/parseMd";
import { sanitizeHtml } from "../../utils/sanitizeHtml";
import Layout from "../../components/Layout";
import dayjs from 'dayjs';
import dynamic from 'next/dynamic';
import Head from "next/head";
import CC from '@/components/CC';
import Breadcrumb from '@/components/Breadcrumb';
import PostList from '@/components/PostList';
import readingTime from 'reading-time';
import type { Post } from '../../types';
import CustomLink from '@/components/Link';
import config from '@/config';
import ArticleStats from '@/components/ArticleStats';
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
                    <div className="flex flex-col gap-2 text-sm text-text-secondary">
                        <div className="flex flex-wrap items-center gap-4">
                            <div className="flex items-center gap-2">
                                <span>作者: {post.author}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <time dateTime={post.time}>
                                    {dayjs(post.time || '').format('YYYY/MM/DD')}
                                </time>
                            </div>
                            <div className="flex items-center gap-2">
                                <AILabelBadge level={post.ai_label || 0} />
                            </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-4">
                            <div className="flex items-center gap-2">
                                <span>{stats.words} 字</span>
                                <span>·</span>
                                <span>预计阅读 {stats.text}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <ArticleStats slug={`/blog/${post.id}`} mode="views" />
                            </div>
                        </div>
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
                                <CustomLink className="break-all underline" href={href || ''}>
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

                <nav className="mt-8 py-4 flex flex-col gap-4 border-t border-border">
                    {prevPost && (
                        <CustomLink href={`/blog/${prevPost.id}`} className="block">
                            <span className="">上一篇：</span>
                            <span className="">{prevPost.title}</span>
                        </CustomLink>
                    )}
                    {nextPost && (
                        <CustomLink href={`/blog/${nextPost.id}`} className="block">
                            <span className="">下一篇：</span>
                            <span className="">{nextPost.title}</span>
                        </CustomLink>
                    )}
                </nav>

                <div className="mt-8 py-4 text-center border-t border-border">
                    <div className="flex items-center justify-center gap-6">
                        {/* 评论按钮 */}
                        <CommentButton
                            showComments={showComments}
                            commentCount={commentCount}
                            onToggle={() => setShowComments(!showComments)}
                        />

                        {/* 喜欢按钮 */}
                        <ArticleStats slug={`/blog/${post.id}`} />

                        {/* 赞赏按钮 */}
                        <SponsorButton />
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
                    formatDate={(date) => dayjs(date).format('YYYY/MM/DD')}
                />
            </article>
        </Layout>
    );
}

export default Post;