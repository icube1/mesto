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
const popupDelete = document.querySelector('.delete-popup');
const editAvatar = document.querySelector('.avatar-popup')
const apiInfo = {
  url: 'https://mesto.nomoreparties.co/v1/cohort-27/',
  token: '26c8d168-5e2f-4321-b420-05dcb41e9965'
}
let userId = null;

export {buttonEditProfile, popupProfile, profile, formElement, profileName, inputFieldName, profileAbout,
  inputFieldDesc, buttonAddCardPopup, profileAvatar, popupCard, cardElements, cardElement, popupImage, apiInfo, userId, popupDelete, editAvatar}
