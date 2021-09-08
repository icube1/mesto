class Card {
	constructor(data, cardSelector, handleCardClick, selfId, handleDeleteButton, handleLikeClick, popupDeleteConfirmation) {
    this._data = data;
		this._title = data.name;
		this._link = data.link;
    this._likes = data.likes;
    this._likeQuantity = data.likes.length;
    this._id = data._id;
    this._ownerId = data.owner._id;

    this._selfId = selfId;

    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;

    this._handleLikeClick = handleLikeClick;

    this._handleDeleteButton = handleDeleteButton;
    this._popupDeleteConfirmation = popupDeleteConfirmation
	}

  cardId() {
    return this._id
  }

  _getTemplate() {
    const card = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return card;
  }

  renderCard() {  //отрисовка карточек
    this._element = this._getTemplate();

    const cardCover = this._element.querySelector('.element__cover');
    const cardTitle = this._element.querySelector('.element__title');
    const cardLike = this._element.querySelector('.element__like-button')
    const cardLikes = this._element.querySelector('.element__like-button_quantity');
    const cardDeleteButton = this._element.querySelector('.element__delete-button');

    cardCover.src = this._link;
    cardTitle.textContent = this._title;
    cardCover.alt = this._title;

    this._likeCounter = this._element.querySelector('.element__like-button_quantity');

    if (this._ownerId !== this._selfId) {
      cardDeleteButton.style.display = "none";
    }

    if(this._likes.some((element) => {return (this._selfId === element._id)})){
      cardLike.classList.add('element__like-button_active')
  }
  cardLikes.textContent = this._likeQuantity
    this._setEventListeners();
    return this._element;
  }

  setLikes() {
    cardLikes.textContent = this._likeQuantity;
  }

  _handleDeleteConfirmation() {
    this._popupDeleteConfirmation.setNewHandler(() => this._handleDeleteCard());
    this._popupDeleteConfirmation.open()
  }

  _handleDeleteCard() {//удаление карточек
    this._handleDeleteButton(this._id, this._element);
  }

  _handleLikeCard() {//Лайк карточек
    this._element.querySelector('.element__like-button').classList.toggle('element__like-button_active');
  }

  _setEventListeners() {  //слушатели для карточек
    this._element.querySelector('.element__delete-button').addEventListener('click', () => this._handleDeleteConfirmation());
    this._element.querySelector('.element__like-button').addEventListener('click', (evt) => {
      this._handleLikeCard();
      this._handleLikeClick(evt.target, this._id, this._likeCounter)
    });
    this._element.querySelector('.element__cover').addEventListener('click', () => this._handleCardClick({title: this._title, link: this._link}));
  }

}
export {Card}


