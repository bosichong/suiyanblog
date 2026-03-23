import getSortedPostsData from '../../utils/parseMd';
import Layout from '../../components/Layout';
import Head from 'next/head';
import Breadcrumb from '../../components/Breadcrumb';
import PostListItem from '../../components/PostListItem';
import config from '../../config';

// 定义分类映射
const categoryMap: { [key: string]: string } = {
    'daily': '日常',
    'technology': '技术',
    'journal': '期刊',
};

export async function getStaticPaths() {
    const categories = Object.keys(categoryMap);

    const paths = categories.map((category) => ({
        params: { category },
    }));

    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params }: { params?: { category: string } } = {}) {
    const allPostsData = getSortedPostsData();
    const category = params?.category;

    if (!category || !categoryMap[category]) {
        return {
            notFound: true,
        };
    }

    const categoryPosts = allPostsData.filter((post) => post.category === category);

    const minimalPosts = categoryPosts.map(post => ({
        id: post.id,
        title: post.title,
        time: post.time,
    }));

    const postsByYear: { [key: string]: any[] } = {};
    minimalPosts.forEach((post) => {
        const year = post.time ? post.time.split('-')[0] : '';
        if (!postsByYear[year]) {
            postsByYear[year] = [];
        }
        postsByYear[year].push(post);
    });

    const categoryName = categoryMap[category];

    return {
        props: {
            category,
            categoryName,
            categoryPosts: minimalPosts,
            postsByYear,
        },
        revalidate: false,
    };
}

const CategoryDetail = ({ category, categoryName, categoryPosts, postsByYear }: { category: string; categoryName: string; categoryPosts: any[]; postsByYear: { [key: string]: any[] } }) => {
    const totalPosts = categoryPosts.length;

    const formatDate = (dateString: string): string => {
        if (!dateString) return '';
        const parts = dateString.split('T')[0];
        const [year, month, day] = (parts || dateString.substring(0, 10)).split('-');
        return `${month}/${day}`;
    };

    return (
        <Layout>
            <Head>
                <title>{`分类: ${categoryName} | ${config.BLOG_NAME}`}</title>
                <meta name="description" content={`碎言博客中分类为 ${categoryName} 的文章列表，共 ${totalPosts} 篇文章`}/>
                <meta name="keywords" content={`${categoryName},文章分类,博客分类`} />
                <link rel="canonical" href={`https://www.suiyan.cc/categories/${category}`} />
                <meta property="og:title" content={`分类: ${categoryName} | ${config.BLOG_NAME}`} />
                <meta property="og:description" content={`碎言博客中分类为 ${categoryName} 的文章列表，共 ${totalPosts} 篇文章`} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={`https://www.suiyan.cc/categories/${category}`} />
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:title" content={`分类: ${categoryName} | ${config.BLOG_NAME}`} />
                <meta name="twitter:description" content={`碎言博客中分类为 ${categoryName} 的文章列表，共 ${totalPosts} 篇文章`} />
            </Head>

            <Breadcrumb type="category" category={category} categoryName={categoryName} />

            <div>
                <div>
                    <h1>
                        分类: {categoryName}
                    </h1>
                    <p>共有文章：{totalPosts} 篇</p>
                </div>

                {totalPosts > 0 ? (
                    <div>
                        {Object.keys(postsByYear).sort((a, b) => parseInt(b) - parseInt(a)).map((year) => (
                            <div key={year}>
                                <p>{year}</p>
                                <ul>
                                    {postsByYear[year].map((post) => (
                                        <li key={post.id}>
                                            <PostListItem
                                                id={post.id}
                                                title={post.title || ''}
                                                time={post.time || ''}
                                                formatDate={formatDate}
                                            />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div>
                        <p>该分类下暂无文章</p>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default CategoryDetail;