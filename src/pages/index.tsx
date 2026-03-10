import getSortedPostsData from '../utils/parseMd';
import getSortedThoughtsData from '../utils/parseThoughts';
import Layout from '../components/Layout';
import Head from 'next/head';
import config from '../config';
import PostListItem from '../components/PostListItem';
import { Post } from '../types';
import ThoughtsPreview from '../components/ThoughtsPreview';

const postsPerPage = config.POSTS_PER_PAGE;

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  const currentPosts = allPostsData.slice(0, postsPerPage);
  const thoughts = getSortedThoughtsData();
  const latestThought = thoughts.length > 0 ? thoughts[0] : null;

  return {
    props: {
      currentPosts,
      latestThought,
    },
    revalidate: false,
  };
}

function Home({ currentPosts, latestThought }: { currentPosts: Post[], latestThought: Post | null }) {
  // 首页日期格式化函数
  const homeFormatDate = (dateString: string): string => {
    if (!dateString) return '';
    const parts = dateString.split('T')[0];
    const [year, month, day] = (parts || dateString.substring(0, 10)).split('-');
    return `${month}/${day}`;
  };

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

        <section>
          <ThoughtsPreview latestThought={latestThought} />
          <article>
            {currentPosts.map((post) => (
              <PostListItem
                key={post.id}
                id={post.id}
                title={post.title || ''}
                time={post.time || ''}
                formatDate={homeFormatDate}
              />
            ))}
          </article>
          <button onClick={() => window.location.href = '/Archives'}>
            全部文章
          </button>
        </section>
      </Layout>
  );
}

export default Home;