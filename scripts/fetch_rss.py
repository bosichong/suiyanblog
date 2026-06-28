#!/usr/bin/env python3
"""采集友链 RSS 最近一个月文章，输出到 src/data/rss_data.json，供 links.astro 动态排序展示"""

import feedparser
import requests
import json
import os
import re
import sys
from datetime import datetime, timedelta, timezone
from concurrent.futures import ThreadPoolExecutor, as_completed
from email.utils import parsedate_to_datetime

CONSTS_PATH = os.path.join(os.path.dirname(__file__), '..', 'src', 'consts.ts')
OUTPUT_PATH = os.path.join(os.path.dirname(__file__), '..', 'src', 'data', 'rss_data.json')
WEEKS_LIMIT = 4
MAX_WORKERS = 8
REQUEST_TIMEOUT = 15


def tag(t, msg):
    """结构化输出，方便 Hermes 解析"""
    print(f"[{t:>5}] {msg}")


def parse_friends():
    """从 consts.ts 解析出友链列表"""
    with open(CONSTS_PATH, 'r', encoding='utf-8') as f:
        content = f.read()

    array_start = content.find('export const FRIENDS_LINKS = [')
    if array_start == -1:
        tag('ERROR', 'FRIENDS_LINKS not found in consts.ts')
        sys.exit(1)

    bracket_start = content.index('[', array_start)
    depth = 0
    array_end = bracket_start
    for i in range(bracket_start, len(content)):
        if content[i] == '[':
            depth += 1
        elif content[i] == ']':
            depth -= 1
            if depth == 0:
                array_end = i + 1
                break

    array_body = content[bracket_start + 1:array_end - 1]

    friends = []
    i = 0
    while i < len(array_body):
        ch = array_body[i]
        if ch == '{':
            depth = 0
            start = i
            for j in range(i, len(array_body)):
                if array_body[j] == '{':
                    depth += 1
                elif array_body[j] == '}':
                    depth -= 1
                    if depth == 0:
                        block = array_body[start:j + 1]
                        m = re.search(r"site_url:\s*'([^']+)'", block)
                        site_url = m.group(1).rstrip('/') if m else ''
                        m2 = re.search(r"site_name:\s*'([^']+)'", block)
                        site_name = m2.group(1) if m2 else ''
                        m3 = re.search(r"rss:\s*'([^']+)'", block)
                        rss_url = m3.group(1) if m3 else '#'
                        friends.append({
                            'name': site_name,
                            'site_url': site_url,
                            'rss': rss_url,
                        })
                        i = j + 1
                        break
        else:
            i += 1

    return friends


def normalize_datetime(published_str):
    dt = None
    if not published_str:
        return None
    try:
        dt = parsedate_to_datetime(published_str)
    except Exception:
        pass
    if dt is None:
        try:
            m = re.search(r'(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2})', published_str)
            if m:
                dt = datetime.fromisoformat(m.group(1))
        except Exception:
            pass
    if dt is None:
        try:
            m = re.search(r'(\d{4}-\d{2}-\d{2})', published_str)
            if m:
                dt = datetime.strptime(m.group(1), '%Y-%m-%d')
        except Exception:
            pass
    if dt is not None and dt.tzinfo is None:
        dt = dt.replace(tzinfo=timezone.utc)
    return dt


def fetch_feed(feed_url, site_name, cutoff):
    articles = []
    error = None
    try:
        resp = requests.get(feed_url, timeout=REQUEST_TIMEOUT)
        resp.raise_for_status()
        feed = feedparser.parse(resp.content)
        for entry in feed.entries:
            published_str = entry.get('published', entry.get('updated', ''))
            published_dt = None
            if hasattr(entry, 'published_parsed') and entry.published_parsed:
                published_dt = datetime(*entry.published_parsed[:6], tzinfo=timezone.utc)
            elif hasattr(entry, 'updated_parsed') and entry.updated_parsed:
                published_dt = datetime(*entry.updated_parsed[:6], tzinfo=timezone.utc)
            else:
                published_dt = normalize_datetime(published_str)
            title = entry.get('title', '').strip()
            if not title:
                continue
            if published_dt and published_dt >= cutoff:
                articles.append({
                    'title': title,
                    'link': entry.get('link', ''),
                    'published': published_str,
                    'published_parsed': published_dt.strftime('%Y-%m-%d'),
                    '_dt': published_dt,
                })
    except requests.Timeout:
        error = f"连接超时 ({REQUEST_TIMEOUT}s)"
    except requests.ConnectionError as e:
        error = f"连接失败: {e}"
    except requests.HTTPError as e:
        error = f"HTTP {e}"
    except Exception as e:
        error = str(e)

    return articles, error


def main():
    start_time = datetime.now()
    tag('INFO', f'RSS 采集开始')

    friends = parse_friends()
    tag('INFO', f'共 {len(friends)} 个友链')

    # 分类：有 RSS vs 跳过
    feed_tasks = []
    skipped = []
    for b in friends:
        if b['rss'] and b['rss'] != '#':
            feed_tasks.append(b)
        else:
            skipped.append(b)
            tag('SKIP', f"{b['name']:12s} | {b['site_url']:20s} | 未配置 RSS")

    tag('INFO', f'待采集 {len(feed_tasks)} 个, 跳过 {len(skipped)} 个')
    cutoff = datetime.now(timezone.utc) - timedelta(weeks=WEEKS_LIMIT)

    # 并发采集
    all_results = {}
    failures = []  # (name, site_url, error_msg)
    no_articles = []  # (name, site_url)

    with ThreadPoolExecutor(max_workers=MAX_WORKERS) as executor:
        future_map = {
            executor.submit(fetch_feed, b['rss'], b['name'], cutoff): b
            for b in feed_tasks
        }
        for future in as_completed(future_map):
            b = future_map[future]
            site_url = b['site_url']
            try:
                articles, error = future.result()
                if error:
                    failures.append((b['name'], site_url, error))
                    tag('ERROR', f"{b['name']:12s} | {site_url:20s} | {error}")
                    all_results[site_url] = []
                elif not articles:
                    no_articles.append((b['name'], site_url))
                    tag('WARN', f"{b['name']:12s} | {site_url:20s} | 近 {WEEKS_LIMIT} 周无新文章")
                    all_results[site_url] = []
                else:
                    articles.sort(key=lambda a: a['_dt'], reverse=True)
                    all_results[site_url] = [
                        {'title': a['title'], 'link': a['link'], 'published': a['published'], 'published_parsed': a['published_parsed']}
                        for a in articles
                    ]
                    tag('OK', f"{b['name']:12s} | {site_url:20s} | {len(articles)} 篇")
            except Exception as e:
                failures.append((b['name'], site_url, str(e)))
                tag('ERROR', f"{b['name']:12s} | {site_url:20s} | {e}")
                all_results[site_url] = []

    # 输出 JSON
    os.makedirs(os.path.dirname(OUTPUT_PATH), exist_ok=True)
    with open(OUTPUT_PATH, 'w', encoding='utf-8') as f:
        json.dump(all_results, f, indent=2, ensure_ascii=False)

    total = sum(len(v) for v in all_results.values())

    # ===== 摘要 =====
    elapsed = datetime.now() - start_time
    tag('INFO', f'采集耗时 {elapsed.total_seconds():.0f}s')

    sep = '=' * 60
    print(f'\n{sep}')
    print(f'   RSS 采集报告')
    print(f'{sep}')
    print(f'   时间:     {start_time.strftime("%Y-%m-%d %H:%M:%S")}')
    print(f'   总站点:   {len(friends)}')
    print(f'   有 RSS:   {len(feed_tasks)}')
    print(f'   成功:     {len(feed_tasks) - len(failures)}')
    print(f'   失败:     {len(failures)}')
    print(f'   跳过:     {len(skipped)}')
    print(f'   总文章:   {total} (近 {WEEKS_LIMIT} 周)')
    print(f'{sep}')
    print(f'   文件更新:')
    print(f'     • {OUTPUT_PATH}')
    print(f'{sep}')

    if failures or no_articles:
        print(f'\n   📋 关注事项')
        print(f'   {"-" * 56}')
        for name, site_url, err in failures:
            print(f'   ⚠ {name:12s} | {site_url:20s} | {err}')
        for name, site_url in no_articles:
            print(f'   ⚠ {name:12s} | {site_url:20s} | 近 {WEEKS_LIMIT} 周无新文章')
        print(f'   {"-" * 56}')
        print()

    tag('DONE', f'采集完成, 共 {total} 篇文章')


if __name__ == '__main__':
    main()
