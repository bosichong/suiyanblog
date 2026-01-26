import getSortedPostsData from '../utils/parseMd';
import Head from 'next/head';
import React from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';
import Breadcrumb from '../components/Breadcrumb';
import GlowCard from '../components/GlowCard';
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
            tagDict[optimizedTag].data.push(item);
        });
    });
    return Object.values(tagDict);
}

function createTagsWithColors(tagsData: TagData[]): TagData[] {
    return tagsData;
}

export async function getStaticProps() {
    const allPostsData = getSortedPostsData();
    const tagsData = createTagsData(allPostsData);
    const tagsWithColors = createTagsWithColors(tagsData);
    return {
        props: {
            tagsData: tagsWithColors,
        },
    };
}

const Tags = ({ tagsData }: { tagsData: TagData[] }) => {
    return (
        <Layout>
            <Head>
                <title>Tags 标签 | SuiYan 碎言 - 个人技术博客</title>
                <meta name="description" content="碎言博客的文章分类标签，按主题分类的技术文章和随笔"/>
                <meta name="keywords" content="文章标签,博客分类,技术标签,碎言博客,主题分类" />
                <link rel="canonical" href="https://www.suiyan.cc/Tags" />
                <meta property="og:title" content="Tags 标签 | SuiYan 碎言 - 个人技术博客" />
                <meta property="og:description" content="碎言博客的文章分类标签，按主题分类的技术文章和随笔" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://www.suiyan.cc/Tags" />
                <meta property="og:site_name" content="SuiYan 碎言" />
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:title" content="Tags 标签 | SuiYan 碎言" />
                <meta name="twitter:description" content="碎言博客的文章分类标签，按主题分类的技术文章和随笔" />
            </Head>
            <Breadcrumb type="tags" />
            <div className="p-4 min-h-[500px]">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">
                        TAGS
                    </h1>
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-default-500">共有标签：</span>
                        <span className="text-lg font-semibold">{tagsData.length}</span>
                        <span className="text-sm text-default-500">个</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                    {tagsData.map((tagObj) => (
                        <GlowCard key={tagObj.tag} borderWidth={1} blurRadius={2} borderRadius="8px" displayDuration={500} fadeDuration={400} className="w-full">
                            <Link
                                href={`/tags/${tagObj.tag}`}
                                className="block px-3 py-2 text-center transition-all duration-200"
                            >
                                <div className="flex items-center justify-center gap-1 text-sm font-medium">
                                    <span className="truncate">{tagObj.originalTag}</span>
                                    <span className="text-xs opacity-75 whitespace-nowrap">({tagObj.data.length})</span>
                                </div>
                            </Link>
                        </GlowCard>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default Tags;