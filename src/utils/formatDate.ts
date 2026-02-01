import dayjs from 'dayjs';

const formatDate = (dateString: string): string => {
    return dayjs(dateString).format('YYYY/MM/DD');
};

export default formatDate;