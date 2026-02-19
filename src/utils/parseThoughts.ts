import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Post } from '../types';

const thoughtsDirectory = path.join(process.cwd(), 'md', 'thoughts');

export default function getSortedThoughtsData(): Post[] {
    if (!fs.existsSync(thoughtsDirectory)) {
        return [];
    }

    const fileNames = fs.readdirSync(thoughtsDirectory);
    const allThoughtsData = fileNames.map(fileName => {
        const id = fileName.replace(/\.md$/, '');
        const filePath = path.join(thoughtsDirectory, fileName);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const matterResult = matter(fileContent);

        // 片语没有标题，使用内容摘要
        const content = matterResult.content.trim();
        const preview = content.length > 100 ? content.substring(0, 100) + '...' : content;

        return {
            id,
            ...matterResult.data,
            content,
            preview,
            type: 'thought',
        };
    });

    return allThoughtsData.sort((a: Post, b: Post) => {
        if (!a.time || !b.time) {
            return 0;
        }
        return new Date(b.time).getTime() - new Date(a.time).getTime();
    });
}

export function getThoughtById(id: string): Post | null {
    if (!fs.existsSync(thoughtsDirectory)) {
        return null;
    }

    const filePath = path.join(thoughtsDirectory, `${id}.md`);
    if (!fs.existsSync(filePath)) {
        return null;
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');
    const matterResult = matter(fileContent);

    return {
        id,
        ...matterResult.data,
        content: matterResult.content,
        type: 'thought',
    };
}