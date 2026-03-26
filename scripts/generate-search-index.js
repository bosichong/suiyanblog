import { getCollection } from 'astro:content';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default async function generateSearchIndex() {
	console.log('Generating search index...');
	
	const allPosts = await getCollection('blog');
	
	const searchData = allPosts.map(post => ({
		id: post.id,
		title: post.data.title,
		description: post.data.description,
		tags: post.data.tags,
		url: `/blog/${post.id}/`,
		date: post.data.time,
	}));
	
	// 保存搜索数据
	const outputPath = path.join(__dirname, '../public/search-index.json');
	fs.writeFileSync(outputPath, JSON.stringify(searchData, null, 2));
	
	console.log(`Search index generated: ${searchData.length} posts`);
	console.log(`Output: ${outputPath}`);
	
	return searchData;
}