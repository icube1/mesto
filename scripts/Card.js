class Card {
	constructor(data, cardSelector, popupImagePicture, imageSubtitle, showPopup, popupImage) {
		this._name = data.name;
		this._link = data.link;
    this._cardSelector = cardSelector;
    this._popupImagePicture = popupImagePicture;
    this._imageSubtitle = imageSubtitle;
    this._showPopup = showPopup;
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

    this._element.querySelector('.element__delete-button').addEventListener('click', () => {this._handleDeleteCard()});
    this._element.querySelector('.element__like-button').addEventListener('click', () => {this._handleLikeCard()});
    this._element.querySelector('.element__cover').addEventListener('click', () => {this._handleOpenImage()});

    return this._element;
  }

  _handleDeleteCard() {//удаление карточек
    this._element.remove();
  }

  _handleLikeCard() {//Лайк карточек
    this._element.querySelector('.element__like-button').classList.toggle('element__like-button_active');
  }

  _handleOpenImage() {//Открытие увеличенного изображения
    this._popupImagePicture.src = this._element.querySelector('.element__cover').src;
    this._popupImagePicture.alt = this._element.querySelector('.element__cover').alt;
    this._imageSubtitle.innerText = this._element.querySelector('.element__title').innerText;
    this._showPopup(this._popupImage);
  }

}
export {Card}
