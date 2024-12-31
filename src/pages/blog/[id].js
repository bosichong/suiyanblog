// pages/posts/[id].js
// 导入用于获取排序后的文章数据的函数

import ReactMarkdown from 'react-markdown';

import getSortedPostsData  from "../../utils/parseMd";

import Layout from "../../components/Layout";
import styles from './[id].module.css';
import formatDate from "../../utils/formatDate";

import Giscus from '@giscus/react';
import giscusConfig from '../../giscusConfigs';
import config from "@/config";
import Head from "next/head";
import React from "react";

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
    // 返回文章属性
    return {
        props: {
            post,
        }, // will be passed to the page component as props
    };
}

/**
 * 展示文章的组件
 * @param {Object} post - 文章对象
 * @returns {JSX.Element} 渲染的文章组件
 */
function Post({ post }) {
    return (
        <Layout>
            <Head>
                <title>{post.title} | {config.BLOG_NAME_EN} {config.BLOG_NAME}</title>
                <meta name="description" content={post.description}/>
            </Head>
            <main className={'container max-w-3xl mx-auto leading-normal text-lg font-extralight'}>
                <div className={'p-4'}>
                    <h1 className={styles.blog_post_title}>{post.title}</h1>
                    <div className={"text-sm flex flex-wrap my-2"}>
                        作者:<span>{post.author}</span> · 发表于:
                        <div>
                            <span>{formatDate(post.time)}</span>
                        </div>
                    </div>

                    <div className={styles.blog_post_content}>
                        <ReactMarkdown>{post.content}</ReactMarkdown>
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
                        theme="dark_dimmed"
                    />

                </div>

            </main>

        </Layout>
    )
        ;
}

// 导出文章页面组件
export default Post;
