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

