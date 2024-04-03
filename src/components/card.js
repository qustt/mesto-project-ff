//================================
//==========  Карты  =============
//================================

//=================
//Функция содания карты
//=================
export function createCard(name, link, imageClickListener, cardTemplate, element, deleteCardAPI, deleteCardApiHandler, likes, deleteLike, pushLike, likeApiHandler, userId) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const span = cardElement.querySelector('.likes');
    span.textContent = likes.length;
    cardImage.src = link;
    cardImage.alt = name;
    cardTitle.textContent = name;
    cardImage.addEventListener('click', imageClickListener);
    deleteButton.addEventListener('click', function(){
      deleteCardAPI(element._id)
      .then( res => {
          deleteCardApiHandler(res, cardElement);
          })
          .catch((err) => {
            console.log(err);
           })
        }, true);

    likeButton.addEventListener('click', function (){
          likeHandler(likeButton, element._id, cardElement, deleteLike, pushLike, likeApiHandler);
        });
    checkOwner(element, cardElement, userId);
    loadUserLikes(likes, cardElement, userId);
    return(cardElement);
    };




    

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
    deleteLike(cardId)
    .then((res) => likeApiHandler(res, card))
    .catch((err) => {
      console.log(err);
     })
  }
  else {
    pushLike(cardId)
    .then((res) => likeApiHandler(res, card))
    .catch((err) => {
      console.log(err);
     })
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

