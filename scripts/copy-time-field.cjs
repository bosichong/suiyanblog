#!/usr/bin/env node
/**
 * 从旧版博客 md 文件复制 time 字段到新版 astro 博客
 * 旧版格式: time: '2019-05-14T09:11:29.000000Z'
 * 新版格式: 同上
 */

const fs = require('fs');
const path = require('path');

// 旧版 md 目录
const oldDir = '/home/bosi/code/suiyanblog/md';
// 新版 md 目录
const newDir = '/home/bosi/code/astro-suiyan/src/content/blog';

// 获取旧版所有 md 文件
const oldFiles = fs.readdirSync(oldDir).filter(f => f.endsWith('.md'));

let updated = 0;
let notFound = 0;
let errors = [];

for (const file of oldFiles) {
    const oldPath = path.join(oldDir, file);
    const newPath = path.join(newDir, file);
    
    // 检查新版是否存在该文件
    if (!fs.existsSync(newPath)) {
        notFound++;
        continue;
    }
    
    try {
        // 读取旧版文件
        const oldContent = fs.readFileSync(oldPath, 'utf8');
        const oldMatch = oldContent.match(/^time:\s*['"]([^'"]+)['"]/m);
        
        if (!oldMatch) {
            errors.push(`${file}: 旧版没有 time 字段`);
            continue;
        }
        
        const timeValue = oldMatch[1];
        
        // 读取新版文件
        let newContent = fs.readFileSync(newPath, 'utf8');
        
        // 检查新版是否已有 time 字段
        if (/^time:\s*['"]/.test(newContent)) {
            // 已有 time 字段，跳过
            continue;
        }
        
        // 替换 pubDate 为 time
        if (/^pubDate:\s*['"][^'"]+['"]/m.test(newContent)) {
            newContent = newContent.replace(
                /^pubDate:\s*['"][^'"]+['"]/m,
                `time: '${timeValue}'`
            );
            fs.writeFileSync(newPath, newContent, 'utf8');
            updated++;
        } else {
            errors.push(`${file}: 新版没有 pubDate 字段`);
        }
    } catch (err) {
        errors.push(`${file}: ${err.message}`);
    }
}

console.log('=== 批量复制时间字段完成 ===');
console.log(`已更新: ${updated} 篇`);
console.log(`旧版独有: ${notFound} 篇`);
if (errors.length > 0) {
    console.log('\n错误/警告:');
    errors.forEach(e => console.log(`  - ${e}`));
}