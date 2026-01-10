import {Link,Image} from "@nextui-org/react";
import GlowCard from "./GlowCard";


export default function Avatar () {
    return (
        <Link
            className="w-full flex justify-center"
            href={`/`}
            size="md"
        >
            <GlowCard borderWidth={3} borderRadius="50%">
                <Image src="/assets/images/avatar.jpg" width={80} height={80} alt="avatar"
                       className={'rounded-full hover:animate-pulse'}/>
            </GlowCard>
        </Link>
    );
}