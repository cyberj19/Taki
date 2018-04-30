function Player(heap, stack) {
    Deck.call(this, heap, stack);
    var _this = this;

    this.playerType = PLAYER_TYPE;
    this.dialog = new Dialog();
    this._turn = 0;
    this.endFunction = function () {};
    addClass(this.deckElem, 'player');

    this.takiBtn = document.createElement('div');
    addClass(this.takiBtn, 'end-taki-btn');


    this.showColorDialog = function (cardIndex) {
        _this.dialog.open('Please choose a color:',
            '<div>    <input type="radio" id="dialog-color-choose-GREEN" name="color" value="green">\n' +
            '    <label for="dialog-color-choose-GREEN">GREEN</label>\n' +
            '    <input type="radio" id="dialog-color-choose-BLUE" name="color" value="blue">\n' +
            '    <label for="dialog-color-choose-BLUE">BLUE</label>\n' +
            '    <input type="radio" id="dialog-color-choose-YELLOW" name="color" value="yellow">\n' +
            '    <label for="dialog-color-choose-YELLOW">YELLOW</label>\n' +
            '    <input type="radio" id="dialog-color-choose-RED" name="color" value="red">\n' +
            '    <label for="dialog-color-choose-RED">RED</label></div>',
            function () {
                var selectedColor = _this.dialog.dialogContainer.querySelector('input[name="color"]:checked');

                if (!!selectedColor) {
                    _this.cards[cardIndex].color = selectedColor.value;
                    _this.dialog.close();
                    _this.putCardInHeap(cardIndex);
                }
            },
            false,
            function () {
                _this.dialog.close();
                removeClass(_this.cards[cardIndex].cardElm, 'chosen');
            })
    };


    this.chooseCard = function (event) {
        if (_this._turn) {
            var cardIndex = parseInt(event.target.dataset.key);
            addClass(event.target, 'chosen');

                if (_this.cards[cardIndex].type === CARDS.COLOR ) {
                    _this.showColorDialog(cardIndex);
                    return;
                }

            _this.putCardInHeap(cardIndex);
        }

    };

    this.cantPullCard = function () {
        _this.dialog.open('Can\'t pull a card right now',
            'You still have cards that you can use before pulling a new card', _this.dialog.close, true);
    };

    this.endTurn = function (endCard) {
        _this.cards.forEach(function (card) {
            removeClass(card.cardElm, 'active');
            removeClass(card.cardElm, 'off');
            card.cardElm.removeEventListener('click', _this.chooseCard);

            window.setTimeout(function () {
                removeClass(card.cardElm, 'in');
            }, 100);
            delete card.cardElm.dataset.key;
        });

        if (heap.takiMode) {
            _this.takiBtn.removeEventListener('click', _this.endTurn);
        }
        else {
            _this.stack.stackElm.removeEventListener('click', _this.pullCard);
            _this.stack.stackElm.removeEventListener('click', _this.cantPullCard);
            removeClass(_this.stack.stackElm.getElementsByClassName('card')[0], 'active');
            removeClass(_this.stack.stackElm.getElementsByClassName('card')[0], 'required');
        }
        _this._turn = 0;
       window.setTimeout(function() { _this.endFunction(endCard) }, 600);
    };

    this.turn = function (heap, endFunction) {
        var index = 0,
            anyCardEligible = false;
        _this._turn = 1;
        _this.endFunction = endFunction;
        _this.heap = heap;

        _this.cards.forEach(function (card) {
            if (heap.isCardEligible(card)) {
                addClass(card.cardElm, 'active');
                card.cardElm.dataset.key = index.toString();
                card.cardElm.addEventListener('click', _this.chooseCard);
                anyCardEligible = true;
            }
            else  {
                addClass(card.cardElm, 'off');
            }
            ++index;
        });

        if (heap.takiMode) {
            if (heap.card.type === CARDS.COLOR) {
                _this.endTurn();
                return;
            }
            _this.takiBtn.addEventListener('click', _this.endTurn);
        }
        else {
            Sound.tikBeep();
            _this.stack.stackElm.addEventListener('click', !anyCardEligible ? _this.pullCard : _this.cantPullCard);
            addClass( _this.stack.stackElm.getElementsByClassName('card')[0], 'active');
            !anyCardEligible && addClass(_this.stack.stackElm.getElementsByClassName('card')[0], 'required');
        }
    };
    this.renderPlayer = function () {
        _this.renderDeck();
        if (_this.heap.takiMode && _this._turn) _this.deckElem.appendChild(_this.takiBtn);
        return _this.deckElem;
    };
}

Player.prototype = Object.create(Deck.prototype);

Player.prototype.constructor = Player;
