'use client'

import Link from 'next/link'

export default function SponsorButton() {
    return (
        <div className="relative inline-block">
            <Link
                href="/Sponsors"
                className="inline-block text-text-secondary hover:text-text-dark transition-colors duration-200"
                title="赞赏作者"
                aria-label="赞赏作者"
            >
                <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-7 h-7"
                >
                    <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
                    <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
                    <line x1="6" y1="1" x2="6" y2="4" />
                    <line x1="10" y1="1" x2="10" y2="4" />
                    <line x1="14" y1="1" x2="14" y2="4" />
                </svg>
            </Link>
        </div>
    )
}