// pages/posts/[id].js
// 导入用于获取排序后的文章数据的函数
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

/**
 * 获取静态路径的函数
 * @returns {Object} 包含路径和回退策略的对象
 */
export async function getStaticPaths() {
    // 获取所有文章数据
    const posts = getSortedPostsData();
    // 生成包含文章 ID 的路径对象
    return {
        paths: posts.map(post => ({
            params: { id: post.id },
        })),
        // 不启用回退
        fallback: false,
    };
}

/**
 * 获取静态属性的函数
 * @param {Object} params - 包含文章 ID 的参数对象
 * @returns {Object} 包含文章属性的对象
 */
export async function getStaticProps({ params }) {
    // 获取所有文章数据
    const posts = getSortedPostsData();
    // 根据 ID 查找文章
    const post = posts.find(p => p.id === params.id);
    // 如果文章不存在，返回 404 状态
    if (!post) {
        return {
            notFound: true,
        };
    }

    // 获取当前文章的索引
    const currentIndex = posts.findIndex(p => p.id === post.id);

    // 获取上一篇和下一篇文章
    const prevPost = currentIndex > 0 ? posts[currentIndex - 1] : null;
    const nextPost = currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;

    // 获取相关文章
    const tags = post.tag.split(',').map(t => t.trim());
    const relatedPosts = posts.filter(p => {
        const postTags = p.tag.split(',').map(t => t.trim());
        return tags.some(tag => postTags.includes(tag)) && p.id !== post.id;
    });

    // 返回文章属性和相关文章
    return {
        props: {
            post,
            relatedPosts,
            prevPost,
            nextPost,
        }, // will be passed to the page component as props
    };
}

/**
 * 展示文章的组件
 * @param {Object} post - 文章对象
 * @param {Array} relatedPosts - 相关文章数组
 * @param prevPost
 * @param nextPost
 * @returns {JSX.Element} 渲染的文章组件
 */
function Post({ post, relatedPosts, prevPost, nextPost }) {
    // 定义一个状态变量 giscusTheme，用于存储 Giscus 的主题
    const [giscusTheme, setGiscusTheme] = useState('');

    // 在组件挂载后执行副作用函数
    useEffect(() => {
        // 在客户端获取主题并设置 Giscus 的 theme 属性
        const savedTheme = localStorage.getItem('theme');
        // 如果主题为 dark，则设置 Giscus 的 theme 属性为 dark_dimmed
        // 如果主题为 light，则设置 Giscus 的 theme 属性为 light_high_contrast
        // 否则，设置 Giscus 的 theme 属性为 savedTheme
        setGiscusTheme(savedTheme === 'dark' ? 'dark_dimmed' : savedTheme === 'light' ? 'light_high_contrast' : savedTheme);
    }, []);
    return (
        <Layout>
            <Head>
                <title>{post.title} | SuiYan 碎言 - 个人技术博客</title>
                <meta name="description" content={post.description} />
                <meta name="keywords" content={post.tag.replace(/,/g, ',')} />
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
                            post.tag.split(',').map((tag, index) => (
                                <Chip size="sm" startContent={<TagIco />} variant="flat" color={getRandomColor()} key={index} className="block ml-2 flex items-center text-sm">
                                    {tag}
                                </Chip>
                            ))
                        }
                    <div className="flex items-center">
                        <BlogTime />
                        <span className="ml-2">{formatDate(post.time)}</span>
                    </div>
                </div>


                <div className={styles.blog_post_content}>
                     <ReactMarkdown
                            rehypePlugins={[rehypeRaw]} // 👈 启用原始 HTML
                            // 可选：限制 iframe 来源更安全
                            components={{
                            iframe: ({ node, ...props }) => {
                                const src = props.src as string;
                                // 仅允许 B站的 iframe
                                if (typeof src === 'string' && (src.includes('player.bilibili.com') || src.includes('//player.bilibili.com'))) {
                                return <iframe {...props} />;
                                }
                                // 其他 iframe 不渲染（防 XSS）
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
                
                </div>

                <Giscus
                    repo={giscusConfig.repo}
                    repoId={giscusConfig.repoId}
                    category={giscusConfig.category}
                    categoryId={giscusConfig.categoryId}
                    mapping={giscusConfig.mapping}
                    lang={giscusConfig.lang}
                    strict="0"
                    reactionsEnabled="1"
                    emitMetadata="0"
                    inputPosition="bottom"
                    theme={giscusTheme} // 使用动态设置的主题
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

// 导出文章页面组件
export default Post;
