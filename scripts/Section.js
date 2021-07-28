export default class Section{
  constructor(data, cardContainer) {
    this._items = data.items;
    this._renderer = data.renderer;
    this._container = cardContainer;
  }
  renderInitialCards() {
    this._items.forEach(item => {
      const renderedCard = this._renderer(item);
      this._container.append(renderedCard);
    });
  }
  addCard(card) {
    this._container.prepend(card);
  }
 }
