import Link from 'next/link';
import Image from 'next/image';
import config from '../config';

export const metadata = {
    title: `404 - 页面走丢了 | ${config.BLOG_NAME}`,
    description: '抱歉，您访问的页面不存在',
    robots: 'noindex, follow',
};

export default function NotFound() {
    return (
        <div className="bg-white py-6 sm:py-0 min-h-screen flex items-center justify-center">
            <div className="mx-auto max-w-screen-xl px-4 md:px-8">
                <div className="grid gap-8 sm:grid-cols-2 sm:gap-12 items-center">
                <div className="overflow-hidden rounded-lg bg-gray-100 shadow-lg sm:rounded-none sm:shadow-none">
                    <Image 
                        src="/assets/images/404.avif" 
                        alt="404" 
                        width={600} 
                        height={400}
                        className="h-full w-full object-cover object-center"
                    />
                </div>
                <div className="flex flex-col items-center justify-center md:py-24 lg:py-32 xl:py-64">
                    <p className="mb-4 text-sm font-semibold uppercase text-indigo-500 md:text-base">错误 404</p>
                    <h1 className="mb-2 text-center text-2xl font-bold text-gray-800 md:text-3xl">页面未找到</h1>

                    <p className="mb-8 text-center text-gray-500 md:text-lg">抱歉，您访问的页面不存在。</p>

                    <a href="/" className="inline-block rounded-lg bg-gray-200 px-8 py-3 text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-300 focus-visible:ring active:text-gray-700 md:text-base">返回首页</a>
                </div>
                </div>
            </div>
        </div>
    );
}