// pages/index.js
import getSortedPostsData from '../utils/parseMd';
import Layout from '../components/Layout';
import { Pagination } from '@nextui-org/react';
import React, {useEffect} from 'react';
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
  const animateListItems =  () => {
    const listItems = document.querySelectorAll('.list_item');

    listItems.forEach((item, index) => {
        setTimeout(() => {
            item.classList.remove('hidden');
            item.classList.add('motion-preset-focus');
        }, index * 100);
    });
}


  const paginate = (pageNumber) => {
    if (pageNumber === 1) {
      window.location.href = '/';
    } else {
      window.location.href = `/page/${pageNumber}`;
    }
  };


  useEffect(() => {
    animateListItems();
  }, [currentPosts]);

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
                <div className={"list_item hidden"}>
                  <PostCard key={post.id} post={post}  />

                </div>

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
