import getSortedPostsData from '../utils/parseMd';
import Head from 'next/head';
import React, { useState } from 'react';
import Layout from '../components/Layout';
import {Button, Link} from "@nextui-org/react";
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
    const [selectedTag, setSelectedTag] = useState<string | null>(null);

    const handleTagClick = (tag: string) => {
        if (selectedTag === tag) {
            setSelectedTag(null);
        } else {
            setSelectedTag(tag);
        }
    };


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


                    <div>
                        <h1 className="text-3xl">TAGS</h1>
                        <div>
                            <span className="text-sm">共有标签：{tagsData.length}个</span>
                        </div>
                    </div>

                    <div className="flex gap-4 flex-wrap py-4">
                        {tagsData.map((tagObj) => (
                                <button
                                    key={tagObj.tag}
                                    className={`tag text-white ${selectedTag === tagObj.tag ? 'selected' : ''} px-2 py-1 rounded-lg hover:animate-bounce transition-all font-medium`}
                                    style={{
                                        backgroundColor: tagObj.bgColor,
                                        display: selectedTag && selectedTag !== tagObj.tag ? 'none' : 'inline-block',
                                    }}
                                    onClick={() => handleTagClick(tagObj.tag)}
                                >
                                    {tagObj.tag}
                                </button>
                        ))}
                    </div>
                    {selectedTag && (

                        <ul>
                            {tagsData
                                .find((tagObj) => tagObj.tag === selectedTag)
                                ?.data.map((post, index) => (
                                    <li className="transition-all duration-200 hover:translate-x-1" key={index}>
                                        <Link href={`/blog/${post.id}`} className="rainbow_hover group flex items-center text-ellipsis overflow-hidden whitespace-nowrap">{post.title}</Link>
                                    </li>
                                ))}
                        </ul>
                )}
            </div>


        </Layout>
    );
};

export default Tags;