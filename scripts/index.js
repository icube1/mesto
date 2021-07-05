import{initialCards} from './initial-cards.js';
import{Card} from './Card.js';
import{FormValidator, enableValidationConfig} from './validate.js'

const buttonEditProfile = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('.profile-popup');
const buttonCloseProfilePopup = popupProfile.querySelector('.popup__close');
const profile = document.querySelector('.profile');
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
const popupImage = document.querySelector('.image-popup');
const imageSubtitle = document.querySelector('.popup__subtitle');
const popupImagePicture = popupImage.querySelector('.popup__image');
const buttonClosepopupImage = popupImage.querySelector('.popup__close');

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

  initialCards.forEach((item) => {  //Загрузка предустановленных карточек
    const card = new Card(item, cardTemplate, popupImagePicture, imageSubtitle, showPopup, popupImage);
    const cardElement = card._renderCard();
    const cardElements = document.querySelector('.elements');
    cardElements.prepend(cardElement);
})

function handleAddCard(event) {//Добавление карточек пользователем
  event.preventDefault();
  const card = new Card({name: cardTitle.value, link: cardImage.value}, cardTemplate, popupImagePicture, imageSubtitle, showPopup, popupImage);
  // cardTitle.value = item.name;
  // cardImage.value = item.link;
  const cardElement = card._renderCard();
  cardElements.prepend(cardElement);
  hidePopup(popupCard);
}

const validationEditForm = new FormValidator (enableValidationConfig, formElement);
validationEditForm.enableValidation();

const validationAddCard = new FormValidator (enableValidationConfig, cardElement);
validationAddCard.enableValidation();

//Обработчики
buttonEditProfile.addEventListener('click', showProfilePopup);
buttonCloseProfilePopup.addEventListener('click', () => hidePopup(popupProfile));
formElement.addEventListener('submit', handleFormSubmit);
cardElement.addEventListener('submit', handleAddCard);
buttonClosepopupImage.addEventListener('click', () => hidePopup(popupImage));

buttonAddCardPopup.addEventListener('click', () => showPopup(popupCard));
buttonCloseCardPopup.addEventListener('click', () => hidePopup(popupCard));
