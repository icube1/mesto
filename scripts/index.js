const initialCards = [  //массив с предустановленными карточками
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
const openPopup = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const closePopup = popup.querySelector('.popup__close');
const profile = document.querySelector('.profile')
const formElement = popup.querySelector('.popup__form')
const profileName = profile.querySelector('.profile__name');
const nameInput = popup.querySelector('.popup__input_field_name');
const about = profile.querySelector('.profile__description');
const jobInput = popup.querySelector('.popup__input_field_description');
const addCard = profile.querySelector('.profile__add-card');
const cardPopup = document.querySelector('.card-popup');
const closeCardPopup = cardPopup.querySelector('.popup__close');
const cardTemplate = document.querySelector('.card-template').content;
const cardElements = document.querySelector('.elements');
const card = cardTemplate.cloneNode(true);
const cardTitle = cardPopup.querySelector('.popup__input_field_name');
const cardImage = cardPopup.querySelector('.popup__input_field_description');
const cardElement = cardPopup.querySelector('.popup__form');
const imagePopup = document.querySelector('.image-popup');
const closeImagePopup = imagePopup.querySelector('.popup__close');

function renderCards() {
  initialCards.forEach(renderCard);
}

function renderCard(element) { //Вызов предустановленной карточки
  const card = cardTemplate.cloneNode(true);
  const deleteButton = card.querySelector('.element__delete-button');
  const likeButton = card.querySelector('.element__like-button');
  const coverPopup = card.querySelector('.element__cover');
  const imagePopup = document.querySelector('.image-popup');
  const imageSubtitle = document.querySelector('.popup__subtitle');
  const cardSubtitle = card.querySelector('.element__title');

  card.querySelector('.element__title').innerText = element.name;
  card.querySelector('.element__cover').src = element.link;
  card.querySelector('.element__cover').alt = element.name;

  likeButton.addEventListener('click', likeCard);
  deleteButton.addEventListener('click', handleDeleteCard);
  coverPopup.addEventListener('click', openImage);
  function openImage() {
    const imageSubtitle = document.querySelector('.popup__subtitle');
    imagePopup.classList.toggle('popup_opened');
    imagePopup.querySelector('.popup__image').src = coverPopup.src;
    imageSubtitle.innerText = cardSubtitle.innerText;
  }

  cardElements.appendChild(card);
}
renderCards();

function showPopup() {
  popup.classList.toggle('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = about.textContent;
}

function hidePopup() {
  popup.classList.toggle('popup_opened');
}

function toggleCardPopup() {
  cardPopup.classList.toggle('popup_opened');
}

function toggleImagePopup() {
  imagePopup.classList.toggle('popup_opened');
}

//выше функции для вкл/выкл поп-апа

function formSubmitHandler(evt) { //Форма отправки новых имени и описания
  evt.preventDefault();
  const nameValue = nameInput.value;
  const aboutValue = jobInput.value;
  profileName.textContent = nameValue;
  about.textContent = aboutValue;
  hidePopup();
}


function handleAddCard(event) { // Создание карточки вручную
  event.preventDefault();
  const card = cardTemplate.cloneNode(true);
  const deleteButton = card.querySelector('.element__delete-button');
  const likeButton = card.querySelector('.element__like-button');
  const coverPopup = card.querySelector('.element__cover');
  const imagePopup = document.querySelector('.image-popup');
  const cardSubtitle = card.querySelector('.element__title');

  card.querySelector('.element__title').innerText = cardTitle.value;
  card.querySelector('.element__cover').src = cardImage.value;
  card.querySelector('.element__cover').alt = cardTitle.value

  likeButton.addEventListener('click', likeCard);
  deleteButton.addEventListener('click', handleDeleteCard);
  coverPopup.addEventListener('click', openImage);
  function openImage() {
    const imageSubtitle = document.querySelector('.popup__subtitle');
    imagePopup.classList.toggle('popup_opened');
    imagePopup.querySelector('.popup__image').src = coverPopup.src;
    imageSubtitle.innerText = cardSubtitle.innerText;
  }
  cardElements.appendChild(card);
  toggleCardPopup();

}

function handleDeleteCard(event) {
  event.target.closest('.element').remove();
}

function likeCard(event) {
  event.target.classList.toggle('element__like-button_active');
}

openPopup.addEventListener('click', showPopup);
closePopup.addEventListener('click', hidePopup);
formElement.addEventListener('submit', formSubmitHandler);
cardElement.addEventListener('submit', handleAddCard);
closeImagePopup.addEventListener('click', toggleImagePopup);

addCard.addEventListener('click', toggleCardPopup);
closeCardPopup.addEventListener('click', toggleCardPopup);


