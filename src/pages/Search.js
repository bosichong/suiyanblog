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
                <title>Search | {config.BLOG_NAME_EN} {config.BLOG_NAME}</title>
                <meta name="description" content="站内搜索，可以按文章标题搜索"/>
            </Head>
            <main className="container max-w-3xl mx-auto leading-normal text-lg font-extralight">
                <div className="p-4">
                    <div className="container mx-auto">
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
                        <ul>
                            {filteredPosts.map((post, index) => (
                                <li className={'list-group-item  hover:animate-bounce'}  key={index}>
                                    <Link href={`/blog/${post.id}`} className="block text-ellipsis overflow-hidden whitespace-nowrap">{post.title}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </main>
        </Layout>
);
};

export default Search;
