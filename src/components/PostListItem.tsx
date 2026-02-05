
import React from 'react';
import CustomLink from './Link';

interface PostListItemProps {
    id: string;
    title: string;
    time: string;
    formatDate?: (date: string) => string;
}

// 稳定的默认格式（ISO 日期）
const defaultFormatDate = (date: string): string => {
    // 2024-01-15 格式，不涉及时区
    return date.split('T')[0] || date.substring(0, 10);
};

const PostListItem: React.FC<PostListItemProps> = ({ id, title, time, formatDate }) => {
    // 直接使用传入的 formatDate 或默认格式，避免水合不匹配
    const formatDateFn = formatDate || defaultFormatDate;
    const displayTime = formatDateFn(time);

    return (
        <div className="flex items-baseline gap-2 overflow-hidden">
            <CustomLink href={`/blog/${id}`} className="group overflow-hidden block">
                <h3 className="text-lg truncate">
                    {title}
                </h3>
            </CustomLink>
            <div className="flex-1 min-w-0 border-b border-dashed border-neutral-400"></div>
            <time className="text-sm text-neutral-600 whitespace-nowrap" dateTime={time}>
                {displayTime}
            </time>
        </div>
    );
};

export default PostListItem;