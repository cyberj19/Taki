function Deck(heap, stack) {
    this.cards = [];
    this.heap = heap;
    this.stack = stack;
    this.playerType = '';

    this.deckElem = document.createElement('div');
    this.deckElem.className = 'deck';
    var __this = this;

    this.renderDeck = function () {
        __this.deckElem.innerHTML = '';
        __this.cards.forEach(function(card) {
            __this.deckElem.appendChild(card.renderCard(__this.playerType));
        });
        return __this.deckElem;
    };
    this.putCard = function (card)  {
        if (!!card.type) {
            __this.cards.push(card);
            __this.deckElem.innerHTML = '';
        }
    };

}

