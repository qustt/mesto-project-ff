import './pages/index.css';
import { openModal, nameInput, jobInput } from './components/modal.js';
import { enableValidation, clearValidation } from './components/validation.js';

//=================
//Выбираем элементы для попапов и кнопок
//=================
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const editPopup = document.querySelector('.popup_type_edit');
const editProfileForm = editPopup.querySelector('.popup__form');
export const newCardPopup = document.querySelector('.popup_type_new-card');
export const imagePopupElement = document.querySelector('.popup_type_image');

//=================
//Вешаем обработчики кликов для попапов
//=================
editButton.addEventListener('click', function() {
    clearValidation(editProfileForm, {
        formSelector: '.popup__form',
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__button',
        inactiveButtonClass:'popup__button_inactive',
        inputErrorClass: 'popup__input_type_error',
        errorClass: 'input__error'
      });
    openModal(editPopup);
    const title = document.querySelector('.profile__title').textContent;
    const description = document.querySelector('.profile__description').textContent;
    nameInput.value = title;
    jobInput.value = description;
})

addButton.addEventListener('click', function() {
    openModal(newCardPopup);
})

editPopup.classList.add('popup_is-animated');
newCardPopup.classList.add('popup_is-animated');
imagePopupElement.classList.add('popup_is-animated');
//=================
//Вызов функции валидации форм и передача ей настроек
//=================
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass:'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'input__error'
});

 

 //Кнопки для функции renderLoading
 export const saveProfileButton = document.querySelector('.button_save-profile');
 export const saveAvatarButton = document.querySelector('.button_save-avatar');
 export const saveCardButton = document.querySelector('.button_new-card');
 
 export const profileTitle = document.querySelector('.profile__title');
 export const profileDescription = document.querySelector('.profile__description');
 export const profileImage = document.querySelector('.profile__image');
 export const avatarPopup = document.querySelector('.popup_type_avatar');

  //Добавляем слушатель к попапу редактирования аватара 
  profileImage.addEventListener('click',function(){
    openModal(avatarPopup);
  })

