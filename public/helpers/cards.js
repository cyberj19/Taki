// card helper file
// That file define the available cards for each group
// each group is in a function to avoid referred arrays

var CARDS = {
  STOP: "STOP",
  TAKI: "TAKI",
  PLUS: "+",
  COLOR: "COLOR"
};

var regularCards = function() { return [
    "1", "3", "4", "5", "6", "7", "8", "9", CARDS.PLUS, CARDS.STOP, CARDS.TAKI
]};

var unColoredCards = function () { return [
  CARDS.COLOR
]};
var cardsColors = function () { return [
  "red", "blue", "green", "yellow"
]};

var UCOLORED_COLOR = "none";