class Card {
	constructor(data, cardSelector, handleCardClick) {
		this._title = data.name;
		this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
	}

  _getTemplate() {
    const card = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return card;
  }
  _setEventListeners() {  //слушатели для карточек
    this._element.querySelector('.element__delete-button').addEventListener('click', () => this._handleDeleteCard());
    this._element.querySelector('.element__like-button').addEventListener('click', () => this._handleLikeCard());
    this._element.querySelector('.element__cover').addEventListener('click', () => this._handleCardClick({title: this._title, link: this._link}));
  }

  renderCard() {  //отрисовка карточек
    this._element = this._getTemplate();

    const cardCover = this._element.querySelector('.element__cover');
    const cardTitle = this._element.querySelector('.element__title');

    cardCover.src = this._link;
    cardTitle.textContent = this._title;
    cardCover.alt = this._title;

    this._setEventListeners();

    return this._element;
  }

  _handleDeleteCard() {//удаление карточек
    this._element.remove();
    this._element = null;
  }

  _handleLikeCard() {//Лайк карточек
    this._element.querySelector('.element__like-button').classList.toggle('element__like-button_active');
  }
}
export {Card}


