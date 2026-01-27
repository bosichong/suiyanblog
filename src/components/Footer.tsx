import RainbowLink from './RainbowLink';

export default function Footer (){
    return(
        <footer className={'container max-w-3xl mx-auto leading-normal font-extralight'}>
            <div className={'mx-auto max-w-5xl p-2'}>
                <div className={'mx-auto mt-4 max-w-md text-center text-sm '}>
                    &copy; 2017 - 2026 <RainbowLink
                    className={'text-center text-sm text-primary underline underline-offset-2'} href="https://www.suiyan.cc">SuiYan 碎言博客</RainbowLink> · Built with <RainbowLink href="https://nextjs.org/" target="_blank" className="text-primary underline underline-offset-2">Next.js</RainbowLink> · Hosted on <RainbowLink href="https://vercel.com" target="_blank" className="text-primary underline underline-offset-2">Vercel</RainbowLink>
                </div>
                <div className={'mx-auto mt-4 max-w-md text-center text-sm'}>
                   
                </div>

                <div className={'mx-auto mt-4 max-w-md text-center text-sm'}>
                    高速稳定，轻松访问全球网站 <RainbowLink href="https://cokecloud.pro/#/register?code=ec3M1gwR" target="_blank" className="text-primary underline underline-offset-2">可乐云</RainbowLink>
                </div>
            </div>

            <script data-goatcounter="https://suiyan.goatcounter.com/count"
        async src="//gc.zgo.at/count.js"></script>

        </footer>
    )
}