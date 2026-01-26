import getSortedPostsData from '../../utils/parseMd';
import Layout from '../../components/Layout';
import Link from 'next/link';
import Head from 'next/head';
import Breadcrumb from '../../components/Breadcrumb';
import RainbowLink from '../../components/RainbowLink';
import { Post } from '../../types';

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

    // 按年份归类
    const postsByYear: { [key: string]: Post[] } = {};
    tagPosts.forEach((post) => {
        const year = post.time ? post.time.split('-')[0] : '';
        if (!postsByYear[year]) {
            postsByYear[year] = [];
        }
        postsByYear[year].push(post);
    });

    // 获取原始标签名称（从第一个匹配的文章中获取）
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
            tagPosts,
            postsByYear,
        },
    };
}

const TagDetail = ({ tag, originalTag, tagPosts, postsByYear }: { tag: string; originalTag: string; tagPosts: Post[]; postsByYear: { [key: string]: Post[] } }) => {
    const totalPosts = tagPosts.length;

    // 格式化日期显示
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
                <title>标签: {originalTag} - SuiYan 碎言 - 个人技术博客</title>
                <meta name="description" content={`碎言博客中标签为 ${originalTag} 的文章列表，共 ${totalPosts} 篇文章`}/>
                <meta name="keywords" content={`${originalTag},文章标签,博客分类,碎言博客`} />
                <link rel="canonical" href={`https://www.suiyan.cc/tags/${tag}`} />
                <meta property="og:title" content={`标签: ${originalTag} - SuiYan 碎言`} />
                <meta property="og:description" content={`碎言博客中标签为 ${originalTag} 的文章列表，共 ${totalPosts} 篇文章`} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={`https://www.suiyan.cc/tags/${tag}`} />
                <meta property="og:site_name" content="SuiYan 碎言" />
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:title" content={`标签: ${originalTag} - SuiYan 碎言`} />
                <meta name="twitter:description" content={`碎言博客中标签为 ${originalTag} 的文章列表，共 ${totalPosts} 篇文章`} />
            </Head>

            <Breadcrumb type="tag" tag={tag} />

            <div className="max-w-4xl mx-auto p-6">
                {/* 顶部介绍区域 */}
                <div className="mb-12">
                    <RainbowLink href="/Tags" className="text-sm text-primary mb-4 inline-block">
                        ← 返回标签列表
                    </RainbowLink>
                    <h1 className="text-3xl font-bold mb-2">标签: {originalTag}</h1>
                    <p className="text-sm opacity-80 mb-0">共有文章：{totalPosts} 篇</p>
                </div>

                {/* 文章列表区域 - grid 布局 */}
                {totalPosts > 0 ? (
                    <ul className="list-none m-0 !p-0 space-y-16">
                        {Object.keys(postsByYear).sort((a, b) => parseInt(b) - parseInt(a)).map((year) => (
                            <li className="flex flex-col md:grid md:grid-cols-[auto_1fr] md:items-baseline gap-4 m-0" key={year}>
                                {/* 左侧年份 - sticky 定位 */}
                                <p className="left-0 top-6 z-40 m-0 tabular-nums tracking-tight opacity-60 lg:sticky whitespace-nowrap">
                                    {year}
                                </p>

                                {/* 右侧文章列表 */}
                                <ul className="list-none space-y-2 m-0 w-full">
                                    {postsByYear[year].map((post) => (
                                        <li className="transition-all duration-200 flex items-center justify-between" key={post.id}>
                                            <RainbowLink href={`/blog/${post.id}`} className="flex-1 text-ellipsis overflow-hidden whitespace-nowrap">
                                                {post.title}
                                            </RainbowLink>
                                            <p className="m-0 text-right opacity-60 whitespace-nowrap ml-4">
                                                {formatDate(post.time || '')}
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-lg opacity-60">该标签下暂无文章</p>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default TagDetail;