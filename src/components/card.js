//================================
//==========  Карты  =============
//================================

//=================
//Функция содания карты
//=================
export function createCard(name, link, imageClickListener, cardTemplate) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    cardImage.src = link;
    cardImage.alt = name;
    cardTitle.textContent = name;
    cardImage.addEventListener('click', imageClickListener);
    return(cardElement);
}
//=================
//Создаем функцию-обработчик лайка
//=================
 export function likeListener (card) {
  const button = card.querySelector('.card__like-button');
  button.classList.toggle('card__like-button_is-active');
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


 //=================
 //Функция удаления карточки из сетки
 //================= 
export function deleteCard(card) {
  card.remove();
}

//=================
//  Обработчик клика по сердечку для поставновки лайка для предзагруженных карт
//=================
export function likeHandler (likeButton, cardId, card, deleteLike, pushLike, likeApiHandler) {
  if (likeButton.classList.contains('card__like-button_is-active')){
    deleteLike(cardId, card, likeApiHandler);
  }
  else {
    pushLike(cardId, card, likeApiHandler);
  }
};

 //=================
 //Функция добавляет лайки на страницу
 //=================
 export const showLikes = (likes, card) => {
  const span = card.querySelector('.likes');
  span.textContent = likes.length;
  return card;
};


export const addLikes = (likes, card) => {
  const likeButton = card.querySelector('.card__like-button');
  const span = card.querySelector('.likes');
  span.textContent = likes.length;
  likeButton.classList.toggle('card__like-button_is-active');
  return card;
};

 //=================
 //Функция добавляет слушатель к кнопке лайка
 //=================
export const addLikeListener = (card, element, deleteLike, pushLike, likeApiHandler) => {
  const likeButton = card.querySelector('.card__like-button');
  likeButton.addEventListener('click', function (){
    likeHandler(likeButton, element._id, card, deleteLike, pushLike, likeApiHandler);
  });
  return card;
};


 //=================
 //Функция добавляет пользовательские лайки на страницу
 //=================
export const loadUserLikes = (likes, card, userId) => {
  const likeButton = card.querySelector('.card__like-button'); 
  likes.forEach((like) => {
    if (like._id === userId) {
      likePreloader(likeButton);
    }
  });
  return card;
};

 //=================
 //Функция добавляет слушатель к кнопке корзины
 //=================
export const addDeleteListener = (card, deleteCardAPI, element, deleteCardApiHandler) => {
  const delBut = card.querySelector('.card__delete-button');
  if (delBut){
    delBut.addEventListener('click', function(){
      deleteCardAPI(element._id, card, deleteCardApiHandler);
    }, true);
  };
  return card;
};