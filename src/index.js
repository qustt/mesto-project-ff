import "./pages/index.css";
import { createCard, likeListener, checkOwner, likePreloader } from "./components/card.js"
import { openModal, closeModal} from "./components/modal.js";
import { enableValidation, clearValidation, validationConfig, disableButton } from "./components/validation.js";
import { getCards, getProfile, renderLoading, pushNewCard, deleteCardAPI, pushLike, deleteLike, saveProfile, changeAvatar } from "./components/api.js";


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

let cardsCopy = '';

//================================================================================
//===========  Функции добавления карт на страницу и их удаления  ================
//================================================================================

function addCard(cardElement) {
  cardList.append(cardElement);
}

function addCardPrepend(cardElement) {
  cardList.prepend(cardElement);
}


function deleteCard(card) {
    card.remove();
}

 //=================
 //Функция добавляет лайки на страницу
 //=================
 const showLikes = (likes, card) => {
  const span = card.querySelector('.likes');
  span.textContent = likes.length;
  return card;
};
//================================================================================


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
    const card = createCard(element.name, element.link, likeListener, imageClickListener, cardTemplate);
    const likes = element.likes;
    checkOwner(element, card, userId);
    const delBut = card.querySelector('.card__delete-button');
  //  Очень сильно здесь устал, не нашел как по-другому. Слушатель должен сниматься т.к указал параметр.
    if (delBut){
      delBut.addEventListener('click', function(){
        deleteCardAPI(element._id, deleteCard, card);
      }, true);
    };
    showLikes(likes, card);
    const likeButton = card.querySelector('.card__like-button');
    likes.forEach((like) => {
      if (like._id === userId) {
        likePreloader(likeButton);
      }
    });
    likeButton.addEventListener('click', likeHandler);
    addCard(card);
});
  //  Работаем с профилем
  profileTitle.textContent = profile.name;
  profileDescription.textContent = profile.about;
  profileImage.style.backgroundImage = `url(${profile.avatar})`;
  // Сохраняем полученные данные 
  cardsCopy = cards;
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


//Функция обработки клика по изображению
function imageClickListener(evt) {
  const image = imagePopupElement.querySelector(".popup__image");
  const cardImage = evt.target.closest(".card__image");
  image.src = cardImage.src;
  image.alt = cardImage.alt;
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
  saveProfile(profileTitle, profileDescription, jobValue, nameValue, closeModal, editPopup, saveProfileButton);
}

// Обработчик «отправки» формы аватара
function handleAvatarFormSubmit(evt) {
  renderLoading(true, saveAvatarButton);
  evt.preventDefault();
  const avatarUrl = avatarInput.value;
  changeAvatar(avatarUrl, profileImage, closeModal, avatarPopup, saveAvatarButton, enableValidation, validationConfig);
  avatarFormElement.reset();
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
  const newCard = createCard(cardNameInput.value, urlInput.value, likeListener, imageClickListener, cardTemplate);
  pushNewCard(cardNameInput.value, urlInput.value, cardNameInput, urlInput, closeModal, newCardPopup, saveCardButton, enableValidation, validationConfig, newCardClickHandler, newCard, addCardPrepend);
  clearValidation(plusFormElement, validationConfig, saveCardButton);
}

//=================
//  Обработчик клика по сердечку для поставновки лайка
//----------------------------------------------------
//  Если карты абсолютно одинаковые - работает плохо. 
//  Клик мы берем из верстки, как узнать id конкретно 
//  этой карты - для меня загадка (:с)
//=================
function likeHandler (evt) {
  const card = evt.target.closest('.card');
  const cardTitle = card.querySelector('.card__title').textContent;
  const cardLink = card.querySelector('.card__image').src;
  // Сделал идентификацию карты через перебор полученных карт от сервера
  // и проверку совпадения их ссылок и имен. id карты при добавлении нужно
  // было куда-то записывать, наверное, чтобы не было этого бага
  cardsCopy.forEach( (element) => {
    if ((element.name === cardTitle)&&(element.link === cardLink)) {
      if (evt.target.classList.contains('card__like-button_is-active')){
        pushLike(element._id, card, showLikes);
      }
      else {
        deleteLike(element._id, card, showLikes);
      }
    }
  })
};

function newCardClickHandler(ownerId, card){
  const delBut = card.querySelector('.card__delete-button');
  const likeButton = card.querySelector('.card__like-button');
  delBut.addEventListener('click', function(){
    deleteCardAPI(ownerId, deleteCard, card);
  }, true);
  likeButton.addEventListener('click', function(){
    if (likeButton.classList.contains('card__like-button_is-active')){
      pushLike(ownerId, card, showLikes);
    }
    else {
      deleteLike(ownerId, card, showLikes);
    }
  });
};

