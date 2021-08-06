import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
    this._link = this._popup.querySelector('.popup__image');
    this._title = this._popup.querySelector('.popup__subtitle');
  }

  open(data) {
    this._link.src = data.link;
    this._link.alt = data.title;
    this._title.textContent = data.title;
    super.open()
  }
}
