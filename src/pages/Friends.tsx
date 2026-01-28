import Layout from "../components/Layout";
import config from "../config";
import Head from "next/head";
import Breadcrumb from "../components/Breadcrumb";
import giscusConfig from "@/giscusConfigs";
import dynamic from "next/dynamic";
import React, {useEffect, useState} from "react";
import FriendCard from "../components/FriendCard";
import BlogAggregationCard from "../components/BlogAggregationCard";

// 动态导入 Giscus，禁用服务端渲染
const Giscus = dynamic(() => import("@giscus/react").then((mod) => mod.default), {
    ssr: false,
});

const Friends = () => {
    const links = config.links;
    const aggregations = config.blogAggregations;
    // 定义一个状态变量 giscusTheme，用于存储 Giscus 的主题
    const [giscusTheme, setGiscusTheme] = useState('');


    useEffect(() => {
        // 在客户端获取主题并设置 Giscus 的 theme 属性
        const savedTheme = localStorage.getItem('theme');
        // 始终使用浅色主题
        setGiscusTheme('light_high_contrast');

    }, [links]);

    return (
        <Layout>
            <Head>
                <title>Friends 友情链接 | SuiYan 碎言 </title>
                <meta name="description" content="碎言博客的友情链接"/>
            </Head>

            <Breadcrumb type="friends" />

            <div className="max-w-4xl mx-auto px-6 py-8">
                <div className="mb-8">
                    <div className="mb-3">{config.FRIENDS_PAGE_TITLE}</div>
                    <p className="text-sm text-default-600">
                        {config.FRIENDS_PAGE_DESCRIPTION}
                    </p>
                </div>
                <div className="border border-border rounded-lg overflow-hidden mb-12">
                    {links.map((link, index) => (
                        <FriendCard key={link.site_name} link={link} />
                    ))}
                </div>
                <div className="mb-8">
                    <div className="mb-3">{config.BLOG_AGGREGATION_TITLE}</div>
                    <p className="text-sm text-default-600">
                        {config.BLOG_AGGREGATION_DESCRIPTION}
                    </p>
                </div>
                <div className="border border-border rounded-lg overflow-hidden">
                    {aggregations.map((aggregation, index) => (
                        <BlogAggregationCard key={aggregation.site_name} aggregation={aggregation} />
                    ))}
                </div>
            </div>
            <Giscus
                repo={giscusConfig.repo as `${string}/${string}`}
                repoId={giscusConfig.repoId}
                category={giscusConfig.category}
                categoryId={giscusConfig.categoryId}
                mapping={giscusConfig.mapping as any}
                lang={giscusConfig.lang}
                strict="0"
                reactionsEnabled="1"
                emitMetadata="0"
                inputPosition="bottom"
                theme={giscusTheme}
            />

        </Layout>
    );
};

export default Friends;