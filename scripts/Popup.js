export default class Popup {
  constructor(popup) {
    this._popup = popup;

  }
  clearForm(popup) { // функция для очистки формы
    const span = popup.querySelectorAll('.error');
    const form = popup.querySelector('.popup__form')

    if (form) {
      span.forEach((item) => item.textContent = '');
      form.reset();
    }
  }


  closeOverlayClick(evt) { //Закрытие popup при клике на оверлей
    const popup = document.querySelector('.popup_opened');

    if (evt.target === evt.currentTarget) {
      this.close();
    }
  }

  closeEscPopup(evt) { //Закрытие popup при нажатии Esc
    this._popup.addEventListener('click', (event => {
      if (evt.key === 'Escape') {
        this.close();
      }
    }))
  }
  open(popup) {
    this._popup.classList.add('popup_opened');

    document.addEventListener('keydown', closeEscPopup);

    popup.addEventListener('mousedown', closeOverlayClick);
  }

  close(popup) {
    this._popup.classList.remove('popup_opened');
    clearForm(this._popup);
    document.removeEventListener('keydown', closeEscPopup);
    popup.removeEventListener('mousedown', closeOverlayClick);

  }

  setEventListeners() {
    this._popup.querySelector('.popup__close').closeEscPopup;
    this._popup.closeOverlayClick;
  }
}
