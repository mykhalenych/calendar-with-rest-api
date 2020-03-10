import { renderEvents } from './renderEvents.js'
import { getMonday, setCurrent, renderCalendarDays, renderMainPart, renderHourColumns, getTodayIndex, markCurrentDay } from './renderCalendar.js'
import { getWeekDay } from './weekRender.js'
import { redline } from './redline.js'


getMonday();
setCurrent();
renderCalendarDays();
renderMainPart();
getWeekDay();
renderHourColumns();
getTodayIndex();
redline();
markCurrentDay();
renderEvents()



const onStorageChange = e => {
    if (e.key === 'eventsList') {
        renderEvents();
    }
};

window.addEventListener('storage', onStorageChange);