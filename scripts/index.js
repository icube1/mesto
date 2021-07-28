//TODO:
//валидация форм
//добавление карточки

import '../pages/index.css';

import{initialCards} from './initial-cards.js';
import{Card} from './Card.js';
import{FormValidator, enableValidationConfig} from './validate.js';
import Section from './Section.js';
import Popup from './Popup.js';
import PopupWithImage from './PopupWithImage.js'
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';

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


function handleCardClick(evt) { //Открытие увеличенной карточки
  const data = {
    'name': evt.currentTarget.alt,
    'link': evt.currentTarget.src
  }

  const handleOpenImage = new PopupWithImage(popupImage, data);
  handleOpenImage.setEventListeners();
  handleOpenImage.open();
};

const renderCards = new Section({items: initialCards, renderer: cardRenderer,}, cardElements);

function cardRenderer(cardItem) { //отрисовка карточки
  const card = new Card(cardItem, '.card-template', handleCardClick);
  const cardElement = card.renderCard();
  return cardElement;
}
renderCards.renderInitialCards();


//ПОП-АПЫ:

//Профиль
const formValidatorProfile = new FormValidator(enableValidationConfig, formElement);
formValidatorProfile.enableValidation;//валидация профиля(не работает)

const popupEditProfile = new PopupWithForm(popupProfile, handleSubmitProfile);
popupEditProfile.setEventListeners();
console.log(popupEditProfile)

const openProfilePopup = new UserInfo(profileName, profileAbout);

function handleUserProfile() { //открытие поп-апа профиля с переносом в инпуты
  popupEditProfile.open();
  const profile = openProfilePopup.getUserInfo();
  inputFieldName.value = profile.name;
  inputFieldDesc.value = profile.about;
  formValidatorProfile.enableValidation();
}
function handleSubmitProfile(form) { // сабмит поп-апа профиля
  profileName.textContent = form['name'];
  profileAbout.textContent = form['about'];
}


//Новая карточка
// const formValidatorCard = new FormValidator(enableValidationConfig, cardElement);
// formValidatorCard.enableValidation();// валидация поп-апа карточки

// const popupAddCard = new PopupWithForm(popupCard, handleSubmitProfile);
// popupAddCard.setEventListeners();


// function openAddCardPopup() {
//   formValidatorCard.setEventListeners();
//   popupCard.open()
// }

buttonEditProfile.addEventListener('click', handleUserProfile);
// buttonAddCardPopup.addEventListener('click', openAddCardPopup);


export {popupImagePicture, imageSubtitle, buttonCloseProfilePopup, profileName, profileAbout}
