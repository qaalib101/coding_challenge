
// return data in MM/DD/YYYY format
export function formatDate(date: Date) {
    date = new Date(date);
    const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    return `${month}/${day}/${date.getFullYear()}`;
}