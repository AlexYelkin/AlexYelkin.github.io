"use strict";
function EmailsEditorController ($scope) {
    this.$scope = $scope;
    $scope.title = "Share \"" + this.boardTitle + "\" with others";
    $scope.$watch("editorCtrl.boardTitle", function () {
        $scope.title = "Share \"" + (this.boardTitle || "") + "\" with others";
    }.bind(this));

    this.validatedEmails = [];
    this.emails.forEach(function (email) {
        var isValid = this.validateEmail(email);
        this.validatedEmails.push({ val: email, isValid: isValid });
    }, this);

    $scope.$watchCollection("editorCtrl.emails", this.onEmailsChanged.bind(this));
}

EmailsEditorController.prototype.onEmailsChanged = function (newEmails) {
    var validatedEmails = this.validatedEmails;
    // убираем удаленные адреса
    validatedEmails.forEach(function (validatedEmail, index) {
        var founded = newEmails.some(function (item) {
            return item === validatedEmail.val;
        });
        if (!founded) {
            validatedEmails.splice(index, 1);
        }
    });
    // добавляем новые адреса
    newEmails.forEach(function (email) {
        var founded = validatedEmails.some(function (item) {
            return item.val === email;
        });
        if (!founded) {
            var isValid = this.validateEmail(email);
            validatedEmails.push({ val: email, isValid: isValid });
        }
    }, this);
};

EmailsEditorController.prototype.onKeyDown = function ($event) {
    //TODO: добавить обработку запятой из русской локали
    if ($event.keyCode === 13
        || $event.keyCode === 188 && !$event.shiftKey) {
        $event.preventDefault();
        var element = $event.target;
        var addedText = element.value;
        element.value = "";
        this.parseData(addedText);
    }
};

EmailsEditorController.prototype.validateEmail = function (email) {
    // простейшая валидация
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
};

EmailsEditorController.prototype.parseData = function (addedText) {
    var data = addedText.trim();
    var newEmails = data.split(",");
    newEmails.forEach(function (newEmail) {
        if (newEmail) {
            var isValid = this.validateEmail(newEmail);
            this.$scope.$applyAsync(function () {
                this.validatedEmails.push({ val: newEmail, isValid: isValid });
                this.emails.push(newEmail);
            }.bind(this));
        }
    }, this);
};

EmailsEditorController.prototype.onBlur = function ($event) {
    $event.preventDefault();
    var element = $event.srcElement;
    var addedText = element.value;
    element.value = "";
    this.parseData(addedText);
};

EmailsEditorController.prototype.remove = function (email, $event) {
    var index = this.validatedEmails.indexOf(email);
    this.validatedEmails.splice(index, 1);
    this.emails.splice(index, 1);
    $event.preventDefault();
    $event.stopPropagation();
};

EmailsEditorController.prototype.onPaste = function ($event) {
    setTimeout(function () {
        var element = $event.srcElement;
        var addedText = element.value;
        element.value = "";
        this.parseData(addedText);
    }, 10);
}; 