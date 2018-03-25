function Stack(heap) {
    // constructor
    this.stack = [];
    this._heap = heap;
    this.sampleCard = new Card();

    this.stackElm = document.createElement('div');
    this.stackElm.className = 'pack stack';
    this.stackElm.appendChild(this.sampleCard.renderCard('stack'));
}

Stack.prototype.setStack = function () {
    if (!!this.stack.length) return;

    if (!!this._heap.heap.length) {
        this.stack = this._heap.getHeap();
    }
    else {
        var tmpStack = [];
        for (var i = 0; i < 2; ++i) {
            regularCards().forEach(function (type) {
                cardsColors().forEach(function (color) {
                    var tmpCard = new Card(type, color);
                    tmpStack.push(tmpCard);
                });
            });
        }

        for (var j = 0; j < 4; ++j) {
            unColoredCards().forEach(function (type) {
                var tmpCard = new Card(type);
                tmpStack.push(tmpCard);
            });
        }
        this.stack  = tmpStack;
    }
};

Stack.prototype.getCard = function (rquire) {
    this.setStack();
    if (!!this.stack.length) {
        var cardLoc = Math.ceil(Math.random() * (this.stack.length - 1)); // Every day we shuffeling
        while (rquire === 'heap' && unColoredCards().indexOf(this.stack[cardLoc].type) > -1) {
            cardLoc = Math.ceil(Math.random() * (this.stack.length - 1));
        }
        var newCard = new Card(this.stack[cardLoc].type, this.stack[cardLoc].color);
        this.stack.splice(cardLoc, 1);
        return newCard;
    }
    return null;
};

Stack.prototype.renderStack = function () {
    return this.stackElm;
};