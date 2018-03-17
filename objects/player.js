function Player(heap, stack) {
    Deck.call(this, heap, stack);
    var _this = this;

    this.playerType = 'player';
    this._turn = 0;
    this.endFunction = function () {};
    this.deckElem.classList.add('player');

    this.pullCard = function () {
        if (!!_this._turn) {
            var card = _this.stack.getCard('player');
            card.cardElm.classList.add('in');
            _this.cards.push(card);
            _this.endTurn();

        }
    };
    this.chooseCard = function (event) {
        if (_this._turn) {
            var cardIndex = parseInt(event.target.dataset.key);
            _this.heap.putCard(_this.cards[cardIndex]);
            _this.cards.splice(cardIndex, 1);
            _this.endTurn();
        }

    };
    this.endTurn = function () {
        _this.cards.forEach(function (card) {
            card.cardElm.classList.remove('active');
            card.cardElm.classList.remove('off');
            card.cardElm.removeEventListener('click', _this.chooseCard);
            delete card.cardElm.dataset.key;
        });
        _this.stack.stackElm.removeEventListener('click', _this.pullCard);

        _this._turn = 0;
        _this.endFunction();

    };
    this.turn = function (heap, endFunction) {
        var index = 0;
        _this._turn = 1;
        _this.endFunction = endFunction;

        _this.heap = heap;
        _this.stack.stackElm.addEventListener('click', _this.pullCard);
        _this.cards.forEach(function (card) {
            if (heap.isCardEligible(card)) {
                card.cardElm.classList.add('active');
                card.cardElm.dataset.key = index.toString();
                card.cardElm.addEventListener('click', _this.chooseCard);
            }
            else  {
                card.cardElm.classList.add('off');
            }
            ++index;
        });

    };
}


Player.prototype = Object.create(Deck.prototype);

Player.prototype.constructor = Player;
