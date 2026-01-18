import getSortedPostsData from '../utils/parseMd';
import Head from 'next/head';
import React from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';
import getRandomColor from "../utils/randomColor";
import { Post } from '../types';

interface TagData {
    tag: string;
    data: Post[];
}

function createTagsData(blogData: Post[]): TagData[] {
    const tagDict: { [key: string]: TagData } = {};
    blogData.forEach(item => {
        const tmpTags = item.tag ? item.tag.split(",") : [];
        tmpTags.forEach((tag: string) => {
            tag = tag.trim().toLowerCase();
            if (!tagDict[tag]) {
                tagDict[tag] = { tag, data: [] };
            }
            tagDict[tag].data.push(item);
        });
    });
    return Object.values(tagDict);
}

function createTagsWithColors(tagsData: TagData[]): Array<TagData & { bgColor: string }> {
    const colorMap: { [key: string]: string } = {
        'bg-red-500': '#ef4444',
        'bg-orange-500': '#f97316',
        'bg-amber-500': '#f59e0b',
        'bg-yellow-500': '#eab308',
        'bg-lime-500': '#84cc16',
        'bg-green-500': '#22c55e',
        'bg-emerald-500': '#10b981',
        'bg-teal-500': '#14b8a6',
        'bg-cyan-500': '#06b6d4',
        'bg-sky-500': '#0ea5e9',
        'bg-blue-500': '#3b82f6',
        'bg-indigo-500': '#6366f1',
        'bg-violet-500': '#8b5cf6',
        'bg-purple-500': '#a855f7',
        'bg-fuchsia-500': '#d946ef',
        'bg-pink-500': '#ec4899',
        'bg-rose-500': '#f43f5e',
    };

    return tagsData.map(tagObj => {
        const colorClass = getRandomColor();
        return {
            ...tagObj,
            bgColor: colorMap[colorClass] || '#3b82f6'
        };
    });
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

const Tags = ({ tagsData }: { tagsData: Array<TagData & { bgColor: string }> }) => {
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
                        <Link
                            key={tagObj.tag}
                            href={`/tags/${tagObj.tag}`}
                            className="tag-item px-3 py-2 rounded-lg border transition-all duration-200 hover:scale-105 hover:shadow-md text-center"
                            style={{
                                borderColor: 'var(--color-border)',
                                color: 'var(--color-text-primary)',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = tagObj.bgColor;
                                e.currentTarget.style.color = 'white';
                                e.currentTarget.style.borderColor = tagObj.bgColor;
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'transparent';
                                e.currentTarget.style.color = 'var(--color-text-primary)';
                                e.currentTarget.style.borderColor = 'var(--color-border)';
                            }}
                        >
                            <div className="flex items-center justify-center gap-1 text-sm font-medium">
                                <span className="truncate">{tagObj.tag}</span>
                                <span className="text-xs opacity-75 whitespace-nowrap">({tagObj.data.length})</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default Tags;