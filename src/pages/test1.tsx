import getSortedPostsData from '../utils/parseMd';
import PostListItem from '../components/PostListItem';
import formatDate from '../utils/formatDate';

export async function getStaticProps() {
    const allPostsData = getSortedPostsData();

    const minimalPosts = allPostsData.map(post => ({
        id: post.id,
        title: post.title,
        time: post.time,
        author: post.author,
    }));

    const postsByYear: { [key: string]: any[] } = {};
    minimalPosts.forEach((post) => {
        const year = post.time ? post.time.split('-')[0] : '';
        if (!postsByYear[year]) {
            postsByYear[year] = [];
        }
        postsByYear[year].push(post);
    });

    return {
        props: {
            allPostsData: minimalPosts,
            postsByYear,
        },
    };
}

const Test1 = ({ allPostsData, postsByYear }: { allPostsData: any[]; postsByYear: { [key: string]: any[] } }) => {
    const totalPosts = allPostsData.length;
    const lastUpdated = allPostsData[0]?.time ? formatDate(allPostsData[0].time) : '';

    return (
        <div className="w-full">
            <div className="mb-8">
                <p className="text-sm text-text-secondary">
                    共有文章：{totalPosts} 篇，最后更新于 {lastUpdated}
                </p>
            </div>

            <ul className="space-y-6 no-padding-left">
                {Object.keys(postsByYear).sort((a, b) => parseInt(b) - parseInt(a)).map((year) => (
                    <li key={year} className="post-list-group">
                        <p className="post-list-group-title">{year}</p>
                        <ul className="space-y-2 no-padding-left">
                            {postsByYear[year].map((post) => (
                                <li key={post.id}>
                                    <PostListItem
                                        id={post.id}
                                        title={post.title || ''}
                                        time={post.time || ''}
                                        formatDate={formatDate}
                                    />
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Test1;