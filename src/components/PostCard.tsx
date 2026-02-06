import { PostCardProps } from '../types';
import PostListItem from './PostListItem';

const homeFormatDate = (dateString: string): string => {
    if (!dateString) return '';
    const parts = dateString.split('T')[0];
    const [year, month, day] = (parts || dateString.substring(0, 10)).split('-');
    return `${month}/${day}`;
};

export default function PostCard({ post }: PostCardProps) {
    return (
        <article className="post-card">
            <PostListItem
                id={post.id}
                title={post.title || ''}
                time={post.time || ''}
                formatDate={homeFormatDate}
            />
        </article>
    );
}