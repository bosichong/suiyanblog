import Layout from '../components/Layout';
import Head from 'next/head';
import Breadcrumb from '../components/Breadcrumb';
import config from '../config';
import { BotOff, Bot } from 'lucide-react';

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
        level: "No AI",
        icon: <BotOff />,
        theme: "No AI",
        percentage: "0%",
        description: "完全由人类大脑和双手完成，没有任何AI参与",
        details: [
            "AI参与程度：0%",
            "创作方式：完全由人类大脑和双手完成",
            "特点：每个字都是作者独立思考、亲手敲出，没有任何AI参与"
        ]
    },
    {
        level: "I",
        icon: <Bot />,
        theme: "I",
        percentage: "< 25%",
        description: "内容人类撰写或口述录音，需要AI检查语法、优化表达，但核心观点是自己的文章",
        details: [
            "AI参与程度：< 25%",
            "创作方式：主要是人在写，AI做了些修改",
            "特点：像\"魔法棒\"一样点缀修饰，主体内容和思想是作者的，AI仅辅助检查、润色、优化表达"
        ]
    },
    {
        level: "II",
        icon: <Bot />,
        theme: "II",
        percentage: "50%",
        description: "人机平等对话，各占一半，作者提供想法与方向，AI提供框架与内容支撑",
        details: [
            "AI参与程度：= 50%",
            "创作方式：人机五五开，平等对话",
            "特点：你出想法，它出骨架；主体和思想各一半，作者与AI共同创作，互相引导"
        ]
    },
    {
        level: "III",
        icon: <Bot />,
        theme: "III",
        percentage: "> 50%",
        description: "内容主要由AI生成，人类负责后期校对、复核和轻微调整",
        details: [
            "AI参与程度：> 50%",
            "创作方式：绝大部分由AI生成",
            "特点：内容由机器生成，人类仅做后期校对、复核和轻微修改，思想被AI引导或左右"
        ]
    }
];

const usageSuggestions = [
    {
        level: "No AI",
        icon: <BotOff />,
        scenario: "深度思考、个人感悟、技术总结等需要原创性的内容"
    },
    {
        level: "I",
        icon: <Bot />,
        scenario: "需要AI检查语法、优化表达，但核心观点是自己的文章"
    },
    {
        level: "II",
        icon: <Bot />,
        scenario: "与AI头脑风暴、共同探索某个话题，双方贡献相当"
    },
    {
        level: "III",
        icon: <Bot />,
        scenario: "教程整理、资料汇总、快速生成参考内容等场景"
    }
];

function AILabel() {
    return (
        <Layout>
            <Head>
                <title>{`AI创作等级标识 | ${config.BLOG_NAME}`}</title>
                <meta name="description" content="碎言博客AI创作等级标识系统：No AI（纯粹个体，0% AI参与）、I（魔法润色，<25% AI参与）、II（握手协作，50% AI参与）、III（机器主体，>50% AI参与）。了解各等级的定义、创作方式、特点及适用场景。" />
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
                            <Bot />
                        </span>
                        <div>
                            <p>II - 握手协作</p>
                            <p>人机共同创作，平等对话</p>
                        </div>
                    </div>
                </section>
            </article>
        </Layout>
    );
}

export default AILabel;
