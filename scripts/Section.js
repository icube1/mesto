export default class Section{
  constructor({items, renderer}, cardContainer) {
    this._items = items;
    this._renderer = renderer;
    this._cardContainer = cardContainer;
  }
  renderInitialCards() {
    this._items.forEach(item => {
      this._renderer(item);
    });
  }
  addCard(card) {
    this._cardContainer.append(card);
  }
 }
