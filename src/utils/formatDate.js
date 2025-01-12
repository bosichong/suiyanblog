const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // getMonth() 返回的是从0开始的月份，所以要加1
    const day = date.getDate();
    return `${year}/${month}/${day}`;
};

export default formatDate;
