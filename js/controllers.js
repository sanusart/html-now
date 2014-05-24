'use strict';

/* Controllers */

angular.module('htmlNow.controllers', [])
    .controller('Main', ['$scope', 'dataService', function ($scope, dataService) {
        $scope.welcome = 'Hello, Hello';
        $scope.tpl_html_title = 'My template';
        $scope.tpl_body_text = '<p>This is <b>my</b> text.</p>';
        $scope.tpl_meta_description = 'My template';
        $scope.tpl_meta_keywords = 'My, template, keywords';
        dataService.getLibs(function (libraries) {
            $scope.libs = libraries.data;
        });

        $scope.useScript = function (name) {
            $scope.id = name;
        };
    }]);
