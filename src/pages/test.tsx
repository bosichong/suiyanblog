import getSortedPostsData from '../utils/parseMd';
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

function Test({ currentPosts }: { currentPosts: any[] }) {
  return (
    <div className="w-full">
      <div className="flex flex-col gap-4">
        {currentPosts.map((post) => (
          <div key={post.id} className="border-b border-border py-4">
            <Link href={`/blog/${post.id}`} className="text-lg hover:text-text-dark">
              {post.title}
            </Link>
          </div>
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