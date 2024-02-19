//Модальные окна

import { addCard, addCardPrepend, createCard, deleteCard, likeListener } from "./card";
import { newCardPopup, imagePopupElement } from "../index.js";
//Функция открытия окна
export function openModal (popup) {
    popup.classList.add('popup_is-opened');
    const closeButton = popup.querySelector('.popup__close');
    closeButton.addEventListener('click', function (evt) {
        closeModal(popup);
    });
    document.addEventListener('keydown', escapeHandler);
    document.addEventListener('click', clickHandler);
}

//Функция закрытия окна

export function closeModal (popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', escapeHandler);
    
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


//Редактирование имени и информации о себе
// Находим форму в DOM
const formElement = document.querySelector('.popup__form[name="edit-profile"]');
// Находим поля формы в DOM
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');
const title = document.querySelector('.profile__title').textContent;
const description = document.querySelector('.profile__description').textContent;

nameInput.value = title;
jobInput.value = description;




// Обработчик «отправки» формы
function handleFormSubmit(evt) {
    evt.preventDefault();
    // Получите значение полей jobInput и nameInput из свойства value
    const jobValue = jobInput.value;
    const nameValue = nameInput.value;
    // Выберите элементы, куда должны быть вставлены значения полей
    const title = document.querySelector('.profile__title');
    const description = document.querySelector('.profile__description');
    // Вставьте новые значения с помощью textContent
    title.textContent = nameValue;
    description.textContent = jobValue;
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);


//Добавление карточки 
// Находим форму в DOM
const plusFormElement = document.querySelector('.popup__form[name="new-place"]');
//Находим поля формы
const cardNameInput = plusFormElement.querySelector('.popup__input_type_card-name');
const urlInput = plusFormElement.querySelector('.popup__input_type_url');

function addCardSubmit(evt) {
    evt.preventDefault(); 
    const cardNameValue = cardNameInput.value;
    const urlValue = urlInput.value;
    const newCard = createCard(cardNameValue, urlValue, deleteCard);
    addCardPrepend(newCard);
    cardNameInput.value = '';
    urlInput.value = '';
    closeModal(newCardPopup);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
plusFormElement.addEventListener('submit', addCardSubmit);

//Функция обработки клика по изображению 
export function imageClickListener (evt) {
    const image = imagePopupElement.querySelector('.popup__image');
    const cardImage = evt.target.closest('.card__image');
    image.src = cardImage.src;
    image.alt = cardImage.alt;
    openModal(imagePopupElement);
}