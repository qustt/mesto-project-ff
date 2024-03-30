
//=======================================
//==========Интеграция с API=============
//=======================================

//=================
//Переменная служит для конфигурации параметров запроса к API
//=================
 export const config = {
  source: 'https://nomoreparties.co/v1/wff-cohort-9',
  headers: {
     authorization: '5993e96e-94d9-4e52-a8a8-15583d137850',
  }
 };

//Получаем данные профиля с сервера 
export const getProfile = () => {
    return fetch(`${config.source}/users/me`, {
     method: `GET`,
     headers: {
       authorization: `${config.headers.authorization}`
     }
    })
    .then (res => getResponseData(res))
    .catch((err) => {
     console.log(err);
    })
    };
 //=================
 //Функция получает данные карточек с сервера
 //================= 

 export const getCards = () => {
   return fetch(`${config.source}/cards`, {
     method: `GET`,
     headers: {
       authorization: `${config.headers.authorization}`,
     }
    })
    .then (res => getResponseData(res))
    .catch((err) => {
     console.log(err);
    })
 };


 //=================
 //Функция сохранения профиля
 //=================
 
 export const saveProfile = (profileTitle, profileDescription, jobValue, nameValue, closeModal, editPopup, button) => {
   fetch(`${config.source}/users/me`, {
     method: `PATCH`,
     headers: {
       authorization: `${config.headers.authorization}`,
       'Content-Type': 'application/json'
     },
     body: JSON.stringify({
       name: `${nameValue}`,
       about: `${jobValue}`
     })
    })
    .then ( res => getResponseData(res))
    .then ( res => {
      profileTitle.textContent = nameValue;
      profileDescription.textContent = jobValue;
      renderLoading(false, button);
      closeModal(editPopup);
    })
    .catch((err) => {
     console.log(err);
    })
 };
 
 //=================
 //Функция добавления новой карточки на сервер
 //=================
 export const pushNewCard = (cardName, cardLink, nameInput, linkInput, closeModal, newCardPopup, button) => {
   fetch(`${config.source}/cards`, {
     method: `POST`,
     headers: {
       authorization: `${config.headers.authorization}`,
       'Content-Type': 'application/json'
     },
     body: JSON.stringify({
       name: `${cardName}`,
       link: `${cardLink}`,
     })
    })
    .then (res => getResponseData(res))
    .then ( res => {
      renderLoading(false, button);
      nameInput.value = "";
      linkInput.value = "";
      closeModal(newCardPopup);
    })
    .catch((err) => {
     console.log(err);
    })
 };
 
 //=================
 //Функция добавляет лайки на страницу
 //=================
 export const showLikes = (likes, card) => {
   const span = card.querySelector('.likes');
   span.textContent = likes.length;
   return card;
 }
 

 //=================
 //Функция отправляет запрос на удаление карты с сервера
 //=================
 export const deleteCardAPI = (ownerId) => {
  fetch(`${config.source}/cards/${ownerId}`, {
    method: `DELETE`,
    headers: {
      authorization: `${config.headers.authorization}`,
    }
  })
  .then (res => getResponseData(res))
  .catch((err) => {
   console.log(err);
  })
}
 

 //=================
 //Функция отправляет запрос на постановку лайка
 //=================
 export const pushLike = (cardId, card) => {
  fetch(`${config.source}/cards/likes/${cardId}`, { 
    method: `PUT`, 
    headers: { 
      authorization: `${config.headers.authorization}`, 
    } 
  })
   .then (res => getResponseData(res))
   .then (res => {
    showLikes(res.likes, card);
   })
   .catch((err) => {
    console.log(err);
   }) 
 };


 //=================
 //Функция отправляет запрос на удаление лайка
 //================= 
 export const deleteLike = (cardId, card) => {
  fetch(`${config.source}/cards/likes/${cardId}`, { 
    method: `DELETE`, 
    headers: { 
      authorization: `${config.headers.authorization}`, 
    } 
  }) 
   .then (res => getResponseData(res))
   .then (res => {
    showLikes(res.likes, card);
   })
   .catch((err) => {
    console.log(err);
   })
 };

 //=================
 //Функция меняет аватар и отправляет его на сервер
 //=================
 export const changeAvatar = (link, profileImage, closeModal, avatarPopup, button) => {
   fetch(`${config.source}/users/me/avatar`, {
     method: `PATCH`,
     headers: {
       authorization: `${config.headers.authorization}`,
       'Content-Type': 'application/json'
     },
     body: JSON.stringify({
       avatar: `${link}`
     })
    })
    .then (res => getResponseData(res))
    .then (() => {
      profileImage.style.backgroundImage = `url(${link})`;
      renderLoading(false, button);
      closeModal(avatarPopup);
    })
    .catch((err) => {
     console.log(err);
    })
 }; 

 //=================
 //Функция, изменяющая текст кнопки во время отправки форм
 //=================
 export function renderLoading(isLoading, button) {
   if (isLoading) {
     button.textContent = 'Сохранение...';
     button.classList.add('popup__button_inactive');
     button.setAttribute("disabled", "disabled");
   }
   else {
     button.textContent = 'Сохранить';
     button.classList.remove('popup__button_inactive');
     button.removeAttribute("disabled");
   }
 };
 
 function getResponseData(res) {
  if (res.ok){
    return res.json();
  }
  else {
    return Promise.reject(`Ошибка ${res.status}`);
  }
 }