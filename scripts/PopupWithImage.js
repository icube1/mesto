import {popupImagePicture, imageSubtitle} from './index.js'
import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popup, data) {
    super(popup);
    this._data = data;
    this._data._link = this._popup.querySelector('.popup__image');
    this._data._name = this._popup.querySelector('.popup__subtitle');
  }

  open() {
    popupImagePicture.src = this._data.link;
    imageSubtitle.alt = this._data.name;
    imageSubtitle.textContent = this._data.name;
    super.open()
  }
}
