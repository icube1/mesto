import Popup from "./Popup";

export default class PopupDeleteConfirmation extends Popup {
  constructor(popup) {
    super(popup);
    this._form = this._popup.querySelector('.popup__form');
    this._formSubmit = this._popup.querySelector('.popup__save');
    this._submit = null;
  }

  setNewHandler(submit) {
    this._submit = submit;
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      console.log(this._form)
      this._formSubmit.textContent = 'Удаление...'
      this._submit();
    })
  }


}

