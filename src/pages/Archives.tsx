import getSortedPostsData from '../utils/parseMd';
import Layout from '../components/Layout';
import Head from 'next/head';
import Breadcrumb from '../components/Breadcrumb';
import PostListItem from '../components/PostListItem';
import config from '../config';

export async function getStaticProps() {
    const allPostsData = getSortedPostsData();

    const minimalPosts = allPostsData.map(post => ({
        id: post.id,
        title: post.title,
        time: post.time,
        author: post.author,
    }));

    const postsByYear: { [key: string]: any[] } = {};
    minimalPosts.forEach((post) => {
        const year = post.time ? post.time.split('-')[0] : '';
        if (!postsByYear[year]) {
            postsByYear[year] = [];
        }
        postsByYear[year].push(post);
    });

    return {
        props: {
            allPostsData: minimalPosts,
            postsByYear,
        },
        revalidate: false,
    };
}

const formatDateStr = (dateString: string): string => {
    if (!dateString) return '';
    const parts = dateString.split('T')[0];
    const [year, month, day] = (parts || dateString.substring(0, 10)).split('-');
    return `${month}/${day}`;
};

const formatFullDate = (dateString: string): string => {
    if (!dateString) return '';
    const parts = dateString.split('T')[0];
    const [year, month, day] = (parts || dateString.substring(0, 10)).split('-');
    return `${year}/${month}/${day}`;
};

const Archives = ({ allPostsData, postsByYear }: { allPostsData: any[]; postsByYear: { [key: string]: any[] } }) => {
    const totalPosts = allPostsData.length;
    const lastUpdated = allPostsData[0]?.time ? formatFullDate(allPostsData[0].time) : '';

    return (
        <Layout>
            <Head>
                <title>{`文章归档 | ${config.BLOG_NAME}`}</title>
                <meta name="description" content="碎言博客的所有文章归档，按时间顺序整理的全部技术文章和随笔"/>
                <meta name="keywords" content="文章归档,博客归档,技术文章,时间线" />
                <link rel="canonical" href="https://www.suiyan.cc/Archives" />
                <meta property="og:title" content={`文章归档 | ${config.BLOG_NAME}`} />
                <meta property="og:description" content="碎言博客的所有文章归档，按时间顺序整理的全部技术文章和随笔" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://www.suiyan.cc/Archives" />
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:title" content={`文章归档 | ${config.BLOG_NAME}`} />
                <meta name="twitter:description" content="碎言博客的所有文章归档，按时间顺序整理的全部技术文章和随笔" />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "CollectionPage",
                            "name": "文章归档",
                            "description": "碎言博客的所有文章归档，按时间顺序整理的全部技术文章和随笔",
                            "url": "https://www.suiyan.cc/Archives",
                            "numberOfItems": totalPosts,
                            "itemListElement": allPostsData.map((post, index) => ({
                                "@type": "BlogPosting",
                                "position": index + 1,
                                "name": post.title,
                                "url": `https://www.suiyan.cc/blog/${post.id}`,
                                "datePublished": post.time,
                                "author": post.author
                            }))
                        })
                    }}
                />
            </Head>

            <Breadcrumb type="archives" />

            <div className="w-full">
                <div className="mb-8">
                    <h1 className="text-2xl font-semibold mb-4 text-text-primary">
                        文章归档
                    </h1>
                    <p className="text-sm text-text-secondary">
                        共有文章：{totalPosts} 篇，最后更新于 {lastUpdated}
                    </p>
                </div>

                <ul className="space-y-6 pl-0">
                    {Object.keys(postsByYear).sort((a, b) => parseInt(b) - parseInt(a)).map((year) => (
                        <li key={year} className="post-list-group">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 to-gray-300"></div>
                                <h2 className="post-list-group-title text-3xl font-bold tracking-tight text-text-primary">{year}</h2>
                                <div className="h-px flex-1 bg-gradient-to-l from-transparent via-gray-300 to-gray-300"></div>
                            </div>
                            <ul className="space-y-2 pl-0">
                                {postsByYear[year].map((post) => (
                                    <li key={post.id}>
                                        <PostListItem
                                            id={post.id}
                                            title={post.title || ''}
                                            time={post.time || ''}
                                            formatDate={formatDateStr}
                                        />
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            </div>
        </Layout>
    );
};

export default Archives;