//=======================================
//========  Интеграция с API  ===========
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

 //=================
 //Функция получает данные профиля с сервера
 //================= 

export const getProfile = () => {
    return fetch(`${config.source}/users/me`, {
     method: `GET`,
     headers: {
       authorization: `${config.headers.authorization}`
     }
    })
    .then (res => getResponseData(res))
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
 };


 //=================
 //Функция сохранения профиля
 //=================
 
 export const saveProfile = (jobValue, nameValue, saveProfileHandler) => {
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
      saveProfileHandler(res);
    })
    .catch((err) => {
     console.log(err);
    })
 };
 
 //=================
 //Функция добавления новой карточки на сервер
 //=================

 export const pushNewCard = (cardName, cardLink, card, pushNewCardHandler) => {
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
      pushNewCardHandler(res, card);
    })
    .catch((err) => {
     console.log(err);
    })
 };

 //=================
 //Функция отправляет запрос на удаление карты с сервера
 //=================

 export const deleteCardAPI = (ownerId, card, deleteCardApiHandler) => {
  fetch(`${config.source}/cards/${ownerId}`, {
    method: `DELETE`,
    headers: {
      authorization: `${config.headers.authorization}`,
    }
  })
  .then (res => getResponseData(res))
  .then (res => {
    deleteCardApiHandler(res, card);
  })
  .catch((err) => {
   console.log(err);
  })
};
 

 //=================
 //Функция отправляет запрос на постановку лайка
 //=================

 export const pushLike = (cardId, card, likeApiHandler) => {
  fetch(`${config.source}/cards/likes/${cardId}`, { 
    method: `PUT`, 
    headers: { 
      authorization: `${config.headers.authorization}`, 
    } 
  })
   .then (res => getResponseData(res))
   .then (res => {
    likeApiHandler(res, card);
   })
   .catch((err) => {
    console.log(err);
   }) 
 };


 //=================
 //Функция отправляет запрос на удаление лайка
 //================= 

 export const deleteLike = (cardId, card, likeApiHandler) => {
  fetch(`${config.source}/cards/likes/${cardId}`, { 
    method: `DELETE`, 
    headers: { 
      authorization: `${config.headers.authorization}`, 
    } 
  }) 
   .then (res => getResponseData(res))
   .then (res => {
    likeApiHandler(res, card);

   })
   .catch((err) => {
    console.log(err);
   })
 };

 //=================
 //Функция меняет аватар и отправляет его на сервер
 //=================

 export const changeAvatar = (link, changeAvatarHandler) => {
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
      changeAvatarHandler();
    })
    .catch((err) => {
     console.log(err);
    })
 }; 


 //=================
 //Функция проверяет результат с сервера
 //=================
   
 function getResponseData(res) {
  if (res.ok){
    return res.json();
  }
  else {
    return Promise.reject(`Ошибка ${res.status}`);
  }
 };