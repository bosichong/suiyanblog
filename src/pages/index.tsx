import getSortedPostsData from '../utils/parseMd';
import Layout from '../components/Layout';
import { Pagination } from '@nextui-org/react';
import React, {useEffect} from 'react';
import Head from 'next/head';
import config from '../config';
import PostCard from '../components/PostCard';
import { Post } from '../types';

const postsPerPage = config.POSTS_PER_PAGE;

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  const currentPosts = allPostsData.slice(0, postsPerPage);
  const totalPages = Math.ceil(allPostsData.length / postsPerPage);

  return {
    props: {
      currentPosts,
      totalPages,
    },
  };
}

function Home({ currentPosts, totalPages }: { currentPosts: Post[]; totalPages: number }) {


  const paginate = (pageNumber: number) => {
    if (pageNumber === 1) {
      window.location.href = '/';
    } else {
      window.location.href = `/page/${pageNumber}`;
    }
  };


  return (
      <Layout>
        <Head>
          <title>Home 首页 | SuiYan 碎言 - 个人技术博客</title>
          <meta name="description" content={config.META_DESCRIPTION} />
          <meta name="keywords" content={config.META_KEYWORDS} />
          <meta content={config.BLOG_AUTHOR} name="author" />
          <link rel="canonical" href="https://www.suiyan.cc/" />
          <meta property="og:title" content="SuiYan 碎言 - 个人技术博客" />
          <meta property="og:description" content={config.META_DESCRIPTION} />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://www.suiyan.cc/" />
          <meta property="og:site_name" content="SuiYan 碎言" />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:title" content="SuiYan 碎言 - 个人技术博客" />
          <meta name="twitter:description" content={config.META_DESCRIPTION} />
        </Head>

          <div className="container mx-auto px-4 sm:px-6 lg:px-4 max-w-4xl">
            <div className="grid gap-4">
              {currentPosts.map((post) => (
                    <PostCard key={post.id} post={post} />
              ))}
            </div>
            <div className="mt-8 mb-4 flex justify-center">
              <Pagination
                  color="primary"
                  total={totalPages}
                  initialPage={1}
                  onChange={(page) => paginate(page)}
                  className="shadow-sm"
                  size="lg"
              />
            </div>
          </div>
      </Layout>
  );
}

export default Home;