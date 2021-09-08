import './index.css';
import {enableValidationConfig} from '../utils/validationConfig.js';
import{Card} from '../components/Card.js';
import{FormValidator} from '../components/validate.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api';
import PopupDeleteConfirmation from '../components/PopupDeleteConfirmation';
import {
  userId,
  buttonEditProfile,
  popupProfile,
  profile,
  formElement,
  profileName,
  inputFieldName,
  profileAbout,
  inputFieldDesc,
  buttonAddCardPopup,
  profileAvatar,
  popupCard,
  cardElement,
  cardElements,
  popupImage,
  apiInfo,
  popupDelete
} from '../utils/variables.js'



//TODO:
//обновление аватара
//Лоадеры для всех форм



//Профиль

const formValidatorProfile = new FormValidator(enableValidationConfig, formElement);
formValidatorProfile.enableValidation();//валидация формы профиля

const popupEditProfile = new PopupWithForm(popupProfile, handleSubmitProfile);
popupEditProfile.setEventListeners();

const userProfile = new UserInfo(profileName, profileAbout, profileAvatar, userId);

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

//Предзагруженные карточки
const handleOpenImage = new PopupWithImage(popupImage);
handleOpenImage.setEventListeners();

function handleCardClick(name, link) { //Открытие увеличенной карточки
  handleOpenImage.open(name, link);
};

function cardRenderer(cardItem) { //отрисовка карточки
  const card = new Card(
    cardItem,
    '.card-template',
    handleCardClick,
    userProfile.getUserInfo().id,
    handleDeleteButton,
    handleLikeClick,
    popupDeleteConfirmation
    );
  const cardElement = card.renderCard();
  return cardElement;
}

const renderCards = new Section((item) => {
  renderCards.addCard(cardRenderer(item))
}, cardElements);


//Подтверждение при удалении карточки
const popupDeleteConfirmation = new PopupDeleteConfirmation(popupDelete, handleDeleteButton);
popupDeleteConfirmation.setEventListeners();

function handleDeleteButton(cardId, card) {   //Удаление карточки
  api.deleteCard(cardId).then((res) => {
    card.remove();
    popupDeleteConfirmation.close();
  })
  .catch((err) => {
    console.log(err.toString())
  })
  .finally(() => popupDeleteConfirmation.resetButtonState())
}

//Лайк карточки
function handleLikeClick(target, id, likeCounter) {
  if(target.classList.contains('element__like-button_active')){
    api.addLike(id).then((res) => {
      likeCounter.textContent = res.likes.length;
    })
    .catch((err) => console.log(err.toString()))
  } else {
    api.removeLike(id)
    .then((res) => likeCounter.textContent = res.likes.length
    )
    .catch((err) => console.log(err.toString()))
  }

}


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
  api.addCard(form)
    .then((res) => {
      renderCards.addCustomCard(cardRenderer(res))
    })
    .catch((err) => console.log('Ошибка, рвать её мать!' + err.toString()))
}
//API
const api = new Api({
  baseUrl: apiInfo.url,
  headers: {
    authorization: apiInfo.token,
    'Content-Type': 'application/json'
  }});


// function getProfileInfo() {
//   return api.getProfile()
// }

// function getCardsInfo() {
//   return api.getInitialCards()
// }

api.getData().then(data => {
  const [ userInfo, cards  ] = data;
  userProfile.setUserInfo(userInfo);
  renderCards.addInitialCards(cards);
  // console.log(userInfo)
  // console.log(userProfile)
}).then()

.catch((err) => console.log('Ошибка, рвать её мать!' + err.toString()))

// Promise.all([getProfileInfo(), getCardsInfo()]).then((values) => {
//   const userProfileData = values[0];
//   const initialCardsData = values[1];
//   const userInfo = {
//     'name': userProfileData.name,
//     'about': userProfileData.about,
//     'avatar': userProfileData.avatar,
//     'id': userProfileData._id
//   }
//   userProfile.setUserInfo(userInfo);
//   renderCards.addInitialCards(initialCardsData);
// }).catch((err) => console.log('Ошибка, рвать её мать!' + err.toString()))



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
