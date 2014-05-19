'use strict';

/* Services */

angular.module('htmlNow.services', []).factory('dataService', function ($http) {
    var libs = {
        "js": {
            "jquery v1": {
                "url": "//cdn.jsdelivr.net/jquery/###/jquery.js",
                "version": "1.11.1"
            },
            "jquery-migrate": {
                "url": "//cdn.jsdelivr.net/jquery.migrate/###/jquery-migrate.js",
                "version": "1.2.1"
            },
            "jquery v2": {
                "url": "//cdn.jsdelivr.net/jquery/###/jquery.js",
                "version": "2.1.1"
            },
            "modernizr": {
                "url": "//cdn.jsdelivr.net/modernizr/###/modernizr.js",
                "version": "2.8.1"
            },
            "local-file": {
                "url": "./js/script.js"
            }
        },
        "css": {
            "normalize": {
                "url": "//cdn.jsdelivr.net/normalize/###/normalize.css",
                "version": "3.0.1"
            },
            "local-file": {
                "url": "./style/style.css"
            }
        }
    };
    return libs;
});
