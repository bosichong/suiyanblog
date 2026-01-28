import getSortedPostsData from '../utils/parseMd';
import Layout from '../components/Layout';
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
      const isCurrentPage = i === 1;
      pages.push(
        <button
          key={i}
          onClick={() => paginate(i)}
          className={`px-3 py-1 text-sm border border-border rounded ${
            isCurrentPage
              ? 'bg-bg-body text-text-primary'
              : 'bg-bg-content text-text-secondary hover:text-text-dark'
          }`}
          aria-label={`第 ${i} 页`}
          aria-current={isCurrentPage ? 'page' : undefined}
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
          <title>首页 | {config.BLOG_NAME} - {config.META_DESCRIPTION}</title>
          <meta name="description" content={config.META_DESCRIPTION} />
          <meta name="keywords" content={config.META_KEYWORDS} />
          <meta name="author" content={config.BLOG_AUTHOR} />
          <link rel="canonical" href="https://www.suiyan.cc/" />
          <meta property="og:title" content={`${config.BLOG_NAME} - ${config.META_DESCRIPTION}`} />
          <meta property="og:description" content={config.META_DESCRIPTION} />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://www.suiyan.cc/" />
          <meta property="og:site_name" content={config.BLOG_NAME} />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:title" content={config.BLOG_NAME} />
          <meta name="twitter:description" content={config.META_DESCRIPTION} />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": config.BLOG_NAME,
                "alternateName": "碎言",
                "url": "https://www.suiyan.cc/",
                "description": config.META_DESCRIPTION,
                "author": {
                  "@type": "Person",
                  "name": config.BLOG_AUTHOR
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

        <div className="w-full">
          <div className="flex flex-col gap-4">
            {currentPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
          {totalPages > 1 && (
            <nav className="mt-8 mb-4 flex justify-center gap-2" aria-label="分页导航">
              {renderPagination()}
            </nav>
          )}
        </div>
      </Layout>
  );
}

export default Home;