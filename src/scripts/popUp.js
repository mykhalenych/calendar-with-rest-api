import { getItem, setItem } from './storage.js'
import { renderEvents } from './renderEvents.js'

const createEvent = document.querySelector('#create');
const popup = document.querySelector('.popup')

export const popUp = (event) => {

    document.querySelector('.popup').classList.remove('hide');

    document.onkeydown = function(event) {
        if (event.keyCode == 27) {
            close()
        };
    }





}

export const close = () => {
    document.querySelector('.popup').classList.add('hide');
    document.onkeydown = null;
}
createEvent.addEventListener('click', popUp);


const btnClose = document.querySelector('.close')
export const closePopUp = () => {
    document.querySelector('.popup').classList.add('hide');
    event.preventDefault();
}

btnClose.addEventListener('click', closePopUp);