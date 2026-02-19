import { Post } from '../types';
import Link from './Link';
import ThoughtsIcon from './icons/ThoughtsIcon';

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

  return (
    <div className="mb-8 pb-4 border-b border-dashed border-neutral-400">
      <div className="flex items-center gap-2 mb-3">
        <ThoughtsIcon className="w-6 h-6 text-blue-600" />
        <h2 className="text-lg font-semibold text-gray-800">片语</h2>
      </div>

      <div className="mb-3">
        <p className="text-sm text-gray-700 whitespace-pre-wrap line-clamp-3">
          {latestThought.content || latestThought.preview}
        </p>
      </div>

      <div className="flex items-center justify-between">
        <time className="text-xs text-gray-500">
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
  );
}