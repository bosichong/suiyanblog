import getSortedPostsData from '../../utils/parseMd';
import Layout from '../../components/Layout';
import Head from 'next/head';
import Breadcrumb from '../../components/Breadcrumb';
import config from '../../config';
import PostCard from '../../components/PostCard';
import Pagination from '../../components/Pagination';
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
  return (
    <Layout>
      <Head>
        <title>文章列表 - 第{currentPage}页 | {config.BLOG_NAME}</title>
        <meta name="description" content={`碎言博客文章列表第${currentPage}页 - ${config.META_DESCRIPTION}`} />
        <meta name="keywords" content={config.META_KEYWORDS} />
        <meta name="author" content={config.BLOG_AUTHOR} />
        <link rel="canonical" href={`https://www.suiyan.cc/page/${currentPage}`} />
        <meta property="og:title" content={`文章列表 - 第${currentPage}页 | ${config.BLOG_NAME}`} />
        <meta property="og:description" content={`碎言博客文章列表第${currentPage}页 - ${config.META_DESCRIPTION}`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://www.suiyan.cc/page/${currentPage}`} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={`文章列表 - 第${currentPage}页 | ${config.BLOG_NAME}`} />
        <meta name="twitter:description" content={`碎言博客文章列表第${currentPage}页 - ${config.META_DESCRIPTION}`} />
      </Head>
      <Breadcrumb type="page" pageNum={currentPage} />
      <div className="w-full">
        <div className="flex flex-col gap-4">
          {currentPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          basePath="page"
        />
      </div>
    </Layout>
  );
}

export default Page;