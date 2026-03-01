import React, { useState } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Layout from '../../components/Layout';
import Breadcrumb from '../../components/Breadcrumb';
import GiscusComments from '../../components/GiscusComments';
import CommentButton from '@/components/CommentButton';
import { Post } from '../../types';
import config from '../../config';
import getSortedThoughtsData, { getThoughtById } from '../../utils/parseThoughts';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import ReactMarkdown from 'react-markdown';
import { sanitizeHtml } from '../../utils/sanitizeHtml';

export const getStaticPaths: GetStaticPaths = async () => {
  const thoughts = getSortedThoughtsData();
  const paths = thoughts.map((thought) => ({
    params: { id: thought.id },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const thought = getThoughtById(params?.id as string);

  if (!thought) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      thought,
    },
    revalidate: false,
  };
};

const formatDate = (dateString: string): string => {
  if (!dateString) return '';
  const parts = dateString.split('T')[0];
  const [year, month, day] = (parts || dateString.substring(0, 10)).split('-');
  return `${day}/${month}/${year}`;
};

export default function ThoughtDetail({ thought }: { thought: Post }) {
  const [showComments, setShowComments] = useState(false);
  const sanitizedContent = sanitizeHtml(thought.content || '');

  return (
    <Layout>
      <Head>
        <title>{`片语 | ${config.BLOG_NAME}`}</title>
        <meta name="description" content="碎言博客的片语详情" />
        <link rel="canonical" href={`https://www.suiyan.cc/thoughts/${thought.id}`} />
        <meta property="og:title" content={`片语 | ${config.BLOG_NAME}`} />
        <meta property="og:description" content="碎言博客的片语详情" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://www.suiyan.cc/thoughts/${thought.id}`} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={`片语 | ${config.BLOG_NAME}`} />
      </Head>

      <Breadcrumb type="thoughts" />

      <div>
        <div>
          <time>
            {formatDate(thought.time || '')}
          </time>
        </div>

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

        <div>
          <CommentButton
            showComments={showComments}
            onToggle={() => setShowComments(!showComments)}
          />
        </div>

        <section>
          {/* 只在 showComments 为 true 时才渲染 Giscus 组件 */}
          {showComments && (
            <GiscusComments key={thought.id} />
          )}
        </section>
      </div>
    </Layout>
  );
}