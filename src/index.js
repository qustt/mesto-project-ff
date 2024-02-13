import './pages/index.css';
import {initialCards} from './cards.js';


// Выбираем шаблон карточки и контейнер для вставки
const cardTemplate = document.querySelector('#card-template').content;
const cardList = document.querySelector('.places__list');

//Создаем функцию createCard
function createCard(name, link, deleteCard) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    cardImage.src = link;
    cardImage.alt = name;
    cardTitle.textContent = name;
    deleteButton.addEventListener('click', deleteCard);
    return(cardElement);
}

//Создаем функцию addCard
function addCard(cardElement) {
  cardList.append(cardElement);
}

//Создаем функцию удаления карты
function deleteCard(evt) {
    const card = evt.target.closest('.card');
    card.remove();
}

initialCards.forEach(item => {
    const cardElement = createCard(item.name, item.link, deleteCard)
    addCard(cardElement);
});


//Модальные окна


//Выбираем элементы
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const editPopup = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');

//Вешаем обработчики кликов
editButton.addEventListener('click', function() {
    openModal(editPopup);
})

addButton.addEventListener('click', function() {
    openModal(newCardPopup);
})


//Функция открытия окна
function openModal (popup) {
    popup.classList.add('popup_is-opened');
    const closeButton = popup.querySelector('.popup__close');
    closeButton.addEventListener('click', function (evt) {
        closeModal(popup);
    });
    document.addEventListener('keydown', escapeHandler);
    document.addEventListener('click', clickHandler);
}

//Функция закрытия окна

function closeModal (popup) {
    popup.classList.remove('popup_is-opened');
}


//Функция обработки клавиши escape
function escapeHandler(evt) {
    if (evt.key === 'Escape') {
        const popup = document.querySelector('.popup_is-opened');
        closeModal(popup);
    }
}


//Функция обработки клика по overlay
function clickHandler (evt) {
    const popup = document.querySelector('.popup_is-opened');
    if (evt.target === popup) {
        closeModal(popup);
    }
}
