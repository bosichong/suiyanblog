import Link from 'next/link';

export default function CC () {
    return(
        <blockquote className={'border-l-4 border-gray-400 pl-4 italic my-4 text-gray-600 dark:text-gray-300'}>
            <p className={'text-sm'}>
  本文为原创文章，遵循:{' '}
  <Link
    href="https://creativecommons.org/licenses/by-nc-sa/4.0/?ref=chooser-v1"
    target="_blank"
    rel="license noopener noreferrer"
    className="text-primary hover:text-primary-hover rainbow_hover"
  >
    CC BY-NC-SA 4.0
  </Link>版权协议，转载请附上原文出处链接和本声明。
</p>
        </blockquote>

    )
}