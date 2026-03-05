import getSortedPostsData from '../utils/parseMd';
import Breadcrumb from '../components/Breadcrumb';
import PostListItem from '../components/PostListItem';
import Layout from '../components/Layout';
import Head from 'next/head';
import config from '../config';
import { Post } from '../types';

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
        revalidate: false,
    };
}

const Tags = ({ tagsData }: { tagsData: TagData[] }) => {
    return (
        <Layout>
            <Head>
                <title>{`标签 | ${config.BLOG_NAME}`}</title>
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
            <article>
                 <hgroup>
                <h1>
                    标签
                </h1>
                <p>
                    共有标签：<span>{tagsData.length}</span> 个
                </p>
                </hgroup>
                <div className='tags'>
                    {tagsData.map((tagObj) => (
                        <a
                            key={tagObj.tag}
                            href={`/tags/${tagObj.tag}`}
                        >
                            <span>
                               # {tagObj.originalTag} ({tagObj.data.length})
                            </span>
                        </a>
                    ))}
                </div>
            </article>
        </Layout>
    );
};

export default Tags;