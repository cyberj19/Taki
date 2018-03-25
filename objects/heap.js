function Heap() {
    this.card = new Card();
    this.heap = [];
    this.takiMode = false;

    this.heapElm = document.createElement('div');
    this.heapElm.className = 'pack heap';
    
    var _this = this;

    this.isCardEligible = function (card) {
        return _this.takiMode ? card.color === _this.card.color : !(!!_this.card.type
            && unColoredCards().indexOf( card.type ) === -1
            && card.type !== _this.card.type
            && card.color !== _this.card.color);
    };

    this.putCard = function (card) {
        if (!_this.isCardEligible(card)) return false;

        var newCard = new Card(card.type, card.color),  // to avoid object reference
            oldCard = new Card(_this.card.type, _this.card.color);  // to avoid object reference
        oldCard.type && _this.heap.push(oldCard);
        _this.card = newCard;

        return true;
    };

    this.renderHeap = function () {
        if (!!_this.card.type) {
            _this.heapElm.innerHTML = '';
            _this.heapElm.appendChild(_this.card.renderCard('heap'));
        }

        return _this.heapElm;
    };

    this.getHeap = function () {
        var newHeap = _this.heap.slice(0);
        _this.heap = [];
        return newHeap;
    };
}