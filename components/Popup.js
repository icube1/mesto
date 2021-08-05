export default class Popup {
  constructor(popup) {
    this._popup = popup;
    this._closeEscPopup = this._closeEscPopup.bind(this);
    this._closeOverlayClick = this._closeOverlayClick.bind(this);
    this._popupButtonClose = this._popup.querySelector('.popup__close');
  }

  open() {
    this._popup.classList.add('popup_opened');

    document.addEventListener('keydown', this._closeEscPopup);

    this._popup.addEventListener('mousedown', this._closeOverlayClick);
  }

  close() {
    this._popup.classList.remove('popup_opened');

    document.removeEventListener('keydown', this._closeEscPopup);
    this._popup.removeEventListener('mousedown', this._closeOverlayClick);
  }

  _handleCloseButton(evt) {
    if(evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
      this.close();
    }
  }

  _closeEscPopup(evt) { //Закрытие popup при нажатии Esc
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _closeOverlayClick(evt) { //Закрытие popup при клике на оверлей
    if (evt.target === evt.currentTarget) {
      this.close();
    }
  }


  setEventListeners() {
    this._popupButtonClose.addEventListener('click', (evt) => this._handleCloseButton(evt));
  }
}
