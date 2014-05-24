'use strict';

/* Directives */

angular.module('htmlNow.directives', []).directive('tplCode', ['dataService', '$filter', function (dataService, $filter) {
    return {
        restrict: "E",
        templateUrl: 'partials/template.html',
        link: function (scope, element, attrs) {

            scope.tpl_js = [];
            scope.tpl_css = [];
            scope.tpl_meta = [];

            scope.delete = function (index, delete_type) {
                switch (delete_type) {
                    case 'css':
                        scope.tpl_css.splice(index, 1);
                        break;
                    case 'js':
                        scope.tpl_js.splice(index, 1);
                        break;
                    case 'meta':
                        scope.tpl_meta.splice(index, 1);
                        break;
                    default:
                        throw new Error('Nothing specified, nothing to delete.');
                }
            };

            scope.$watchCollection('id', function (newValue, oldValue) {
                var script_name = newValue;
                dataService.getLibs(function (libList) {

                    if (script_name === oldValue) return;

                    angular.forEach(libList.data, function (val) {

                        if (val.name === script_name) {

                            if (val.type === 'js') {
                                scope.tpl_js.push('<script src="' + $filter('setVersion')(val.url, val.version) + '"></script>');
                                if (val.name === 'Modernizr') {
                                    scope.tpl_tag_html = '<!--[if lt IE 7]><html lang="en" class="no-js lt-ie9 lt-ie8 lt-ie7"><![endif]-->\n<!--[if IE 7]><html lang="en" class="no-js lt-ie9 lt-ie8"><![endif]-->\n<!--[if IE 8]><html lang="en" class="no-js lt-ie9"><![endif]-->\n<!--[if gt IE 8]><!--><html lang="en" class="no-js"><!--<![endif]-->';
                                }
                            } else if (val.type === 'css') {
                                scope.tpl_css.push('<link rel="stylesheet" href="' + $filter('setVersion')(val.url, val.version) + '">');
                            } else {
                                console.log('We still don\'t know how to process ' + val.type + ' :(');
                            }

                        }

                    });
                });
            });
        }
    }
}]);
