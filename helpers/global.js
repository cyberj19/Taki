function getPartTime(time) {
    return (time < 10 ? '0' : '') + time.toString();
}

function toTimeString(seconds) {
    var timeSecs = parseInt(seconds % 60),
        timeMins = parseInt(seconds / 60);

    return getPartTime(timeMins) + ':' + getPartTime(timeSecs);

}

var PLAYER_COUNT = 2;