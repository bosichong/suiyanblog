import React from 'react';
import CustomLink from './Link';

interface PostListItemProps {
    id: string;
    title: string;
    time: string;
    formatDate?: (date: string) => string;
}

// 默认格式化函数，提取到组件外部避免每次渲染创建新函数
const defaultFormatDate = (date: string): string => date;

const PostListItem: React.FC<PostListItemProps> = ({ id, title, time, formatDate }) => {
    const formatDateFn = formatDate || defaultFormatDate;

    return (
        <div className="post-list-item">
            <CustomLink
                href={`/blog/${id}`}
                className="group overflow-hidden block"
            >
                <h3 className="post-list-title group-hover:text-text-dark truncate">
                    {title}
                </h3>
            </CustomLink>
            <div className="post-list-divider"></div>
            <time className="post-list-date">
                {formatDateFn(time)}
            </time>
        </div>
    );
};

export default PostListItem;