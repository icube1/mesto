export default class Popup {
  constructor(popup) {
    this._popup = popup;
    this._closeEscPopup = this._closeEscPopup.bind(this);
    this._closeOverlayClick = this._closeOverlayClick.bind(this);
  }

  open() {
    this._popup.classList.add('popup_opened');

    document.addEventListener('keydown', this._closeEscPopup);

    this._popup.addEventListener('mousedown', this._closeOverlayClick);
  }

  close() {
    const span = this._popup.querySelectorAll('.error');
    const form = this._popup.querySelector('.popup__form');

    this._popup.classList.remove('popup_opened');
    // if (form) {
    //   span.forEach((item) => item.textContent = '');
    //   form.reset();
    // }
    document.removeEventListener('keydown', this._closeEscPopup);
    this._popup.removeEventListener('mousedown', this._closeOverlayClick);
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
    const buttonPopupClose = this._popup.querySelector('.popup__close');
    this._popup.querySelector('.popup__close').close;
    // buttonPopupClose.addEventListener('click', this.close);
    this._popup.querySelector('.popup__close').closeEscPopup;
    this._popup.closeOverlayClick;
  }
}
