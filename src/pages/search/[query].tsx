import getSortedPostsData from '../../utils/parseMd';
import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import Layout from "../../components/Layout";
import Breadcrumb from "../../components/Breadcrumb";
import { SearchIcon } from "../../components/icons/SearchIcon";
import config from "../../config";
import { Post } from '../../types';
import GlowInput from "../../components/GlowInput";
import RainbowLink from "../../components/RainbowLink";
import { useRouter } from 'next/router';

export async function getStaticPaths() {
    const allPostsData = getSortedPostsData();
    const keywords = new Set<string>();

    // 从所有文章标题中提取关键词
    allPostsData.forEach((post) => {
        if (post.title) {
            const words = post.title.toLowerCase().split(/[\s,，、。]+/);
            words.forEach((word) => {
                if (word.length >= 2) { // 只保留长度大于等于2的关键词
                    keywords.add(word);
                }
            });
        }
    });

    // 限制生成的路径数量，避免过多
    const paths = Array.from(keywords).slice(0, 100).map((query) => ({
        params: { query },
    }));

    return {
        paths,
        fallback: 'blocking', // 允许动态生成新页面
    };
}

export async function getStaticProps({ params }: { params: { query: string } }) {
    const allPostsData = getSortedPostsData();
    const query = decodeURIComponent(params.query).toLowerCase();

    const filteredPosts = allPostsData.filter(post =>
        post.title?.toLowerCase().includes(query)
    );

    return {
        props: {
            allPostsData,
            initialQuery: params.query,
            initialFilteredPosts: filteredPosts,
        },
    };
}

const SearchPage = ({ allPostsData, initialQuery, initialFilteredPosts }: { allPostsData: Post[]; initialQuery: string; initialFilteredPosts: Post[] }) => {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState(initialQuery);
    const [filteredPosts, setFilteredPosts] = useState<Post[]>(initialFilteredPosts);

    // 监听搜索查询的变化，并更新过滤后的文章列表
    useEffect(() => {
        if (searchQuery.trim()) {
            const lowerCaseQuery = searchQuery.toLowerCase();
            const filtered = allPostsData.filter(post =>
                post.title?.toLowerCase().includes(lowerCaseQuery)
            );
            setFilteredPosts(filtered);
        } else {
            setFilteredPosts([]);
        }
    }, [searchQuery, allPostsData]);

    // 处理搜索输入
    const handleSearch = (value: string) => {
        setSearchQuery(value);
    };

    // 处理搜索提交（跳转到动态路由）
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/search/${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    return (
        <Layout>
            <Head>
                <title>{searchQuery ? `搜索: ${searchQuery}` : 'Search 搜索'} | SuiYan 碎言 - 个人技术博客</title>
                <meta name="description" content="碎言博客站内搜索功能，可以按文章标题搜索博客内容"/>
                <meta name="keywords" content="站内搜索,博客搜索,文章查找,碎言博客" />
                <link rel="canonical" href={`https://www.suiyan.cc/search/${encodeURIComponent(searchQuery)}`} />
                <meta property="og:title" content={`${searchQuery ? `搜索: ${searchQuery}` : 'Search 搜索'} | SuiYan 碎言 - 个人技术博客`} />
                <meta property="og:description" content="碎言博客站内搜索功能，可以按文章标题搜索博客内容" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={`https://www.suiyan.cc/search/${encodeURIComponent(searchQuery)}`} />
                <meta property="og:site_name" content="SuiYan 碎言" />
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:title" content={`${searchQuery ? `搜索: ${searchQuery}` : 'Search 搜索'} | SuiYan 碎言`} />
                <meta name="twitter:description" content="碎言博客站内搜索功能，可以按文章标题搜索博客内容" />
            </Head>

            <Breadcrumb type="search" />

            <div className="p-4 min-h-[500px]">
                <div className="mb-8 pb-4">
                    <h1 className="text-3xl font-bold mb-3">
                        {searchQuery ? `搜索结果: ${searchQuery}` : '站内搜索'}
                    </h1>
                    {/* 搜索输入框 */}
                    <form onSubmit={handleSubmit} className="relative mb-4">
                        <GlowInput
                            type="text"
                            placeholder="JavaScript"
                            value={searchQuery}
                            onChange={(e) => handleSearch(e.target.value)}
                            className="px-4 py-3 pr-12 rounded-lg border border-border bg-default-100 dark:bg-default-50 focus:outline-none transition-all"
                            borderWidth={3}
                            blurRadius={5}
                        />
                        <button
                            type="submit"
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-default-500 hover:text-default-700 z-10 transition-colors"
                            aria-label="搜索"
                        >
                            <SearchIcon size={24} />
                        </button>
                        {searchQuery && (
                            <button
                                type="button"
                                onClick={() => {
                                    setSearchQuery('');
                                    router.push('/search');
                                }}
                                className="absolute right-12 top-1/2 -translate-y-1/2 text-default-500 hover:text-default-700 z-10"
                                aria-label="清除"
                            >
                                ✕
                            </button>
                        )}
                    </form>
                </div>

                <div className="space-y-2 ml-4">
                    {filteredPosts.length > 0 ? (
                        <>
                            <p className="text-sm opacity-60 mb-4">
                                找到 {filteredPosts.length} 篇文章
                            </p>
                            {filteredPosts.map((post, index) => (
                                <div className="transition-all duration-200" key={index}>
                                    <RainbowLink href={`/blog/${post.id}`} className="flex items-center text-ellipsis overflow-hidden whitespace-nowrap">
                                        {post.title}
                                    </RainbowLink>
                                </div>
                            ))}
                        </>
                    ) : searchQuery ? (
                        <div className="text-center py-12">
                            <p className="text-lg opacity-60">未找到匹配的文章</p>
                        </div>
                    ) : null}
                </div>
            </div>
        </Layout>
    );
};

export default SearchPage;