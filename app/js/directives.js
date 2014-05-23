'use strict';

/* Directives */

angular.module('htmlNow.directives', []).directive('tplCode', ['dataService', '$filter', function (dataService, $filter) {
    return {
        restrict: "E",
        templateUrl: 'partials/template.html',
        link: function (scope, element, attrs) {

            scope.tpl_js = [];
            scope.tpl_css = [];

            scope.delete = function (index, delete_type) {
                (delete_type === 'css') ? scope.tpl_css.splice(index, 1) : scope.tpl_js.splice(index, 1);
            };

            scope.$watchCollection('id', function (newValue) {
                var id = newValue;
                dataService.getLibs(function (libList) {

                    if (libList.data[id]['type'] === 'js') {
                        scope.tpl_js.push('<script data-head-script="' + $filter('noSpace')(libList.data[id]['name']) + '" src="' + $filter('setVersion')(libList.data[id]['url'], libList.data[id]['version']) + '"></script>');
                        if (libList.data[id]['name'] === 'modernizr') {
                            scope.tpl_tag_html = '<!--[if lt IE 7]><html lang="en" class="no-js lt-ie9 lt-ie8 lt-ie7"><![endif]-->\n<!--[if IE 7]><html lang="en" class="no-js lt-ie9 lt-ie8"><![endif]-->\n<!--[if IE 8]><html lang="en" class="no-js lt-ie9"><![endif]-->\n<!--[if gt IE 8]><!--><html lang="en" class="no-js"><!--<![endif]-->';
                        }
                    } else if (libList.data[id]['type'] === 'css') {
                        scope.tpl_css.push('<link rel="stylesheet" data-head-script="' + $filter('noSpace')(libList.data[id]['name']) + '" href="' + $filter('setVersion')(libList.data[id]['url'], libList.data[id]['version']) + '">');
                    } else {
                        console.log('We still don\'t know how to process ' + libList.data[id]['type'] + ' :(');
                    }
                });
            });
        }
    }
}]);
