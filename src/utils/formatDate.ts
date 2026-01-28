const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() 返回的是从0开始的月份，所以要加1
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
};

export default formatDate;