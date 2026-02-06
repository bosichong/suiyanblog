import Head from 'next/head';
import Link from 'next/link';
import config from '../config';

export default function Custom404() {
    return (
        <>
            <Head>
                <title>{`404 - 页面走丢了 | ${config.BLOG_NAME}`}</title>
                <meta name="description" content="抱歉，您访问的页面不存在" />
                <meta name="robots" content="noindex, follow" />
            </Head>
            <div className="flex flex-col items-center justify-center min-h-screen px-8 text-center">
                <div className="mb-8 animate-[float_3s_ease-in-out_infinite]">
                    <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="2" className="text-orange-500 animate-[pulse_2s_ease-in-out_infinite]" />
                        <circle cx="70" cy="85" r="8" fill="currentColor" className="text-neutral-800" />
                        <circle cx="130" cy="85" r="8" fill="currentColor" className="text-neutral-800" />
                        <path d="M60 120 Q100 150 140 120" stroke="currentColor" strokeWidth="3" fill="none" className="text-neutral-800" />
                        <text x="100" y="180" textAnchor="middle" fontSize="24" fill="currentColor" className="text-orange-500 font-semibold">404</text>
                    </svg>
                </div>
                <h1 className="text-2xl font-normal mb-6 text-neutral-800">页面走丢了</h1>
                <p className="text-lg leading-relaxed mb-10 text-neutral-600 max-w-lg">
                    就像人生一样，有时候你也会走到死胡同。<br />
                    别担心，这只是个页面，不是你的人生。
                </p>
                <Link href="/" className="px-6 py-3 text-neutral-800 text-base border border-neutral-400 rounded-sm hover:bg-orange-500 hover:text-white hover:-translate-y-0.5 hover:shadow-md transition-all duration-300">
                    回到首页
                </Link>
            </div>
        </>
    );
}