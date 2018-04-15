function Computer(heap, stack) {
    Deck.call(this, heap, stack);

    this.playerType = 'computer';
    this.deckElem.classList.add('opp');
}

Computer.prototype = Object.create(Deck.prototype);
Computer.prototype.constructor = Computer;

Computer.prototype.turn = function (heap, endFunction) {

    console.log('COMPUTER TURN');
    !heap.takiMode && Sound.tik();
    this._turn = 1;
    this.endFunction = endFunction;

    let maxScore = -1;
    let priorityIndex = -1;
    for(let index = 0; index < this.cards.length; ++index){
        let currCard = this.cards[index];
        if (!heap.isCardEligible(currCard)) {
            console.log('Card #' + index + ': ', currCard.type, currCard.color, 'ILLEGAL');
            continue;
        }

        let currScore = cardScore(currCard, heap);

        console.log('Card #' + index + ': ', currCard.type, currCard.color, 'Score', currScore);
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
    let priorityCard = this.cards[priorityIndex];

    if (priorityCard.type === 'COLOR') {
        let colors = cardsColors();
        priorityCard.color = colors[Math.floor(Math.random() * colors.length)];
    }

    console.log('Selected:',priorityCard.type, priorityCard.color);
    this.putCardInHeap(priorityIndex);
};

Computer.prototype.endTurn = function (endCard) {
    var _this = this;
    window.setTimeout(function () {
        _this._turn = 0;
        _this.endFunction(endCard);

    }, 1000);
};

var cardScore = function(card, heap) { // this function runs for eligible cards only
    if (card.type === "COLOR") return 6;
    if (card.type === "STOP") return 5;
    if (card.type === "+") return 4;
    if (card.type === "TAKI") return 3;
    if (card.color === heap.color) return 2;
    return 1;
};