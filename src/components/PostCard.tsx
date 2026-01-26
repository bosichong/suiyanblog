import formatDate from '../utils/formatDate';
import GlowCard from './GlowCard';
import { PostCardProps } from '../types';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function PostCard({ post }: PostCardProps) {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <GlowCard key={post.id} borderWidth={2}>
            <div className="bg-transparent rounded-xl p-4">
                <div className="mb-4">
                    <Link href={`/blog/${post.id}`} className="flex flex-col">
                        <h3 className="text-xl rainbow_text">{post.title}</h3>
                    </Link>
                </div>

                <div className="mb-4 flex items-center justify-between text-sm">
                    {(post.tags || post.tag) && (
                        <div className="flex items-center gap-2">
                            {(() => {
                                let tagsArray: string[] = [];
                                if (Array.isArray(post.tags)) {
                                    tagsArray = post.tags;
                                } else if (post.tag) {
                                    // 处理逗号分隔的字符串标签
                                    tagsArray = post.tag.split(',').map((t: string) => t.trim());
                                }
                                return tagsArray.map((tag, index) => (
                                    <Link
                                        key={index}
                                        href={`/tags/${encodeURIComponent(tag)}`}
                                        className={mounted && resolvedTheme === 'dark' ? "rainbow_hover" : "hover:text-black transition"}
                                    >
                                        <span>#{tag}</span>
                                    </Link>
                                ));
                            })()}
                        </div>
                    )}
                    <span className='text-sm opacity-60 transition group-hover:opacity-100'>{formatDate(post.time || '')}</span>
                </div>

                <div className="mb-4">
                    <p className="text-md">
                        {post.description}
                    </p>
                </div>
            </div>
        </GlowCard>
    );
}