/**
 * 赞赏配置文件
 * 包含赞赏页面简介、赞赏码和赞赏历史数据
 */

export interface SponsorRecord {
    name: string;
    amount: string;
    date: string;
    message?: string;
}

const sponsorConfig = {
    // 赞赏页面标题
    title: "赞赏支持",

    // 赞赏页面简介
    description: `如果我的文章对你有帮助，或者你就是钱多得没地方花——欢迎请我喝杯咖啡，或者给我家那位"四脚吞金兽"续点口粮。

☕ 一杯咖啡 = 我代码写得飞起，bug 退散，头发还能再撑一阵
🐕 一份狗粮 = 我家狗子终于闭嘴了，我也能在半夜安静敲键盘，不用跟它对嚎

你的每一分打赏，都在阻止我转行去送外卖。大恩不言谢，祝你代码永无报错，摸鱼不被抓包！`,

    // 赞赏码图片
    sponsorCode: "https://www.suiyan.cc/assets/images/zs.jpg",

    // 赞赏历史记录
    records: [
        {
            name: "熬夜可乐熊",
            amount: "¥6.66",
            date: "2026-01-02",
            message: "新年快乐！"
        },
        {
            name: "密斯特Li",
            amount: "¥8.88",
            date: "2025-11-20",
            message: "坚持写博客不容易，支持一下"
        },
        {
            name: "yyf520",
            amount: "¥3.33",
            date: "2025-05-12",
            message: "加油"
        },
        {
            name: "匿名",
            amount: "¥18.88",
            date: "2025-01-05",
            message: "你的文章帮我解决了一个大问题，感谢！"
        },
        {
            name: "豆子",
            amount: "¥5.20",
            date: "2024-12-15",
            message: "感谢博主分享"
        },
        {
            name: "Zzxl",
            amount: "¥9.99",
            date: "2024-11-08",
            message: "啊哈，支持一下"
        }
    ] as SponsorRecord[]
};

export default sponsorConfig;