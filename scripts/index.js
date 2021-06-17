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
const card = cardTemplate.cloneNode(true);
const cardTitle = popupCard.querySelector('.popup__input_field_name');
const cardImage = popupCard.querySelector('.popup__input_field_description');
const cardElement = popupCard.querySelector('.popup__form');
const imagePopup = document.querySelector('.image-popup');
const imageSubtitle = document.querySelector('.popup__subtitle');
const imagePopupPicture = imagePopup.querySelector('.popup__image');
const buttonCloseImagePopup = imagePopup.querySelector('.popup__close');

function closeEscPopup(evt) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    hidePopup(popup);
  }
}

function closeOverlayClick(evt) {
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

//выше функции для вкл/выкл поп-апа

function handleFormSubmit(evt) { //Форма отправки новых имени и описания
  evt.preventDefault();
  const nameValue = inputFieldName.value;
  const aboutValue = inputFieldDesc.value;
  profileName.textContent = nameValue;
  about.textContent = aboutValue;
  hidePopup(popupProfile);
}

function renderCard(link, name) { //отрисовка карточек
  const card = cardTemplate.cloneNode(true);
  const buttonDeleteCard = card.querySelector('.element__delete-button');
  const buttonLikeCard = card.querySelector('.element__like-button');
  const coverPopup = card.querySelector('.element__cover');
  const cardSubtitle = card.querySelector('.element__title');

  function openImage() {
    showPopup(imagePopup);
    imagePopupPicture.src = coverPopup.src;
    imageSubtitle.innerText = cardSubtitle.innerText;
    imagePopupPicture.alt = coverPopup.alt;
  }


  cardSubtitle.innerText = cardTitle.value;
  coverPopup.src = cardImage.value;
  coverPopup.alt = cardTitle.value;

  cardSubtitle.innerText = name;
  coverPopup.src = link;
  coverPopup.alt = name;

  buttonLikeCard.addEventListener('click', likeCard);
  buttonDeleteCard.addEventListener('click', handleDeleteCard);
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
  hidePopup(popupCard);
}

function handleDeleteCard(event) {
  event.target.closest('.element').remove();
}

function likeCard(event) {
  event.target.classList.toggle('element__like-button_active');
}

buttonEditProfile.addEventListener('click', showProfilePopup);
buttonCloseProfilePopup.addEventListener('click', () => hidePopup(popupProfile));
formElement.addEventListener('submit', handleFormSubmit);
cardElement.addEventListener('submit', handleAddCard);
buttonCloseImagePopup.addEventListener('click', () => hidePopup(imagePopup));

buttonAddCardPopup.addEventListener('click', () => showPopup(popupCard));
buttonCloseCardPopup.addEventListener('click', () => hidePopup(popupCard));
