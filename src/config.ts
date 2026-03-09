import { Config } from './types';

/**
 * 项目配置文件
 * 包含了项目的各种配置信息，如开发模式、博客名称、作者、描述等
 */
const config: Config = {
    // 博客名称
    "BLOG_NAME": "碎言",
    // 博客英文名称
    "BLOG_NAME_EN": "SuiYan",
    // 博客作者
    "BLOG_AUTHOR": "J.sky",
    // 博客英文描述
    "BLOG_DESCRIPTION_EN": "You see see you , This one day day di.",
    // 关于我简介
    "ABOUT_ME": "坚持深度阅读，持续写作输出，把固执与坚持，用在值得的事情上。",
    "POSTS_PER_PAGE": 25,
    // 元描述，用于搜索引擎优化
    "META_DESCRIPTION": "坚持深度阅读，持续写作输出，复盘技术实践。以终生学习对抗不确定性，把固执与坚持，All in 在值得的事情上。",
    // 元关键词，用于搜索引擎优化
    "META_KEYWORDS": "Python,JavaScript,程序员,Godot,编程,技术博客,学习笔记,碎言,哲学,人生,成长",
    // 头像图片路径
    "PROFILE_IMAGE": "assets/images/avatar.png",

    'menuItems' : [
        {name:'搜索',href:'/search'},
        {name:'标签',href:'/Tags'},
        {name:'链接',href:'/Links'},
        {name:'关于',href:'/About'},
    ],

        // 片语页面标题
    "THOUGHTS_PAGE_TITLE": "片语",
    // 片语页面描述
    "THOUGHTS_PAGE_DESCRIPTION": "碎言博客的片语，记录日常的短小想法和瞬间感悟。",
    // 友链页面标题
    "FRIENDS_PAGE_TITLE": "链接",
    // 友链页面描述
    "FRIENDS_PAGE_DESCRIPTION": "这里存放了我常去的一些独立博客的链接，这里不是友情链接展示，也不是邻居的的列表，就我个人而言，这些博客都是我喜欢的、能让我思考、我认为对我有价值的博客，欢迎访问。",
    // 博客聚合标题
    "BLOG_AGGREGATION_TITLE": "博客聚合",
    // 博客聚合描述
    "BLOG_AGGREGATION_DESCRIPTION": "一些优秀的博客聚合平台，可以发现更多有趣的独立博客。",
    "links": [

        {
            "site_name": "莫比乌斯",
            "site_url": "https://onojyun.com/",
            "site_description": "写作，一场自我悖驳的旅程。我写自己的生活、也写自己的讣告。",
            "site_avatar": "https://onojyun.com/wp-content/uploads/2024/03/a2d42-cropped-mobius_icon_black-edited.png",
            "is_active": true
        },
                {
            "site_name": "一派胡言",
            "site_url": "https://yipai.me/",
            "site_description": "一派胡言 – 如果你在纵容，就不要抱怨世道变坏。",
            "site_avatar": "#",
            "is_active": true
        },
                {
            "site_name": "CC的数字花园",
            "site_url": "https://cyrus19.cc/",
            "site_description": "CC的数字花园并不是传统意义上的博客，是我的精神在这个世界上的一片自留地。",
            "site_avatar": "#",
            "is_active": true
        },
                {
            "site_name": "孤斗",
            "site_url": "https://d-d.design/",
            "site_description": "该网站禁止鼠标右键...",
            "site_avatar": "#",
            "is_active": true
        },
                {
            "site_name": "白熊阿丸的小屋",
            "site_url": "https://blog.bxaw.name/",
            "site_description": "在这里可以看到一个真实的我，我会在这里书写我的一切",
            "site_avatar": "#",
            "is_active": true
        },
                {
            "site_name": "Owen的博客",
            "site_url": "https://www.owenyoung.com/",
            "site_description": "主要关注技术，读书，摘抄，杂谈，文章评论，工具分享，工作流，灵感，英文学习，注意力管理，深度工作等方向。",
            "site_avatar": "#",
            "is_active": true
        },
        {
            "site_name": "映屿",
            "site_url": "https://www.glowisle.me/",
            "site_description": "关于互联网、书籍、生活琐事以及那些一闪而过的念头。",
            "site_avatar": "#",
            "is_active": true
        },
                {
            "site_name": "素生",
            "site_url": "https://z.arlmy.me/",
            "site_description": "误读人生，化人生活",
            "site_avatar": "#",
            "is_active": true
        },
        {
            "site_name": "極客死亡計劃",
            "site_url": "https://www.geedea.pro/",
            "site_description": "这里只有真情流露和赤裸的思考。",
            "site_avatar": "https://r2.eltr.ac/geedeapro/header.avif",
            "is_active": true
        },
                {
            "site_name": "阮一峰的网络日志",
            "site_url": "https://www.ruanyifeng.com/blog/",
            "site_description": "这里记录每周值得分享的科技内容。",
            "site_avatar": "https://www.ruanyifeng.com/blog/images/person2_s.jpg",
            "is_active": true
        },
        {
            "site_name": "优世界",
            "site_url": "https://usj.cc/",
            "site_description": "喜欢折腾博客、制作主题、分享前端技术的独立开发者。",
            "site_avatar": "#",
            "is_active": true
        },
        {
            "site_name": "Obaby",
            "site_url": "https://zhongxiaojie.com/",
            "site_description": "黑客程序媛 / 逆向工程师 / 人工智能学徒 / 用爱发电的独立开发者",
            "site_avatar": "https://zhongxiaojie.com/wp-content/uploads/2025/05/WechatIMG1530.jpg",
            "is_active": true
        },
        {
            "site_name": "秋风于渭水",
            "site_url": "https://www.tjsky.net/",
            "site_description": "秋风于渭水，别看名字整得挺文艺范儿，其实本质就是个 佛系码农（伪）的小窝。",
            "site_avatar": "https://www.tjsky.net/wp-content/uploads/2024/02/logo.png",
            "is_active": true
        },
                {
            "site_name": "二丫讲梵",
            "site_url": "https://wiki.eryajf.net/",
            "site_description": "💻学习📝记录🔗分享",
            "site_avatar": "https://wiki.eryajf.net/img/logo.png",
            "is_active": true
        },
        {
            "site_name": "八对星星",
            "site_url": "https://8dui.com",
            "site_description": "极目星视穹苍无界•足履行者大地有疆",
            "site_avatar": "https://cf.8dui.com/logo.webp",
            "is_active": true
        },
        {
            "site_name": "特立独行的异类",
            "site_url": "https://www.demochen.com",
            "site_description": "一张肆无忌惮的脸，一颗桀骜不驯的心。",
            "site_avatar": "https://www.demochen.com/images/avatar.png",
            "is_active": true
        },
        {
            "site_name": "八咫乌",
            "site_url": "https://www.vergilisme.com/",
            "site_description": "思君如满月，夜夜减清辉",
            "site_avatar": "https://www.vergilisme.com/usr/themes/Lumieres/fonts/logo_vertical.svg",
            "is_active": true
        },
        {
            "site_name": "ScarSu",
            "site_url": "https://www.scarsu.com",
            "site_description": "96女性程序员，以终身成长为人生意义，热爱前端技术，喜欢读各种书，关注效率提升、自我管理、心智成长、认知提升、极简生活。",
            "site_avatar": "https://scarsu.oss-cn-shanghai.aliyuncs.com/picgo20201012144739.jpg",
            "is_active": true
        },
        {
            "site_name": "BORBER",
            "site_url": "https://blog.borber.top/",
            "site_description": "跌宕歌词 纵横书卷 不与遣年华",
            "site_avatar": "https://cdn.jsdelivr.net/gh/Borber/PublicPic1/headImg/head.png",
            "is_active": true
        },
        {
            "site_name": "图灵技术域",
            "site_url": "http://www.omegaxyz.com/",
            "site_description": "徐奕的专栏-机器学习、软件工程、计算机大佬。",
            "site_avatar": "https://www.omegaxyz.com/wp-content/uploads/2020/01/AI-GIF.gif",
            "is_active": true
        }
    ],
    "blogAggregations": [
        {
            "site_name": "十年之约",
            "site_url": "https://www.foreverblog.cn/",
            "site_description": "十年之约 · 一个人的寂寞，一群人的狂欢。"
        },
        {
            "site_name": "博友圈",
            "site_url": "https://www.boyouquan.com/",
            "site_description": "博客人的朋友圈，将一个个散落在各处的孤岛连接成一片广袤无垠的新大陆！"
        },
        {
            "site_name": "BlogFinder",
            "site_url": "https://bf.zzxworld.com/",
            "site_description": "聚合优秀的个人博客，发掘优质的个人博客文章和内容。"
        },
        {
            "site_name": "BlogsClub",
            "site_url": "https://www.blogsclub.org/apply.html?inviteCode=8f2cd654",
            "site_description": "致力于为每一位博主提供一个展示自我、互动交流的绝佳平台。"
        },
        {
            "site_name": "若梦博客",
            "site_url": "https://www.rmbk.cc/",
            "site_description": "每一个博客，都是精神的驿站。我们不同行，但彼此照亮。在此驻足，便积蓄前行的力量。"
        },
        {
            "site_name": "有个站",
            "site_url": "https://www.ygz.ink/",
            "site_description": "收录优质中文独立博客，探索网络世界的个性表达与深度思考"
        },
        {
            "site_name": "博客集",
            "site_url": "https://bloginc.cn",
            "site_description": "致力于收集优秀的中文独立博客。"
        },
                {
            "site_name": "友链展示站",
            "site_url": "https://peng.you/",
            "site_description": "发现优质博客与网站,友链展示站致力于为博客作者和网站运营者提供一个简洁、现代的友情链接展示平台"
        },
        {
            "site_name": "个站商店",
            "site_url": "https://storeweb.cn/",
            "site_description": "一个精致的，带社交元素的个人网站发布平台，博客收录网站"
        }
    ],

    "snsLinks": [
        {
            "name": "GitHub",
            "url": "https://github.com/bosichong/",
            "iconComponent": "GithubIcon"
        },
        {
            "name": "Email",
            "url": "mailto:285911@gmail.com",
            "iconComponent": "EmailIcon"
        },
        {
            "name": "Mastodon",
            "url": "https://mastodon.social/@J_sky",
            "iconComponent": "MastodonIcon"
        },
        {
            "name": "RSS",
            "url": "/feed.xml",
            "iconComponent": "RssIcon"
        }
    ]
};

export default config;