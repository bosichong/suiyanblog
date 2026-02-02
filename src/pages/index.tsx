import getSortedPostsData from '../utils/parseMd';
import Layout from '../components/Layout';
import Head from 'next/head';
import config from '../config';
import PostCard from '../components/PostCard';
import AboutMe from '../components/AboutMe';
import { Post } from '../types';
import Link from 'next/link';

const postsPerPage = config.POSTS_PER_PAGE;

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  const currentPosts = allPostsData.slice(0, postsPerPage);

  return {
    props: {
      currentPosts,
    },
  };
}

function Home({ currentPosts }: { currentPosts: Post[] }) {
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
                  "target": "https://www.suiyan.cc/search?q={search_term_string}",
                  "query-input": "required name=search_term_string"
                }
              })
            }}
          />
        </Head>

        <div className="w-full mb-8">
          <AboutMe />
        </div>

        <div className="w-full">
          <div className="flex flex-col gap-4">
            {currentPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/Archives" className="inline-flex items-center gap-1 text-primary hover:text-primary-dark transition-colors duration-200">
              全部文章
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"></path>
              </svg>
            </Link>
          </div>
        </div>
      </Layout>
  );
}

export default Home;