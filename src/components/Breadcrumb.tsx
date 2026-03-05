import React from 'react';
import HomeIcon from './icons/HomeIcon';

interface BreadcrumbProps {
    type: 'home' | 'archives' | 'tags' | 'tag' | 'search' | 'friends' | 'blog' | 'sponsors' | 'ai-label' | 'thoughts';
    title?: string;
    tag?: string;
    pageNum?: number;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ type, title, tag, pageNum }) => {
    const renderItems = () => {
        const items: Array<{ label: string; href: string; icon?: React.ReactNode }> = [
            { label: '首页', href: '/', icon: <HomeIcon /> }
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
                items.push({ label: '搜索', href: '/search' });
                break;
            case 'friends':
                items.push({ label: '友情链接', href: '/Friends' });
                break;
            case 'thoughts':
                items.push({ label: '片语', href: '/thoughts' });
                break;
            case 'ai-label':
                items.push({ label: 'AI标识', href: '/AI-Label' });
                break;
            case 'blog':
                items.push({ label: title || '文章', href: '' });
                break;
            case 'sponsors':
                items.push({ label: '赞赏', href: '/Sponsors' });
                break;
            default:
                return null;
        }

        return items;
    };

    const items = renderItems();
    if (!items || items.length <= 1) return null;

    return (
        <nav aria-label="breadcrumb">
            <ul>
                {items.map((item, index) => (
                    <li key={index}>
                        {index === items.length - 1 && type === 'blog' ? (
                            <span>{item.label}</span>
                        ) : (
                            <a href={item.href} aria-label={item.label}>
                                {item.icon || item.label}
                            </a>
                        )}
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Breadcrumb;