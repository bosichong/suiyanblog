
import React from 'react';

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
        <div className="grid">
            <a href={`/blog/${id}`}>
                {title}
            </a>
            <time dateTime={time}>
                {displayTime}
            </time>
        </div>
    );
};

export default PostListItem;