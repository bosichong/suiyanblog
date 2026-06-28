# Hermes 定时任务：RSS 采集

## 触发方式
每天早上 10:00 执行。

## 执行命令
```bash
cd /home/bosi/code/suiyanblog && npm run rss
```

## 输出处理

### 正常情况
脚本输出包含 `[DONE]` 标记，表示采集完成。无异常时静默结束即可。

### 异常处理
捕获 `stdout`，检查以下标记：

- `[ERROR]` — RSS 采集失败（网络超时、连接被拒等）→ **需发送邮件通知**
- `[WARN]`  — RSS 无近期文章（可能链接已失效）→ **需发送邮件通知**
- `[SKIP]`  — 站点未配置 RSS（`rss: '#'`）→ 无需通知

### 邮件通知内容
将 `⚠ 关注事项` 部分的内容整理后发送到用户邮箱。

## 依赖安装（首次）
```bash
pip install feedparser requests
```

## 任务卡片

| 项目 | 内容 |
|------|------|
| 任务名 | RSS 采集通知 |
| 定时 | 每天 10:00 |
| 命令 | `cd /home/bosi/code/suiyanblog && npm run rss` |
| 通知条件 | stdout 中出现 `[ERROR]` 或 `[WARN]` |
| 通知方式 | 邮件 |
| 静默条件 | 仅出现 `[OK]` / `[SKIP]` / `[INFO]` / `[DONE]` 时不通知 |
