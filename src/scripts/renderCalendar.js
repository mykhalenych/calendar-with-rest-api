import { generateNumbersRange, check } from './storage.js'
import { renderEvents } from './renderEvents.js'
import { getWeekDay } from './weekRender.js'
import { checkRedline } from './redline.js'
const daysElem = document.querySelector('.week');
const nameDays = ['НД', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];

export let setDayInWeek = 0;
export let timeToday = new Date();

export const getMonday = () => {
    while (timeToday.getDay() !== 1) {
        timeToday.setDate(timeToday.getDate() - 1);
    };
}

const monthElem = document.querySelector('.head__row');
const months = ['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'];


export const setCurrent = () => {
    const allDaysFromWeek = document.querySelectorAll('.date-number');

    const dayFromallDaysFromWeek = [...allDaysFromWeek].splice(1);
    let checkOneMonthOnWeek = false;
    let value = 0;
    let setPreviosMonth = () => {
        let result = '';
        if (checkOneMonthOnWeek == true) {
            if ((new Date(timeToday).getMonth() + 1) > 11) {
                result = months[0];
                value = 1;
                let yearForBlockElem = timeToday.getFullYear() + +value;
            } else {
                result = months[new Date(timeToday).getMonth() + 1];
            };
        };
        return result;
    };

    let currentMonth = months[new Date(timeToday).getMonth()];
    monthElem.textContent = `${currentMonth} - ${setPreviosMonth()} ${timeToday.getFullYear() + +value}`;
    let monthForPopup = new Date(timeToday).getMonth() + 1;
}

const getDays = () => {
    let result = [];

    generateNumbersRange(0, 6)
        .map(sectionNumber => {
            let newDay = new Date(timeToday);
            newDay.setDate(newDay.getDate() + sectionNumber);

            result.push(
                `<div class="date">
                    <span class="week-day">${nameDays[new Date(newDay).getDay()]}</span>
                    <div 
                        class="date-number" 
                        data-block-number='${sectionNumber + setDayInWeek}'
                    >${new Date(newDay).getDate()}</div>
                </div>`);
        });
    return result.join('');
}

export const renderCalendarDays = () => {
    daysElem.innerHTML = getDays();
}

const mainPartOfCalendar = document.querySelector('.multicolumns');

export let time = 0;
export const createTime = () => {
    time++;
    return time;
}

export const getLineHour = () => {
    let i = 0;
    const blocksString = getWeekDay(i);

    return generateNumbersRange(1, 24)
        .map(lineNumber => `
                <div 
                id="${check(lineNumber-1)}"
                    class="multicolumns__line" 
                    data-line-number='${lineNumber + setDayInWeek}'
                    data-time-set='${lineNumber}'
                >${blocksString}</div>`).join('');
}


export const renderMainPart = () => {
    mainPartOfCalendar.innerHTML = getLineHour();
}

export const renderHourColumns = () => {
        const columnHourElem = document.querySelector('.column');


        const sectorsString = generateNumbersRange(1, 23)
            .map(columnHour => `
                    <div 
                        class="columnHour" 
                        data-column-number="${columnHour}">
                        ${(columnHour < 10) ? `0${columnHour}` : columnHour}:00
                        </div>`)
         .join('')

     columnHourElem.innerHTML = sectorsString;
 }

 export let todayIndex;
 export const getTodayIndex = () => {
 
     const dayOfweek = new Date().getDay() - 1;
 
     dayOfweek < 0 ? todayIndex = 6 : todayIndex = dayOfweek;
 }
 


 export const markCurrentDay = () => {
     const weekDaysElems = document.querySelectorAll('.date-number');
     let currentNumberDay;
     new Date().getDay() - 1 < 0 ? currentNumberDay = 6 : currentNumberDay = new Date().getDay() - 1;
     const findFirstDay = [...weekDaysElems].find(arg => arg.dataset.blockNumber == currentNumberDay);
     if (findFirstDay !== undefined) {
         findFirstDay.classList.add('active');
     };
 }

 const nextArrowElem = document.querySelector('.head-next');
 const prevArrowElem = document.querySelector('.head-prev');

 const diy = () => {
    renderCalendarDays();
    setCurrent();
    renderMainPart();
    renderEvents();
    renderHourColumns()
    markCurrentDay(); 
    checkRedline()
 }

 export const getNextWeek = () => {
     timeToday.setDate(timeToday.getDate() + 7);
     setDayInWeek += 7;
     diy()

 }

 export const getPrevWeek = () => {
     timeToday.setDate(timeToday.getDate() - 7);
     setDayInWeek -= 7;
     diy()
 }

 nextArrowElem.addEventListener('click', getNextWeek);
 prevArrowElem.addEventListener('click', getPrevWeek);

 const addButtonElem = document.querySelector('.head-today');

  export const getCurrentDay = () => {
     timeToday = new Date();
     getMonday();
     setDayInWeek = 0;
     diy()

 }

 addButtonElem.addEventListener('click', getCurrentDay);