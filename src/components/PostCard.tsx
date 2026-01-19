import formatDate from '../utils/formatDate';
import { CalendarDaysIcon } from './icons/CalendarDaysIcon';
import GlowCard from './GlowCard';
import { PostCardProps } from '../types';
import Link from 'next/link';
import { ArrowRightIcon } from './icons/ArrowRightIcon';

export default function PostCard({ post }: PostCardProps) {
    return (
        <GlowCard key={post.id} borderWidth={2}>
            <div className="hover:animate-pulse bg-transparent rounded-xl p-4">
                <div className="mb-4">
                    <Link href={`/blog/${post.id}`} className="flex flex-col">
                        <h3 className="text-2xl rainbow_text">{post.title}</h3>
                    </Link>
                </div>

                <div className="mb-4 flex items-center gap-3 text-sm">
                    <div className="flex items-center">
                        <CalendarDaysIcon size={16} />
                        <span className="ml-2">{formatDate(post.time || '')}</span>
                    </div>
                    {(post.tags || post.tag) && (
                        <div className="flex items-center gap-2">
                            {(() => {
                                let tagsArray: string[] = [];
                                if (Array.isArray(post.tags)) {
                                    tagsArray = post.tags;
                                } else if (post.tag) {
                                    // 处理逗号分隔的字符串标签
                                    tagsArray = post.tag.split(',').map(t => t.trim());
                                }
                                return tagsArray.map((tag, index) => (
                                    <Link key={index} href={`/tags/${encodeURIComponent(tag)}`} className="rainbow_hover">
                                        <span>#{tag}</span>
                                    </Link>
                                ));
                            })()}
                        </div>
                    )}
                </div>

                <div className="mb-4">
                    <p className="text-md">
                        {post.description}
                    </p>
                </div>

                <div className="text-sm">
                    <Link href={`/blog/${post.id}`} className="flex items-center gap-2 rainbow_hover">
                        <span>阅读</span>
                        <ArrowRightIcon size={16} />
                    </Link>
                </div>
            </div>
        </GlowCard>
    );
}