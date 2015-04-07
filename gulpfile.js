var gulp = require('gulp');
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
            .replace(new RegExp("<\!-- " + env_option.env_dev + " --" + env_option.blocking_char + ">","gi"), '<!-- ' + env_option.env_dev + ' -->')
            .replace(new RegExp("<\!-- " + env_option.env_prod + " -->","gi"), '<!-- ' + env_option.env_prod + ' --' + env_option.blocking_char + '>');
        fs.writeFileSync(file, content);
    });
});

/**
 * prod
 *
 * Change Gisto environment to "production", also concatenates files and remove console logs
 * Use: gulp prod
 */
gulp.task('prod', ['concat','concat-css'], function() {
    var files = ['./app/index.html'];
    files.forEach(function(file) {
        var content = fs.readFileSync(file, "utf8")
            .replace(new RegExp("<\!-- " + env_option.env_prod + " --" + env_option.blocking_char + ">","gi"), '<!-- ' + env_option.env_prod + ' -->')
            .replace(new RegExp("<\!-- " + env_option.env_dev + " -->","gi"), '<!-- ' + env_option.env_dev + ' --' + env_option.blocking_char + '>');
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

gulp.task('concat-css',function(){
    gulp.src([
        './app/lib/normalize.css/normalize.css',
        './app/lib/font-awesome/css/font-awesome.min.css',
        './app/css/app.css'
    ])
        .pipe(concat('html-now.min.css'))
        .pipe(gulp.dest('./app/css/'));
});

gulp.task('fonts', function () {
    return gulp.src(['app/lib/font-awesome/fonts/**'])
        .pipe(gulp.dest('app/fonts'));
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