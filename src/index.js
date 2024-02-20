import './pages/index.css';
import { initialCards } from './components/cards.js';
import { createCard, addCard, deleteCard, likeListener } from './components/card.js';
import { openModal, closeModal, imageClickListener, formElement, nameInput, jobInput } from './components/modal.js';

//Выбираем элементы для попапов и кнопок
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const editPopup = document.querySelector('.popup_type_edit');
export const newCardPopup = document.querySelector('.popup_type_new-card');
export const imagePopupElement = document.querySelector('.popup_type_image');
//Добавляем карты на страницу
initialCards.forEach(item => {
    const cardElement = createCard(item.name, item.link, deleteCard, likeListener, imageClickListener)
    addCard(cardElement);
});
//Вешаем обработчики кликов
editButton.addEventListener('click', function() {
    openModal(editPopup);
    const title = document.querySelector('.profile__title').textContent;
    const description = document.querySelector('.profile__description').textContent;
    nameInput.value = title;
    jobInput.value = description;
})

addButton.addEventListener('click', function() {
    openModal(newCardPopup);
})

editPopup.classList.add('popup_is-animated');
newCardPopup.classList.add('popup_is-animated');
imagePopupElement.classList.add('popup_is-animated');