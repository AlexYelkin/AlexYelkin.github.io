"use strict";
var myApp = angular.module("MyApp", []);

myApp.controller('MainController', ['$scope', function ($scope) {
    $scope.mails = [
        { val: "sidorov@mail.ru", isValid: true }//,
        //{ val: "egorov@google.com", isValid: true },
        //{ val: "test", isValid: false }
    ];

    $scope.dashboardName = "Board name";

    this.getCount = function (evt) {
        var count = $scope.mails.length;
        alert("count: " + count);
    };

    this.addMail = function (evt) {
        var randomStr = Math.random().toString(36).substring(12);
        var mail = randomStr + "@mail.com";
        $scope.mails.push({ val: mail, isValid: true });
    };
}]);