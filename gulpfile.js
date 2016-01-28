var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var wiredep = require('wiredep').stream;
var del = require('del');
var vinylPaths = require('vinyl-paths');
var _ = require('lodash');

var cleanTasks = [];
var buildTasks = [];
_.each(['view'], function(type) {
    // Clean the dist folder.
    cleanTasks.push('clean:' + type);
    gulp.task('clean:' + type, function() {
        return gulp.src('dist/' + type).pipe(vinylPaths(del));
    });

    // Wire the dependencies into index.html
    gulp.task('wiredep:' + type, function() {
        return gulp.src('src/' + type + '/index.html').pipe(wiredep()).pipe(gulp.dest('src/' + type));
    });

    // Create the minified js and css files.
    gulp.task('minify:' + type, ['clean:' + type], function() {
        return gulp.src('src/' + type + '/index.html')
            .pipe(plugins.useref())
            .pipe(plugins.if('*.js', plugins.uglify()))
            .pipe(plugins.if('*.css', plugins.minifyCss()))
            .pipe(plugins.if('*.html', plugins.htmlmin({
                collapseWhitespace: true,
                minifyJS: true,
                minifyCSS: true,
                processScripts: ['text/template']
            })))
            .pipe(gulp.dest('dist/' + type));
    });

    // Copy the fonts.
    gulp.task('fonts:' + type, function() {
        return gulp.src('./bower_components/bootstrap/fonts/*.*').pipe(gulp.dest('dist/' + type + '/fonts'));
    });

    // Copy the fonts.
    gulp.task('assets:' + type, function() {
        return gulp.src('assets/**/*').pipe(gulp.dest('dist/' + type + '/assets'));
    });

    // Create the html.
    gulp.task('html:' + type, ['minify:' + type, 'fonts:' + type, 'assets:' + type]);

    // Define the build task.
    buildTasks.push('build:' + type);
    gulp.task('build:' + type, ['wiredep:' + type, 'html:' + type]);
});

// Clean the dist folder.
gulp.task('clean', cleanTasks, function() {
    return gulp.src('dist').pipe(vinylPaths(del));
});

// Build the project.
gulp.task('build', buildTasks);

// Deployments.
var s3 = require("gulp-s3");
gulp.task('deploy', ['build'], function () {
    return gulp.src('./dist/**/*').pipe(s3(require('./aws.json')));
});

gulp.task('deploy:test', ['build'], function() {
    var settings = require('./aws.json');
    settings.bucket = 'test-form.io';
    return gulp.src('./dist/**/*').pipe(s3(settings));
});

gulp.task('deploy:prod', ['build'], function() {
    var settings = require('./aws.json');
    settings.bucket = 'form.io';
    return gulp.src('./dist/**/*').pipe(s3(settings));
});