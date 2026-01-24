import getSortedPostsData from '../utils/parseMd';
import Layout from '../components/Layout';
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

  const renderPagination = () => {
    const pages = [];
    const maxVisible = 5;
    let startPage = 1;
    let endPage = totalPages;

    if (totalPages > maxVisible) {
      const middle = Math.ceil(maxVisible / 2);
      startPage = Math.max(1, 1 - middle + 1);
      endPage = Math.min(totalPages, startPage + maxVisible - 1);

      if (endPage - startPage + 1 < maxVisible) {
        startPage = Math.max(1, endPage - maxVisible + 1);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => paginate(i)}
          className={`px-4 py-2 rounded-lg transition-all ${
            i === 1
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
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": "SuiYan 碎言",
                "alternateName": "碎言",
                "url": "https://www.suiyan.cc/",
                "description": config.META_DESCRIPTION,
                "author": {
                  "@type": "Person",
                  "name": config.BLOG_AUTHOR
                },
                "publisher": {
                  "@type": "Organization",
                  "name": "SuiYan 碎言",
                  "logo": {
                    "@type": "ImageObject",
                    "url": "https://www.suiyan.cc/assets/images/avatar.jpg"
                  }
                },
                "potentialAction": {
                  "@type": "SearchAction",
                  "target": "https://www.suiyan.cc/Search?q={search_term_string}",
                  "query-input": "required name=search_term_string"
                }
              })
            }}
          />
        </Head>

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

export default Home;