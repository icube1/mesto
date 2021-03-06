import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popup, formSubmit) {
    super(popup);
    this._popupForm = this._popup.querySelector('.popup__form');
    this._formSubmit = formSubmit;
  }

  _getInputValues() {
    this._inputs = Array.from(this._popupForm.querySelectorAll('.popup__input'));
    this._inputValues = {}
    this._inputs.forEach((input) => this._inputValues[input.name] = input.value);
    return this._inputValues;
  }

  setEventListeners() {
    super.setEventListeners();

    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitButton.textContent = 'Сохранение...'
      this._formSubmit(this._getInputValues());
      // this.close();
      // this.resetButtonText()
    })

  }

  close() {
    super.close();
    this._popupForm.reset();

  }
}
