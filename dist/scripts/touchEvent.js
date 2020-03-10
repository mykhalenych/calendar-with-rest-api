import { popUp } from './popUp.js'
import { getItem, setItem, updateStorage } from './storage.js'
import { renderEvents } from './renderEvents.js'
import { getTasksList, updateTask, deleteTask } from './gateaway.js';

export const touchEvent = event => {
    const isField = event.target.classList.contains('event');
    if (isField) {
        document.querySelector('.multicolumns').addEventListener('click', popUp);
    }

    const events = getItem('eventsList') || [];

    const isEventClose = event.target.closest('.event');

    let eventId = isEventClose.dataset.idNumber;

    const popUpTitle = document.querySelector('.popup-form__title');
    const popUpDataStart = document.querySelector('.main-dataStart');
    const popUpDataEnd = document.querySelector('.main-dataEnd');
    const popUpDescription = document.querySelector('.popup-form__description');
    const popUpColor = document.querySelector('.popup-form__color');

    for (let i = 0; i < events.length; i++) {
        if (eventId == events[i].id) {
            popUpTitle.value = events[i].name;
            popUpDataStart.value = events[i].startDateEvent
            popUpDataEnd.value = events[i].inputEndDate
            popUpDescription.value = events[i].inputDescription;
            popUpColor.value = events[i].inputColor;

            const parentId = event.target.parentElement.id;
            const changedItem = events.find(item => item.id == parentId)

            if (changedItem) {

                updateTask(changedItem)
                    .then(() => getTasksList())
                    .then((value) => {
                        updateStorage(value);
                        renderEvents();
                    })
            }

            function deleteSelectedEvent(event) {
                event.preventDefault();

                deleteTask(eventId);
                updateStorage()
                renderEvents();
                document.querySelector('.popup').classList.add('hide')

            }

            const deleteButton = document.querySelector('#delete');
            deleteButton.addEventListener('click', deleteSelectedEvent);
        }
    }
}



document.querySelector('.multicolumns').addEventListener('click', touchEvent, true)