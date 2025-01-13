// 定义颜色数组
const colors = ["default", "primary", "secondary", "success", "warning", "danger"];

// 生成随机颜色的函数
const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
};

export default getRandomColor; // 导出函数本身
