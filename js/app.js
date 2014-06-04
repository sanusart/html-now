'use strict';

angular.module('htmlNow', [
    'ngRoute',
    'htmlNow.filters',
    'htmlNow.services',
    'htmlNow.directives',
    'htmlNow.controllers'
]).config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/:names?', {templateUrl: 'partials/main.html', controller: 'Main'});
    $routeProvider.otherwise({redirectTo: '/'});
}]);
