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
        icon: <BotOff className="w-6 h-6" />,
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
        icon: <Bot className="w-6 h-6" />,
        theme: "I",
        percentage: "< 25%",
        description: "主体由人类撰写，AI辅助检查语法、优化表达，像魔法棒一样点缀修饰",
        details: [
            "AI参与程度：< 25%",
            "创作方式：主要是人在写，AI做了些修改",
            "特点：像\"魔法棒\"一样点缀修饰，主体内容和思想是作者的，AI仅辅助检查、润色、优化表达"
        ]
    },
    {
        level: "II",
        icon: <Bot className="w-6 h-6" />,
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
        icon: <Bot className="w-6 h-6" />,
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
        icon: <BotOff className="w-5 h-5" />,
        scenario: "深度思考、个人感悟、技术总结等需要原创性的内容"
    },
    {
        level: "I",
        icon: <Bot className="w-5 h-5" />,
        scenario: "需要AI检查语法、优化表达，但核心观点是自己的文章"
    },
    {
        level: "II",
        icon: <Bot className="w-5 h-5" />,
        scenario: "与AI头脑风暴、共同探索某个话题，双方贡献相当"
    },
    {
        level: "III",
        icon: <Bot className="w-5 h-5" />,
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

            <article className="w-full">
                {/* 面包屑导航 */}
                <Breadcrumb type="ai-label" />

                {/* 页面标题 */}
                <h1 className="text-2xl font-semibold mb-8 text-text-primary">
                    AI创作等级标识系统
                </h1>

                {/* 等级表格 */}
                <div className="mb-12 overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                        <thead>
                            <tr className="border-b-2 border-border">
                                <th className="text-left py-4 px-4 font-semibold text-text-primary">等级</th>
                                <th className="text-center py-4 px-4 font-semibold text-text-primary">标识</th>
                                <th className="text-left py-4 px-4 font-semibold text-text-primary">主题</th>
                                <th className="text-left py-4 px-4 font-semibold text-text-primary">说明</th>
                            </tr>
                        </thead>
                        <tbody>
                            {aiLevels.map((item, index) => (
                                <tr 
                                    key={item.level} 
                                    className={`border-b border-border hover:bg-bg-content/50 transition-colors ${index % 2 === 1 ? 'bg-bg-content/30' : ''}`}
                                >
                                    <td className="py-4 px-4">
                                        <span className="font-semibold text-text-primary">{item.level}</span>
                                    </td>
                                    <td className="py-4 px-4 text-center">
                                        <span className="inline-flex items-center justify-center text-text-primary">{item.icon}</span>
                                    </td>
                                    <td className="py-4 px-4">
                                        <span className="font-medium text-text-primary">{item.theme}</span>
                                    </td>
                                    <td className="py-4 px-4 text-text-secondary">
                                        {item.description}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* 等级详解 */}
                <section className="mb-12">
                    <h2 className="text-lg font-semibold mb-6 text-text-primary">等级详解</h2>
                    <div className="space-y-6">
                        {aiLevels.map((item) => (
                            <article
                                key={item.level}
                                className="p-6 rounded-lg border border-border hover:shadow-md transition-shadow"
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="inline-flex items-center justify-center text-text-primary">{item.icon}</span>
                                    <div>
                                        <h3 className="text-lg font-semibold text-text-primary">
                                            {item.theme}
                                        </h3>
                                        <span className="text-sm text-text-tertiary">{item.level} · AI参与 {item.percentage}</span>
                                    </div>
                                </div>
                                <ul className="space-y-2 text-text-secondary">
                                    {item.details.map((detail, idx) => (
                                        <li key={idx} className="flex items-start gap-2">
                                            <span className="text-text-tertiary mt-1">•</span>
                                            <span>{detail}</span>
                                        </li>
                                    ))}
                                </ul>
                            </article>
                        ))}
                    </div>
                </section>

                {/* 使用建议 */}
                <section className="mb-12">
                    <h2 className="text-lg font-semibold mb-6 text-text-primary">使用建议</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {usageSuggestions.map((item) => (
                            <article
                                key={item.level}
                                className="p-4 rounded-lg border border-border bg-bg-content/50"
                            >
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="inline-flex items-center justify-center text-text-primary">{item.icon}</span>
                                    <span className="font-medium text-text-primary">{item.level}</span>
                                </div>
                                <p className="text-sm text-text-secondary">{item.scenario}</p>
                            </article>
                        ))}
                    </div>
                </section>

                {/* 本文标识示例 */}
                <section className="p-6 rounded-lg bg-bg-content border border-border">
                    <h2 className="text-lg font-semibold mb-4 text-text-primary">本文创作标识</h2>
                    <div className="flex items-center gap-4">
                        <span className="inline-flex items-center justify-center text-4xl text-text-primary">
                            <Bot className="w-10 h-10" />
                        </span>
                        <div>
                            <p className="font-medium text-text-primary">II - 握手协作</p>
                            <p className="text-sm text-text-secondary">人机共同创作，平等对话</p>
                        </div>
                    </div>
                </section>
            </article>
        </Layout>
    );
}

export default AILabel;
