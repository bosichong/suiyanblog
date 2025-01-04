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
  const blogFilePath = path.join(ARTICLES_DIR, `${filedir}/${pagename}.md`);
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
        exec(`code ${blogfile}`, (error, stdout, stderr) => { // 使用 blogfile 变量
          if (error) {
            console.error(`执行错误: ${error}`);
            return;
          }
          if (stderr) {
            console.error(`标准错误: ${stderr}`);
            return;
          }
          console.log(`VS Code 已打开文件: ${blogfile}`);
        });
      }
    }
  });
};

createBlog();
