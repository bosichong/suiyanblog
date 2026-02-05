import getSortedPostsData from '../utils/parseMd';
import Head from 'next/head';
import Layout from '../components/Layout';
import Breadcrumb from '../components/Breadcrumb';
import CustomLink from '../components/Link';
import { Post } from '../types';
import config from '../config';

interface TagData {
    tag: string;
    originalTag: string;
    data: Post[];
}

function createTagsData(blogData: Post[]): TagData[] {
    const tagDict: { [key: string]: TagData } = {};
    blogData.forEach(item => {
        const tmpTags = item.tag ? item.tag.split(",") : [];
        tmpTags.forEach((tag: string) => {
            const originalTag = tag.trim();
            const optimizedTag = originalTag.toLowerCase().replace(/\s+/g, '');
            if (!tagDict[optimizedTag]) {
                tagDict[optimizedTag] = { tag: optimizedTag, originalTag, data: [] };
            }
            tagDict[optimizedTag].data.push({ id: item.id });
        });
    });
    return Object.values(tagDict);
}

export async function getStaticProps() {
    const allPostsData = getSortedPostsData();
    const tagsData = createTagsData(allPostsData);
    return {
        props: {
            tagsData,
        },
    };
}

const Tags = ({ tagsData }: { tagsData: TagData[] }) => {
    return (
        <Layout>
            <Head>
                <title>标签 | {config.BLOG_NAME}</title>
                <meta name="description" content="碎言博客的文章分类标签，按主题分类的技术文章和随笔"/>
                <meta name="keywords" content="文章标签,博客分类,技术标签,主题分类" />
                <link rel="canonical" href="https://www.suiyan.cc/Tags" />
                <meta property="og:title" content={`标签 | ${config.BLOG_NAME}`} />
                <meta property="og:description" content="碎言博客的文章分类标签，按主题分类的技术文章和随笔" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://www.suiyan.cc/Tags" />
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:title" content={`标签 | ${config.BLOG_NAME}`} />
                <meta name="twitter:description" content="碎言博客的文章分类标签，按主题分类的技术文章和随笔" />
            </Head>
            <Breadcrumb type="tags" />
            <div className="w-full">
                <header className="mb-8">
                    <div className="flex items-center gap-2 text-sm text-text-secondary">
                        <span>共有标签：</span>
                        <span className="text-text-primary">{tagsData.length}</span>
                        <span>个</span>
                    </div>
                </header>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {tagsData.map((tagObj) => (
                        <CustomLink
                            key={tagObj.tag}
                            href={`/tags/${tagObj.tag}`}
                            className=""
                        >
                            <span className="truncate flex-1 min-w-0">
                               # {tagObj.originalTag} ({tagObj.data.length})
                            </span>
                        </CustomLink>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default Tags;