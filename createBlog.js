const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const ARTICLES_DIR = path.join('./md');


const createFileDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

const createBlog = async (title = '博客标题', author = '', tag = '', filedir = '', pagename = '', ai_label = 0, category = '', noVSCode = false) => {
  const create_time = new Date().toISOString();

  if (!pagename) {
    pagename = new Date().toISOString().replace(/[-:.TZ]/g, '').slice(0, 14);
  }
  if (!tag) {
    tag = "未分类";
  }
  if (!author) {
    author = "J.sky"; // 直接使用已加载的配置
  }
  if (typeof ai_label !== 'number') {
    ai_label = 0;
  }
  if (!category) {
    category = "default";
  }

  // 路径遍历防护：规范化路径并移除父目录引用
  const normalizedFileDir = path.normalize(filedir).replace(/^(\.\.(\/|\\|$))+/, '');
  const normalizedPageName = path.normalize(pagename).replace(/^(\.\.(\/|\\|$))+/, '');

  const blogFilePath = path.join(ARTICLES_DIR, `${normalizedFileDir}/${normalizedPageName}.md`);

  // 验证最终路径是否仍在 ARTICLES_DIR 内
  const resolvedPath = path.resolve(blogFilePath);
  const resolvedArticlesDir = path.resolve(ARTICLES_DIR);
  if (!resolvedPath.startsWith(resolvedArticlesDir)) {
    console.error('错误：路径超出允许范围');
    return;
  }

  createFileDir(path.dirname(blogFilePath));

  const blogContent = `---
title: '${title}'
author: '${author}'
category: '${category}'
time: '${create_time}'
tag: '${tag}'
ai_label: ${ai_label}
description: '博文的简介'
---

### 可以开始写blog啦(*￣︶￣)'
`;

  fs.writeFile(blogFilePath, blogContent, 'utf8', (err) => {
    if (err) {
      console.error('创建文件失败:', err);
    } else {
      console.log('blog文章.md创建成功！');
      console.log('文件路径:', blogFilePath);

      if (!noVSCode) {
        const { spawn } = require('child_process');
        const child = spawn('code', [blogFilePath], {
          shell: true,
          stdio: 'inherit'
        });

        child.on('error', (error) => {
          console.error(`执行错误: ${error.message}`);
        });

        child.on('close', (code) => {
          if (code === 0) {
            console.log(`VS Code 已打开文件: ${blogFilePath}`);
          } else {
            console.error(`VS Code 退出，代码: ${code}`);
          }
        });
      }
    }
  });
};

// 解析命令行参数
const parseArgs = () => {
  const args = process.argv.slice(2);
  const params = {
    title: '博客标题',
    author: '',
    tag: '',
    filedir: '',
    pagename: '',
    ai_label: 0,
    category: '',
    noVSCode: false
  };

  // 检查是否禁用VSCode
  params.noVSCode = args.includes('-novs');

  // 移除 -novs 参数
  const filteredArgs = args.filter(arg => arg !== '-novs');

  // 定义分类快捷参数映射
  const categoryMap = {
    '-d': 'daily',      // 日常
    '-t': 'technology', // 技术
    '-j': 'journal'     // 日志
  };

  // 处理快捷分类参数
  filteredArgs.forEach(arg => {
    if (categoryMap[arg]) {
      params.category = categoryMap[arg];
    }
  });

  // 位置参数：title, author, tag, filedir, pagename, ai_label, category
  const positionalArgs = filteredArgs.filter(arg => !Object.keys(categoryMap).includes(arg));
  
  if (positionalArgs.length > 0) params.title = positionalArgs[0];
  if (positionalArgs.length > 1) params.author = positionalArgs[1];
  if (positionalArgs.length > 2) params.tag = positionalArgs[2];
  if (positionalArgs.length > 3) params.filedir = positionalArgs[3];
  if (positionalArgs.length > 4) params.pagename = positionalArgs[4];
  if (positionalArgs.length > 5) params.ai_label = parseInt(positionalArgs[5]) || 0;
  if (positionalArgs.length > 6) params.category = positionalArgs[6];

  return params;
};

const params = parseArgs();

createBlog(
  params.title,
  params.author,
  params.tag,
  params.filedir,
  params.pagename,
  params.ai_label,
  params.category,
  params.noVSCode
);
