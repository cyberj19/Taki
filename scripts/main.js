(function() {
    // Document Ready
    var restartBtn = document.getElementsByClassName('restart')[0],
        _dialog = new Dialog(),
        _game = new Game();

    restartBtn.addEventListener('click', function () {
        _dialog.open('Are you sure that you want to restart the game?'
            , 'If you restart the game, the current game will <strong>deleted</strong>',
            function () {
                _dialog.close();
                _game.gameOver();
            })
    });
    _game.initGame();

})();
