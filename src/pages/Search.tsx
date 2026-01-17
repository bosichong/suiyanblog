import getSortedPostsData from '../utils/parseMd';
import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import {Input, Link} from '@nextui-org/react';
import Layout from "../components/Layout";
import { SearchIcon } from "../components/icons/SearchIcon";
import config from "../config";
import { Post } from '../types';

export async function getStaticProps() {
    const allPostsData = getSortedPostsData();
    return {
        props: {
            allPostsData,
        },
    };
}

const Search = ({ allPostsData }: { allPostsData: Post[] }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);

    // 监听搜索查询的变化，并更新过滤后的文章列表
    useEffect(() => {
        if (searchQuery.trim()) {
            const lowerCaseQuery = searchQuery.toLowerCase();
            const filtered = allPostsData.filter(post =>
                post.title?.toLowerCase().includes(lowerCaseQuery)
            );
            setFilteredPosts(filtered);
        } else {
            setFilteredPosts([]); // 没有搜索查询时，不显示任何文章
        }
    }, [searchQuery, allPostsData]);

    return (
        <Layout>
            <Head>
                <title>Search 搜索 | SuiYan 碎言 - 个人技术博客</title>
                <meta name="description" content="碎言博客站内搜索功能，可以按文章标题搜索博客内容"/>
                <meta name="keywords" content="站内搜索,博客搜索,文章查找,碎言博客" />
                <link rel="canonical" href="https://www.suiyan.cc/Search" />
                <meta property="og:title" content="Search 搜索 | SuiYan 碎言 - 个人技术博客" />
                <meta property="og:description" content="碎言博客站内搜索功能，可以按文章标题搜索博客内容" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://www.suiyan.cc/Search" />
                <meta property="og:site_name" content="SuiYan 碎言" />
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:title" content="Search 搜索 | SuiYan 碎言" />
                <meta name="twitter:description" content="碎言博客站内搜索功能，可以按文章标题搜索博客内容" />
            </Head>

                <div className="p-4 min-h-[500px]">
                    <div className="mb-8 pb-4">
                        <h1 className="text-3xl font-bold mb-3">站内搜索</h1>
                        {/* 添加放大镜图标 */}
                        <Input
                            placeholder="JavaScript"
                            variant="bordered"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            isClearable
                            className="mb-4"
                            endContent={<SearchIcon size={24} />}
                        />
                    </div>

                    <div className="space-y-2 ml-4">
                        {filteredPosts.map((post, index) => (
                            <div className="transition-all duration-200 hover:translate-x-1" key={index}>
                                <Link
                                    href={`/blog/${post.id}`}
                                    className="rainbow_hover group flex items-center text-ellipsis overflow-hidden whitespace-nowrap"
                                >
                                    {post.title}
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
        </Layout>
);
};

export default Search;