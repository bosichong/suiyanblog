import React from 'react';
import Link from 'next/link';

interface BreadcrumbProps {
    type: 'home' | 'archives' | 'tags' | 'tag' | 'search' | 'friends' | 'page' | 'blog';
    title?: string;
    tag?: string;
    pageNum?: number;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ type, title, tag, pageNum }) => {
    const renderItems = () => {
        const items: Array<{ label: string; href: string }> = [
            { label: '首页', href: '/' }
        ];

        switch (type) {
            case 'home':
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
                items.push({ label: '搜索', href: '/Search' });
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
        <nav className="flex items-center space-x-2 text-sm text-text-secondary mb-4" role="navigation" aria-label="面包屑导航">
            {items.map((item, index) => (
                <React.Fragment key={index}>
                    <Link href={item.href} className="hover:text-text-dark">
                        {item.label}
                    </Link>
                    {index < items.length - 1 && (
                        <span className="text-border" aria-hidden="true">/</span>
                    )}
                </React.Fragment>
            ))}
        </nav>
    );
};

export default Breadcrumb;