import { todayIndex } from './renderCalendar.js'

export const checkRedline = () => {
    const currentDay = document.querySelector('.active');
    const redline = document.querySelector('.redline ');
    if (currentDay) {
        redline.style.display = 'flex';
    } else {
        redline.style.display = 'none';
    };
}

export const redline = () => {
    const todayHour = new Date().getHours();
    const todayMinutes = new Date().getMinutes();
    let time = 60 * todayHour + todayMinutes
    const widthElem = document.querySelector('.multicolumns__field').offsetWidth;

    const redline = document.querySelector('.redline');
    redline.style.top = `${time + 163}px`;
    redline.style.left = `${widthElem * todayIndex + 60}px`;
    redline.style.width = `${widthElem}`
}