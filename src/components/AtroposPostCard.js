// components/AtroposPostCard.js
import { useEffect, useRef } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Link } from '@nextui-org/react';
import formatDate from '../utils/formatDate';
import BlogTime from './ico/BlogTime';
import Atropos from 'atropos';
import 'atropos/css';
import { useTheme } from 'next-themes';

export default function AtroposPostCard({ post }) {
    const atroposRef = useRef(null);
    const { theme } = useTheme();

    useEffect(() => {
        // 初始化Atropos
        const myAtropos = Atropos({
            el: atroposRef.current,
            activeOffset: 40,
            shadowScale: 1.05,
            highlight: true,
            rotateXMax: 10,
            rotateYMax: 10,
            shadow: true, // 始终启用阴影，通过CSS控制不同主题下的显示效果
            shadowOffset: 50,
            shadowScale: 0.9,
            duration: 400
        });

        // 组件卸载时清理
        return () => {
            myAtropos.destroy();
        };
    }, [theme]); // 添加theme作为依赖项，当主题变化时重新初始化

    return (
        <div className="atropos-wrapper my-2">
            <div className="atropos" ref={atroposRef}>
                <div className="atropos-scale">
                    <div className="atropos-rotate">
                        <div className="atropos-inner">
                            <Card className="atropos-card" key={post.id}>
                                <CardHeader className="flex gap-3" data-atropos-offset="5">
                                    <Link href={`/blog/${post.id}`} className="flex flex-col">
                                        <h3 className="text-2xl rainbow_text">{post.title}</h3>
                                    </Link>
                                </CardHeader>

                                <CardBody data-atropos-offset="3">
                                    <p className="text-md">{post.description}</p>
                                </CardBody>

                                <CardFooter className="text-sm" data-atropos-offset="1">
                                    <Link href={`/blog/${post.id}`} className="block text-sm justify-start w-1/2 flex">
                                        阅读全文 <span className="block text-sm">➞</span>
                                    </Link>
                                    <div className="flex justify-end w-1/2">
                                        <div className="flex items-center text-sm">
                                            <BlogTime />
                                            <span className="ml-2">{formatDate(post.time)}</span>
                                        </div>
                                    </div>
                                </CardFooter>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}