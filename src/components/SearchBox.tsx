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
            <fieldset role="group">
                <input
                    type="search"
                    id="Search"
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                />
                <input type="submit" value="搜索" />
            </fieldset>
        </form>
    );
};

export default SearchBox;