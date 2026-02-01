import getSortedPostsData from '../utils/parseMd';
import PostCard from '../components/PostCard';
import { Post } from '../types';
import Link from 'next/link';

const postsPerPage = 25;

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  const currentPosts = allPostsData.slice(0, postsPerPage);

  return {
    props: {
      currentPosts,
    },
  };
}

function Test({ currentPosts }: { currentPosts: Post[] }) {
  return (
    <div className="w-full">
      <div className="flex flex-col gap-4">
        {currentPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      <div className="mt-8 text-center">
        <Link href="/Archives" className="text-primary hover:text-primary-dark transition-colors duration-200">
          更多文章
        </Link>
      </div>
    </div>
  );
}

export default Test;