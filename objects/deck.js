function Deck(heap, stack) {
    this.cards = [];
    this.heap = heap;
    this.stack = stack;
    this.playerType = '';
    this._turn = 0;

    this.endFunction = function () {};
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

    this.putCardInHeap = function(cardIndex) {
        var endCard = __this.cards[cardIndex];
        __this.heap.putCard(endCard);
        __this.cards.splice(cardIndex, 1);
        __this.endTurn(endCard);
    };

    this.pullCard = function () {
        if (!!__this._turn && !__this.heap.takiMode) {
            var card = __this.stack.getCard(__this.playerType);
            __this.playerType === 'player' && card.cardElm.classList.add('in');
            __this.cards.push(card);
            __this.endTurn();
        }
    };

    this.putCard = function (card)  {
        if (!!card.type) {
            __this.cards.push(card);
            __this.deckElem.innerHTML = '';
        }
    };
}