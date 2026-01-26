import Link from 'next/link';
import { GithubIcon } from "./icons/GithubIcon";
import { MailCheckIcon } from "./icons/MailCheckIcon";
import { RssIcon } from "./icons/RssIcon";
import { YoutubeIcon } from "./icons/YoutubeIcon";
import GlowCard from "./GlowCard";

export default function SNSList() {
    return (
        <div className="mt-4 flex justify-center gap-2">
            <GlowCard borderWidth={1} blurRadius={3} borderRadius="0" displayDuration={500} fadeDuration={300} glowOpacity={0.5} className="inline-block">
                <Link
                    href="https://space.bilibili.com/275991552"
                    rel="noreferrer"
                    target="_blank"
                    className="artlist m-auto text-primary block"
                >
                    <span className="sr-only">bilibili</span>
                    <YoutubeIcon size={24} />
                </Link>
            </GlowCard>

            <GlowCard borderWidth={1} blurRadius={3} borderRadius="0" displayDuration={500} fadeDuration={300} glowOpacity={0.5} className="inline-block">
                <Link
                    href="https://github.com/bosichong/"
                    rel="noreferrer"
                    target="_blank"
                    className="artlist m-auto text-primary block"
                >
                    <span className="sr-only">GitHub</span>
                    <GithubIcon size={24} />
                </Link>
            </GlowCard>

            <GlowCard borderWidth={1} blurRadius={3} borderRadius="0" displayDuration={500} fadeDuration={300} glowOpacity={0.5} className="inline-block">
                <Link
                    href="mailto:285911@gmail.com"
                    rel="noreferrer"
                    target="_blank"
                    className="artlist m-auto text-primary block"
                >
                    <span className="sr-only">Mail</span>
                    <MailCheckIcon size={24} />
                </Link>
            </GlowCard>

            <GlowCard borderWidth={1} blurRadius={3} borderRadius="0" displayDuration={500} fadeDuration={300} glowOpacity={0.5} className="inline-block">
                <Link
                    href="https://www.suiyan.cc/rss.xml"
                    rel="noreferrer"
                    target="_blank"
                    className="artlist m-auto text-primary block"
                >
                    <span className="sr-only">RSS</span>
                    <RssIcon size={24} />
                </Link>
            </GlowCard>
        </div>
    );
}