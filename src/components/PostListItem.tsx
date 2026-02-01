
import React, { useState, useEffect } from 'react';
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
    const [displayTime, setDisplayTime] = useState<string>(defaultFormatDate(time));
    
    useEffect(() => {
        // 客户端挂载后再应用自定义格式化
        const formatDateFn = formatDate || defaultFormatDate;
        setDisplayTime(formatDateFn(time));
    }, [time, formatDate]);

    return (
        <div className="post-list-item">
            <CustomLink href={`/blog/${id}`} className="group overflow-hidden block">
                <h3 className="post-list-title group-hover:text-text-dark truncate">
                    {title}
                </h3>
            </CustomLink>
            <div className="post-list-divider"></div>
            <time className="post-list-date" dateTime={time}>
                {displayTime}
            </time>
        </div>
    );
};

export default PostListItem;