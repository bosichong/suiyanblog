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
            <div className="mt-0.5">
                <input
                    type="search"
                    id="Search"
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full border-2 border-black shadow-[4px_4px_0_0] focus:ring-2 focus:ring-yellow-300 sm:text-sm px-4 py-2"
                />
            </div>
        </form>
    );
};

export default SearchBox;