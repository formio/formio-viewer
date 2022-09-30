var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var del = require('del');
gulp.task('clean', () => del(['dist/*']));
gulp.task('html', () => gulp.src('./src/index.html').pipe(plugins.htmlmin({
  collapseWhitespace: true,
  minifyCSS: true,
  minifyJS: true
})).pipe(gulp.dest('dist')));
gulp.task('assets', () => gulp.src('./src/assets/**/*').pipe(gulp.dest('dist/assets')));
gulp.task('flatpickr', () => gulp.src('./node_modules/flatpickr/dist/**/*').pipe(gulp.dest('dist/lib/flatpickr')));
gulp.task('formiojs', () => gulp.src('./node_modules/formiojs/dist/**/*').pipe(gulp.dest('dist/lib/formiojs')));
gulp.task('seamless', () => gulp.src('./node_modules/seamless/build/**/*').pipe(gulp.dest('dist/lib/seamless')));
gulp.task('bootstrap', () => gulp.src('./node_modules/bootstrap/dist/**/*').pipe(gulp.dest('dist/lib/bootstrap')));
gulp.task('bootswatch', () => gulp.src('./node_modules/bootswatch/**/*').pipe(gulp.dest('dist/lib/bootswatch')));
gulp.task('fa', () => gulp.src('./node_modules/font-awesome/**/*').pipe(gulp.dest('dist/lib/font-awesome')));
gulp.task('moment-timezone', () => gulp.src('./node_modules/moment-timezone/**/*').pipe(gulp.dest('dist/lib/moment-timezone')));
gulp.task('fonts', () => gulp.src('./node_modules/font-awesome/fonts/*').pipe(gulp.dest('dist/fonts')));
gulp.task('inlinesource', function () {
  return gulp.src('./dist/*.html')
      .pipe(plugins.inlineSource())
      .pipe(gulp.dest('./dist'));
});
gulp.task('build', gulp.series('clean', gulp.parallel(
  'html',
  'assets',
  'flatpickr',
  'formiojs',
  'seamless',
  'bootstrap',
  'bootswatch',
  'fa',
  'moment-timezone',
  'fonts')
));
gulp.task('deploy', function () {
  return gulp.src('./dist/**/*').pipe(plugins.s3(require('../formio-apps/aws.json'), {
    uploadPath: "/viewer"
  }));
});
