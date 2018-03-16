function Computer(heap) {
    Deck.apply(this, heap);

    this.playerType = 'computer';
    this.deckElem.className = this.deckElem.className + ' opp';
}

Computer.prototype = Object.create(Deck.prototype);
Computer.prototype.constructor = Computer;

Computer.prototype.turn = function () {
    
};