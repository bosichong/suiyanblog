// pages/page/[page].js
import getSortedPostsData from '../../utils/parseMd';
import Layout from '../../components/Layout';
import { Pagination } from '@nextui-org/react';
import React from 'react';
import Head from 'next/head';
import config from '../../config'; // 引入配置文件
import PostCard from '../../components/PostCard';

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
                <title>文章列表 - 第{currentPage}页 | {config.BLOG_NAME} {config.BLOG_NAME_EN}</title>
                <meta name="description" content={config.META_DESCRIPTION} />
                <meta name="keywords" content={config.META_KEYWORDS} />
                <meta content={config.BLOG_AUTHOR} name="author" />
            </Head>
            <main className="container max-w-3xl mx-auto leading-normal text-lg font-extralight">
                <div className="p-4">
                    {currentPosts.map((post) => (
                        <PostCard key={post.id} post={post} />
                    ))}
                </div>
                <div className="mt-4 flex justify-center">
                    <Pagination
                        color="primary"
                        total={totalPages}
                        initialPage={currentPage}
                        onChange={(page) => paginate(page)}
                    />
                </div>
            </main>
        </Layout>
    );
}

export default Page;
