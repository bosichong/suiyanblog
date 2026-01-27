const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const ARTICLES_DIR = path.join('./md');


const createFileDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

const createBlog = async (title = '博客标题', author = '', tag = '', filedir = '', pagename = '') => {
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
time: '${create_time}'
tag: '${tag}'
description: '博文的简介'
---

### 可以开始写blog啦(*￣︶￣)'
`;

  fs.writeFile(blogFilePath, blogContent, 'utf8', (err) => {
    if (err) {
      console.error('创建文件失败:', err);
    } else {
      console.log('blog文章.md创建成功！');
      let vscode = true;
      const blogfile = blogFilePath; // 确保定义了 blogfile 变量
      if (vscode) {
        const { spawn } = require('child_process');
        // 使用 spawn 并设置 shell: false 来避免命令注入
        const child = spawn('code', [blogfile], {
          shell: false,
          stdio: 'inherit'
        });

        child.on('error', (error) => {
          console.error(`执行错误: ${error.message}`);
        });

        child.on('close', (code) => {
          if (code === 0) {
            console.log(`VS Code 已打开文件: ${blogfile}`);
          } else {
            console.error(`VS Code 退出，代码: ${code}`);
          }
        });
      }
    }
  });
};

createBlog();
