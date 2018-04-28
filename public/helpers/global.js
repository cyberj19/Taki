function getPartTime(time) {
    return (time < 10 ? '0' : '') + time.toString();
}

function toTimeString(seconds) {
    var timeSecs = parseInt(seconds % 60),
        timeMins = parseInt(seconds / 60);

    return getPartTime(timeMins) + ':' + getPartTime(timeSecs);
}

function addClass(object, className) {
    if (object.classList) {
        object.classList.add(className);
    }
    else {
        object.className += " " + className;
    }
}
function removeClass(object, className) {
    if (object.classList) {
        object.classList.remove(className);
    }
    else {
        object.className = object.className.replace(" " + className, "");
        object.className = object.className.replace(className, ""); // if the class is the first class
    }

}

var PLAYER_COUNT = 2;

var PLAYER_TYPE = 'player';
var COMPUTER_TYPE = 'computer';
var HEAP_TYPE = 'heap';