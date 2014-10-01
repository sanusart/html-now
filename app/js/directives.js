'use strict';

/* Directives */

angular.module('htmlNow.directives', [])
    .directive('tplCode', ['dataService', '$filter', function (dataService, $filter) {
        return {
            restrict: "E",
            templateUrl: 'partials/template.html',
            link: function (scope) {

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
                            console.log('Nothing specified, nothing to delete.');
                    }
                };
                dataService.getLibs(function (libList) {

                    scope.$watch('id', function (newValue, oldValue) {

                        var script_name = newValue;

                        if (script_name === oldValue) return; // No changes - nothing to do.

                        angular.forEach(libList.data, function (val) {
                            if (val.name === script_name) {
                                console.log('Directive forEach', val.name);
                                if (val.type === 'js') {
                                    scope.tpl_js.push('<script src="' + $filter('setVersion')(val.url, val.version) + '"></script>');
                                    if (val.name === 'Modernizr') {
                                        scope.tpl_tag_html = '<!--[if lt IE 7]><html lang="en" class="no-js lt-ie9 lt-ie8 lt-ie7"><![endif]-->\n<!--[if IE 7]><html lang="en" class="no-js lt-ie9 lt-ie8"><![endif]-->\n<!--[if IE 8]><html lang="en" class="no-js lt-ie9"><![endif]-->\n<!--[if gt IE 8]><!--><html lang="en" class="no-js"><!--<![endif]-->';
                                    }
                                    if (val.name.match('AngularJs')) {
                                        scope.tpl_tag_html = '<html lang="en" data-ng-app="myapp">';
                                    }
                                } else if (val.type === 'css') {
                                    scope.tpl_css.push('<link rel="stylesheet" href="' + $filter('setVersion')(val.url, val.version) + '">');
                                } else if (val.type === 'meta') {
                                    scope.tpl_meta.push(val.markup);
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