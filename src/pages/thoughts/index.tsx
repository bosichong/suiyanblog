import React from 'react';
import getSortedThoughtsData from '../../utils/parseThoughts';
import Head from 'next/head';
import Layout from '../../components/Layout';
import Breadcrumb from '../../components/Breadcrumb';
import { Post } from '../../types';
import config from '../../config';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { sanitizeHtml } from '../../utils/sanitizeHtml';
import { MessageCircle } from 'lucide-react';

export async function getStaticProps() {
  const allThoughtsData = getSortedThoughtsData();

  return {
    props: {
      thoughts: allThoughtsData,
    },
    revalidate: false,
  };
}

const formatDate = (dateString: string): string => {
  if (!dateString) return '';
  const parts = dateString.split('T')[0];
  const [year, month, day] = (parts || dateString.substring(0, 10)).split('-');
  return `${year}/${month}/${day}`;
};

export default function Thoughts({ thoughts }: { thoughts: Post[] }) {
  return (
    <Layout>
      <Head>
        <title>{`片语 | ${config.BLOG_NAME}`}</title>
        <meta name="description" content="碎言博客的片语，记录日常的短小想法和瞬间感悟" />
        <meta name="keywords" content="片语,想法,瞬间,随笔,碎言" />
        <link rel="canonical" href="https://www.suiyan.cc/thoughts" />
        <meta property="og:title" content={`片语 | ${config.BLOG_NAME}`} />
        <meta property="og:description" content="碎言博客的片语，记录日常的短小想法和瞬间感悟" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.suiyan.cc/thoughts" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={`片语 | ${config.BLOG_NAME}`} />
        <meta name="twitter:description" content="碎言博客的片语，记录日常的短小想法和瞬间感悟" />
      </Head>

      <Breadcrumb type="thoughts" />

      <div>

              <h1>

                {config.THOUGHTS_PAGE_TITLE}

              </h1>

              <p>

                {config.THOUGHTS_PAGE_DESCRIPTION}

              </p>

              <p>

                共有 <span>{thoughts.length}</span> 条片语

              </p>

        {thoughts.length === 0 ? (
          <div>
            <p>暂无片语</p>
          </div>
        ) : (
          <ol>
            {thoughts.map((thought) => {
              const sanitizedContent = sanitizeHtml(thought.content || thought.preview || '');
              return (
                <li key={thought.id}>
                  <article>
                    <header className='sf'>
                      <time>
                        {formatDate(thought.time || '')}
                      </time>
                      <a href={`/thoughts/${thought.id}`}>
                        <MessageCircle size={16} />
                        <span>去评论</span>
                      </a>
                    </header>
                    <div>
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeRaw]}
                        components={{
                          a: ({ href, children }) => (
                            <a href={href || ''}>
                              {children}
                            </a>
                          ),
                          img: ({ src, alt }) => (
                            <img src={src} alt={alt || ''} />
                          ),
                        }}
                      >
                        {sanitizedContent}
                      </ReactMarkdown>
                    </div>
                  </article>
                </li>
              );
            })}
          </ol>
        )}
      </div>
    </Layout>
  );
}