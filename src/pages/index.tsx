import getSortedPostsData from '../utils/parseMd';
import Layout from '../components/Layout';
import Head from 'next/head';
import config from '../config';
import PostCard from '../components/PostCard';
import { Post } from '../types';
import Link from '../components/Link';
import PrimaryButton from '../components/PrimaryButton';

const postsPerPage = config.POSTS_PER_PAGE;

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  const currentPosts = allPostsData.slice(0, postsPerPage);

  return {
    props: {
      currentPosts,
    },
    revalidate: false,
  };
}

function Home({ currentPosts }: { currentPosts: Post[] }) {
  return (
      <Layout>
        <Head>
          <title>{`首页 | ${config.BLOG_NAME} - ${config.META_DESCRIPTION}`}</title>
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

        <div className="w-full">
          <div className="flex flex-col gap-4">
            {currentPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
          <div className="my-16 text-center">
            <PrimaryButton href="/Archives">
              全部文章
            </PrimaryButton>
          </div>
        </div>
      </Layout>
  );
}

export default Home;