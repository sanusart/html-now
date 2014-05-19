'use strict';

/* Controllers */

angular.module('htmlNow.controllers', [])
    .controller('Main', ['$scope', function ($scope) {
        $scope.welcome = 'Hello, Hello';
        $scope.tpl_html_title ='My template';
        $scope.tpl_body_text = '<p>This is <b>my</b> text.</p>';
        $scope.tpl_meta_description = 'My template';
        $scope.tpl_meta_keywords = 'My, template, keywords';
        $scope.useScript = function (type, name) {
            $scope.type = type;
            $scope.name = name;
        };
    }]);
