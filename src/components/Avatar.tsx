import Link from 'next/link';
import Image from 'next/image';

export default function Avatar () {
    return (
        <Link
            className="w-full flex justify-center"
            href={`/`}
        >
                <Image src="/assets/images/avatar.jpg" width={80} height={80} alt="avatar"
                       className={'rounded-full hover:animate-pulse'}/>
        </Link>
    );
}