
// Выбираем шаблон карточки и контейнер для вставки
const cardTemplate = document.querySelector('#card-template').content;
const cardList = document.querySelector('.places__list');

//Создаем функцию добавления карты
function addCard() {
    for (let i = 0; i < initialCards.length; i++) {
        const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
        cardElement.querySelector('.card__image').src = initialCards[i].link;
        cardElement.querySelector('.card__title').textContent = initialCards[i].name;
        cardList.append(cardElement);
        const deleteButton = cardElement.querySelector('.card__delete-button');
        deleteButton.addEventListener('click', deleteCard);
    }
} 
//Создаем функцию удаления карты

function deleteCard (button) {
    const card = button.target.closest('.card');
    card.remove();
}
//Вызываем функцию добавления карт на страницу
addCard();

