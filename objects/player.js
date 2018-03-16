function Player(heap) {
    Deck.call(this, heap);

    this.playerType = 'player';
    this.deckElem.classList.add('player');
    var _this = this;

    this.pullCard = function (endFunction) {
        var card = _this.heap.getCard('player');
        card.cardElm.classList.add('in');
        _this.cards.push(card);

    };
    this.chooseCard = function (cardIndex, endFunction, heap, callee) {
        heap.putCard(_this.cards[cardIndex]);
        _this.cards.splice(cardIndex, 1);
        _this.endTurn(endFunction, callee);

    };
    this.endTurn = function (endFunction, callee) {
        _this.cards.forEach(function (card) {
            card.cardElm.classList.remove('active');
            card.cardElm.classList.remove('off');
            card.cardElm.removeEventListener('click', callee, false);
        });

        endFunction();
    };

    this.turn = function (heap, endFunction) {
        var index = 0;
        _this.heap = heap;
        _this.cards.forEach(function (card) {
            var m = index;
            if (heap.isCardEligible(card)) {
                card.cardElm.classList.add('active');
                card.cardElm.addEventListener('click', function() {_this.chooseCard(m, endFunction, heap,arguments.callee)});

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
