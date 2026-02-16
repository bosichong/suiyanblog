'use client'

import Link from 'next/link';
import { BotOff, Bot } from 'lucide-react';

interface AILabelBadgeProps {
    level: number;
}

const aiLevels = [
    {
        level: 0,
        icon: <BotOff className="w-6 h-6" />,
        theme: "No AI",
        description: "AI = 0%，完全由人类大脑和双手完成，没有任何AI参与"
    },
    {
        level: 1,
        icon: <Bot className="w-6 h-6" />,
        theme: "I",
        description: "AI < 25%，内容人类撰写或口述录音，需要AI检查语法、优化表达，但核心观点是自己的文章"
    },
    {
        level: 2,
        icon: <Bot className="w-6 h-6" />,
        theme: "II",
        description: "AI = 50%，作者出想法，AI出骨架；主体和思想各一半，作者与AI共同创作，互相引导"
    },
    {
        level: 3,
        icon: <Bot className="w-6 h-6" />,
        theme: "III",
        description: "AI > 50%，内容由机器生成，人类仅做后期校对、复核和轻微修改，思想被AI引导或左右"
    }
];

export default function AILabelBadge({ level }: AILabelBadgeProps) {
    const aiInfo = aiLevels.find(item => item.level === level) || aiLevels[0];

    return (
        <Link 
            href="/AI-Label"
            className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-text-link transition-colors"
        >
            {aiInfo.icon}
            <span className="text-xs opacity-70">{aiInfo.theme}</span>
            <span className="text-xs opacity-70">({aiInfo.description})</span>
        </Link>
    );
}