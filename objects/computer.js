function Computer(heap, stack) {
    Deck.call(this, heap, stack);

    this.playerType = 'computer';
    this.deckElem.className = this.deckElem.className + ' opp';
}

Computer.prototype = Object.create(Deck.prototype);
Computer.prototype.constructor = Computer;

Computer.prototype.turn = function (heap, endFunction) {
    var availableCards = [],
        index = 0;


    this._turn = 1;

    this.endFunction = endFunction;
    this.cards.forEach(function (card) {
        if (heap.isCardEligible(card) && card.type !== 'COLOR')  // temporary role not to choose color card
        {
            availableCards.push(index);
        }
        ++index;
    });

    if (!!availableCards.length) {
        this.putCardInHeap(availableCards[0]);
    }
    else {
        if (heap.takiMode) {
            this.endTurn();
        }
        else this.pullCard();
    }
};

Computer.prototype.endTurn = function (endCard) {
    this._turn = 0;
    this.endFunction(endCard);
};