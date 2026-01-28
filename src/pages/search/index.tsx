import Head from 'next/head';
import React, { useState } from 'react';
import Layout from "../../components/Layout";
import Breadcrumb from "../../components/Breadcrumb";
import { useRouter } from 'next/router';
import config from '../../config';

export async function getStaticProps() {
    return {
        props: {},
    };
}

const Search = () => {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/Search/${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    return (
        <Layout>
            <Head>
                <title>搜索 | {config.BLOG_NAME}</title>
                <meta name="description" content="碎言博客站内搜索功能，可以按文章标题搜索博客内容"/>
                <meta name="keywords" content="站内搜索,博客搜索,文章查找" />
                <link rel="canonical" href="https://www.suiyan.cc/Search" />
                <meta property="og:title" content={`搜索 | ${config.BLOG_NAME}`} />
                <meta property="og:description" content="碎言博客站内搜索功能，可以按文章标题搜索博客内容" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://www.suiyan.cc/Search" />
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:title" content={`搜索 | ${config.BLOG_NAME}`} />
                <meta name="twitter:description" content="碎言博客站内搜索功能，可以按文章标题搜索博客内容" />
            </Head>

            <Breadcrumb type="search" />

            <div className="w-full">
                <div className="mb-8">
                    <form onSubmit={handleSubmit} className="relative">
                        <input
                            type="text"
                            placeholder="输入关键词搜索..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full px-4 py-3 pr-24 border border-border rounded bg-bg-content focus:outline-none focus:border-text-primary"
                        />
                        <button
                            type="submit"
                            className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1 text-sm bg-bg-body border border-border rounded hover:text-text-dark"
                        >
                            搜索
                        </button>
                    </form>
                    <p className="text-sm text-text-tertiary mt-2">
                        输入关键词后按回车或点击搜索按钮
                    </p>
                </div>
            </div>
        </Layout>
    );
};

export default Search;