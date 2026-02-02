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

interface LinkSectionProps {
    title: string;
    description: string;
    links: Array<{
        site_name: string;
        site_url: string;
        site_description: string;
        is_active?: boolean;
    }>;
}

const LinkSection = ({ title, description, links }: LinkSectionProps) => {
    return (
        <>
            <div className="mb-8">
                <h3 className="mb-3 text-lg font-semibold">{title}</h3>
                <p className="text-sm text-default-600">
                    {description}
                </p>
            </div>
            <div className="overflow-hidden mb-12">
                {links.map((link) => (
                    <LinkCard
                        key={link.site_name}
                        site_name={link.site_name}
                        site_url={link.site_url}
                        site_description={link.site_description}
                        is_active={link.is_active}
                    />
                ))}
            </div>
        </>
    );
};

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
                <LinkSection
                    title={config.FRIENDS_PAGE_TITLE}
                    description={config.FRIENDS_PAGE_DESCRIPTION}
                    links={links}
                />
                <hr className="my-8 border-t border-default-200" />
                <LinkSection
                    title={config.BLOG_AGGREGATION_TITLE}
                    description={config.BLOG_AGGREGATION_DESCRIPTION}
                    links={aggregations}
                />
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