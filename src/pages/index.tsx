import getSortedPostsData from '../utils/parseMd';
import Layout from '../components/Layout';
import Head from 'next/head';
import config from '../config';
import PostCard from '../components/PostCard';
import AboutMe from '../components/AboutMe';
import { Post } from '../types';
import Link from 'next/link';
import { motion } from 'framer-motion';

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
          <motion.div
            className="flex flex-col gap-4"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.04 // 每个子元素之间延迟0.08秒
                }
              }
            }}
          >
            {currentPosts.map((post, index) => (
              <motion.div
                key={post.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } }
                }}
              >
                <PostCard post={post} />
              </motion.div>
            ))}
          </motion.div>
          <div className="mt-8 text-center">
            <Link href="/Archives" className="text-primary hover:text-primary-dark transition-colors duration-200">
              更多文章
            </Link>
          </div>
        </div>
      </Layout>
  );
}

export default Home;