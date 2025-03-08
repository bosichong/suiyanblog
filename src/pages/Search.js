import getSortedPostsData from '../utils/parseMd';
import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import {Input, Link} from '@nextui-org/react';
import Layout from "../components/Layout";
import SearchIco from "../components/ico/Search";
import config from "../config.js";

export async function getStaticProps() {
    const allPostsData = getSortedPostsData();
    return {
        props: {
            allPostsData,
        },
    };
}

const Search = ({ allPostsData }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredPosts, setFilteredPosts] = useState([]);

    // 监听搜索查询的变化，并更新过滤后的文章列表
    useEffect(() => {
        if (searchQuery.trim()) {
            const lowerCaseQuery = searchQuery.toLowerCase();
            const filtered = allPostsData.filter(post =>
                post.title.toLowerCase().includes(lowerCaseQuery)
            );
            setFilteredPosts(filtered);
        } else {
            setFilteredPosts([]); // 没有搜索查询时，不显示任何文章
        }
    }, [searchQuery, allPostsData]);

    return (
        <Layout>
            <Head>
                <title>Search | SuiYan 碎言 </title>
                <meta name="description" content="站内搜索，可以按文章标题搜索"/>
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
                            clearable
                            className="mb-4"
                            endContent={<SearchIco />}
                        />
                    </div>
                    
                    <div className="space-y-2 ml-4">
                        {filteredPosts.map((post, index) => (
                            <div className="transition-all duration-200 hover:translate-x-1" key={index}>
                                <Link 
                                    href={`/blog/${post.id}`} 
                                    className="group flex items-center text-ellipsis overflow-hidden whitespace-nowrap"
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
