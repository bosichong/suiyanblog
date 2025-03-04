import Layout from "../components/Layout";
import config from "../config.js";
import Head from "next/head";
import {Link} from "@nextui-org/react";
import {Image} from "@nextui-org/react";
import giscusConfig from "@/giscusConfigs";
import Giscus from "@giscus/react";
import React, {useEffect, useState} from "react";

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
        setGiscusTheme(savedTheme === 'dark' ? 'dark_dimmed' : savedTheme === 'light' ? 'light_high_contrast' : savedTheme);

    }, [links]);

    return (
        <Layout>
            <Head>
                <title>Friends 友情链接 | SuiYan 碎言 </title>
                <meta name="description" content="碎言博客的友情链接"/>
            </Head>

                <div className="p-4">
                    <div>
                        <h1 className="text-3xl">友情链接</h1>
                        <div className="my-4">
                            <p className="text-sm"> 与你链接是我的荣幸，感谢这些可爱的博主坚持撰写精彩博文，在这个冷酷的星球上分享自己的光芒与热情！</p>
                            <p className="text-sm">联系我：<Link href="mailto:285911@gmail.com">285911@gmail.com</Link></p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
                      {links.map((link) => (
                        <div 
                          key={link.site_name} 
                          className="group rounded-xl p-4 transition-all duration-300 hover:shadow-lg dark:bg-default-50"
                        >
                          <div className="flex flex-col items-center space-y-4">
                            <Image
                              src={link.site_avatar}
                              alt={link.site_name}
                              className="h-24 w-24 rounded-full object-cover shadow-md"
                            />
                            <h3 className="text-xl font-semibold text-foreground">
                              <Link href={link.site_url} color="primary">
                                {link.site_name}
                              </Link>
                            </h3>
                            <p className="text-center text-sm leading-relaxed text-default-600 line-clamp-3">
                              {link.site_description}
                            </p>
                            <Link
                              href={link.site_url}
                              color="primary"
                              className="mt-2 transition-transform duration-200 hover:translate-x-1"
                              underline="hover"
                            >
                              <span className="flex items-center gap-1 text-sm">
                                访问博客
                                <span className="i-mdi-arrow-right-thin transition-transform duration-200 group-hover:translate-x-0.5" />
                              </span>
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                </div>
                <Giscus
                    repo={giscusConfig.repo}
                    repoId={giscusConfig.repoId}
                    category={giscusConfig.category}
                    categoryId={giscusConfig.categoryId}
                    mapping={giscusConfig.mapping}
                    lang={giscusConfig.lang}
                    strict="0"
                    reactionsEnabled="1"
                    emitMetadata="0"
                    inputPosition="bottom"
                    theme={giscusTheme} // 使用动态设置的主题
                />

        </Layout>
    );
};

export default Friends;
