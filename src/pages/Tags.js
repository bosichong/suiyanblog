import { getSortedPostsData } from '@/utils/parseMd';
import Head from 'next/head';
import React, { useState } from 'react';
import Layout from '@/components/layout';
import {Button, Link} from "@nextui-org/react";
import config from "@/config.js";

function createTagsData(blogData) {
    const tagDict = {};
    blogData.forEach(item => {
        const tmpTags = item.tag.split(",");
        tmpTags.forEach(tag => {
            tag = tag.trim().toLowerCase();
            if (!tagDict[tag]) {
                tagDict[tag] = { tag, data: [] };
            }
            tagDict[tag].data.push(item);
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

const Tags = ({ tagsData }) => {
    const [selectedTag, setSelectedTag] = useState(null);

    const handleTagClick = (tag) => {
        if (selectedTag === tag) {
            setSelectedTag(null);
        } else {
            setSelectedTag(tag);
        }
    };

    // 定义颜色数组
    const colors = ["default", "primary", "secondary", "success", "warning", "danger"];

    // 生成随机颜色的函数
    const getRandomColor = () => {
        return colors[Math.floor(Math.random() * colors.length)];
    };

    return (
        <Layout>
            <Head>
                <title>Tags 标签 | {config.BLOG_NAME_EN} {config.BLOG_NAME}</title>
                <meta name="description" content="文章分类标签"/>
            </Head>
            <main className="container max-w-3xl mx-auto leading-normal text-lg font-extralight">
                <div className="p-4">


                    <div>
                        <h1 className="text-3xl">TAGS</h1>
                        <div>
                            <span className="text-sm">共有标签：{tagsData.length}个</span>
                        </div>
                    </div>

                    <div className="flex gap-4 flex-wrap py-4">
                        {tagsData.map((tagObj) => (

                                <Button key={tagObj.tag}
                                        size="sm"
                                        color={getRandomColor()} // 应用随机颜色
                                    className={`tag ${selectedTag === tagObj.tag ? 'selected' : ''} px-2 py-1 hover:animate-bounce`}
                                    onClick={() => handleTagClick(tagObj.tag)}
                                    style={{
                                        display: selectedTag && selectedTag !== tagObj.tag ? 'none' : 'inline-block',
                                    }}
                                >
                                    {tagObj.tag}
                                </Button>
                        ))}
                    </div>
                    {selectedTag && (

                        <ul>
                            {tagsData
                                .find((tagObj) => tagObj.tag === selectedTag)
                                .data.map((post, index) => (
                                    <li className={'list-group-item  hover:animate-bounce'}  key={index}>
                                        <Link href={`/blog/${post.id}`} className="block text-ellipsis overflow-hidden whitespace-nowrap">{post.title}</Link>
                                    </li>
                                ))}
                        </ul>
                )}
            </div>

            </main>
        </Layout>
    );
};

export default Tags;
