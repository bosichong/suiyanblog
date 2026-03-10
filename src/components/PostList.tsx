import React from 'react';

interface PostListProps {
    title: string;
    posts: Array<{ id: string; title?: string; time?: string }>;
    showDate?: boolean;
    formatDate?: (date: string) => string;
}

const PostList: React.FC<PostListProps> = ({ title, posts, showDate = false, formatDate }) => {
    if (!posts || posts.length === 0) return null;

    return (
        <section className="post-list-section">
            <h2>{title}</h2>
            <ul className="post-list">
                {posts.map((post, index) => (
                    <li key={index}>
                        {showDate && formatDate ? (
                            <div className="grid">
                                <a href={`/blog/${post.id}`}>
                                    {post.title || ''}
                                </a>
                                <time>
                                    {formatDate(post.time || '')}
                                </time>
                            </div>
                        ) : (
                            <a
                                href={`/blog/${post.id}`}
                            >
                                {post.title || ''}
                            </a>
                        )}
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default PostList;