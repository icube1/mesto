

import './index.css';
import {enableValidationConfig} from '../utils/validationConfig.js';
import{initialCards} from '../utils/initial-cards.js';
import{Card} from '../components/Card.js';
import{FormValidator} from '../components/validate.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

const buttonEditProfile = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('.profile-popup');
const buttonCloseProfilePopup = popupProfile.querySelector('.popup__close');
const profile = document.querySelector('.profile');
const formElement = popupProfile.querySelector('.popup__form')
const profileName = profile.querySelector('.profile__name');
const inputFieldName = popupProfile.querySelector('.popup__input_field_name');
const profileAbout = profile.querySelector('.profile__description');
const inputFieldDesc = popupProfile.querySelector('.popup__input_field_description');
const buttonAddCardPopup = profile.querySelector('.profile__add-card');
const popupCard = document.querySelector('.card-popup');
const buttonCloseCardPopup = popupCard.querySelector('.popup__close');
const cardElements = document.querySelector('.elements');
const cardTitle = popupCard.querySelector('.popup__input_field_name');
const cardImage = popupCard.querySelector('.popup__input_field_description');
const cardElement = popupCard.querySelector('.popup__form');
const popupImage = document.querySelector('.image-popup');
const imageSubtitle = document.querySelector('.popup__subtitle');
const popupImagePicture = popupImage.querySelector('.popup__image');
const buttonClosepopupImage = popupImage.querySelector('.popup__close');
const cardTemplate = document.querySelector('.card-template').content;

//Предзагруженные карточки
const handleOpenImage = new PopupWithImage(popupImage);
handleOpenImage.setEventListeners();

function handleCardClick(name, link) { //Открытие увеличенной карточки
  handleOpenImage.open(name, link);
};
function cardRenderer(cardItem) { //отрисовка карточки
  const card = new Card(cardItem, '.card-template', handleCardClick);
  const cardElement = card.renderCard();
  return cardElement;
}

const renderCards = new Section((item) => {
  renderCards.addCard(cardRenderer(item))
}, cardElements);

renderCards.addInitialCards(initialCards);

//ПОП-АПЫ:
// Новая карточка
const formValidatorCard = new FormValidator(enableValidationConfig, cardElement);
formValidatorCard.enableValidation();// валидация поп-апа карточки

const popupAddCard = new PopupWithForm(popupCard, handleSubmitCard);
popupAddCard.setEventListeners();

function openAddCardPopup() {
  popupAddCard.open();
  formValidatorCard.resetError();
}

function handleSubmitCard(form) {
  renderCards.addCard(cardRenderer(form));
}

//Профиль
const formValidatorProfile = new FormValidator(enableValidationConfig, formElement);
formValidatorProfile.enableValidation();//валидация формы профиля

const popupEditProfile = new PopupWithForm(popupProfile, handleSubmitProfile);
popupEditProfile.setEventListeners();

const userInfo = new UserInfo(profileName, profileAbout);

function handleUserProfile() { //открытие поп-апа профиля с переносом в инпуты
  popupEditProfile.open();
  formValidatorProfile.resetError();
  const profile = userInfo.getUserInfo();
  inputFieldName.value = profile.name;
  inputFieldDesc.value = profile.about;
}
function handleSubmitProfile(form) { // сабмит поп-апа профиля
  userInfo.setUserInfo(form);
}


//Слушатели кнопок поп-апов
buttonEditProfile.addEventListener('click', handleUserProfile);
buttonAddCardPopup.addEventListener('click', openAddCardPopup);
