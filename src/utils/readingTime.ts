/**
 * 阅读时间计算工具
 * 基于 reading-time 库，适配中文博客
 */

import readingTime from 'reading-time';

/** 中文阅读速度：约 300-400 字/分钟 */
const WORDS_PER_MINUTE_CN = 350;

export interface ReadingTimeResult {
  /** 阅读时间（分钟） */
  minutes: number;
  /** 阅读时间（格式化字符串，如 "3 分钟阅读"） */
  text: string;
  /** 总字数 */
  words: number;
}

/**
 * 计算阅读时间
 * @param content 文章内容（Markdown 或纯文本）
 * @returns 阅读时间信息
 */
export function getReadingTime(content: string): ReadingTimeResult {
  // 使用 reading-time 库计算，设置中文阅读速度
  const stats = readingTime(content, {
    wordsPerMinute: WORDS_PER_MINUTE_CN,
  });

  const minutes = Math.ceil(stats.minutes);

  return {
    minutes,
    text: minutes < 1 ? '1 分钟阅读' : `${minutes} 分钟阅读`,
    words: stats.words,
  };
}

/**
 * 格式化阅读时间为简短形式
 * @param minutes 分钟数
 * @returns 如 "3 min" 或 "1 min"
 */
export function formatReadingTime(minutes: number): string {
  if (minutes < 1) return '1 min';
  return `${minutes} min`;
}