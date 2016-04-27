"use strict";
angular.module("MyApp.emailsEditor", []).directive("emailsEditor", function () {
    var result = {
        scope: {
            emails: "=",
            boardTitle: "="
        },
        restrict: "E",
        bindToController: true,
        controller: EmailsEditorController,
        controllerAs: "editorCtrl",
        templateUrl: "emails-editor/emails-editor.html",
        link: function ($scope, $element) {
            // по клику в любую область фокусируем на поле ввода.
            $element.on("click", function () {
                var inputNode = $element.find("input")[0];
                inputNode.focus();
            });
        }
    };

    return result;
});