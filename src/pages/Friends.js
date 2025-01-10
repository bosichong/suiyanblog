import Layout from "../components/Layout";
import config from "../config.js";
import Head from "next/head";
import {Link} from "@nextui-org/react";
import {Image} from "@nextui-org/react";
import giscusConfig from "@/giscusConfigs";
import Giscus from "@giscus/react";
import React, {useEffect} from "react";

const Friends = () => {
    const links = config.links;

    const animateListItems =  () => {
        const listItems = document.querySelectorAll('.list_item');
        listItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.remove('hidden');
                item.classList.add('motion-preset-focus');
            }, index * 300); // 每个元素间隔 300 毫秒显示
        });
    }
    useEffect(() => {

        animateListItems();
    }, [links]);

    return (
        <Layout>
            <Head>
                <title>Friends 友情链接 | {config.BLOG_NAME_EN} {config.BLOG_NAME}</title>
                <meta name="description" content="碎言博客的友情链接"/>
            </Head>
            <main className="container max-w-3xl mx-auto leading-normal text-lg font-extralight">
                <div className="p-4">
                    <div>
                        <h1 className="text-3xl">友情链接</h1>
                        <div className="my-4">
                            <p className="text-sm"> 与你链接是我的荣幸，感谢这些可爱的博主坚持撰写精彩博文，在这个冷酷的星球上分享自己的光芒与热情！</p>
                            <p className="text-sm">联系我：<Link href="mailto:285911@gmail.com">285911@gmail.com</Link></p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 lg:gap-8">
                        {links.map((link) => (
                            <div key={link.site_name} className={'hidden list_item rounded-lg p-4 hover:animate-pulse'} >
                                <div key={link.site_name} className="rounded-lg ">
                                    <div className=" sm:shrink-0">
                                        <Image src={link.site_avatar}
                                               alt={link.site_name}
                                               className={"h-20 w-20 rounded-lg object-cover shadow-sm"}
                                        />
                                    </div>

                                </div>
                                <div className="mt-4">
                                    <h3 className="mt-0.5 text-lg font-medium ">
                                        <Link href={link.site_url}>
                                             {link.site_name}
                                        </Link>
                                    </h3>
                                    <p className="mt-2 line-clamp-2 text-sm">
                                        {link.site_description}
                                    </p>
                                    <Link href={link.site_url} color="primary" >
                                        <div className="group mt-4 inline-flex items-center gap-1 text-sm font-medium ">
                                            Find out more <span aria-hidden="true"
                                                                className="block transition-all group-hover:ms-0.5 rtl:rotate-180"></span>
                                        </div>
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
                    theme="dark_dimmed"
                />
            </main>
        </Layout>
    );
};

export default Friends;
