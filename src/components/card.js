//=================
//Функция содания карты
//=================
export function createCard(name, link, deleteCard, likeListener, imageClickListener, cardTemplate) {
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
//=================
//Создаем функцию-обработчик лайка
//=================
 export function likeListener (evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}

 //=================
 //Функция проверяет, кто добавил карточку, и убирает помойку с чужих карт
 //=================
 export const checkOwner = (element, card, userId) => {
  if (userId !== element.owner._id){
    const deleteButton = card.querySelector('.card__delete-button');
    deleteButton.remove();
    return card;
  }
  else {
    return card;
  }
};


 //=================
 //Функция красит кнопку лайка, чтобы он отображался, если был поставлен ранее
 //=================
export function likePreloader(likeButton){
  likeButton.classList.toggle('card__like-button_is-active');
};