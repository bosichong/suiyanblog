import React from 'react';
import { Post } from '../types';
import Link from './Link';
import ThoughtsIcon from './icons/ThoughtsIcon';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { sanitizeHtml } from '../utils/sanitizeHtml';

const formatDate = (dateString: string): string => {
  if (!dateString) return '';
  const parts = dateString.split('T')[0];
  const [year, month, day] = (parts || dateString.substring(0, 10)).split('-');
  return `${year}/${month}/${day}`;
};

interface ThoughtsPreviewProps {
  latestThought: Post | null;
}

export default function ThoughtsPreview({ latestThought }: ThoughtsPreviewProps) {
  if (!latestThought) {
    return null;
  }

  const sanitizedContent = sanitizeHtml(latestThought.content || latestThought.preview || '');

  return (
    <div className="mb-8">
      <div className="w-full bg-white rounded-lg overflow-hidden border border-gray-200">
        {/* 标题栏 */}
        <div className="h-8 bg-gray-100 border-b border-gray-200 flex items-center px-3 gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
          </div>
        </div>

        {/* 文本内容 */}
        <div className="p-6">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={{
              a: ({ href, children }) => (
                <Link className="break-words" href={href || ''}>
                  {children}
                </Link>
              ),
              img: ({ src, alt }) => (
                <img src={src} alt={alt || ''} className="rounded-lg max-h-32" />
              ),
              p: ({ children }) => (
                <p className="font-mono text-sm text-gray-700 leading-relaxed line-clamp-3">
                  {children}
                </p>
              ),
            }}
          >
            {sanitizedContent}
          </ReactMarkdown>
        </div>

        {/* 底部信息 */}
        <div className="px-6 pb-6 flex items-center justify-between">
          <time className="text-xs text-gray-500 font-mono">
            {formatDate(latestThought.time || '')}
          </time>

          <Link
            href="/thoughts"
            className="text-sm font-medium transition-colors"
          >
            查看更多 →
          </Link>
        </div>
      </div>
    </div>
  );
}