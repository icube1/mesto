export default class Section{
  constructor(renderer, cardContainer) {
    // this._items = data.items;
    this._renderer = renderer;
    this._container = cardContainer;
  }
  addCard(card) {
    this._container.prepend(card);
  }
  addInitialCards(cards) {//Так и не понял как правильно сделать добавление отдельно, но к следующей итерации постараюсь разобраться
    cards.forEach((item) => {
      const cardsArray = this._renderer(item)
      this._container.append(cardsArray)
    });
  }
 }
