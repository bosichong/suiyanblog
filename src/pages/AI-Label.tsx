import Layout from '../components/Layout';
import Head from 'next/head';
import Breadcrumb from '../components/Breadcrumb';
import config from '../config';
import { PenLine, Mic, Sparkles, HandMetal, Bot } from 'lucide-react';

interface AILevel {
    level: string;
    icon: React.ReactNode;
    theme: string;
    percentage: string;
    description: string;
    details: string[];
}

const aiLevels: AILevel[] = [
    {
        level: "HAND",
        icon: <PenLine />,
        theme: "HAND",
        percentage: "0%",
        description: "手写 · 每一个字都由作者亲手敲出",
        details: [
            "AI参与程度：0%",
            "创作方式：完全由人类独立完成",
            "特点：每个字都是作者独立思考、亲手敲出，没有任何AI参与"
        ]
    },
    {
        level: "VOICE",
        icon: <Mic />,
        theme: "VOICE",
        percentage: "≈5%",
        description: "口述 · 语音转文字，仅修正语法和错别字",
        details: [
            "AI参与程度：≈5%",
            "创作方式：作者口述，语音识别转文字",
            "特点：内容和思想完全由作者表达，AI仅协助修正语音识别的错误和语法问题，不进行润色或扩写"
        ]
    },
    {
        level: "POLISH",
        icon: <Sparkles />,
        theme: "POLISH",
        percentage: "<25%",
        description: "润色 · 核心由作者完成，AI辅助修饰优化",
        details: [
            "AI参与程度：<25%",
            "创作方式：作者撰写主体内容，AI辅助优化",
            "特点：主体内容和思想是作者的，AI仅辅助检查语法、润色表达、优化结构，像\"魔法棒\"点缀修饰"
        ]
    },
    {
        level: "DUET",
        icon: <HandMetal />,
        theme: "DUET",
        percentage: "≈50%",
        description: "协奏 · 人机共创作，平等对话互相启发",
        details: [
            "AI参与程度：≈50%",
            "创作方式：人机平等对话，共同创作",
            "特点：你出想法，它出骨架；主体和思想各一半，作者与AI互相引导、共同打磨"
        ]
    },
    {
        level: "AUTO",
        icon: <Bot />,
        theme: "AUTO",
        percentage: ">50%",
        description: "自动 · AI主导生成，人类审核把关",
        details: [
            "AI参与程度：>50%",
            "创作方式：AI生成主体内容，人类审核把关",
            "特点：内容由AI主导生成，人类负责后期校对、复核和必要的调整修改"
        ]
    }
];

const usageSuggestions = [
    {
        level: "HAND",
        icon: <PenLine />,
        scenario: "深度思考、个人感悟、技术总结等需要完全原创的内容"
    },
    {
        level: "VOICE",
        icon: <Mic />,
        scenario: "日常随笔、想法记录、不方便打字时的快速输出"
    },
    {
        level: "POLISH",
        icon: <Sparkles />,
        scenario: "技术笔记、读书心得、需要精炼语言的文章"
    },
    {
        level: "DUET",
        icon: <HandMetal />,
        scenario: "探索性文章、头脑风暴、与AI共同打磨某个话题"
    },
    {
        level: "AUTO",
        icon: <Bot />,
        scenario: "教程整理、资料汇总、快速生成参考内容"
    }
];

function AILabel() {
    return (
        <Layout>
            <Head>
                <title>{`AI创作等级标识 | ${config.BLOG_NAME}`}</title>
                <meta name="description" content="碎言博客AI创作等级标识系统：HAND（手写，0%）、VOICE（口述，≈5%）、POLISH（润色，<25%）、DUET（协奏，≈50%）、AUTO（自动，>50%）。了解各等级的定义、创作方式、特点及适用场景。" />
            </Head>

            <article>
                {/* 面包屑导航 */}
                <Breadcrumb type="ai-label" />

                {/* 页面标题 */}
                <h1>
                    AI创作等级标识系统
                </h1>

                {/* 等级表格 */}
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>等级</th>
                                <th>标识</th>
                                <th>主题</th>
                                <th>说明</th>
                            </tr>
                        </thead>
                        <tbody>
                            {aiLevels.map((item, index) => (
                                <tr 
                                    key={item.level} 
                                   
                                >
                                    <td>
                                        <span>{item.level}</span>
                                    </td>
                                    <td>
                                        <span>{item.icon}</span>
                                    </td>
                                    <td>
                                        <span>{item.theme}</span>
                                    </td>
                                    <td>
                                        {item.description}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* 等级详解 */}
                <section>
                    <h2>等级详解</h2>
                    <div>
                        {aiLevels.map((item) => (
                            <article
                                key={item.level}
                               
                            >
                                <div>
                                    <span>{item.icon}</span>
                                    <div>
                                        <h3>
                                            {item.theme}
                                        </h3>
                                        <span>{item.level} · AI参与 {item.percentage}</span>
                                    </div>
                                </div>
                                <ul>
                                    {item.details.map((detail, idx) => (
                                        <li key={idx}>
                                            <span>•</span>
                                            <span>{detail}</span>
                                        </li>
                                    ))}
                                </ul>
                            </article>
                        ))}
                    </div>
                </section>

                {/* 使用建议 */}
                <section>
                    <h2>使用建议</h2>
                    <div>
                        {usageSuggestions.map((item) => (
                            <article
                                key={item.level}
                               
                            >
                                <div>
                                    <span>{item.icon}</span>
                                    <span>{item.level}</span>
                                </div>
                                <p>{item.scenario}</p>
                            </article>
                        ))}
                    </div>
                </section>

                {/* 本文标识示例 */}
                <section>
                    <h2>本文创作标识</h2>
                    <div>
                        <span>
                            <Sparkles />
                        </span>
                        <div>
                            <p>POLISH · 润色</p>
                            <p>核心内容由作者完成，AI辅助修饰优化</p>
                        </div>
                    </div>
                </section>
            </article>
        </Layout>
    );
}

export default AILabel;
