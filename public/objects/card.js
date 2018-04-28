function Card(type, color) {
    this.type = type;
    this.color = color || UCOLORED_COLOR;

    this.cardElm = document.createElement('div');
    this.cardElm.className = 'card';
}

Card.prototype.renderCard = function (require) {
    if ([PLAYER_TYPE, HEAP_TYPE].indexOf(require) > -1) {
        this.cardElm.dataset.color = this.color;
        this.cardElm.dataset.type  = this.type ;
    }
    else {
        delete this.cardElm.dataset.color;
        delete this.cardElm.dataset.type;
    }

    return this.cardElm;
};