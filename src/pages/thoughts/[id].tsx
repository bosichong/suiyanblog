import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Layout from '../../components/Layout';
import Breadcrumb from '../../components/Breadcrumb';
import Link from '../../components/Link';
import { Post } from '../../types';
import config from '../../config';
import getSortedThoughtsData, { getThoughtById } from '../../utils/parseThoughts';

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
          <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
            {thought.content}
          </div>
        </div>

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