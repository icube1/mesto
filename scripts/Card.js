class Card {
	constructor(data, cardSelector, imagePopupPicture, imageSubtitle, openPopup, popupImage) {
		this._name = data.name;
		this._link = data.link;
    this._cardSelector = cardSelector;
    this._imagePopupPicture = imagePopupPicture;
    this._imageSubtitle = imageSubtitle;
    this._openPopup = openPopup;
    this._popupImage = popupImage;
	}

  _getTemplate() {
    const card = document
      .querySelector('.card-template')
      .content
      .querySelector('.element')
      .cloneNode(true);

    return card;
  }
  _renderCard() {
    this._element = this._getTemplate();

    this._element.querySelector('.element__cover').src = this._link;
    this._element.querySelector('.element__title').innerText = this._name;
    this._element.querySelector('.element__cover').alt = this._name;

    this._element.querySelector('.element__delete-button').addEventListener('click', () => {this._handleDeleteCard});
    this._element.querySelector('.element__like-button').addEventListener('click', () => {this._handleLike});
    this._element.querySelector('.element__cover').addEventListener('click', () => {this._handleOpenImage});


    // buttonLikeCard.addEventListener('click', _handleLikeCard);
    // buttonDeleteCard.addEventListener('click', _handleDeleteCard);
    // coverPopup.addEventListener('click', _handleOpenImage);

    return this._element;
  }

  _handleDeleteCard() {//удаление карточек
    this._element.remove();
  }

  _handleLikeCard() {
    this._element.querySelector('.element__like-button').classList.add('element__like-button_active');
  }

  _handleOpenImage() {
    this._imagePopupPicture.src = this._element.querySelector('.element__cover').src;
    this._imagePopupPicture.alt = this._element.querySelector('.element__cover').alt;
    this._imageSubtitle.innerText = this._element.querySelector('.element__title').innerText;
    this._openPopup(this._popupImage);
  }

}
export {Card}
