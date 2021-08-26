import './index.css';
import {enableValidationConfig} from '../utils/validationConfig.js';
import{Card} from '../components/Card.js';
import{FormValidator} from '../components/validate.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api';

const buttonEditProfile = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('.profile-popup');
const profile = document.querySelector('.profile');
const formElement = popupProfile.querySelector('.popup__form')
const profileName = profile.querySelector('.profile__name');
const inputFieldName = popupProfile.querySelector('.popup__input_field_name');
const profileAbout = profile.querySelector('.profile__description');
const inputFieldDesc = popupProfile.querySelector('.popup__input_field_description');
const buttonAddCardPopup = profile.querySelector('.profile__add-card');
const profileAvatar = profile.querySelector('.profile__avatar');
const popupCard = document.querySelector('.card-popup');
const cardElements = document.querySelector('.elements');
const cardElement = popupCard.querySelector('.popup__form');
const popupImage = document.querySelector('.image-popup');
const apiInfo = {
  url: 'https://mesto.nomoreparties.co/v1/cohort-27/',
  token: '26c8d168-5e2f-4321-b420-05dcb41e9965'
}

//TODO:
//попап удаления
//Удаление карточки
//постановка лайка через PUT
//удаление лайка через DELETE
//обновление аватара
//Лоадеры для всех форм

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
  api.addCard(form)
}

//Профиль
const formValidatorProfile = new FormValidator(enableValidationConfig, formElement);
formValidatorProfile.enableValidation();//валидация формы профиля

const popupEditProfile = new PopupWithForm(popupProfile, handleSubmitProfile);
popupEditProfile.setEventListeners();

const userProfile = new UserInfo(profileName, profileAbout, profileAvatar);

function handleUserProfile() { //открытие поп-апа профиля с переносом в инпуты
  popupEditProfile.open();
  formValidatorProfile.resetError();
  const profile = userProfile.getUserInfo();
  inputFieldName.value = profile.name;
  inputFieldDesc.value = profile.about;
}
function handleSubmitProfile(form) { // сабмит поп-апа профиля
  api.updateProfile(form);
  userProfile.setUserInfo(form);
}

//API
const api = new Api({
  baseUrl: apiInfo.url,
  headers: {
    authorization: apiInfo.token,
    'Content-Type': 'application/json'
  }
});

api.getData().then(data => {
  const [cards, userInfo ] = data;
  renderCards.addInitialCards(cards);
  userProfile.setUserInfo(userInfo);
  userProfile.setUserAvatar(userInfo)
})



//Слушатели кнопок поп-апов
buttonEditProfile.addEventListener('click', handleUserProfile);
buttonAddCardPopup.addEventListener('click', openAddCardPopup);


//Проверка работы сервера

fetch('https://mesto.nomoreparties.co/v1/cohort-27/cards', {
  headers: {
    authorization: '26c8d168-5e2f-4321-b420-05dcb41e9965'
  }
})
  .then(res => res.json())
  .then((cards) => {
    console.log(cards);
  });
