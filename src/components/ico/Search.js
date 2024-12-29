export default function Search ({fill = "currentColor", filled, size, height, width, ...props}){
    return (
        <svg aria-hidden="true" fill="none" focusable="false" height="16" role="presentation" viewBox="0 0 24 24"
             width="16" className="text-base text-default-400 pointer-events-none flex-shrink-0" tabIndex="-1">
            <path
                d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
                stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
            <path d="M22 22L20 20" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                  stroke-width="2"></path>
        </svg>
    );
};