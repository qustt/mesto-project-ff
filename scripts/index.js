
// Выбираем шаблон карточки и контейнер для вставки
const cardTemplate = document.querySelector('#card-template').content;
const cardList = document.querySelector('.places__list');

//Создаем цикл для массива с данными карты
initialCards.forEach(createCard);

//Создаем функцию createCard
function createCard(item) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    cardElement.querySelector('.card__image').src = item.link;
    cardElement.querySelector('.card__image').alt = 'пользовательское изображение';
    cardElement.querySelector('.card__title').textContent = item.name;
    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', deleteCard);
    addCard(cardElement);
}

//Создаем функцию addCard
function addCard(cardElement) {
    cardList.append(cardElement);
}

//Создаем функцию удаления карты
function deleteCard(deleteButton) {
    const card = deleteButton.target.closest('.card');
    card.remove();
}