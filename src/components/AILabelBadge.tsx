'use client'

import Link from 'next/link';

interface AILabelBadgeProps {
    level: number;
}

const aiLevels = [
    {
        level: 0,
        emoji: "👤",
        theme: "纯粹个体",
        description: "AI = 0%，完全由人类大脑和双手完成"
    },
    {
        level: 1,
        emoji: "✨",
        theme: "魔法润色",
        description: "AI < 25%，主要是人在写，AI做了些修改"
    },
    {
        level: 2,
        emoji: "🤝",
        theme: "握手协作",
        description: "AI = 50%，人机五五开，平等对话"
    },
    {
        level: 3,
        emoji: "🤖",
        theme: "机器主体",
        description: "AI > 50%，绝大部分由AI生成"
    }
];

export default function AILabelBadge({ level }: AILabelBadgeProps) {
    const aiInfo = aiLevels.find(item => item.level === level) || aiLevels[0];

    return (
        <Link 
            href="/AI-Label"
            className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-text-link transition-colors"
        >
            <span>{aiInfo.emoji}</span>
            <span>{aiInfo.theme}</span>
            <span className="text-xs opacity-70">({aiInfo.description})</span>
        </Link>
    );
}