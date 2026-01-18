import Layout from "../components/Layout";
import config from "../config";
import Head from "next/head";
import giscusConfig from "@/giscusConfigs";
import Giscus from "@giscus/react";
import React, {useEffect, useState} from "react";
import FriendCard from "../components/FriendCard";

const Friends = () => {
    const links = config.links;
    // 定义一个状态变量 giscusTheme，用于存储 Giscus 的主题
    const [giscusTheme, setGiscusTheme] = useState('');


    useEffect(() => {
        // 在客户端获取主题并设置 Giscus 的 theme 属性
        const savedTheme = localStorage.getItem('theme');
        // 如果主题为 dark，则设置 Giscus 的 theme 属性为 dark_dimmed
        // 如果主题为 light，则设置 Giscus 的 theme 属性为 light_high_contrast
        // 否则，设置 Giscus 的 theme 属性为 savedTheme
        setGiscusTheme(savedTheme === 'dark' ? 'dark_dimmed' : savedTheme === 'light' ? 'light_high_contrast' : savedTheme || 'dark_dimmed');

    }, [links]);

    return (
        <Layout>
            <Head>
                <title>Friends 友情链接 | SuiYan 碎言 </title>
                <meta name="description" content="碎言博客的友情链接"/>
            </Head>

            <div className="max-w-4xl mx-auto px-6 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-3">友情链接</h1>
                    <p className="text-sm text-default-600">
                        一部分是我自己喜欢的博客，一部分是友情链接。申请友情链接，请在底部评论区留言。
                    </p>
                </div>
                <div className="border border-border rounded-lg overflow-hidden">
                    {links.map((link, index) => (
                        <FriendCard key={link.site_name} link={link} />
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