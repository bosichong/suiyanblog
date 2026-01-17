import { Card, CardHeader, CardBody, CardFooter, Link } from '@nextui-org/react';
import formatDate from '../utils/formatDate';
import { CalendarDaysIcon } from './icons/CalendarDaysIcon';
import GlowCard from './GlowCard';
import { PostCardProps } from '../types';

export default function PostCard({ post }: PostCardProps) {
    return (
        <GlowCard key={post.id} borderWidth={2}>
            <Card className="hover:animate-pulse bg-transparent shadow-none">
                <CardHeader className="flex gap-3">
                    <Link href={`/blog/${post.id}`} className="flex flex-col">
                        <h3 className="text-2xl rainbow_text">{post.title}</h3>
                    </Link>
                </CardHeader>

                <CardBody>
                    <p className="text-md">
                        {post.description}
                    </p>
                </CardBody>

                <CardFooter className="text-sm">
                    <Link href={`/blog/${post.id}`} className="block text-sm justify-start w-1/2 flex">
                        阅读全文 <span className="block text-sm">➞</span>
                    </Link>
                    <div className="flex justify-end w-1/2">
                        <div className="flex items-center text-sm">
                            <CalendarDaysIcon size={16} />
                            <span className="ml-2">{formatDate(post.time || '')}</span>
                        </div>
                    </div>
                </CardFooter>
            </Card>
        </GlowCard>
    );
}