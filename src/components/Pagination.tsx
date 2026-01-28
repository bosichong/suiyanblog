import React from 'react';
import Link from 'next/link';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    basePath: string;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, basePath }) => {
    const getHref = (pageNumber: number) => {
        if (basePath === '') {
            // 首页分页逻辑
            return pageNumber === 1 ? '/' : `/page/${pageNumber}`;
        } else if (basePath === 'page') {
            // page/[page].tsx 的特殊处理
            // 第一页应该返回首页（/），而不是 /page/1
            return pageNumber === 1 ? '/' : `/page/${pageNumber}`;
        } else {
            // 其他分页逻辑（如 tags 等）
            return pageNumber === 1 ? `/${basePath}/` : `/${basePath}/${pageNumber}`;
        }
    };

    const prevPage = currentPage > 1 ? currentPage - 1 : null;
    const nextPage = currentPage < totalPages ? currentPage + 1 : null;

    if (totalPages <= 1) return null;

    return (
        <nav className="mt-8 mb-4 flex justify-center gap-4" aria-label="分页导航">
            {prevPage && (
                <Link
                    href={getHref(prevPage)}
                    className="px-4 py-2 text-sm border border-border rounded hover:text-text-dark hover:border-text-tertiary transition-colors"
                    aria-label="上一页"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6" />
                    </svg>
                </Link>
            )}
            {nextPage && (
                <Link
                    href={getHref(nextPage)}
                    className="px-4 py-2 text-sm border border-border rounded hover:text-text-dark hover:border-text-tertiary transition-colors"
                    aria-label="下一页"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6" />
                    </svg>
                </Link>
            )}
        </nav>
    );
};

export default Pagination;