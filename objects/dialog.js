function Dialog() {
    var _this = this;
    this.approveFn = function () {    };
    this.dialogContainer = document.getElementById('dialog');

    this.close = function() {
        _this.dialogContainer.getElementsByClassName('dialog__buttons')[0].innerHTML += '';
        _this.dialogContainer.className = _this.dialogContainer.className.replace(' open', '');


        _this.dialogContainer.getElementsByClassName('approve')[0].removeEventListener('click', _this.approveFn);
        _this.dialogContainer.getElementsByClassName('cancel')[0].removeEventListener('click',  _this.close);
    };
    this.open = function(title, description, approveFunction) {
        if (!title || !description || !approveFunction) return;
        _this.approveFn = approveFunction;
        _this.dialogContainer.getElementsByClassName('dialog__title')[0].innerText = title;
        _this.dialogContainer.getElementsByClassName('dialog__description')[0].innerHTML = description;

        _this.dialogContainer.getElementsByClassName('approve')[0].addEventListener('click', _this.approveFn);
        _this.dialogContainer.getElementsByClassName('cancel')[0].addEventListener('click', _this.close);

        _this.dialogContainer.className = this.dialogContainer.className + ' open';
    };
}
