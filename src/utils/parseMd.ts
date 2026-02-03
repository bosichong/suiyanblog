import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Post } from '../types';

const postsDirectory = path.join(process.cwd(), 'md');

export default function getSortedPostsData(): Post[] {
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.map(fileName => {
        const id = fileName.replace(/\.md$/, ''); // 从文件名中提取 id
        const filePath = path.join(postsDirectory, fileName);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const matterResult = matter(fileContent);
        
        // 截断 description 字段（SEO最佳实践：150字符）
        let description = matterResult.data.description;
        if (description && typeof description === 'string' && description.length > 150) {
            description = description.substring(0, 150) + '...';
        }
        
        // 获取 ai_label 属性，默认为 0
        const aiLabel = matterResult.data.ai_label !== undefined ? parseInt(matterResult.data.ai_label) : 0;
        
        return {
            id, // 添加 id 属性
            ...matterResult.data,
            description,
            content: matterResult.content,
            ai_label: aiLabel,
        };
    });
    return allPostsData.sort((a: Post, b: Post) => {
        // 确保time字段存在且是有效的日期格式
        if (!a.time || !b.time) {
            return 0; // 或者根据你的需求处理错误
        }
        return new Date(b.time).getTime() - new Date(a.time).getTime(); // 颠倒排序
    });
}