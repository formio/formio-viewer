var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var del = require('del');

// Clean the dist folder.
gulp.task('clean', function () {
  return del(['dist/*']);
});

// Create the minified js and css files.
gulp.task('minify', function() {
    return gulp.src(['src/index.html', 'src/embed.html'])
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
    return gulp.src('./node_modules/bootstrap/dist/fonts/*.*').pipe(gulp.dest('dist/fonts'));
});

gulp.task('bootswatch', function() {
  return gulp.src('./node_modules/bootswatch/**/*').pipe(gulp.dest('dist/lib/bootswatch'));
});

// Create the lib folders.
gulp.task('lib', ['bootswatch'], function() {
    return gulp.src([
      './node_modules/bootstrap/dist/css/bootstrap.min.css',
      './node_modules/bootstrap/dist/css/bootstrap.min.css.map',
      './node_modules/ng-formio/dist/formio-full**.*',
      './node_modules/seamless/build/seamless.child.min.js',
      './node_modules/jspdf/dist/jspdf.min.js',
      './node_modules/html2canvas/dist/html2canvas.min.js',
      './node_modules/js-base64/base64.min.js'
    ]).pipe(gulp.dest('dist/lib'));
});

// Copy the assets.
gulp.task('assets', function() {
    return gulp.src('assets/**/*').pipe(gulp.dest('dist/assets'));
});

// Define the build task.
gulp.task('build', ['clean'], function() {
  gulp.start(['minify', 'fonts', 'lib', 'assets']);
});

// Deployments.
var s3 = require("gulp-s3");
gulp.task('deploy:test', function() {
  return gulp.src('./dist/**/*').pipe(s3(require('./aws.json'), {
    uploadPath: "/test/"
  }));
});

gulp.task('deploy:prod', function () {
  return gulp.src('./dist/**/*').pipe(s3(require('./aws.json')));
});
