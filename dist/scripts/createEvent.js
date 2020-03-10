import { setItem } from './storage.js'
import { renderEvents } from './renderEvents.js'
import { createTask, getTasksList } from './gateaway.js';


const form = document.querySelector('.popup-form')

const onFormChange = () => {

    if (form.reportValidity()) {
        submit.disabled = false;
    }
}
form.addEventListener("input", onFormChange);


export const createObjFromForm = (e) => {
    e.preventDefault();
    let inputTitle = document.querySelector('#title');
    let inputStartDate = document.querySelector('#dataStart');
    let inputEndDate = document.querySelector('#dataEnd');
    let inputDescription = document.querySelector('#description');
    let inputColor = document.querySelector('#color');


    const newTasks = {
        name: inputTitle.value,
        startDateEvent: inputStartDate.value,
        inputEndDate: inputEndDate.value,
        inputDescription: inputDescription.value,
        inputColor: inputColor.value,
    };

    createTask(newTasks)
        .then(() => getTasksList())
        .then(newTasksList => {
            console.log(newTasksList)
            setItem('eventsList', [...newTasksList]);
            document.querySelector('.popup').classList.add('hide');
            renderEvents();
        })

}

//const submitBtn = document.querySelector('.submit')
form.addEventListener('submit', createObjFromForm)