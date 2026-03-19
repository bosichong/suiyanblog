'use client'

import { PenLine, Mic, Sparkles, HandMetal, Bot } from 'lucide-react';

interface AILabelBadgeProps {
    level: number;
}

const ICON_SIZE = 18;

const aiLevels = [
    {
        level: 0,
        icon: <PenLine size={ICON_SIZE} />,
        theme: "HAND",
        description: "手写 · 每一个字都由作者亲手敲出"
    },
    {
        level: 1,
        icon: <Mic size={ICON_SIZE} />,
        theme: "VOICE",
        description: "口述 · 语音转文字，仅修正语法和错别字"
    },
    {
        level: 2,
        icon: <Sparkles size={ICON_SIZE} />,
        theme: "POLISH",
        description: "润色 · 核心由作者完成，AI辅助修饰优化"
    },
    {
        level: 3,
        icon: <HandMetal size={ICON_SIZE} />,
        theme: "DUET",
        description: "协奏 · 人机共创作，平等对话互相启发"
    },
    {
        level: 4,
        icon: <Bot size={ICON_SIZE} />,
        theme: "AUTO",
        description: "自动 · AI主导生成，人类审核把关"
    }
];

export default function AILabelBadge({ level }: AILabelBadgeProps) {
    const aiInfo = aiLevels.find(item => item.level === level) || aiLevels[0];

    return (

            <small>
                {aiInfo.icon}·{aiInfo.theme}「{aiInfo.description}」
            </small>

    );
}