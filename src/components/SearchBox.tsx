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
        <form onSubmit={onSubmit}>
            <div className="relative mt-0.5">
                <input
                    type="search"
                    id="Search"
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full border-2 border-black pe-8 shadow-[4px_4px_0_0] focus:ring-2 focus:ring-yellow-300 sm:text-sm px-4 py-2"
                />
                <button
                    type="submit"
                    className="absolute top-1 right-1 grid size-8 place-content-center bg-black text-white hover:bg-gray-800 focus:bg-gray-800 focus:outline-0"
                    aria-label="搜索"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
                        <path fill-rule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clip-rule="evenodd"></path>
                    </svg>
                </button>
            </div>
        </form>
    );
};

export default SearchBox;