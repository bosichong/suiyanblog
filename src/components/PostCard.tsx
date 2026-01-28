import formatDate from '../utils/formatDate';
import { PostCardProps } from '../types';
import CustomLink from './Link';

export default function PostCard({ post }: PostCardProps) {
    return (
        <article className="mb-4">
            <div className="flex items-baseline gap-2">
                <CustomLink
                    href={`/blog/${post.id}`}
                    className="flex items-center gap-2 overflow-hidden"
                >
                    <h3 className="text-base font-normal m-0 text-text-link group-hover:text-text-dark flex-shrink-0">
                        {post.title}
                    </h3>
                </CustomLink>
                <div className="flex-1 min-w-0 border-b border-dashed border-border"></div>
                <time className="text-sm text-text-tertiary whitespace-nowrap flex-shrink-0">
                    {formatDate(post.time || '')}
                </time>
            </div>
        </article>
    );
}