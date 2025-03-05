import getSortedPostsData from '../utils/parseMd';
import Layout from '../components/Layout';

import React, {useEffect} from 'react';
import {Link} from "@nextui-org/react";
import Head from 'next/head';


export async function getStaticProps() {
    const allPostsData = getSortedPostsData();

    // 按年份和月份归类
    const postsByYearMonth = {};
    allPostsData.forEach((post) => {
        const yearMonth = post.time.split('-').slice(0, 2).join('-'); // 假设日期格式为 'YYYY-MM-DD'
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



const Archives = ({ allPostsData, postsByYearMonth }) => {
    const totalPosts = allPostsData.length;
    const lastUpdated = new Date(allPostsData[0].time).toLocaleDateString();


    return (
        <Layout>
            <Head>
                <title>Archives 文章归档 |  SuiYan 碎言 </title>
                <meta name="description" content="碎言博客的所有文章归档"/>
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
                                            className="group flex items-center text-ellipsis overflow-hidden whitespace-nowrap"
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
