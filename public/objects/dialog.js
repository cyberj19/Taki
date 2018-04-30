function Dialog() {
    var _this = this;
    this.approveFn = function () {    };
    this.dialogContainer = document.getElementById('dialog');

    this.close = function() {
        removeClass(_this.dialogContainer, 'open');

        _this.dialogContainer.getElementsByClassName('approve')[0].removeEventListener('click', _this.approveFn);
        _this.dialogContainer.getElementsByClassName('cancel')[0].removeEventListener('click',  _this.close);
    };
    this.open = function(title, description, approveFunction, noCancel, cancelFn) {
        if (!title || !description || !approveFunction) throw 'missing arguments';
        var cancelBtn = _this.dialogContainer.getElementsByClassName('cancel')[0],
            approveBtn = _this.dialogContainer.getElementsByClassName('approve')[0];

        _this.approveFn = approveFunction;
        _this.dialogContainer.getElementsByClassName('dialog__title')[0].innerText = title;
        _this.dialogContainer.getElementsByClassName('dialog__description')[0].innerHTML = description;

        approveBtn.addEventListener('click', _this.approveFn);
        !noCancel && cancelBtn.addEventListener('click', cancelFn || _this.close);
        noCancel ? addClass(cancelBtn, 'hidden') : removeClass(cancelBtn, 'hidden');

        addClass(_this.dialogContainer, 'open');
    };
}
