//================================
//==========  Карты  =============
//================================

//=================
//Функция содания карты
//=================

//Удалил likes и лишние функции. userId при загрузке карт берется из профиля, при добавлении новой - из элемента карты
export function createCard(name, link, imageClickListener, cardTemplate, element, deleteCardAPI, deleteLike, pushLike, userId) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    showLikes(element.likes, cardElement);
    cardImage.src = link;
    cardImage.alt = name;
    cardTitle.textContent = name;
    cardImage.addEventListener('click', imageClickListener);
    deleteButton.addEventListener('click', function(){
      deleteCardAPI(element._id)
      .then( () => {
        deleteCard(cardElement);
          })
          .catch((err) => {
            console.log(err);
           })
        }, true);

    likeButton.addEventListener('click', function (){
          likeHandler(likeButton, element._id, cardElement, deleteLike, pushLike);
        });
    checkOwner(element, deleteButton, userId);
    loadUserLikes(element.likes, userId, likeButton);
    return(cardElement);
    };

 //=================
 //Функция проверяет, кто добавил карточку, и убирает помойку с чужих карт
 //=================
const checkOwner = (element, deleteButton, userId) => {
  if (userId !== element.owner._id){
    deleteButton.remove();
  }
};


 //=================
 //Функция красит кнопку лайка, чтобы он отображался, если был поставлен ранее
 //=================
function likePreloader(likeButton){
  likeButton.classList.toggle('card__like-button_is-active');
};


 //=================
 //Функция удаления карточки из сетки
 //================= 
function deleteCard(card) {
  card.remove();
}

//=================
//  Обработчик клика по сердечку для поставновки лайка для предзагруженных карт
//=================
function likeHandler (likeButton, cardId, card, deleteLike, pushLike) {
  if (likeButton.classList.contains('card__like-button_is-active')){
    deleteLike(cardId)
    .then((res) => {
      showLikes(res.likes, card);
      likePreloader(likeButton);
    })
    .catch((err) => {
      console.log(err);
     })
  }
  else {
    pushLike(cardId)
    .then((res) => {
      showLikes(res.likes, card);
      likePreloader(likeButton);
    })
    .catch((err) => {
      console.log(err);
     })
  }
};

 //=================
 //Функция добавляет лайки на страницу
 //=================

 // Решил не передавать функции span, потому что лайки можно и не показывать.
 // В таком случае поиск span будет осуществляться только при вызове функции
 const showLikes = (likes, card) => {
  const span = card.querySelector('.likes');
  span.textContent = likes.length;
};


 //=================
 //Функция добавляет пользовательские лайки на страницу
 //=================
const loadUserLikes = (likes, userId, likeButton) => {
  likes.forEach((like) => {
    if (like._id === userId) {
      likePreloader(likeButton);
    }
  });
};

