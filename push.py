import subprocess
import time
import os
import re
from datetime import datetime

def get_new_articles():
    """获取新增的文章信息"""
    try:
        # 获取 git status，查找新增的 md 文件
        result = subprocess.check_output(
            ['git', 'status', '--porcelain'],
            text=True
        )

        new_articles = []
        for line in result.split('\n'):
            if line.strip():
                status, filepath = line.strip().split(maxsplit=1)
                if status.startswith('A') and filepath.startswith('md/') and filepath.endswith('.md'):
                    # 读取文章内容提取标题和时间
                    full_path = os.path.join(os.getcwd(), filepath)
                    if os.path.exists(full_path):
                        with open(full_path, 'r', encoding='utf-8') as f:
                            content = f.read()
                            # 提取标题（第一个 # 开头的行）
                            title_match = re.search(r'^#\s+(.+)$', content, re.MULTILINE)
                            title = title_match.group(1).strip() if title_match else filepath

                            # 提取时间（查找常见的日期格式）
                            time_match = re.search(r'\d{4}-\d{2}-\d{2}', content)
                            article_time = time_match.group(0) if time_match else ''

                            new_articles.append({
                                'title': title,
                                'time': article_time,
                                'filename': filepath
                            })
        return new_articles
    except subprocess.CalledProcessError as e:
        print(f"获取新文章失败: {e}")
        return []

def git_push():
    while True:
        try:
            subprocess.check_call(['git', 'push'])
            print("Git push successful!")
            break
        except subprocess.CalledProcessError as e:
            print(f"Git push failed with error {e}. Retrying in 5 seconds...")
            time.sleep(5)

def main():
    # 先检查是否有新文章
    new_articles = get_new_articles()

    # 检查工作目录状态
    try:
        status_result = subprocess.check_output(
            ['git', 'status', '--porcelain'],
            text=True
        )

        # 如果工作目录有更改，则添加并提交
        if status_result.strip():
            try:
                subprocess.check_call(['git', 'add', '.'])
                print("Git add successful.")
            except subprocess.CalledProcessError as e:
                print(f"Git add failed with error {e}.")
                return

            # 生成提交信息
            if new_articles:
                article_info = []
                for article in new_articles:
                    if article['time']:
                        article_info.append(f"{article['title']} ({article['time']})")
                    else:
                        article_info.append(article['title'])
                commit_message = f"新增文章: {', '.join(article_info)}"
            else:
                commit_message = f"更新 - {datetime.now().strftime('%Y-%m-%d %H:%M')}"

            try:
                subprocess.check_call(['git', 'commit', '-m', commit_message])
                print(f"Git commit successful: {commit_message}")
            except subprocess.CalledProcessError as e:
                print(f"Git commit failed with error {e}.")
                return
        else:
            print("工作目录干净，没有需要提交的更改。")
    except subprocess.CalledProcessError as e:
        print(f"检查 git status 失败: {e}")
        return

    git_push()

if __name__ == "__main__":
    main()
