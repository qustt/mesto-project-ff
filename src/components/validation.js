//================================
//========Валидация форм==========
//================================

//=================
//Настройки валидации
//=================

export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "input__error",
};

//=================
//Проверяем валидность
//=================

const isValid = (obj, formElement, inputElement) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(
      obj,
      formElement,
      inputElement,
      inputElement.validationMessage
    );
  } else {
    hideInputError(obj, formElement, inputElement);
  }
};

//=================
//Показываем ошибку
//=================

const showInputError = (obj, formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(obj.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(obj.errorClass);
};
//=================
//Скрываем ошибку
//=================
const hideInputError = (obj, formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(obj.inputErrorClass);
  errorElement.classList.remove(obj.errorClass);
  errorElement.textContent = "";
};

//=================
//"Слушаем" ввод
//=================

const setEventListeners = (obj, formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(obj.inputSelector));
  const buttonElement = formElement.querySelector(obj.submitButtonSelector);
  toggleButtonState(obj, inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(obj, formElement, inputElement);
      toggleButtonState(obj, inputList, buttonElement);
    });
  });
};

//=================
//Функция включения валидации
//=================
export const enableValidation = (obj) => {
  const formList = Array.from(document.querySelectorAll(obj.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(obj, formElement);
  });
};

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

//=================
//      Переключатель кнопки
//      Функция добавляет и убирает неактивный стиль и делает элемент неактивным/активным
//=================

export function toggleButtonState(obj, inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(obj.inactiveButtonClass);
    buttonElement.setAttribute("disabled", "disabled");
  } else {
    buttonElement.classList.remove(obj.inactiveButtonClass);
    buttonElement.removeAttribute("disabled");
  }
}

//=================
//Функция очистки валидации
//=================

export function clearValidation(profileForm, validationConfig) {
  const buttonElement = profileForm.querySelector(
    validationConfig.submitButtonSelector
  );
  buttonElement.classList.add(validationConfig.inactiveButtonClass);
  const inputElements = Array.from(
    profileForm.querySelectorAll(validationConfig.inputSelector)
  );
  inputElements.forEach((element) => {
    hideInputError(validationConfig, profileForm, element);
  });
}

export function disableButton(obj, button){
  button.classList.add(obj.inactiveButtonClass);
  button.setAttribute("disabled", "disabled");
};