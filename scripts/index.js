const initialCards = [ //массив с предустановленными карточками
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
const profilePopup = document.querySelector('.profile-popup');
const closePopup = profilePopup.querySelector('.popup__close');
const profile = document.querySelector('.profile')
const formElement = profilePopup.querySelector('.popup__form')
const profileName = profile.querySelector('.profile__name');
const nameInput = profilePopup.querySelector('.popup__input_field_name');
const about = profile.querySelector('.profile__description');
const jobInput = profilePopup.querySelector('.popup__input_field_description');
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
const imageSubtitle = document.querySelector('.popup__subtitle');
const imagePopupPicture = imagePopup.querySelector('.popup__image');
const closeImagePopup = imagePopup.querySelector('.popup__close');

function showProfilePopup() {
  showPopup(profilePopup);
  nameInput.value = profileName.textContent;
  jobInput.value = about.textContent;
}

function hidePopup(popup) {
  popup.classList.remove('popup_opened');

  document.removeEventListener('keydown', (evt) => { //Удаление обработчика закрытия поп-апа кнопкой esc
    if (evt.keyCode === 27) {
      hidePopup(popup);
    }
  })

  popup.removeEventListener('mousedown', (event) => { //Удаление обработчика закрытия поп-апа кликом на оверлей
    if(event.target === event.currentTarget) {
      hidePopup(popup);
    }
  })

}

function showPopup(popup) {
  popup.classList.add('popup_opened');

  document.addEventListener('keydown', (evt) => {//Открытие поп-апа кнопкой esc
    if (evt.keyCode === 27) {
      hidePopup(popup);
    }
  })

  popup.addEventListener('mousedown', function(event) {//закрытие поп-апа кликом на оверлей
    if(event.target === event.currentTarget) {
      hidePopup(popup);
    }
  })
}

//выше функции для вкл/выкл поп-апа

function formSubmitHandler(evt) { //Форма отправки новых имени и описания
  evt.preventDefault();
  const nameValue = nameInput.value;
  const aboutValue = jobInput.value;
  profileName.textContent = nameValue;
  about.textContent = aboutValue;
  hidePopup(profilePopup);
}

function renderCard(link, name) { //отрисовка карточек
  const card = cardTemplate.cloneNode(true);
  const deleteButton = card.querySelector('.element__delete-button');
  const likeButton = card.querySelector('.element__like-button');
  const coverPopup = card.querySelector('.element__cover');
  const cardSubtitle = card.querySelector('.element__title');

  function openImage() {
    showPopup(imagePopup);
    imagePopupPicture.src = coverPopup.src;
    imageSubtitle.innerText = cardSubtitle.innerText;
  }


  cardSubtitle.innerText = cardTitle.value;
  coverPopup.src = cardImage.value;
  coverPopup.alt = cardTitle.value;

  cardSubtitle.innerText = name;
  coverPopup.src = link;
  coverPopup.alt = name;

  likeButton.addEventListener('click', likeCard);
  deleteButton.addEventListener('click', handleDeleteCard);
  coverPopup.addEventListener('click', openImage);
  return card;
}

function renderCards() {
  initialCards.forEach((item) => cardElements.append(renderCard(item.link, item.name)));
}

renderCards();

function handleAddCard(event) {
  event.preventDefault();
  cardElements.prepend(renderCard(cardImage.value, cardTitle.value));
  hidePopup(cardPopup);
}

function handleDeleteCard(event) {
  event.target.closest('.element').remove();
}

function likeCard(event) {
  event.target.classList.toggle('element__like-button_active');
}

openPopup.addEventListener('click', showProfilePopup);
closePopup.addEventListener('click', () => hidePopup(profilePopup));
formElement.addEventListener('submit', formSubmitHandler);
cardElement.addEventListener('submit', handleAddCard);
closeImagePopup.addEventListener('click', () => hidePopup(imagePopup));

addCard.addEventListener('click', () => showPopup(cardPopup));
closeCardPopup.addEventListener('click', () => hidePopup(cardPopup));
