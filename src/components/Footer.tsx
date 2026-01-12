import {Link} from "@nextui-org/react";

export default function Footer (){
    return(
        <footer className={'container max-w-3xl mx-auto leading-normal font-extralight'}>
            <div className={'mx-auto max-w-5xl p-2'}>
                <div className={'mx-auto mt-4 max-w-md text-center text-sm '}>&copy; 2017 - 2026 <Link
                    className={'text-center text-sm'} href="https://www.suiyan.cc">SuiYan 碎言博客</Link>  Built with <Link href="https://nextjs.org/" target="_blank">Next.js</Link> Powered by <Link href="https://vercel.com" target="_blank">Vercel</Link></div>
                <div className={'mx-auto mt-4 max-w-md text-center text-sm'}>
                   
                </div>

                <div className={'mx-auto mt-4 max-w-md text-center text-sm'}>
                    高速稳定，轻松访问全球网站 <Link href="https://cokecloud.pro/#/register?code=ec3M1gwR" target="_blank">可乐云</Link>
                </div>
            </div>

        </footer>
    )
}