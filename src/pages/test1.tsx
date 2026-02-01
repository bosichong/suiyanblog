import getSortedPostsData from '../utils/parseMd';
import Link from 'next/link';

export async function getStaticProps() {
    const allPostsData = getSortedPostsData();

    const minimalPosts = allPostsData.map(post => ({
        id: post.id,
        title: post.title,
    }));

    return {
        props: {
            allPostsData: minimalPosts,
        },
    };
}

const Test1 = ({ allPostsData }: { allPostsData: any[] }) => {
    const totalPosts = allPostsData.length;

    return (
        <div className="w-full">
            <div className="mb-8">
                <p className="text-sm text-text-secondary">
                    共有文章：{totalPosts} 篇
                </p>
            </div>

            <ul className="space-y-2 no-padding-left">
                {allPostsData.map((post) => (
                    <li key={post.id}>
                        <Link href={`/blog/${post.id}`} className="text-lg hover:text-text-dark">
                            {post.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Test1;