# 碎言博客 Skill

## 博文创建

```bash
node createBlog.js <快捷参数> "<标题>" "<作者>" "<标签>" "<目录>" "<文件名>" <AI标签> -novs
```

快捷参数（分类）：
- `-d` - daily（日常）
- `-t` - technology（技术）
- `-j` - journal（日志）

参数：
- 标题（必填）
- 作者（默认: J.sky）
- 标签（默认: 未分类）
- 目录（可选）
- 文件名（可选，默认时间戳）
- AI标签：0/1/2/3（默认: 0）
- 分类（默认: default）

示例：
```bash
node createBlog.js -d "日常" -novs
node createBlog.js -t "技术" -novs
node createBlog.js -j "期刊"
```

## 片语创建

```bash
node createThought.js "<内容>" -novs
```

## 推送流程

**⚠️ 推送前必须询问用户确认！**

用户确认后执行：
```bash
git add .
git commit -m "新增文章: <标题>"
git push
```

commit 根据实际修改内容写，例如：
- 新增文章：`新增文章: <标题>`
- 更新文章：`更新文章: <标题>`
- 修改配置：`更新配置: <描述>`
- 添加功能：`添加功能: <描述>`
- 修复问题：`修复: <描述>`