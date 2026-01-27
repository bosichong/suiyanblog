import React from 'react';
import Link from 'next/link';
import HomeIcon from './icons/HomeIcon';
import ChevronRightIcon from './icons/ChevronRightIcon';

interface BreadcrumbProps {
    type: 'home' | 'archives' | 'tags' | 'tag' | 'search' | 'friends' | 'page' | 'blog';
    title?: string;
    tag?: string;
    pageNum?: number;
}

/**
 * 面包屑导航组件
 * 显示当前页面的路径
 */
const Breadcrumb: React.FC<BreadcrumbProps> = ({ type, title, tag, pageNum }) => {
    const renderItems = () => {
        const items: Array<{ label: string; href: string; icon?: React.ReactNode }> = [
            { label: '首页', href: '/', icon: <HomeIcon size={16} /> }
        ];

        switch (type) {
            case 'home':
                // 首页不显示面包屑
                return null;
            case 'archives':
                items.push({ label: '文章归档', href: '/Archives' });
                break;
            case 'tags':
                items.push({ label: '标签', href: '/Tags' });
                break;
            case 'tag':
                items.push({ label: '标签', href: '/Tags' });
                if (tag) {
                    items.push({ label: tag, href: `/tags/${tag}` });
                }
                break;
            case 'search':
                items.push({ label: '搜索', href: '/search' });
                break;
            case 'friends':
                items.push({ label: '友情链接', href: '/Friends' });
                break;
            case 'page':
                items.push({ label: `第${pageNum}页`, href: `/page/${pageNum}` });
                break;
            case 'blog':
                items.push({ label: title || '文章', href: '' });
                break;
            default:
                return null;
        }

        return items;
    };

    const items = renderItems();
    if (!items || items.length <= 1) return null;

    return (
        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-4 px-4" role="navigation" aria-label="面包屑导航">
            {items.map((item, index) => (
                <React.Fragment key={index}>
                    {index === 0 ? (
                        <Link href={item.href} className="flex items-center hover:text-primary transition-colors" aria-label="返回首页">
                            {item.icon}
                        </Link>
                    ) : (
                        <Link href={item.href} className="hover:text-primary transition-colors">
                            {item.label}
                        </Link>
                    )}
                    {index < items.length - 1 && <ChevronRightIcon size={14} />}
                </React.Fragment>
            ))}
        </div>
    );
};

export default Breadcrumb;