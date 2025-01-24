// pages/index.js
import getSortedPostsData from '../utils/parseMd';
import Layout from '../components/Layout';
import { Pagination } from '@nextui-org/react';
import React from 'react';
import Head from 'next/head';
import config from '../config'; // 引入配置文件
import PostCard from '../components/PostCard';

// 使用 config.POSTS_PER_PAGE
const postsPerPage = config.POSTS_PER_PAGE;

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  const currentPosts = allPostsData.slice(0, postsPerPage); // 第一页数据
  const totalPages = Math.ceil(allPostsData.length / postsPerPage);

  return {
    props: {
      currentPosts,
      totalPages,
    },
  };
}

function Home({ currentPosts, totalPages }) {
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
          <title>Home 首页 | SuiYan 碎言 </title>
          <meta name="description" content={config.META_DESCRIPTION} />
          <meta name="keywords" content={config.META_KEYWORDS} />
          <meta content={config.BLOG_AUTHOR} name="author" />
        </Head>

          <div className="p-4">
            {currentPosts.map((post) => (
                <PostCard key={post.id} post={post} />
            ))}
          </div>
          <div className="mt-4 flex justify-center">
            <Pagination
                color="primary"
                total={totalPages}
                initialPage={1}
                onChange={(page) => paginate(page)}
            />
          </div>
      </Layout>
  );
}

export default Home;
