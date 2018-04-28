

function Computer(heap, stack) {
    Deck.call(this, heap, stack);

    this.playerType = 'computer';
    this.deckElem.classList.add('opp');
}

Computer.prototype = Object.create(Deck.prototype);
Computer.prototype.constructor = Computer;

Computer.prototype.turn = function (heap, endFunction) {
    !heap.takiMode && Sound.tik();
    this._turn = 1;
    this.endFunction = endFunction;
    var maxScore = -1;
    var priorityIndex = -1;
    for(var index = 0; index < this.cards.length; ++index){
        var currCard = this.cards[index];
        if (!heap.isCardEligible(currCard)) continue;

        var currScore = this.cardScore(currCard, heap);

        if (currScore > maxScore) {
            maxScore = currScore;
            priorityIndex = index;
        }
    }

    if (maxScore === -1) {
        if (heap.takiMode) {
            this.endTurn();
        }
        else this.pullCard();
        return;
    }
    var priorityCard = this.cards[priorityIndex];

    if (priorityCard.type === CARDS.COLOR) {
        var colors = cardsColors();
        priorityCard.color = colors[Math.floor(Math.random() * colors.length)];
    }

    this.putCardInHeap(priorityIndex);
};

Computer.prototype.endTurn = function (endCard) {
    var _this = this;
    window.setTimeout(function () {
        _this._turn = 0;
        _this.endFunction(endCard);
    }, 1000);
};

Computer.prototype.cardScore = function(card, heap) { // this function runs for eligible cards only
    if (card.type === CARDS.COLOR) return 0; // We want the computer to use "Change color" only if all other options been used
    if (card.type === CARDS.STOP) return 5;
    if (card.type === CARDS.PLUS) return this.cards.length === 2 ? 7 : 4;  // if 2 cards remains i prefer to use the plus now and not in the last turn
    if (card.type === CARDS.TAKI) return 6;
    if (card.color === heap.card.color) return 2;
    return 1;
};
