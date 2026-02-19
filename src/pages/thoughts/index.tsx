import getSortedThoughtsData from '../../utils/parseThoughts';
import Head from 'next/head';
import Layout from '../../components/Layout';
import Breadcrumb from '../../components/Breadcrumb';
import { Post } from '../../types';
import config from '../../config';

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
  return `${day}/${month}/${year}`;
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

      <div className="w-full">
        <h1 className="text-2xl font-semibold mb-4 text-text-primary">
          片语
        </h1>
        <p className="mb-8 text-sm text-text-secondary">
          共有 <span className="text-text-primary">{thoughts.length}</span> 条片语
        </p>

        {thoughts.length === 0 ? (
          <div className="text-center py-12 text-text-secondary">
            <p>暂无片语</p>
          </div>
        ) : (
          <ol className="relative space-y-8 before:absolute before:-ml-px before:h-full before:w-0.5 before:rounded-full before:bg-gray-200">
            {thoughts.map((thought) => (
              <li key={thought.id} className="relative -ms-1.5 flex items-start gap-4">
                <span className="size-3 shrink-0 rounded-full bg-rose-700"></span>

                <div className="-mt-2">
                  <time className="text-xs/none font-medium text-gray-700">
                    {formatDate(thought.time || '')}
                  </time>

                  <a href={`/thoughts/${thought.id}`} className="block mt-1">
                    <p className="text-base text-gray-700 whitespace-pre-wrap">
                      {thought.content || thought.preview}
                    </p>
                  </a>
                </div>
              </li>
            ))}
          </ol>
        )}
      </div>
    </Layout>
  );
}