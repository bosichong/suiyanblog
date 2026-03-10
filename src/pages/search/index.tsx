import Head from 'next/head';
import React, { useState } from 'react';
import Layout from "../../components/Layout";
import Breadcrumb from "../../components/Breadcrumb";
import getSortedPostsData from '../../utils/parseMd';
import config from '../../config';
import SearchBox from "../../components/SearchBox";

export async function getStaticProps() {
    const allPostsData = getSortedPostsData();

    // 返回所有文章的精简数据用于客户端搜索
    const allPosts = allPostsData.map(post => ({
        id: post.id,
        title: post.title,
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
            post.title?.toLowerCase().includes(searchQuery.toLowerCase())
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
                <meta name="description" content="碎言博客站内搜索功能，可以按文章标题搜索博客"/>
                <meta name="keywords" content="站内搜索,博客搜索,文章查找" />
                <link rel="canonical" href="https://www.suiyan.cc/search" />
                <meta property="og:title" content={searchQuery ? `搜索: ${searchQuery} | ${config.BLOG_NAME}` : `搜索 | ${config.BLOG_NAME}`} />
                <meta property="og:description" content="碎言博客站内搜索功能，可以按文章标题搜索博客" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://www.suiyan.cc/search" />
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:title" content={searchQuery ? `搜索: ${searchQuery} | ${config.BLOG_NAME}` : `搜索 | ${config.BLOG_NAME}`} />
                <meta name="twitter:description" content="碎言博客站内搜索功能，可以按文章标题搜索博客" />
            </Head>

            <Breadcrumb type="search" />

            <section>
                <div>
                    <h1>
                        {searchQuery ? `搜索结果: ${searchQuery}` : '站内搜索'}
                    </h1>
                    <SearchBox
                        value={searchQuery}
                        onChange={setSearchQuery}
                        onSubmit={handleSubmit}
                    />
                </div>

                {filteredPosts.length > 0 && (
                    <p>
                        找到 {filteredPosts.length} 篇文章
                    </p>
                )}

                <ul>
                    {filteredPosts.length > 0 ? (
                        filteredPosts.map((post, index) => (
                            <li key={index}>
                                <a href={`/blog/${post.id}`}>
                                    {post.title}
                                </a>
                            </li>
                        ))
                    ) : searchQuery ? (
                        <li>
                            未找到匹配的文章
                        </li>
                    ) : null}
                </ul>
            </section>
        </Layout>
    );
};

export default Search;