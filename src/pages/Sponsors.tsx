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

            <article>
                {/* 面包屑导航 */}
                <Breadcrumb type="sponsors" />

                {/* 页面标题 */}
                <h1>
                    {sponsorConfig.title}
                </h1>

                {/* 赞赏简介 */}
                <div>
                    <div>
                        {sponsorConfig.description}
                    </div>
                </div>

                {/* 赞赏码 */}
                <div>
                    <h2>赞赏码</h2>
                    <div>
                        <img
                            src={sponsorConfig.sponsorCode}
                            alt="赞赏码"
                           
                        />
                    </div>
                </div>

                {/* 赞赏历史 */}
                <div>
                    <h2>赞赏记录</h2>
                    {sponsorConfig.records.length > 0 ? (
                        <div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>昵称</th>
                                        <th>金额</th>
                                        <th>日期</th>
                                        <th>留言</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sponsorConfig.records.map((record, index) => (
                                        <tr key={index}>
                                            <td>{record.name}</td>
                                            <td>{record.amount}</td>
                                            <td>{record.date}</td>
                                            <td>{record.message || '-'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div>
                            暂无赞赏记录
                        </div>
                    )}
                </div>
            </article>
        </Layout>
    );
}

export default Sponsors;