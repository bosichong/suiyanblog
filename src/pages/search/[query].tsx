import getSortedPostsData from '../../utils/parseMd';
import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import Layout from "../../components/Layout";
import Breadcrumb from "../../components/Breadcrumb";
import SearchBox from "../../components/SearchBox";
import { Post } from '../../types';
import CustomLink from '../../components/Link';
import { useRouter } from 'next/router';
import config from '../../config';

export async function getStaticPaths() {
    return {
        paths: [],
        fallback: false,
    };
}

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

const SearchPage = ({ allPosts }: { allPosts: any[] }) => {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredPosts, setFilteredPosts] = useState<any[]>([]);

    useEffect(() => {
        if (searchQuery.trim()) {
            const lowerCaseQuery = searchQuery.toLowerCase();
            const filtered = allPosts.filter(post =>
                post.title?.toLowerCase().includes(lowerCaseQuery) ||
                post.description?.toLowerCase().includes(lowerCaseQuery)
            );
            setFilteredPosts(filtered);
        } else {
            setFilteredPosts([]);
        }
    }, [searchQuery, allPosts]);

    const handleSearch = (value: string) => {
        setSearchQuery(value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/search/${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    return (
        <Layout>
            <Head>
                <title>{`${searchQuery ? `搜索: ${searchQuery}` : '搜索'} | ${config.BLOG_NAME}`}</title>
                <meta name="description" content="碎言博客站内搜索功能，可以按文章标题搜索博客内容"/>
                <meta name="keywords" content="站内搜索,博客搜索,文章查找" />
                <link rel="canonical" href={`https://www.suiyan.cc/search/${encodeURIComponent(searchQuery)}`} />
                <meta property="og:title" content={`${searchQuery ? `搜索: ${searchQuery}` : '搜索'} | ${config.BLOG_NAME}`} />
                <meta property="og:description" content="碎言博客站内搜索功能，可以按文章标题搜索博客内容" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={`https://www.suiyan.cc/search/${encodeURIComponent(searchQuery)}`} />
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:title" content={`${searchQuery ? `搜索: ${searchQuery}` : '搜索'} | ${config.BLOG_NAME}`} />
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
                        onChange={handleSearch}
                        onSubmit={handleSubmit}
                    />
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

export default SearchPage;
