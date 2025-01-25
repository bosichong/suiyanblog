
import {Link} from "@nextui-org/react";

export default function Footer (){
    return(
        <footer className={'container max-w-3xl mx-auto leading-normal font-extralight'}>
            <div className={'mx-auto max-w-5xl p-2'}>
                <div className={'mx-auto mt-4 max-w-md text-center text-sm '}>&copy; 2017 - 2025 <Link
                    className={'text-center text-sm'} href="https://www.suiyan.cc">SuiYan 碎言博客</Link></div>
                <div className={'mx-auto mt-4 max-w-md text-center text-sm'}>
                    Built with <Link href="https://nextjs.org/">Next.js</Link> Powered by <Link href="https://vercel.com">Vercel</Link>
                    </div>
            </div>

        </footer>
    )
}