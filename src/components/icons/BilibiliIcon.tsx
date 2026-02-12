const BilibiliIcon = ({ className = '' }: { className?: string }) => {
    return (
        <svg width="20" height="20" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" className={className}>
            <path fill="currentColor" d="M832 192H192c-35.3 0-64 28.7-64 64v448c0 35.3 28.7 64 64 64h640c35.3 0 64-28.7 64-64V256c0-35.3-28.7-64-64-64z"/>
            <path fill="#FFFFFF" d="M320 320h64v192h-64zM416 320h64v192h-64zM512 320h64v192h-64zM608 320h64v192h-64z"/>
            <path fill="currentColor" d="M192 192l128 64h384l128-64z"/>
            <path fill="#FFFFFF" d="M352 128c0-17.7 14.3-32 32-32s32 14.3 32 32v32h-64v-32zM640 128c0-17.7 14.3-32 32-32s32 14.3 32 32v32h-64v-32z"/>
            <path fill="currentColor" d="M288 160h448v32H288z"/>
        </svg>
    );
};

export default BilibiliIcon;