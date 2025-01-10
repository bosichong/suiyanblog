

const animateListItems =  () => {
    const listItems = document.querySelectorAll('.list_item');
    listItems.forEach((item, index) => {
        setTimeout(() => {
            item.classList.remove('hidden');
            item.classList.add('animate-fade-in');
        }, index * 300); // 每个元素间隔 300 毫秒显示
    });
}


export default animateListItems;
