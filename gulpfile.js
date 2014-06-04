var gulp = require('gulp');
var fs = require('fs');
var pkg_json = require('./package.json');
var fs = require('fs');
var concat = require('gulp-concat-sourcemap');
var strip_log = require('gulp-strip-debug');

// Options to switch environment (dev/prod)
var env_option = {
    env_dev: 'env:dev',
    env_prod: 'env:prod',
    blocking_char: '#'
};

/**
 * dev
 *
 * Change Gisto environment to "development"
 * Use: gulp dev
 */
gulp.task('dev', function() {
    var files = ['./app/index.html'];
    files.forEach(function(file) {
        var content = fs.readFileSync(file, "utf8")
            .replace('<!-- ' + env_option.env_dev + ' --' + env_option.blocking_char + '>', '<!-- ' + env_option.env_dev + ' -->')
            .replace('<!-- ' + env_option.env_prod + ' -->', '<!-- ' + env_option.env_prod + ' --' + env_option.blocking_char + '>')
            .replace('/* ' + env_option.env_dev + ' *' + env_option.blocking_char + '/', '/* ' + env_option.env_dev + ' */')
            .replace('/* ' + env_option.env_prod + ' */', '/* ' + env_option.env_prod + ' *' + env_option.blocking_char + '/');
        fs.writeFileSync(file, content);
    });
});

/**
 * prod
 *
 * Change Gisto environment to "production", also concatenates files and remove console logs
 * Use: gulp prod
 */
gulp.task('prod', ['concat'], function() {
    var files = ['./app/index.html'];
    files.forEach(function(file) {
        var content = fs.readFileSync(file, "utf8")
            .replace('<!-- ' + env_option.env_prod + ' --' + env_option.blocking_char + '>', '<!-- ' + env_option.env_prod + ' -->')
            .replace('<!-- ' + env_option.env_dev + ' -->', '<!-- ' + env_option.env_dev + ' --' + env_option.blocking_char + '>')
            .replace('/* ' + env_option.env_prod + ' *' + env_option.blocking_char + '/', '/* ' + env_option.env_prod + ' */')
            .replace('/* ' + env_option.env_dev + ' */', '/* ' + env_option.env_dev + ' *' + env_option.blocking_char + '/');
        fs.writeFileSync(file, content);
    });
});

/**
 * concat
 *
 * concatenates files and remove console logs, also used by other functions here
 * Use: gulp concat
 */
gulp.task('concat', function() {
    gulp.src([
        './app/lib/jquery/dist/jquery.js',
        './app/lib/jquery-details/jquery.details.js',
        './app/lib/angular/angular.js',
        './app/lib/angular-route/angular-route.js',
        './app/lib/angular-resource/angular-resource.js',
        './app/lib/angular-sanitize/angular-sanitize.js',
        './app/js/*.js'
    ])
        .pipe(strip_log())
        .pipe(concat('html-now.min.js'))
        .pipe(gulp.dest('./app/js/'));
});

/**
 * release
 *
 * Will be used for releases
 * Use: gulp release
 */
gulp.task('release', ['concat','prod'], function() {
    // Release
});

// Default task
gulp.task('default', ['dev']);