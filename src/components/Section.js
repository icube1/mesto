export default class Section{
  constructor(renderer, cardContainer) {
    // this._items = data.items;
    this._renderer = renderer;
    this._container = cardContainer;
  }
  addCard(card) {
    this._container.prepend(card);
  }
  addInitialCards(cards) {
    cards.forEach((item) => {
     this._renderer(item)
    });
  }
 }
