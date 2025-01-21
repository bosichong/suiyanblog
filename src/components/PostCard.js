// components/PostCard.js
import { Card, CardHeader, CardBody, CardFooter, Link } from '@nextui-org/react';
import formatDate from '../utils/formatDate';
import BlogTime from './ico/BlogTime';

export default function PostCard({ post }) {
    return (
        <Card className="list_item my-4 hover:animate-pulse" key={post.id}>
            <CardHeader className="flex gap-3">
                <Link href={`/blog/${post.id}`} className="flex flex-col">
                    <h3 className="text-2xl rainbow_text">{post.title}</h3>
                </Link>
            </CardHeader>

            <CardBody>
                <p className="text-sm">{post.description}</p>
            </CardBody>

            <CardFooter className="text-sm">
                <Link href={`/blog/${post.id}`} className="block justify-start w-1/2 flex">
                    阅读全文 <span className="motion-preset-wobble block">➞</span>
                </Link>
                <div className="flex justify-end w-1/2">
                    <div className="flex items-center">
                        <BlogTime />
                        <span className="ml-2">{formatDate(post.time)}</span>
                    </div>
                </div>
            </CardFooter>
        </Card>
    );
}
