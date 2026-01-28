import getSortedPostsData from '../../utils/parseMd';
import Layout from '../../components/Layout';
import Head from 'next/head';
import Breadcrumb from '../../components/Breadcrumb';
import PostListItem from '../../components/PostListItem';
import CustomLink from '../../components/Link';
import { Post } from '../../types';
import config from '../../config';

export async function getStaticPaths() {
    const allPostsData = getSortedPostsData();
    const tags = new Set<string>();

    allPostsData.forEach((post) => {
        if (post.tag) {
            post.tag.split(',').forEach((tag: string) => {
                const optimizedTag = tag.trim().toLowerCase().replace(/\s+/g, '');
                tags.add(optimizedTag);
            });
        }
    });

    const paths = Array.from(tags).map((tag) => ({
        params: { tag },
    }));

    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params }: { params: { tag: string } }) {
    const allPostsData = getSortedPostsData();
    const tag = params.tag;

    const tagPosts = allPostsData.filter((post) => {
        if (!post.tag) return false;
        return post.tag.split(',').map((t: string) => t.trim().toLowerCase().replace(/\s+/g, '')).includes(tag);
    });

    const minimalPosts = tagPosts.map(post => ({
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

    let originalTag = tag;
    if (tagPosts.length > 0 && tagPosts[0].tag) {
        const matchedTag = tagPosts[0].tag.split(',').find((t: string) =>
            t.trim().toLowerCase().replace(/\s+/g, '') === tag
        );
        if (matchedTag) {
            originalTag = matchedTag.trim();
        }
    }

    return {
        props: {
            tag,
            originalTag,
            tagPosts: minimalPosts,
            postsByYear,
        },
    };
}

const TagDetail = ({ tag, originalTag, tagPosts, postsByYear }: { tag: string; originalTag: string; tagPosts: any[]; postsByYear: { [key: string]: any[] } }) => {
    const totalPosts = tagPosts.length;

    const formatDate = (dateStr: string) => {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        const month = date.toLocaleString('en-US', { month: 'short' });
        const day = date.getDate();
        const year = date.getFullYear();
        return `${month} ${day}, ${year}`;
    };

    return (
        <Layout>
            <Head>
                <title>标签: {originalTag} | {config.BLOG_NAME}</title>
                <meta name="description" content={`碎言博客中标签为 ${originalTag} 的文章列表，共 ${totalPosts} 篇文章`}/>
                <meta name="keywords" content={`${originalTag},文章标签,博客分类`} />
                <link rel="canonical" href={`https://www.suiyan.cc/tags/${tag}`} />
                <meta property="og:title" content={`标签: ${originalTag} | ${config.BLOG_NAME}`} />
                <meta property="og:description" content={`碎言博客中标签为 ${originalTag} 的文章列表，共 ${totalPosts} 篇文章`} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={`https://www.suiyan.cc/tags/${tag}`} />
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:title" content={`标签: ${originalTag} | ${config.BLOG_NAME}`} />
                <meta name="twitter:description" content={`碎言博客中标签为 ${originalTag} 的文章列表，共 ${totalPosts} 篇文章`} />
            </Head>

            <Breadcrumb type="tag" tag={tag} />

            <div className="w-full">
                <div className="mb-8">
                    <CustomLink href="/Tags" className="text-sm text-text-link">
                        ← 返回标签列表
                    </CustomLink>
                    <h1 className="text-2xl font-semibold mb-2 mt-4 text-text-primary">
                        标签: {originalTag}
                    </h1>
                    <p className="text-sm text-text-secondary">共有文章：{totalPosts} 篇</p>
                </div>

                {totalPosts > 0 ? (
                    <ul className="space-y-6 no-padding-left">
                        {Object.keys(postsByYear).sort((a, b) => parseInt(b) - parseInt(a)).map((year) => (
                            <li key={year}>
                                <p className="text-sm font-normal mb-3 text-text-tertiary">{year}</p>
                                <ul className="space-y-2 no-padding-left">
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
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-lg text-text-secondary">该标签下暂无文章</p>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default TagDetail;