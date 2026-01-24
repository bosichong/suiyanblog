import formatDate from '../utils/formatDate';
import GlowCard from './GlowCard';
import { PostCardProps } from '../types';
import Link from 'next/link';

export default function PostCard({ post }: PostCardProps) {
    return (
        <GlowCard key={post.id} borderWidth={2}>
            <div className="hover:animate-pulse bg-transparent rounded-xl p-4">
                <div className="mb-4">
                    <Link href={`/blog/${post.id}`} className="flex flex-col">
                        <h3 className="text-2xl rainbow_text">{post.title}</h3>
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
                                    <Link key={index} href={`/tags/${encodeURIComponent(tag)}`} className="rainbow_hover">
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