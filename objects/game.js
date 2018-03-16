function Game() {
    this.heap = new Heap();
    this.stack = new Stack(this.heap);
    this.computer = new Computer(this.heap);
    this.player = new Player(this.heap);
    this.gameElement = document.getElementById('board');
    this._turn = 1;

    var _this = this;

    this.start = function () {
        (_this._turn ? _this.player : _this.computer).turn(_this.heap, _this.start.bind(_this));
        _this.renderGame();
    };

    this.renderGame = function () {
        _this.gameElement.innerHTML = '';
        _this.gameElement.appendChild(_this.computer.renderDeck());
        _this.gameElement.appendChild(_this.player.renderDeck());
        _this.gameElement.appendChild(_this.stack.renderStack());
        _this.gameElement.appendChild(_this.heap.renderHeap());
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

