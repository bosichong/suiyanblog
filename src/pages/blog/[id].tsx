import rehypeRaw from 'rehype-raw';
import ReactMarkdown from 'react-markdown';
import getSortedPostsData from "../../utils/parseMd";
import Layout from "../../components/Layout";
import styles from './[id].module.css';
import formatDate from "../../utils/formatDate";
import Giscus from '@giscus/react';
import giscusConfig from '../../giscusConfigs';
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { Chip, Link } from "@nextui-org/react";
import BlogTime from "@/components/ico/BlogTime";
import User from "@/components/ico/User";
import TagIco from "@/components/ico/TagIco";
import CC from '@/components/CC';
import getRandomColor from "../../utils/randomColor";
import readingTime from 'reading-time';
import type { Post } from '../../types';

/**
 * 获取静态路径的函数
 */
export async function getStaticPaths() {
    const posts = getSortedPostsData();
    return {
        paths: posts.map(post => ({
            params: { id: post.id },
        })),
        fallback: false,
    };
}

/**
 * 获取静态属性的函数
 */
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

    return {
        props: {
            post,
            relatedPosts,
            prevPost,
            nextPost,
        },
    };
}

/**
 * 展示文章的组件
 */
function Post({ post, relatedPosts, prevPost, nextPost }: { post: Post; relatedPosts: Post[]; prevPost: Post | null; nextPost: Post | null }) {
    const [giscusTheme, setGiscusTheme] = useState('');
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        setGiscusTheme(savedTheme === 'dark' ? 'dark_dimmed' : savedTheme === 'light' ? 'light_high_contrast' : savedTheme || 'dark_dimmed');
    }, []);

    // 监听滚动事件，更新阅读进度
    useEffect(() => {
        const handleScroll = () => {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight - windowHeight;
            const scrolled = window.scrollY;
            const progress = (scrolled / documentHeight) * 100;
            setScrollProgress(Math.min(progress, 100));
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // 计算文章字数和阅读时间
    const stats = readingTime(post.content || '');

    return (
        <Layout>
            <div className={styles.reading_progress_bar} style={{ width: `${scrollProgress}%` }}></div>
            <Head>
                <title>{post.title} | SuiYan 碎言 - 个人技术博客</title>
                <meta name="description" content={post.description} />
                <meta name="keywords" content={post.tag?.replace(/,/g, ',')} />
                <meta name="author" content={post.author} />
                <link rel="canonical" href={`https://www.suiyan.cc/blog/${post.id}`} />
                <meta property="og:title" content={`${post.title} | SuiYan 碎言`} />
                <meta property="og:description" content={post.description} />
                <meta property="og:type" content="article" />
                <meta property="og:url" content={`https://www.suiyan.cc/blog/${post.id}`} />
                <meta property="og:site_name" content="SuiYan 碎言" />
                <meta property="article:published_time" content={post.time} />
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:title" content={`${post.title} | SuiYan 碎言`} />
                <meta name="twitter:description" content={post.description} />
            </Head>
            <article className={'p-4'}>
                <h1 className={`${styles.blog_post_title} rainbow_text`}>{post.title}</h1>
                <div className="text-sm flex flex-wrap mb-4">
                    <div className="flex items-center">
                        <User />
                        <span className="ml-2 flex">{post.author}</span>
                    </div>
                        {
                            post.tag?.split(',').map((tag: string, index: number) => (
                                <Chip size="sm" startContent={<TagIco />} variant="flat" key={index} className="block ml-2 flex items-center text-sm">
                                    {tag}
                                </Chip>
                            ))
                        }
                    <div className="flex items-center">
                        <BlogTime />
                        <span className="ml-2">{formatDate(post.time || '')}</span>
                    </div>
                    <div className="flex items-center">
                        <span className="ml-2 text-sm text-gray-500">
                            {stats.words} 字 · 预计阅读 {stats.text}
                        </span>
                    </div>
                </div>


                <div className={styles.blog_post_content}>
                       <ReactMarkdown
                            rehypePlugins={[rehypeRaw]}
                            components={{
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
                            {post.content}
                        </ReactMarkdown>
                </div>

                <div>
                    <CC />
                </div>

                <div className={'py-4 flex flex-col gap-4'}>
                    {prevPost && (
                        <Link href={`/blog/${prevPost.id}`} className={'block text-ellipsis overflow-hidden whitespace-nowrap'}>
                            <span>上一篇：</span>
                            <span>{prevPost.title}</span>
                        </Link>
                    )}
                    {nextPost && (
                        <Link href={`/blog/${nextPost.id}`} className={'block text-ellipsis overflow-hidden whitespace-nowrap'}>
                            <span>下一篇：</span>
                            <span>{nextPost.title}</span>
                        </Link>
                    )}
                </div>

                <div className={'py-4 text-center'}>
                    <p>英雄请留步！欢迎在下方留言交流！</p>
                    <p className={'relative inline-block mt-2 cursor-help group'}>
                        赞赏作者一杯咖啡 ❤️
                        <img
                            src="https://www.suiyan.cc/assets/images/zs.jpg"
                            alt="赞赏码"
                            className={'absolute left-1/2 -translate-x-1/2 top-full mt-2 w-48 h-auto rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50'}
                        />
                    </p>
                </div>

                <Giscus
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
                    theme={giscusTheme}
                />

                <div className={'py-4'}>
                    <h2 >相关文章</h2>
                    {relatedPosts.length > 0 ? (
                        <ul className={styles.related_posts_list}>
                            {relatedPosts.map((relatedPost, index) => (
                                <li key={index} className={styles.related_post_item+'transition-all duration-200 hover:translate-x-1'}>
                                    <Link href={`/blog/${relatedPost.id}`} className={'rainbow_hover'}>
                                        {relatedPost.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className={'text-gray-500'}>暂无相关文章</p>
                    )}
                </div>




            </article>



        </Layout>
    )
        ;
}

export default Post;