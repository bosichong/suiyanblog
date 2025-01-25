import {Link,Image} from "@nextui-org/react"

export default function CC () {
    return(
        <blockquote className={'border-l-4 border-gray-400 pl-4 italic my-4 text-gray-600 dark:text-gray-300'}>
            <p className={'text-sm'} xmlnsCc="http://creativecommons.org/ns#">
  本文为原创文章，遵循:{' '}
  <Link
    href="https://creativecommons.org/licenses/by-nc-sa/4.0/?ref=chooser-v1"
    target="_blank"
    rel="license noopener noreferrer"
    style={{ display: 'inline-block' }}
  >
    CC BY-NC-SA 4.0
  </Link>版权协议，转载请附上原文出处链接和本声明。
</p>
        </blockquote>
        
    )
}