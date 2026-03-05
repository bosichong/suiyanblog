import Layout from "../components/Layout";
import config from "../config";
import Head from "next/head";
import Breadcrumb from "../components/Breadcrumb";
import LinkCard from "../components/LinkCard";
import GiscusComments from "../components/GiscusComments";
import { useState } from "react";

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
             <hgroup>
                <h2>{title}</h2>
                <p>
                    {description}
                </p>
             </hgroup>
            <div>
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
    const [showComments, setShowComments] = useState(false);

    return (
        <Layout>
            <Head>
                <title>Friends 友情链接 | SuiYan 碎言 </title>
                <meta name="description" content="碎言博客的友情链接"/>
            </Head>

            <Breadcrumb type="friends" />

            <div>
                <LinkSection
                    title={config.FRIENDS_PAGE_TITLE}
                    description={config.FRIENDS_PAGE_DESCRIPTION}
                    links={links}
                />
                <hr />
                <LinkSection
                    title={config.BLOG_AGGREGATION_TITLE}
                    description={config.BLOG_AGGREGATION_DESCRIPTION}
                    links={aggregations}
                />
                <hr />
            </div>
            
            {!showComments ? (
                <div>
                    <button
                        onClick={() => setShowComments(true)}
                       
                    >
                        <span>加载评论</span>
                        
                    </button>
                </div>
            ) : (
                <GiscusComments />
            )}

        </Layout>
    );
};

export default Friends;