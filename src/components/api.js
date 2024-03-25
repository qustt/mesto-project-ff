
//=======================================
//==========Интеграция с API=============
//=======================================

import { createCard, addCard, deleteCard, likeListener } from './card.js';
import { imageClickListener } from './modal.js';
import { saveProfileButton, saveAvatarButton, saveCardButton, profileDescription, profileTitle, profileImage } from "../index.js";

//=================
//Переменная служит для конфигурации параметров запроса к API
//=================
 export const config = {
  source: {
   cohort: 'https://nomoreparties.co/v1/wff-cohort-9/',
   profile: 'https://nomoreparties.co/v1/wff-cohort-9/users/me',
   cards: 'https://nomoreparties.co/v1/wff-cohort-9/cards',
   likes: 'https://nomoreparties.co/v1/wff-cohort-9/cards/likes',
  },
  headers: {
     authorization: '5993e96e-94d9-4e52-a8a8-15583d137850',
     method: {
       get: 'GET',
       post: 'POST',
       patch: 'PATCH',
       put: 'PUT',
       delete: 'DELETE',
    }
  }
 };

//Получаем данные профиля с сервера и передаем в функцию, которая их отображает на странице
const getProfile = () => {
    fetch(`${config.source.profile}`, {
     method: `${config.headers.method.get}`,
     headers: {
       authorization: `${config.headers.authorization}`
     }
    })
    .then(res => {
     if (res.ok){
       return res.json();
     }
     else {
       return Promise.reject(`Ошибка загрузки профиля ${res.status}`);
     }
    })
    .then(data => loadProfileData(data))
    .catch((err) => {
     console.log(err);
    })
    };
 //=================
 //Функция получает данные карточек с сервера и передает в другую функцию, которая создает карточки
 //================= 
 const getCards = () => {
   fetch(`${config.source.cards}`, {
     method: `${config.headers.method.get}`,
     headers: {
       authorization: `${config.headers.authorization}`,
     }
    })
    .then (res => {
     if (res.ok){
       return res.json();
     }
     else {
       return Promise.reject(`Ошибка загрузки карт ${res.status}`);
     }
    })
    .then(data => loadCards(data))
    .catch((err) => {
     console.log(err);
    })
 };

 
 //=================
 //Функция отображения данных учетной записи на странице
 //=================
 let userId = '';
 function loadProfileData(data){
     profileTitle.textContent = data.name;
     profileDescription.textContent = data.about;
     profileImage.style.backgroundImage = `url(${data.avatar})`;
     userId = data._id;
   };
 //=================
 //Функция отображения загруженных карточек на странице
 //=================
 let cardsData;
 function loadCards(data) {
   data.forEach(function(element){
     const likes = element.likes;
     const cardElement = createCard(element.name, element.link, deleteCard, likeListener, imageClickListener);
     checkOwner(element, cardElement);
     showLikes(likes, cardElement);
     addCard(cardElement);
   })
   cardsData = data;
 };
 
 //=================
 //Ждем, пока загрузится вся инфа (или ошибка), после чего отображаем ее
 //=================
 Promise.all([getProfile(), getCards()]);
 
 
 
 //=================
 //Функция сохранения профиля
 //=================
 
 export const saveProfile = () => {
   fetch(`${config.source.profile}`, {
     method: `${config.headers.method.patch}`,
     headers: {
       authorization: `${config.headers.authorization}`,
       'Content-Type': 'application/json'
     },
     body: JSON.stringify({
       name: `${profileTitle.textContent}`,
       about: `${profileDescription.textContent}`
     })
    })
    .then (res => {
     if (res.ok){
 
       return res.json()
     }
     else {
       return Promise.reject(`Ошибка ${res.status}`);
     }
    })
    .catch((err) => {
     console.log(err);
    })
    .finally(() => {
     renderLoading(false, saveProfileButton);
   })
 };
 
 //=================
 //Функция добавления новой карточки на сервер
 //=================
 export const pushNewCard = (cardName, cardLink) => {
   fetch(`${config.source.cards}`, {
     method: `${config.headers.method.post}`,
     headers: {
       authorization: `${config.headers.authorization}`,
       'Content-Type': 'application/json'
     },
     body: JSON.stringify({
       name: `${cardName}`,
       link: `${cardLink}`,
     })
    })
    .then (res => {
     if (res.ok){
       return res.json()
     }
     else {
       return Promise.reject(`Ошибка ${res.status}`);
     }
    })
    .catch((err) => {
     console.log(err);
    })
    .finally(() => {
     renderLoading(false, saveCardButton);
   })
 };
 
 //=================
 //Функция добавляет лайки на страницу (используется в loadCards)
 //=================
 const showLikes = (likes, card) => {
   const span = card.querySelector('.likes');
   span.textContent = likes.length;
   return card;
 }
 
 //=================
 //Функция проверяет, кто добавил карточку, и убирает помойку с чужих карт (используется в loadCards)
 //=================
 const checkOwner = (element, card) => {
   if (userId !== element.owner._id){
     const deleteButton = card.querySelector('.card__delete-button');
     deleteButton.remove();
     return card;
   }
   else {
     return card;
   }
 };
 
 export const deleteCardAPI = (card) => {
   const cardName = card.querySelector('.card__title').textContent;
   const cardLink = card.querySelector('.card__image').src;
   cardsData.forEach((element) => {
     if ((element.name === cardName)&&(element.link === cardLink)){
       fetch(`${config.source.cards}/${element._id}`, {
         method: `${config.headers.method.delete}`,
         headers: {
           authorization: `${config.headers.authorization}`,
         }
       })
     }
   })
 };
 
 
 //=================
 //Функция постановки лайка, использует функцию addLikes (ниже), на вход получает кнопку и карту
 //Проверяет совпадение имени, из ответа от API актуализирует лайки
 //=================
 export const likeCardAPI = (button, card) => {
   const cardName = card.querySelector('.card__title').textContent;
   cardsData.forEach((element) => {
     if (button.classList.contains('card__like-button_is-active')){
       if (element.name === cardName){
         fetch(`${config.source.likes}/${element._id}`, {
           method: `${config.headers.method.put}`,
           headers: {
             authorization: `${config.headers.authorization}`,
           }
         })
         .then (res => {
           if (res.ok){
             return res.json();
           }
           else {
             return Promise.reject(`Ошибка ${res.status}`);
           }
          })
          .catch((err) => {
           console.log(err);
          })
         .then ((res) => {
           addLikes(res.likes, card);
         })
       }
     }
     else {
       if (element.name === cardName){
         fetch(`${config.source.likes}/${element._id}`, {
           method: `${config.headers.method.delete}`,
           headers: {
             authorization: `${config.headers.authorization}`,
           }
         })
         .then (res => {
           if (res.ok){
             return res.json();
           }
           else {
             return Promise.reject(`Ошибка ${res.status}`);
           }
          })
          .catch((err) => {
           console.log(err);
          })
         .then ((res) => {
           addLikes(res.likes, card);
         })
       }
     }
   })
 };
 
 //=================
 //Функция вспомогательная для likeCardApi, актуализирует лайки и подгружает на страницу
 //=================
 const addLikes = (likes, card) => {
   const span = card.querySelector('.likes');
   span.textContent = likes.length;
 }
 
 

 //Функция меняет аватар и отправляет его на сервер
 export const changeAvatar = (link) => {
   profileImage.style.backgroundImage = `url(${link})`;
   fetch(`${config.source.profile}/avatar`, {
     method: `${config.headers.method.patch}`,
     headers: {
       authorization: `${config.headers.authorization}`,
       'Content-Type': 'application/json'
     },
     body: JSON.stringify({
       avatar: `${link}`
     })
    })
    .then (res => {
     if (res.ok){
       return res.json();
     }
     else {
       return Promise.reject(`Ошибка ${res.status}`);
     }
    })
    .catch((err) => {
     console.log(err);
    })
    .finally(() => {
     renderLoading(false, saveAvatarButton);
   })
 }; 
 
 //Функция, изменяющая текст кнопки во время loading
 export function renderLoading(isLoading, button) {
   if (isLoading) {
     button.textContent = 'Сохранение...';
   }
   else {
     button.textContent = 'Сохранить';
   }
 };
 
