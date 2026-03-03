'use client'

import { BotOff, Bot } from 'lucide-react';

interface AILabelBadgeProps {
    level: number;
}

const ICON_SIZE = 18;

const aiLevels = [
    {
        level: 0,
        icon: <BotOff size={ICON_SIZE} />,
        theme: "No AI",
        description: "完全由人类大脑和双手完成，没有任何AI参与"
    },
    {
        level: 1,
        icon: <Bot size={ICON_SIZE} />,
        theme: "I",
        description: "AI < 25%，内容人类撰写或口述录音，需要AI检查语法、优化表达，但核心观点是自己的文章"
    },
    {
        level: 2,
        icon: <Bot size={ICON_SIZE} />,
        theme: "II",
        description: "AI = 50%，人机平等对话，各占一半，作者提供想法与方向，AI提供框架与内容支撑。"
    },
    {
        level: 3,
        icon: <Bot size={ICON_SIZE} />,
        theme: "III",
        description: "AI > 50%，内容主要由AI生成，人类负责后期校对、复核和轻微调整。"
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