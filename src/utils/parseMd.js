import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'md');

export function getSortedPostsData() {
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.map(fileName => {
        const id = fileName.replace(/\.md$/, ''); // 从文件名中提取 id
        const filePath = path.join(postsDirectory, fileName);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const matterResult = matter(fileContent);
        return {
            id, // 添加 id 属性
            ...matterResult.data,
            content: matterResult.content,
        };
    });
    return allPostsData.sort((a, b) => {
        // 确保time字段存在且是有效的日期格式
        if (!a.time || !b.time) {
            return 0; // 或者根据你的需求处理错误
        }
        return new Date(b.time) - new Date(a.time); // 颠倒排序
    });
}


