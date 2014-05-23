'use strict';

/* Services */

angular.module('htmlNow.services', []).factory('dataService', function ($http) {
    return {
        getLibs: function (libs) {
            $http.get('./data/libs.json').then(libs);
        }
    }
});