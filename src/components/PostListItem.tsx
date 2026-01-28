import React from 'react';
import CustomLink from './Link';

interface PostListItemProps {
    id: string;
    title: string;
    time: string;
    formatDate?: (date: string) => string;
}

const PostListItem: React.FC<PostListItemProps> = ({ id, title, time, formatDate }) => {
    const formatDateFn = formatDate || ((date: string) => date);

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