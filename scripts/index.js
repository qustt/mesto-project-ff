//Темплейт карточки
//DOM узлы
//Функция создания карточки
//Функция удаления карточки
//Вывести карточки на страницу



// Выбираем шаблон карточки и контейнер для вставки
const cardTemplate = document.querySelector('#card-template').content;
const cardList = document.querySelector('.places__list');

//Создаем функцию createCard
function createCard(name, link, deleteCard) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    cardElement.querySelector('.card__image').src = link;
    cardElement.querySelector('.card__image').alt = 'пользовательское изображение';
    cardElement.querySelector('.card__title').textContent = name;
    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', deleteCard);
    return(cardElement);
}

//Создаем функцию addCard
function addCard() {
    initialCards.forEach(item => {
        const cardElement = createCard(item.name, item.link, deleteCard)
        cardList.append(cardElement);
    });
}

//Создаем функцию удаления карты
function deleteCard(deleteButton) {
    const card = deleteButton.target.closest('.card');
    card.remove();
}

addCard(initialCards);