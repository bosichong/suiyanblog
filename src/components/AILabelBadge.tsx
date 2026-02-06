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
            className="relative group inline-flex items-center justify-center hover:scale-110 transition-transform duration-200"
            title={aiInfo.description}
        >
            <span className="text-base">{aiInfo.emoji}</span>
            
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-black text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-lg z-10">
                <div className="font-semibold mb-1">{aiInfo.theme}</div>
                <div className="text-xs opacity-80">{aiInfo.description}</div>
            </div>
        </Link>
    );
}