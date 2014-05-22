'use strict';

/* Directives */

angular.module('htmlNow.directives', []).directive('tplCode', ['dataService', '$filter', function (dataService, $filter) {
    return {
        restrict: "E",
        templateUrl: 'partials/template.html',
        /*scope: {
         type: '=',
         name: '=',
         title: '=tpl_html_title'
         },*/
        link: function (scope, element, attrs) {

            scope.tpl_js = [];
            scope.tpl_css = [];

            scope.delete = function (index,delete_type) {
                (delete_type==='css') ? scope.tpl_css.splice(index, 1) : scope.tpl_js.splice(index, 1);
            };

            scope.$watchCollection('[type,name]', function (newValue) {
                var lib = {
                    type: newValue[0],
                    name: newValue[1]
                };

                if (lib.type === 'js') {
                    scope.tpl_js.push('<script data-head-script="' + $filter('noSpace')(lib.name) + '" src="' + $filter('setVersion')(dataService[lib.type][lib.name].url, dataService[lib.type][lib.name].version) + '"></script>');
                    if (lib.name === 'modernizr') {
                        scope.tpl_tag_html = '<!--[if lt IE 7]><html lang="en" class="no-js lt-ie9 lt-ie8 lt-ie7"><![endif]-->\n<!--[if IE 7]><html lang="en" class="no-js lt-ie9 lt-ie8"><![endif]-->\n<!--[if IE 8]><html lang="en" class="no-js lt-ie9"><![endif]-->\n<!--[if gt IE 8]><!--><html lang="en" class="no-js"><!--<![endif]-->';
                    }
                } else if (lib.type === 'css') {
                    scope.tpl_css.push('<link rel="stylesheet" data-head-script="' + $filter('noSpace')(lib.name) + '" href="' + $filter('setVersion')(dataService[lib.type][lib.name].url, dataService[lib.type][lib.name].version) + '">');
                } else {
                    console.log('We still don\'t know how to process ' + lib.type + ' :(');
                }
                //console.log('scope.tpl_js',scope.tpl_js);
            });
        }
    }
}]);
