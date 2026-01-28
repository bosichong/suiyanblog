import Layout from "../components/Layout";
import config from "../config";
import Head from "next/head";
import Breadcrumb from "../components/Breadcrumb";
import giscusConfig from "@/giscusConfigs";
import dynamic from "next/dynamic";
import React, {useEffect} from "react";
import LinkCard from "../components/LinkCard";

// 动态导入 Giscus，禁用服务端渲染
const Giscus = dynamic(() => import("@giscus/react").then((mod) => mod.default), {
    ssr: false,
    loading: () => <div className="text-center py-4 text-text-secondary">加载评论中...</div>
});

const Friends = () => {
    const links = config.links;
    const aggregations = config.blogAggregations;

    useEffect(() => {
        // 始终使用浅色主题
    }, []);

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
                        <LinkCard
                            key={link.site_name}
                            site_name={link.site_name}
                            site_url={link.site_url}
                            site_description={link.site_description}
                            is_active={link.is_active}
                        />
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
                        <LinkCard
                            key={aggregation.site_name}
                            site_name={aggregation.site_name}
                            site_url={aggregation.site_url}
                            site_description={aggregation.site_description}
                        />
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
                theme="light"
            />

        </Layout>
    );
};

export default Friends;