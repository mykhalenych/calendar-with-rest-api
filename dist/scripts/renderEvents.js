import { getItem, setItem, check, } from './storage.js'


export const renderEvents = () => {
    const events = getItem('eventsList') || [];
    console.log(events)
    let arrElemForTime = [];
    let arrElemRender = [];
    events.map(eventFromForm => {
        let TimeNow = new Date(`${eventFromForm.startDateEvent}`);
        let TimeEnd = new Date(`${eventFromForm.inputEndDate}`);
        let ChildSelector = `${TimeNow.getFullYear()+'-'}${TimeNow.getMonth()+1+'-'}${check(TimeNow.getDate())}`;
        let bgColor = eventFromForm.inputColor;
        let getHours = TimeNow.getHours();

        if (getHours < 10) {
            getHours = `0${TimeNow.getHours()}`;
        };


        let parentSelector = document.querySelector(`[id='${getHours}']`);
        if (parentSelector === null) return;

        let sectionElem = parentSelector.querySelector(`[id='${ChildSelector}']`);
        if (sectionElem === null) {
            return;
        };

        let hours = TimeNow.getHours();
        let height = (TimeEnd.getHours() - hours) * 60;

        let startTime = `${check(new Date(eventFromForm.startDateEvent).getHours())+':'+check(new Date(eventFromForm.startDateEvent).getMinutes())}`;

        let endTime = `${check(new Date(eventFromForm.inputEndDate).getHours())+':'+check(new Date(eventFromForm.inputEndDate).getMinutes())}`;

        let eventElem = `<div id='${eventFromForm.id}' 
                           class="event" 
                           data-id-number='${eventFromForm.id}'
                           data-time-ivent='${hours}'
                           data-id-parent='${ChildSelector}'
                           style="
                           height:${height}px; top:${(hours * 60)+163}px; background-color: ${bgColor};">
                               <div class="event__name" data-id-number='${eventFromForm.id}'>
                                   ${eventFromForm.name}
                               </div>
                               <div class="event__time" data-id-number='${eventFromForm.id}'>
                                   ${startTime} - ${endTime}
                               </div>
                               <div class="event__description" data-id-number='${eventFromForm.id}'>
                                   ${eventFromForm.inputDescription}
                               </div>
                       </div>`
        arrElemForTime.push(sectionElem);
        arrElemRender.push(eventElem);
    });
    let value = 0;
    const sectionElemRender = () => {
        if (!arrElemRender[value]) {
            return
        }
        arrElemForTime[value].innerHTML = arrElemRender[value];
        value++

    };
    let interval = setInterval(sectionElemRender, 100);
    setTimeout(() => { clearInterval(interval) }, 5000);
}

renderEvents()