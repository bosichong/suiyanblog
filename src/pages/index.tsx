import getSortedPostsData from '../utils/parseMd';
import getSortedThoughtsData from '../utils/parseThoughts';
import Layout from '../components/Layout';
import Head from 'next/head';
import config from '../config';
import PostListItem from '../components/PostListItem';
import { Post } from '../types';
import ThoughtsPreview from '../components/ThoughtsPreview';

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  const thoughts = getSortedThoughtsData();
  const latestThought = thoughts.length > 0 ? thoughts[0] : null;

  // 按分类分别获取最新的10篇文章
  const dailyPosts = allPostsData
    .filter(post => post.category === 'daily')
    .slice(0, 10);
  const technologyPosts = allPostsData
    .filter(post => post.category === 'technology')
    .slice(0, 10);
  const journalPosts = allPostsData
    .filter(post => post.category === 'journal')
    .slice(0, 10);

  return {
    props: {
      dailyPosts,
      technologyPosts,
      journalPosts,
      latestThought,
    },
    revalidate: false,
  };
}

function Home({ dailyPosts, technologyPosts, journalPosts, latestThought }: { dailyPosts: Post[], technologyPosts: Post[], journalPosts: Post[], latestThought: Post | null }) {
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

          {/* 日常 */}
          {dailyPosts.length > 0 && (
            <article>
              <h3>
                日常
                <a href="/categories/daily" className="view-more">浏览更多</a>
              </h3>
              {dailyPosts.map((post) => (
                <PostListItem
                  key={post.id}
                  id={post.id}
                  title={post.title || ''}
                  time={post.time || ''}
                  formatDate={homeFormatDate}
                />
              ))}
            </article>
          )}

          {/* 技术 */}
          {technologyPosts.length > 0 && (
            <article>
              <h3>
                技术
                <a href="/categories/technology" className="view-more">浏览更多</a>
              </h3>
              {technologyPosts.map((post) => (
                <PostListItem
                  key={post.id}
                  id={post.id}
                  title={post.title || ''}
                  time={post.time || ''}
                  formatDate={homeFormatDate}
                />
              ))}
            </article>
          )}

          {/* 期刊 */}
          {journalPosts.length > 0 && (
            <article>
              <h3>
                期刊
                <a href="/categories/journal" className="view-more">浏览更多</a>
              </h3>
              {journalPosts.map((post) => (
                <PostListItem
                  key={post.id}
                  id={post.id}
                  title={post.title || ''}
                  time={post.time || ''}
                  formatDate={homeFormatDate}
                />
              ))}
            </article>
          )}

          <button onClick={() => window.location.href = '/Archives'}>
            全部文章
          </button>
        </section>
      </Layout>
  );
}

export default Home;