'use strict';


// Declare app level module which depends on filters, and services
angular.module('htmlNow', [
  'ngRoute',
  'htmlNow.filters',
  'htmlNow.services',
  'htmlNow.directives',
  'htmlNow.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {templateUrl: 'partials/main.html', controller: 'Main'});
  $routeProvider.otherwise({redirectTo: '/'});
}]);
