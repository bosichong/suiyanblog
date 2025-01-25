
import {Link} from "@nextui-org/react";

export default function Footer (){
    return(
        <footer className={'container max-w-3xl mx-auto leading-normal text-lg font-extralight'}>
            <div className={'mx-auto max-w-5xl p-2'}>
                <div className={'mx-auto mt-4 max-w-md text-center text-sm '}>&copy; 2017 - 2025 <Link
                    className={'text-center text-sm'} href="https://www.suiyan.cc">SuiYan 碎言博客</Link> Built with <Link href="https://nextjs.org/">Next.js</Link></div>
            </div>

        </footer>
    )
}