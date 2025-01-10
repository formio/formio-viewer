var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var del = require('del');
var replace = require('gulp-replace');
var bootstrapIconsVersion = require('./node_modules/bootstrap-icons/package.json').version;
gulp.task('clean', () => del(['dist/*', 'lib/*']));
gulp.task('html', () => gulp.src('./src/index.html')
  .pipe(replace('https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.min.css', 'https://cdn.jsdelivr.net/npm/bootstrap-icons@' + bootstrapIconsVersion +'/font/bootstrap-icons.min.css'))
  .pipe(plugins.htmlmin({
    collapseWhitespace: true,
    minifyCSS: true,
    minifyJS: true
  }))
  .pipe(gulp.dest('dist')));
gulp.task('assets', () => gulp.src('./src/assets/**/*.*', { encoding: false }).pipe(gulp.dest('dist/assets')));
gulp.task('flatpickr', () => gulp.src('./node_modules/flatpickr/dist/**/*', { encoding: false }).pipe(gulp.dest('dist/lib/flatpickr')));
gulp.task('formiojs', () => gulp.src('./node_modules/@formio/js/dist/**/*', { encoding: false }).pipe(gulp.dest('dist/lib/formiojs')));
gulp.task('seamless', () => gulp.src('./node_modules/seamless/build/**/*', { encoding: false }).pipe(gulp.dest('dist/lib/seamless')));
gulp.task('bootstrap', () => gulp.src('./node_modules/bootstrap/dist/**/*', { encoding: false }).pipe(gulp.dest('dist/lib/bootstrap')));
gulp.task('bootstrap-icons', () => gulp.src('./node_modules/bootstrap-icons/font/**/*', { encoding: false }).pipe(gulp.dest('dist/lib/bi')));
gulp.task('bootswatch', () => gulp.src('./node_modules/bootswatch/**/*', { encoding: false }).pipe(gulp.dest('dist/lib/bootswatch')));
gulp.task('moment-timezone', () => gulp.src('./node_modules/moment-timezone/**/*', { encoding: false }).pipe(gulp.dest('dist/lib/moment-timezone')));
gulp.task('build', gulp.parallel(
  'html',
  'assets',
  'flatpickr',
  'formiojs',
  'seamless',
  'bootstrap',
  'bootstrap-icons',
  'bootswatch',
  'moment-timezone'
));
gulp.task('inlinesource', function () {
  return gulp.src('./dist/*.html')
    .pipe(plugins.inlineSource())
    .pipe(gulp.dest('./dist'));
});
