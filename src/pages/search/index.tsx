import Head from 'next/head';
import React, { useState } from 'react';
import Layout from "../../components/Layout";
import Breadcrumb from "../../components/Breadcrumb";
import getSortedPostsData from '../../utils/parseMd';
import CustomLink from '../../components/Link';
import config from '../../config';
import SearchBox from "../../components/SearchBox";

export async function getStaticProps() {
    const allPostsData = getSortedPostsData();

    // 返回所有文章的精简数据用于客户端搜索
    const allPosts = allPostsData.map(post => ({
        id: post.id,
        title: post.title,
        description: post.description,
    }));

    return {
        props: {
            allPosts,
        },
        revalidate: false,
    };
}

const Search = ({ allPosts }: { allPosts: any[] }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredPosts = searchQuery.trim()
        ? allPosts.filter(post =>
            post.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.description?.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : [];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // 搜索结果会自动显示，无需跳转
    };

    return (
        <Layout>
            <Head>
                <title>{searchQuery ? `搜索: ${searchQuery} | ${config.BLOG_NAME}` : `搜索 | ${config.BLOG_NAME}`}</title>
                <meta name="description" content="碎言博客站内搜索功能，可以按文章标题搜索博客内容"/>
                <meta name="keywords" content="站内搜索,博客搜索,文章查找" />
                <link rel="canonical" href="https://www.suiyan.cc/search" />
                <meta property="og:title" content={searchQuery ? `搜索: ${searchQuery} | ${config.BLOG_NAME}` : `搜索 | ${config.BLOG_NAME}`} />
                <meta property="og:description" content="碎言博客站内搜索功能，可以按文章标题搜索博客内容" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://www.suiyan.cc/search" />
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:title" content={searchQuery ? `搜索: ${searchQuery} | ${config.BLOG_NAME}` : `搜索 | ${config.BLOG_NAME}`} />
                <meta name="twitter:description" content="碎言博客站内搜索功能，可以按文章标题搜索博客内容" />
            </Head>

            <Breadcrumb type="search" />

            <div className="w-full">
                <div className="mb-8">
                    <h1 className="text-2xl font-semibold mb-4 text-text-primary">
                        {searchQuery ? `搜索结果: ${searchQuery}` : '站内搜索'}
                    </h1>
                    <SearchBox
                        value={searchQuery}
                        onChange={setSearchQuery}
                        onSubmit={handleSubmit}
                    />
                    <p className="text-sm text-text-tertiary mt-2">
                        输入关键词后按回车或点击搜索按钮
                    </p>
                </div>

                <ul className="space-y-2 pl-0">
                    {filteredPosts.length > 0 ? (
                        <>
                            <p className="text-sm text-text-tertiary mb-4">
                                找到 {filteredPosts.length} 篇文章
                            </p>
                            {filteredPosts.map((post, index) => (
                                <li key={index} className="flex items-center justify-between">
                                    <CustomLink href={`/blog/${post.id}`} className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
                                        {post.title}
                                    </CustomLink>
                                </li>
                            ))}
                        </>
                    ) : searchQuery ? (
                        <li className="text-center py-12">
                            <p className="text-lg text-text-secondary">未找到匹配的文章</p>
                        </li>
                    ) : null}
                </ul>
            </div>
        </Layout>
    );
};

export default Search;