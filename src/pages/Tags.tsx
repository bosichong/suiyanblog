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
    count: number;
}

interface CategoryTags {
    categoryName: string;
    categoryKey: string;
    tags: TagData[];
}

function createCategoryTagsData(blogData: Post[]): CategoryTags[] {
    const categoryMap: { [key: string]: { [key: string]: number } } = {
        'daily': {},
        'technology': {},
        'journal': {},
    };

    const categoryNameMap: { [key: string]: string } = {
        'daily': '日常',
        'technology': '技术',
        'journal': '期刊',
    };

    blogData.forEach(item => {
        const category = item.category;
        if (!category || !categoryMap[category]) return;

        const tmpTags = item.tag ? item.tag.split(",") : [];
        tmpTags.forEach((tag: string) => {
            const originalTag = tag.trim();
            const optimizedTag = originalTag.toLowerCase().replace(/\s+/g, '');
            if (!categoryMap[category][optimizedTag]) {
                categoryMap[category][optimizedTag] = 0;
            }
            categoryMap[category][optimizedTag]++;
        });
    });

    return Object.keys(categoryMap).map(categoryKey => {
        const tags: TagData[] = Object.keys(categoryMap[categoryKey])
            .map(tag => ({
                tag,
                originalTag: tag,
                count: categoryMap[categoryKey][tag],
            }))
            .sort((a, b) => b.count - a.count);

        return {
            categoryName: categoryNameMap[categoryKey],
            categoryKey,
            tags,
        };
    });
}

export async function getStaticProps() {
    const allPostsData = getSortedPostsData();
    const categoryTagsData = createCategoryTagsData(allPostsData);
    const totalTags = categoryTagsData.reduce((sum, cat) => sum + cat.tags.length, 0);

    return {
        props: {
            categoryTagsData,
            totalTags,
        },
        revalidate: false,
    };
}

const Tags = ({ categoryTagsData, totalTags }: { categoryTagsData: CategoryTags[]; totalTags: number }) => {
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
                    <h1>标签</h1>
                    <p>共有标签：<span>{totalTags}</span> 个</p>
                </hgroup>

                {categoryTagsData.map((category) => (
                    <div key={category.categoryKey} className="category-tags-section">
                        <h3>
                            {category.categoryName}
                            <span className="tag-count">({category.tags.length} 个标签)</span>
                        </h3>
                        <div className='tags'>
                            {category.tags.map((tagObj) => (
                                <a
                                    key={tagObj.tag}
                                    href={`/tags/${tagObj.tag}`}
                                >
                                    <span>
                                        # {tagObj.originalTag} ({tagObj.count})
                                    </span>
                                </a>
                            ))}
                        </div>
                    </div>
                ))}
            </article>
        </Layout>
    );
};

export default Tags;