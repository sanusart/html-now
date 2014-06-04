'use strict';

/* Filters */

angular.module('htmlNow.filters', [])
    .filter('noSpace', function () {
        return function (input) {
            return input.replace(/ /g, '-');
        };
    })
    .filter('setVersion', function () {
        return function (input,newtext) {
            return input.replace('###',newtext);
        };
    });
