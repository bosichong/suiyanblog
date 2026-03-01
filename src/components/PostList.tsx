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
        <section style={{ textAlign: 'left', marginTop: '2rem', marginBottom: '2rem' }}>
            <h2>{title}</h2>
            <ul style={{ marginTop: '1rem' }}>
                {posts.map((post, index) => (
                    <li key={index} style={{ marginBottom: '0.5rem' }}>
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