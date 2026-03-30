#!/usr/bin/env node
/**
 * 新建博客文章
 * 用法: pnpm nb 或 npm run nb
 */

import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const blogDir = path.join(__dirname, '../src/content/blog');

// 创建 readline 接口
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// 提问封装
function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, (answer) => {
      resolve(answer.trim());
    });
  });
}

// 生成时间戳文件名
function generateFileName() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  return `${year}${month}${day}${hours}${minutes}${seconds}.md`;
}

// 生成 ISO 时间格式
function generateISOTime() {
  return new Date().toISOString();
}

// 主流程
async function main() {
  console.log('\n📝 新建博客文章\n');

  // 1. 获取标题
  const title = await question('文章标题: ');
  if (!title) {
    console.log('❌ 标题不能为空');
    rl.close();
    process.exit(1);
  }

  // 2. 获取描述
  const description = await question('文章描述 (回车使用标题): ');
  const finalDescription = description || title;

  // 3. 选择标签
  console.log('\n选择标签:');
  console.log('  1. 日常 (daily)');
  console.log('  2. 技术 (technology)');
  console.log('  3. 期刊');
  const tagChoice = await question('请选择 [1/2/3，默认 1]: ');
  
  let tags = [];
  if (tagChoice === '2') {
    tags = ['technology'];
  } else if (tagChoice === '3') {
    tags = ['journal'];
  } else {
    tags = ['daily'];
  }

  // 4. AI 标识
  console.log('\nAI 标识:');
  console.log('  0. HAND - 手写·每一个字都由作者亲手敲出');
  console.log('  1. VOICE - 口述·语音转文字，AI负责修正');
  console.log('  2. POLISH - 润色·核心由作者完成，AI辅助');
  console.log('  3. DUET - 协奏·人与AI共创，互相启发');
  console.log('  4. AUTO - 自动·AI主导生成，人类审核');
  const aiChoice = await question('请选择 [0-4，默认 0]: ');
  const ai = ['0', '1', '2', '3', '4'].includes(aiChoice) ? parseInt(aiChoice) : 0;

  // 5. 封面图
  console.log('\n封面图设置:');
  console.log('  图片需放在 src/assets/images/年/ 目录下');
  const heroImagePath = await question('封面图路径 (如 2026/xxx.jpg，回车跳过): ');
  
  let heroImageLine = '';
  let heroImageAltLine = '';
  
  if (heroImagePath) {
    heroImageLine = `\nheroImage: ../../assets/images/${heroImagePath}`;
    const heroImageAlt = await question('图片描述 (如 海边): ');
    if (heroImageAlt) {
      heroImageAltLine = `\nheroImageAlt: '${heroImageAlt}'`;
    }
  }

  // 生成文件名和内容
  const fileName = generateFileName();
  const filePath = path.join(blogDir, fileName);
  const time = generateISOTime();

  // 构建 frontmatter
  const tagsStr = `['${tags.join("', '")}']`;
  const frontmatter = `---
title: '${title}'
description: '${finalDescription}'
time: '${time}'
tags: ${tagsStr}${heroImageLine}${heroImageAltLine}
ai_label: ${ai}
---

`;

  // 写入文件
  fs.writeFileSync(filePath, frontmatter);
  
  console.log(`\n✅ 文章已创建: ${fileName}`);
  console.log(`📍 路径: ${filePath}\n`);

  // 用 VS Code 打开
  const { execSync } = await import('child_process');
  try {
    execSync(`code "${filePath}"`, { stdio: 'ignore' });
    console.log('📝 已用 VS Code 打开\n');
  } catch {
    // VS Code 不在 PATH 中，忽略
  }

  rl.close();
}

main().catch((err) => {
  console.error('错误:', err);
  rl.close();
  process.exit(1);
});