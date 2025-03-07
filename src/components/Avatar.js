import {Link,Image} from "@nextui-org/react";


export default function Avatar () {
    return (
        <Link
            className="w-full flex justify-center"
            href={`/`}
            size="md"
        >
            <Image src="/assets/images/avatar.jpg" width={80} height={80} alt="avatar"
                   className={'rounded-full hover:animate-pulse'}/>
        </Link>
    );
}