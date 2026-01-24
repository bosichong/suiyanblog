import getSortedPostsData from '../utils/parseMd';
import Layout from '../components/Layout';

import React, {useEffect} from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Breadcrumb from '../components/Breadcrumb';
import { Post } from '../types';

export async function getStaticProps() {
    const allPostsData = getSortedPostsData();

    // 按年份归类
    const postsByYear: { [key: string]: Post[] } = {};
    allPostsData.forEach((post) => {
        const year = post.time ? post.time.split('-')[0] : '';
        if (!postsByYear[year]) {
            postsByYear[year] = [];
        }
        postsByYear[year].push(post);
    });

    return {
        props: {
            allPostsData,
            postsByYear, // 将按年份归类的数据传递给组件
        },
    };
}



const Archives = ({ allPostsData, postsByYear }: { allPostsData: Post[], postsByYear: { [key: string]: Post[] } }) => {
    const totalPosts = allPostsData.length;
    const lastUpdated = allPostsData[0]?.time ? new Date(allPostsData[0].time).toLocaleDateString() : '';

    // 格式化日期显示
    const formatDate = (dateStr: string) => {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        const month = date.toLocaleString('en-US', { month: 'short' });
        const day = date.getDate();
        const year = date.getFullYear();
        return `${month} ${day}, ${year}`;
    };

    return (
        <Layout>
            <Head>
                <title>Archives 文章归档 | SuiYan 碎言 - 个人技术博客</title>
                <meta name="description" content="碎言博客的所有文章归档，按时间顺序整理的全部技术文章和随笔"/>
                <meta name="keywords" content="文章归档,博客归档,技术文章,碎言博客,时间线" />
                <link rel="canonical" href="https://www.suiyan.cc/Archives" />
                <meta property="og:title" content="Archives 文章归档 | SuiYan 碎言 - 个人技术博客" />
                <meta property="og:description" content="碎言博客的所有文章归档，按时间顺序整理的全部技术文章和随笔" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://www.suiyan.cc/Archives" />
                <meta property="og:site_name" content="SuiYan 碎言" />
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:title" content="Archives 文章归档 | SuiYan 碎言" />
                <meta name="twitter:description" content="碎言博客的所有文章归档，按时间顺序整理的全部技术文章和随笔" />
            </Head>

            <Breadcrumb type="archives" />

            <div className="max-w-4xl mx-auto p-6">
                {/* 顶部介绍区域 */}
                <div className="mb-12">
                    <h4 className="font-medium m-0 mb-1">文章归档</h4>
                    <p className="text-sm opacity-80 mb-0">共有文章：{totalPosts} 篇，最后更新于 {lastUpdated}</p>
                </div>

                {/* 文章列表区域 - grid 布局 */}
                <ul className="list-none m-0 !p-0 space-y-16">
                    {Object.keys(postsByYear).sort((a, b) => parseInt(b) - parseInt(a)).map((year) => (
                        <li className="grid items-baseline md:grid-cols-3 m-0" key={year}>
                            {/* 左侧年份 - sticky 定位 */}
                            <p className="left-0 top-6 z-40 m-0 tabular-nums tracking-tight opacity-60 lg:sticky">
                                {year}
                            </p>

                            {/* 右侧文章列表 */}
                            <ul className="list-none space-y-3 col-span-2 m-0">
                                {postsByYear[year].map((post) => (
                                    <li className="group grid grid-flow-col m-0 p-0 items-baseline" key={post.id}>
                                        <Link
                                            href={`/blog/${post.id}`}
                                            className="rainbow_hover items-center m-0 flex"
                                        >
                                            <h2 className="font-body m-0 transition group-hover:opacity-100">
                                                {post.title}
                                            </h2>
                                        </Link>
                                        <p className="m-0 text-sm text-right opacity-60 transition group-hover:opacity-100">
                                            {formatDate(post.time || '')}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            </div>
        </Layout>
    );
};

export default Archives;