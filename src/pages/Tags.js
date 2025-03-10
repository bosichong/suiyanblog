import getSortedPostsData from '../utils/parseMd';
import Head from 'next/head';
import React, { useState } from 'react';
import Layout from '../components/Layout';
import {Button, Link} from "@nextui-org/react";
import getRandomColor from "../utils/randomColor";

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
                                    <li className="transition-all duration-200 hover:translate-x-1" key={index}>
                                        <Link href={`/blog/${post.id}`} className="group flex items-center text-ellipsis overflow-hidden whitespace-nowrap">{post.title}</Link>
                                    </li>
                                ))}
                        </ul>
                )}
            </div>


        </Layout>
    );
};

export default Tags;
