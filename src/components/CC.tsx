import Link from 'next/link';

interface CCProps {
    title: string;
    author: string;
    id: string;
}

export default function CC({ title, author, id }: CCProps) {
    return(
        <blockquote className={'border-l-4 border-gray-400 pl-4 my-4 text-sm text-gray-600 dark:text-gray-300'}>
            <p className={'mb-2'}>
  本文为原创文章，遵循:{' '}
  <Link
    href="https://creativecommons.org/licenses/by-nc-sa/4.0/?ref=chooser-v1"
    target="_blank"
    rel="license noopener noreferrer"
    className="text-primary hover:text-primary-hover rainbow_hover"
  >
    CC BY-NC-SA 4.0
  </Link>版权协议。
</p>
            <p className="text-xs space-y-1 break-all">
  <span className="break-all">本文链接：https://www.suiyan.cc/blog/{id}</span>
</p>
        </blockquote>

    )
}