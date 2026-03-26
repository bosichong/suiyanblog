import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

// 读取所有博客文章
function readBlogPosts() {
	const blogDir = path.join(__dirname, '../src/content/blog');
	const posts = [];
	
	// 递归读取所有 markdown 文件
	function readFiles(dir) {
		const files = fs.readdirSync(dir, { withFileTypes: true });
		
		for (const file of files) {
			const fullPath = path.join(dir, file.name);
			
			if (file.isDirectory()) {
				readFiles(fullPath);
			} else if (file.name.endsWith('.md') || file.name.endsWith('.mdx')) {
				try {
					const content = fs.readFileSync(fullPath, 'utf-8');
					
					// 提取 frontmatter
					const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
					if (!frontmatterMatch) continue;
					
					const frontmatterText = frontmatterMatch[1];
					const frontmatter = {};
					
					// 解析 frontmatter
					const lines = frontmatterText.split('\n');
					for (const line of lines) {
						const match = line.match(/^([^:]+):\s*(.+)$/);
						if (match) {
							const key = match[1].trim();
							let value = match[2].trim();
							
							// 移除引号
							if ((value.startsWith("'") && value.endsWith("'")) || 
							    (value.startsWith('"') && value.endsWith('"'))) {
								value = value.slice(1, -1);
							}
							
							// 处理数组
							if (value.startsWith('[') && value.endsWith(']')) {
								value = value.slice(1, -1).split(',').map(v => v.trim().replace(/'/g, ''));
							}
							
							frontmatter[key] = value;
						}
					}
					
					// 获取文件 ID（相对路径，去掉扩展名）
					const relativePath = path.relative(blogDir, fullPath);
					const id = relativePath.replace(/\.(md|mdx)$/, '');
					
					posts.push({
						id,
						title: frontmatter.title || '',
						description: frontmatter.description || '',
						tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : [],
						url: `/blog/${id}`,
						date: frontmatter.time || '',
					});
				} catch (error) {
					console.error(`Error reading ${file.name}:`, error.message);
				}
			}
		}
	}
	
	readFiles(blogDir);
	return posts;
}

async function generateSearchIndex() {
	console.log('🔍 Generating search index...');
	
	try {
		const posts = readBlogPosts();
		
		// 保存搜索数据
		const publicDir = path.join(__dirname, '../public');
		
		// 确保 public 目录存在
		if (!fs.existsSync(publicDir)) {
			fs.mkdirSync(publicDir, { recursive: true });
		}
		
		const outputPath = path.join(publicDir, 'search-index.json');
		fs.writeFileSync(outputPath, JSON.stringify(posts, null, 2));
		
		console.log(`✅ Search index generated: ${posts.length} posts`);
		console.log(`📄 Output: ${outputPath}`);
		
		return posts;
	} catch (error) {
		console.error('❌ Error generating search index:', error);
		throw error;
	}
}

// 运行脚本
generateSearchIndex()
	.then(() => {
		console.log('✨ Done!');
		process.exit(0);
	})
	.catch((error) => {
		console.error('❌ Failed:', error);
		process.exit(1);
	});