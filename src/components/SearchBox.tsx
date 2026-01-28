import React from 'react';
import SearchIcon from './icons/SearchIcon';

interface SearchBoxProps {
    value: string;
    onChange: (value: string) => void;
    onSubmit: (e: React.FormEvent) => void;
    placeholder?: string;
}

const SearchBox: React.FC<SearchBoxProps> = ({
    value,
    onChange,
    onSubmit,
    placeholder = '输入关键词搜索...'
}) => {
    return (
        <form onSubmit={onSubmit} className="relative">
            <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                style={{ marginBottom: '0px' }}
                className="w-full px-4 py-2.5 pr-10 border border-border rounded bg-bg-content focus:outline-none focus:border-text-primary"
            />
            <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center p-1 text-sm text-text-secondary hover:text-text-dark"
                style={{ marginBottom: '0px' }}
                aria-label="搜索"
            >
                <SearchIcon />
            </button>
        </form>
    );
};

export default SearchBox;