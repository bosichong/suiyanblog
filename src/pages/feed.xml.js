import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import { SITE_DESCRIPTION, SITE_TITLE, SITE_AUTHOR } from '../consts';

export async function GET(context) {
	const posts = await getCollection('blog');
	
	// 按时间排序，取最新 50 篇
	const sortedPosts = posts
		.sort((a, b) => new Date(b.data.time).getTime() - new Date(a.data.time).getTime())
		.slice(0, 50);
	
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: sortedPosts.map((post) => ({
			title: post.data.title,
			pubDate: new Date(post.data.time),
			description: post.data.description,
			link: `/blog/${post.id}/`,
			author: SITE_AUTHOR,
			categories: post.data.tags,
		})),
		customData: `<language>zh-CN</language>
<author>${SITE_AUTHOR}</author>
<generator>Astro</generator>`,
	});
}