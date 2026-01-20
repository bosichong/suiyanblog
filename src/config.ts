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
    "POSTS_PER_PAGE": 16,
    // 博客标签
    "BLOG_TYPED": [
        "积硅步以致千里",
        "积怠惰以致深渊",
        "只比你努力一点的人",
        "其实已经甩你很远了！"
    ],
    // 元描述，用于搜索引擎优化
    "META_DESCRIPTION": "记录并分享个人学习编程的过程和笔记，记录一些平淡的日常。",
    // 元关键词，用于搜索引擎优化
    "META_KEYWORDS": "Python,JavaScript,程序员,Godot,编程,技术博客,学习笔记,碎言",
    // 头像图片路径
    "PROFILE_IMAGE": "assets/images/avatar.png",

    'menuItems' : [
        {name:'归档',href:'/Archives'},
        {name:'标签',href:'/Tags'},
        {name:'搜索',href:'/Search'},
        {name:'友链',href:'/Friends'},
        {name:'关于',href:'/blog/1'},
    ],

        // 友链页面标题
    "FRIENDS_PAGE_TITLE": "友情链接",
    // 友链页面描述
    "FRIENDS_PAGE_DESCRIPTION": "一部分是我自己喜欢的博客，一部分是友情链接。申请友情链接，请在底部评论区留言。",
    // 博客聚合标题
    "BLOG_AGGREGATION_TITLE": "博客聚合",
    // 博客聚合描述
    "BLOG_AGGREGATION_DESCRIPTION": "这里是一些优秀的博客聚合平台，可以发现更多有趣的独立博客。",
    "links": [
        {
            "site_name": "Obaby",
            "site_url": "https://oba.by/",
            "site_description": "黑客程序媛 / 逆向工程师 / 人工智能学徒 / 用爱发电的独立开发者",
            "site_avatar": "https://oba.by/wp-content/uploads/2025/05/WechatIMG1530.jpg"
        },
        {
            "site_name": "秋风于渭水",
            "site_url": "https://www.tjsky.net/",
            "site_description": "秋风于渭水，别看名字整得挺文艺范儿，其实本质就是个 佛系码农（伪）的小窝。",
            "site_avatar": "https://www.tjsky.net/wp-content/uploads/2024/02/logo.png"
        },
        {
            "site_name": "八对星星",
            "site_url": "https://8dui.com",
            "site_description": "极目星视穹苍无界•足履行者大地有疆",
            "site_avatar": "https://cf.8dui.com/logo.webp"
        },
        {
            "site_name": "二丫讲梵",
            "site_url": "https://wiki.eryajf.net/",
            "site_description": "💻学习📝记录🔗分享",
            "site_avatar": "https://wiki.eryajf.net/img/logo.png"
        },
        {
            "site_name": "小林笔记",
            "site_url": "https://m.senlinm.cn",
            "site_description": "轻生活，秒上签",
            "site_avatar": "https://senlinm.s3.us-east-005.backblazeb2.com/01.png"
        },
        {
            "site_name": "zhangpingcloud",
            "site_url": "https://www.zhangpingcloud.tech/",
            "site_description": "编程爱好者，帅哥一个。",
            "site_avatar": "http://www.suiyan.cc/assets/images/user_circle.png"
        },
        {
            "site_name": "特立独行的异类",
            "site_url": "https://www.demochen.com",
            "site_description": "一张肆无忌惮的脸，一颗桀骜不驯的心。",
            "site_avatar": "https://www.demochen.com/images/avatar.png"
        },
        {
            "site_name": "八咫乌",
            "site_url": "https://www.vergilisme.com/",
            "site_description": "思君如满月，夜夜减清辉",
            "site_avatar": "https://www.vergilisme.com/usr/themes/Lumieres/fonts/logo_vertical.svg"
        },
        {
            "site_name": "ScarSu - 终身成长,前端技术,信息源",
            "site_url": "https://www.scarsu.com",
            "site_description": "96女性程序员，以终身成长为人生意义，热爱前端技术，喜欢读各种书，关注效率提升、自我管理、心智成长、认知提升、极简生活。",
            "site_avatar": "https://scarsu.oss-cn-shanghai.aliyuncs.com/picgo20201012144739.jpg"
        },
        {
            "site_name": "BORBER",
            "site_url": "https://blog.borber.top/",
            "site_description": "跌宕歌词 纵横书卷 不与遣年华",
            "site_avatar": "https://cdn.jsdelivr.net/gh/Borber/PublicPic1/headImg/head.png"
        },
        {
            "site_name": "图灵技术域",
            "site_url": "http://www.omegaxyz.com/",
            "site_description": "徐奕的专栏-机器学习、软件工程、计算机大佬。",
            "site_avatar": "https://www.omegaxyz.com/wp-content/uploads/2020/01/AI-GIF.gif"
        },
        {
            "site_name": "碎言",
            "site_url": "https://www.suiyan.cc",
            "site_description": "记录并分享个人学习编程的过程和笔记，记录一些平淡的日常。",
            "site_avatar": "https://www.suiyan.cc/assets/images/avatar.jpg"
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
            "site_name": "个站商店",
            "site_url": "https://storeweb.cn/",
            "site_description": "一个精致的，带社交元素的个人网站发布平台，博客收录网站"
        }
    ]
};

export default config;