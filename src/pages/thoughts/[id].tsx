import React, { useState } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Layout from '../../components/Layout';
import Breadcrumb from '../../components/Breadcrumb';
import Link from '../../components/Link';
import { Post } from '../../types';
import config from '../../config';
import getSortedThoughtsData, { getThoughtById } from '../../utils/parseThoughts';
import dynamic from 'next/dynamic';
import CommentButton from '@/components/CommentButton';
import giscusConfig from '../../giscusConfigs';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import ReactMarkdown from 'react-markdown';
import { sanitizeHtml } from '../../utils/sanitizeHtml';

// 动态导入 Giscus 组件以延迟加载
const Giscus = dynamic(() => import('@giscus/react'), {
    ssr: false,
    loading: () => (
        <div className="flex items-center justify-center py-8">
            <div>加载评论中...</div>
        </div>
    )
});

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

      <div className="w-full">
        <div className="mb-6">
          <time className="text-sm text-gray-600">
            {formatDate(thought.time || '')}
          </time>
        </div>

        <div className="prose prose-gray max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={{
              a: ({ href, children }) => (
                <Link className="break-words" href={href || ''}>
                  {children}
                </Link>
              ),
              img: ({ src, alt }) => (
                <img src={src} alt={alt || ''} className="rounded-lg" />
              ),
            }}
          >
            {sanitizedContent}
          </ReactMarkdown>
        </div>

        <div className="text-center border-t border-border mt-8 pt-6">
          <CommentButton
            showComments={showComments}
            onToggle={() => setShowComments(!showComments)}
          />
        </div>

        <section className="">
          {/* 只在 showComments 为 true 时才渲染 Giscus 组件 */}
          {showComments && (
            <Giscus
              key={thought.id}
              repo={giscusConfig.repo as `${string}/${string}`}
              repoId={giscusConfig.repoId}
              category={giscusConfig.category}
              categoryId={giscusConfig.categoryId}
              mapping={giscusConfig.mapping as any}
              lang={giscusConfig.lang}
              strict="0"
              reactionsEnabled="1"
              emitMetadata="0"
              inputPosition="bottom"
              theme="light"
            />
          )}
        </section>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <Link href="/thoughts" className="inline-flex items-center">
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            返回片语列表
          </Link>
        </div>
      </div>
    </Layout>
  );
}