import "./pages/index.css";
import { createCard, checkOwner, showLikes, addLikeListener, loadUserLikes, addDeleteListener, deleteCard, addLikes } from "./components/card.js"
import { openModal, closeModal} from "./components/modal.js";
import { enableValidation, clearValidation } from "./components/validation.js";
import { getCards, getProfile, pushNewCard, deleteCardAPI, pushLike, deleteLike, saveProfile, changeAvatar } from "./components/api.js";


//================================================================================
//=========================  Выбираем элементы  ==================================
//================================================================================

//================================Кнопки==========================================

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const saveProfileButton = document.querySelector(".button_save-profile");
const saveAvatarButton = document.querySelector(".button_save-avatar");
const saveCardButton = document.querySelector(".button_new-card");

//========================  Попапы и всякое для них  =============================

const popups = document.querySelectorAll(".popup");
const editPopup = document.querySelector(".popup_type_edit");
const newCardPopup = document.querySelector(".popup_type_new-card");
const imagePopupElement = document.querySelector(".popup_type_image");
const imagePopupimage = imagePopupElement.querySelector(".popup__image");
const imagePopupDescription = imagePopupElement.querySelector(".popup__caption");
const avatarPopup = document.querySelector(".popup_type_avatar");
const editProfileForm = editPopup.querySelector(".popup__form");

//===================== Элементы для карточек и их формы  ========================

const cardTemplate = document.querySelector('#card-template').content;
const cardList = document.querySelector('.places__list');
const plusFormElement = document.querySelector('.popup__form[name="new-place"]');
const cardNameInput = plusFormElement.querySelector(".popup__input_type_card-name");
const urlInput = plusFormElement.querySelector(".popup__input_type_url");


//=====================  Элементы профиля и его форм  ===========================

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");
const editProfileFormElement = document.querySelector('.popup__form[name="edit-profile"]');
const avatarFormElement = document.querySelector('.popup__form[name="new-avatar"]');
const nameInput = editProfileFormElement.querySelector(".popup__input_type_name");
const avatarInput = avatarFormElement.querySelector(".popup__input_type_avatar");
const jobInput = editProfileFormElement.querySelector(".popup__input_type_description");


//=============================    Прочее  ======================================

//=================
//Настройки валидации
//=================

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "input__error",
};

 //=================
 //Функция, изменяющая текст кнопки во время отправки форм
 //=================

 function renderLoading(isLoading, button) {
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

//================================================================================
//===========  Функции добавления карт на страницу и их удаления  ================
//================================================================================

function addCard(cardElement) {
  cardList.append(cardElement);
}

function addCardPrepend(cardElement) {
  cardList.prepend(cardElement);
}

//================================================================================
//========================  Загружаем и добавляем карты  =========================
//================================================================================

Promise.all([getCards(), getProfile()])
.then((res) => {
  const cards = res[0];
  const profile = res[1];
  const userId = profile._id;
  //  Работаем с картами
  cards.forEach((element) => {
    const card = createCard(element.name, element.link, imageClickListener, cardTemplate);
    const likes = element.likes;
    checkOwner(element, card, userId);
    showLikes(likes, card);
    loadUserLikes(likes, card, userId);
    addDeleteListener(card, deleteCardAPI, element, deleteCardApiHandler);
    addLikeListener(card, element, deleteLike, pushLike, likeApiHandler);
    addCard(card);
});
  //  Работаем с профилем
  profileTitle.textContent = profile.name;
  profileDescription.textContent = profile.about;
  profileImage.style.backgroundImage = `url(${profile.avatar})`;
})
.catch((err) => {
  console.log(`Произошла ошибка: ${err}`);
});

//================================================================================
//================  Вешаем обработчики кликов для попапов  =======================
//================================================================================

// Добавляем слушатель к попапу редактирования профиля
editButton.addEventListener("click", function () {
  clearValidation(editProfileForm, validationConfig);
  openModal(editPopup);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
});

// Добавляем слушатель к попапу добавления карты
addButton.addEventListener("click", function () {
  openModal(newCardPopup);
});

// Добавляем слушатель к попапу редактирования аватара
profileImage.addEventListener("click", function () {
  openModal(avatarPopup);
});

editPopup.classList.add("popup_is-animated");
newCardPopup.classList.add("popup_is-animated");
imagePopupElement.classList.add("popup_is-animated");


 //=================
 //Функция обработки клика по изображению
 //================= 
 
function imageClickListener(evt) {
  const card = evt.target.closest(".card");
  const cardImage = card.querySelector(".card__image");
  const cardDesc = card.querySelector(".card__title");
  imagePopupimage.src = cardImage.src;
  imagePopupimage.alt = cardImage.alt;
  imagePopupDescription.textContent = cardDesc.textContent;
  openModal(imagePopupElement);
}
//================================================================================
//======================  Обработчики для форм  ==================================
//================================================================================

// Прикрепляем обработчик к форме добавления карты
plusFormElement.addEventListener("submit", addCardSubmit);

// Прикрепляем обработчик к форме обновления профиля
editProfileFormElement.addEventListener("submit", handleProfileFormSubmit);

// Прикрепляем обработчик к форме обновления аватара
avatarFormElement.addEventListener("submit", handleAvatarFormSubmit);


// Обработчик «отправки» формы профиля
function handleProfileFormSubmit(evt) {
  renderLoading(true, saveProfileButton);
  evt.preventDefault();
  const jobValue = jobInput.value;
  const nameValue = nameInput.value;
  saveProfile(jobValue, nameValue, saveProfileHandler);
}

// Обработчик «отправки» формы аватара
function handleAvatarFormSubmit(evt) {
  renderLoading(true, saveAvatarButton);
  evt.preventDefault();
  changeAvatar(avatarInput.value, changeAvatarHandler);
}

//================================================================================
//Вызов функции валидации форм и передача ей настроек
//================================================================================

enableValidation(validationConfig);

//=================
//Обработчик клика для попапов
//=================

//Добавляем обработчик клика
popups.forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    if (
      evt.target === evt.currentTarget ||
      evt.target.classList.contains("popup__close")
    ) {
      closeModal(popup);
    }
  });
});


//=================
//  Функция добавления карточки
//=================

function addCardSubmit(evt) {
  renderLoading(true, saveCardButton);
  evt.preventDefault();
  const newCard = createCard(cardNameInput.value, urlInput.value, imageClickListener, cardTemplate);
  pushNewCard(cardNameInput.value, urlInput.value, newCard, pushNewCardHandler);
  clearValidation(plusFormElement, validationConfig, saveCardButton);
}


//===================================================
//  Обработчики результатов запросов
//===================================================

//Для сохранения профиля
function saveProfileHandler(res){
  profileTitle.textContent = res.name;
  profileDescription.textContent = res.about;
  renderLoading(false, saveProfileButton);
  closeModal(editPopup);
};

//Для отправки карты
function pushNewCardHandler(res, card){
  renderLoading(false, saveCardButton);
  cardNameInput.value = "";
  urlInput.value = "";
  clearValidation(plusFormElement, validationConfig);
  closeModal(newCardPopup);
  console.log(card);
  addLikeListener(card, res, deleteLike, pushLike, likeApiHandler);
  addDeleteListener(card, deleteCardAPI, res, deleteCardApiHandler);
  addCardPrepend(card);
};

//Для удаления карты с сервера
function deleteCardApiHandler(res, card){
  deleteCard(card);
};

//Для постановки/удаления лайка
function likeApiHandler(res, card){
  addLikes(res.likes, card);
};

//Для смены аватара
function changeAvatarHandler(){
  console.log(avatarInput.value);
  profileImage.style.backgroundImage = `url(${avatarInput.value})`;
  renderLoading(false, saveAvatarButton);
  clearValidation(avatarFormElement, validationConfig);
  closeModal(avatarPopup);
  avatarFormElement.reset();
};

//==========================================================================================//