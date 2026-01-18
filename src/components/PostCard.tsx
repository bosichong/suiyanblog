import formatDate from '../utils/formatDate';
import { CalendarDaysIcon } from './icons/CalendarDaysIcon';
import GlowCard from './GlowCard';
import { PostCardProps } from '../types';
import Link from 'next/link';

export default function PostCard({ post }: PostCardProps) {
    return (
        <GlowCard key={post.id} borderWidth={2}>
            <div className="hover:animate-pulse bg-transparent rounded-xl p-4">
                <div className="flex gap-3 mb-4">
                    <Link href={`/blog/${post.id}`} className="flex flex-col">
                        <h3 className="text-2xl rainbow_text">{post.title}</h3>
                    </Link>
                </div>

                <div className="mb-4">
                    <p className="text-md">
                        {post.description}
                    </p>
                </div>

                <div className="text-sm flex justify-between">
                    <Link href={`/blog/${post.id}`} className="block text-sm justify-start w-1/2 flex rainbow_hover">
                        阅读全文 <span className="block text-sm">➞</span>
                    </Link>
                    <div className="flex justify-end w-1/2">
                        <div className="flex items-center text-sm">
                            <CalendarDaysIcon size={16} />
                            <span className="ml-2">{formatDate(post.time || '')}</span>
                        </div>
                    </div>
                </div>
            </div>
        </GlowCard>
    );
}