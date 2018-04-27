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

    var maxScore = -1;
    var priorityIndex = -1;
    for(var index = 0; index < this.cards.length; ++index){
        var currCard = this.cards[index];
        if (!heap.isCardEligible(currCard)) {
            console.log('Card #' + index + ': ', currCard.type, currCard.color, 'ILLEGAL');
            continue;
        }

        var currScore = cardScore(currCard, heap);

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
    var priorityCard = this.cards[priorityIndex];

    if (priorityCard.type === 'COLOR') {
        var colors = cardsColors();
        var maxColorScore=0;
        var maxColorIndex=-1;
        var colorIndex=0
        for (var color in colors){
            var currColorScore=colorScore(colors[color],this.cards);
            if(currColorScore > maxColorScore){
                maxColorScore=currColorScore;
                maxColorIndex=colorIndex;
            }
            ++colorIndex;
            console.log("color:"+colors[color] +", score:"+currColorScore+"\n");
        }
        if(maxColorIndex===-1) {
            priorityCard.color = colors[Math.floor(Math.random() * colors.length)];
        }
        else{
            priorityCard.color= colors[maxColorIndex];
        }
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
    if (card.type === "STOP") return 6;
    if (card.type === "+") return 5;
    if (card.type === "TAKI") return 4;
    if (card.color === heap.card.color) return 3;
    if (card.type === "COLOR") return 1;
    return 2;
};



var colorScore = function(color, cards) {
    var colorScore=0;
    for(var card in cards){
        if (cards[card].color===color) colorScore++;
    }
    return colorScore;
};