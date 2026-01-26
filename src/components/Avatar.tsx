import Link from 'next/link';
import Image from 'next/image';
import GlowCard from './GlowCard';

export default function Avatar () {
    return (
        <Link
            className="w-full flex justify-center"
            href={`/`}
        >
            <GlowCard borderWidth={1} blurRadius={5} borderRadius="50%" displayDuration={500} fadeDuration={500} className="inline-block">
                <Image src="/assets/images/avatar.jpg" width={80} height={80} alt="avatar"
                       className={'rounded-full'}/>
            </GlowCard>
        </Link>
    );
}