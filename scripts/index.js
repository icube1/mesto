import{initialCards} from './initial-cards.js'
import{Card} from './Card.js'

const buttonEditProfile = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('.profile-popup');
const buttonCloseProfilePopup = popupProfile.querySelector('.popup__close');
const profile = document.querySelector('.profile')
const formElement = popupProfile.querySelector('.popup__form')
const profileName = profile.querySelector('.profile__name');
const inputFieldName = popupProfile.querySelector('.popup__input_field_name');
const about = profile.querySelector('.profile__description');
const inputFieldDesc = popupProfile.querySelector('.popup__input_field_description');
const buttonAddCardPopup = profile.querySelector('.profile__add-card');
const popupCard = document.querySelector('.card-popup');
const buttonCloseCardPopup = popupCard.querySelector('.popup__close');
const cardTemplate = document.querySelector('.card-template').content;
const cardElements = document.querySelector('.elements');
const cardTitle = popupCard.querySelector('.popup__input_field_name');
const cardImage = popupCard.querySelector('.popup__input_field_description');
const cardElement = popupCard.querySelector('.popup__form');
const imagePopup = document.querySelector('.image-popup');
const imageSubtitle = document.querySelector('.popup__subtitle');
const imagePopupPicture = imagePopup.querySelector('.popup__image');
const buttonCloseImagePopup = imagePopup.querySelector('.popup__close');

function closeEscPopup(evt) { //Закрытие popup при нажатии Esc
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    hidePopup(popup);
  }
}

function closeOverlayClick(evt) {//Закрытие popup при клике на оверлей
  if(evt.target === evt.currentTarget) {
    const popup = document.querySelector('.popup_opened');
    hidePopup(popup);
  }
}

function showProfilePopup() {
  showPopup(popupProfile);
  inputFieldName.value = profileName.textContent;
  inputFieldDesc.value = about.textContent;
}

function hidePopup(popup) {
  popup.classList.remove('popup_opened');

  document.removeEventListener('keydown', closeEscPopup);

  popup.removeEventListener('mousedown', closeOverlayClick)

}

function showPopup(popup) {
  popup.classList.add('popup_opened');

  document.addEventListener('keydown', closeEscPopup);

  popup.addEventListener('mousedown', closeOverlayClick);
}
//выше 3 функции для вкл/выкл поп-апов

function handleFormSubmit(evt) { //Форма отправки новых имени и описания
  evt.preventDefault();
  const nameValue = inputFieldName.value;
  const aboutValue = inputFieldDesc.value;
  profileName.textContent = nameValue;
  about.textContent = aboutValue;
  hidePopup(popupProfile);
}



  initialCards.forEach((item) => {
  const card = new Card(item, cardTemplate, imagePopupPicture, imageSubtitle, showPopup, imagePopup);
  const cardElement = card._renderCard();
  const cardElements = document.querySelector('.elements');
  cardElements.prepend(cardElement);
})



// renderCards();

function handleAddCard(event) {//Добавление карточек пользователем
  event.preventDefault();
  cardElements.prepend(renderCard(cardImage.value, cardTitle.value));
  hidePopup(popupCard);
}

// function likeCard(event) {//Лайк карточки
//   event.target.classList.toggle('element__like-button_active');
// }

//Обработчики
buttonEditProfile.addEventListener('click', showProfilePopup);
buttonCloseProfilePopup.addEventListener('click', () => hidePopup(popupProfile));
formElement.addEventListener('submit', handleFormSubmit);
cardElement.addEventListener('submit', handleAddCard);
buttonCloseImagePopup.addEventListener('click', () => hidePopup(imagePopup));

buttonAddCardPopup.addEventListener('click', () => showPopup(popupCard));
buttonCloseCardPopup.addEventListener('click', () => hidePopup(popupCard));


//const card = new Card('Привет! Как дела?', 'https://code.s3.yandex.net/web-code/card__image.jpg');
// messageList.forEach((item) => {
//   // Создадим экземпляр карточки
//   const card = new Card(item.text, item.image);
//   // Создаём карточку и возвращаем наружу
//   const cardElement = card.generateCard();

//   // Добавляем в DOM
//   document.body.append(cardElement);
// });
