import { Html, Head, Main, NextScript } from 'next/document';
import config from '@/config';

export default function Document() {
    return (
        <Html lang="zh-CN">
            <Head>
                <meta charSet="utf-8" />
                <meta name="description" content={config.META_DESCRIPTION} />
                <meta name="keywords" content={config.META_KEYWORDS} />
                <meta name="author" content={config.BLOG_AUTHOR} />
                <meta name="robots" content="index, follow" />
                <meta name="googlebot" content="index, follow" />
                <meta property="og:title" content={config.BLOG_NAME} />
                <meta property="og:description" content={config.META_DESCRIPTION} />
                <meta property="og:type" content="website" />
                <meta property="og:locale" content="zh_CN" />
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:title" content={config.BLOG_NAME} />
                <meta name="twitter:description" content={config.META_DESCRIPTION} />
                <meta name="fediverse:creator" content="@J_sky@mastodon.social" />
                <link rel="icon" href="/favicon.ico" />
                <link rel="alternate" type="application/rss+xml" title="碎言 - SuiYan Blog" href="/feed.xml" />
                <meta name="google-site-verification" content="U4r9UrN0jN5L0q1WT2xe_MN54JY1xn9MIOD-IpSyL-s" />
                <script dangerouslySetInnerHTML={{
                    __html: `
                        (function() {
                            try {
                                const savedColor = localStorage.getItem('pico-theme-color');
                                if (savedColor && savedColor !== '') {
                                    const colorThemes = {
                                        'Red': { primary: '#e03131', primaryBackground: '#e03131', primaryBorder: '#e03131', primaryUnderline: 'rgba(224, 49, 49, 0.5)', primaryHover: '#c92a2a', primaryHoverBackground: '#c92a2a', primaryHoverBorder: '#c92a2a', primaryHoverUnderline: '#c92a2a', primaryFocus: 'rgba(224, 49, 49, 0.5)', primaryInverse: '#ffffff' },
                                        'Pink': { primary: '#c2255c', primaryBackground: '#c2255c', primaryBorder: '#c2255c', primaryUnderline: 'rgba(194, 37, 92, 0.5)', primaryHover: '#a61e4d', primaryHoverBackground: '#a61e4d', primaryHoverBorder: '#a61e4d', primaryHoverUnderline: '#a61e4d', primaryFocus: 'rgba(194, 37, 92, 0.5)', primaryInverse: '#ffffff' },
                                        'Fuchsia': { primary: '#9c36b5', primaryBackground: '#9c36b5', primaryBorder: '#9c36b5', primaryUnderline: 'rgba(156, 54, 181, 0.5)', primaryHover: '#862e9c', primaryHoverBackground: '#862e9c', primaryHoverBorder: '#862e9c', primaryHoverUnderline: '#862e9c', primaryFocus: 'rgba(156, 54, 181, 0.5)', primaryInverse: '#ffffff' },
                                        'Purple': { primary: '#7950f2', primaryBackground: '#7950f2', primaryBorder: '#7950f2', primaryUnderline: 'rgba(121, 80, 242, 0.5)', primaryHover: '#7048e7', primaryHoverBackground: '#7048e7', primaryHoverBorder: '#7048e7', primaryHoverUnderline: '#7048e7', primaryFocus: 'rgba(121, 80, 242, 0.5)', primaryInverse: '#ffffff' },
                                        'Violet': { primary: '#5f3dc4', primaryBackground: '#5f3dc4', primaryBorder: '#5f3dc4', primaryUnderline: 'rgba(95, 61, 196, 0.5)', primaryHover: '#5c2c9c', primaryHoverBackground: '#5c2c9c', primaryHoverBorder: '#5c2c9c', primaryHoverUnderline: '#5c2c9c', primaryFocus: 'rgba(95, 61, 196, 0.5)', primaryInverse: '#ffffff' },
                                        'Indigo': { primary: '#4263eb', primaryBackground: '#4263eb', primaryBorder: '#4263eb', primaryUnderline: 'rgba(66, 99, 235, 0.5)', primaryHover: '#3b5bdb', primaryHoverBackground: '#3b5bdb', primaryHoverBorder: '#3b5bdb', primaryHoverUnderline: '#3b5bdb', primaryFocus: 'rgba(66, 99, 235, 0.5)', primaryInverse: '#ffffff' },
                                        'Blue': { primary: '#1c7ed6', primaryBackground: '#1c7ed6', primaryBorder: '#1c7ed6', primaryUnderline: 'rgba(28, 126, 214, 0.5)', primaryHover: '#1971c2', primaryHoverBackground: '#1971c2', primaryHoverBorder: '#1971c2', primaryHoverUnderline: '#1971c2', primaryFocus: 'rgba(28, 126, 214, 0.5)', primaryInverse: '#ffffff' },
                                        'Azure': { primary: '#1098ad', primaryBackground: '#1098ad', primaryBorder: '#1098ad', primaryUnderline: 'rgba(16, 152, 173, 0.5)', primaryHover: '#0c8599', primaryHoverBackground: '#0c8599', primaryHoverBorder: '#0c8599', primaryHoverUnderline: '#0c8599', primaryFocus: 'rgba(16, 152, 173, 0.5)', primaryInverse: '#ffffff' },
                                        'Cyan': { primary: '#0ca678', primaryBackground: '#0ca678', primaryBorder: '#0ca678', primaryUnderline: 'rgba(12, 166, 120, 0.5)', primaryHover: '#099268', primaryHoverBackground: '#099268', primaryHoverBorder: '#099268', primaryHoverUnderline: '#099268', primaryFocus: 'rgba(12, 166, 120, 0.5)', primaryInverse: '#ffffff' },
                                        'Jade': { primary: '#2f9e44', primaryBackground: '#2f9e44', primaryBorder: '#2f9e44', primaryUnderline: 'rgba(47, 158, 68, 0.5)', primaryHover: '#2b8a3e', primaryHoverBackground: '#2b8a3e', primaryHoverBorder: '#2b8a3e', primaryHoverUnderline: '#2b8a3e', primaryFocus: 'rgba(47, 158, 68, 0.5)', primaryInverse: '#ffffff' },
                                        'Green': { primary: '#37b24d', primaryBackground: '#37b24d', primaryBorder: '#37b24d', primaryUnderline: 'rgba(55, 178, 77, 0.5)', primaryHover: '#2f9e44', primaryHoverBackground: '#2f9e44', primaryHoverBorder: '#2f9e44', primaryHoverUnderline: '#2f9e44', primaryFocus: 'rgba(55, 178, 77, 0.5)', primaryInverse: '#ffffff' },
                                        'Lime': { primary: '#74b816', primaryBackground: '#74b816', primaryBorder: '#74b816', primaryUnderline: 'rgba(116, 184, 22, 0.5)', primaryHover: '#66a80f', primaryHoverBackground: '#66a80f', primaryHoverBorder: '#66a80f', primaryHoverUnderline: '#66a80f', primaryFocus: 'rgba(116, 184, 22, 0.5)', primaryInverse: '#ffffff' },
                                        'Yellow': { primary: '#fcc419', primaryBackground: '#fcc419', primaryBorder: '#fcc419', primaryUnderline: 'rgba(252, 196, 25, 0.5)', primaryHover: '#fab005', primaryHoverBackground: '#fab005', primaryHoverBorder: '#fab005', primaryHoverUnderline: '#fab005', primaryFocus: 'rgba(252, 196, 25, 0.5)', primaryInverse: '#ffffff' },
                                        'Amber': { primary: '#f59f00', primaryBackground: '#f59f00', primaryBorder: '#f59f00', primaryUnderline: 'rgba(245, 159, 0, 0.5)', primaryHover: '#e67700', primaryHoverBackground: '#e67700', primaryHoverBorder: '#e67700', primaryHoverUnderline: '#e67700', primaryFocus: 'rgba(245, 159, 0, 0.5)', primaryInverse: '#ffffff' },
                                        'Pumpkin': { primary: '#e67700', primaryBackground: '#e67700', primaryBorder: '#e67700', primaryUnderline: 'rgba(230, 119, 0, 0.5)', primaryHover: '#d9480f', primaryHoverBackground: '#d9480f', primaryHoverBorder: '#d9480f', primaryHoverUnderline: '#d9480f', primaryFocus: 'rgba(230, 119, 0, 0.5)', primaryInverse: '#ffffff' },
                                        'Orange': { primary: '#fd7e14', primaryBackground: '#fd7e14', primaryBorder: '#fd7e14', primaryUnderline: 'rgba(253, 126, 20, 0.5)', primaryHover: '#e8590c', primaryHoverBackground: '#e8590c', primaryHoverBorder: '#e8590c', primaryHoverUnderline: '#e8590c', primaryFocus: 'rgba(253, 126, 20, 0.5)', primaryInverse: '#ffffff' },
                                        'Sand': { primary: '#d9480f', primaryBackground: '#d9480f', primaryBorder: '#d9480f', primaryUnderline: 'rgba(217, 72, 15, 0.5)', primaryHover: '#c07000', primaryHoverBackground: '#c07000', primaryHoverBorder: '#c07000', primaryHoverUnderline: '#c07000', primaryFocus: 'rgba(217, 72, 15, 0.5)', primaryInverse: '#ffffff' },
                                        'Grey': { primary: '#868e96', primaryBackground: '#868e96', primaryBorder: '#868e96', primaryUnderline: 'rgba(134, 142, 150, 0.5)', primaryHover: '#748094', primaryHoverBackground: '#748094', primaryHoverBorder: '#748094', primaryHoverUnderline: '#748094', primaryFocus: 'rgba(134, 142, 150, 0.5)', primaryInverse: '#ffffff' },
                                        'Zinc': { primary: '#6c757d', primaryBackground: '#6c757d', primaryBorder: '#6c757d', primaryUnderline: 'rgba(108, 117, 125, 0.5)', primaryHover: '#5c636a', primaryHoverBackground: '#5c636a', primaryHoverBorder: '#5c636a', primaryHoverUnderline: '#5c636a', primaryFocus: 'rgba(108, 117, 125, 0.5)', primaryInverse: '#ffffff' },
                                        'Slate': { primary: '#495057', primaryBackground: '#495057', primaryBorder: '#495057', primaryUnderline: 'rgba(73, 80, 87, 0.5)', primaryHover: '#343a40', primaryHoverBackground: '#343a40', primaryHoverBorder: '#343a40', primaryHoverUnderline: '#343a40', primaryFocus: 'rgba(73, 80, 87, 0.5)', primaryInverse: '#ffffff' },
                                    };
                                    const theme = colorThemes[savedColor];
                                    if (theme) {
                                        document.documentElement.style.setProperty('--pico-primary', theme.primary);
                                        document.documentElement.style.setProperty('--pico-primary-background', theme.primaryBackground);
                                        document.documentElement.style.setProperty('--pico-primary-border', theme.primaryBorder);
                                        document.documentElement.style.setProperty('--pico-primary-underline', theme.primaryUnderline);
                                        document.documentElement.style.setProperty('--pico-primary-hover', theme.primaryHover);
                                        document.documentElement.style.setProperty('--pico-primary-hover-background', theme.primaryHoverBackground);
                                        document.documentElement.style.setProperty('--pico-primary-hover-border', theme.primaryHoverBorder);
                                        document.documentElement.style.setProperty('--pico-primary-hover-underline', theme.primaryHoverUnderline);
                                        document.documentElement.style.setProperty('--pico-primary-focus', theme.primaryFocus);
                                        document.documentElement.style.setProperty('--pico-primary-inverse', theme.primaryInverse);
                                    }
                                }
                            } catch (e) {
                                console.error('Failed to apply color theme:', e);
                            }
                        })();
                    `
                }} />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}