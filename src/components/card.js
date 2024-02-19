const cardTemplate = document.querySelector('#card-template').content;
const cardList = document.querySelector('.places__list');

//Создаем функцию createCard
export function createCard(name, link, deleteCard, likeListener, imageClickListener) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const likeButton = cardElement.querySelector('.card__like-button');
    cardImage.src = link;
    cardImage.alt = name;
    cardTitle.textContent = name;
    deleteButton.addEventListener('click', deleteCard);
    likeButton.addEventListener('click',likeListener);
    cardImage.addEventListener('click', imageClickListener);
    return(cardElement);
}

//Создаем функцию addCard
export function addCard(cardElement) {
  cardList.append(cardElement);
}

export function addCardPrepend(cardElement) {
  cardList.prepend(cardElement);
}

//Создаем функцию удаления карты
export function deleteCard(evt) {
    const card = evt.target.closest('.card');
    card.remove();
}

//Создаем функцию-обработчик лайка

 export function likeListener (evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}