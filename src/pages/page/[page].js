// pages/page/[page].js
import getSortedPostsData from '../../utils/parseMd';
import Layout from '../../components/Layout';
import { Pagination } from '@nextui-org/react';
import React from 'react';
import Head from 'next/head';
import config from '../../config'; // 引入配置文件
import AtroposPostCard from '../../components/AtroposPostCard';

// 使用 config.POSTS_PER_PAGE
const postsPerPage = config.POSTS_PER_PAGE;

export async function getStaticPaths() {
    const allPostsData = getSortedPostsData();
    const totalPages = Math.ceil(allPostsData.length / postsPerPage);

    const paths = Array.from({ length: totalPages - 1 }, (_, index) => ({
        params: { page: (index + 2).toString() }, // 从第2页开始
    }));

    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params }) {
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

function Page({ currentPosts, currentPage, totalPages }) {
    const paginate = (pageNumber) => {
        if (pageNumber === 1) {
            window.location.href = '/';
        } else {
            window.location.href = `/page/${pageNumber}`;
        }
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
            <div className="container mx-auto px-4 sm:px-6 lg:px-4 max-w-4xl">
                <div className="grid gap-4">
                    {currentPosts.map((post) => (
                        <AtroposPostCard key={post.id} post={post} />
                    ))}
                </div>
                <div className="mt-8 mb-4 flex justify-center">
                    <Pagination
                        color="primary"
                        total={totalPages}
                        initialPage={currentPage}
                        onChange={(page) => paginate(page)}
                        className="shadow-sm"
                        size="lg"
                    />
                </div>
            </div>
        </Layout>
    );
}

export default Page;
