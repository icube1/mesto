import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
    this._popupImage = this._popup.querySelector('.popup__image');
    this._imageSubtitle = this._popup.querySelector('.popup__subtitle');
  }

  open(name, link) {
    this._popupImage.src = link;
    this._popupImage.alt = name;
    this._imageSubtitle.textContent = name
  }
}
