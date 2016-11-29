var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var del = require('del');
var vinylPaths = require('vinyl-paths');

// Clean the dist folder.
gulp.task('clean', function() {
    return gulp.src('dist').pipe(vinylPaths(del));
});

// Create the minified js and css files.
gulp.task('minify', ['clean'], function() {
    return gulp.src('src/index.html')
        .pipe(plugins.useref())
        .pipe(plugins.if('*.js', plugins.uglify()))
        .pipe(plugins.if('*.css', plugins.minifyCss()))
        .pipe(plugins.if('*.html', plugins.htmlmin({
            collapseWhitespace: true,
            minifyJS: true,
            minifyCSS: true,
            processScripts: ['text/template']
        })))
        .pipe(gulp.dest('dist'));
});

// Copy the fonts.
gulp.task('fonts', function() {
    return gulp.src('./bower_components/bootstrap/fonts/*.*').pipe(gulp.dest('dist/fonts'));
});

// Copy the formio files.
gulp.task('formio', function() {
    return gulp.src('./bower_components/ng-formio/dist/formio-full**.*').pipe(gulp.dest('dist'));
});

// Copy the fonts.
gulp.task('assets', function() {
    return gulp.src('assets/**/*').pipe(gulp.dest('dist/assets'));
});

// Define the build task.
gulp.task('build', ['minify', 'fonts', 'formio', 'assets']);

// Deployments.
var s3 = require("gulp-s3");
gulp.task('deploy', function () {
    return gulp.src('./dist/**/*').pipe(s3(require('./aws.json')));
});
