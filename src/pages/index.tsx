import getSortedPostsData from '../utils/parseMd';
import Layout from '../components/Layout';
import React, {useEffect} from 'react';
import Head from 'next/head';
import config from '../config';
import PostCard from '../components/PostCard';
import GlowCard from '../components/GlowCard';
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
      const isCurrentPage = i === 1;
      pages.push(
        <GlowCard 
          key={i} 
          borderWidth={1} 
          blurRadius={4} 
          borderRadius="8px" 
          displayDuration={isCurrentPage ? 999999 : 500} 
          fadeDuration={400} 
          className="inline-block"
          alwaysShowGlow={isCurrentPage}
        >
          <button
            onClick={() => paginate(i)}
            className={`px-4 py-2 rounded-lg transition-all ${
              isCurrentPage
                ? 'bg-transparent text-primary'
                : 'bg-default-100 dark:bg-default-50'
            }`}
          >
            {i}
          </button>
        </GlowCard>
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
                  "target": "https://www.suiyan.cc/search?q={search_term_string}",
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

                  <script
            dangerouslySetInnerHTML={{
                __html: `
                    console.log('🌟 欢迎来到碎言博客！');
                    console.log('网站: https://www.suiyan.cc');
                    console.log('------------------------');
                    console.log('⚠️ 检测到控制台访问！');
                    console.log('[警告] 已触发入侵检测系统');
                    console.log('[进度] 正在接管你的浏览器...');
                    setTimeout(() => {
                        console.log('[完成] 浏览器已接管 ✓');
                        console.log('[进度] 正在控制摄像头...');
                    }, 500);
                    setTimeout(() => {
                        console.log('[完成] 摄像头已激活');
                        console.log('[进度] 正在扫描硬盘...');
                    }, 1000);
                    setTimeout(() => {
                        console.log('[发现] 找到可疑文件');
                        console.log('[进度] 正在提取密码...');
                    }, 1500);
                    setTimeout(() => {
                        console.log('[成功] 已获取所有密码');
                        console.log('[进度] 正在加密硬盘...');
                    }, 2000);
                    setTimeout(() => {
                        console.log('[警告] 加密进度: 10%...50%...90%...');
                    }, 2500);
                    setTimeout(() => {
                        console.log('[完成] 硬盘加密完成！');
                        console.log('哈哈哈哈哈哈哈哈哈哈哈哈！');
                        console.log('🤣 开个玩笑啦！别怕！');
                        console.log('我只是个控制台彩蛋，不会真的入侵你的电脑的！');
                        console.log('💓 祝你今天开心！');
                    }, 3000);
                `
            }}
        />
      </Layout>
  );
}

export default Home;