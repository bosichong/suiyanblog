import React from 'react';
import { Post } from '../types';
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
    <article>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          a: ({ href, children }) => (
            <a href={href || ''}>
              {children}
            </a>
          ),
          img: ({ src, alt }) => (
            <img src={src} alt={alt || ''} />
          ),
          p: ({ children }) => (
            <p>
              {children}
            </p>
          ),
        }}
      >
        {sanitizedContent}
      </ReactMarkdown>

      <footer className='sf'>
        <time>
          {formatDate(latestThought.time || '')}
        </time>
        <a
          href="/thoughts"
        >
          <small>
            查看更多 →
          </small>
        </a>
      </footer>
    </article>
  );
}