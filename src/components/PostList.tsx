import React from 'react';
import CustomLink from './Link';

interface PostListProps {
    title: string;
    posts: Array<{
        id: string;
        title?: string;
        time?: string;
    }>;
    showDate?: boolean;
    formatDate?: (date: string) => string;
}

const PostList: React.FC<PostListProps> = ({ title, posts, showDate = false, formatDate }) => {
    if (!posts || posts.length === 0) return null;

    return (
        <section className="mt-8 py-4 border-t border-border">
            <h2 className="text-lg font-semibold mb-4 text-text-primary">{title}</h2>
            <ul className="space-y-2">
                {posts.map((post, index) => (
                    <li key={index} className="overflow-hidden">
                        {showDate && formatDate ? (
                            <div className="flex items-start gap-2">
                                <time className="text-sm text-text-tertiary whitespace-nowrap flex-shrink-0">
                                    {formatDate(post.time || '')}
                                </time>
                                <CustomLink
                                    href={`/blog/${post.id}`}
                                    className="flex-1 min-w-0 truncate"
                                >
                                    {post.title || ''}
                                </CustomLink>
                            </div>
                        ) : (
                            <CustomLink
                                href={`/blog/${post.id}`}
                                className="block truncate"
                            >
                                {post.title || ''}
                            </CustomLink>
                        )}
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default PostList;