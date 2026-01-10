import getSortedPostsData from '../utils/parseMd';
import Layout from '../components/Layout';

import React, {useEffect} from 'react';
import {Link} from "@nextui-org/react";
import Head from 'next/head';
import { Post } from '../types';

export async function getStaticProps() {
    const allPostsData = getSortedPostsData();

    // 按年份和月份归类
    const postsByYearMonth: { [key: string]: Post[] } = {};
    allPostsData.forEach((post) => {
        const yearMonth = post.time ? post.time.split('-').slice(0, 2).join('-') : ''; // 假设日期格式为 'YYYY-MM-DD'
        if (!postsByYearMonth[yearMonth]) {
            postsByYearMonth[yearMonth] = [];
        }
        postsByYearMonth[yearMonth].push(post);
    });

    return {
        props: {
            allPostsData,
            postsByYearMonth, // 将按年份和月份归类的数据传递给组件
        },
    };
}



const Archives = ({ allPostsData, postsByYearMonth }: { allPostsData: Post[], postsByYearMonth: { [key: string]: Post[] } }) => {
    const totalPosts = allPostsData.length;
    const lastUpdated = allPostsData[0]?.time ? new Date(allPostsData[0].time).toLocaleDateString() : '';


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

            <div className="max-w-4xl mx-auto p-6">
                <div className="mb-8 pb-4">
                    <h1 className="text-3xl font-bold mb-3">文章归档</h1>
                    <p className="text-sm opacity-80">共有文章：{totalPosts} 篇，最后更新时间：{lastUpdated}</p>
                </div>

                <div className="space-y-10">
                    {Object.keys(postsByYearMonth).map((yearMonth) => (
                        <div className="archive-year-section" key={yearMonth}>
                            <h2 className="text-xl font-medium mb-4 inline-block relative">
                                {yearMonth}
                                <span className="ml-3 text-sm opacity-70">({postsByYearMonth[yearMonth].length}篇)</span>
                            </h2>

                            <ul className="space-y-2 ml-4 mt-4">
                                {postsByYearMonth[yearMonth].map((post) => (
                                    <li className="transition-all duration-200 hover:translate-x-1" key={post.id}>
                                        <Link
                                            href={`/blog/${post.id}`}
                                            className="rainbow_hover group flex items-center text-ellipsis overflow-hidden whitespace-nowrap"
                                        >
                                            {post.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default Archives;