import { PostCardProps } from '../types';
import PostListItem from './PostListItem';
import formatDate from '../utils/formatDate';

export default function PostCard({ post }: PostCardProps) {
    return (
        <article className="post-card">
            <PostListItem
                id={post.id}
                title={post.title || ''}
                time={post.time || ''}
                formatDate={formatDate}
            />
        </article>
    );
}