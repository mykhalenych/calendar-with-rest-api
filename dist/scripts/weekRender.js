import { generateNumbersRange, check } from './storage.js'
import { createTime, timeToday } from './renderCalendar.js'


export const getWeekDay = () => {
    let dayToMain = document.querySelector('.date-number').innerHTML;
    let day = document.querySelector('.date__number');

    let result = [];

    const allDaysFromWeek = document.querySelectorAll('.date-number');
    const dayFromallDaysFromWeek = [...allDaysFromWeek].splice(1);
    const findFirstDay = dayFromallDaysFromWeek.find(arg => arg.textContent == 1);
    createTime();
    if (findFirstDay === undefined) {
        generateNumbersRange(1, 7)
            .map(sectionNumber => {
                result.push(
                    `
                    <div 
                        id="${new Date(timeToday).getFullYear()+'-'}${new Date(timeToday).getMonth() + 1+'-'}${check(dayToMain++)}"
                        class="multicolumns__field" 
                        date-id-number="${new Date(timeToday).getFullYear()+'-'}${new Date(timeToday).getMonth() + 1+'-'}${check(dayToMain)}"
                        "           
                    ></div>`
                );
            });
    } else {
        const firstDate = dayFromallDaysFromWeek.indexOf(findFirstDay) + 1;
        generateNumbersRange(1, firstDate)
            .map(sectionNumber => {
                result.push(
                    `
                <div 
                    id="${new Date(timeToday).getFullYear()+'-'}${new Date(timeToday).getMonth() + 1+'-'}${dayToMain++}"
                    class="multicolumns__field" 
                 
                ></div>`
                );
            });



        let ElemFromFirstDate = document.querySelectorAll('.date-number')[firstDate].textContent;
        let monthNum = new Date(timeToday).getMonth() + 2;
        if (new Date(timeToday).getMonth() + 2 >= 12) {
            monthNum = 1;
        };

        const nextYearForBlock = document.querySelector('.head__row').textContent.slice(-4);

        generateNumbersRange(1, 7 - firstDate)
            .map(sectionNumber => {
                let daysNum = ElemFromFirstDate;
                let monthsNum = monthNum;
                let yearNum = nextYearForBlock;
                result.push(
                    `
                <div 
                    id="${yearNum+'-'}${monthsNum+'-'}${check(daysNum++)}"
                    class="multicolumns__field" 
                  
                ></div>`
                );
            });
    };
    return result.join('');

};