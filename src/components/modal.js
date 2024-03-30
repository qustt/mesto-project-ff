//================================
//========Модальные окна==========
//================================


//Функция открытия окна
export function openModal(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", escapeHandler);
}

//Функция закрытия окна

export function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", escapeHandler);
}

//Функция обработки клавиши escape
function escapeHandler(evt) {
  if (evt.key === "Escape") {
    const popup = document.querySelector(".popup_is-opened");
    closeModal(popup);
  }
}


















