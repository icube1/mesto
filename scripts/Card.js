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
      .querySelector(this._cardSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return card;
  }
  renderCard() {
    this._element = this._getTemplate();

    const cardCover = this._element.querySelector('.element__cover');
    const cardTitle = this._element.querySelector('.element__title')

    cardCover.src = this._link;
    cardTitle.innerText = this._name;
    cardCover.alt = this._name;

    this._element.querySelector('.element__delete-button').addEventListener('click', () => this._handleDeleteCard());
    this._element.querySelector('.element__like-button').addEventListener('click', () => this._handleLikeCard());
    cardCover.addEventListener('click', () => this._handleOpenImage());

    return this._element;
  }

  _handleDeleteCard() {//удаление карточек
    this._element.remove();
  }

  _handleLikeCard() {//Лайк карточек
    this._element.querySelector('.element__like-button').classList.toggle('element__like-button_active');
  }

  _handleOpenImage() {//Открытие увеличенного изображения
    const cardCover = this._element.querySelector('.element__cover')
    const cardTitle = this._element.querySelector('.element__title')


    this._popupImagePicture.src = cardCover.src;
    this._popupImagePicture.alt = cardCover.alt;
    this._imageSubtitle.innerText = cardTitle.innerText;
    this._showPopup(this._popupImage);
  }

}
export {Card}
