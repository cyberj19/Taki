function sleep(ms) {
    var start = performance.now();
    while (performance.now() - start < ms);
}

function getPartTime(time) {
    return (time < 10 ? '0' : '') + time.toString();
}


var PLAYER_COUNT = 2;