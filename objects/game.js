function Game() {
    this.heap = new Heap();
    this.stack = new Stack(this.heap);
    this.computer = new Computer(this.heap, this.stack);
    this.player = new Player(this.heap, this.stack);
    this.gameElement = document.getElementById('board');
    this.dialog = new Dialog();
    this._turn = 1;

    var _this = this;

    this.currPlayer = function () {
        return _this._turn ? _this.player : _this.computer;
    };
    this.nextTurn = function () {
        if (!this.currPlayer().cards.length) { // we have a winner
            this.dialog.open(this.currPlayer().playerType.toLocaleUpperCase() +  ' has win the game',
                '<div><strong>This is the game stats:</strong><br/>Click "OK" to restart</div>', function () {
                    _this.dialog.close();
                    _this.restartGame();
                }, true);
        }
        else {
            this.start();
        }
    };
    this.start = function () {
        (_this._turn ? _this.player : _this.computer).turn(_this.heap, _this.nextTurn.bind(_this));
        _this.renderGame();
    };

    this.renderGame = function () {
        _this.gameElement.innerHTML = '';
        _this.gameElement.appendChild(_this.computer.renderDeck());
        _this.gameElement.appendChild(_this.player.renderDeck());
        _this.gameElement.appendChild(_this.stack.renderStack());
        _this.gameElement.appendChild(_this.heap.renderHeap());
    };



    this.restartGame = function () {
        _this.heap = new Heap();
        _this.stack = new Stack(this.heap);
        _this.computer = new Computer(this.heap, this.stack);
        _this.player = new Player(this.heap, this.stack);
        _this._turn = 1;

        _this.initGame();

    };
    this.initGame = function () {
        _this.heap.putCard(_this.stack.getCard('heap'));

        for (var i = 0; i < 8; ++i) {
            _this.computer.putCard(_this.stack.getCard('computer'));
            _this.player.putCard(_this.stack.getCard('player'));
        }

        _this.start();
    };
}

