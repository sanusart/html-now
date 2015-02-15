'use strict';

/* Controllers */

angular.module('htmlNow.controllers', ['ngRoute'])
    .controller('Main', ['$scope', 'dataService', '$route', '$filter', '$timeout', '$location', '$window', function ($scope, dataService, $route, $filter, $timeout, $location, $window) {
        $scope.welcome = 'Hello, Hello';
        $scope.tpl_html_title = 'My template';
        $scope.tpl_body_text = '<p>This is <b>my</b> text.</p>';
        $scope.tpl_meta_description = 'My template';
        $scope.date = new Date();
        dataService.getLibs(function (libraries) {
            $scope.libs = libraries.data;
        });

        $scope.useScript = function (name) {
            $scope.id = name;
            console.log('NAME CLICK', name);
        };

        $scope.bundle = function (query) {
            $location.path('/' + query);
        };

        if ($route.current && $route.current.params.names) {
            $timeout(function () {
                var savedLibs = $route.current.params.names.split('+');
                angular.forEach(savedLibs, function (savedLib) {
                    angular.element('.' + $filter('noSpace')(savedLib)).trigger("click");
                });
            }, 500, true);
        }

    }]);
