function Stack(heap) {
    // constructor
    this.stack = [];
    this._heap = heap;
    this.sampleCard = new Card();

    this.stackElm = document.createElement('div');
    this.stackElm.className = 'pack stack';
}

Stack.prototype.setStack = function () {
    if (!!this.stack.length) return; // if stack isn't empty no need to set it again

    if (!!this._heap.heap.length) { // if there is a heap already it will take the heap (and leave there only the top card)
        this.stack = this._heap.getHeap();
    }
    else { // there is a need to create a new stack from the constants
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
        var cardLoc = Math.ceil(Math.random() * (this.stack.length - 1)); // Every pull we shuffeling
        while (rquire === HEAP_TYPE && unColoredCards().indexOf(this.stack[cardLoc].type) > -1) {
            cardLoc = Math.ceil(Math.random() * (this.stack.length - 1));
        }
        var newCard = new Card(this.stack[cardLoc].type, this.stack[cardLoc].color);
        this.stack.splice(cardLoc, 1);
        return newCard;
    }
    return null;
};

Stack.prototype.renderStack = function () {
    this.stackElm.innerHTML = '';
    this.stackElm.appendChild(this.sampleCard.renderCard('stack'));
    return this.stackElm;
};