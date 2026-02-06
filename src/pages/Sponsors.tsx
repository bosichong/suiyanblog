import React from 'react';
import Layout from '../components/Layout';
import Head from 'next/head';
import Breadcrumb from '../components/Breadcrumb';
import sponsorConfig from '../sponsor';
import config from '../config';

function Sponsors() {
    return (
        <Layout>
            <Head>
                <title>{`赞赏 | ${config.BLOG_NAME}`}</title>
                <meta name="description" content="赞赏支持碎言博客" />
            </Head>

            <article className="w-full">
                {/* 面包屑导航 */}
                <Breadcrumb type="sponsors" />

                {/* 页面标题 */}
                <h1 className="text-2xl font-semibold mb-8 text-text-primary">
                    {sponsorConfig.title}
                </h1>

                {/* 赞赏简介 */}
                <div className="mb-8 p-6 rounded-lg border border-border">
                    <div className="max-w-none text-text-secondary whitespace-pre-line">
                        {sponsorConfig.description}
                    </div>
                </div>

                {/* 赞赏码 */}
                <div className="mb-12">
                    <h2 className="text-lg font-semibold mb-4 text-text-primary">赞赏码</h2>
                    <div className="flex justify-center">
                        <img
                            src={sponsorConfig.sponsorCode}
                            alt="赞赏码"
                            className="max-w-xs w-full rounded-lg border border-border shadow-sm"
                        />
                    </div>
                </div>

                {/* 赞赏历史 */}
                <div>
                    <h2 className="text-lg font-semibold mb-4 text-text-primary">赞赏记录</h2>
                    {sponsorConfig.records.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-border">
                                        <th className="text-left py-3 px-4 font-medium text-text-primary">昵称</th>
                                        <th className="text-left py-3 px-4 font-medium text-text-primary">金额</th>
                                        <th className="text-left py-3 px-4 font-medium text-text-primary">日期</th>
                                        <th className="text-left py-3 px-4 font-medium text-text-primary">留言</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sponsorConfig.records.map((record, index) => (
                                        <tr key={index} className="border-b border-border hover:bg-bg-content/50">
                                            <td className="py-3 px-4 text-text-secondary">{record.name}</td>
                                            <td className="py-3 px-4 text-text-primary font-medium">{record.amount}</td>
                                            <td className="py-3 px-4 text-text-secondary">{record.date}</td>
                                            <td className="py-3 px-4 text-text-secondary">{record.message || '-'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-center py-8 text-text-secondary">
                            暂无赞赏记录
                        </div>
                    )}
                </div>
            </article>
        </Layout>
    );
}

export default Sponsors;