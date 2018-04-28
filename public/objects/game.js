function Game() {
    this.heap = new Heap();
    this.stack = new Stack(this.heap);
    this.computer = new Computer(this.heap, this.stack);
    this.player = new Player(this.heap, this.stack);
    this.gameElement = document.getElementById('board');
    this.dialog = new Dialog();
    this.stats = new Stats();
    this.statsInterval = window.setInterval(this.stats.renderClock, 250);
    this._turn = 1;

    var _this = this;

    this.currPlayer = function () {
        return _this._turn ? _this.player : _this.computer;
    };
    this.gameOver = function () {
        var winner = _this.player.cards.length ? _this.computer : _this.player,
            statsObj = _this.stats.endGame();

        window.clearInterval(this.statsInterval);

        _this.dialog.open(winner.playerType.toLocaleUpperCase() +  ' has win the game',
             this.statsView(statsObj) + '<br/><br/>Click "OK" to restart' +
            (winner.playerType === _this.player.playerType ? '<div class="pyro"/>' : '')
            , function () {
                _this.dialog.close();
                _this.restartGame();
            }, true);
    };

    this.statsView = function (statsObj) {
        var averageTime = 0,
            playerObj = statsObj.player || {},
            compObj = statsObj.computer || {},
            gameTimeInSec = statsObj.gameTime / 1000,
            statsTableObj = [{
                playerType: 'stats',
                oneCardTotal: 'Total times that had 1 card',
                playerAverageTime: 'Average time per turn',
                playerTotalMoves: 'Total moves'
            }],
            statsContent = '';

        playerObj.playerType = PLAYER_TYPE;
        compObj.playerType = COMPUTER_TYPE;

        statsTableObj.push(playerObj);
        statsTableObj.push(compObj);

        statsTableObj.forEach(function(stats) {
            statsContent += _this.playerStats(stats);
        });

        _this.stats.gamesAvarageTime.forEach(function (time) {
            averageTime += time;
        });
        if (!!_this.stats.gamesAvarageTime.length) averageTime /= _this.stats.gamesAvarageTime.length;

        return '<div><strong>This game played ' + parseInt(gameTimeInSec / 60) + ' minutes and ' + parseInt(gameTimeInSec % 60) + ' seconds during ' + statsObj.totalMoves + ' turns.</strong><br/>'
            + statsContent
            + (averageTime && '<br/><br/>Your\'s average time per loop in all your games is: ' + toTimeString(averageTime / 1000).toString())

    };

    this.playerStats = function (statsObject) {
        return '<ul class="player-stats ' + statsObject.playerType + '">' +
            '<li>' + (statsObject.playerType || '0' )+ '</li>' +
            '<li>' + (statsObject.oneCardTotal || '0' ) + '</li>' +
            '<li>' +  (typeof statsObject.playerAverageTime === 'string' ?
            statsObject.playerAverageTime :
                toTimeString( (statsObject.playerAverageTime || 0) / 1000))
            + '</li>' +
            '<li>' + (statsObject.playerTotalMoves || '0') + '</li>' +
            '</ul>';
    };

    this.nextTurn = function (lastCard) {
        _this.stats.endLap(this.currPlayer());

        if (!this.currPlayer().cards.length && lastCard.type !== CARDS.PLUS) { // we have a winner
            this.gameOver()
        }
        else {
            if (lastCard && !lastCard.target) {  // Colored Action cards
                if (lastCard.type === CARDS.TAKI) {
                    this.heap.takiMode = true;
                }
                if (lastCard.type === CARDS.STOP && !this.heap.takiMode) {
                    this._turn = (this._turn + 1) % PLAYER_COUNT;
                }
                if (lastCard.type === CARDS.PLUS && !this.heap.takiMode) {
                    this._turn = (this._turn - 1) % PLAYER_COUNT; // Decrease the turn cuz soon it will be increased
                }
                if (this.heap.takiMode && lastCard.type === CARDS.COLOR) {
                    this.heap.takiMode = false;
                }
            }
            else { // TAKI finished or user took a card
                if (this.heap.takiMode) {
                    this.heap.takiMode = false;
                    if (this.heap.card.type !== CARDS.TAKI) {
                        _this.nextTurn(this.heap.card);
                        return;
                    }
                }
            }
            this._turn = this.heap.takiMode ? this._turn : ((this._turn + 1) % PLAYER_COUNT);
            this.renderGame();
            window.setTimeout(function () {
                _this.start();
            }, this.heap.takiMode ? 0 : 550);

        }
    };

    this.start = function () {
        _this.renderGame();
        _this.currPlayer().turn(_this.heap, _this.nextTurn.bind(_this));
        _this.renderGame();
    };

    this.renderGame = function () {
        _this.gameElement.innerHTML = '';
        _this.gameElement.appendChild(_this.computer.renderDeck());
        _this.gameElement.appendChild(_this.player.renderPlayer());
        _this.gameElement.appendChild(_this.stack.renderStack());
        _this.gameElement.appendChild(_this.heap.renderHeap());
    };

    this.restartGame = function () {
        _this.heap = new Heap();
        _this.stack = new Stack(this.heap);
        _this.computer = new Computer(this.heap, this.stack);
        _this.player = new Player(this.heap, this.stack);
        _this._turn = 1;
        _this.stats.clearStats();
        _this.statsInterval = window.setInterval(this.stats.renderClock, 250);

        _this.initGame();
    };
    this.initGame = function () {
        _this.heap.putCard(_this.stack.getCard(HEAP_TYPE));

        for (var i = 0; i < 8; ++i) {
            _this.computer.putCard(_this.stack.getCard(COMPUTER_TYPE));
            _this.player.putCard(_this.stack.getCard(PLAYER_TYPE));
        }

        _this.start();
    };
}