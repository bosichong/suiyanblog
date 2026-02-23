const fs = require('fs');
const path = require('path');

const THOUGHTS_DIR = path.join('./md', 'thoughts');

const createFileDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

const createThought = (content = '我的片语...') => {
  const create_time = new Date().toISOString();
  const pagename = new Date().toISOString().replace(/[-:.TZ]/g, '').slice(0, 14);

  const thoughtFilePath = path.join(THOUGHTS_DIR, `${pagename}.md`);

  createFileDir(path.dirname(thoughtFilePath));

  const thoughtContent = `---
type: thought
time: '${create_time}'
tag: '闪念'
---

${content}
`;

  fs.writeFile(thoughtFilePath, thoughtContent, 'utf8', (err) => {
    if (err) {
      console.error('创建片语文件失败:', err);
    } else {
      console.log('片语创建成功！');
      console.log('文件路径:', thoughtFilePath);

      const { spawn } = require('child_process');
      const child = spawn('code', [thoughtFilePath], {
        shell: true,
        stdio: 'inherit'
      });

      child.on('error', (error) => {
        console.error(`执行错误: ${error.message}`);
      });

      child.on('close', (code) => {
        if (code === 0) {
          console.log(`VS Code 已打开文件: ${thoughtFilePath}`);
        } else {
          console.error(`VS Code 退出，代码: ${code}`);
        }
      });
    }
  });
};

createThought(process.argv[2] || '我的片语...');