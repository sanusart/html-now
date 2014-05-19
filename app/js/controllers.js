'use strict';

/* Controllers */

angular.module('htmlNow.controllers', [])
    .controller('Main', ['$scope', function ($scope) {
        $scope.welcome = 'Hello, Hello';
        $scope.useScript = function (type, name) {
            $scope.type = type;
            $scope.name = name;
        };
    }]);
