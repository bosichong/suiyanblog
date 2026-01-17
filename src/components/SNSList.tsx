import {Link} from "@nextui-org/react";
import { GithubIcon } from "./icons/GithubIcon";
import { MailCheckIcon } from "./icons/MailCheckIcon";
import { RssIcon } from "./icons/RssIcon";
import { YoutubeIcon } from "./icons/YoutubeIcon";

export default function SNSList() {
    return (
        <ul className="mt-4 flex justify-center gap-2">
            <li>
                <Link
                    href="https://space.bilibili.com/275991552"
                    rel="noreferrer"
                    target="_blank"
                    className="artlist m-auto"
                >
                    <span className="sr-only">bilibili</span>
                    <YoutubeIcon size={24} />
                </Link>
            </li>

            <li>
                <Link
                    href="https://github.com/bosichong/"
                    rel="noreferrer"
                    target="_blank"
                    className="artlist m-auto"
                >
                    <span className="sr-only">GitHub</span>
                    <GithubIcon size={24} />
                </Link>
            </li>

            <li>
                <Link
                    href="mailto:285911@gmail.com"
                    rel="noreferrer"
                    target="_blank"
                    className="artlist m-auto"
                >
                    <span className="sr-only">Mail</span>
                    <MailCheckIcon size={24} />
                </Link>
            </li>

            <li>
                <Link
                    href="https://www.suiyan.cc/rss.xml"
                    rel="noreferrer"
                    target="_blank"
                    className="artlist m-auto"
                >
                    <span className="sr-only">RSS</span>
                    <RssIcon size={24} />
                </Link>
            </li>
        </ul>
    );
}