import getSortedPostsData from '../../utils/parseMd';
import Layout from '../../components/Layout';
import React from 'react';
import Head from 'next/head';
import Breadcrumb from '../../components/Breadcrumb';
import config from '../../config';
import PostCard from '../../components/PostCard';
import { Post } from '../../types';

const postsPerPage = config.POSTS_PER_PAGE;

export async function getStaticPaths() {
    const allPostsData = getSortedPostsData();
    const totalPages = Math.ceil(allPostsData.length / postsPerPage);

    const paths = Array.from({ length: totalPages - 1 }, (_, index) => ({
        params: { page: (index + 2).toString() },
    }));

    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params }: { params: { page: string } }) {
    const allPostsData = getSortedPostsData();
    const currentPage = parseInt(params.page, 10);
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = allPostsData.slice(indexOfFirstPost, indexOfLastPost);

    return {
        props: {
            currentPosts,
            currentPage,
            totalPages: Math.ceil(allPostsData.length / postsPerPage),
        },
    };
}

function Page({ currentPosts, currentPage, totalPages }: { currentPosts: Post[]; currentPage: number; totalPages: number }) {
    const paginate = (pageNumber: number) => {
        if (pageNumber === 1) {
            window.location.href = '/';
        } else {
            window.location.href = `/page/${pageNumber}`;
        }
    };

    const renderPagination = () => {
        const pages = [];
        const maxVisible = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
        let endPage = Math.min(totalPages, startPage + maxVisible - 1);

        if (endPage - startPage + 1 < maxVisible) {
            startPage = Math.max(1, endPage - maxVisible + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => paginate(i)}
                    className={`px-4 py-2 rounded-lg transition-all ${
                        i === currentPage
                            ? 'bg-primary text-white hover:bg-primary-hover'
                            : 'bg-default-100 dark:bg-default-50 hover:bg-primary hover:text-white'
                    }`}
                >
                    {i}
                </button>
            );
        }

        return pages;
    };

    return (
        <Layout>
            <Head>
                <title>文章列表 - 第{currentPage}页 | SuiYan 碎言 - 个人技术博客</title>
                <meta name="description" content={`碎言博客文章列表第${currentPage}页 - ${config.META_DESCRIPTION}`} />
                <meta name="keywords" content={config.META_KEYWORDS} />
                <meta content={config.BLOG_AUTHOR} name="author" />
                <link rel="canonical" href={`https://www.suiyan.cc/page/${currentPage}`} />
                <meta property="og:title" content={`文章列表 - 第${currentPage}页 | SuiYan 碎言 - 个人技术博客`} />
                <meta property="og:description" content={`碎言博客文章列表第${currentPage}页 - ${config.META_DESCRIPTION}`} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={`https://www.suiyan.cc/page/${currentPage}`} />
                <meta property="og:site_name" content="SuiYan 碎言" />
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:title" content={`文章列表 - 第${currentPage}页 | SuiYan 碎言`} />
                <meta name="twitter:description" content={`碎言博客文章列表第${currentPage}页 - ${config.META_DESCRIPTION}`} />
            </Head>
            <Breadcrumb type="page" pageNum={currentPage} />
            <div className="container mx-auto px-4 sm:px-6 lg:px-4 max-w-4xl">
                <div className="grid gap-4">
                    {currentPosts.map((post) => (
                        <PostCard key={post.id} post={post} />
                    ))}
                </div>
                <div className="mt-8 mb-4 flex justify-center gap-2">
                    {renderPagination()}
                </div>
            </div>
        </Layout>
    );
}

export default Page;