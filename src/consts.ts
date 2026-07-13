// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

// 博客基本信息
export const SITE_TITLE = '碎言';
export const SITE_TITLE_EN = 'SuiYan';
export const SITE_DESCRIPTION = '技术文章留给搜索和大模型，余下的留给懂的人——这里，残留着一个普通人‘你杠就是你对’的碎言。';
export const SITE_DESCRIPTION_EN = 'You see see you , This one day day di.';
export const SITE_AUTHOR = 'J.sky';
export const ABOUT_ME = '技术文章留给搜索和大模型，余下的留给懂的人——这里，残留着一个普通人‘你杠就是你对’的碎言。';
export const META_DESCRIPTION = '技术文章留给搜索和大模型，余下的留给懂的人——这里，残留着一个普通人‘你杠就是你对’的碎言。';
export const META_KEYWORDS = 'Python,JavaScript,程序员,Godot,编程,技术博客,学习笔记,碎言,哲学,人生,成长';
export const PROFILE_IMAGE = 'assets/images/avatar.png';
export const POSTS_PER_PAGE = 25;
export const HOME_POSTS_COUNT = 16;

// 页面标题和描述
export const THOUGHTS_PAGE_TITLE = '片语';
export const THOUGHTS_PAGE_DESCRIPTION = '碎言博客的片语，记录日常的短小想法和瞬间感悟。';
export const FRIENDS_PAGE_TITLE = 'Links';
export const FRIENDS_PAGE_DESCRIPTION = '这里存放了我常去的一些独立博客的链接以及这些博客的最新RSS文章(如果你不希望自己的博客和文章在这里展示，请联系我删除)，这里不是友情链接展示，也不是邻居的的列表，就我个人而言，这些博客都是我喜欢的、能让我思考、我认为对我有价值的博客，欢迎访问。';
export const BLOG_AGGREGATION_TITLE = '博客聚合';
export const BLOG_AGGREGATION_DESCRIPTION = '一些优秀的博客聚合平台，可以发现更多有趣的独立博客。';

// 导航菜单项
export const MENU_ITEMS = [
  { name: 'Home', href: '/', icon: 'home' },
  // { name: '归档', href: '/archive', icon: 'archive' },
  // { name: '搜索', href: '/search', icon: 'magnify' },
  // { name: '标签', href: '/tags', icon: 'tag' },
  { name: 'Links', href: '/links', icon: 'link-variant' },
  { name: 'About', href: '/about', icon: 'information-outline' },
];

// 友情链接
export const FRIENDS_LINKS = [

{
    site_name: '莫比乌斯',
    site_url: 'https://mobius.blog/',
    site_description: '写作，一场自我悖驳的旅程。我写自己的生活、也写自己的讣告。',
    site_avatar: 'https://onojyun.com/wp-content/uploads/2024/03/a2d42-cropped-mobius_icon_black-edited.png',
    is_active: true,
    rss:'https://mobius.blog/feed/',
  },

  {
    site_name: '太隐',
    site_url: 'https://wangyurui.com/',
    site_description: '一个人的思想发育史就是他的阅读史',
    site_avatar: 'https://i.typlog.com/wangyr45/8227649757_5131645.png?x-oss-process=style/ss',
    is_active: true,
    rss:'https://www.wangyurui.top/feed.xml',
  },

  {
    site_name: '水拍石',
    site_url: 'https://www.leitao.cn/',
    site_description: '追寻更好的自己',
    site_avatar: 'https://www.leitao.cn/wp-content/uploads/2026/06/cropped-水拍石logo-y-S-180x180.webp',
    is_active: true,
    rss:'https://www.leitao.cn/feed',
  },

  {
    site_name: '素生',
    site_url: 'https://z.arlmy.me',
    site_description: '误读人生，化人生活',
    site_avatar: 'https://z.arlmy.me/apple-touch-icon.png',
    is_active: true,
    rss:'https://z.arlmy.me/atom.xml',
  },

  {
    site_name: '阮一峰的网络日志',
    site_url: 'https://www.ruanyifeng.com/blog',
    site_description: '这里记录每周值得分享的科技内容。',
    site_avatar: 'https://www.ruanyifeng.com/blog/images/person2_s.jpg',
    is_active: true,
    rss:'https://www.ruanyifeng.com/blog/atom.xml',
  },

{
    site_name: '优世界',
    site_url: 'https://usj.cc',
    site_description: '喜欢折腾博客、制作主题、分享前端技术的独立开发者。',
    site_avatar: 'https://usj.cc/image/avatar/tx7.jpg',
    is_active: true,
    rss:'https://usj.cc/rss.xml',
  },

{
    site_name: '愆伏',
    site_url: 'https://www.tortorse.com',
    site_description: '互联网杂谈，关于设计、技术与思考。',
    site_avatar: '#',
    is_active: true,
    rss:'https://www.tortorse.com/atom.xml',
  },

  {
    site_name: '二丫讲梵',
    site_url: 'https://wiki.eryajf.net',
    site_description: '💻学习📝记录🔗分享',
    site_avatar: 'https://wiki.eryajf.net/img/logo.png',
    is_active: true,
    rss:'https://wiki.eryajf.net/rss.xml',
  },

{
    site_name: '枫林灯语',
    site_url: 'https://blog.mfwt.top',
    site_description: '深山踏红叶，耳畔闻鹿鸣',
    site_avatar: 'https://blog.mfwt.top/avatar.jpg',
    is_active: true,
    rss:'https://blog.mfwt.top/index.php/feed/',
  },

  {
    site_name: 'Obaby',
    site_url: 'https://zhongxiaojie.com',
    site_description: '黑客程序媛 / 逆向工程师 / 人工智能学徒 / 用爱发电的独立开发者',
    site_avatar: 'https://gg.lang.bi/avatar/d6ebc088df916bcc9e8b94a09f9b0f604e57be54b04bd520c6db2492740fc563?s=64&d=initials&r=pg&initials=ob',
    is_active: true,
    rss:'https://zhongxiaojie.com/feed/',
  },

{
    site_name: 'CC的数字花园',
    site_url: 'https://cyrus19.cc',
    site_description: 'CC的数字花园并不是传统意义上的博客，是我的精神在这个世界上的一片自留地。',
    site_avatar: 'https://i0.wp.com/cyrus19.cc/wp-content/uploads/2024/08/cropped-BlackBackgroundLogo.png?fit=180%2C180&ssl=1',
    is_active: true,
    rss:'https://cyrus19.cc/feed',
  },

  {
    site_name: '孤斗',
    site_url: 'https://d-d.design',
    site_description: '很酷的博客，分享设计、前端、生活、读书、思考等内容。',
    site_avatar: '#',
    is_active: true,
    rss:'https://d-d.design/wp/feed/',
  },

{
    site_name: '秋风于渭水',
    site_url: 'https://www.tjsky.net',
    site_description: '秋风于渭水，别看名字整得挺文艺范儿，其实本质就是个 佛系码农（伪）的小窝。',
    site_avatar: 'https://www.tjsky.net/wp-content/uploads/2024/02/logo.png',
    is_active: true,
    rss:'https://www.tjsky.net/feed',
  },

{
    site_name: '八咫乌',
    site_url: 'https://www.vergilisme.com',
    site_description: '思君如满月，夜夜减清辉',
    site_avatar: 'https://www.vergilisme.com/usr/themes/Lumieres/fonts/logo_vertical.svg',
    is_active: true,
    rss:'https://www.vergilisme.com/index.php/feed/',
  },

{
    site_name: '老T博客',
    site_url: 'https://lawtee.com',
    site_description: '法律、科技和生活',
    site_avatar: 'https://lawtee.com/links/avatar.jpg',
    is_active: true,
    rss:'https://lawtee.com/index.xml',
  },

{
    site_name: '一派胡言',
    site_url: 'https://yipai.me',
    site_description: '一派胡言 – 如果你在纵容，就不要抱怨世道变坏。',
    site_avatar: 'https://yipai.me/wp-content/uploads/2024/10/cropped-yipai-180x180.png',
    is_active: true,
    rss:'https://yipai.me/feed',
  },

  {
    site_name: '理论派',
    site_url: 'https://sliun.com/',
    site_description: '意识不止算法，心灵自有归途。',
    site_avatar: 'https://bear-images.sfo2.cdn.digitaloceanspaces.com/lilun/vue-color-avatar.webp',
    is_active: true,
    rss:'https://sliun.com/feed/',
  },

  {
    site_name: '揆机',
    site_url: 'https://pathos.page/',
    site_description: '一个法哲学研究者的博客，记录了他的学术之路和社会观察',
    site_avatar: 'https://pathos.page/images/icons/apple-touch-icon.png',
    is_active: true,
    rss:'https://pathos.page/feed.xml',
  },

  {
    site_name: '白熊阿丸的小屋',
    site_url: 'https://blog.bxaw.name',
    site_description: '在这里可以看到一个真实的我，我会在这里书写我的一切',
    site_avatar: '#',
    is_active: true,
    rss:'https://blog.bxaw.name/feed/',
  },

  {
    site_name: 'Yihui Xie',
    site_url: 'https://yihui.org/cn',
    site_description: '一些书信。一些文章。',
    site_avatar: 'https://yihui.org/images/logo.png',
    is_active: true,
    rss:'https://yihui.org/cn/index.xml',
  },

{
    site_name: 'Owen的博客',
    site_url: 'https://www.owenyoung.com',
    site_description: '主要关注技术，读书，摘抄，杂谈，文章评论，工具分享，工作流，灵感，英文学习，注意力管理，深度工作等方向。',
    site_avatar: 'https://www.owenyoung.com/apple-touch-icon.png?v=202606181025',
    is_active: true,
    rss:'https://www.owenyoung.com/feed',
  },

  {
    site_name: '映屿',
    site_url: 'https://www.glowisle.me',
    site_description: '关于互联网、书籍、生活琐事以及那些一闪而过的念头。',
    site_avatar: '#',
    is_active: true,
    rss:'https://blog.verdant.ee/rss/',
  },

{
    site_name: '特立独行的异类',
    site_url: 'https://www.demochen.com',
    site_description: '一张肆无忌惮的脸，一颗桀骜不驯的心。',
    site_avatar: 'https://www.demochen.com/images/avatar.png',
    is_active: true,
    rss:'https://demochen.com/atom.xml',
  },

{
    site_name: 'ScarSu',
    site_url: 'https://www.scarsu.com',
    site_description: '96女性程序员，以终身成长为人生意义，热爱前端技术，喜欢读各种书，关注效率提升、自我管理、心智成长、认知提升、极简生活。',
    site_avatar: 'https://scarsu.oss-cn-shanghai.aliyuncs.com/picgo20201012144739.jpg',
    is_active: true,
    rss:'https://scarsu.com/rss',
  },

{
    site_name: 'BORBER',
    site_url: 'https://blog.borber.top',
    site_description: '跌宕歌词 纵横书卷 不与遣年华',
    site_avatar: 'https://cdn.jsdelivr.net/gh/Borber/PublicPic1/headImg/head.png',
    is_active: true,
    rss:'#',
  },

{
    site_name: '图灵技术域',
    site_url: 'http://www.omegaxyz.com',
    site_description: '徐奕的专栏-机器学习、软件工程、计算机大佬。',
    site_avatar: 'https://cdn.omegaxyz.com/2020/02/omegaxyz-logo-100.png',
    is_active: true,
    rss:'#',
  }

];

// 博客聚合平台
export const BLOG_AGGREGATIONS = [
  {
    site_name: '十年之约',
    site_url: 'https://www.foreverblog.cn',
    site_description: '十年之约 · 一个人的寂寞，一群人的狂欢。'
  },
  {
    site_name: '博友圈',
    site_url: 'https://www.boyouquan.com',
    site_description: '博客人的朋友圈，将一个个散落在各处的孤岛连接成一片广袤无垠的新大陆！'
  },
  {
    site_name: 'BlogFinder',
    site_url: 'https://bf.zzxworld.com',
    site_description: '聚合优秀的个人博客，发掘优质的个人博客文章和内容。'
  },
  {
    site_name: 'BlogsClub',
    site_url: 'https://www.blogsclub.org/apply.html?inviteCode=8f2cd654',
    site_description: '致力于为每一位博主提供一个展示自我、互动交流的绝佳平台。'
  },
  {
    site_name: '若梦博客',
    site_url: 'https://www.rmbk.cc',
    site_description: '每一个博客，都是精神的驿站。我们不同行，但彼此照亮。在此驻足，便积蓄前行的力量。'
  },
  {
    site_name: '有个站',
    site_url: 'https://www.ygz.ink',
    site_description: '收录优质中文独立博客，探索网络世界的个性表达与深度思考'
  },
  {
    site_name: '博客大联盟',
    site_url: 'https://bo.ke/',
    site_description: '发现值得反复阅读的独立博客'
  }
];

// 社交媒体链接
export const SNS_LINKS = [
  {
    name: 'GitHub',
    url: 'https://github.com/bosichong',
    icon: 'mdi:github'
  },
  {
    name: 'Email',
    url: 'mailto:285911@gmail.com',
    icon: 'mdi:email'
  },
  {
    name: 'Mastodon',
    url: 'https://mastodon.social/@J_sky',
    icon: 'mdi:mastodon'
  },
  {
    name: 'RSS',
    url: '/feed.xml',
    icon: 'simple-icons:rss'
  }
];

// AI 标识配置
export const AI_LABEL_CONFIG = {
  enabled: true,
  label: 'AI Generated',
  showOnPosts: true
};

// 评论系统配置
export const COMMENTS_CONFIG = {
  giscus: {
    repo: 'bosichong/suiyanblog',
    repoId: 'R_kgDONjg2qw',
    category: 'Announcements',
    categoryId: 'DIC_kwDONjg2q84ClnrC',
    mapping: 'pathname',
    lang: 'zh-CN',
  },
  twikoo: {
    envId: 'https://twikoo.suiyan.cc/.netlify/functions/twikoo',
  },
};
