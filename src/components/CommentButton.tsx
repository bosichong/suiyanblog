'use client'

interface CommentButtonProps {
    showComments: boolean
    commentCount: number
    onToggle: () => void
}

export default function CommentButton({ showComments, commentCount, onToggle }: CommentButtonProps) {
    return (
        <div className="relative inline-block">
            <button
                onClick={onToggle}
                className="text-text-secondary hover:text-text-dark"
                title="英雄请留步！欢迎点击图标，留言交流！"
                aria-label={showComments ? "隐藏评论" : "显示评论"}
            >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
                {/* 评论数角标 */}
                {commentCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                        {commentCount}
                    </span>
                )}
            </button>
        </div>
    )
}