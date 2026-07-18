// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

// 博客基本信息
export const SITE_TITLE = '碎言';
export const SITE_TITLE_EN = 'SuiYan';
export const SITE_DESCRIPTION = '几时归去，作个闲人。对一张琴，一壶酒，一溪云。';
export const SITE_DESCRIPTION_EN = 'You see see you , This one day day di.';
export const SITE_AUTHOR = 'J.sky';
export const ABOUT_ME = SITE_DESCRIPTION;
export const META_DESCRIPTION = SITE_DESCRIPTION;
export const META_KEYWORDS = 'Python,JavaScript,程序员,Godot,编程,技术博客,学习笔记,碎言,哲学,人生,成长';
export const PROFILE_IMAGE = 'assets/images/avatar.png';
export const POSTS_PER_PAGE = 25;
export const HOME_POSTS_COUNT = 16;

// 页面标题和描述
export const FRIENDS_PAGE_TITLE = 'Links';
export const FRIENDS_PAGE_DESCRIPTION = '这里存放了我常去的一些独立博客的链接以及这些博客的最新RSS文章(如果你不希望自己的博客和文章在这里展示，请联系我删除)，这里不是友情链接展示，也不是邻居的的列表，就我个人而言，这些博客都是我喜欢的、能让我思考、我认为对我有价值的博客，欢迎访问。';
export const BLOG_AGGREGATION_TITLE = '博客聚合';
export const BLOG_AGGREGATION_DESCRIPTION = '一些优秀的博客聚合平台，可以发现更多有趣的独立博客。';
export const PROJECTS_PAGE_TITLE = 'Projects';
export const PROJECTS_PAGE_DESCRIPTION = '这里收录了我的一些开源项目，涵盖 Python、JavaScript、Godot 等不同技术栈。';

// 导航菜单项
export const MENU_ITEMS = [
  { name: 'Home', href: '/', icon: 'home' },
  // { name: '归档', href: '/archive', icon: 'archive' },
  // { name: '搜索', href: '/search', icon: 'magnify' },
  // { name: '标签', href: '/tags', icon: 'tag' },
  { name: 'Links', href: '/links', icon: 'link-variant' },
  { name: 'Projects', href: '/projects', icon: 'folder-open' },
  { name: 'About', href: '/about', icon: 'information-outline' },
];

// 链接
export const FRIENDS_LINKS = [

    {
    site_name: '风·墨',
    site_url: 'https://Vind.ink',
    site_description: '风舞弦，墨凝影。',
    site_avatar: 'https://Vind.ink/icon.png',
    is_active: true,
    rss:'https://Vind.ink/feed/',
  },

  {
    site_name: 'liWanr',
    site_url: 'https://liwanr.com',
    site_description: 'Every nobody is somebody.',
    site_avatar: 'https://liwanr.com/assets/avatar.png',
    is_active: true,
    rss:'https://liwanr.com/rss.xml',
  },

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
    site_name: '好站网',
    site_url: 'https://haozhan.wang/',
    site_description: '- HaoZhan.Wang | 发现好站，展示好站，收录优质中文独立网站'
  },
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
  },
  {
    site_name: '你来啦！',
    site_url: 'https://nilai.la/',
    site_description: '博客站长聚合平台 · 在地图上发现每一个独立博客'
  }
];

// 开源项目
export const PROJECTS = [
  {
    name: 'PrimarySchoolMathematics',
    description: '孩子上小学一年级了，加减乘除的口算就要开始练习了，利用Python开发了一套自动生成小学生口算题的小应用。支持设置各算数项和结果的取值范围、多步运算符号、生成求结果或求算数项的算式，最多支持3步算式题。',
    repoUrls: [
      { label: 'GitHub', url: 'https://github.com/bosichong/PrimarySchoolMathematics' },
      { label: 'Gitee', url: 'https://gitee.com/J_Sky/PrimarySchoolMathematics' },
    ],
    demoUrl: 'https://www.suiyan.cc/demo/psm',
    techStack: ['Python', 'JavaScript', 'Vue.js'],
    relatedPosts: ['83', '101', '20241107085752', '20201202155245'],
  },
  {
    name: 'BabyLog',
    description: '岁月如风，唯有此忆。一款用来记录孩子成长过程的日记应用，那年今天、全文搜索、身高体重图表展示，支持多个宝贝和多位家长共同记录。前后端分离架构，已维护12年。',
    repoUrls: [
      { label: 'GitHub', url: 'https://github.com/bosichong/BabyLog' },
      { label: 'Gitee', url: 'https://gitee.com/J_Sky/BabyLog' },
    ],
    techStack: ['JavaScript', 'Express.js', 'Next.js', 'SQLite', 'Vue.js'],
    relatedPosts: ['20250302060242'],
  },
  {
    name: 'suiyanblog',
    description: '基于 Astro 构建的个人博客系统，支持 Markdown 写作、RSS 订阅、标签分类、全文搜索、评论系统、多主题切换等功能。当前你所看到的网站就是这个项目的产物。',
    repoUrls: [
      { label: 'GitHub', url: 'https://github.com/bosichong/suiyanblog' },
      { label: 'Gitee', url: 'https://gitee.com/J_Sky/suiyan' },
    ],
    demoUrl: 'https://www.suiyan.cc',
    techStack: ['Astro', 'TypeScript', 'Tailwind CSS'],
    relatedPosts: ['20260312073320', '20241016221206', '20240729222957'],
  },
  {
    name: 'python_rss_subscription',
    description: '使用 Python 结合 feedparser 模块编写的终端私人 RSS 订阅程序。支持多源订阅、文章聚合展示、终端彩色输出，轻量简洁，适合命令行爱好者。',
    repoUrls: [
      { label: 'GitHub', url: 'https://github.com/bosichong/python_rss_subscription' },
    ],
    techStack: ['Python'],
    relatedPosts: ['20260107012506', '20230729151214', '20260113104932'],
  },
  {
    name: 'PyKeyBoardFairy',
    description: 'Python 编写的简单版键盘精灵，可以模拟键盘和鼠标操作，替代游戏中的卡键盘和鼠标宏。轻量易用，适合需要自动化按键操作的场景。',
    repoUrls: [
      { label: 'GitHub', url: 'https://github.com/bosichong/PyKeyBoardFairy' },
    ],
    techStack: ['Python'],
    relatedPosts: ['20210521155450', '20260113104932'],
  },
  {
    name: 'flash-thoughts',
    description: '随手记录灵感闪念，像备忘录一样简单，像日记一样有序。一个 OpenClaw 技能，支持语音输入，快速捕捉稍纵即逝的想法。',
    repoUrls: [
      { label: 'GitHub', url: 'https://github.com/bosichong/flash-thoughts' },
    ],
    techStack: ['Python'],
    relatedPosts: ['20260320113900'],
  },
  {
    name: 'edge-tts_tk_gui',
    description: '基于 Microsoft Edge TTS API 的图形化文字转语音工具，使用 Python 和 Tkinter 开发。支持多种语音和音色选择、批量文本转语音、自定义语速和音调等参数。',
    repoUrls: [
      { label: 'GitHub', url: 'https://github.com/bosichong/edge-tts_tk_gui' },
    ],
    techStack: ['Python'],
    relatedPosts: ['20260226080637'],
  },
  {
    name: 'Godot_tutorial',
    description: 'Godot 4 实用视频教程中文版的配套代码仓库，涵盖 GDScript、信号系统、碰撞检测、瓦片地图、补间动画等核心知识点，适合新手入门和进阶学习。',
    repoUrls: [
      { label: 'GitHub', url: 'https://github.com/bosichong/Godot_tutorial' },
      { label: 'Gitee', url: 'https://gitee.com/J_Sky/Godot_tutorial' },
    ],
    demoUrl: 'https://www.bilibili.com/video/BV1cmqvBZEW4',
    techStack: ['GDScript'],
    relatedPosts: ['20260118111831', '20251230122510', '20251114010459', '20251201013459', '20251203012735'],
  },
  {
    name: 'PyDirectoryComparison',
    description: '基于 Python、Tkinter 构建的可视化目录文件同步工具，支持双向同步、文件比较、预览模式、智能冲突检测等功能。适用于照片备份、文档同步、数据迁移等场景。',
    repoUrls: [
      { label: 'GitHub', url: 'https://github.com/bosichong/PyDirectoryComparison' },
      { label: 'Gitee', url: 'https://gitee.com/J_Sky/PyDirectoryComparison' },
    ],
    techStack: ['Python'],
    relatedPosts: ['49', '20260120142316'],
  },
  {
    name: 'pte_test',
    description: '化学元素周期表测试应用，基于 Vite + React + TypeScript 构建。包含全部118个化学元素，支持中英文双向测试，随机出题，实时反馈答题结果并统计正确率。',
    repoUrls: [
      { label: 'GitHub', url: 'https://github.com/bosichong/pte_test' },
    ],
    techStack: ['TypeScript', 'React', 'Vite'],
    relatedPosts: ['20260113104932'],
  },
  {
    name: 'jianceen',
    description: '基于 Next.js 构建的在线考试平台，支持创建、管理和参加各种类型的考试。提供题库 JSON 管理、答题时间控制、自动评分等功能，适合学习成果检测。',
    repoUrls: [
      { label: 'GitHub', url: 'https://github.com/bosichong/jianceen' },
      { label: 'Gitee', url: 'https://gitee.com/J_Sky/jianceen' },
    ],
    techStack: ['JavaScript', 'Next.js', 'Tailwind CSS'],
  },
  {
    name: 'Matrix',
    description: '黑客帝国矩阵字符雨 JavaScript 代码生成器，支持自定义字符、颜色、速度、密度等参数，生成炫酷的 Matrix 风格动画效果。',
    repoUrls: [
      { label: 'GitHub', url: 'https://github.com/bosichong/Matrix' },
    ],
    demoUrl: 'https://www.suiyan.cc/matrix/index.html',
    techStack: ['JavaScript', 'Vue.js'],
    relatedPosts: ['20230607211438', '20230612091630', '77'],
  },
  {
    name: 'Link-Validator',
    description: '检测对方网站友情链接页面是否添加了自己网站链接的 JavaScript 脚本。支持 Node.js 运行，自动爬取指定 URL 并验证友链是否存在。',
    repoUrls: [
      { label: 'GitHub', url: 'https://github.com/bosichong/Link-Validator' },
    ],
    techStack: ['JavaScript', 'Node.js'],
    relatedPosts: ['20230508090813'],
  },
  {
    name: 'JianCe',
    description: '简测 - 一个简单易用的在线答题应用，支持单选题、多选题、判断题、简答题四种题型，适合检验学习成果。可自定义题库，支持答题计时和错题回顾。',
    repoUrls: [
      { label: 'GitHub', url: 'https://github.com/bosichong/JianCe' },
      { label: 'Gitee', url: 'https://gitee.com/J_Sky/jiance' },
    ],
    demoUrl: 'https://suiyan.cc/demo/jiance/',
    techStack: ['Vue.js', 'Naive UI', 'Pinia'],
    relatedPosts: ['20230424194612'],
  },
  {
    name: 'MyDjangoBlog',
    description: '基于 Django 框架构建的个人博客系统，支持 Markdown 写作、文章分类、后台管理、分页等功能。曾运行于 17python.com，是 Django 学习入门的参考项目。',
    repoUrls: [
      { label: 'GitHub', url: 'https://github.com/bosichong/MyDjangoBlog' },
    ],
    techStack: ['Python', 'Django', 'SQLite'],
    relatedPosts: ['4'],
  },
  {
    name: 'WordTest',
    description: '基于 Django 构建的小学生英文单词背写检测考试系统。支持自定义题库、在线考试、成绩记录、错题分析等功能，帮助孩子掌握单词拼写。',
    repoUrls: [
      { label: 'GitHub', url: 'https://github.com/bosichong/WordTest' },
      { label: 'Gitee', url: 'https://gitee.com/J_Sky/WordTest' },
    ],
    techStack: ['Python', 'Django'],
    relatedPosts: ['103'],
  },
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
