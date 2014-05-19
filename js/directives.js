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

            scope.tpl_html_title ='My template';
            scope.tpl_body_text = 'This is <b>my</b> text.';
            scope.tpl_meta_description = 'My template';
            scope.tpl_meta_keywords = 'My, template, keywords';
            scope.tpl_js = [];
            scope.tpl_css = [];

            scope.$watchCollection('[type,name]', function (newValue) {
                var lib = {
                    type: newValue[0],
                    name: newValue[1]
                };
                if(lib.type === 'js') {
                    scope.tpl_js.push('<script id="' + $filter('noSpace')(lib.name) + '" src="' + $filter('setVersion')(dataService[lib.type][lib.name].url, dataService[lib.type][lib.name].version) + '"></script>');
                } else if (lib.type === 'css') {
                    scope.tpl_css.push('<link rel="stylesheet" id="' + $filter('noSpace')(lib.name) + '" href="' + $filter('setVersion')(dataService[lib.type][lib.name].url, dataService[lib.type][lib.name].version) + '">');
                } else {
                    console.log('We still don\'t know how to process ' + lib.type + ' :(');
                }
            });
        }
    }
}]);
