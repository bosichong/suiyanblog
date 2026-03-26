import React, { useState } from 'react';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import ReactMarkdown from 'react-markdown';
import getSortedPostsData from "../../utils/parseMd";
import { sanitizeHtml } from "../../utils/sanitizeHtml";
import Layout from "../../components/Layout";
import Head from "next/head";
import Breadcrumb from '@/components/Breadcrumb';
import CommentSection from '@/components/CommentSection';
import PostList from '@/components/PostList';
import type { Post } from '../../types';
import config from '@/config';
import SponsorButton from '@/components/SponsorButton';
import CommentButton from '@/components/CommentButton';
import AILabelBadge from '@/components/AILabelBadge';

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
                <meta name="fediverse:creator" content="@J_sky@mastodon.social"></meta>
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
                            "keywords": post.tag?.split(',').map((t: string) => t.trim())
                        })
                    }}
                />
            </Head>

            <article>
                <Breadcrumb
                    type="blog"
                    title="正文"
                    tag={post.tag ? post.tag.split(',')[0].trim() : ''}
                />

                <hgroup>
                    <h1>
                        {post.title}
                    </h1>
                    <p>
                        <AILabelBadge level={post.ai_label || 0} />
                    </p>

                    
                </hgroup>

                <div>
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeRaw]}
                        components={{
                            strong: ({ children }: any) => (
                                <strong style={{ borderBottom: '1px dashed', borderBottomStyle: 'dashed' }}>
                                    {children}
                                </strong>
                            ),
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
                        }}
                    >
                        {sanitizedContent}
                    </ReactMarkdown>
                </div>
                <div className='post-meta'>
                        {post.time && (
                            <time dateTime={post.time}>
                                <small>发表于 {formatDate(post.time)}</small>
                            </time>
                        )}
                        {post.tag && (
                            <div className='tags'>
                                {post.tag.split(',').map((tag: string, index: number) => (
                                    <a className='post_tag'
                                        key={index}
                                        href={`/tags/${tag.trim().toLowerCase().replace(/\s+/g, '')}`}
                                    >
                                        #{tag.trim()}
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>

                <nav className="post-navigation">
                    {prevPost && (
                        <a href={`/blog/${prevPost.id}`} aria-label={`上一篇：${prevPost.title}`}>
                            上一篇：{prevPost.title}
                        </a>
                    )}
                    {nextPost && (
                        <a href={`/blog/${nextPost.id}`} aria-label={`下一篇：${nextPost.title}`}>
                            下一篇：{nextPost.title}
                        </a>
                    )}
                </nav>

                <div className='post_cbsb'>
                    {/* 评论按钮 */}
                    <CommentButton
                        showComments={showComments}
                        onToggle={() => setShowComments(!showComments)}
                    />

                    {/* 赞赏按钮 */}
                    <SponsorButton />
                </div>

                <section>
                    {/* 评论区域：Twikoo + Giscus 双系统 */}
                    {showComments && (
                        <CommentSection 
                            postId={post.id}
                            postPath={`/blog/${post.id}`}
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