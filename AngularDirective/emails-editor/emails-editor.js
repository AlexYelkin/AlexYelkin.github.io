"use strict";
myApp.directive("emailsEditor", function () {
    var result = {
        scope: {
            emails: "=",
            boardTitle: "="
        },
        restrict: "E",
        bindToController: true,
        controller: function ($scope) {
            $scope.title = "Share \"" +  this.boardTitle + "\" with others";
            function validateEmail(email) {
                // простейшая валидация
                var re = /\S+@\S+\.\S+/;
                return re.test(email);
            };

            function parseData(addedText) {
                var data = addedText.trim();
                var newEmails = data.split(",");
                newEmails.forEach(function (newEmail) {
                    if (newEmail) {
                        var isValid = validateEmail(newEmail);
                        $scope.$applyAsync(function () {
                            $scope.editorCtrl.emails.push({ val: newEmail, isValid: isValid });
                        });
                    }
                });
            };

            this.remove = function (email, $event) {
                var index = this.emails.indexOf(email);
                this.emails.splice(index, 1);
                $event.preventDefault();
                $event.stopPropagation();
            };

            this.onKeyDown = function ($event) {
                //TODO: добавить обработку запятой из русской локали
                if ($event.keyCode === 13
                    || $event.keyCode === 188 && !$event.shiftKey) {
                    $event.preventDefault();
                    var element = $event.srcElement;
                    var addedText = element.value;
                    element.value = "";
                    parseData(addedText);
                }
            };

            this.onBlur = function ($event) {
                $event.preventDefault();
                var element = $event.srcElement;
                var addedText = element.value;
                element.value = "";
                parseData(addedText);
            };

            this.onPaste = function ($event) {
                setTimeout(function () {
                    var element = $event.srcElement;
                    var addedText = element.value;
                    element.value = "";
                    parseData(addedText);
                }, 10);
            };
        },
        controllerAs: "editorCtrl",
        templateUrl: "emails-editor/emails-editor.html",
        link: function ($scope, $element, attr) {
            // по клику в любую область фокусируем на поле ввода.
            $element.on("click", function () {
                var inputNode = $element.find("input")[0];
                inputNode.focus();
            });
        }
    };

    return result;
});