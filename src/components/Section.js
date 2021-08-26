export default class Section{
  constructor(renderer, cardContainer) {
    this._renderer = renderer;
    this._container = cardContainer;
  }
  addCard(card) {
    this._container.append(card);
    
  }
  addInitialCards(cards) {
    cards.forEach((item) => {
     this._renderer(item)
    });
  }
 }
