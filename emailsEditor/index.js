"use strict";
angular.module("MyApp", ["MyApp.emailsEditor"]).controller("MainController", ["$scope", function ($scope) {
    $scope.mails = [ "sidorov@mail.ru" ];

    $scope.dashName = "Board name";

    this.getCount = function () {
        var count = $scope.mails.length;
        alert("count: " + count);
    };

    this.addMail = function () {
        var randomStr = Math.random().toString(36);
        randomStr = randomStr.substring(randomStr.length - 6);
        var mail = randomStr + "@mail.com";
        $scope.mails.push(mail);
    };
}]);