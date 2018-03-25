function Stats() {
    this.startTime = performance.now();
    this.lastLap = performance.now();
    this.gameStats = [];
    this.gamesAvarageTime = [];

    this.cloackElm = document.getElementsByClassName('clock')[0];

    var _this = this;

    this.renderClock = function () {
        var passTime = (performance.now() - _this.startTime) / 1000;
        _this.cloackElm.innerHTML = toTimeString(passTime) + '<hr/>' + (_this.gameStats.length + 1);

        return _this.cardElm;
    };

    this.endGame = function () {
        var sumObj = {};
        _this.gameStats.forEach(function (stat) {
            if (!sumObj[stat.playerType]) sumObj[stat.playerType] = {};

            sumObj[stat.playerType] = {
                oneCardTotal: (sumObj[stat.playerType].oneCardTotal || 0) + (stat.cards === 1 ? 1 : 0),
                playerTotalTime: (sumObj[stat.playerType].playerTotalTime || 0) + stat.time,
                playerTotalMoves: (sumObj[stat.playerType].playerTotalMoves || 0) + 1,
                playerAverageTime: sumObj[stat.playerType].playerTotalTime / sumObj[stat.playerType].playerTotalMoves
            }
        });
        sumObj.totalMoves = _this.gameStats.length;
        sumObj.gameTime = performance.now() - _this.startTime;
        _this.gamesAvarageTime.push(sumObj.player ? sumObj.player.playerAverageTime : sumObj.gameTime);

        console.log(sumObj);
        return sumObj;
    };
}

Stats.prototype.clearStats = function () {
    this.startTime = performance.now();
    this.lastLap = performance.now();
    this.gameStats = [];
};

Stats.prototype.endLap = function (player) {
    var currTime = performance.now(),
        lapStat = {
            playerType: player.playerType,
            cards: player.cards.length,
            time: currTime - this.lastLap
        };
    this.lastLap = currTime;
    this.gameStats.push(lapStat);
};