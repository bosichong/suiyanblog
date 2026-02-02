import { PostCardProps } from '../types';
import PostListItem from './PostListItem';
import dayjs from 'dayjs';

// 首页使用 MM/DD 格式，不显示年份
const homeFormatDate = (dateString: string): string => {
    return dayjs(dateString).format('MM/DD');
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